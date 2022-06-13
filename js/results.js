import "../css/results.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { gamesCollection } from "./database";
import { getDocs } from "firebase/firestore";
import Chart from "chart.js/auto";

//camera
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
//renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#pikachu"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(0.2);

//scene
const scene = new THREE.Scene();

//background
const background = new THREE.TextureLoader().load("../img/plains.png");
scene.background = background;

//lights
const light = new THREE.AmbientLight(0xffffff, 1.7); // soft white light
light.position.set(0, 0, 0);
scene.add(light);

//loading 3d model of pikachu
const loader = new GLTFLoader();
loader.load(
  "../models/pikachu_wearing_ashs_hat/scene.gltf",
  function (gltf) {
    scene.add(gltf.scene);
  },
  (error) => {
    console.log(error);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  }
);
localStorage.setItem("counter", JSON.stringify(1));
//update
function update() {
  requestAnimationFrame(update);

  renderer.render(scene, camera);
}
update();

//fetching data
const querySnapshot = await getDocs(gamesCollection);

let counter = 0;
function getData() {
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", JSON.stringify(doc.data()));
    //get the right amount of pokeballs for the guess
    function amountRightPokeball() {
      let amountRightPokeball;
      if (doc.get("pokeball") == 1) {
        amountRightPokeball = doc.get("amountPokeball");
      } else if (doc.get("pokeball") == 2) {
        amountRightPokeball = doc.get("amountGreatball");
      } else if (doc.get("pokeball") == 3) {
        amountRightPokeball = doc.get("amountMasterball");
      }
      return amountRightPokeball;
    }

    //check if guess was right
    function rightGuess() {
      let title = "";
      if (doc.get("isCorrect") === true) {
        title = "You guessed right!! 😁";
      } else {
        title = "You guessed wrong!! 😢";
      }
      return title;
    }
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", "myChart" + counter);

    const element = document.querySelector("#main");
    element.appendChild(canvas, element);
    //chart
    const ctx = document.getElementById("myChart" + counter).getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Your guess", "Actual amount"],
        datasets: [
          {
            label: rightGuess(),
            data: [doc.get("guess"), amountRightPokeball()],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    counter++;    
  });
}
getData();
document.querySelector("#submit").addEventListener("click", function () { 
  window.location.href = "/index.html"
})
// document.querySelector("#pikachu").setAttribute("width", window.innerWidth);
// document.querySelector("#pikachu").setAttribute("height", window.innerHeight);