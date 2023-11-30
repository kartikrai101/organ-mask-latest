import { Link, useNavigate } from "react-router-dom";
import {useState, useEffect, useRef} from 'react'
import axios from 'axios';

const PatientLogin = (props) => {

    const emailRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate();

    async function loginHandler(){
        const email= emailRef.current.value;
        const password = passwordRef.current.value;

        if(email === "" || password === ""){
            return;
        }

        const url = "http://localhost:8000/api/patient/login";
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        }

        const response = await axios.post(url, {email, password}, config);


        if(response.data.success === false){
            console.log("invalid email or password!")
            return 0;
        }

        const patientDetails = response.data.body;
        
        if(response.data.role === "donor"){
            // send to donor profile page
            const to = `/patient/donor/${patientDetails.donorId}`
            navigate(to)
        }else{
            // send to recipient profile page
            const to = `/patient/recipient/${patientDetails.recipientId}`
            navigate(to)
        }
        
        return 1;
    }

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full border-[2px] border-grey px-[30px] bg-white py-[15px] flex items-center justify-between">
                <Link to={'/'}><div className=" flex items-center space-x-3 hover:cursor-pointer">
                    <img src="/assets/logo2.png" alt="logo" className="w-[45px] h-[45px]" />
                    <p className="text-[32px] font-medium">Organ Mask</p>
                </div></Link>
            </div>

            <div className="flex items-center justify-center px-[30px] py-[30px] mt-[150px]">
                <div className="flex flex-col justify-center items-center">
                    <p className="text-[42px] font-medium">Login</p>
                    <div className="space-y-10 mt-[20px]">
                        <div className="">
                            <input ref={emailRef} type="text" placeholder="Email" className="text-[18px] px-[5px] border-b-[1px] border-black min-w-[400px]" />
                        </div>
                        <div className="">
                            <input ref={passwordRef} type="password" placeholder="Password" className="text-[18px] px-[5px] border-b-[1px] border-black min-w-[400px]" />
                        </div>
                    </div>
                    <button onClick={() => loginHandler()} className="bg-[#004e98] rounded-[5px] text-white font-medium px-[15px] w-[100px] py-[5px] mt-[30px]">Login</button>
                    <p className="mt-[20px] text-[#023e8a] font-medium hover:font-bold hover:cursor-pointer">Forgot password?</p>
                    <p><Link to={'/patient'}><span className="text-[#023e8a] font-medium hover:font-bold hover:cursor-pointer">Signup</span></Link> if you have not registered before!</p>
                </div>
            </div>
            <label></label>
        </div>

    );
}

export default PatientLogin;