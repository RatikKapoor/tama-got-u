import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearLastTrigger } from "../features/pet/petSlice";
import Canvas from "./Canvas";
import Pet from "../pet/Pet";
import Plant from "../pet/Plant";
import Grass from "../pet/Grass";

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

import grass0ImgSrc from "../assets/grass/grass-0.png";
import grass1ImgSrc from "../assets/grass/grass-1.png";
import grass2ImgSrc from "../assets/grass/grass-2.png";

import cloudSmall0ImgSrc from "../assets/cloud/cloud-small-0.png";
import cloudSmall1ImgSrc from "../assets/cloud/cloud-small-1.png";
import cloudBig0ImgSrc from "../assets/cloud/cloud-big-0.png";
import cloudBig1ImgSrc from "../assets/cloud/cloud-big-1.png";

function PetCanvas(props) {
  const [images, setImages] = useState();
  const [plantImages, setPlantImages] = useState();
  const [grassImages, setGrassImages] = useState();
  const [cloudImages, setCloudImages] = useState();
  const [pet, setPet] = useState();
  const [plants, setPlants] = useState([]);
  const [grass, setGrass] = useState([]);
  const [clouds, setClouds] = useState([]);

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

    const arrToImgs = (arr) =>
      arr.map((item) => {
        const img = new Image();
        img.src = item;
        return img;
      });

    // Load plant images
    const plantImgs = {
      stem: [plant0ImgSrc, plant1ImgSrc].map((p) => {
        const img = new Image();
        img.src = p;
        return img;
      }),
      flower: [flower0ImgSrc, flower1ImgSrc, flower2ImgSrc, flower3ImgSrc].map(
        (p) => {
          const img = new Image();
          img.src = p;
          return img;
        }
      ),
    };

    const grassImgs = arrToImgs([grass0ImgSrc, grass1ImgSrc, grass2ImgSrc]);
    const cloudImgs = {
      small: arrToImgs([cloudSmall0ImgSrc, cloudSmall1ImgSrc]),
      big: arrToImgs([cloudBig0ImgSrc, cloudBig1ImgSrc]),
    };

    return [imgs, plantImgs, grassImgs, cloudImgs];
  };

  const draw = (ctx, frameCount) => {
    if (!images || !pet) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "rgb(52, 235, 225)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // ctx.fillStyle = "rgba(29, 163, 24)";
    ctx.fillStyle = "rgba(74, 168, 71)";
    ctx.fillRect(0, 462, ctx.canvas.width, 900);

    pet.update();

    grass.forEach((grass) => {
      grass.draw(ctx);
    });

    plants.forEach((plant) => {
      plant.draw(ctx);
    });

    pet.draw(ctx);
  };

  const buildGrass = (grassImgs) => {
    const numGrass = Math.floor(Math.random() * 30) + 10;
    const grassRef = [];
    for (let i = 0; i < numGrass; i++) {
      const leftX = window.innerWidth * 0.15 + (window.innerWidth / 7) * (Math.random() * 2 - 1);
      const rightX = window.innerWidth * 0.85 + (window.innerWidth / 7) * (Math.random() * 2 - 1);

      const x = Math.random() > 0.5 ? rightX : leftX;
      const y = 470 + Math.random() * (window.innerHeight - 470);
      grassRef.push(new Grass({ x, y, images: grassImgs }));
    }

    setGrass(grassRef);
  };

  const growGarden = () => {
    // Check if all plants already matured or non-existent
    const immaturePlants = plants.filter((plant) => plant.growth !== 2);

    const shouldAddPlant = immaturePlants.length === 0 || Math.random() > 0.5;
    if (shouldAddPlant) {
      setPlants((prevPlants) => {
        const x =
          window.innerWidth / 2 +
          (window.innerWidth / 3) * (Math.random() * 2 - 1);
        const y = 400;
        let newPlants = prevPlants.concat([
          new Plant({ x, y, images: plantImages }),
        ]);
        return newPlants;
      });
    } else {
      const plant =
        immaturePlants[Math.floor(Math.random() * immaturePlants.length)];
      plant.grow();
    }
  };

  useEffect(() => {
    const [imgs, plantImgs, grassImgs, cloudImgs] = buildImages();
    setImages(imgs);
    setPlantImages(plantImgs);
    setGrassImages(grassImgs);
    setCloudImages(cloudImgs);

    setPet(new Pet({ x: window.innerWidth / 2, y: 400, images: imgs }));
    buildGrass(grassImgs);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
