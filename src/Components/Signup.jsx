import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../AuthContext";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirm_password] = useState("");
  const { user, signUp } = UserAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset the error message
    try {
      if (password !== Confirmpassword) {
        alert("Password doesn't match!");
      } else if (password.length < 6) {
        alert("Password length must be more than 5!");
      } else {
        const result = await signUp(email, password);
        if (result.success) {
          navigate("/home"); // Programmatic navigation only if sign-up is successful
        } else {
          throw new Error(result.message);
        }
      }
    } catch (error) {
      const errorMessage = error.code
        ? `Error during sign-up: ${error.code.replace(/firebase/gi, "")}`
        : error.message;
      setError(errorMessage);
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
            <h1 style={styles.title}>Sign Up</h1>
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
              <input
                onChange={(e) => setConfirm_password(e.target.value)}
                style={styles.input}
                type="password"
                placeholder="Confirm Password"
                autoComplete="current-password"
              />
              <button style={styles.button}>Sign Up</button>
              <p style={styles.footer}>
                <span style={styles.footerText}>Already have an account?</span>
                <Link style={styles.link} to="/">
                  Sign In
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
    cursor: "'pointer",
  },
  error: {
    padding: "6px",
    backgroundColor: "#f56565",
    margin: "8px 0",
    borderRadius: "4px",
    color: "white",
    fontSize:"smaller"
  }
};
