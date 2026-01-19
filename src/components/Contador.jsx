import { useState, useEffect } from "react";

export default function Contador({ fechaInicio }) {
  const [tiempo, setTiempo] = useState({ dias: 0, horas: 0, min: 0, seg: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const start = new Date(fechaInicio).getTime();
      const now = new Date().getTime();
      const diff = now - start;

      setTiempo({
        dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
        horas: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        min: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seg: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [fechaInicio]);

  return (
    <div style={{ marginTop: '20px', fontFamily: 'monospace', color: '#555', textAlign: 'center' }}>
      <p style={{ fontSize: '0.9rem', marginBottom: '5px' }}>Juntos desde entonces:</p>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <span><b>{tiempo.dias}</b>d</span>
        <span><b>{tiempo.horas}</b>h</span>
        <span><b>{tiempo.min}</b>m</span>
        <span><b>{tiempo.seg}</b>s</span>
      </div>
    </div>
  );
}