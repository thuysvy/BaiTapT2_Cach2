import { useEffect, useRef } from "react";

const CanvasAnimation = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Đặt kích thước canvas bằng kích thước màn hình
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.background = "black"; // Đặt màu nền đen

        let minWidth = 10;
        let maxWidth = 700;
        let currentWidth = minWidth;
        let growing = true;

        // Danh sách màu chính (kết hợp với màu trắng)
        const colors = ["red", "blue", "green", "purple", "orange"];
        let colorIndex = 0; // Bắt đầu từ màu đầu tiên

        function drawShape() {
            // Tô nền đen trước khi vẽ
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Tạo gradient từ màu chính sang màu trắng
            let gradient = ctx.createLinearGradient(0, 0, currentWidth, 0);
            gradient.addColorStop(0, colors[colorIndex]); // Màu chính
            gradient.addColorStop(1, "white"); // Màu trắng

            ctx.fillStyle = gradient;
            ctx.save();
            ctx.translate(150, 130); // Dịch lên trên một chút
            ctx.transform(1, 0, Math.tan(50 * Math.PI / 180), 1, 0, 0); // Skew X
            ctx.rotate(20 * Math.PI / 180); // Xoay
            ctx.fillRect(0, 0, currentWidth, 150); // Vẽ hình
            ctx.restore();
        }

        function animateShape() {
            if (growing) {
                currentWidth += 5;
                if (currentWidth >= maxWidth) {
                    currentWidth = minWidth; // Reset về min ngay lập tức
                    colorIndex = (colorIndex + 1) % colors.length; // Chuyển màu kế tiếp
                }
            }
            drawShape();
            requestAnimationFrame(animateShape);
        }

        animateShape();

        return () => {
            // Cleanup khi component unmount
            cancelAnimationFrame(animateShape);
        };
    }, []);

    return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0 }} />;
};

export default CanvasAnimation;
