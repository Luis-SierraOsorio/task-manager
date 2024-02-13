import { useState } from "react";
import { useCookies } from "react-cookie";

export default function Auth() {
  const [isLogIn, setIsLogIn] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [error, setError] = useState(null);

  //
  function viewLogin(status) {
    setError(null);
    setIsLogIn(status);
  }

  // handles the submit button when pressed
  async function handleSubmit(e, endpoint) {
    e.preventDefault();

    // if the sign up page is shown then the passwords must match
    if (!isLogIn && password !== confirmPassword) {
      setError("Passwords must match");
      return;
    }

    // sends a request to the backend depending on the endpoint, either sign up or log in
    const response = await fetch(`http://localhost:8000/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // gets the data returned
    const data = await response.json();

    // data.detail gets returned if there is an error on the backend
    if (data.detail) {
      setError(data.detail);
    } else {
      // if there is no error then the email gets set as the email returned as a cookie, same as AuthToken
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);

      // refreshes the window for the cookies to be saved
      window.location.reload();
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          {/* displaying if the user should sign up or log in */}
          <h2>{isLogIn ? "Please Log In" : "Please Sign Up"}</h2>
          {/* input for the email */}
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* input for the password */}
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* if the user is in the sign up then a confirm password is shown */}
          {!isLogIn && (
            <input
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}

          {/* button that handles the submit, endpoint is decided depending on which button was clicked */}
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
