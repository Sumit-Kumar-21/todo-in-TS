import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./components/UI-components/SignUp";
import SignIn from "./components/UI-components/SignIn";
import DashBoard from "./components/UI-components/DashBoard";
import Welcome from "./components/UI-components/Welcome";
import useGetUser from "./components/hooks/useGetUser";
import { useEffect, useState } from "react";

function App() {
  const { verify } = useGetUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (verify !== undefined) {
      setLoading(false);
    }
  }, [verify]);

  console.log(`verify is ${verify}`);
  console.log(`loading is ${loading}`);

  if (loading) {
    return <div></div>;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<DashBoard />} />
          {verify ? (
            <Route path="/*" element={<Navigate to="/dashboard" />} />
          ) : (
            <Route path="/*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
