const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const imgdb = mongoose.model("imgesdb")

router.get("/", async (req, res) => {
  const result = await imgdb.findOne()
  res.send(result.image)
})

module.exports = router
