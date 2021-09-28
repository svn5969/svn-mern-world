import React,{useEffect,useState} from 'react';
import ph from '../images/cell-phone-icon-blue.png'

const Contact = () => {
    
    const [userData,setUserData] = useState({name:"",email:"",phone:"",message:""});

    const userContact= async () => {
      try {
          const res = await fetch('/getdata',{
              method: 'GET',
              headers:{
                 "Content-Type": 'application/json' 
              }
          })
          const data = await res.json();
          console.log(data);
          setUserData({...userData,name:data.name,email:data.email,phone:data.phone,message:data.message});

          if (!res.status === 200 ) {
            const error = new Error(res.error);
            throw error;  
          }

      } catch (err) {
          console.log(err)
         
      }
    }
    useEffect(() => {
     userContact();
    },[])

    // Storing data in state  

    const handleInputs =(e)=>{
      const name = e.target.name;
      const value = e.target.value;
      setUserData({...userData,[name]:value});
    }

    // send the data to backend
     const contactForm = async (e)=>{
         e.preventDefault();

         const  { name,email,phone,work,message}= userData;
         const res=  await fetch('/contact',{
             method: 'POST',
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({
                name,email,phone,message
             })
         })
         const data = await res.json();

         if (!data) {
             console.log("message not send");
         }else{
             alert("Message send Successfully")
             setUserData({...userData,message: ""})
         }
     }

    return (
        <>
            <div className="contact-info">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
                            {/* phone number */}
                            <div className="contact-info-item mt-3 d-flex justify-content-start align-items-center">
                                <img style={{ width: '1.5rem', height: '1.5rem', marginLeft: '1rem' }} src={ph} alt="" />
                                <div className="contact_info_content">
                                    <div className="contact-info-title ps-3">
                                        Phone
                                    </div>

                                    <div className="contact-info-title ps-3">
                                        +01716931952
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="contact-info-item mt-3 d-flex justify-content-start align-items-center">
                                <img style={{ width: '1.5rem', height: '1.5rem', marginLeft: '1rem' }} src={ph} alt="" />
                                <div className="contact_info_content ">
                                    <div className="contact-info-title ps-3">
                                        Email
                                    </div>

                                    <div className="contact-info-title ps-3">
                                        svn@gmail.com
                                    </div>
                                </div>
                            </div>


                            {/* Address */}
                            <div className="contact-info-item mt-3 d-flex justify-content-start align-items-center">
                                <img style={{ width: '15px', height: '15px', marginLeft: '10px' }} src={ph} alt="" />
                                <div className="contact_info_content">
                                    <div className="contact-info-title ps-3">
                                        Address
                                    </div>

                                    <div className="contact-info-title ps-3">
                                        Faridpur,Dhaka,Bangladesh
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* contact us form */}
            <div className="contact_form">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                        <div className="contact_form-container py-5">
                         <div className="contact_form_title">
                             Get in Touch  
                         </div>
                         <form method='POST' id="contact_form">
                             <div className="contact_form_name d-flex justify-content-between align-items-between">
                                      <input type="text" id="contact_form_name" className="contact_form_name input_field_name" placeholder="Your Name" required="true"  name="name" value={userData.name}  onChange={handleInputs}  />

                                      <input type="text" id="contact_form_email" className="contact_form_email input_field_email" placeholder="Your Email" required="true" name="email" value={userData.email} onChange={handleInputs}/>

                                      <input type="number" id="contact_form_phone" className="contact_form_phone input_field" placeholder="Your Phone Number" required="true" name="phone" value={userData.phone} onChange={handleInputs} />
                             </div>

                             <div className="contact_form_text mt-4">
                                 <textarea className="contact_field contact_form_message" name="message" value={userData.message} onChange={handleInputs} placeholder="Message" cols="30" rows="10"></textarea>
                             </div>

                             <div className="contact_form_button">
                                 <button onClick={contactForm}  type="submit" className="btn btn-success" >Send Message</button>
                             </div>
                         </form>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;