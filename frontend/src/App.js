import {BrowserRouter , Route , Link , NavLink , Routes} from 'react-router-dom';


import AboutUs from "./Components/AboutUs";
import HowItWorks from "./Components/HowItWorks";

import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Support from "./Components/Support";
import Addnews from "./Components/Vendor/Addnews";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/aboutus' element={<AboutUs/>}/>
          <Route path='/howitworks' element={<HowItWorks/>}/>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/support' element={<Support/>}/>
          <Route path='/addnews' element={<Addnews/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
