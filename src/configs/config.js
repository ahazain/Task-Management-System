require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

class Config {
  static port = process.env.PORT || 4000;
  static base_url = process.env.BASE_URL;
  static secret_key = process.env.SECRET_KEY;
}

module.exports = Config;
