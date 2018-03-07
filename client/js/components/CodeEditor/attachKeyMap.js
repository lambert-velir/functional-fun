import R from "ramda";

import CodeMirror from "codemirror";
attachKeyMap(CodeMirror);

// console.log(CodeMirror.keyMap);

function attachKeyMap(CodeMirror){

  // TODO Cmd-Backspace should delete up a line

  attachCommands(CodeMirror);

  const actionMap = {
    "swapLineUp": {
      mac: ["Cmd-Ctrl-Up", "Alt-Up"],
      pc: "Shift-Ctrl-Up"
    },
    "swapLineDown": {
      mac: ["Cmd-Ctrl-Down", "Alt-Down"],
      pc: "Shift-Ctrl-Down"
    },
    "toggleComment": {
      mac: "Cmd-/",
      pc: "Ctrl-/"
    },
    "selectNextOccurrence": {
      mac: "Cmd-D",
      pc: "Ctrl-D"
    },
    // TODO duplicate selection that spans multiple lines!
    "duplicateLineDown": {
      mac: ["Shift-Cmd-D", "Shift-Alt-Down"],
      pc: "Shift-Ctrl-D"
    },
    "duplicateLineUp": {
      mac: "Shift-Alt-Up"
    },
    "tabKey" : "Tab"
  };



  const macOrPc = CodeMirror.keyMap.default == CodeMirror.keyMap.macDefault ? "mac" : "pc";

  CodeMirror.keyMap.mike = R.compose(
    R.merge({ "fallthrough": "macDefault" }),
    R.reduce((keyMap, item) => {
      const [ cmd, keys ] = item;

      if (R.type(keys) === "Array"){
        // add an entry for each in the key array
        return R.merge(keyMap, R.compose(
          R.fromPairs,
          R.zip(R.__, R.repeat(cmd, keys.length)),
          R.reject(R.isNil)
        )(keys));
      }
      else {
        return R.isNil(keys) ? keyMap : R.assoc(keys, cmd, keyMap);
      }
    }, {}),
    R.toPairs,
    R.map(R.when(
      R.is(Object),
      R.prop(macOrPc)
    ))
  )(actionMap);

}


