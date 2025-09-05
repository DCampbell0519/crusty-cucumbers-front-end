import { useState, useContext } from "react";
import { Route, Routes } from "react-router";
import { UserContext } from "./contexts/UserContext.jsx";
import "./App.css";
import SignUpForm from "./components/SignUpForm/SignUpForm.jsx";
import SignInForm from "./components/SignInForm/SignInForm.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
    <NavBar />
      <Routes>
        <Route path='/sign-up' element={<SignUpForm />}/>
        <Route path='/sign-in' element={<SignInForm />}/>
        
      </Routes>
    </>
  );
}

export default App;
