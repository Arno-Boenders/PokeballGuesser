import "../css/style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {gamesCollection} from "./database"
import { addDoc} from "firebase/firestore";

if (!localStorage.getItem("counter")) {
  localStorage.setItem("counter", JSON.stringify(1));
}

//token
const rand = () => {
  return Math.random().toString(36).substr(2);
};

const token = () => {
  return rand() + rand();
};

//localstorage
if (!localStorage.getItem("token")) {
  localStorage.setItem("token", JSON.stringify(token()));
}

// JSON.parse("token");
//canvas for single pokeball
var pokeballHtml = document.querySelector("#pokeball");

//scenes
const scene = new THREE.Scene();
const pokeballScene = new THREE.Scene();

//camera
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
var pokeballCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

const pokeballRenderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#pokeball"),
  alpha: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(60);
pokeballRenderer.setPixelRatio(window.devicePixelRatio);
pokeballRenderer.setSize(150, 75);
pokeballCamera.position.setZ(75);

//adding background
const background = new THREE.TextureLoader().load("../img/plains.jpg");
scene.background = background;

//lights
const light = new THREE.AmbientLight(0xffffff, 1.7); // soft white light
light.position.set(0, 0, 0);
scene.add(light);
const pokeballLight = new THREE.AmbientLight(0xffffff, 1.7); // soft white light
light.position.set(0, 0, 0);
pokeballScene.add(pokeballLight);

//textures
var normalPokeball = new THREE.TextureLoader().load(
  "../img/textures/pokeball.jpeg"
);
var pokeballTexture = new THREE.TextureLoader().load(
  "../img/textures/normalTexture.png"
);

var greatballTexture = new THREE.TextureLoader().load(
  "../img/textures/greatball.jpeg"
);

var masterballTexture = new THREE.TextureLoader().load(
  "../img/textures/masterball.jpeg"
);
var masterTexture = new THREE.TextureLoader().load(
  "../img/textures/masterTexture.png"
);



//Adding random amount of pokeballs at random places
function addRandomPokeball() {
  const pokeballRandom = new THREE.Mesh(
    new THREE.SphereGeometry(0.75, 10, 10),
    new THREE.MeshStandardMaterial({
      map: normalPokeball,
      normalMap: pokeballTexture,
    })
  );

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(50));

  pokeballRandom.position.set(x, y, z);
  pokeballRandom.rotation.x = 3.1;
  pokeballRandom.rotation.y = 1.5;
  scene.add(pokeballRandom);
}
function addRandomGreatball() {
  const greatballRandom = new THREE.Mesh(
    new THREE.SphereGeometry(0.75, 10, 10),
    new THREE.MeshStandardMaterial({
      map: greatballTexture,
      normalMap: pokeballTexture,
    })
  );

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(50));

  greatballRandom.position.set(x, y, z);
  greatballRandom.rotation.x = 3.1;
  greatballRandom.rotation.y = 1.5;
  scene.add(greatballRandom);
}
function addRandomMasterball() {
  const masterballRandom = new THREE.Mesh(
    new THREE.SphereGeometry(0.75, 10, 10),
    new THREE.MeshStandardMaterial({
      map: masterballTexture,
      normalMap: masterTexture,
    })
  );

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(50));

  masterballRandom.position.set(x, y, z);
  masterballRandom.rotation.x = 3.1;
  masterballRandom.rotation.y = 1.5;
  scene.add(masterballRandom);
}

const pokeballNumber = Math.floor(Math.random() * 40);
console.log("pokeballs: " + pokeballNumber);
const greatballNumber = Math.floor(Math.random() * 40);
console.log("greatballs: " + greatballNumber);
const masterballNumber = Math.floor(Math.random() * 40);
console.log("masterballs: " + masterballNumber);

Array(pokeballNumber).fill().forEach(addRandomPokeball);
Array(greatballNumber).fill().forEach(addRandomGreatball);
Array(masterballNumber).fill().forEach(addRandomMasterball);

//Random pokeball to count
//pokeballs
var pokeball = new THREE.Mesh(
  new THREE.SphereGeometry(40, 100, 100),
  new THREE.MeshStandardMaterial({
    map: normalPokeball,
    normalMap: pokeballTexture,
  })
);

var greatball = new THREE.Mesh(
  new THREE.SphereGeometry(40, 100, 100),
  new THREE.MeshStandardMaterial({
    map: greatballTexture,
    normalMap: pokeballTexture,
  })
);

