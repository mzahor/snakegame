import Controller from './controller';
import Engine from './engine';
import Renderer from './renderer';

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

console.log('hello');

init();