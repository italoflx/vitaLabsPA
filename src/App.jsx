import Home from "./pages/Home";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/protectedRoute";

const App = () => {
  return (
    <>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute> } />
        </Routes>
    </>
  );
};

export default App;
