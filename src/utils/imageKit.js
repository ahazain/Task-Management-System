const config = require("../configs/config");
const imageKit = require("imagekit");
const image = new imageKit({
  publicKey: config.publicKey,
  privateKey: config.privateKey,
  urlEndpoint: config.urlEndpoint,
});

module.exports = image;
