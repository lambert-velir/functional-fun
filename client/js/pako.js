import pako from "pako";

// convert javascrit object to a query string
function serialize(obj){

  let queryString = Object.keys(obj)
    .reduce((pairs, key) => {
      if (obj.hasOwnProperty(key)) {
        return pairs.concat(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
      }
    }, [])
    .join("&");

  return queryString;
}

// convert a query string into a javascript object
function deserialize(qs){

  let pairs = qs.split("&");

  return pairs.reduce((obj, pair) => {
    let [key, value] = pair.split("=");
    obj[key] = value;
    return obj;
  }, {});
}

// take a chunk of text (like all the code in the es6CodeMirror)
// and return a compressed, encrypted version of it that can go in the hash
// https://github.com/jbt/markdown-editor
// using the DEFLATE algorithm
function encryptCode(text){

  return btoa( // base64 so url-safe
    pako.deflate( // gzip
      unescape(encodeURIComponent( // convert to utf8
        text
      )),
      { to: "string" }
    )
  );
}

// given the compressed, encryped string from the hash, inflate it back to real
// code that can go in the es6CodeMirror
function decryptCode(hash){

  return decodeURIComponent(escape(
    pako.inflate(
      atob(
        hash
      ),
      { to: "string" }
    )
  ));
}


export default {
  serialize,
  deserialize,
  encryptCode,
  decryptCode
};
