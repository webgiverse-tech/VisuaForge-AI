import React from 'react';

const ParticleBackground = () => {
  return (
    <div className="particle-container">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="particle" style={{
          animationDelay: `${i * 2.5}s`,
          animationDuration: `${25 + (i * 2)}s`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${5 + Math.random() * 15}px`,
          height: `${5 + Math.random() * 15}px`,
        }} />
      ))}
    </div>
  );
};

export default ParticleBackground;