import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Form from "./pages/Form.jsx"
import Home from "./pages/Home.jsx";
import Developer from "./pages/Developer.jsx"
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx"
import Achievements from "./pages/Acheivements.jsx";
import Groups from "./pages/Groups.jsx";
import Interns from "./pages/Interns.jsx";
import Projects from "./pages/Projects.jsx";
import ProjectDetails from "./pages/ProjectDetails.jsx";
import Activity from "./pages/Activity.jsx"
import InternActivity from "./pages/InternActivity.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/interns-form" element={<Form />} />
        <Route path="/developers" element={<Developer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/interns" element={<Interns />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project-details" element={<ProjectDetails />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/intern-activity" element={<InternActivity />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