var masterball = new THREE.Mesh(
  new THREE.SphereGeometry(40, 100, 100),
  new THREE.MeshStandardMaterial({
    map: masterballTexture,
    normalMap: masterTexture,
  })
);

//array for random single pokeball
var arr = [1, 2, 3];
var randomPokeballNumber = arr[Math.floor(Math.random() * arr.length)];
function randomPokeball() {
  console.log(randomPokeballNumber);
  if (randomPokeballNumber === 1) {
    pokeballHtml.innerHTML = pokeballScene.add(pokeball);
  } else if (randomPokeballNumber === 2) {
    pokeballHtml.innerHTML = pokeballScene.add(greatball);
  } else {
    pokeballHtml.innerHTML = pokeballScene.add(masterball);
  }
}
randomPokeball();

//controls
const controls = new OrbitControls(camera, renderer.domElement);

//update
function update() {
  requestAnimationFrame(update);

  pokeball.rotation.x = 3.1;
  pokeball.rotation.y += 0.02;
  greatball.rotation.x = 3.1;
  greatball.rotation.y += 0.02;
  masterball.rotation.x = 3.1;
  masterball.rotation.y += 0.02;

  controls.update();
  renderer.render(scene, camera);
  pokeballRenderer.render(pokeballScene, pokeballCamera);
}
update();

//submitting
document.querySelector("#submit").addEventListener("click", function (e) {
  let guess = document.querySelector("#input").value;
  let iscorrect = false;
  async function addNewGame() { //adding document to database
    const newDoc = await addDoc(gamesCollection, {
      amountGreatball: greatballNumber,
      amountMasterball: masterballNumber,
      amountPokeball: pokeballNumber,
      guess: parseInt(guess),
      isCorrect: iscorrect,
      pokeball: randomPokeballNumber,
    });
    console.log(`Document was created at ${newDoc.path}`);
  }
  e.preventDefault();
  if (parseInt(guess) === pokeballNumber && randomPokeballNumber === 1) {
    iscorrect = true;
    addNewGame();
  } else if (parseInt(guess) === greatballNumber && randomPokeballNumber === 2) {
    iscorrect = true;
    addNewGame();
  } else if (parseInt(guess) === masterballNumber && randomPokeballNumber === 3) {
    iscorrect = true;
    addNewGame();
    
  } else {
    addNewGame();
  }
  //go to results window
  if (parseInt(JSON.parse(localStorage.getItem("counter"))) < 3) {
    localStorage.setItem(
      "counter",
      parseInt(JSON.parse(localStorage.getItem("counter"))) + 1
    );
  } else {
     setTimeout(function () {
       window.location.href =
         "https://62a6f2966ba27a136c37f36e--pokemonguesser.netlify.app/results.html";
     }, 1500);
    
  }
  
  //timer before reload
 setTimeout(function () {
   window.location.reload();
 }, 2000);
});

document.querySelector("#form").addEventListener("submit", function (e) {
  let guess = document.querySelector("#input").value;
  let iscorrect = false;
  async function addNewGame() {
    //adding document to database
    const newDoc = await addDoc(gamesCollection, {
      amountGreatball: greatballNumber,
      amountMasterball: masterballNumber,
      amountPokeball: pokeballNumber,
      guess: parseInt(guess),
      isCorrect: iscorrect,
      pokeball: randomPokeballNumber,
    });
    console.log(`Document was created at ${newDoc.path}`);
  }
  e.preventDefault();
  if (parseInt(guess) === pokeballNumber && randomPokeballNumber === 1) {
    iscorrect = true;
    addNewGame();
  } else if (
    parseInt(guess) === greatballNumber &&
    randomPokeballNumber === 2
  ) {
    iscorrect = true;
    addNewGame();
  } else if (
    parseInt(guess) === masterballNumber &&
    randomPokeballNumber === 3
  ) {
    iscorrect = true;
    addNewGame();
  } else {
    addNewGame();
  }
  //go to results window
  if (parseInt(JSON.parse(localStorage.getItem("counter"))) < 3) {
    localStorage.setItem(
      "counter",
      parseInt(JSON.parse(localStorage.getItem("counter"))) + 1
    );
  } else {
    setTimeout(function () {
      window.location.href =
        "https://62a6f2966ba27a136c37f36e--pokemonguesser.netlify.app/results.html";
    }, 1500);
  }

  //timer before reload
  setTimeout(function () {
    window.location.reload();
  }, 2000);
});