import "./Style/style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Component/Signup";
import Login from "./Component/Login";
import User from "./Component/User";
import Edit from "./Component/Edit";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />}>
            <Route path=":edit" element={<Edit />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
