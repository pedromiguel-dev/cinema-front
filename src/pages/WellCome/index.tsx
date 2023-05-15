import { Link } from "react-router-dom";

const WellCome = () => {
  return (
    <main>
      <Link to={"Home"}>Home</Link>
      <Link to={"Login"}>Login</Link>
      <Link to={"Register"}>Register</Link>
    </main>
  );
};

export default WellCome;
