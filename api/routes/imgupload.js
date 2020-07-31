const multer = require("multer")
const express = require("express")
const router = express.Router()
const path = require("path")
const fs = require("fs")
const mongoose = require("mongoose")
const imgdb = mongoose.model("imgesdb")

const storage = multer.diskStorage({
  destination: `uploads/images`,
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname + "_" + Date.now() + path.extname(file.originalname)
    )
  },
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },

  fileFilter: function (req, file, cb) {
    checkfiletype(file, cb)
  },
})

function checkfiletype(file, cb) {
  const fileType = /jpeg|jpg|png|gif|mp4/
  const extname = fileType.test(path.extname(file.originalname).toLowerCase())
  const mimeType = fileType.test(file.mimetype)
  if (extname && mimeType) {
    return cb(null, true)
  } else {
    cb("Error:Extension of images only")
  }
}

router.post("/reactimg", upload.single("myImage"), async (req, res, next) => {
  console.log("req.file", req.file) // undefined

  if (req.file === undefined) {
    return res.status(500).send("Error in uploading pic")
  }

  data = {
    fullPath: res.req.file.path,
    fileName: req.file.filename,
  }

  await new imgdb({
    image: req.file.path,
  }).save()

  res.send(data)
  // console.log(path.join(__dirname, "..", "..", req.file.path))

  //   fs.unlink(path.join(__dirname, "..", "..", req.file.path), (err) =>
  //     console.log(err)
  //   )
  // console.log(res.req.file.path)
})

module.exports = router
