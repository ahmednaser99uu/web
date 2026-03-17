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

let user, pass;

try{
const data = JSON.parse(body);
user = data.user;
pass = data.pass;
}catch{
const params = new URLSearchParams(body);
user = params.get("user");
pass = params.get("pass");
}

const USER = "admin";
const PASS_HASH = crypto.createHash("sha256").update("1234").digest("hex");
const hash = crypto.createHash("sha256").update(pass || "").digest("hex");

if(user === USER && hash === PASS_HASH){

res.setHeader("Set-Cookie","auth=1; HttpOnly; Path=/; SameSite=Strict");

res.writeHead(302, { Location: "/dashboard" });
return res.end();

}

res.writeHead(302, { Location: "/" });
return res.end();

});

};
