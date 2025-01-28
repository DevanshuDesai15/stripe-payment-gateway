import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PaymentCard from './PaymentCard';
import Cancel from './Cancel';
import Success from './Success';
import NavBar from './NavBar';
import SMSForm from './SMSForm';


function App() {



  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path='/' element={<PaymentCard />} />
          <Route path='/cancel' element={<Cancel />} />
          <Route path='/success' element={<Success />} />
          <Route path='/sms' element={<SMSForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
