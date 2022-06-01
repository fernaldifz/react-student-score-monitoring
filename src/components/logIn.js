import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";
import "bootstrap/dist/css/bootstrap.min.css";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (auth.currentUser) {
    window.location.href = "/home/" + auth.currentUser.displayName;
  }

  const handleLogIn = () => {
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password).then(() => {
        console.log("Berhasil login");
      });
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

  return (
    <div className="d-flex justify-content-center">
      <div className="col-6 col-sm-6 col-md-4 col-lg-3">
        <div className="p-3 d-flex justify-content-center">
          <p className="h2">Log In</p>
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
          <div className="form-group mb-4">
            <label htmlFor="description">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button
            className="w-100 btn-primary rounded p-1 mb-2"
            onClick={handleLogIn}
          >
            Masuk
          </button>
          <p>
            Belum punya akun? <Link to={{ pathname: "/" }}>Buat</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
