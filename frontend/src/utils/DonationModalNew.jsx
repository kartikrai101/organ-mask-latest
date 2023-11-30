import ReactDom from 'react-dom';
import axios from 'axios'
import {useState, useEffect} from 'react'

const DonationModalNew = ({data, setDonationActiveModal}) => {

    const [donorDetails, setDonorDetails] = useState({});
    const [recipientDetails, setRecipientDetails] = useState({});
    const [donationDetails, setDonationDetails] = useState({});
    const [url, setUrl] = useState('');

    useEffect(() => {
        const callback = async () => {
            const donationId = data.donationId;

            // change the status of this donor to "verified"
            // get the details of donor and recipient
            const url1= `http://localhost:8000/api/patient/donor/${data.donorId}`
            const url2 = `http://localhost:8000/api/patient/recipient/${data.recipientId}`
            const url3 = `http://localhost:8000/api/donation/get/${data.donationId}`
    
            const res1 = await axios.get(url1);
            const res2 = await axios.get(url2);
            const res3 = await axios.get(url3);
    
            setDonorDetails(res1.data.body);
            setRecipientDetails(res2.data.body);
            setDonationDetails(res3.data.body);

            setUrl(`https://explorer.solana.com/address/${data.blockchainToken}?cluster=devnet`)
        }

        callback();
    }, [])

    return ReactDom.createPortal(
        <>
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#D9D9D980] z-1000" />
            <div className="min-w-[500px] flex flex-col items-center p-[20px] fixed z-1000 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FFFFFF] rounded-[10px] shadow-xl">
                <div className='flex justify-between w-full'>
                    <p className='text-[26px] font-medium'>Donation Details</p>
                    <img onClick = {() => setDonationActiveModal(false)} src="/assets/close.png" alt="close" className='hover:cursor-pointer w-[20px] h-[20px]' />
                </div>
                <hr className='w-full'/>

                <div className='flex flex-col w-full mt-[10px]'>
                    <p><span className='font-medium'>Donation ID: </span>{data.donationId} </p>
                    <p><span className='font-medium'>Donor Name: </span>{donorDetails.fname} {donorDetails.lname}</p>
                    <p><span className='font-medium'>Donor ID: </span>{donorDetails.donorId} </p>
                    <p><span className='font-medium'>Donor Contact: </span>{donorDetails.contact} </p>
                    <p><span className='font-medium'>Donor Email: </span>{donorDetails.email} </p>
                    <p><span className='font-medium'>Donor Address: </span>{donorDetails.address} </p>
                    <p><span className='font-medium'>Recipient Name: </span>{recipientDetails.fname} {recipientDetails.lname}</p>
                    <p><span className='font-medium'>Recipient ID: </span>{recipientDetails.recipientId} </p>
                    <p><span className='font-medium'>Recipient Contact: </span>{recipientDetails.contact} </p>
                    <p><span className='font-medium'>Recipient Email: </span>{recipientDetails.email} </p>
                    <p><span className='font-medium'>Blood Group: </span>{recipientDetails.bloodType} </p>
                    <p><span className='font-medium'>Recipient Address: </span>{donorDetails.address} </p>
                    <p><span className='font-medium'>Donated Organ: </span>{donorDetails.donatedOrgan} </p>
                    <p><span className='font-medium'>Donated On: </span>{donationDetails.createdAt} </p>
                    <a href={url} target="_blank"><button className='bg-[#0077b6] px-[20px] py-[8px] text-white font-medium hover:shadow-xl rounded-[5px] w-full text-center mt-[20px]'>Access Transaction</button></a>
                </div>
            </div>
        </>, document.getElementById("portal")
    );
}

export default DonationModalNew;