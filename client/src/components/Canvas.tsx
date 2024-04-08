import React, { useEffect, useRef, useState } from "react";
import cx from "classnames";
import { canvasToBlob } from "../utils/canvasToBlob.ts";

export const Canvas = ({
  onSubmit,
  labels,
}: {
  onSubmit: (data: Blob) => void;
  labels: {
    done: string;
  };
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(8);

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
      size: 4,
      label: "S",
    },
    {
      size: 8,
      label: "M",
    },
    {
      size: 16,
      label: "L",
    },
  ];

  const startDrawing = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    e.preventDefault();
    const { offsetX, offsetY } = getPosition(e);
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

  const draw = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    e.preventDefault();
    if (!isDrawing) return;
    const { offsetX, offsetY } = getPosition(e);
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.strokeStyle = brushColor;
        context.lineWidth = brushSize;
        context.lineTo(offsetX, offsetY);
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

  const getPosition = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    if (!canvasRef.current) return { offsetX: 0, offsetY: 0 };

    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;

    let clientX;
    let clientY;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      offsetX: (clientX - rect.left) * scaleX,
      offsetY: (clientY - rect.top) * scaleY,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 600;
      canvas.height = 600;
      const context = canvas.getContext("2d");
      if (context) {
        context.fillStyle = "#e5f5ff";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const handleSubmit = async () => {
    const canvas = canvasRef.current;

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = 400;
    tempCanvas.height = 400;
    const tempCtx = tempCanvas.getContext("2d");

    if (tempCtx && canvas) {
      tempCtx.drawImage(canvas, 0, 0, 400, 400);
    }

    if (canvas) {
      const data = await canvasToBlob(canvas);
      tempCanvas.remove();
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
              {labels.done}
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
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              style={{
                width: "100%",
                height: "auto",
                aspectRatio: "1",
                userSelect: "none",
                touchAction: "none",
              }}
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
                {labels.done}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
