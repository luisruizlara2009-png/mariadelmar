import { motion } from "framer-motion";

const Rama = ({ x, y, angulo, largo, nivel, maxNivel, meses }) => {
  if (nivel > maxNivel) return null;

  const dx = x + largo * Math.sin(angulo);
  const dy = y - largo * Math.cos(angulo);
  const grosor = Math.max(1, (maxNivel - nivel) * 1.5);

  return (
    <g>
      <motion.line
        x1={x} y1={y} x2={dx} y2={dy}
        stroke="#4e342e"
        strokeWidth={grosor}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: nivel * 0.2 }}
      />
      
      {nivel >= maxNivel - 2 && (
        <RacimoHojas x={dx} y={dy} meses={meses} />
      )}

      <Rama x={dx} y={dy} angulo={angulo + 0.5} largo={largo * 0.8} nivel={nivel + 1} maxNivel={maxNivel} meses={meses} />
      <Rama x={dx} y={dy} angulo={angulo - 0.5} largo={largo * 0.8} nivel={nivel + 1} maxNivel={maxNivel} meses={meses} />
    </g>
  );
};

const RacimoHojas = ({ x, y, meses }) => {
  const cantidadBase = 5 + Math.floor(meses / 6); 
  const hojas = Array.from({ length: Math.min(cantidadBase, 15) });

  return (
    <g>
      {hojas.map((_, i) => (
        <motion.circle
          key={i}
          cx={x + (Math.random() - 0.5) * 45}
          cy={y + (Math.random() - 0.5) * 45}
          r={Math.random() * 5 + 3}
          fill={Math.random() > 0.5 ? "#ff4081" : "#f50057"}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2.5 + Math.random() }}
          style={{ filter: 'drop-shadow(0px 0px 2px rgba(255, 105, 180, 0.5))' }}
        />
      ))}
    </g>
  );
};

export default function ArbolCorazon({ meses }) {
  const complejidad = Math.min(5 + Math.floor(meses / 12), 8);

  return (
    <motion.div
        initial={{ right: '50%', x: '50%' }}
        animate={{ right: '0%', x: '10%' }}
        transition={{ duration: 10, delay: 4, ease: "easeInOut" }}
        style={{
            position: 'absolute',
            bottom: '8vh',
            width: '100%',
            height: '85vh',
            zIndex: 10,
            pointerEvents: 'none',
            display: 'flex',
            justifyContent: 'center',
        }}
    >
        <svg viewBox="0 0 600 600" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <Rama x={300} y={600} angulo={0} largo={90} nivel={1} maxNivel={complejidad} meses={meses} />
        </svg>
    </motion.div>
  );
}