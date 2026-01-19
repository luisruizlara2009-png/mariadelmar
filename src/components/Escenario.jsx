import { useState } from "react";
import { motion } from "framer-motion";
import { useTiempoRelacion } from "../hooks/useTiempoRelacion"; 
import { Cielo, Montanas } from "./Ambiente";
import BosqueFondo from "./BosqueFondo";
import ArbolCorazon from "./ArbolCorazon";
import Carta from "./Carta"; 
import Lluvia from "./Lluvia";

const BriznaPasto = ({ esDeNoche, index }) => {
  const altura = 15 + Math.random() * 20;
  const inclinacion = -5 + Math.random() * 10;
  const color = esDeNoche 
    ? (index % 2 === 0 ? "#1a2e1a" : "#0d1a0d") 
    : (index % 2 === 0 ? "#2e7d32" : "#388e3c");

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ delay: 1 + (index * 0.02) }}
      style={{
        width: '3px',
        height: `${altura}px`,
        backgroundColor: color,
        borderRadius: '2px 2px 0 0',
        transform: `rotate(${inclinacion}deg)`,
        transformOrigin: 'bottom',
        marginRight: '2px'
      }}
    />
  );
};

export default function Escenario() {
  const { mesesTotales, esDeNoche } = useTiempoRelacion();
  const [introTerminada, setIntroTerminada] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      
      <Cielo esDeNoche={esDeNoche} />
      <Montanas esDeNoche={esDeNoche} />

      {introTerminada && <BosqueFondo mesesTotales={mesesTotales} />}

      {!introTerminada && (
        <motion.div
          initial={{ y: -50, x: "50vw", rotate: 0 }}
          animate={{ y: "90vh", rotate: 720 }}
          transition={{ duration: 4, ease: "linear" }}
          onAnimationComplete={() => setIntroTerminada(true)}
          style={{ position: 'absolute', fontSize: '3rem', zIndex: 20 }}
        >
          🍃
        </motion.div>
      )}

      {introTerminada && <ArbolCorazon meses={mesesTotales} />}

      {introTerminada && (
        <div style={{ 
            position: 'absolute', 
            top: '40%',
            left: '5%',
            width: '100%',
            maxWidth: '400px',
            zIndex: 30,
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Carta /> 
        </div>
      )}

      <div style={{ 
          position: 'absolute', bottom: 0, width: '100%', height: '8vh', 
          background: esDeNoche 
            ? 'linear-gradient(to bottom, #1a1a1a, #000000)' 
            : 'linear-gradient(to bottom, #3d2b1f, #261a13)', 
          zIndex: 5,
          display: 'flex', 
          alignItems: 'flex-end',
          overflow: 'hidden'
      }}>
          {Array.from({ length: 120 }).map((_, i) => (
            <BriznaPasto key={i} index={i} esDeNoche={esDeNoche} />
          ))}
          
          {introTerminada && (
            <div style={{ position: 'absolute', width: '100%', display: 'flex', justifyContent: 'space-around', bottom: '5px' }}>
               <span style={{ fontSize: '18px', opacity: 0.8 }}>{esDeNoche ? '🍄' : '🌸'}</span>
               <span style={{ fontSize: '14px', opacity: 0.6 }}>{esDeNoche ? '🌿' : '🌼'}</span>
               <span style={{ fontSize: '20px', opacity: 0.8 }}>{esDeNoche ? '🍄' : '🌷'}</span>
            </div>
          )}
      </div>

      <Lluvia activa={introTerminada} />
      
    </div>
  );
}