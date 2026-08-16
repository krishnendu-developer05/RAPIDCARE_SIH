import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LocationProvider } from './context/LocationContext';
import LocationWarningModal from './components/LocationWarningModal';
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
    <LocationProvider>
      <LocationWarningModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ambulance/:hospitalName" element={<AmbulanceSelection />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </LocationProvider>
  );
}

export default App;
