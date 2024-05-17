import { cars, markets } from "./cars/index.js";

export const expand = (options, car) => {
  if (!options.market) {
    options.market = "se";
  }
  return car.defaults(car.requirements(options));
};

export const translate = (options, car) => {
  const result = [];

  // 1-3 Model
  result[0] = car.model;

  // 4-5 Engine type
  result[1] = car.features.versions[options.version];

  // 6-7 Sales version
  result[2] = options.upgrade.includes("plus") ? "PP" : "PB";

  // 8-9 Body, Transmission
  result[3] = ["SRSM", "LRSM"].includes(options.version) ? "0L" : "0E";

  // 10 Steering
  result[4] = ["uk", "ie", "au"].includes(options.market) ? "2" : "1";

  // 11-12 Marketing code
  result[5] = markets[options.market];

  // 13-17 Exterior
  result[6] = car.features.exterior[options.exterior];

  // 18-24 Interior
  result[7] = car.features.interior[options.interior];

  // 25-34 Empty + S-message (not used)
  result[8] = "      00000";

  // Options - Upgrades, single options, wheels
  result[9] = options.upgrade.map(name => car.features.upgrades[name])
    .concat(
      options.single.map(name => car.features.single[name]) 
    )
    .concat(
      car.features.wheels[options.wheels]
    ).sort().join("")

  return result.join("");
};
