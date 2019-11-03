import R from "ramda";

import "codemirror/addon/search/searchcursor.js"; // cm.getSearchCursor, etc
import "codemirror/addon/edit/matchbrackets.js";

import { rerunCode } from "../../redux/code/codeActions.js";

export default function attachKeyMap(CodeMirror, store) {
  // console.log(CodeMirror.commands);
  // console.log(CodeMirror.keyMap);

  attachCommands(CodeMirror, store);

  const actionMap = {
    swapLineUp: {
      mac: ["Cmd-Ctrl-Up", "Alt-Up"],
      pc: "Ctrl-Up",
    },
    swapLineDown: {
      mac: ["Cmd-Ctrl-Down", "Alt-Down"],
      pc: "Ctrl-Down",
    },
    toggleComment: {
      mac: "Cmd-/",
      pc: "Ctrl-/",
    },
    selectNextOccurrence: {
      mac: "Cmd-D",
      pc: "Ctrl-D",
    },
    duplicateLinesDown: {
      mac: ["Shift-Cmd-D", "Shift-Alt-Down"],
      pc: "Shift-Ctrl-D",
    },
    duplicateLinesUp: {
      mac: "Shift-Alt-Up",
    },
    deleteLineLeftAndUp: {
      mac: "Cmd-Backspace",
    },
    tabKey: "Tab",
    goToBracket: "Ctrl-M",
    selectBetweenBrackets: "Shift-Ctrl-M",
    splitSelectionByLine: {
      mac: "Shift-Cmd-L",
      pc: "Shift-Ctrl-L",
    },
    rerunCode: {
      mac: "Cmd-Enter",
      pc: "Ctrl-Enter",
    },
  };

  const macOrPc =
    CodeMirror.keyMap.default == CodeMirror.keyMap.macDefault ? "mac" : "pc";

  // convert my better format to the format that CodeMirror uses
  CodeMirror.keyMap.mike = R.compose(
    R.merge({ fallthrough: `${macOrPc}Default` }),
    R.reduce((keyMap, item) => {
      const [cmd, keys] = item;

      if (R.type(keys) === "Array") {
        // add an entry for each in the key array
        return R.merge(
          keyMap,
          R.compose(
            R.fromPairs,
            R.zip(R.__, R.repeat(cmd, keys.length)),
            R.reject(R.isNil),
          )(keys),
        );
      }
      else {
        return R.isNil(keys) ? keyMap : R.assoc(keys, cmd, keyMap);
      }
    }, {}),
    R.toPairs,
    R.map(R.when(R.is(Object), R.prop(macOrPc))),
  )(actionMap);
}

