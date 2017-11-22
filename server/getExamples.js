import path from "path";
import fs from "fs";
import R from "ramda";


export default function getExamples(dir){

  const files = R.compose(
    R.filter(filename => path.extname(filename) === ".js"),
    fs.readdirSync
  )(dir);

  const json = R.map(filename => {
    const code = fs.readFileSync(`${dir}/${filename}`, "utf8");

    // remove extension and replace : with /
    const displayName = R.compose(
      R.replace(/:/, "/"),
      f => path.basename(f, path.extname(f)) // remove extension
    )(filename);

    // remove spaces, / and replace with -, lowercase
    // make sure we can put this in the URL
    const slug = R.compose(
      encodeURIComponent,
      R.toLower,
      R.replace(/-+/g, "-"), // collapse repeats
      R.replace(/[\s\/]/g, "-")
    )(displayName);

    return { displayName, slug, code };

  })(files);

  return json;
}
