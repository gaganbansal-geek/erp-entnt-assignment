const mongoose = require("mongoose");

const dataBaseConnection = mongoose.connect(
  "mongodb+srv://hanumat:hanumat@cluster0.aqmtmxk.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0"
);

module.exports = {
  dataBaseConnection,
};
