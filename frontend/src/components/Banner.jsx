import React from 'react';
import './Banner.css';

function Banner() {
  return (
    <div className="banner-container">
      <img src="/assets/imgRectangle64.png" alt="Ambulance" className="banner-bg" />
      <div className="banner-blur"></div>
      <div className="banner-content">
        <h2 className="banner-title">
          Every<br />
          Second<br />
          Matters.
        </h2>
        <p className="banner-text">
          A 2026 study of 13,712 suspected cardiac-arrest cases found that the odds of survival decreased by approximately 5% for each additional minute of ambulance response time.
        </p>
      </div>
      <div className="banner-pagination">
        <img src="/assets/imgGroup22.svg" alt="Pagination" />
      </div>
    </div>
  );
}

export default Banner;
