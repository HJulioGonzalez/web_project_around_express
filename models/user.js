const mongoose = require("mongoose");
module.exports.regexRules = {
  protocol: /^(https?:\/\/|www\.)/,
  host: /^[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(:\d+)?$/,
  path: /^\/[\w._~:/?%#\[\]@!$&'()*+,;=-]+#?$/,
};
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  about: {
    type: String,
    required: true,
    min: 2,
    max: 30,
  },
  avatar: {
    type: String,
    required: [true, "avatar URL required"],
  },
});

module.exports = mongoose.model("User", userSchema);
