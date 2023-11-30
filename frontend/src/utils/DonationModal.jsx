import ReactDom from 'react-dom';
import { useState, useEffect, useRef } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const DonationModal = ({donationData, setActiveModal}) => {

    const passwordRef = useRef();
    const tokenRef = useRef();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const donationHandler = async () => {
        // check if the entered password is correct or not
        setLoading(true)
        const pass = passwordRef.current.value;
        const token = tokenRef.current.value;
        if(pass === "hospital@2023" && token === donationData.secretToken){
            // create a donation
            const url = `http://localhost:8000/api/donation/create`;
            const data = {
                donorId: donationData.donorId,
                recipientId: donationData.recipientId
            }
            const config = {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }
            }

            const response = await axios.post(url, data, config);

            if(response.data.success === true){
                // redirect the hospital to a donation confirmation page
                navigate('/donation/confirmation');
                return 1;
            }else{
                console.log("Error in creating donation!")
                return 0;
            }
        }else{
            console.log("Invalid password")
            return 0;
        }
    }

    return ReactDom.createPortal(
        <>
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#D9D9D980] z-1000" />
            <div className="min-w-[500px] flex flex-col items-center p-[20px] fixed z-1000 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FFFFFF] rounded-[10px] shadow-xl">
                <div className='flex justify-between w-full'>
                    <p className='text-[26px] font-medium'>Donation Details</p>
                    <img onClick = {() => setActiveModal(false)} src="/assets/close.png" alt="close" className='hover:cursor-pointer w-[20px] h-[20px]' />
                </div>
                <hr className='w-full'/>

                <div className='flex flex-col w-full mt-[10px]'>
                    <p><span className='font-medium'>Donor Name: </span>{donationData.donorName}</p>
                    <p><span className='font-medium'>Donor ID: </span>{donationData.donorId} </p>
                    <p><span className='font-medium'>Recipient Name: </span>{donationData.recipientName} </p>
                    <p><span className='font-medium'>Recipient ID: </span>{donationData.recipientId} </p>
                    <p><span className='font-medium'>Organ for Donation: </span>{donationData.organ} </p>
                    <p><span className='font-medium'>Blood Group: </span>{donationData.bloodType} </p>
                    <label className='font-bold mt-[10px]'>Enter the hospital password below to proceed donation</label>
                    <input ref={passwordRef} type="password" placeholder="password" className='border-[2px] border-[#6c757d] rounded-[5px] px-[10px] py-[6px] mt-[5px] text-[18px]'  />
                    <label className='font-bold mt-[10px]'>Enter the donor's secret token</label>
                    <input ref={tokenRef} type="text" placeholder="secret token" className='border-[2px] border-[#6c757d] rounded-[5px] px-[10px] py-[6px] mt-[5px] text-[18px]'  />
                </div>

                        <button onClick = {() => donationHandler()} className='mt-[20px] bg-[#0077b6] text-white font-medium px-[12px] py-[7px] rounded-[5px]'>Proceed</button>

            </div>
        </>, document.getElementById("portal")
    );
}

export default DonationModal;