// src/pages/EditCreator.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";                 // ✅ import supabase

export default function EditCreator() {
    const { id } = useParams();
    const nav = useNavigate();

    const [form, setForm] = useState({
        name: "", url: "", description: "", imageURL: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // ✅ get the creator and load into the form
    useEffect(() => {
        (async () => {
            const { data, error } = await supabase
                .from("creators")
                .select("*")
                .eq("id", Number(id))
                .single();

            if (error) setError(error.message);
            else {
                setForm({
                    name: data.name,
                    url: data.url,
                    description: data.description,
                    // handle either column casing just in case
                    imageURL: data.imageURL ?? data.image_url ?? ""
                });
            }
            setLoading(false);
        })();
    }, [id]);

    function onChange(e) {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    }

    // ✅ async function to update on submit
    async function onSubmit(e) {
        e.preventDefault();
        setError("");
        setSaving(true);

        const payload = {
            name: form.name.trim(),
            url: form.url.trim(),
            description: form.description.trim(),
            image_url: form.imageURL.trim() || null,  // DB column is snake_case
        };

        const { error } = await supabase
            .from("creators")
            .update(payload)
            .eq("id", Number(id));

        setSaving(false);
        if (error) return setError(error.message);

        nav(`/creators/${id}`); // back to detail page
    }

    if (loading) return <p>Loading…</p>;

    return (
        <form onSubmit={onSubmit}>
            <h2>Edit Creator</h2>
            {error && <p role="alert">Error: {error}</p>}

            <label>Name
                <input name="name" value={form.name} onChange={onChange} required />
            </label>

            <label>URL
                <input name="url" value={form.url} onChange={onChange} required />
            </label>

            <label>Description
                <textarea name="description" value={form.description} onChange={onChange} required />
            </label>

            <label>Image URL (optional)
                <input name="imageURL" value={form.imageURL} onChange={onChange} />
            </label>

            <div style={{ display: "flex", gap: ".5rem" }}>
                <button type="submit" disabled={saving}>
                    {saving ? "Saving…" : "Save Changes"}
                </button>
                <button type="button" className="secondary" onClick={() => nav(-1)}>
                    Cancel
                </button>
            </div>
        </form>
    );
}
