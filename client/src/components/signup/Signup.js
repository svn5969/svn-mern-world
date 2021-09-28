import React,{useState} from 'react';
import signupImage from '../../images/smart_learning_carrusel_640x360_en_07.jpg';
import './Signup.css'
import {NavLink,useHistory} from 'react-router-dom';
const Signup = () => {
    const history = useHistory();
    const [user,setUser] = useState({
        name:"",
        email:"",
        phone:"",
        work:"",
        password:"",
        cpassword:"",
    })
    let name, value;
    const handleInputs =(e)=>{
      name = e.target.name;
      value = e.target.value;

      setUser({...user,[name]:value});
    }
    
    const postData = async(e)=>{
        e.preventDefault();
        const {name,email,phone,work,password,cpassword} = user;
       
       const res = await fetch("/register", {
           method: "POST",
           headers: {
            "Content-Type": "application/json"
           },
           body: JSON.stringify({
            name,email,phone,work,password,cpassword   
           })

       })
       const data = await res.json()
       if (data.status === 422 || !data) {
           window.alert("Invalid Registration");
           console.log("Invalid Registration")
    }else{
        window.alert("Registration Successfull")
        console.log("Registration Successfull")

        history.push("/login")
    }
       
    }

    return (
        <>
            <div id="login-box">
                <div class="left">
                    <h1>Sign up</h1>
                    <form  method="POST">
                    <div className="d-flex">
                        <label htmlFor="name">

                            <i className="zmdi zmdi-account zmdi-hc-lg pt-2 me-3"></i>
                        </label>
                        <input type="text" name="name" placeholder="Username" autocomplete="off" value={user.name} onChange={handleInputs}  />
                    </div>

                    <div className="d-flex">
                        <label htmlFor="email">

                            <i className="zmdi zmdi-email zmdi-hc-lg pt-2 me-3"></i>
                        </label>
                        <input type="text" name="email" placeholder="E-Mail" autocomplete="off" value={user.email} onChange={handleInputs}  />
                    </div>

                    <div className="d-flex">
                        <label htmlFor="phone">

                            <i className="zmdi zmdi-phone-in-talk zmdi-hc-lg pt-2 me-3"></i>
                        </label>
                        <input type="text" name="phone" placeholder="Your Number" autocomplete="off" value={user.phone} onChange={handleInputs}  />
                    </div>

                 

                    <div className="d-flex">
                        <label htmlFor="work">

                            <i className="zmdi zmdi-slideshow zmdi-hc-lg pt-2 me-3"></i>
                        </label>
                        <input type="text" name="work" placeholder="Your Profession" autocomplete="off" value={user.work} onChange={handleInputs}  />
                    </div>

                    <div className="d-flex">
                        <label htmlFor="password">

                        <i class="zmdi zmdi-lock-outline zmdi-hc-lg me-3"></i>
                        </label>
                        <input type="password" name="password" placeholder="Password" autocomplete="off"  value={user.password} onChange={handleInputs} />
                    </div>

                    <div className="d-flex">
                        <label htmlFor="cpassword">

                        <i class="zmdi zmdi-lock-outline zmdi-hc-lg me-3"></i>
                        </label>
                        <input type="password" name="cpassword" placeholder="Retype password" autocomplete="off" value={user.cpassword} onChange={handleInputs} />
                    </div>
                   
                    <input  type="submit" name="signup_submit" value="Register"  onClick={postData} />
                    </form>
                </div>

                <div className="right">
                    <img style={{marginTop: '80px',height: '150px',width: '240px'}} src={signupImage} alt="" />
                     <br />
                     <br />
                     <NavLink to="/login" className="already-registered" >I am already registered</NavLink>

                    {/* <span className="loginwith text-black">Sign in with<br />social network</span>

                    <button className="social-signin facebook">Log in with facebook</button>
                    <button className="social-signin twitter">Log in with Twitter</button>
                    <button className="social-signin google">Log in with Google+</button> */}
                </div>
                {/* <div className="or">OR</div> */}
              
            </div>

            {/* <section className="signup">
                <div className="container mt-5">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign Up</h2>
                            <form className="register-form" id="register-form">

                                <div className="form-group">
                                    <label htmlFor="name">
                                        <i class="zmdi zmdi-account material-icons-name"></i>
                                    </label>
                                    <input type="text" name="name" placeholder="Your Name" autocomplete="off" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name">
                                        <i class="zmdi zmdi-account material-icons-name"></i>
                                    </label>
                                    <input type="text" name="name" placeholder="Your Name" autocomplete="off" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name">
                                        <i class="zmdi zmdi-account material-icons-name"></i>
                                    </label>
                                    <input type="text" name="name" placeholder="Your Name" autocomplete="off" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name">
                                        <i class="zmdi zmdi-account material-icons-name"></i>
                                    </label>
                                    <input type="text" name="name" placeholder="Your Name" autocomplete="off" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name">
                                        <i class="zmdi zmdi-account material-icons-name"></i>
                                    </label>
                                    <input type="text" name="name" placeholder="Your Name" autocomplete="off" />
                                </div>


                            </form>
                        </div>
                    </div>
                </div>
            </section> */}
        </>
    );
};

export default Signup;