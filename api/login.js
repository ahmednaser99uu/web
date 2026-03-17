const c = require("crypto");

module.exports = (req, res) => {

if(req.method !== "POST") return res.status(405).end();

let b = "";

req.on("data", d => b += d);

req.on("end", () => {

let u, p;

try{
let j = JSON.parse(b);
u = j.user;
p = j.pass;
}catch{
let q = new URLSearchParams(b);
u = q.get("user");
p = q.get("pass");
}

const U = "admin";
const H = c.createHash("sha256").update("1234").digest("hex");
const h = c.createHash("sha256").update(p || "").digest("hex");

if(u === U && h === H){
res.setHeader("Set-Cookie","auth=1; Path=/; HttpOnly; SameSite=Strict");
res.writeHead(302,{Location:"/dashboard"});
return res.end();
}

res.writeHead(302,{Location:"/"});
res.end();

});

};
