import pako from "pako";
import Result from "folktale/result";

// take a chunk of text (like all the code that the user entered)
// and return a compressed, encrypted version of it that can go in the hash
// https://github.com/jbt/markdown-editor
// using the DEFLATE algorithm
// encryptCode : String -> Result String
function encryptCode(text) {
  try {
    return Result.Ok(
      // base64 so url-safe
      btoa(
        // gzip
        pako.deflate(
          unescape(
            // convert to utf8
            encodeURIComponent(text),
          ),
          { to: "string" },
        ),
      ),
    );
  }
  catch (e) {
    return Result.Error(e);
  }
}

// given the compressed, encryped string from the hash, inflate it back to real
// code that can go in the es6CodeMirror
// decryptCode : String -> Result String
function decryptCode(hash) {
  try {
    return Result.Ok(
      decodeURIComponent(escape(pako.inflate(atob(hash), { to: "string" }))),
    );
  }
  catch (e) {
    return Result.Error(e);
  }
}

export default {
  encryptCode,
  decryptCode,
};
