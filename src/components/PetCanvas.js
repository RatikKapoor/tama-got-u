import React from "react";
import Canvas from "./Canvas";

function PetCanvas(props) {
  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  // Set canvas to be fullscreen
  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;

  return (
    <div style={{ position: "fixed", left: 0, top: 0 }}>
      <Canvas draw={draw} width={canvasWidth} height={canvasHeight} />
    </div>
  );
}

export default PetCanvas;
