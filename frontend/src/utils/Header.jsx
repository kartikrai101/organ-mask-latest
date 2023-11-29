import { Link } from "react-router-dom";

const Header = (props) => {
    return (
        <div className="w-full border-[2px] border-grey px-[30px] bg-white py-[15px] flex items-center justify-between">
            <Link to={'/'}><div className=" flex items-center space-x-3 hover:cursor-pointer">
                <img src="/assets/logo2.png" alt="logo" className="w-[45px] h-[45px]" />
                <p className="text-[32px] font-medium">Organ Mask</p>
            </div></Link>
            <div className="space-x-10 ">
                <Link to={'/hospital/login'}><button className="bg-[#004e98] text-white font-medium px-[13px] py-[7px] rounded-[5px] hover:shadow-xl">Login as Hospital</button></Link>
                <Link to={'/patient'}><button className="bg-[#004e98] text-white font-medium px-[13px] py-[7px] rounded-[5px] hover:shadow-xl">Enter as Patient</button></Link>
            </div>
        </div>
    );
}

export default Header;