import { Link, useNavigate } from "react-router-dom";
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';


const Login = (props) => {

    const idRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate();

    async function loginHandler(){
        const hospitalId = idRef.current.value;
        const password = passwordRef.current.value;

        const url = "http://localhost:8000/api/hospital/login";
        const data = {
            hospitalId: hospitalId,
            password: password
        }
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        }
        const response = await axios.post(url, data, config);

        if(response.data.success === false){
            console.log(response.data.message)
        }else{
            navigate('/hospital/dashboard')
        }
    }

    return (
        <div className="">
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
                            <input ref ={idRef} type="text" placeholder="Hospital ID" className="text-[18px] px-[5px] border-b-[1px] border-black min-w-[400px]" />
                        </div>
                        <div className="">
                            <input ref={passwordRef} type="password" placeholder="Password" className="text-[18px] px-[5px] border-b-[1px] border-black min-w-[400px]" />
                        </div>
                    </div>
                    <button onClick={() => loginHandler()} className="bg-[#004e98] rounded-[5px] text-white font-medium px-[15px] w-[100px] py-[5px] mt-[30px]">Login</button>
                    <p className="mt-[20px] text-[#023e8a] font-medium hover:font-bold hover:cursor-pointer">Forgot password?</p>
                    {/* <p><span className="text-[#023e8a] font-medium hover:font-bold hover:cursor-pointer">Signup</span> if you have not registered before!</p> */}
                </div>
            </div>
        </div>
    );
}

export default Login;