import ReactDom from 'react-dom';
import { useState, useEffect, useRef } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const DonorModal = ({data, setDonorActiveModal}) => {

    const navigate = useNavigate();

    const verifyHandler = async () => {
        const donorId = data.donorId;

        // change the status of this donor to "verified"
        const url = `http://localhost:8000/api/patient/donor/${donorId}`;
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        }
        const requestBody = {status: "verified"};
        const response = await axios.put(url, requestBody, config);
        if(response.data.success === true){
            setDonorActiveModal(false);
            return 0;
        }else{
            return 0;
        }
    }

    const unverifyHandler = async () => {
        const donorId = data.donorId;

        // change the status of this donor to "verified"
        const url = `http://localhost:8000/api/patient/donor/${donorId}`;
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        }
        const requestBody = {status: "registered"};
        const response = await axios.put(url, requestBody, config);
        if(response.data.success === true){
            setDonorActiveModal(false);
            return 0;
        }else{
            return 0;
        }
    }

    const donatedHandler = async () => {
        const donorId = data.donorId;

        // navigate to the donation form 
        navigate(`/patient/donor/${donorId}/donate`)
    }

    return ReactDom.createPortal(
        <>
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#D9D9D980] z-1000" />
            <div className="min-w-[500px] flex flex-col items-center p-[20px] fixed z-1000 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FFFFFF] rounded-[10px] shadow-xl">
                <div className='flex justify-between w-full'>
                    <p className='text-[26px] font-medium'>Donor Details</p>
                    <img onClick = {() => setDonorActiveModal(false)} src="/assets/close.png" alt="close" className='hover:cursor-pointer w-[20px] h-[20px]' />
                </div>
                <hr className='w-full'/>

                <div className='flex flex-col w-full mt-[10px]'>
                    <p><span className='font-medium'>Name: </span>{data.fname} {data.lname}</p>
                    <p><span className='font-medium'>Donor ID: </span>{data.donorId} </p>
                    <p><span className='font-medium'>Contact: </span>{data.contact} </p>
                    <p><span className='font-medium'>Email: </span>{data.email} </p>
                    <p><span className='font-medium'>Date of Birth: </span>{data.dob} </p>
                    <p><span className='font-medium'>Blood Group: </span>{data.bloodType} </p>
                    <p><span className='font-medium'>Gender: </span>{data.gender} </p>
                    <p><span className='font-medium'>Address: </span>{data.address} </p>
                    <p><span className='font-medium'>Status: </span>{data.status} </p>
                    <p><span className='font-medium'>Medical History: </span> </p>
                    <p><span className='font-medium'>Organ for donation: </span>{data.donatedOrgan}</p>
                </div>

                {
                    data.status === "donated" ? null : (
                        data.status === "verified" ? (
                            <div className='mt-[20px] flex justify-between items-center space-x-5'>
                                <button onClick = {() => donatedHandler()} className='bg-[#2b9348] text-white w-[150px] py-[10px] rounded-[5px]'>Donate</button>
                                <button onClick={() => unverifyHandler()} className='bg-[#0077b6] text-white w-[150px] py-[10px] rounded-[5px]'>Mark Unverified</button>
                            </div>
                        ) : (
                            <div className='mt-[20px] flex justify-between items-center'>
                                <button onClick={() => verifyHandler()} className='bg-[#2b9348] text-white w-[150px] py-[10px] rounded-[5px]'>Mark as Verified</button>
                            </div>
                        )
                    )
                }
            </div>
        </>, document.getElementById("portal")
    );
}

export default DonorModal;