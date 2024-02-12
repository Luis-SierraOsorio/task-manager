import { useState } from "react";

export default function Auth() {
  const [isLogIn, setIsLogIn] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  console.log(email, password, confirmPassword);

  function viewLogin(status) {
    setError(null);
    setIsLogIn(status);
  }

  async function handleSubmit(e, endpoint) {
    e.preventDefault();

    if (!isLogIn && password !== confirmPassword) {
      setError("Passwords must match");
      return;
    }

    const response = await fetch(`http://localhost:8000/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = response.json();
    console.log(data);
  }

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{isLogIn ? "Please Log In" : "Please Sign Up"}</h2>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogIn && (
            <input
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input
            type="submit"
            className="create"
            onClick={(e) => handleSubmit(e, isLogIn ? "login" : "signup")}
          />
          {error && <p> {error}</p>}
        </form>
        <div className="auth-options">
          <button onClick={() => viewLogin(false)}>Sign Up</button>
          <button onClick={() => viewLogin(true)}>Log In</button>
        </div>
      </div>
    </div>
  );
}
