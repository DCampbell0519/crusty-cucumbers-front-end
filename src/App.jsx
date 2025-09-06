import { useState, useContext } from "react";
import { Route, Routes } from "react-router";
import { UserContext } from "./contexts/UserContext.jsx";
import "./App.css";
import NavBar from "./components/NavBar/NavBar.jsx";
import SignUpForm from "./components/SignUpForm/SignUpForm.jsx";
import SignInForm from "./components/SignInForm/SignInForm.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import ProfilePage from "./components/ProfilePage/ProfilePage.jsx";


function App() {
  const { user } = useContext(UserContext);

  return (
    <>
    <NavBar />
      <Routes>
        <Route path='/sign-up' element={<SignUpForm />}/>
        <Route path='/sign-in' element={<SignInForm />}/>
        <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}></Route>
      </Routes>
    </>
  );
}

export default App;
