import path from "path";
import fs from "fs";
import R from "ramda";


export default function getExamples(dir){

  // remove number prefix and extension
  // eg. 01 - Map.js -> Map
  // eg. 01 - Core functional tools -> Core functional tools
  const toTitle = R.compose(
    R.replace(/\...$/, ""),
    R.replace(/^\d\d - /, "")
  );

  // getJsFiles :: String → { displayName, slug, code }
  const getJsFile = filepath => {
    const code = fs.readFileSync(filepath, "utf8");

    // remove extension and replace : with /
    const displayName = R.compose(
      toTitle,
      path.basename // get just the filename with extension
    )(filepath);

    // remove spaces, / and replace with -, lowercase
    // make sure we can put this in the URL
    const slug = R.compose(
      encodeURIComponent,
      R.toLower,
      R.replace(/-+/g, "-"), // collapse repeats
      R.replace(/[\s\/]/g, "-")
    )(displayName);

    return { displayName, slug, code };
  };

  // Example :: { displayName, slug, code }
  // getJsFiles :: String → [Example]
  const getJsFiles = dir => R.compose(
    R.map(getJsFile),
    R.filter(dirOrFilePath =>
      path.extname(dirOrFilePath) === ".js"
    ),
    R.map(dirOrFile => `${dir}/${dirOrFile}`),
    fs.readdirSync
  )(dir);

  // String → [{ title, examples }, ...]
  const getExampleSections = dir => R.compose(
    R.reject(R.isNil),
    R.map(dirOrFile => {
      const dirOrFilePath = `${dir}/${dirOrFile}`;

      if (fs.statSync(dirOrFilePath).isDirectory()) {
        return {
          title: toTitle(dirOrFile),
          examples: getJsFiles(dirOrFilePath)
        };
      }
      else {
        return undefined;
      }

    }),
    fs.readdirSync
  )(dir);

  const json = getExampleSections(dir);

  return json;
}
