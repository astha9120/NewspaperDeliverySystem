import {BrowserRouter , Route , Link , NavLink , Routes} from 'react-router-dom';


import AboutUs from "./Components/AboutUs";
import HowItWorks from "./Components/HowItWorks";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/aboutus' element={<AboutUs/>}/>
          <Route path='/howitworks' element={<HowItWorks/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
