import React, { useState, useEffect } from "react";
import Select from "react-select";
import { auth, db } from "../config";
import { collection, query, getDocs, doc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";

function TeacherPage() {
  const [submitted, setSubmitted] = useState(false);
  const [studentDoc, setStudentDoc] = useState(null);
  const [name, setName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [subject, setSubject] = useState("");
  const [newScore, setNewScore] = useState(0);
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [studentClass, setStudentClass] = useState(0);
  const [score, setScore] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const q = query(collection(db, "students"));
      const querySnapshot = await getDocs(q);
      const tempStudentDoc = [];
      querySnapshot.forEach((doc) => {
        tempStudentDoc.push({
          value: doc.data().name,
          label: doc.data().name,
          id: doc.id,
          data: doc.data(),
        });
      });
      setStudentDoc(tempStudentDoc);
    }
    fetchData();
  }, []);

  const handleAddScore = () => {
    var tempNewScore = { subject: subject, score: newScore };
    setScore(score.push(tempNewScore));

    var data = {
      email: email,
      name: name,
      age: age,
      studentClass: studentClass,
      score: score,
    };

    const myDoc = doc(db, "students", studentID);

    setDoc(myDoc, data, { merge: true })
      .then(() => {
        console.log("Berhasil menambahkan nilai");
        setSubmitted(true);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleNameChange = (selectedOption) => {
    setName(selectedOption.value);
    setStudentID(selectedOption.id);
    setEmail(selectedOption.data.email);
    setAge(selectedOption.data.age);
    setStudentClass(selectedOption.data.studentClass);
    setScore(selectedOption.data.score);
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

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleScoreChange = (event) => {
    setNewScore(event.target.value);
  };

  const handleReturn = () => {
    setSubject("");
    setNewScore(0);
    setSubmitted(false);
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
              Student Score Monitoring ({auth.currentUser.displayName})
            </a>
          </nav>
          <div className="mx-5 mt-2 col-6 col-sm-6 col-md-4">
            <h4>Beri Nilai ke Murid</h4>
            <br />
            <div>
              <div className="mb-4">
                <label htmlFor="role">Nama murid</label>
                <Select options={studentDoc} onChange={handleNameChange} />
              </div>
              <label htmlFor="description">Nama pelajaran</label>
              <input
                type="text"
                className="form-control"
                id="subject"
                value={subject}
                onChange={handleSubjectChange}
              />
              <br />
              <label htmlFor="description">Nilai</label>
              <input
                type="number"
                className="form-control"
                id="newScore"
                value={newScore}
                onChange={handleScoreChange}
              />
              <br />
              <div>
                <button className="btn btn-success" onClick={handleAddScore}>
                  Submit
                </button>
                <button className="btn btn-danger mx-4" onClick={handleLogOut}>
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

export default TeacherPage;
