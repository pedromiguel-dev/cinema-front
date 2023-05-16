import React, { FormEvent } from "react";
import axios from "../../api/axios";
import { AxiosError } from "axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.css";
const LOGIN_URL = "/api/v1/auth";

function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const emailRef = React.useRef<HTMLInputElement>(null);
  const errRef = React.useRef<HTMLParagraphElement>(null);

  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [err, setErr] = React.useState("");

  React.useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
  }, []);

  React.useEffect(() => {
    setErr("");
  }, [email, password]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ email, password }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const accessToken = response.data[0].accessToken;
      const roles = response.data[0].roles;

      setAuth?.({ user: { roles, accessToken } });

      console.log(email, password, accessToken, roles);
      setEmail("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        setErr(e.response?.data.error);
      }
      if (errRef.current) errRef.current.focus();
      console.log(e);
    }
  };

  return (
    <>
      <section id="login_section">
        <p ref={errRef} className={err ? "error" : "offscreen"} aria-live="assertive">
          {err}
        </p>
        <h1>SISTEMA DE CINEMA</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" ref={emailRef} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Senha</label>
            <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
          </div>
          <button type="submit">Sign in</button>
        </form>
      </section>
    </>
  );
}

export default Login;
