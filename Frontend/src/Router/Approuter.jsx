import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import { useUser } from "../Context/UserContext";
import { Navigate } from "react-router-dom";
const Approuter = () => {
    const { user } = useUser();
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {/* Add more routes below as you create new pages */}
            <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/" />}
            />
            <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
            />
            {/* <Route path="/chat/:id" element={<ChatDetail />} /> */}
        </Routes>
    );
};

export default Approuter;
