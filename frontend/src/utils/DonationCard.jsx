import {useState, useEffect, useRef} from 'react';
import axios from 'axios'


const DonationCard = ({data, page, setActiveModal, setModalData}) => {

    const [donorDetails, setDonorDetails] = useState({});
    const [recipientDetails, setRecipientDetails] = useState({})

    useEffect(() => {
        const callback = async () => {
            // fetch the donor and recipient details
            const url1= `http://localhost:8000/api/patient/donor/${data.donorId}`
            const url2 = `http://localhost:8000/api/patient/recipient/${data.recipientId}`

            const res1 = await axios.get(url1);
            const res2 = await axios.get(url2);

            setDonorDetails(res1.data.body);
            setRecipientDetails(res2.data.body);
        }
        callback();
    }, [])

    return (
        <div onClick={() => {
            setActiveModal(true)
            setModalData(data)
        }} className="rounded-[10px] border-[1px] border-grey px-[20px] py-[20px] my-[10px] hover:shadow-xl hover:cursor-pointer hover:border-[0px] hover:bg-[#F8F8F8]">
            <div className="grid grid-cols-2 flex justify-between">
                <p><span className="font-medium">Donor Name:</span> {donorDetails.fname} {donorDetails.lname}</p>
                <p><span className="font-medium">Donor ID:</span> {donorDetails.donorId}</p>
                <p><span className="font-medium">Recipient Name:</span> {recipientDetails.fname} {recipientDetails.lname}</p>
                <p><span className="font-medium">Recipient ID:</span> {recipientDetails.recipientId}</p>
                <p><span className="font-medium">Donated Organ:</span> {recipientDetails.requestedOrgan}</p>
                <p><span className="font-medium">Access Token:</span> {data.blockchainToken}</p>
            </div>
        </div>
    );
}

export default DonationCard;