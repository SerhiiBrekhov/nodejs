const mongoose = require("mongoose");

const app = require("./app");

mongoose.Promise = global.Promise;

async function main() {
  try {
    await mongoose.connect(process.env.DB_HOST);
    console.log("connected to db");

    app.listen(3001, () => {
      console.log(
        "Database connection successful. Server is listening on port 3001"
      );
    });
  } catch (error) {
    console.error("main failed:", error.message);
    process.exit(1);
  }
}
main();
