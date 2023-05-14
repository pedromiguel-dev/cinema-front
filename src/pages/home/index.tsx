// import React from "react";

import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section>
        <h1>Home page</h1>
        <Link to={"/Users"}>see users</Link>
      </section>
    </>
  );
}

export default Home;
