const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { PORT = 3000 } = process.env;
const usersRoutes = require(path.join(__dirname, "routes", "users.js"));
const cardsRoutes = require(path.join(__dirname, "routes", "cards.js"));
const app = express();

mongoose.connect("mongodb://localhost:27017/aroundb");
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/cards", cardsRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Recurso solicitado no encontrado",
  });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  const regexRules = {
    protocol: /^https?:\/\/(www\.)?/,
    host: /^[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(:\d+)?$/,
    path: /^\/[\w._~:/?%#\[\]@!$&'()*+,;=-]*#?$/,
  };
  const url = "http://example-example-example.com";
  function checkUrl(v) {
    const urlProtocol = v.match(regexRules.protocol)[0];
    const protocolTest = regexRules.protocol.test(v);
    const noProtoclUrl = v.replace(urlProtocol, "");
    const pathIndex =
      noProtoclUrl.indexOf("/") === -1 ? "N/A" : noProtoclUrl.indexOf("/");
    const urlHost =
      pathIndex === "N/A" ? noProtoclUrl : noProtoclUrl.slice(0, pathIndex);
    const hostTest = regexRules.host.test(urlHost);
    const urlPath =
      pathIndex === "N/A"
        ? "No path url"
        : noProtoclUrl.slice(noProtoclUrl.indexOf("/"));
    const pathTest = regexRules.path.test(urlPath);
    return {
      urlProtocol,
      protocolTest,
      noProtoclUrl,
      pathIndex,
      urlHost,
      hostTest,
      urlPath,
      pathTest,
    };
  }
  function checkUrl2(v) {
    const urlProtocol = v.match(regexRules.protocol)[0];
    const protocolTest = regexRules.protocol.test(v);
    const noProtoclUrl = v.replace(urlProtocol, "");
    const pathIndex =
      noProtoclUrl.indexOf("/") === -1 ? "N/A" : noProtoclUrl.indexOf("/");
    const urlHost =
      pathIndex === "N/A" ? noProtoclUrl : noProtoclUrl.slice(0, pathIndex);
    const hostTest = regexRules.host.test(urlHost);
    const urlPath =
      pathIndex === "N/A"
        ? "No path url"
        : noProtoclUrl.slice(noProtoclUrl.indexOf("/"));
    const pathTest = regexRules.path.test(urlPath);
    return urlPath === "No path url"
      ? protocolTest && hostTest
      : protocolTest && hostTest && pathTest;
  }
  console.log(checkUrl(url));
  console.log(checkUrl2(url));
  // function urlFull() {
  //   const obj = {
  //     protocol: {
  //       protocolString: url.match(regexRules.protocol)[0],
  //       validate: regexRules.protocol.test(url),
  //     },
  //     host: {},
  //     path: {},
  //   };
  //   const { protocolString } = obj.protocol;
  //   obj.host.noProtocolUrl = url.replace(protocolString, "");
  //   obj.host.pathIndex =
  //     obj.host.noProtocolUrl.indexOf("/") === -1
  //       ? "N/A"
  //       : obj.host.noProtocolUrl.indexOf("/");
  //   obj.host.hostString =
  //     obj.host.pathIndex === "N/A"
  //       ? obj.host.noProtocolUrl
  //       : obj.host.noProtocolUrl.slice(0, obj.host.pathIndex);
  //   obj.host.validate = regexRules.host.test(obj.host.hostString);

  //   obj.path.pathString =
  //     obj.host.pathIndex === "N/A"
  //       ? "No path url"
  //       : obj.host.noProtocolUrl.slice(obj.host.noProtocolUrl.indexOf("/"));
  //   obj.path.validate = regexRules.path.test(obj.path.pathString);
  //   return obj;
  // }
  // function urlFull2() {
  //   const obj = {
  //     protocol: {
  //       protocolString: url.match(regexRules.protocol)[0],
  //       validate: regexRules.protocol.test(url),
  //     },
  //     host: {},
  //     path: {},
  //   };
  //   const { protocolString } = obj.protocol;
  //   obj.host.noProtocolUrl = url.replace(protocolString, "");
  //   obj.host.pathIndex =
  //     obj.host.noProtocolUrl.indexOf("/") === -1
  //       ? "N/A"
  //       : obj.host.noProtocolUrl.indexOf("/");
  //   obj.host.hostString =
  //     obj.host.pathIndex === "N/A"
  //       ? obj.host.noProtocolUrl
  //       : obj.host.noProtocolUrl.slice(0, obj.host.pathIndex);
  //   obj.host.validate = regexRules.host.test(obj.host.hostString);

  //   obj.path.pathString =
  //     obj.host.pathIndex === "N/A"
  //       ? "No path url"
  //       : obj.host.noProtocolUrl.slice(obj.host.noProtocolUrl.indexOf("/"));
  //   obj.path.validate = regexRules.path.test(obj.path.pathString);
  //   return obj.path.pathString === "No path url"
  //     ? obj.protocol.validate && obj.host.validate
  //     : obj.protocol.validate && obj.host.validate && obj.path.validate;
  // }
  // console.log(urlFull());
  // console.log(urlFull2());
});
