export const model = "359";

export const features = {
  versions: {
    LRDM: "EA",
    "LRDM-P": "EE",
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
    lidar: "001180",
    plus: "XPLUSS",
    performance: "001150",
    pro: "001213",
  },
  single: {
    "cable-type2": "001248",
    "hd-led": "001190",
    "window-tint": "000179",
    "tow-hook": "001028",
  },
  interior: {
    weavetech: "RP0000",
    microtech: "RN0000",
    wool: "R80000",
    "nappa-charcoal": "RC0000",
    "nappa-zinc": "RCG000",
    "nappa-jupiter": "RCJ000",
  },
  wheels: {
    aero: "",
    plus: "001215",
    pro: "XPRWHE",
    sport: "001249",
    performance: "XPFWHE",
  },
};

export const conflicts = (options) => {
  const result = {
    valid: true,
    messages: [],
  };

  // Performance pack
  if (options.upgrade?.includes("performance")) {
    if (options.version && options.version !== "LRDM-P") {
      result.valid = false;
      result.messages.push(
        `Cannot combine Performance pack with ${options.version}`
      );
    }
    if (options.wheels && options.wheels !== "performance") {
      result.valid = false;
      result.messages.push(
        `Cannot combine Performance pack with ${options.wheels} wheels`
      );
    }
  }
  if (options.wheels === "performance" && options.version && options.version !== "LRDM-P") {
    result.valid = false;
    result.messages.push(
      `Cannot combine Performance pack with ${options.version}`
    );
  }

  // Pro pack
  if (options.upgrade?.includes("pro")) {
    if (!["pro", "sport"].includes(options.wheels)) {
      result.valid = false;
      result.messages.push(
        `Cannot combine Pro pack with ${options.wheels} wheels`
      );
    }
    if (options.upgrade?.includes("performance")) {
      result.valid = false;
      result.messages.push(`Cannot combine Pro pack with Performance pack`);
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
    !options.upgrade.includes("plus") &&
    (["nappa-charcoal", "nappa-jupiter", "nappa-zinc"].includes(
      options.interior
    ) ||
      options.single?.includes("hd-led"))
  ) {
    options.upgrade.push("plus");
  }

  // Upgrades - Pilot
  if (
    !options.upgrade.includes("pilot") &&
    (options.upgrade.includes("lidar") || options.upgrade.includes("plus"))
  ) {
    options.upgrade.push("pilot");
  }

  // Upgrades - Pro
  if (
    !options.upgrade.includes("pro") &&
    ["pro", "sport"].includes(options.wheels)
  ) {
    options.upgrade.push("pro");
  }

  // Wheels
  if (!options.wheels && options.upgrade.includes("performance")) {
    options.wheels = 'performance';
  }
  if (!options.wheels && options.upgrade.includes('pro')) {
    options.wheels = 'pro';
  }

  // Version
  if (!options.version && options.upgrade.includes('performance')) {
    options.version = 'LRDM-P'
  }
  return options;
};

export const defaults = (options) => {
  return {
    version: 'LRDM',
    upgrade: [],
    single: [],
    exterior: 'magnesium',
    interior: 'weavetech',
    wheels: 'aero',
    ...options
  }
};
