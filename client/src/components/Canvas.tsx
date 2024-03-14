import React, { useEffect, useRef, useState } from "react";
import cx from "classnames";

export const Canvas = ({ onSubmit }: { onSubmit: (data: string) => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(4);

  const colors = [
    "#ff0000",
    "#e57373",
    "#4da14d",
    "#81c784",
    "#64b5f6",
    "#a1eafb",
    "#fff176",
    "#ff8754",
    "#fcdcd5",
    "#ffd1dc",
    "#e2a3f5",
    "#151515",
    "#626c72",
    "#c2c2c2",
    "#ffffff",
  ];

  const brushSizes = [
    {
      size: 2,
      label: "S",
    },
    {
      size: 4,
      label: "M",
    },
    {
      size: 6,
      label: "L",
    },
  ];

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = getMousePos(e);
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.beginPath();
        context.moveTo(offsetX, offsetY);
        setIsDrawing(true);
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = getMousePos(e);
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.strokeStyle = brushColor;
        context.lineWidth = brushSize;
        context.arc(offsetX, offsetY, brushSize / 2, 0, Math.PI * 2);
        context.stroke();
      }
    }
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.closePath();
        setIsDrawing(false);
      }
    }
  };

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return { offsetX: 0, offsetY: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    return {
      offsetX: (e.clientX - rect.left) * scaleX,
      offsetY: (e.clientY - rect.top) * scaleY,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 300;
      canvas.height = 300;
      const context = canvas.getContext("2d");
      if (context) {
        context.fillStyle = "#e5f5ff";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const handleSubmit = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const data = canvas.toDataURL("image/jpeg", 0.5);
      onSubmit(data);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-3 d-none d-md-block">
          <div className="d-flex gap-2 mb-3 flex-wrap justify-content-center">
            {colors.map((color) => (
              <div
                key={color}
                onClick={() => setBrushColor(color)}
                className={cx(
                  "border border-primary rounded-1 cursor-pointer",
                  {
                    "border-4": color === brushColor,
                    "border-2": color !== brushColor,
                  },
                )}
                style={{
                  width: "36px",
                  height: "36px",
                  backgroundColor: color,
                }}
              />
            ))}
          </div>
          <div className="d-flex gap-2 mb-3 flex-wrap justify-content-center">
            {brushSizes.map((size) => (
              <div
                className={cx("btn", {
                  "btn-primary": brushSize === size.size,
                  "btn-outline-primary": brushSize !== size.size,
                })}
                key={size.label}
                onClick={() => setBrushSize(size.size)}
              >
                {size.label}
              </div>
            ))}
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="btn btn-warning text-black"
            >
              Done!
            </button>
          </div>
        </div>
        <div className="col-12 col-md-9">
          <div style={{ width: "100%", maxWidth: "100%" }}>
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              style={{ width: "100%", height: "auto", aspectRatio: "1" }}
            />
          </div>

          <div className="d-md-none d-block">
            <div className="d-flex gap-2 mb-3 flex-wrap justify-content-center">
              {colors.map((color) => (
                <div
                  key={color}
                  onClick={() => setBrushColor(color)}
                  className={cx(
                    "border border-primary rounded-1 cursor-pointer",
                    {
                      "border-4": color === brushColor,
                      "border-2": color !== brushColor,
                    },
                  )}
                  style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: color,
                  }}
                />
              ))}
            </div>
            <div className="d-flex gap-2 mb-3 flex-wrap justify-content-center">
              {brushSizes.map((size) => (
                <div
                  className={cx("btn", {
                    "btn-primary": brushSize === size.size,
                    "btn-outline-primary": brushSize !== size.size,
                  })}
                  key={size.label}
                  onClick={() => setBrushSize(size.size)}
                >
                  {size.label}
                </div>
              ))}
            </div>
            <div>
              <button
                onClick={handleSubmit}
                className="btn btn-warning text-black"
              >
                Done!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
