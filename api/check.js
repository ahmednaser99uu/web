module.exports = (req, res) => {

const c = req.headers.cookie || "";

if(c.includes("auth=1")) return res.status(200).end();

return res.status(401).end();

};