// most of these are from the sublime keyMap
function attachCommands(CodeMirror){

  const cmds = CodeMirror.commands;
  const Pos = CodeMirror.Pos;

  cmds.toggleComment = function(cm) {
    cm.toggleComment({ indent: true, padding: " " });
  };

  // https://www.snip2code.com/Snippet/148371/CodeMirror--indent-with-tab-or-spaces
  cmds.tabKey = function (cm) {
    if (cm.somethingSelected()) {
      var sel = cm.getSelection("\n");
      // Indent only if there are multiple lines selected, or if the selection spans a full line
      if (sel.length > 0 && (sel.indexOf("\n") > -1 || sel.length === cm.getLine(cm.getCursor().line).length)) {
        cm.indentSelection("add");
        return;
      }
    }
    if (cm.options.indentWithTabs)
      cm.execCommand("insertTab");
    else
      cm.execCommand("insertSoftTab");
  };

  cmds.duplicateLineDown = function(cm) {
    cm.operation(function() {
      var rangeCount = cm.listSelections().length;
      for (var i = 0; i < rangeCount; i++) {
        var range = cm.listSelections()[i];
        cm.replaceRange(cm.getLine(range.head.line) + "\n", Pos(range.head.line, 0));
      }
      cm.scrollIntoView();
    });
  };

  cmds.duplicateLineUp = function(cm) {
    cm.operation(function() {
      var rangeCount = cm.listSelections().length;
      for (var i = 0; i < rangeCount; i++) {
        var range = cm.listSelections()[i];
        cm.replaceRange(cm.getLine(range.head.line) + "\n", Pos(range.head.line+1, 0));
      }
      cm.scrollIntoView();
    });
  };

  cmds.swapLineUp = function(cm) {
    if (cm.isReadOnly()) return CodeMirror.Pass;
    var ranges = cm.listSelections(), linesToMove = [], at = cm.firstLine() - 1, newSels = [];
    for (var i = 0; i < ranges.length; i++) {
      var range = ranges[i], from = range.from().line - 1, to = range.to().line;
      newSels.push({
        anchor: Pos(range.anchor.line - 1, range.anchor.ch),
        head: Pos(range.head.line - 1, range.head.ch)
      });
      if (range.to().ch == 0 && !range.empty()) --to;
      if (from > at) linesToMove.push(from, to);
      else if (linesToMove.length) linesToMove[linesToMove.length - 1] = to;
      at = to;
    }
    cm.operation(function() {
      for (var i = 0; i < linesToMove.length; i += 2) {
        var from = linesToMove[i], to = linesToMove[i + 1];
        var line = cm.getLine(from);
        cm.replaceRange("", Pos(from, 0), Pos(from + 1, 0), "+swapLine");
        if (to > cm.lastLine())
          cm.replaceRange("\n" + line, Pos(cm.lastLine()), null, "+swapLine");
        else
          cm.replaceRange(line + "\n", Pos(to, 0), null, "+swapLine");
      }
      cm.setSelections(newSels);
      cm.scrollIntoView();
    });
  };

  cmds.swapLineDown = function(cm) {
    if (cm.isReadOnly()) return CodeMirror.Pass;
    var ranges = cm.listSelections(), linesToMove = [], at = cm.lastLine() + 1;
    for (var i = ranges.length - 1; i >= 0; i--) {
      var range = ranges[i], from = range.to().line + 1, to = range.from().line;
      if (range.to().ch == 0 && !range.empty()) from--;
      if (from < at) linesToMove.push(from, to);
      else if (linesToMove.length) linesToMove[linesToMove.length - 1] = to;
      at = to;
    }
    cm.operation(function() {
      for (var i = linesToMove.length - 2; i >= 0; i -= 2) {
        var from = linesToMove[i], to = linesToMove[i + 1];
        var line = cm.getLine(from);
        if (from == cm.lastLine())
          cm.replaceRange("", Pos(from - 1), Pos(from), "+swapLine");
        else
          cm.replaceRange("", Pos(from, 0), Pos(from + 1, 0), "+swapLine");
        cm.replaceRange(line + "\n", Pos(to, 0), null, "+swapLine");
      }
      cm.scrollIntoView();
    });
  };

  // cmds.insertLineAfter = function(cm) { return insertLine(cm, false); };

  // cmds.insertLineBefore = function(cm) { return insertLine(cm, true); };

  function wordAt(cm, pos) {
    var start = pos.ch, end = start, line = cm.getLine(pos.line);
    while (start && CodeMirror.isWordChar(line.charAt(start - 1))) --start;
    while (end < line.length && CodeMirror.isWordChar(line.charAt(end))) ++end;
    return {from: Pos(pos.line, start), to: Pos(pos.line, end), word: line.slice(start, end)};
  }

  function isSelectedRange(ranges, from, to) {
    for (var i = 0; i < ranges.length; i++)
      if (ranges[i].from() == from && ranges[i].to() == to) return true;
    return false;
  }

  cmds.selectNextOccurrence = function(cm) {
    var from = cm.getCursor("from"), to = cm.getCursor("to");
    var fullWord = cm.state.sublimeFindFullWord == cm.doc.sel;
    if (CodeMirror.cmpPos(from, to) == 0) {
      var word = wordAt(cm, from);
      if (!word.word) return;
      cm.setSelection(word.from, word.to);
      fullWord = true;
    } else {
      var text = cm.getRange(from, to);
      var query = fullWord ? new RegExp("\\b" + text + "\\b") : text;
      var cur = cm.getSearchCursor(query, to);
      var found = cur.findNext();
      if (!found) {
        cur = cm.getSearchCursor(query, Pos(cm.firstLine(), 0));
        found = cur.findNext();
      }
      if (!found || isSelectedRange(cm.listSelections(), cur.from(), cur.to()))
        return CodeMirror.Pass;
      cm.addSelection(cur.from(), cur.to());
    }
    if (fullWord)
      cm.state.sublimeFindFullWord = cm.doc.sel;
  };
}
