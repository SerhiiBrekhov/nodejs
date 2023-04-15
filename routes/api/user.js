const express = require("express");
const { tryCatchWrapper } = require("../../models/helpers/index.js");
const { createMovie, getMovies, me } = require("../../controllers/user.controllers");
const { auth } = require("../../middlewares/index");
const userRouter = express.Router();

userRouter.post("/movies", tryCatchWrapper(auth), tryCatchWrapper(createMovie));
userRouter.get("/movies", tryCatchWrapper(auth), tryCatchWrapper(getMovies));
userRouter.get("/me", tryCatchWrapper(auth), tryCatchWrapper(me));

module.exports = {
  userRouter,
};