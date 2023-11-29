import {Link} from 'react-router-dom'

const DonationConfirmation = (props) => {
    return (
        <div className="h-[100vh] w-[100vw] flex items-center justify-center">
            <div className="bg-[#dee2e6] rounded-[10px] px-[20px] py-[20px] flex flex-col items-center justify-center w-[60%] h-[60%]">
                <img src="/assets/confirmation.png" alt="confirm-icon" className="w-[80px]" />
                <p className="mt-[10px] text-[20px]">The donation has been marked confirmed and its signature is now stored on blockchain</p>
                <Link to={'/hospital/dashboard'}><div className='flex items-center justify-center space-x-2 mt-[10px] hover:cursor-pointer'>
                    <p className=" text-[18px] font-medium hover:cursor-pointer hover:scale-[1.05]">Move to Dashboard</p>
                    <img src="/assets/next.png" alt="next" className='w-[20px]' />
                </div></Link>
            </div>
        </div>
    );
}

export default DonationConfirmation;