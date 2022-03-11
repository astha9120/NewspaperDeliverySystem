import {BrowserRouter , Route , Link , NavLink , Routes} from 'react-router-dom';


import AboutUs from "./Components/Customer/AboutUs";
import HowItWorks from "./Components/Customer/HowItWorks";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Support from "./Components/Customer/Support"
import Profile from "./Components/Vendor/Profile"
import Addnews from "./Components/Vendor/Addnews";
import Header from "./Components/Header";
import VendorList from "./Components/Ndb/VendorList"

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/aboutus' element={<AboutUs/>}/>
          <Route path='/howitworks' element={<HowItWorks/>}/>
            <Route path='/support' element={<Support/>}/>
            <Route path='/vendor/vendorprofile' element={<Profile/>}/>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/vendor/addnews' element={<Addnews/>}/>
          <Route path='/ndb/vendorlist' element={<VendorList/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
