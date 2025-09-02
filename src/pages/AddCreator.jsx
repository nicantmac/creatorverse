import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";

export default function AddCreator() {
    const nav = useNavigate();
    const [form, setForm] = useState({ name: "", url: "", description: "", imageURL: "" });
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    function onChange(e) {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    }

    async function onSubmit(e) {
        e.preventDefault();
        setError("");
        setSaving(true);

        // basic validation
        if (!form.name.trim() || !form.url.trim() || !form.description.trim()) {
            setSaving(false);
            return setError("name, url, and description are required.");
        }

        const payload = {
            name: form.name.trim(),
            url: form.url.trim(),
            description: form.description.trim(),
            // DB column is snake_case:
            image_url: form.imageURL.trim() || null,
        };

        const { data, error } = await supabase
            .from("creators")
            .insert(payload)
            .select()
            .single();

        setSaving(false);
        if (error) return setError(error.message);

        // go to the new creator’s page
        nav(`/creators/${data.id}`);
    }

    return (
        <form onSubmit={onSubmit}>
            <h2>Add Creator</h2>
            {error && <p role="alert">Error: {error}</p>}

            <label> Name
                <input name="name" value={form.name} onChange={onChange} required />
            </label>

            <label> URL
                <input name="url" value={form.url} onChange={onChange} required placeholder="https://…" />
            </label>

            <label> Description
                <textarea name="description" value={form.description} onChange={onChange} required />
            </label>

            <label> Image URL (optional)
                <input name="imageURL" value={form.imageURL} onChange={onChange} placeholder="https://image…" />
            </label>

            <button type="submit" disabled={saving}>{saving ? "Creating…" : "Create"}</button>
        </form>
    );
}
