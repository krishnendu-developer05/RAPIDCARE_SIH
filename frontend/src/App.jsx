import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Banner from './components/Banner';
import BookingOptions from './components/BookingOptions';
import SearchBar from './components/SearchBar';
import HospitalList from './components/HospitalList';
import BottomNavigation from './components/BottomNavigation';
import AmbulanceSelection from './components/AmbulanceSelection';
import PaymentPage from './components/PaymentPage';
import SuccessPage from './components/SuccessPage';
import './App.css';

function Home() {
  const [activeTab, setActiveTab] = useState('myself');

  return (
    <>
      <div className="app-container">
        <div className="bg-pattern">
          <img src="/assets/imgBackground.png" alt="" />
        </div>
        <div className="content">
          <Header />
          <Banner />
          <BookingOptions activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === 'someone_else' && <SearchBar />}
          <HospitalList />
        </div>
      </div>
      <BottomNavigation />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ambulance/:hospitalName" element={<AmbulanceSelection />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  );
}

export default App;
