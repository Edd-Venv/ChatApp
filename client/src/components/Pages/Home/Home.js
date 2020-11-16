import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/auth/authContext";

function Home() {
  const [state, dispatch] = useContext(AuthContext);
  const { userId, authenticated } = state;

  function copyUrl(el) {
    const pElement = document.getElementById(el);
    window.navigator.clipboard.writeText(pElement.innerText);
  }

  if (authenticated)
    return (
      <div>
        <h1> Add your friends</h1>
        <h2>your friends dont have accounts?</h2>
        <h3>use this link</h3>
        <p id="URL">
          {`http://localhost:3000/sign-up/${userId}`}
          <i className="bx bx-clipboard" onClick={() => copyUrl("URL")} />
        </p>
        <h2>your friends already have accounts?</h2>
        <h3>add them using thier ID link</h3>
        <form>
          <input />
          <button>add</button>
        </form>
        <p>
          Your ID: <span id="ID">{`${userId}`}</span>
          <i className="bx bx-clipboard" onClick={() => copyUrl("ID")} />
        </p>
      </div>
    );
  return <p>Sign In or Sign Up</p>;
}

export default Home;
