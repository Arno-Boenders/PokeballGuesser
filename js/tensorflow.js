const canvas = document.getElementById("bg");

// Load the model.
cocoSsd.load().then((model) => {
  // detect objects in the image.
  model.detect(canvas).then((predictions) => {
    console.log("Predictions: ", predictions);
  });
});
