import {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import Header from '../../utils/Header';
import { StateList} from '../../utils/AddressData';
import axios from 'axios'

const Recipient = (props) => {

    const [state, setState] = useState(-1);

    const [registered, setRegistered] = useState(false);

    const fnameRef = useRef();
    const lnameRef = useRef();
    const emailRef = useRef();
    const contactRef = useRef();
    const dobRef = useRef();
    const genderRef = useRef();
    const bloodRef = useRef();
    const stateRef = useRef();
    const passwodRef = useRef();
    const addressRef = useRef();
    const organRef = useRef();

    const submissionHandler = async () => {
        const data = {
            fname: fnameRef.current.value,
            lname: lnameRef.current.value,
            password: passwodRef.current.value,
            email: emailRef.current.value,
            contact: contactRef.current.value,
            dob: dobRef.current.value,
            gender: genderRef.current.value,
            bloodType: bloodRef.current.value,
            state: stateRef.current.value,
            address: addressRef.current.value,
            medicalHistoryUrl: "",
            status: "registered",
            requestedOrgan: organRef.current.value
        }
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        }
        const url = "http://localhost:8000/api/patient/recipient/register"

        const response = await axios.post(url, data, config);

        if(response.data.success === false){
            console.log("Invalid submission!")
            return 0;
        }else{
            setRegistered(true);
            return 0;
        }
    }


    return (
        <>
        {
            !registered ? (
                    <div>
                    <div className="w-full border-[2px] border-grey px-[30px] bg-white py-[15px] flex items-center justify-between">
                    <Link to={'/'}><div className=" flex items-center space-x-3 hover:cursor-pointer">
                        <img src="/assets/logo2.png" alt="logo" className="w-[45px] h-[45px]" />
                        <p className="text-[32px] font-medium">Organ Mask</p>
                    </div></Link>
                    </div>
                    <div className='mt-[20px] flex flex-col items-center'>
                        <p className="text-[42px] font-medium">Recipient Registration</p>
                        <p>*By registering on this platform as a recipient you are giving us concent to provide your details to the hospital</p>
                        <div className='w-[50%] mt-[30px]'>
                            <div className='flex justify-between items-center'>
                                <div className='flex flex-col items-start'>
                                    <label className=''>First Name</label>
                                    <input ref ={fnameRef} type="text" placeholder="First name" className="mt-[5px] text-[18px] px-[10px] border-[1px] rounded-[5px] border-grey py-[5px] min-w-[350px]" />
                                </div>
                                <div className='flex flex-col items-start'>
                                    <label className=''>Last Name</label>
                                    <input ref ={lnameRef} type="text" placeholder="Last name" className="mt-[5px] text-[18px] px-[10px] border-[1px] rounded-[5px] border-grey py-[5px] min-w-[350px]" />
                                </div>
                            </div>
                            <div className='flex justify-between items-center mt-[20px]'>
                                <div className='flex flex-col items-start'>
                                    <label className=''>Email</label>
                                    <input ref ={emailRef} type="email" placeholder="Email" className="mt-[5px] text-[18px] px-[10px] border-[1px] rounded-[5px] border-grey py-[5px] min-w-[350px]" />
                                </div>
                                <div className='flex flex-col items-start'>
                                    <label className=''>Contact</label>
                                    <input ref ={contactRef} type="text" placeholder="Contact" className="mt-[5px] text-[18px] px-[10px] border-[1px] rounded-[5px] border-grey py-[5px] min-w-[350px]" />
                                </div>
                            </div>                    
                            <div className='flex justify-between items-center mt-[20px]'>
                                <div className='flex flex-col items-start'>
                                    <label className=''>Date of Birth</label>
                                    <input ref ={dobRef} type="date" placeholder="DOB" className="mt-[5px] text-[18px] px-[10px] border-[1px] rounded-[5px] border-grey py-[5px] min-w-[350px]" />
                                </div>
                                <div className='flex flex-col items-start'>
                                    <label className=''>Gender</label>
                                    <select ref ={genderRef} className='mt-[5px] text-[18px] px-[10px] border-[1px] rounded-[5px] border-grey py-[5px] min-w-[350px]'>
                                        <option className=''>--choose your gender--</option>
                                        <option className=''>Male</option>
                                        <option className=''>Female</option>
                                        <option className=''>Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex justify-between items-center mt-[20px]'>
                                <div className='flex flex-col items-start'>
                                    <label className=''>Blood type</label>
                                    <select ref ={bloodRef} className='mt-[5px] text-[18px] px-[10px] border-[1px] rounded-[5px] border-grey py-[5px] min-w-[350px]'>
                                        <option className=''>--choose your blood type--</option>
                                        <option className=''>AB+</option>
                                        <option className=''>AB-</option>
                                        <option className=''>A+</option>
                                        <option className=''>A-</option>
                                        <option className=''>B+</option>
                                        <option className=''>B-</option>
                                        <option className=''>O+</option>
                                        <option className=''>O-</option>
                                        <option className=''>Don't know</option>
                                    </select>
                                </div>
                                <div className='flex flex-col items-start'>
                                    <label className=''>State</label>
                                    <select ref={stateRef} className='mt-[5px] text-[18px] px-[10px] border-[1px] rounded-[5px] border-grey py-[5px] min-w-[350px]'>
                                        {/* <option value={-1} className=''>--choose your state--</option> */}
                                        {
                                            StateList.map((state, index) => {
                                                return <option value={index+1}>{state}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            
                            <div className='flex justify-between items-center mt-[20px]'>
                                <div className='flex flex-col items-start'>
                                    <label className=''>Create password</label>
                                    <input ref ={passwodRef} type="password" placeholder="Create your password" className="mt-[5px] text-[18px] px-[10px] border-[1px] rounded-[5px] border-grey py-[5px] min-w-[350px]" />
                                </div>
                                <div className='flex flex-col items-start'>
                                    <label className=''>Address</label>
                                    <input ref ={addressRef} type="text" placeholder="Enter your address" className="mt-[5px] text-[18px] px-[10px] border-[1px] rounded-[5px] border-grey py-[5px] min-w-[350px]" />
                                </div>
                            </div>

                            <div className='flex justify-between items-center mt-[20px]'>
                                <div className='flex flex-col items-start'>
                                    <label className=''>Medical History</label>
                                    <input type="file" placeholder='browse' className='mt-[5px] text-[18px] px-[10px] border-[1px] rounded-[5px] border-grey py-[5px] w-[350px]' />
                                </div>
                                <div className='flex flex-col items-start'>
                                    <label className=''>Organ Required</label>
                                    <select ref={organRef} className='mt-[5px] text-[18px] px-[10px] border-[1px] rounded-[5px] border-grey py-[5px] min-w-[350px]'>
                                        <option className=''>--choose the organ for donation--</option>
                                        <option className=''>Liver</option>
                                        <option className=''>Kidney</option>
                                        <option className=''>Heart</option>
                                        <option className=''>Pancreas</option>
                                        <option className=''>Lung</option>
                                        <option className=''>Bone</option>
                                        <option className=''>Heart valve</option>
                                        <option className=''>Cornea</option>
                                        <option className=''>Small Intestine</option>
                                        <option className=''>Bone marrow</option>
                                        <option className=''>Eye</option>
                                        <option className=''>Uterus</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => submissionHandler()} className='mt-[20px] bg-[#004e98] text-white px-[15px] py-[5px] rounded-[5px] text-center w-[200px] text-[18px] font-medium hover:shadow-xl'>Register</button>
                    </div>
                </div>
            ) : (
                <div className='h-[100vh] w-[100vw] flex items-center justify-center '>
                    <div className='flex flex-col justify-center items-center'>
                        <img src="/assets/approved.png" className='w-[100px]' alt="approved-icon" />
                        <p className='text-[20px] mt-[10px]'>We have received your request! Our medical experts will verify your records and we'll reach out to you soon.</p>
                        <p className='text-[20px] mt-[10px]'>Meanwhile, you can <Link to={'/patient/login'}><span className="mt-[20px] text-[#023e8a] font-medium hover:font-bold hover:cursor-pointer">Login</span></Link> here to see your request status.</p>
                    </div>
                </div>
            )
        }
        </>
    );
}

export default Recipient;