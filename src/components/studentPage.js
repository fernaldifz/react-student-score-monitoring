import React, { useState, useEffect } from "react";
import { auth, db } from "../config";
import { collection, query, getDocs, where } from "firebase/firestore";
import { signOut } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";

function StudentPage() {
  const [studentDoc, setStudentDoc] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const q = query(
        collection(db, "students"),
        where("email", "==", auth.currentUser.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setStudentDoc(doc.data());
      });
      setIsLoaded(true);
    }
    fetchData();
  }, []);

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

  if (!isLoaded) {
    return <h4 className="mx-5 mt-2">Loading....</h4>;
  } else {
    return (
      <div>
        {studentDoc.score.length === 0 ? (
          <div className="mx-5 mt-2">
            <h4>Belum ada nilai yang diberikan!</h4>
            <br />
            <div>
              <button className="btn btn-danger" onClick={handleLogOut}>
                Log Out
              </button>
            </div>
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
              <h4>Nilai Anda</h4>
              <br />
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Mata Pelajaran</th>
                    <th scope="col">Nilai</th>
                  </tr>
                </thead>
                <tbody>
                  {studentDoc.score.map((individualData) => {
                    return (
                      <tr>
                        <td>{individualData.subject}</td>
                        <td>{individualData.score}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <br />
              <div>
                <button className="btn btn-danger" onClick={handleLogOut}>
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default StudentPage;
