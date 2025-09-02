// src/App.jsx
import { Link, useRoutes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ShowCreators from "./pages/ShowCreators";
import ViewCreator from "./pages/ViewCreator";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";

export default function App() {
    const element = useRoutes([
        { path: "/", element: <Home /> },
        { path: "/", element: <ShowCreators /> },
        { path: "/creators/:id", element: <ViewCreator /> },
        { path: "/new", element: <AddCreator /> },
        { path: "/creators/:id/edit", element: <EditCreator /> },
        { path: "*", element: <Navigate to="/" replace /> },
    ]);

    return (
        <div className="container">
            <nav>
                <ul>
                    <li><Link to="/">Creatorverse</Link></li>
                    <li><Link to="/new">Add Creator</Link></li>
                </ul>
            </nav>
            {element}
        </div>
    );
}
