{
  ("extends");
  ("airbnb-base");
}
module.exports = {
  rules: {
    "no-underscore-dangle": [
      "error",
      {
        allow: ["_id"],
      },
    ],
  },
};
module.exports = {
  rules: {
    "no-console": [
      "warn",
      {
        allow: ["log", "warn", "error"],
      },
    ],
  },
};
module.exports = {
  rules: {
    "linebreak-style": "off",
  },
};
