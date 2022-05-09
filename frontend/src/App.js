import {BrowserRouter , Route , Link , NavLink , Routes} from 'react-router-dom';
import VendorList from './Components/ndb/VendorList';
import AboutUs from "./Components/Customer/AboutUs";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import ProfileVen from "./Components/Vendor/ProfileVen"
import Addnews from "./Components/Vendor/Addnews";
import ProfileCust from "./Components/Customer/ProfileCust";
import Getndb from "./Components/Customer/Getndb"
import ProfileNext from './Components/Customer/ProfileNext';
import ProfileNdb from './Components/ndb/ProfileNdb';
import Bill from "./Components/Customer/Bill"
import BillCollection from "./Components/ndb/BillCollection"
import CustomerList from "./Components/ndb/CustomerList"
import NdbList from "./Components/Vendor/NdbList"
import Login_Admin from "./Components/Admin/Login"

import Footer from './Components/Footer';
import Home from './Components/Customer/Home'
import PastOrders from './Components/Customer/PastOrders';
import GetOrder from './Components/Customer/GetOrder';
import Support_Admin from './Components/Admin/Support';
import Ndblist_Admin from './Components/Admin/Ndblist';
import Vendorlist_Admin from './Components/Admin/Vendorlist'

import Error from './Components/Error'

import Landing from './Components/LandingPage/pages/Landing'
import './App.css';
import Quantity from './Components/Vendor/Quantity';




function App() {
  return (
    <div>
      {/* <Header /> */}
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/admin' element={<Login_Admin/>}/>
        <Route path='/error' element={<Error/>}/>

        <Route path='/admin/support' element={<Support_Admin/>}/>
        <Route path='/admin/ndblist' element={<Ndblist_Admin/>}/>
        <Route path='/admin/vendorlist' element={<Vendorlist_Admin/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>

          <Route path='/customer/profile/proNext' element={<ProfileNext/>}/>
          <Route path='/customer/home' element ={<Home/>}></Route>
          <Route path='/customer/aboutus' element={<AboutUs/>}/>
          <Route path='/customer/profile' element={<ProfileCust/>}/>
          <Route path='/customer/bill' element={<Bill/>}/>
          <Route path='/customer/getndb' element={<Getndb/>}/>
          <Route path="/customer/pastorder" element={<PastOrders/>}/>
          <Route path="/customer/order/:id" element={<GetOrder/>}/>
          
          <Route path='/vendor/profile' element={<ProfileVen/>}/>    
          <Route path='/vendor/addnews' element={<Addnews/>}/>
          <Route path='/vendor/ndblist' element={<NdbList/>}/>
          <Route path='/vendor/quantity' element={<Quantity/>}/>
         
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
