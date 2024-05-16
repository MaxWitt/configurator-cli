import { Command, Option } from "commander";
import { expand, translate, validate } from "./engine.js";
import { cars, markets } from "./cars/index.js";

const program = new Command();
program.name("configurator").description("Configure your Polestar");

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
      new Option("-v, --version <name>", "Which motor version").choices(
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
      new Option("-p, --paint <name>", "Exterior paint job").choices(
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
      const validation = validate(options);
      if (!validation.valid) {
        console.error(validation.messages.join("\n"));
        return;
      }
      console.log(translate(expand(options)));
    });
});

program.parse();
