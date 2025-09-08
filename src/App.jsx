import { useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "./contexts/UserContext.jsx";
import "./App.css";
import NavBar from "./components/NavBar/NavBar.jsx";
import SignUpForm from "./components/SignUpForm/SignUpForm.jsx";
import SignInForm from "./components/SignInForm/SignInForm.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import ProfilePage from "./components/ProfilePage/ProfilePage.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Landing from "./components/Landing/Landing.jsx";
import MovieDetails from "./components/MovieDetails/MovieDetails.jsx";

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
    <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        <Route path='/sign-up' element={<SignUpForm />}/>
        <Route path='/sign-in' element={<SignInForm />}/>
        <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}></Route>
        <Route path='/movies/:imdbID' element={<MovieDetails />} />
      </Routes>
    </>
  );
}

export default App;
