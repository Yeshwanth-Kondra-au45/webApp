import React, { useEffect, useRef } from 'react'
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";

interface CuboidProps {
  imageData: string;
}

const Cuboid = ({ imageData }:CuboidProps) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const createScene = async () => {
      const canvas = canvasRef.current;
      const engine = new BABYLON.Engine(canvas, true);

      const scene = new BABYLON.Scene(engine);

      const camera = new BABYLON.ArcRotateCamera(
        "Camera",
        0,
        0,
        10,
        new BABYLON.Vector3(0, 0, 0),
        scene
      );
      camera.attachControl(canvas, true);

      const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
      );

      const material = new BABYLON.StandardMaterial("texture", scene);
      const texture = new BABYLON.Texture(imageData, scene);
      material.diffuseTexture = texture;

    const ratio = 1.5; 
const img = new Image();
img.onload = function () {
  const width = img.width / 100;
  const height = img.height / 100;
  const maxDimension = Math.max(width, height);
  const depth = maxDimension * ratio;
  const box = BABYLON.MeshBuilder.CreateBox("box", { size: maxDimension, depth }, scene);
  box.material = material;

  engine.runRenderLoop(() => {
    scene.render();
  });
};
img.src = imageData;

    };

    createScene();
  }, [imageData]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "400px" }} />;
};

export default Cuboid;
