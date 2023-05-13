import React from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
const LOGIN_URL = "/api/v1/auth";

function Login() {
  const { setAuth } = React.useContext(AuthContext);

  const userRef = React.useRef();
  const errRef = React.useRef();

  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [err, setErr] = React.useState("");
  // const [sueccess, setSuccess] = React.useState<boolean>();

  React.useEffect(() => {
    userRef.current.focus();
  }, []);

  React.useEffect(() => {
    setErr("");
  }, [user, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ name: user, email, password }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response.data);
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, emial, password, roles, accessToken });

      console.log(user, email, password);
      setEmail("");
      setUser("");
      setPassword("");
    } catch (e) {
      if (!e?.response) {
        setErr("No server response");
      } else if (err.response?.status == 400) {
        setErr("Missing credentials");
      } else if (err.response?.status == 401) {
        setErr("Unauthorized");
      } else {
        setErr("Login failed");
      }
      errRef.current.focus();
      console.log(e);
    }

    // setSuccess(true);
  };

  return (
    <>
      <section>
        <p ref={errRef} className={err ? "errMsg" : "offscreen"} aria-live="assertive">
          {err}
        </p>
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <button type="submit">Sign in</button>
        </form>
      </section>
    </>
  );
}

export default Login;
