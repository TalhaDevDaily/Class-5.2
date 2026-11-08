const mongoose = require("mongoose");
const { Schema } = mongoose;

function mongooseConnect() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log(`Connection with DB established!`))
    .catch((err) => console.log(`Failed to connect: ${err}`));
}

module.exports = mongooseConnect;
