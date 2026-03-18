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

    const isApi = req.headers["content-type"]?.includes("application/json");

    if(u === U && h === H){

      res.setHeader("Set-Cookie","auth=1; Path=/; HttpOnly; SameSite=Strict");

      // ✅ لو API
      if(isApi){
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({
          success: true,
          message: "Login successful"
        }));
      }

      // ✅ لو Browser
      res.writeHead(302,{ Location: "/api/dashboard?msg=success" });
      return res.end();
    }

    // ❌ فشل

    if(isApi){
      res.writeHead(401, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({
        success: false,
        message: "Invalid username or password"
      }));
    }

    res.writeHead(302,{ Location: "/?msg=error" });
    res.end();

  });

};
