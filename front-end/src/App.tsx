import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin/>} />
        <Route path="/sign-up" element={<Signup />} />
      </Routes>
    </main>
  );
}

export default App;
// <Route path="*" element={<ForOFor/>}
