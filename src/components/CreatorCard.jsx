// src/components/CreatorCard.jsx
import { Link } from "react-router-dom";

export default function CreatorCard({ creator, onDelete }) {
    const { id, name, url, description } = creator;
    const img = creator.imageURL ?? creator.image_url;

    return (
        <article className="creator-card">
            {img && <img className="creator-img" src={img} alt={name} />}
            <div className="creator-content">
                <h3><Link to={`/creators/${id}`}>{name}</Link></h3>
                <p>{description}</p>
                <p><a href={url} target="_blank" rel="noreferrer">Visit channel</a></p>

                <div className="actions">
                    <Link role="button" to={`/creators/${id}/edit`}>Edit</Link>
                    <button className="secondary" onClick={() => onDelete?.(id)}>Delete</button>
                </div>
            </div>
        </article>
    );
}
