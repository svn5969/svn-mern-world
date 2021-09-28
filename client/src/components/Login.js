import React,{useState,useContext} from 'react';
import './signup/Signup.css'
import {NavLink,useHistory} from 'react-router-dom';
import {UserContext} from "../App"
import login from "../images/technology-internet-password-security-user-260nw-514837687.jpg"
const Login = () => {
    
    const {state,dispatch} = useContext(UserContext)

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const history = useHistory();
    const loginUser = async(e)=>{
        e.preventDefault();
       const res = await fetch('/signin',{
           method: "POST",
           headers: {
               "Content-Type": "application/json",
           },
           body:JSON.stringify({
               email,password
           })
       })
       const data = res.json();
       if (res.status=== 400 || !data) {
          window.alert("Invalid Credentials") 
       }else{
           dispatch({type:"USER",payload:true})
           window.alert("Login Successful")
           history.push("/")
       }
    }
    return (
        <div>
            <div id="login-box">
                <form method="POST">
                <div class="left mt-5">
                    <h1>Log-In</h1>


                    <div className="d-flex">
                        <label htmlFor="email">

                            <i className="zmdi zmdi-email zmdi-hc-lg pt-2 me-3"></i>
                        </label>
                        <input type="text" name="username" placeholder="E-Mail" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>

                    <div className="d-flex">
                        <label htmlFor="password">

                            <i class="zmdi zmdi-lock-outline zmdi-hc-lg me-3"></i>
                        </label>
                        <input type="password" name="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}  />
                    </div>

                   <div className="d-flex">
                       <div>
                       <button onClick={loginUser} type="submit" name="signin" id="signin" className="btn btn-primary">Log In</button>
                       </div>
                       <div className="ms-5">
                       <div className="ms-5 mt-3">OR</div>
                       </div>
                   </div>
                    
                </div>

                <div className="right mt-5">
                    <img className="login-image" src={login} alt="" style={{width:'20rem',height:'15rem',marginBottom:'1rem',marginTop:'2rem',marginLeft:'2rem'}}/>
{/* 
                    <button className="social-signin facebook">Log in with facebook</button>
                    <button className="social-signin twitter">Log in with Twitter</button>
                    <button className="social-signin google">Log in with Google+</button> */}
                    <NavLink  to="/signup" className="already-registered ms-5" >I don't have any account</NavLink>
                </div>
                <div className="or">OR</div>
                </form>
            </div>
          
        </div>
    );
};

export default Login;