const mongoose = require("mongoose")
const img = new mongoose.Schema({
  image: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
})

mongoose.model("imgesdb", img)
