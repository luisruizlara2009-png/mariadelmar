import { useState, useEffect } from 'react';

export function useTiempoRelacion() {
  const [estado, setEstado] = useState({
    mesesTotales: 0,
    esDeNoche: false,
  });

  useEffect(() => {
    const fechaInicio = new Date(2024, 3, 19, 9, 30);
    const ahora = new Date();
    
    let meses = (ahora.getFullYear() - fechaInicio.getFullYear()) * 12;
    meses -= fechaInicio.getMonth();
    meses += ahora.getMonth();
    
    if (ahora.getDate() < fechaInicio.getDate()) {
      meses--;
    }

    const mesesFinales = Math.max(1, meses);

    const hora = ahora.getHours();
    const esNoche = hora >= 19 || hora < 6;

    setEstado({
      mesesTotales: mesesFinales,
      esDeNoche: esNoche,
    });

  }, []);

  return estado;
}