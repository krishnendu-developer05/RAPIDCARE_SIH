import React, { useState, useEffect } from 'react';
import './Banner.css';

const BANNER_SLIDES = [
  {
    id: 1,
    title: "Every Second Matters.",
    text: "A 2026 study of 13,712 suspected cardiac-arrest cases found that survival odds increase by 45% when ambulance response time is under 8 minutes.",
    tag: "CRITICAL CARE",
    image: "/assets/imgRectangle64.png",
  },
  {
    id: 2,
    title: "Rapid Response. Saved Lives.",
    text: "RapidCare AI dispatch matches the closest available ICU unit with real-time traffic routing to reach critical care patients instantly.",
    tag: "ADVANCED DISPATCH",
    image: "/assets/banner_emergency.png",
  },
  {
    id: 3,
    title: "Golden Hour Care.",
    text: "Immediate medical intervention within the first 60 minutes saves thousands of lives daily. Emergency support available 24/7.",
    tag: "24/7 EMERGENCY",
    image: "/assets/banner_icu.png",
  }
];

function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="banner-container animate-fade-in">
      {BANNER_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`banner-slide ${index === currentSlide ? 'active' : ''}`}
        >
          <img src={slide.image} alt={slide.title} className="banner-bg" />
          <div className="banner-overlay"></div>
          <div className="banner-content">
            <span className="banner-tag">{slide.tag}</span>
            <h2 className="banner-title">{slide.title}</h2>
            <p className="banner-text">{slide.text}</p>
          </div>
        </div>
      ))}

      <div className="banner-pagination">
        {BANNER_SLIDES.map((_, index) => (
          <button
            key={index}
            className={`pagination-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Banner;
