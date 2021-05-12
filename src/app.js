const express = require("express");
const { dirname } = require('path');
const path = require('path');
const app = express();
const hbs = require('hbs');
const port = process.env.PORT || 8000;

//database connection for login page
require("./db/conn");

const Register= require("./models/registers");

//Public Static Path
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine', 'hbs');
app.set('views', template_path);
hbs.registerPartials(partials_path);

app.use(express.static(static_path));

//Routing
app.get("/", (req, res) =>{
    res.render("index")
})

app.get("/taketest", (req, res) =>{
    res.render("taketest")
})

app.get("/createtest", (req, res) =>{
    res.render("createtest")
})

app.get("/login", (req, res) =>{
    res.render("login")
})
app.get("/register", (req, res) =>{
    res.render("register")
})

app.post("/register", async(req, res) => {
    try {
            
        const password =req.body.password;
        const cpassword =req.body.confirmpassword;

        if(password ===cpassword){
            const registerEmployee = new Register({
                username: req.body.username,
                email: req.body.email,
                password: password,
                confirmpassword: cpassword
            })
            const registered= await registerEmployee.save();
            res.status(201).render("index");
           
        }else {
            res.send("password are not matching")
        }
        /*console.log(req.body.name); 
            res.send(req.body.name);*/
    }catch (error){
        res.status(400).send(error);
    }
   
})

//LOGIN CHECK

app.post("/login", async(req, res) => {
    try{
            const email = req.body.email;
            const password =req.body.password;

            const useremail =  await Register.findOne({email: email});
            
            if(useremail.password === password){
                res.status(201).render("index");
            }else {
                res.send("invalid login details");
            }

    }catch (error) {
        res.status(400).send("invalid login details");
    }
})

app.get("/contact", (req, res) =>{
    res.render("contact")
})

/*app.get("/test1", (req, res) =>{
    res.render("test1")
})*/

app.get("/question_rrb", (req, res) =>{
    res.render("question_rrb")
})

app.get("/dashboard", (req, res) =>{
    res.render("dashboard")
})

app.get("*", (req, res) =>{
    res.render("errorpage")
})

app.listen(port, ()=>{
    console.log(`listening to the port at ${port}`)
})

