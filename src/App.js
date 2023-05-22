

import { Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import NewContact from "./pages/newcontact/NewContact";


function App() {
  return (
    <div className="App">
      <Routes>
        
          <Route path='/' element={<Home />} />
          <Route path='/add-contact' element={<NewContact />} />
    
      </Routes>

    </div>
  );
}

export default App;
