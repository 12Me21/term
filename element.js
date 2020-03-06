// styles:
// - block: boolean - whether to display element as block
// - color: color - text color
// - bgcolor: color - background color
// - scrollcolor: color - color of scrollbar
// - scrollbgcolor: color - color of scrollbar background
// - bold: boolean - bold
// - underline: boolean - underlined
// - blockbgcolor: color

class Stylesheet {
	constructor(styles) {
		this.styles = styles;
	}

	lookup(element, stack) {
		var styles = this.styles[element.tag];
		if (!styles)
			styles = {};
		if (typeof styles == 'function')
			styles = styles(element);
		// compute fallback styles
		var newStyles = {};
		for (var style in styles)
			newStyles[style] = styles[style];
		if (stack)
			for (var i=stack.length-1; i>=0; i--)
				for (var style in stack[i])
					if (newStyles[style] === undefined)
						newStyles[style] = stack[i][style];
		return newStyles;
	}
}

module.exports = Stylesheet;

// when called for the first time, stack should contain
// the default styles (from the window)
function* processElement(element, stylesheet, stack) {
	if (typeof element == 'string')
		yield [element, stylesheet.lookup({}, stack), null];
	else
		var styles = stylesheet.lookup(element, stack);
	
	if (typeof element.contents == 'string') {
		yield [element.contents, styles, null];
	} else if (element.contents instanceof Array) {
		if (element.block) {
			yield [true, styles, element];
		}
		stack.push(styles);
		for (var x of element.contents)
			yield* processElement(x, stylesheet, stack);
		stack.pop();
	}
}

var styles = new Stylesheet({
	main: {
		bgcolor: 0xFFFFFF,
		color: 0,
	},
	bold: {
		bold: true,
		bgcolor: 0x108020,
	},
	username: function(element) {
		return {
			color: element.user.uid % 256 * 99999,
		};
	},
	message: {
		margin: 7,
		bgcolor: 0x77FF99,
	}
});

var element = {tag: "main", contents:[
	{tag: "sender", block:true, contents: [
		{tag: "username", user: {uid:286}, contents: "Multi-Color Graphics"},
		":",
	], right: {
		tag: "time", contents: "10:30 pm"
	}},
	{tag: "message", block: true, contents: [
		"the ",
		{tag: "bold", contents: "sand"},
		" can be eaten -ツツツツツツツツツツツツツツツxxxp̼̐q"
	]},
]}

// todo: make element parser an iterable(?)

// idea: all text must be inside a block
// that way, there only needs to be 3? types of callback values
// - block start
// - normal text
// - end

var charWidth = require('./unicode.js').charWidth;

add(19)//:(
function add(n){
	console.log(".".repeat(n));
	console.log(wrap(processElement(element, styles, []), n).join('\n'));
	setTimeout(()=>{add(n-1)},1000);
}

function wrap(iter, width, noCombining) {
	var blockStyle = {}; //line bg color, margin
	// need a way to specify default blockstyle OR get it from somewhere
	// maybe have the iterator start a block immediately?
	var margin = ""
	var currStyle = {};
	var right = ""; //todo: style this
	
	function* next() {
		for (var [str, style, elem] of iter) {
			if (str === true) {
				blockStyle = style;
				right = elem.right;
				if (right) {
					right=right.contents
				} else {
					right = ""
				}
				
				margin = Array(blockStyle.margin || 0).fill(" ");
				yield [true, {}]; // yeah what is that style hhhh
			} else {
				for (var chr of str) {
					yield [chr, style];
				}
			}
		}
	}
	// text wrapper written by 12Me21 from ~12/28/2019
	var lineBuffer = [];
	var lineWidth = 0;
	var breakSpot = -1;
	var breakWidth = 0;
	var lines = [];
	var blockFirst = true; //is first line of block

	function endLine() {
		
	}
	
	for (var [chr, style] of next()) {
		var preWidth = lineWidth;
		if (chr == '\n') {
			breakSpot = lineBuffer.length + 1;
			breakWidth = lineWidth;
		} else if (chr === true) { //block start
			if (lineBuffer.length) { //end prev block
				pushLine(lineBuffer);
				breakSpot = -1;
				breakWidth = 0;
				lineWidth = 0;
				blockFirst = true;
				lineBuffer = margin.concat(); //todo: this should be handled elsewhere !!!!!
			}
		} else {
			lineWidth += charWidth(chr);
			lineBuffer.push(chr);
		}
		
		if (chr == ' ') {
			breakSpot = lineBuffer.length;
			breakWidth = lineWidth;
		}
		if (chr == '\n' || lineWidth > width - margin.length - right.length) {
			
			if (breakSpot < 0) {
				breakSpot = lineBuffer.length - 1;
				breakWidth = preWidth;
			}
			if (right)
				right = " ".repeat((width - breakWidth - right.length)) + right
			// if chr was \n, breakspot will be the end of the linebuffer
			pushLine(lineBuffer.slice(0, breakSpot).concat(right));
			lineBuffer = margin.concat(lineBuffer.slice(breakSpot));
			breakSpot = -1;
			lineWidth = lineWidth - breakWidth;
			breakWidth = 0;
			right = ""
		}
	}
	if (lineBuffer.length) {
		pushLine(lineBuffer.concat(right));
	}
	
	function pushLine(line) {
		lines.push(line.join(""));
	}
	return lines;
}

function makeStyle(style) {
	var s = "\x1B[m"
	if (style.bold)
		s += "\x1B[1m";
	if (style.color)
		s += `\x1B[38;2;${style.color>>16 & 255};${style.color>>8 & 255};${style.color & 255}m`;
	if (style.bgcolor)
		s += `\x1B[48;2;${style.bgcolor>>16 & 255};${style.bgcolor>>8 & 255};${style.bgcolor & 255}m`;
	return s;
}


//idea: handle the "right" property by
// reducing the width of the first row
// by the length of the right string
// 
