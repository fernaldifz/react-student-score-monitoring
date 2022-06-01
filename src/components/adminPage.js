import React, { useState } from "react";
import Select from "react-select";
import { db, auth } from "../config";
import { collection, addDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminPage() {
  const [role, setRole] = useState("Guru");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [subject, setSubject] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const roles = [
    { value: "Guru", label: "Guru" },
    { value: "Murid", label: "Murid" },
  ];

  const handleRoleChange = (selectedOption) => {
    setName("");
    setAge("");
    setSubject("");
    setStudentClass("");
    setEmail("");
    setRole(selectedOption.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleStudentClassChange = (event) => {
    setStudentClass(event.target.value);
  };

  const handleCreateData = () => {
    if (role === "Guru") {
      var data = {
        email: email,
        name: name,
        age: age,
        subject: subject,
      };
      var collectionID = "teachers";
    } else if (role === "Murid") {
      var data = {
        email: email,
        name: name,
        age: age,
        studentClass: studentClass,
        score: [],
      };
      var collectionID = "students";
    }

    addDoc(collection(db, collectionID), data)
      .then(() => {
        setSubmitted(true);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleReturn = () => {
    setName("");
    setAge("");
    setSubject("");
    setStudentClass("");
    setRole("Guru");
    setEmail("");
    setSubmitted(false);
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("log out berhasil");
        window.location.href = "/";
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div>
      {submitted ? (
        <div className="mx-5 mt-2">
          <h4>Data berhasil ditambahkan!</h4>
          <button className="btn btn-success" onClick={handleReturn}>
            Kembali
          </button>
        </div>
      ) : (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
            <a
              href={"/home/" + auth.currentUser.displayName}
              className="navbar-brand"
            >
              Student Score Monitoring
            </a>
          </nav>
          <div className="mx-5 mt-2 col-6 col-sm-6 col-md-4">
            <h4>Create Data</h4>
            <br />
            <div>
              <label htmlFor="description">Pekerjaan</label>
              <Select
                options={roles}
                onChange={handleRoleChange}
                defaultValue={{ value: "Guru", label: "Guru" }}
              />
              <br />
              <label htmlFor="description">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
              <br />
              <label htmlFor="description">Nama</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={handleNameChange}
              />
              <br />
              <label htmlFor="description">Umur</label>
              <input
                type="number"
                className="form-control"
                id="umur"
                value={age}
                onChange={handleAgeChange}
              />
              <br />

              {role === "Guru" && (
                <label htmlFor="description">Mengajar mata pelajaran</label>
              )}
              {role === "Guru" && (
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  value={subject}
                  onChange={handleSubjectChange}
                />
              )}

              {role === "Murid" && <label htmlFor="description">Kelas</label>}
              {role === "Murid" && (
                <input
                  type="number"
                  className="form-control"
                  id="studentClass"
                  value={studentClass}
                  onChange={handleStudentClassChange}
                />
              )}
              <br />
              <div>
                <button onClick={handleCreateData} className="btn btn-success">
                  Submit
                </button>
                <button onClick={handleLogOut} className="btn btn-danger mx-4">
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
