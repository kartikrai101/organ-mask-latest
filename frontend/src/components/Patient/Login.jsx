import { Link, useNavigate } from "react-router-dom";
import {useState, useEffect, useRef} from 'react'

const Login = (props) => {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full border-[2px] border-grey px-[30px] bg-white py-[15px] flex items-center justify-between">
            <Link to={'/'}><div className=" flex items-center space-x-3 hover:cursor-pointer">
                <img src="/assets/logo2.png" alt="logo" className="w-[45px] h-[45px]" />
                <p className="text-[32px] font-medium">Organ Mask</p>
            </div></Link>
            </div>

            <div className="flex items-center w-[50%] justify-between mt-[150px] space-x-10">
                <Link to={'/patient/donor'}><div className="flex flex-col items-center justify-center hover:cursor-pointer bg-[#adb5bd] p-[40px] rounded-[10px] hover:shadow-xl">
                    <img src="/assets/donate.png" alt="donate" className="w-[200px] rounded-[10px]" />
                    <p className="mt-[10px] text-[30px] text-white font-bold">Donate an organ</p>
                </div></Link>
                <Link to={'/patient/recipient'}><div className="flex flex-col items-center justify-center hover:cursor-pointer bg-[#adb5bd] p-[40px] rounded-[10px] hover:shadow-xl">
                    <img src="/assets/receive.png" alt="receive" className="w-[200px] rounded-[10px]" />
                    <p className="mt-[10px] text-[30px] text-white font-bold">Request an organ</p>
                </div></Link>
            </div>
            <div className="w-[50%] mt-[40px] flex items-center justify-center">
                <p className="text-[18px]"><Link to={'/patient/login'}><span className="mt-[20px] text-[#023e8a] font-medium hover:font-bold hover:cursor-pointer">Login</span></Link> as a registered patient?</p>
            </div>
        </div>
    );
}

export default Login;