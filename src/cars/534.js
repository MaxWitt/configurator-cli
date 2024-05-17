export const model = "534";

export const features = {
  versions: {
    SRSM: "FC",
    LRSM: "FE",
    LRDM: "FD",
    "LRDM-P": "FF",
  },
  exterior: {
    magnesium: "72900",
    snow: "70700",
    thunder: "72800",
    jupiter: "73600",
    midnight: "72300",
    space: "71700",
  },
  upgrades: {
    pilot: "001162",
    plus: "XPLUSS",
    performance: "001150",
  },
  interior: {
    "3d-charcoal": "R60000",
    "3d-zinc": "R6B000",
    "ash-charcoal": "RF8000",
    "ash-slate": "RFA000",
    "nappa-zinc": "RCZ300",
  },
  wheels: {
    aero: "",
    pro: "001257",
    performance: "XPFWHE",
  },
};

export const conflicts = (options) => {
  const result = {
    valid: true,
    messages: [],
  };
  // Performance Pack
  if (options.upgrade && options.upgrade.includes("performance")) {
    if (options.version && options.version !== "LRDM-P") {
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
    options.wheels &&
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
  if (options.upgrade && options.upgrade.includes("plus")) {
    if (
      options.interior &&
      ["3d-charcoal", "3d-zinc"].includes(options.interior)
    ) {
      result.valid = false;
      result.messages.push(
        `Cannot combine Plus pack with ${options.interior} interior`
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
    (options.version === "LRDM-P" || options.wheels === "performance")
  ) {
    options.upgrade.push("performance");
  }

  // Upgrades - Plus
  if (
    !options.upgrade?.includes("plus") &&
    ["ash-charcoal", "ash-slate", "nappa-zinc"].includes(options.interior)
  ) {
    options.upgrade.push("plus");
  }

  // Wheels
  if (!options.wheels && options.upgrade.includes("performance")) {
    options.wheels = "performance";
  }

  // Version
  if (!options.version && options.upgrade?.includes("performance")) {
    options.version = "LRDM-P";
  }

  // Interior
  if (!options.interior && options.upgrade.includes("plus")) {
    options.interior = "ash-charcoal";
  }

  return options;
};

export const defaults = (options) => {
  return {
    version: 'SRSM',
    upgrades: [],
    single: [],
    exterior: 'magnesium',
    interior: '3d-charcoal',
    wheels: 'aero',
    ...options
  }
}
