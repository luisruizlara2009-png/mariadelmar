import { useEffect, useRef } from "react";

export default function Lluvia({ activa }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!activa) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particulas = [];
    const colores = ["#ffc0cb", "#ff69b4", "#ffeb3b", "#a5d6a7"]; // Colores de pétalos

    class Particula {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height; // Empiezan arriba
        this.size = Math.random() * 5 + 2;  
        this.speedY = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.color = colores[Math.floor(Math.random() * colores.length)];
        this.rotation = Math.random() * 360;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += 1;
        if (this.y > canvas.height) { // Reiniciar si caen al suelo
          this.y = -10;
          this.x = Math.random() * canvas.width;
        }
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        // Dibujar forma de hoja simple (elipse)
        ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < 100; i++) particulas.push(new Particula());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particulas.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animate);
    };
    animate();

  }, [activa]);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 6 }} />;
}