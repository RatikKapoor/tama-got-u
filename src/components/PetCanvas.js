import React, { useState, useEffect } from "react";
import Canvas from "./Canvas";

// Import way too many images
import neutralStillImgSrc from "../assets/pet/neutral-still.png";
import neutralWalkLeft0Src from "../assets/pet/neutral-walk-left-0.png";
import neutralWalkLeft1Src from "../assets/pet/neutral-walk-left-1.png";
import neutralWalkRight0Src from "../assets/pet/neutral-walk-right-0.png";
import neutralWalkRight1Src from "../assets/pet/neutral-walk-right-1.png";

import happyStillImgSrc from "../assets/pet/happy-still.png";
import happyWalkLeft0Src from "../assets/pet/happy-walk-left-0.png";
import happyWalkLeft1Src from "../assets/pet/happy-walk-left-1.png";
import happyWalkRight0Src from "../assets/pet/happy-walk-right-0.png";
import happyWalkRight1Src from "../assets/pet/happy-walk-right-1.png";
import Pet from "../pet/Pet";

function PetCanvas(props) {
  const [images, setImages] = useState();
  const [pet, setPet] = useState();

  const buildImages = () => {
    const imgs = {
      neutral: {
        still: [],
        walkLeft: [],
        walkRight: [],
      },
      happy: {
        still: [],
        walkLeft: [],
        walkRight: [],
      },
    };

    const imageSrcs = {
      neutral: {
        still: [neutralStillImgSrc],
        walkLeft: [neutralWalkLeft0Src, neutralWalkLeft1Src],
        walkRight: [neutralWalkRight0Src, neutralWalkRight1Src],
      },
      happy: {
        still: [happyStillImgSrc],
        walkLeft: [happyWalkLeft0Src, happyWalkLeft1Src],
        walkRight: [happyWalkRight0Src, happyWalkRight1Src],
      },
    };

    Object.entries(imageSrcs).forEach(([petState, petStateVal]) => {
      Object.entries(petStateVal).forEach(([petAction, petActionVal]) => {
        imgs[petState][petAction] = petActionVal.map((petActionSrc) => {
          const img = new Image();
          img.src = petActionSrc;
          return img;
        });
      });
    });

    return imgs;
  };

  const draw = (ctx, frameCount) => {
    if (!images || !pet) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "lime";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // ctx.drawImage(images.neutral.still[0], 100, 100, 64, 64);
    pet.walk();

    pet.draw(ctx);
  };

  useEffect(() => {
    const imgs = buildImages();
    setImages(imgs);

    setPet(new Pet({ x: 200, y: 100, images: imgs }));
  }, []);

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
