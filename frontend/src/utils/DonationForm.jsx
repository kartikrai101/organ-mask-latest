import {useState, useEffect, useRef} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import DonationModal from './DonationModal';

const DonationForm = (props) => {

    const params = useParams();
    const [donorDetails, setDonorDetails] = useState({});
    
    const [searching, setSearching] = useState(false);

    const [recipientsList, setRecipientsList] = useState([]);

    const [activeModal, setActiveModal] = useState(false);
    const [donationData, setDonationData] = useState({});

    useEffect(() => {
        const callback = async () => {
            // get the details of the donor from donor id
            const donorId = params.id;

            const url = `http://localhost:8000/api/patient/donor/${donorId}`;
            
            const response = await axios.get(url);

            if(response.data.success === false){
                console.log("Invalid donor id")
                return 0;
            }else{
                setDonorDetails(response.data.body);
                return 1;
            }
        }
        callback();
    }, [])

    const searchRecipients = async () => {
        const searchData = {
            organ: donorDetails.donatedOrgan,
            bloodType: donorDetails.bloodType,
            status: "verified"
        }

        const url = "http://localhost:8000/api/patient/recipient/search"
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        }
        const response = await axios.post(url, searchData, config);
        setRecipientsList(response.data.body);
        setSearching(true);
        return 1;
    }

    const handleClick = async (recipientData) => {
        const data = {
            donorName: donorDetails.fname + " " + donorDetails.lname,
            donorId: donorDetails.donorId,
            recipientName: recipientData.fname + " " + recipientData.lname,
            recipientId: recipientData.recipientId,
            organ: donorDetails.donatedOrgan,
            bloodType: donorDetails.bloodType,
            secretToken: donorDetails.secretToken
        }
        setDonationData(data);
        setActiveModal(true);
        return 0;
    }

    return (
        <div className="h-[100vh]">
            <div className="w-full border-[2px] border-grey px-[30px] bg-white py-[15px] flex items-center justify-between">
                <div className=" flex items-center space-x-3 hover:cursor-pointer">
                    <img src="/assets/logo2.png" alt="logo" className="w-[45px] h-[45px]" />
                    <p className="text-[32px] font-medium">Organ Mask</p>
                </div>
            </div>

            {
                activeModal ? (
                    <DonationModal donationData = {donationData} setActiveModal={setActiveModal} />
                ) : null
            }


            <div className="w-full h-[85%] flex flex-col items-center">
                <p className="mt-[20px] text-[32px] font-medium">Organ donation form</p>
                <div className="mt-[20px] w-[50%] flex flex-col justify-center items-center">
                    <div className='flex justify-between items-center space-x-5'>
                        <div className='flex flex-col items-start'>
                            <label className=''>Donor Name</label>
                            <input type="text" value = {donorDetails.fname+donorDetails.lname} className="mt-[5px] text-[18px] px-[10px] border-[1px] rounded-[5px] border-grey py-[5px] w-[350px]" />
                        </div>
                        <div className='flex flex-col items-start'>
                            <label className=''>Donor ID</label>
                            <input value = {donorDetails.donorId} type="text" placeholder="Last name" className="mt-[5px] text-[18px] px-[10px] border-[1px] rounded-[5px] border-grey py-[5px] w-[350px]" />
                        </div>
                    </div>

                    <div className='flex justify-between items-center mt-[10px] space-x-5'>
                        <div className='flex flex-col items-start'>
                            <label className=''>Donor Blood Type</label>
                            <input type="text" value = {donorDetails.bloodType} className="mt-[5px] text-[18px] px-[10px] border-[1px] rounded-[5px] border-grey py-[5px] w-[350px]" />
                        </div>
                        <div className='flex flex-col items-start'>
                            <label className=''>Donor organ</label>
                            <input value = {donorDetails.donatedOrgan} type="text" placeholder="Last name" className="mt-[5px] text-[18px] px-[10px] border-[1px] rounded-[5px] border-grey py-[5px] w-[350px]" />
                        </div>
                    </div>

                    {
                        !searching ? (
                            <button onClick={() => searchRecipients()} className='mt-[20px] bg-[#0077b6] text-white w-[200px] py-[10px] rounded-[5px] font-medium text-center'>Search Valid Recipients</button>
                        ) : (
                            <div className='w-full'>
                                {
                                    recipientsList.length === 0 ? (
                                        <div className='mt-[20px] bg-[#dee2e6] w-[100%] flex flex-col items-center justify-center px-[20px] py-[20px] rounded-[10px]'>
                                            <p className='text-[18px] font-medium'>Oops! Seems like there's no verified recipients for this donation!</p>
                                            <p className='text-[17px] '>Click <Link to={'/hospital/dashboard'}><span className='font-medium hover:font-bold hover:cursor-pointer text-[#3f37c9]'>here</span></Link> to see the list of recipients</p>
                                        </div>
                                    ) : (
                                        <div className=' mt-[20px] flex flex-col items-center'>
                                            <p className='text-[20px] font-medium bg-[#dee2e6] px-[20px] py-[10px] rounded-[10px] w-full'>Here's a list of suitable recipients that match with {donorDetails.fname+donorDetails.lname} details</p>
                                            {
                                                recipientsList.map((recipient) => {
                                                    return (
                                                        <div onClick={() => handleClick(recipient)} className='flex shadow-md hover:shadow-xl hover:cursor-pointer justify-center grid grid-cols-3 items-center mt-[10px] w-full bg-[#f8f9fa] px-[20px] py-[10px] rounded-[10px]'>
                                                            <p><span className='font-medium'>Recipient Name: </span>{recipient.fname} {recipient.lname}</p>
                                                            <p><span className='font-medium'>Blood Group: </span>{recipient.bloodType}</p>
                                                            <p><span className='font-medium'>Email: </span>{recipient.email}</p>
                                                            <p><span className='font-medium'>Contact: </span>{recipient.contact}</p>
                                                            <p><span className='font-medium'>Organ: </span>{recipient.requestedOrgan}</p>
                                                            <p><span className='font-medium'>Gender: </span>{recipient.gender}</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                    
                    
                </div>
            </div>
        </div>
    );
}

export default DonationForm;