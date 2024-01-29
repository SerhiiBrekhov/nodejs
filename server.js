// const express = require("express");
// const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
// const app = express();
dotenv.config();

// const routerApi = require("./app");
// app.use("/app", routerApi);
// app.use((_, res, __) => {
//   res.status(404).json({
//     status: "error",
//     code: 404,
//     message: "Use api on routes: /api/tasks",
//     data: "Not found",
//   });
// });
// app.use((err, _, res, __) => {
//   console.log(err.stack);
//   res.status(500).json({
//     status: "fail",
//     код: 500,
//     message: err.message,
//     data: "Internal Server Error",
//   });
// });
mongoose.Promise = global.Promise;
// const PORT = process.env.PORT || 3000;
// const uriDb = process.env.DB_HOST;
// const connection = mongoose.connect(
// uriDb
// {
// promiseLibrary: global.Promise,
// useNewUrlParser: true,
// useCreateIndex: true,
// useUnifiedTopology: true,
// useFindAndModify: false,
// }
// );
// connection
//   .then(() => {
//     app.listen(PORT, function () {
//       console.log(`Server running. Use our API on port: ${PORT}`);
//     });
//   })
//   .catch((err) =>
//     console.log(`Server not running. Error message: ${err.message}`)
//   );

// app.use(express.json());
// app.use(cors());

// const app = require("./app");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// dotenv.config();
// mongoose.set("strictQuery", false);
// mongoose.set("debug", true); // enable logging

// const { DB_HOST } = process.env;
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
