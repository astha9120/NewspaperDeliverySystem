import {BrowserRouter , Route , Link , NavLink , Routes} from 'react-router-dom';
import './App.css';
import VendorList from './Components/ndb/VendorList';
import AboutUs from "./Components/Customer/AboutUs";
import HowItWorks from "./Components/Customer/HowItWorks";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Support from "./Components/Customer/Support"
import ProfileVen from "./Components/Vendor/ProfileVen"
import Addnews from "./Components/Vendor/Addnews";
import ProfileCust from "./Components/Customer/ProfileCust";
import ProfileNext from './Components/Customer/ProfileNext';
import ProfileNdb from './Components/ndb/ProfileNdb';
import Bill from "./Components/Customer/Bill"
import BillCollection from "./Components/ndb/BillCollection"
import CustomerList from "./Components/ndb/CustomerList"
import NdbList from "./Components/Vendor/NdbList"

import Footer from './Components/Footer';
import Home from './Components/Customer/Home'
import PastOrders from './Components/Customer/PastOrders';
import GetOrder from './Components/Customer/GetOrder';
import Support_Admin from './Components/Admin/Support';
import Ndblist_Admin from './Components/Admin/Ndblist';
import Vendorlist_Admin from './Components/Admin/Vendorlist'

import Landing from './Components/LandingPage/pages/Landing'
import Products from './Components/LandingPage/pages/Products'
import Services from './Components/LandingPage/pages/Services'


function App() {
  return (
    <div>
      {/* <Header /> */}
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Landing/>} />
          <Route path='/services' element={<Services/>} />
          <Route path='/products' element={<Products/>} />
        <Route path='/admin/support' element={<Support_Admin/>}/>
        <Route path='/admin/ndblist' element={<Ndblist_Admin/>}/>
        <Route path='/admin/vendorlist' element={<Vendorlist_Admin/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>

        <Route path='/customer/profile/proNext' element={<ProfileNext/>}/>
          <Route path='/customer/home' element ={<Home/>}></Route>
          <Route path='/customer/aboutus' element={<AboutUs/>}/>
          <Route path='/customer/howitworks' element={<HowItWorks/>}/>
          <Route path='/customer/profile' element={<ProfileCust/>}/>
          <Route path='/customer/support' element={<Support/>}/>
          <Route path='/customer/bill' element={<Bill/>}/>
          <Route path="/customer/pastorder" element={<PastOrders/>}/>
          <Route path="/customer/order/:id" element={<GetOrder/>}/>
          
          <Route path='/vendor/profile' element={<ProfileVen/>}/>    
          <Route path='/vendor/addnews' element={<Addnews/>}/>
          <Route path='/vendor/ndblist' element={<NdbList/>}/>
         
          <Route path='/ndb/profile' element={<ProfileNdb/>}/>
          <Route path='/ndb/vendorlist' element={<VendorList/>}/>
          <Route path='/ndb/customerlist' element={<CustomerList/>}/>
          <Route path='/ndb/billcollection' element={<BillCollection/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
