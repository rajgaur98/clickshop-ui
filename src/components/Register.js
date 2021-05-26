import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import config from "../config";
import { validatePassword, validateEmail } from "../utils";
import "./Login.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  const register = async () => {
    if (!validateEmail(email)) return;
    if (!validatePassword(password)) return;
    if (password !== confirmPassword) return;
    setLoading(true);
    try {
      const response = await fetch(`${config.BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (response.status === 201) {
        const data = await response.json();
        console.log(data);
        setError(null);
        setLoading(false);
        history.replace("/login");
      } else {
        const data = await response.text();
        console.log(data);
        setError(data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="login-container">
      <div className="container">
        <img
          className="logo"
          src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fclipart-library.com%2Fimages_k%2Fshopping-bag-transparent-background%2Fshopping-bag-transparent-background-13.png&f=1&nofb=1"
          alt="logo"
        />
        <input
          type="email"
          className="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(!validateEmail(e.target.value));
          }}
        />
        {emailError && <span className="error">Invalid email</span>}
        <input
          type="password"
          className="password"
          placeholder="Enter a password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(!validatePassword(e.target.value));
          }}
        />
        {passwordError && (
          <span className="error">
            Password should be at least 6 characters
          </span>
        )}
        <input
          type="password"
          className="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setConfirmPasswordError(e.target.value !== password);
          }}
        />
        {confirmPasswordError && (
          <span className="error">Passwords don't match</span>
        )}
        {error && <p>{error}</p>}
        <button type="button" className="submit-btn" onClick={register}>
          Register <i className="fas fa-arrow-right"></i>
        </button>
        <span className="signup-span">
          Already have an account? &nbsp;
          <Link to="/login" className="signup">
            Sign in
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
