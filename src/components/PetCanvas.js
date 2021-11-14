import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearLastTrigger } from "../features/pet/petSlice";
import Canvas from "./Canvas";
import Pet from "../pet/Pet";

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

import plant0ImgSrc from "../assets/plant/plant-0.png";
import plant1ImgSrc from "../assets/plant/plant-1.png";
import flower0ImgSrc from "../assets/plant/flower-0.png";
import flower1ImgSrc from "../assets/plant/flower-1.png";
import flower2ImgSrc from "../assets/plant/flower-2.png";
import flower3ImgSrc from "../assets/plant/flower-3.png";
import Plant from "../pet/Plant";

function PetCanvas(props) {
  const [images, setImages] = useState();
  const [plantImages, setPlantImages] = useState();
  const [pet, setPet] = useState();
  const [plants, setPlants] = useState([]);

  const happiness = useSelector((state) => state.pet.happiness);
  const lastTrigger = useSelector((state) => state.pet.lastTrigger);
  const dispatch = useDispatch();

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

    // Load plant images
    const plantImgs = {
      stem: [plant0ImgSrc, plant1ImgSrc].map((p) => {
        const img = new Image();
        img.src = p;
        return img;
      }),
      flower: [flower0ImgSrc, flower1ImgSrc, flower2ImgSrc, flower3ImgSrc].map((p) => {
        const img = new Image();
        img.src = p;
        return img;
      }),
    };

    return [imgs, plantImgs];
  };

  const draw = (ctx, frameCount) => {
    if (!images || !pet) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "rgb(52, 235, 225)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = "rgba(29, 163, 24)";
    ctx.fillRect(0, 462, ctx.canvas.width, 900);

    pet.update();

    plants.forEach((plant) => {
      plant.draw(ctx);
    });
    pet.draw(ctx);
  };

  const growGarden = () => {
    // Check if all plants already matured or non-existent
    const immaturePlants = plants.filter((plant) => plant.growth !== 2);

    const shouldAddPlant = immaturePlants.length === 0 || Math.random() > 0.5;
    if (shouldAddPlant) {
      setPlants((prevPlants) => {
        const x = window.innerWidth / 2 + (window.innerWidth / 3) * (Math.random() * 2 - 1);
        const y = 400;
        let newPlants = prevPlants.concat([new Plant({ x, y, images: plantImages })]);
        return newPlants;
      });
    } else {
      const plant = immaturePlants[Math.floor(Math.random() * immaturePlants.length)];
      plant.grow();
    }
  };

  useEffect(() => {
    const [imgs, plantImgs] = buildImages();
    setImages(imgs);
    setPlantImages(plantImgs);

    setPet(new Pet({ x: window.innerWidth / 2, y: 400, images: imgs }));
  }, []);

  // Update pet object to have happiness
  useEffect(() => {
    if (!pet) return;

    pet.setHappiness(happiness);
    if (lastTrigger === "incrementHappiness") {
      pet.setActiveAction("hop");
      dispatch(clearLastTrigger());
      growGarden();
    }
  }, [happiness, lastTrigger]);

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
