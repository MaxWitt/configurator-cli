export const model = "534";

export const features = {
  versions: {
    SRSM: "EU",
    LRSM: "FE",
    LRDM: "FD",
    "LRDM-P": "FF",
  },
  exterior: {
    vapour: "74000",
    snow: "70700",
    storm: "74700",
    jupiter: "73600",
    midnight: "72300",
    space: "71700",
  },
  upgrades: {
    pilot: "001162",
    plus: "XPLUSS",
    climate: "001334",
    pro: "001336",
    performance: "001150",
  },
  single: {
    "cable-type2": "001248",
    "premium-sound": "001033",
    "pixel-led": "001170",
    "window-tint": "000179"
  },
  interior: {
    "3d-charcoal": "R60000",
    "ash-charcoal": "RF8000",
    "ash-slate": "RFA000",
    "nappa-charcoal": "RC8300",
    "nappa-zinc": "RCZ300",
  },
  wheels: {
    aero: "",
    pro: "XPRWHE",
    "pro-graphite": "001335",
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
    if (options.upgrade.includes("pro")) {
      result.valid = false;
      result.messages.push(`Cannot combine Performance pack with Pro pack`);
    }

    if (options.wheels && options.wheels !== "performance") {
      result.valid = false;
      result.messages.push(
        `Cannot combine Performance pack with ${options.wheels}" wheels`
      );
    }
  }
  // Pro pack
  if (options.upgrade && options.upgrade.includes("pro")) {
    if (options.wheels && !["pro", "pro-graphite"].includes(options.wheels)) {
      result.valid = false;
      result.messages.push(`Cannot combine Pro pack with ${options.wheels} wheels`);
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
      `Cannot combine Performance wheels with ${options.version}`
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
    ["ash-charcoal", "ash-slate", "nappa-charcoal", "nappa-zinc"].includes(options.interior)
  ) {
    options.upgrade.push("plus");
  }

  // Upgrades - Pro
  if (
    !options.upgrade?.includes('pro') && 
    ["pro", "pro-graphite"].includes(options.wheels)
  ) {
    options.upgrade.push('pro')
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
    version: "SRSM",
    upgrade: [],
    single: [],
    exterior: "vapour",
    interior: "3d-charcoal",
    wheels: "aero",
    ...options,
  };
};
