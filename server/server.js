import express from "express";
import path from "path";

const app = express();

const buildDir = path.resolve(__dirname, "../build");

app.set("views", "./views");

app.get("/", function(req, res){

  // const examples = getExamples(buildDir);

  res.sendFile(path.resolve(buildDir, "index.html"));
});

// serve static files
app.use(express.static(buildDir));



app.listen(3030);

console.log("listening on localhost:3030");
