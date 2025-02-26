import React, { useEffect, useRef, useState } from "react";

const CircleAnimation = () => {
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [growing, setGrowing] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drawCircle = () => {
      ctx.fillStyle = "blue"; // Màu nền xanh
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 50 * scale, 0, Math.PI * 2);
      ctx.fillStyle = "yellow"; // Màu hình tròn vàng
      ctx.fill();
    };

    drawCircle();
  }, [scale]);

  useEffect(() => {
    const interval = setInterval(() => {
      setScale((prevScale) => {
        let newScale = prevScale + (growing ? 0.05 : -0.05);
  
        if (newScale >= 5) {
          newScale = 1; 
        }
  
        return newScale;
      });
    }, 50);
  
    return () => clearInterval(interval);
  }, []);
  
  return <canvas ref={canvasRef} style={{ display: "block" }} />;
};

export default CircleAnimation;
