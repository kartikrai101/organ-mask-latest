import {useEffect, useState, useRef} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

const DonorDetails = (props) => {
    const params = useParams();
    const [donorDetails, setDonorDetails] = useState({})
    const [status, setStatus] = useState("");

    useEffect(() => {
        // get all the details of the current user from the donorId
        const donorId = params.id;
        const getDonorDetails = async () => {
            const url = `http://localhost:8000/api/patient/donor/${donorId}`;
            const config = {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }
            }
            const details = await axios.get(url, config);
            setDonorDetails(details.data.body)
            setStatus(details.data.body.status)
        }
        getDonorDetails();
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
                    <p className='font-normal text-[22px] text-center'>Details of donor <span className='font-medium'>{donorDetails.fname} {donorDetails.lname}</span></p>
                    <div className='flex space-x-1 text-[18px]'>
                        <p>Donation Status: </p> {
                            status === "donated" ? <span className='text-[#55a630] font-bold'>Donated</span> : (
                                status === "verified" ? <span className='text-[#fca311] font-bold'>Verified</span> : (
                                    <span className='text-[#ba181b] font-bold'>Registered</span>
                                )
                            )
                        }
                    </div>
                </div>

                <div className='bg-[#f8f9fa] h-full rounded-[10px] p-[30px] space-y-1'>
                    <p className='text-[18px]'><span className='font-medium'>First name:</span> {donorDetails.fname}</p>
                    <p className='text-[18px]'><span className='font-medium'>Last name:</span> {donorDetails.lname}</p>
                    <p className='text-[18px]'><span className='font-medium'>Donor ID:</span> {donorDetails.donorId}</p>
                    <p className='text-[18px]'><span className='font-medium'>Email:</span> {donorDetails.email}</p>
                    <p className='text-[18px]'><span className='font-medium'>Contact:</span> {donorDetails.contact}</p>
                    <p className='text-[18px]'><span className='font-medium'>Date of Birth:</span> {donorDetails.dob}</p>
                    <p className='text-[18px]'><span className='font-medium'>Gender:</span> {donorDetails.gender}</p>
                    <p className='text-[18px]'><span className='font-medium'>Blood Group:</span> {donorDetails.bloodType}</p>
                    <p className='text-[18px]'><span className='font-medium'>Address:</span> {donorDetails.address}</p>
                    <p className='text-[18px]'><span className='font-medium'>Organ for donation:</span> {donorDetails.donatedOrgan}</p>
                    <p className='text-[18px]'><span className='font-medium'>Donation requested on:</span> {donorDetails.createdAt}</p>
                    <p className='text-[18px]'><span className='font-medium'>Unique token:</span> {donorDetails.blockchainToken}</p>
                </div>
            </div>
        </div>
    );
}

export default DonorDetails;