
import './App.css';
//import Manufacturer from './components/Manufacturer';
import { Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProductRegistryCmp from './components/ProductRegistry';
import ClientSpace from './components/ClientSpace';
import Service from './components/Service';

function App() {
  return (
    <>
    <div className="navbar">
      <Navbar />
    </div>
    <div className="main-content">
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/Manufacturer_space" element={<ProductRegistryCmp />} />
        <Route path="/Customer_space" element={<ClientSpace />} />
        <Route path="/Service" element={<Service />} />
      </Routes>
      </div>
    </>
  );
}

export default App;
