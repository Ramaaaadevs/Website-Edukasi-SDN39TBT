// src/app/components/CardSoal.js
"use client";

import React from 'react';

export default function CardSoal() {
  return (
    <div className="card-container">
      
      <div className="quiz-wrapper">
        
        <div className="question-card">
          <span className="question-label">Soal 1 / 10</span>
          <h1 className="question-text">
            Apa nama alat pernafasan pada manusia?
          </h1>
        </div>

        <div className="answer-grid">
          {/* Gabungkan class base dan warna */}
          <button className="btn-base btn-red">
            A. Paru-paru
          </button>
          
          <button className="btn-base btn-blue">
            B. Insang
          </button>
          
          <button className="btn-base btn-yellow">
            C. Trakea
          </button>
          
          <button className="btn-base btn-green">
            D. Kulit
          </button>
        </div>

      </div>
    </div>
  );
}