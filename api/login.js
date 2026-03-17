const crypto = require("crypto");

module.exports = (req, res) => {

if(req.method !== "POST"){
return res.status(405).end();
}

let body = "";

req.on("data", chunk => {
body += chunk;
});

req.on("end", () => {

try{

const {user, pass} = JSON.parse(body);

const USER = "admin";
const PASS_HASH = crypto.createHash("sha256").update("1234").digest("hex");
const hash = crypto.createHash("sha256").update(pass).digest("hex");

if(user === USER && hash === PASS_HASH){

res.setHeader("Set-Cookie","auth=1; HttpOnly; Path=/; SameSite=Strict");
return res.status(200).end();

}

return res.status(401).end();

}catch{
return res.status(400).end();
}

});

};
