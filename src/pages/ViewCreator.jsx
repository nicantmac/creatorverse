// src/pages/ViewCreator.jsx
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "../client";

export default function ViewCreator() {
    const { id } = useParams();
    const nav = useNavigate();
    const [creator, setCreator] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            const { data, error } = await supabase
                .from("creators")
                .select("*")
                .eq("id", Number(id))
                .single();
            if (error) setError(error.message);
            else setCreator(data);
        })();
    }, [id]);

    if (error) return <p role="alert">Error: {error}</p>;
    if (!creator) return <p>Loading…</p>;

    const { name, url, description } = creator;
    const img = creator.imageURL ?? creator.image_url;

    return (
        <article className="creator-detail">
            {img && <img className="creator-detail-img" src={img} alt={name} />}
            <div>
                <h2>{name}</h2>
                <p><a href={url} target="_blank" rel="noreferrer">{url}</a></p>
                <p>{description}</p>
                <div style={{ display: "flex", gap: ".5rem" }}>
                    <Link role="button" to={`/creators/${id}/edit`}>Edit</Link>
                    <button className="secondary" onClick={async () => {
                        await supabase.from("creators").delete().eq("id", Number(id));
                        nav("/");
                    }}>Delete</button>
                </div>
            </div>
        </article>
    );
}
