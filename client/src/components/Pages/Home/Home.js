import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/auth/authContext";

function Home() {
  const [state, dispatch] = useContext(AuthContext);
  const { userId, authenticated } = state;
  if (authenticated)
    return (
      <div>
        <p>add your friends {`http://localhost:3000/sign-up/${userId}`}</p>
      </div>
    );
  return <p>Sign In or Sign Up</p>;
}

export default Home;
