import { useEffect, useState } from "react";
import { supabase } from "../client";
import CreatorCard from "../components/CreatorCard";

export default function ShowCreators() {
    const [creators, setCreators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    useEffect(() => {
        (async () => {
            const { data, error } = await supabase
                .from("creators")
                .select("*")
                .order("id", { ascending: true });
            if (error) setErr(error.message);
            else setCreators(data);
            setLoading(false);
        })();
    }, []);

    async function handleDelete(id) {
        if (!confirm("Delete this creator?")) return;
        const prev = creators;
        setCreators(c => c.filter(x => x.id !== id));
        const { error } = await supabase.from("creators").delete().eq("id", id);
        if (error) { setCreators(prev); alert("Delete failed: " + error.message); }
    }

    if (loading) return <p>Loading…</p>;
    if (err) return <p role="alert">{err}</p>;

    return (
        <>
            <h1>Creators</h1>
            <div className="grid">
                {creators.map(c => (
                    <CreatorCard key={c.id} creator={c} onDelete={handleDelete} />
                ))}
            </div>
        </>
    );
}
