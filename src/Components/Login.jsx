import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../AuthContext";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, logIn } = UserAuth();
  const navigate = useNavigate();

   async function  handlePasswordReset (e){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    try {
      if(emailRegex.test(email)){//.test is ibulit function return T/F
        await sendPasswordResetEmail(auth, email); //this is function provided by firebase with auth and email as params
        alert("Password reset email sent. Check your inbox.");
      }
      else{
        
        alert("Enter a vaild emial.")
      }
     
     
    } catch (error) {
      console.log(email);
      alert("Error sending password reset email: " + error.message);
      console.log(error);
  }};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (error) {
      console.log(error);
      const cleanErrorCode = error.code.replace(/firebase/gi, "");
      setError(`Error during sign-up: ${cleanErrorCode}`);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img src="Hungry HUB.png" alt="Hungry HUB logo" style={styles.logo} />
        <h1 style={styles.headerTitle}>Hungry Hub</h1>
      </div>
      <div style={styles.content}>
        <div style={styles.box}>
          <div style={styles.innerBox}>
            <h1 style={styles.title}>Sign In</h1>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                type="email"
                placeholder="Email"
                autoComplete="email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                type="password"
                placeholder="Password"
                autoComplete="current-password"
              />
              <button style={styles.button}>Sign In</button>
              <div style={styles.options}>
                <p>
                  <input type="checkbox" />
                  Remember me
                </p>
                <p style={{cursor:"pointer"}} onClick={handlePasswordReset}>Forget Password</p>
              </div>
              <p style={styles.footer}>
                <span style={styles.footerText}>New to Hungry Hub?</span>{" "}
                <Link style={styles.link} to="/signup">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  header: {
    position: "absolute",
    top: "24px",
    left: "24px",
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: "50px",
    marginRight: "16px",
  },
  headerTitle: {
    fontSize: "1.5rem",
    color: "#ff8000",
  },
  content: {
    width: "100%",
    padding: "24px",
    display: "flex",
    justifyContent: "center",
  },
  box: {
    marginTop:"28px",
    maxWidth: "450px",
    width: "100%",
    padding: "16px",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    color: "white",
    borderRadius: "8px",
    paddingTop:"3px",
  },
  innerBox: {
    
    maxWidth: "320px",
    margin: "0 auto",
    padding: "9px",
    paddingTop:"5px",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "16px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px",
    margin: "8px 0",
    backgroundColor: "#4a4a4a",
    borderRadius: "4px",
    color: "white",
    border: "none",
  },
  button: {
    backgroundColor: "#ff8000",
    padding: "12px",
    margin: "24px 0",
    borderRadius: "4px",
    fontWeight: "bold",
    color: "white",
    cursor: "pointer",
    border: "none",
  },
  error: {
    padding: "6px",
    backgroundColor: "#f56565",
    margin: "8px 0",
    borderRadius: "4px",
    color: "white",
    fontSize:"smaller"
  },
  options: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.875rem",
    color: "#b3b3b3",
  },
  footer: {
    textAlign: "center",
    fontSize: "0.875rem",
  },
  footerText: {
    color: "#b3b3b3",
  },
  link: {
    color: "white",
    textDecoration: "none",
    marginLeft: "4px",
    cursor: "pointer",
  },
};
