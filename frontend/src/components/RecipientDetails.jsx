import {useEffect, useState, useRef} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

const RecipientDetails = (props) => {
    const params = useParams();
    const [recipientDetails, setRecipientDetails] = useState({})
    const [status, setStatus] = useState("");

    useEffect(() => {
        // get all the details of the current user from the donorId
        const recipientId = params.id;
        const getRecipientDetails = async () => {
            const url = `http://localhost:8000/api/patient/recipient/${recipientId}`;
            const config = {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }
            }
            const details = await axios.get(url, config);
            setRecipientDetails(details.data.body)
            setStatus(details.data.body.status)
        }
        getRecipientDetails();
    } ,[])

    return (
        <div className='h-[100vh]'>
            <div className="w-full border-[2px] border-grey px-[30px] bg-white py-[15px] flex items-center justify-between">
                <div className=" flex items-center space-x-3 hover:cursor-pointer">
                    <img src="/assets/logo2.png" alt="logo" className="w-[45px] h-[45px]" />
                    <p className="text-[32px] font-medium">Organ Mask</p>
                </div>
            </div>
            <div className='px-[30px] h-[75%] w-full py-[20px] space-y-5'>
                <div className='bg-[#dee2e6] rounded-[10px] w-full py-[20px] px-[20px] flex justify-between items-center'>
                    <p className='font-normal text-[22px] text-center'>Details of recipient <span className='font-medium'>{recipientDetails.fname} {recipientDetails.lname}</span></p>
                    <div className='flex space-x-1 text-[18px]'>
                        <p>Reception Status: </p> {
                            status === "received" ? <span className='text-[#55a630] font-bold'>Received</span> : (
                                status === "verified" ? <span className='text-[#fca311] font-bold'>Verified</span> : (
                                    <span className='text-[#ba181b] font-bold'>Registered</span>
                                )
                            )
                        }
                    </div>
                </div>

                <div className='bg-[#f8f9fa] h-full rounded-[10px] p-[30px] space-y-1'>
                    <p className='text-[18px]'><span className='font-medium'>First name:</span> {recipientDetails.fname}</p>
                    <p className='text-[18px]'><span className='font-medium'>Last name:</span> {recipientDetails.lname}</p>
                    <p className='text-[18px]'><span className='font-medium'>Recipient ID:</span> {recipientDetails.recipientId}</p>
                    <p className='text-[18px]'><span className='font-medium'>Email:</span> {recipientDetails.email}</p>
                    <p className='text-[18px]'><span className='font-medium'>Contact:</span> {recipientDetails.contact}</p>
                    <p className='text-[18px]'><span className='font-medium'>Date of Birth:</span> {recipientDetails.dob}</p>
                    <p className='text-[18px]'><span className='font-medium'>Gender:</span> {recipientDetails.gender}</p>
                    <p className='text-[18px]'><span className='font-medium'>Blood Group:</span> {recipientDetails.bloodType}</p>
                    <p className='text-[18px]'><span className='font-medium'>Address:</span> {recipientDetails.address}</p>
                    <p className='text-[18px]'><span className='font-medium'>Requested organ:</span> {recipientDetails.requestedOrgan}</p>
                    <p className='text-[18px]'><span className='font-medium'>Donation requested on:</span> {recipientDetails.createdAt}</p>
                    <p className='text-[18px]'><span className='font-medium'>Unique token:</span> {recipientDetails.blockchainToken}</p>
                </div>
            </div>
        </div>
    );
}

export default RecipientDetails;