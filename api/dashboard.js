const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {

const c = req.headers.cookie || "";

if(!c.includes("auth=1")){
res.writeHead(302,{Location:"/"});
return res.end();
}

const p = path.join(process.cwd(),"dashboard.html");
const h = fs.readFileSync(p);

res.setHeader("Content-Type","text/html");
res.status(200).end(h);

};
