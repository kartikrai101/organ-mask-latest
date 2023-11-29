import {useState, useEffect, useRef} from 'react';


const DonorCard = ({data, page, setActiveModal, setModalData}) => {

    const [status, setStatus] = useState('');

    useEffect(() => {
        if(page === 1)
            setStatus("Registered");
        else if(page === 2)
            setStatus("Verified")
        else if(page === 3)
            setStatus("Donated")
    }, [])

    return (
        <div onClick={() => {
            setActiveModal(true)
            setModalData(data)
        }} className="rounded-[10px] border-[1px] border-grey px-[20px] py-[20px] my-[10px] hover:shadow-xl hover:cursor-pointer hover:border-[0px] hover:bg-[#F8F8F8]">
            <div className="grid grid-cols-4 flex justify-between">
                <p><span className="font-medium">Donor Name:</span> {data.fname} {data.lname}</p>
                <p><span className="font-medium">Contact:</span> {data.contact}</p>
                <p><span className="font-medium">Gender:</span> {data.gender}</p>
                <p><span className="font-medium">Blood Type:</span> {data.bloodType}</p>
                <p><span className="font-medium">Email:</span> {data.email}</p>
                <p><span className="font-medium">Status:</span> {status}</p>
            </div>
        </div>
    );
}

export default DonorCard;