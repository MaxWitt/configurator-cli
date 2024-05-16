export const model = "814";

export const features = {
  versions: {
    LRSM: "PB",
    LRDM: "PA",
  },
  exterior: {
    magnesium: "72900",
    snow: "70700",
    electron: "36900",
    storm: "36800",
    gold: "370000",
    space: "71700",
  },
  upgrades: {
    pilot: "220002",
    plus: "220004",
    pro: "220003",
    performance: "220001",
  },
  single: {
    "cable-type2": "A01446",
    "chromatic-glass": "221003",
    "body-paint": "221014",
    "tinted-windows": "221010",
  },
  interior: {
    charcoal: "P01300",
    "charcoal-zinc": "P04300",
    "zinc-zinc": "P03200",
    "nappa-charcoal": "P01100",
    "nappa-zinc": "P02100",
  },
  wheels: {
    aero: "",
    sport: "221001",
    pro: "XPRWHE",
    performance: "XPFWHE",
  },
};

export const conflicts = (options) => {
  const result = {
    valid: true,
    messages: [],
  };
  // Performance Pack
  if (options.upgrade.includes("performance")) {
    if (options.version && options.version !== "LRDM") {
      result.valid = false;
      result.messages.push(
        `Cannot combine Performance pack with ${options.version}`
      );
    }
    if (options.wheels && options.wheels !== "performance") {
      result.valid = false;
      result.messages.push(
        `Cannot combine Performance pack with ${options.wheels}" wheels`
      );
    }
  }
  if (
    options.wheels === "performance" &&
    options.version &&
    options.version !== "LRDM"
  ) {
    result.valid = false;
    result.messages.push(
      `Cannot combine Performance pack with ${options.version}`
    );
  }

  // Plus pack
  if (options.upgrade?.includes("plus")) {
    if (options.interior === "charcoal") {
      result.valid = false;
      result.messages.push(
        `Cannot combine Plus pack with ${options.interior} interior`
      );
    }
  }

  // Pro pack
  if (options.upgrade?.includes("pro")) {
    if (options.wheels && options.wheels !== "pro") {
      result.valid = false;
      result.messages.push(
        `Cannot combine Pro pack with ${options.wheels} wheels`
      );
    }
  }

  return result;
};

export const requirements = (options) => {
  if (options.upgrade === undefined) {
    options.upgrade = [];
  }

  // Upgrades - Performance
  if (
    !options.upgrade?.includes("performance") &&
    options.wheels === "performance"
  ) {
    options.upgrade.push("performance");
  }

  // Upgrades - Plus
  if (
    !options.upgrade?.includes("plus") &&
    (["charcoal-zinc", "zinc-zinc", "nappa-charcoal", "nappa-zinc"].includes(
      options.interior
    ) ||
      options.upgrade.includes("performance") ||
      options.single.includes("chromatic-glass") ||
      options.single.includes("body-paint"))
  ) {
    options.upgrade.push("plus");
  }

  // Wheels
  if (!options.wheels && options.upgrade.includes("performance")) {
    options.wheels = "performance";
  }
  if (!options.wheels && options.upgrade.includes("pro")) {
    options.wheels = "pro";
  }

  // Version
  if (!options.version && options.upgrade?.includes("performance")) {
    options.version = "LRDM";
  }

  // Interior
  if (!options.interior && options.upgrade.includes("plus")) {
    options.interior = "charcoal-zinc";
  }

  return options;
};

export const defaults = (options) => {
  return {
    version: "LRSM",
    upgrades: [],
    single: [],
    paint: "magnesium",
    interior: "charcoal",
    wheels: "aero",
    ...options,
  };
};
