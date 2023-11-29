import './App.css';
import {Route, Routes} from 'react-router-dom';
import Homepage from './components/Homepage';
import Login1 from './components/Patient/Login';
import Login2 from './components/Hospital/Login';
import Donor from './components/Patient/Donor';
import Recipent from './components/Patient/Recipient'
import PatientLogin from './components/Patient/PatientLogin';
import Dashboard from './components/Hospital/Dashboard';
import DonorDetails from './components/DonorDetails';
import RecipientDetails from './components/RecipientDetails'
import DonationForm from './utils/DonationForm';
import DonationConfirmation from './utils/DonationConfirmation';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} exact ></Route>
      <Route path="/patient" element={<Login1 />} exact ></Route>
      <Route path="/hospital/login" element={<Login2 />} exact ></Route>
      <Route path="/patient/login" element={<PatientLogin />} exact ></Route>
      <Route path="/patient/donor" element={<Donor />} exact ></Route>
      <Route path="/patient/recipient" element={<Recipent />} exact ></Route>
      <Route path="/hospital/dashboard" element={<Dashboard />} exact ></Route>
      <Route path="/patient/donor/:id" element={<DonorDetails />} exact></Route>
      <Route path="/donation/confirmation" element={<DonationConfirmation/>} exact></Route>
      <Route path="/patient/recipient/:id" element={<RecipientDetails />} exact></Route>
      <Route path="/patient/donor/:id/donate" element={<DonationForm />} exact></Route>
    </Routes>
  );
}

export default App;