// most of these are based on functions from the sublime keyMap
function attachCommands(CodeMirror, store) {
  const cmds = CodeMirror.commands;
  const Pos = CodeMirror.Pos;

  cmds.rerunCode = function(cm) {
    store.dispatch(rerunCode());
  };

  cmds.toggleComment = function(cm) {
    cm.toggleComment({ indent: true, padding: " " });
  };

  // delWrappedLineLeft is the macDefault for Backspace, but itdoesn't do anything
  // if the curser is at the very front of the line
  // deleteLineLeftAndUp will delete up to the next line if the cursor is at 0
  cmds.deleteLineLeftAndUp = function(cm) {
    cm.operation(function() {
      cm.listSelections().forEach(range => {
        if (range.anchor.ch === 0 && range.head.ch === 0) {
          cm.execCommand("delCharBefore"); // reguar backspace
        }
        else {
          cm.execCommand("delWrappedLineLeft"); // delete to beginning of line
        }
      });
    });
  };

  // https://www.snip2code.com/Snippet/148371/CodeMirror--indent-with-tab-or-spaces
  cmds.tabKey = function(cm) {
    if (cm.somethingSelected()) {
      var sel = cm.getSelection("\n");
      // Indent only if there are multiple lines selected, or if the selection spans a full line
      if (
        sel.length > 0 &&
        (sel.indexOf("\n") > -1 ||
          sel.length === cm.getLine(cm.getCursor().line).length)
      ) {
        cm.indentSelection("add");
        return;
      }
    }
    if (cm.options.indentWithTabs) cm.execCommand("insertTab");
    else cm.execCommand("insertSoftTab");
  };

  // selectedLines : Object -> Array
  // selectedLines : Code Mirror Range -> Array of line numbers
  const selectedLineNumbers = R.compose(
    R.apply(R.range),
    R.adjust(R.inc, 1), // increment the last, because range is exclusive
    R.sortBy(R.identity), // could be [11, 10] if the ancher is after the head
    R.map(R.prop("line")),
    R.values,
  );

  cmds.duplicateLinesDown = function(cm) {
    cm.operation(function() {
      cm.listSelections().forEach(range => {
        const selectedLines = R.compose(
          R.join("\n"),
          R.map(n => cm.getLine(n)), // not sure why point free doesn't work
          selectedLineNumbers,
        )(range);

        cm.replaceRange(
          selectedLines + "\n",
          Pos(Math.min(range.head.line, range.anchor.line), 0),
        );
      });
      cm.scrollIntoView();
    });
  };

  cmds.duplicateLinesUp = function(cm) {
    cm.operation(function() {
      cm.listSelections().forEach(range => {
        const selectedLines = R.compose(
          R.join("\n"),
          R.map(n => cm.getLine(n)), // not sure why point free doesn't work
          selectedLineNumbers,
        )(range);

        cm.replaceRange(
          selectedLines + "\n",
          Pos(Math.max(range.head.line, range.anchor.line) + 1, 0),
        );
      });
      cm.scrollIntoView();
    });
  };

  // from sublime.js
  cmds.swapLineUp = function(cm) {
    if (cm.isReadOnly()) return CodeMirror.Pass;
    var ranges = cm.listSelections(),
      linesToMove = [],
      at = cm.firstLine() - 1,
      newSels = [];
    for (var i = 0; i < ranges.length; i++) {
      var range = ranges[i],
        from = range.from().line - 1,
        to = range.to().line;
      newSels.push({
        anchor: Pos(range.anchor.line - 1, range.anchor.ch),
        head: Pos(range.head.line - 1, range.head.ch),
      });
      if (range.to().ch == 0 && !range.empty()) --to;
      if (from > at) linesToMove.push(from, to);
      else if (linesToMove.length) linesToMove[linesToMove.length - 1] = to;
      at = to;
    }
    cm.operation(function() {
      for (var i = 0; i < linesToMove.length; i += 2) {
        var from = linesToMove[i],
          to = linesToMove[i + 1];
        var line = cm.getLine(from);
        cm.replaceRange("", Pos(from, 0), Pos(from + 1, 0), "+swapLine");
        if (to > cm.lastLine())
          cm.replaceRange("\n" + line, Pos(cm.lastLine()), null, "+swapLine");
        else cm.replaceRange(line + "\n", Pos(to, 0), null, "+swapLine");
      }
      cm.setSelections(newSels);
      cm.scrollIntoView();
    });
  };

  // from sublime.js
  cmds.swapLineDown = function(cm) {
    if (cm.isReadOnly()) return CodeMirror.Pass;
    var ranges = cm.listSelections(),
      linesToMove = [],
      at = cm.lastLine() + 1;
    for (var i = ranges.length - 1; i >= 0; i--) {
      var range = ranges[i],
        from = range.to().line + 1,
        to = range.from().line;
      if (range.to().ch == 0 && !range.empty()) from--;
      if (from < at) linesToMove.push(from, to);
      else if (linesToMove.length) linesToMove[linesToMove.length - 1] = to;
      at = to;
    }
    cm.operation(function() {
      for (var i = linesToMove.length - 2; i >= 0; i -= 2) {
        var from = linesToMove[i],
          to = linesToMove[i + 1];
        var line = cm.getLine(from);
        if (from == cm.lastLine())
          cm.replaceRange("", Pos(from - 1), Pos(from), "+swapLine");
        else cm.replaceRange("", Pos(from, 0), Pos(from + 1, 0), "+swapLine");
        cm.replaceRange(line + "\n", Pos(to, 0), null, "+swapLine");
      }
      cm.scrollIntoView();
    });
  };

  // cmds.insertLineAfter = function(cm) { return insertLine(cm, false); };

  // cmds.insertLineBefore = function(cm) { return insertLine(cm, true); };

  // from sublime.js
  function wordAt(cm, pos) {
    var start = pos.ch,
      end = start,
      line = cm.getLine(pos.line);
    while (start && CodeMirror.isWordChar(line.charAt(start - 1))) --start;
    while (end < line.length && CodeMirror.isWordChar(line.charAt(end))) ++end;
    return {
      from: Pos(pos.line, start),
      to: Pos(pos.line, end),
      word: line.slice(start, end),
    };
  }

  // from sublime.js
  function isSelectedRange(ranges, from, to) {
    for (var i = 0; i < ranges.length; i++)
      if (ranges[i].from() == from && ranges[i].to() == to) return true;
    return false;
  }

  // from sublime.js
  cmds.selectNextOccurrence = function(cm) {
    var from = cm.getCursor("from"),
      to = cm.getCursor("to");
    var fullWord = cm.state.sublimeFindFullWord == cm.doc.sel;
    if (CodeMirror.cmpPos(from, to) == 0) {
      var word = wordAt(cm, from);
      if (!word.word) return;
      cm.setSelection(word.from, word.to);
      fullWord = true;
    }
    else {
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
    if (fullWord) cm.state.sublimeFindFullWord = cm.doc.sel;
  };

  // from sublime.js
  cmds.goToBracket = function(cm) {
    cm.extendSelectionsBy(function(range) {
      var next = cm.scanForBracket(range.head, 1);
      if (next && CodeMirror.cmpPos(next.pos, range.head) != 0) return next.pos;
      var prev = cm.scanForBracket(range.head, -1);
      return (prev && Pos(prev.pos.line, prev.pos.ch + 1)) || range.head;
    });
  };

  // from sublime.js
  function selectBetweenBrackets(cm) {
    var mirror = "(){}[]";
    var ranges = cm.listSelections(),
      newRanges = [];
    for (var i = 0; i < ranges.length; i++) {
      var range = ranges[i],
        pos = range.head,
        opening = cm.scanForBracket(pos, -1);
      if (!opening) return false;
      for (;;) {
        var closing = cm.scanForBracket(pos, 1);
        if (!closing) return false;
        if (closing.ch == mirror.charAt(mirror.indexOf(opening.ch) + 1)) {
          var startPos = Pos(opening.pos.line, opening.pos.ch + 1);
          if (
            CodeMirror.cmpPos(startPos, range.from()) == 0 &&
            CodeMirror.cmpPos(closing.pos, range.to()) == 0
          ) {
            opening = cm.scanForBracket(opening.pos, -1);
            if (!opening) return false;
          }
          else {
            newRanges.push({ anchor: startPos, head: closing.pos });
            break;
          }
        }
        pos = Pos(closing.pos.line, closing.pos.ch + 1);
      }
    }
    cm.setSelections(newRanges);
    return true;
  }

  cmds.selectBetweenBrackets = function(cm) {
    if (!selectBetweenBrackets(cm)) return CodeMirror.Pass;
  };

  // from sublime.js
  cmds.splitSelectionByLine = function(cm) {
    var ranges = cm.listSelections(),
      lineRanges = [];
    for (var i = 0; i < ranges.length; i++) {
      var from = ranges[i].from(),
        to = ranges[i].to();
      for (var line = from.line; line <= to.line; ++line)
        if (!(to.line > from.line && line == to.line && to.ch == 0))
          lineRanges.push({
            anchor: line == from.line ? from : Pos(line, 0),
            head: line == to.line ? to : Pos(line),
          });
    }
    cm.setSelections(lineRanges, 0);
  };
}
