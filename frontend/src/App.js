import {BrowserRouter , Route , Link , NavLink , Routes} from 'react-router-dom';


import AboutUs from "./Components/Customer/AboutUs";
import HowItWorks from "./Components/Customer/HowItWorks";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Support from "./Components/Customer/Support"
import ProfileVen from "./Components/Vendor/ProfileVen"
import Addnews from "./Components/Vendor/Addnews";

import ProfileNdb from './Components/ndb/ProfileNdb';
import Header from "./Components/Header";

import Footer from './Components/Footer';


function App() {
  return (
    <div>
      {/* <Header /> */}
      <BrowserRouter>
        <Routes>
          <Route path='/aboutus' element={<AboutUs/>}/>
          <Route path='/howitworks' element={<HowItWorks/>}/>
            <Route path='/support' element={<Support/>}/>
            <Route path='/vendor/profile' element={<ProfileVen/>}/>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/vendor/addnews' element={<Addnews/>}/>
          <Route path='/ndb/profile' element={<ProfileNdb/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
