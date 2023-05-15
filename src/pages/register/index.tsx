import React, { FormEvent } from "react";
import axios from "../../api/axios";
import { AxiosError } from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./register.css";
const REGISTER_URL = "/api/v1/register";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const nameRegex = /^[a-zA-Z][a-zA-Z0-9-_]{3,30}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/;

function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const errMsgRef = React.useRef<HTMLParagraphElement>(null);
  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [validPassword, setValidPassword] = React.useState(false);
  const [validName, setValidName] = React.useState(false);
  const [validEmail, setValidEmail] = React.useState(false);

  const [focusPassword, setFocusPassword] = React.useState(false);
  const [focusName, setFocusName] = React.useState(false);
  const [focusEmail, setFocusEmail] = React.useState(false);

  //   const [matchPassword, setMatchPassword] = React.useState("");
  //   const [validMatch, setValidMatch] = React.useState(false);
  //   const [macthFocus, setMatchFocus] = React.useState(false);

  const [err, setErr] = React.useState("");

  React.useEffect(() => {
    if (nameRef.current) nameRef.current.focus();
  }, []);

  React.useEffect(() => {
    const resultEmail = emailRegex.test(email);
    const resultName = nameRegex.test(name);

    console.log({ resultEmail, resultName });
    setValidEmail(resultEmail);
    setValidName(resultName);
  }, [name, email]);

  React.useEffect(() => {
    const passwordResult = passwordRegex.test(password);

    console.log({ passwordResult });
    console.log(password);
    setValidPassword(passwordResult);
  }, [password]);

  React.useEffect(() => {
    setErr("");
  }, [name, email, password]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    //verify all fields
    if (!validEmail || !validName || !validPassword) {
      ///log the fields that are not valid
      console.log({ validEmail, validName, validPassword });

      setErr("Invalid fields");
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL, JSON.stringify({ name, email, password }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response.data);

      setName("");
      setEmail("");
      setPassword("");
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        setErr(e.response?.data.error);
      }
      if (errMsgRef.current) errMsgRef.current.focus();
      console.log(e);
    }
  };

  return (
    <>
      <section>
        <p ref={errMsgRef} className={err ? "errMsg" : "offscreen"} aria-live="assertive">
          {err}
        </p>
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              id="name"
              ref={nameRef}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              required
              onFocus={() => setFocusName(true)}
              onBlur={() => setFocusName(false)}
            />

            <ul id="uidnote" className={focusName && name && !validName ? "insrtuction" : "offscreen"}>
              <li>Starts with a letter (uppercase or lowercase).</li>
              <li>
                Consists of a sequence of 3 to 30 characters, which can be letters (uppercase or lowercase), digits, underscores,
                or hyphens.
              </li>
            </ul>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              ref={emailRef}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailInstructions"
              onFocus={() => setFocusEmail(true)}
              onBlur={() => setFocusEmail(false)}
            />
            <ul id="emailInstructions" className={focusEmail && email && !validEmail ? "insrtuction" : "offscreen"}>
              <li>Please provide a valid email.</li>
            </ul>
          </div>
          <div>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              ref={passwordRef}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              aria-invalid={validPassword ? "false" : "true"}
              aria-describedby="passwordInstructions"
              onFocus={() => setFocusPassword(true)}
              onBlur={() => setFocusPassword(false)}
            />
            <ul id="passwordInstructions" className={focusPassword && password && !validPassword ? "insrtuction" : "offscreen"}>
              <li>Contains at least one lowercase letter.</li>
              <li>Contains at least one uppercase letter.</li>
              <li>Contains at least one digit.</li>
              <li>Contains at least one special character.</li>
              <li>Has a length of at least 8 characters.</li>
            </ul>
          </div>
          <button disabled={!validEmail || !validPassword || !validName ? true : false}>Sign up</button>
        </form>
        <p>
          Already registred?
          <br />
          <Link to="/login">Login</Link>
        </p>
      </section>
    </>
  );
}

export default Register;
