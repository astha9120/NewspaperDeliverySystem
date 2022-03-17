import {BrowserRouter , Route , Link , NavLink , Routes} from 'react-router-dom';

import VendorList from './Components/Ndb/VendorList';
import AboutUs from "./Components/Customer/AboutUs";
import HowItWorks from "./Components/Customer/HowItWorks";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Support from "./Components/Customer/Support"
import ProfileVen from "./Components/Vendor/ProfileVen"
import Addnews from "./Components/Vendor/Addnews";
import ProfileCust from "./Components/Customer/ProfileCust";
import ProfileNext from './Components/Customer/ProfileNext';
import ProfileNdb from './Components/Ndb/ProfileNdb';



import Footer from './Components/Footer';
import Home from './Components/Customer/Home'


function App() {
  return (
    <div>
      {/* <Header /> */}
      <BrowserRouter>
        <Routes>
        <Route path='/customer/profile/proNext' element={<ProfileNext/>}/>
          <Route path='/customer/home' element ={<Home/>}></Route>
          <Route path='/customer/aboutus' element={<AboutUs/>}/>
          <Route path='/customer/howitworks' element={<HowItWorks/>}/>
          <Route path='/customer/profile' element={<ProfileCust/>}/>
            <Route path='/customer/support' element={<Support/>}/>
            <Route path='/vendor/profile' element={<ProfileVen/>}/>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/vendor/addnews' element={<Addnews/>}/>
          <Route path='/ndb/profile' element={<ProfileNdb/>}/>
          <Route path='/ndb/vendorlist' element={<VendorList/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
