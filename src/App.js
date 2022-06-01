import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { auth } from "./config";
import { onAuthStateChanged } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";

import SignUp from "./components/signUp";
import LogIn from "./components/logIn";
import AdminPage from "./components/adminPage";
import TeacherPage from "./components/teacherPage";
import StudentPage from "./components/studentPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [teacher, setTeacher] = useState(false);
  const [student, setStudent] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
      if (user.displayName === "Admin") {
        setAdmin(true);
      } else if (user.displayName === "Guru") {
        setTeacher(true);
      } else if (user.displayName === "Murid") {
        setStudent(true);
      }
    } else {
      setLoggedIn(false);
      setAdmin(false);
      setTeacher(false);
      setStudent(false);
    }
  });

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        {loggedIn && admin && (
          <Route path="/home/admin" element={<AdminPage />} />
        )}
        {loggedIn && teacher && (
          <Route path="/home/guru" element={<TeacherPage />} />
        )}
        {loggedIn && student && (
          <Route path="/home/murid" element={<StudentPage />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
