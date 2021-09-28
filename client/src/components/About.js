import React,{useEffect,useState} from 'react';
import dp from '../images/svn profile pic.jpg'
import aboutpic from '../images/about.jpg'
import {useHistory } from "react-router-dom";
const About = () => {
    const history = useHistory();
    const [userData,setUserData] = useState({});

    const callAboutPage= async () => {
      try {
          const res = await fetch('/about',{
              method: 'GET',
              headers:{
                 Accept: 'application/json',
                 "Content-Type": 'application/json' 
              },
              credentials: "include"
          })
          const data = await res.json();
          console.log(data);
          setUserData(data);

          if (!res.status === 200 ) {
            const error = new Error(res.error);
            throw error;  
          }

      } catch (err) {
          console.log(err)
          history.push('/login');
      }
    }
    useEffect(() => {
       callAboutPage();
    },[])
    return (
        <>
            <div className="container emp-profile">
                <from method="GET">
                    <div className="row pt-3">
                        <div className="col-md-4">
                            <div className="profile-img">
                            <img style={{ height: '20rem',width:'20rem' }} src={userData.name === "svndas" ? dp : aboutpic } alt="" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5 className="profile-head_name">{userData.name}</h5>
                                <h6 className="profile-head_work">{userData.work}</h6>
                                <p className="profile-rating mt-3 mb-5">Rankings <span>1/10</span></p>

                                <ul class="nav" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" id="home-tab" data-toggle="tab" role="tab" href="#home">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" id="profile-tab" data-toggle="tab" role="tab" href="#profile">Timeline</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                     <div className="col-md-2">
                         <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
                     </div>

                    </div>
                    <div className="row">
                        {/* left Side url */}
                           <div className="col-md-4">
                               <div className="profile-work">
                                   <p>Work list</p>
                                   <a href="#" target="svn">Youtube</a> <br/>
                                   <a href="#" target="svn">Facebook</a> <br/>
                                   <a href="#" target="svn">Instagram</a> <br/>
                                   <a href="#" target="svn">Twitter</a> <br/>
                                   <a href="#" target="svn">Code Force</a> <br/>
                                   <a href="#" target="svn">Hacker Rank</a> <br/>
                                   <a href="#" target="svn">Programming Hero</a> <br/>
                                   <a href="#" target="svn">MERN</a> <br/>
                               </div>
                           </div>

                        {/* right Side data toggle */}

                        <div className="col-md-8 about-info">
                              <div className="tab-content profile-tab" id="myTabContent">
                                  <div className="tab-pane show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label htmlFor="User Id">User Id</label>
                                            </div>
                                            <div className="col-md-6">
                                              <p>{userData._id}</p>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label htmlFor="name">Name</label>
                                            </div>
                                            <div className="col-md-6">
                                              <p>{userData.name}</p>
                                            </div>
                                         </div>

                                         <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label htmlFor="User Id">Email</label>
                                            </div>
                                            <div className="col-md-6">
                                              <p>{userData.email}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label htmlFor="User Id">Phone</label>
                                            </div>
                                            <div className="col-md-6">
                                              <p>{userData.phone}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label htmlFor="User Id">Profession</label>
                                            </div>
                                            <div className="col-md-6">
                                              <p>{userData.work}</p>
                                            </div>
                                        </div>
                                        

                                  </div>
                              </div>
                        </div>
                    </div>
                </from>
            </div>
        </>
    );
};

export default About;