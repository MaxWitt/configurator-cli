import { Command, Option } from "commander";
import { expand, translate } from "./engine.js";
import { cars, markets } from "./cars/index.js";

export const program = new Command();
program.name("configurator").description("Configure your Polestar car");

Object.entries(cars).forEach(([name, car]) => {
  const command = program
    .command(name)
    .addOption(
      new Option(
        "-m, --market <name>",
        "In what market are you buying your Polestar"
      ).choices(Object.keys(markets))
    )
    .addOption(
      new Option("-v, --version <name>", "Motor version").choices(
        Object.keys(car.features.versions)
      )
    )
    .addOption(
      new Option("-u, --upgrade <name...>", "Upgrade packages").choices(
        Object.keys(car.features.upgrades)
      )
    );
  if (car.features.single) {
    command.addOption(
      new Option("-s, --single <name...>", "Single options").choices(
        Object.keys(car.features.single)
      )
    );
  }
  command
    .addOption(
      new Option("-e, --exterior <name>", "Exterior color finish").choices(
        Object.keys(car.features.exterior)
      )
    )
    .addOption(
      new Option("-i, --interior <name>", "Upholstery selection").choices(
        Object.keys(car.features.interior)
      )
    )
    .addOption(
      new Option("-w, --wheels <name>", "Wheels").choices(
        Object.keys(car.features.wheels)
      )
    )
    .action((args) => {
      const options = { ...args, model: car.model };
      const validation = car.conflicts(options);
      if (!validation.valid) {
        console.error(validation.messages.join("\n"));
        return;
      }
      console.log(translate(expand(options, car), car));
    });
});

