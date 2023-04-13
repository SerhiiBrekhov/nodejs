const app = require('./app')
// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.set("strictQuery", false);
mongoose.set("debug", true); // enable logging

// const { PORT } = process.env.PORT || 3001;
const { HOST_URI } = process.env;

// console.log(HOST_URI);

async function main() {
  try {
    await mongoose.connect(HOST_URI);
    // await mongoose.connect(process.env.HOST_URI);
    console.log("connected to db");

    app.listen(3001, () => {
      console.log("Database connection successful. Server is listening on port 3001");
    });
  } catch (error) {
    console.error("main failed:", error.message);
    process.exit(1);
  }
}
main();