import React, { useState, useEffect } from 'react';

const Home = () => {
    const [userName, setUserName] = useState('');
    const [show, setShow] = useState(false);
    const userHomePage = async () => {
        try {
            const res = await fetch('/getdata', {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            const data = await res.json();
            console.log(data);
            setUserName(data.name);
            setShow(true)

        } catch (err) {
            console.log(err)

        }
    }
    useEffect(() => {
        userHomePage();
    }, [])

    return (
        <>

            {/* <div class="wrapper body-home">
                <div class="box-home boxLeft">
                    <p className="pt-5 welcome">WELCOME</p>
                </div>
                <div class="box-home boxRight">
                    <h1>{userName}</h1>
                    <h1>{show ? 'Happy, to see you Back' : 'We Are The MERN Developer'}</h1>
                </div>
            </div> */}
         
          <div className="home">
               <div className="home-div">
                   <div className="col-md-6 welcome">
                   <p className="pt-5">WELCOME</p>
                   </div>
                  
                <div className="col-md-6 welcome-name">
                <h1 className="welcome-name-user justify-content-center">{userName}</h1>
                   <h1>{show ? 'Happy, to see you Back':'We Are The MERN Developer'}</h1>
                </div>
               </div>
           </div>
         
        </>
    );
};

export default Home;