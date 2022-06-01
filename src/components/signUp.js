import React, { useState } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import { auth } from "../config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const roles = [
    { value: "Admin", label: "Admin" },
    { value: "Guru", label: "Guru" },
    { value: "Murid", label: "Murid" },
  ];

  const handleSignUp = async () => {
    if (email && password && role) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: role,
          })
            .then(() => {
              console.log("Registrasi berhasil");
            })
            .catch((error) => {
              alert(error.message);
            });
        })
        .then(async () => {
          await auth.signOut();
          window.location.href = "/login";
        })
        .catch((error) => alert(error.message));
    } else {
      alert("Isi semua field terlebih dahulu");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (selectedOption) => {
    setRole(selectedOption.value);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="col-6 col-sm-6 col-md-4 col-lg-3">
        <div className="p-3 d-flex justify-content-center">
          <p className="h2">Sign Up</p>
        </div>
        <div className="border p-3">
          <div className="form-group mb-2">
            <label htmlFor="description">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="description">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role">Pekerjaan</label>
            <Select options={roles} onChange={handleRoleChange} />
          </div>
          <button
            className="w-100 btn-primary rounded p-1 mb-2"
            onClick={handleSignUp}
          >
            Buat akun
          </button>
          <p>
            Sudah punya akun? <Link to={{ pathname: "login" }}>Masuk</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
