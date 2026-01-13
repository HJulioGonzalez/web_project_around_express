const mongoose = require("mongoose");
const regexRules = {
  protocol: /^(https?:\/\/|www\.)/,
  host: /^[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(:\d+)?$/,
  path: /^\/[\w._~:/?%#\[\]@!$&'()*+,;=-]+#?$/,
};

const cardSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  link: {
    type: String,
    validate:   
    [
      {
      validator: v => regexRules.protocol.test(v),
      message: "URL must include protocol"
    },
    {
      validator: v => {
        const noProtocol = v.replace(regexRules.protocol, "");
        const host = noProtocol.split("/")[0];
        return regexRules.host.test(host);
      },
      message: "Invalid host in URL"
    },
    {
      validator: v => {
        if (!v.includes("/")) return true;
        const path = v.slice(v.indexOf("/"));
        return regexRules.path.test(path);
      },
      message: "Invalid URL path"
    }
    ],
    required: [true, "link URL mandatory"]
  }, 
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, 
  likes: {
  type: [mongoose.Schema.Types.ObjectId],
  ref: "User",
  default: [], 
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Card", cardSchema);