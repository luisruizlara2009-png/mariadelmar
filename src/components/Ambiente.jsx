import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Cielo = ({ esDeNoche }) => {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
      background: esDeNoche 
        ? 'linear-gradient(to bottom, #091c24, #1b3a4b, #2c5364)' 
        : 'linear-gradient(to bottom, #4facfe, #00f2fe)', 
      transition: 'background 3s ease',
      zIndex: 0
    }}>
      <motion.div
        animate={{ 
          top: esDeNoche ? '10%' : '10%', 
          right: esDeNoche ? '10%' : '85%',
          backgroundColor: esDeNoche ? '#fdfd96' : '#ffeb3b',
          boxShadow: esDeNoche ? '0 0 50px #fdfd96' : '0 0 80px #ffeb3b'
        }}
        style={{
          position: 'absolute', width: '90px', height: '90px', borderRadius: '50%',
        }}
      />
      {esDeNoche && <EstrellasFugaces />}
      {esDeNoche && <EstrellasEstaticas />}
    </div>
  );
};

export const Montanas = ({ esDeNoche }) => (
  <div style={{ position: 'absolute', bottom: '8vh', width: '100%', zIndex: 1, opacity: 0.9 }}>
    <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{width: '100%', height: 'auto'}}>
       <path fill={esDeNoche ? "#152535" : "#66bb6a"} d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
  </div>
);

const EstrellasEstaticas = () => (
    <>
      {Array.from({ length: 50 }).map((_, i) => (
         <div key={i} style={{
             position: 'absolute', 
             top: Math.random()*70+'%', left: Math.random()*100+'%',
             width: Math.random() * 3 + 'px', height: Math.random() * 3 + 'px', 
             background: 'white', borderRadius: '50%', opacity: Math.random()
         }} />
      ))}
    </>
);

const EstrellasFugaces = () => {
    return (
      <>
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ x: Math.random() * window.innerWidth, y: -50, opacity: 0 }}
            animate={{ x: Math.random() * -200 - 100, y: Math.random() * 500 + 200, opacity: [0, 1, 0] }}
            transition={{ 
              duration: Math.random() * 2 + 1, 
              repeat: Infinity, 
              repeatDelay: Math.random() * 15 + 5, 
              delay: Math.random() * 10
            }}
            style={{
              position: 'absolute', 
              width: '120px', height: '2px',
              background: 'linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0))',
              transform: 'rotate(-45deg)',
              boxShadow: '0 0 10px white'
            }}
          />
        ))}
      </>
    );
  }