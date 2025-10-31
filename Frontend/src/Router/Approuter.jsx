import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";

const Approuter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            {/* Add more routes below as you create new pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/chat/:id" element={<ChatDetail />} /> */}
        </Routes>
    );
};

export default Approuter;
