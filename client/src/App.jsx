import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "./Components/Header";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import EmployeeList from "./pages/EmployeeList";
import Profile from "./pages/Profile";
import ProtectedRoute from "./Components/ProtectedRoute";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";

const App = () => {

  const token = Cookies.get('token')

  return (
    <BrowserRouter>

      {/* { token && <Header /> } */}
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/employee-list" element={<ProtectedRoute element={<EmployeeList />} />} />
        <Route path="/add-employee" element={<ProtectedRoute element={<AddEmployee />} />} />
        <Route path="/edit-employee" element={<ProtectedRoute element={<EditEmployee />} />} />

        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
