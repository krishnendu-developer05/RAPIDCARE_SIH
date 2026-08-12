import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentPage.css';

function PaymentPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upi');
  const [selectedApp, setSelectedApp] = useState('phonepe');

  return (
    <div className="payment-page">
      <div className="amb-top-bar">
        <div className="back-btn" onClick={() => navigate(-1)}>
          <img src="/assets/imgEllipse57.svg" alt="Back bg" className="back-bg" />
          <img src="/assets/imgVector9.svg" alt="Back arrow" className="back-arrow" />
        </div>
        <h2 className="amb-brand">RapidCare</h2>
      </div>

      <h1 className="payment-title">SECURE YOUR BOOKING</h1>

      <div className="payment-card">
        <h3 className="section-subtitle">CHOOSE PAYMENT METHOD</h3>
        
        <div className="tabs-container">
          <div className={`tab ${activeTab === 'upi' ? 'active' : ''}`} onClick={() => setActiveTab('upi')}>UPI</div>
          <div className={`tab ${activeTab === 'cards' ? 'active' : ''}`} onClick={() => setActiveTab('cards')}>Cards</div>
          <div className={`tab ${activeTab === 'netbanking' ? 'active' : ''}`} onClick={() => setActiveTab('netbanking')}>Netbanking</div>
          <div className={`tab ${activeTab === 'cash' ? 'active' : ''}`} onClick={() => setActiveTab('cash')}>Cash</div>
        </div>

        {activeTab === 'upi' && (
          <>
            <h3 className="subsection-subtitle">SELECT UPI APP</h3>
            <div className="upi-apps-grid">
              <div className={`upi-app ${selectedApp === 'gpay' ? 'selected' : ''}`} onClick={() => setSelectedApp('gpay')}>
                <img src="/assets/imgRectangle97.png" alt="GPay" className="upi-icon" />
                <span className="upi-label">GPay</span>
              </div>
              <div className={`upi-app ${selectedApp === 'phonepe' ? 'selected' : ''}`} onClick={() => setSelectedApp('phonepe')}>
                <img src="/assets/imgEllipse78.png" alt="PhonePe" className="upi-icon" />
                <span className="upi-label">PhonePe</span>
              </div>
              <div className={`upi-app ${selectedApp === 'amazon' ? 'selected' : ''}`} onClick={() => setSelectedApp('amazon')}>
                <img src="/assets/imgRectangle98.png" alt="AmazonPay" className="upi-icon amazon-icon" />
                <span className="upi-label">AmazonPay</span>
              </div>
              <div className={`upi-app ${selectedApp === 'upi' ? 'selected' : ''}`} onClick={() => setSelectedApp('upi')}>
                <img src="/assets/imgRectangle99.png" alt="UPI" className="upi-icon" />
                <span className="upi-label">UPI</span>
              </div>
            </div>

            <h3 className="subsection-subtitle">ENTER UPI ID</h3>
            <div className="upi-input-container">
              <input type="text" placeholder="mobile@upi" className="upi-input" defaultValue="mobile@upi" />
              <button className="verify-btn">Verify</button>
            </div>
          </>
        )}

        {activeTab === 'cards' && (
          <div className="cards-form">
            <h3 className="subsection-subtitle">CREDIT / DEBIT CARD</h3>
            
            <div className="form-group">
              <label className="form-label">Card Number</label>
              <div className="card-input-container">
                <input type="text" placeholder="0000 0000 0000 0000" className="card-input" />
                <button className="verify-btn">Verify</button>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label className="form-label">Cardholder Name</label>
                <div className="card-input-container standard">
                  <input type="text" placeholder="Full Name" className="card-input" />
                </div>
              </div>
              <div className="form-group half">
                <label className="form-label">Name on Card</label>
                <div className="card-input-container standard">
                  <input type="text" placeholder="Name as printed" className="card-input" />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label className="form-label">Expiry Date</label>
                <div className="card-input-container standard">
                  <input type="text" placeholder="MM / YY" className="card-input" />
                </div>
              </div>
              <div className="form-group half">
                <label className="form-label">CVV</label>
                <div className="card-input-container standard">
                  <input type="password" placeholder=". . ." className="card-input" />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Expiry Date</label>
              <div className="card-input-container standard dropdown">
                <input type="text" placeholder="Search your bank..." className="card-input" />
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L7 7L13 1" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        )}
      {activeTab === 'netbanking' && (
        <div className="netbanking-form">
          <h3 className="subsection-subtitle">Popular Banks</h3>
          <div className="popular-banks-container">
            <div className="bank-item">
              <div className="bank-logo-circle border-blue">
                <img src="/assets/bank_sbi.png" alt="SBI" className="bank-logo-img" />
              </div>
              <span className="bank-label">SBI</span>
            </div>
            <div className="bank-item">
              <div className="bank-logo-circle">
                <img src="/assets/bank_hdfc.png" alt="HDFC" className="bank-logo-img" />
              </div>
              <span className="bank-label">HDFC</span>
            </div>
            <div className="bank-item">
              <div className="bank-logo-circle">
                <img src="/assets/bank_icici.png" alt="ICICI" className="bank-logo-img" />
              </div>
              <span className="bank-label">ICICI</span>
            </div>
            <div className="bank-item">
              <div className="bank-logo-circle">
                <img src="/assets/bank_axis.png" alt="AXIS" className="bank-logo-img" />
              </div>
              <span className="bank-label">AXIS</span>
            </div>
            <div className="bank-item">
              <div className="bank-logo-circle">
                <img src="/assets/bank_kotak.png" alt="KOTAK" className="bank-logo-img" />
              </div>
              <span className="bank-label">KOTAK</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Choose your Bank</label>
            <div className="card-input-container standard dropdown">
              <input type="text" placeholder="Search your Bank..." className="card-input" />
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7 7L13 1" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          <div className="form-group mt-5">
            <label className="form-label">Net banking User ID</label>
            <div className="card-input-container standard">
              <input type="text" placeholder="Enter your user ID" className="card-input" />
            </div>
          </div>

          <div className="form-group mt-5">
            <label className="form-label">Password</label>
            <div className="card-input-container standard dropdown">
              <input type="password" placeholder="123456" className="card-input" defaultValue="123456" />
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 6C1 6 3.90909 1 9 1C14.0909 1 17 6 17 6C17 6 14.0909 11 9 11C3.90909 11 1 6 1 6Z" stroke="#87889e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="6" r="2.5" stroke="#87889e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      )}
      
      </div>

      {activeTab === 'cards' && (
        <div className="save-card-checkbox">
          <div className="checkbox-square checked">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span className="checkbox-label">Save card details securely</span>
        </div>
      )}

      {activeTab !== 'netbanking' && (
        <div className="payment-card order-summary">
          <h3 className="section-subtitle">ORDER SUMMARY</h3>
          
          <div className="summary-row">
            <span className="summary-label">Distance Fare(5km)</span>
            <span className="summary-val">₹1200</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Hospital Reservation</span>
            <span className="summary-val">₹500</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Platform Charge</span>
            <span className="summary-val">₹40</span>
          </div>
          
          <div className="summary-divider"></div>
          
          <div className="summary-row total-row">
            <span className="total-label">TOTAL AMOUNT</span>
            <span className="total-val">₹1740</span>
          </div>
        </div>
      )}

      <div className="payment-fixed-bottom">
        <button className="pay-securely-btn" onClick={() => navigate('/success')}>
          {activeTab === 'netbanking' ? (
            <>
              <svg className="lock-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Verify & Proceed to Secure Login
            </>
          ) : (
            <>
              <svg className="lock-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Pay Securely - ₹ 1740
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
