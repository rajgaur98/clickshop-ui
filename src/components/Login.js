import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { validateEmail, validatePassword } from "../utils";
import config from "../config";
import LoginContext from "../context";
import "./Login.css";
import Loading from "./Loading";

function Login() {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(null);
  const [context, setContext] = useContext(LoginContext);
  const history = useHistory();

  const login = async () => {
    if (!validateEmail(email)) return;
    if (!validatePassword(password)) return;
    setLoading(true);
    try {
      const response = await fetch(`${config.BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setContext(true);
        setError(null);
        setLoading(false);
        history.replace("/");
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

  if (isLoading) return <Loading />;

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
          placeholder="Enter your password"
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
        {error && <span className="error">{error}</span>}
        <button type="button" className="submit-btn" onClick={login}>
          Login <i className="fas fa-arrow-right"></i>
        </button>
        <span className="signup-span">
          New here? &nbsp;
          <Link to="/register" className="signup">
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
