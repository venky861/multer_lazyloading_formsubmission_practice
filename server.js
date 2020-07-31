const express = require("express")
const app = express()
const path = require("path")
const connectionDB = require("./config/db")

require("./models/image")
connectionDB()

const PORT = process.env.PORT || 6000

console.log(path.join("uploads", "images"))

app.use("/dbimg", require("./api/routes/pickimgfromdb"))
app.use("/uploads/images", express.static(path.join("uploads", "images")))

app.use("/", require("./api/routes/imgupload"))

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
