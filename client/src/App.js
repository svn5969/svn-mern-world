import logo from './logo.svg';
import React,{createContext,useReducer} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Signup from './components/signup/Signup';
import Login from './components/Login';
import Contact from './components/Contact';
import Errorpage from './components/Errorpage';
import Logout from './components/Logout';

import {initialState,reducer} from '../src/reducer/UseReducer'

  // 1: contextAPI
  export const UserContext = createContext();

const Routing=()=>{
  return(
   <Switch>
   <Route exact path="/">
     <Home></Home>
   </Route>

   <Route path="/about">
     <About></About>
   </Route>

   <Route path="/contact">
     <Contact></Contact>
   </Route>

   <Route path="/login">
     <Login></Login>
   </Route>

   <Route path="/signup">
     <Signup></Signup>
   </Route>
   <Route path="/logout">
     <Logout></Logout>
   </Route>
   <Route>
     <Errorpage></Errorpage>
   </Route>

 </Switch>
  )
 }
function App() {

  const [state, dispatch] = useReducer(reducer, initialState)
  return (
 
    <>
    <UserContext.Provider value={{state,dispatch}}>
      <Navbar></Navbar>
     <Routing></Routing>
      </UserContext.Provider>

    </>
  );
}

export default App;
