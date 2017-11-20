import express from "express";
import path from "path";
import fs from "fs";
import R from "ramda";
import template from "lodash.template";
import getExamples from "./getExamples.js";


const app = express();

const buildDir = path.resolve(__dirname, "../build");


app.get("/", function(req, res){

  const examples = JSON.stringify(getExamples(buildDir));

  const appTemplate = R.compose(
    template, 
    file => fs.readFileSync(file, "utf-8"),
    dir => path.resolve(dir, "index.html")
  )(buildDir);

  res.send(appTemplate({ examples }));
});

// serve static files
app.use(express.static(buildDir));



app.listen(3030);

console.log("listening on localhost:3030");
