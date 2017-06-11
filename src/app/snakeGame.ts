import Controller from "./controller";
import Engine from "./engine";
import { ISettings } from "./interfaces";
import Renderer from "./renderer";

export default class SnakeGame {
  public start() {
    const settings: ISettings = {
      size: {
        height: 10,
        width: 10,
      },
      speed: 200,
    };

    const controller = new Controller();
    const renderer = new Renderer(settings.size);

    const engine = new Engine(settings);

    engine.setController(controller);
    engine.setRenderer(renderer);

    engine.start();
  }
}
