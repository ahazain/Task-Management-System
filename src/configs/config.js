require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

class Config {
  static port = process.env.PORT || 4000;
  static base_url = process.env.BASE_URL;
  static secret_key = process.env.SECRET_KEY;
  static publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  static privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  static urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;
  static email = process.env.EMAIL;
  static password = process.env.PASSWORD;
}

module.exports = Config;
