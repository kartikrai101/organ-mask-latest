import Header from "../utils/Header";
import {useState, useEffect, useRef} from 'react';
import Typed from "typed.js";
import { Link } from "react-router-dom";

const taglines = [
    "Preserve Lives, Combat Trafficking",
    "Empowering Life, Ensuring Trust",
    "Securing Lives, Uniting Hearts",
    "A Future Beyond Trafficking",
    "Bridging Hope, Blocking Trafficking",
    "Donor to Recipient, Heart to Heart",
    "Empathy in Every Exchange",
    "In the Heartbeat of Trust"
]


const Homepage = (props) => {

    const [tagline, setTagline] = useState(0);
    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
          strings: ["Revolutionizing Healthcare:", 
          "Empowering Life, Ensuring Trust", 
          "Securing Lives, Uniting Hearts", 
          "A Future Beyond Trafficking",
          "Bridging Hope, Blocking Trafficking",
          "Donor to Recipient, Heart to Heart",
          "Empathy in Every Exchange",
          "In the Heartbeat of Trust"
        ],
          startDelay: 20,
          typeSpeed: 50,
          backSpeed: 50,
          backDelay: 300,
          smartBackspace: true,
          loop: true,
          showCursor: false,
        });
    
        return () => {
          typed.destroy();
        };
    }, []);
    
    function alterTagline() {
        let rand = Math.floor(Math.random()*10);
        while(rand > 7 || rand == tagline){
            rand = Math.floor(Math.random()*10);
        }
        setTagline(rand);
    }

    return (
        <div className="bg-[#004e98] h-[100vh]">
            <Header />
            <div className="w-full px-[30px] py-[15px] bg-custom-image flex flex-col items-center">
                <div className="w-full flex justify-center">
                    <p onMouseEnter= {() => alterTagline()} className="font-bold text-[52px] w-[500px] text-center line-height-[0.75rem]">{taglines[tagline]}</p>
                </div>
                <div className="mt-[10px] mb-[10px] bg-[#004e98] px-[30px] py-[20px] rounded-[10px] w-[80%]">
                    <p className="text-[22px] font-medium text-white h-[40px] " ref={el}></p>
                    <div className="border-[1px] border-white w-[26%]"></div>
                    <p className="text-[18px] mt-[10px] font-normal text-white">Our project introduces dynamic and interactive dashboards for hospitals, empowering seamless engagement with patient data. Whether it's a crucial organ donation or a life-saving transplant, our platform facilitates patient-initiated requests, fostering a compassionate and efficient healthcare ecosystem. Join us in pioneering a transformative approach to organ care.</p>
                </div>
            </div>
            <div className="flex justify-between space-x-5 w-full bg-[#004e98] px-[30px] py-[30px]">
                <div className="bg-white w-[25%] rounded-[5px] py-[15px] px-[20px] flex flex-col items-center hover:shadow-xl">
                    <p className="font-medium text-[22px]">Secure Transaction</p>
                    <p className="text-center mt-[10px]">Organ Masks promises a secure transaction of organs between the donor and hospital, and the hospital and recepient.</p>
                </div>
                <div className="bg-white w-[25%] rounded-[5px] py-[15px] px-[20px] flex flex-col items-center hover:shadow-xl">
                    <p className="font-medium text-[22px]">Easy & Fast Communication</p>
                    <p className="text-center mt-[10px]">Our platform helps patients and hospitals to communicate in a seamless manner without the requirement of having some mediator between the two. We know how valuable time is in medical situations!</p>
                </div>
                <div className="bg-white w-[25%] rounded-[5px] py-[15px] px-[20px] flex flex-col items-center hover:shadow-xl">
                    <p className="font-medium text-[22px]">Interactive Dashboards</p>
                    <p className="text-center mt-[10px]">The registered hospitals get an interactive dashboard where they can match the requirements of donors and recipients and accept or decline organ donation or reception requests.</p>
                </div>
                <div className="bg-white w-[25%] rounded-[5px] py-[15px] px-[20px] flex flex-col items-center hover:shadow-xl">
                    <p className="font-medium text-[22px]">More features</p>
                    <p className="text-center mt-[10px]">We are still in the development phase of Organ Mask and we have a ton of different features that are under development. Read this to get a more comprehensive idea of the complete view of Organ Mask.</p>
                </div>
            </div>
            <div className="flex items-center space-x-1 px-[30px]">
                <p className="text-white font-[18px]">Read our research paper</p>
                <img src="https://res.cloudinary.com/kartik09/image/upload/v1701081013/waste-management/Screenshot_2023-11-27_at_4.00.03_PM_nymwpv.png" alt="arrow" className="w-[50px]"  />
            </div>
        </div>
    );
}

export default Homepage;