import Controller from "./controller";
import Engine from "./engine";
import { Settings } from "./interfaces";
import Renderer from "./renderer";

function init() {
  const settings: Settings = {
    size: {
      height: 10,
      width: 10,
    },
    speed: 200,
  };

  const controller = new Controller();
  const engine = new Engine(settings);

  engine.setController(controller);

  const renderer = new Renderer(settings.size);

  engine.onTick((state) => {
    renderer.render(state);
  });

  engine.start();
}

init();
