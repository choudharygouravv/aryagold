require("./mongoose")
let pschema = require("./schemaFile")
let multer = require("multer")
let express = require("express")
let app = express()
app.use(express.json())
app.use(express.static("public"))

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
let upload = multer({ storage: storage }).single("pimg")

app.post("/", (req, resp) => {
    upload(req, resp, (err) => {
        if(err)
        {
            resp.send(err)
        }
        else
        {
            let newData = new pschema({
                pid: req.body.pid,
                pname: req.body.pname,
                pprice: req.body.pprice,
                pdesc: String,
                pimg: "https://aryagold.onrender.com/uploads/" + req.file.filename
            })
            newData.save()
            resp.send("Data Send Succesfully")
        }
    })
})
app.get("/",async (req, resp) => {
    let data = await pschema.find()
    resp.send(data)
})
app.listen(5000)
