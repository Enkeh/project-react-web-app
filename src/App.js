import { HashRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Project from "./project";

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="*" element={<Project />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
