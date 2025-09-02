import { Link } from "react-router-dom";

export default function Home() {
    return (
        <section className="hero">
            <div className="hero-inner">
                <h1 className="hero-title">CREATORVERSE</h1>
                <div className="hero-actions">
                    <Link className="btn" to="/creators">VIEW ALL CREATORS</Link>
                    <Link className="btn btn-secondary" to="/new">ADD A CREATOR</Link>
                </div>
            </div>
        </section>
    );
}
