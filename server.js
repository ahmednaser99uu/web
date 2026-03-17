const express = require("express");
const session = require("express-session");
const crypto = require("crypto");
const path = require("path");

const app = express();

app.use(express.json());

app.use(session({
secret: "strong_secret_key_123",
resave: false,
saveUninitialized: false,
cookie: {
httpOnly: true,
secure: false,
sameSite: "strict"
}
}));

const USER = "admin";
const PASS_HASH = crypto.createHash("sha256").update("1234").digest("hex");

app.post("/api/login",(req,res)=>{

const {user,pass} = req.body;

const hash = crypto.createHash("sha256").update(pass).digest("hex");

if(user === USER && hash === PASS_HASH){

req.session.auth = true;
return res.sendStatus(200);

}

res.sendStatus(401);

});

app.get("/api/check",(req,res)=>{
if(req.session.auth){
res.sendStatus(200);
}else{
res.sendStatus(401);
}
});

app.get("/dashboard",(req,res)=>{

if(!req.session.auth){
return res.redirect("/");
}

res.sendFile(path.join(__dirname,"public","dashboard.html"));

});

app.use(express.static(path.join(__dirname,"public")));

app.listen(3000);
