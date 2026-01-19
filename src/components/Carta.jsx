import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Contador from "./Contador";

export default function Carta() {
  const [esMovil, setEsMovil] = useState(false);

  useEffect(() => {
    const checkMovil = () => setEsMovil(window.innerWidth < 768);
    checkMovil();
    window.addEventListener('resize', checkMovil);
    return () => window.removeEventListener('resize', checkMovil);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: -50 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 1.5, delay: 0.5 }}
      style={{
        width: esMovil ? '85%' : '380px',
        padding: '35px',
        background: 'rgba(255, 255, 255, 0.65)', 
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)',
        border: '2px solid rgba(255, 255, 255, 0.6)',
        borderRadius: '25px',
        boxShadow: '0 10px 40px 0 rgba(0, 0, 0, 0.3)', 
        color: '#1a1a1a', 
        textAlign: 'center',
        zIndex: 100,
        position: 'relative'
      }}
    >
      <h2 style={{ 
          fontFamily: "'Segoe UI', sans-serif", 
          color: '#d81b60', 
          marginBottom: '15px', 
          fontSize: '2rem',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)' 
      }}>
        Nuestro Amor
      </h2>
      <p style={{ 
          fontStyle: 'italic', 
          lineHeight: '1.6', 
          fontSize: '1.1rem', 
          marginBottom: '25px', 
          fontWeight: '500',
          color: '#37474f' 
      }}>
        "Como este bosque que crece con el tiempo, 
        nuestra historia se hace más fuerte cada mes."
      </p>
      
      <div style={{ borderTop: '2px solid rgba(216, 27, 96, 0.2)', paddingTop: '20px' }}>
         <Contador fechaInicio={new Date(2024, 3, 19, 9, 30)} /> 
      </div>
    </motion.div>
  );
}