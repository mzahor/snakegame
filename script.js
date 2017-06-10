// Code goes here
function init() {
  const settings = {
    size: {
      width: 10,
      height: 10
    },
    speed: 200
  };
  
  let controller = new Controller();
  let engine = new Engine(settings);
  
  engine.setController(controller);
  
  let renderer = new Renderer(settings.size);

  engine.onTick(function(state) {
    renderer.render(state);
  });

  engine.start();
}

setTimeout(init, 1e3);