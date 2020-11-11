import React from "react";
import { BaseUrl } from "../../../App";

function Home() {
  if (localStorage.getItem("userId"))
    return (
      <div>
        <p>
          add your friends{" "}
          {`${BaseUrl}/sign-up/${localStorage.getItem("userId")}`}
        </p>
      </div>
    );
  return <p>Sign In or Sign Up</p>;
}

export default Home;
