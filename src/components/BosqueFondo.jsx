import { motion } from "framer-motion";

const RetonoSVG = ({ escala, tipo }) => (
    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        <path d="M50,100 L50,60" stroke="#3e2723" strokeWidth="6" />
        <circle cx="50" cy="50" r="25" fill={tipo % 2 === 0 ? "#2e7d32" : "#1b5e20"} />
        <circle cx="35" cy="60" r="18" fill={tipo % 2 === 0 ? "#388e3c" : "#2e7d32"} />
        <circle cx="65" cy="60" r="18" fill={tipo % 2 === 0 ? "#388e3c" : "#2e7d32"} />
    </svg>
);

export default function BosqueFondo({ mesesTotales }) {
  const arboles = Array.from({ length: Math.min(mesesTotales, 12) }).map((_, i) => {
    let pos = (i * 20) % 95; 
    if (pos > 40 && pos < 60) pos = 10;

    const escala = 0.8 + Math.random(); 

    return { id: i, escala, pos, tipo: i };
  });

  return (
    <>
      {arboles.map(arbol => (
        <motion.div
            key={arbol.id}
            initial={{ height: 0 }}
            animate={{ height: arbol.escala * 120 }}
            transition={{ duration: 1.5, delay: arbol.id * 0.1 }}
            style={{
                position: 'absolute',
                bottom: '10vh',
                left: `${arbol.pos}%`,
                width: '100px',
                zIndex: 2,
                opacity: 0.9,
                filter: 'blur(0.5px)'
            }}
        >
            <RetonoSVG escala={arbol.escala} tipo={arbol.tipo} />
        </motion.div>
      ))}
    </>
  );
}