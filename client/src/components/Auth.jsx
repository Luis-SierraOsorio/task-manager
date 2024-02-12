import { useState } from "react";

export default function Auth() {
  const [isLogIn, setIsLogIn] = useState(true);
  const [error, setError] = useState(null);

  function viewLogin(status) {
    setError(null);
    setIsLogIn(status);
  }

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{isLogIn ? "Please Log In" : "Please Sign Up"}</h2>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          {!isLogIn && <input type="password" placeholder="confirm password" />}
          <input type="submit" className="create" />
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
