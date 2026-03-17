module.exports = (req, res) => {

const cookie = req.headers.cookie || "";

if(cookie.includes("auth=1")){
return res.status(200).end();
}

return res.status(401).end();

};
