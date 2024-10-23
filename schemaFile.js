let mongoose=require("mongoose")
let pschema=new mongoose.Schema({
    pid:Number,
    pname:String,
    pprice:Number,
    pdesc:String,
    pimg:String
})

module.exports=mongoose.model("product",pschema)