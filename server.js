const mongoose=require('mongoose')
const express=require('express')
const app=express()
const port=3300
app.use(express.static(__dirname))
app.use("/images",express.static("images"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const userLogin=mongoose.model("user",new mongoose.Schema({
 name: String,
 email: String,
 password: String,
},
{
 collection:"userdetails"
}
))
mongoose.connect('mongodb://127.0.0.1:27017/petcareproject')
.then(()=>console.log("Connection successfull"))
.catch((err)=>{console.log("Error in connection" + err.stack)
process.exit(1)
})
app.post("/registration",async (req,res)=>{
 const {name,email,password}=req.body
 try {
 const existinguser=await userLogin.findOne({email});
 if(!existinguser){
 await userLogin.create({name,email,password});
 res.redirect("/login");
 } else{
 return res.send("User already exist")
 }
 
 } catch (error) {
 console.error("Failed to register",error)
 res.status(500).json({message: "Internal Server Error"})
 }
})
app.post("/login",async (req,res)=>{
 const {email,password}=req.body
 
 try {
 const user=await userLogin.findOne({email,password})
 if(!user){
 return res.send("Invalid User name or password")
 }
 else{
 res.redirect("/access")
 }
 } catch (error) {
 console.error("Failed to Login",error)
 res.status(500).json({message: "Internal Server Error"})
 }
})
app.get("/",(req,res)=>{
 res.sendFile(__dirname+"/home.html")
})
app.get("/access",(req,res)=>{
    res.sendFile(__dirname+"/access.html")
   })
app.get("/about",(req,res)=>{
 res.sendFile(__dirname+"/about.html")
})
app.get("/contact",(req,res)=>{
 res.sendFile(__dirname+"/contact.html")
})
app.get("/products",(req,res)=>{
 res.sendFile(__dirname+"/products.html")
})
app.get("/login",(req,res)=>{
 res.sendFile(__dirname+"/login.html")
})
app.get("/servies",(req,res)=>{
 res.sendFile(__dirname+"/services.html")
})
app.get("/registration",(req,res)=>{
 res.sendFile(__dirname+"/registration.html")
})
app.get("/booking_page",(req,res)=>{
 res.sendFile(__dirname+"/booking_page.html")
})
app.listen(port,()=>console.log(`Server is running in http://localhost:${port}`))