// interface level 0
// (write, ioctl, etc.)

const EventEmitter = require('events');
const Readline = require('readline');

// interface level 1
// generic terminal control
// this one is for xterm, but others could be made for other terminals if needed
// need to clean up the enter/leave etc. functions
// enter - call when you want to take over the terminal
// leave - call when finished, to restore terminal to normal state
// suspend - call before SIGSTOP
// restore - call after SIGCONT

class XTerm extends EventEmitter {
	constructor(inp, out) {
		super();
		//this.rl = Readline.createInterface({input:inp, output:out});
		this.o = out;
		this.i = inp;
		this.csrx = 0;
		this.csry = 0;
		this.listeners = [];
		
		// these can't be methods because they're passed to .on()
		this.onUncaughtException = (e)=>{
			this.leave();
			console.error(e);
			// this isn't ideal, but for now...
			// ideally there should be a way to detect
			// errors that aren't recovered from otherwise
			process.exit();
		};
		this.onKill = ()=>{
			this.leave();
			process.exit();
		}
		this.onKey = (key)=>{
			if (key == '\x03')
				this.onKill();
			if (key == '\x1A')
				this.suspend();
			this.emit('key', key);
		};
		this.onResize = (init)=>{
			this.width = this.o.columns;
			this.height = this.o.rows;
			this.scrollTop = undefined;
			this.scrollBottom = undefined;
			if (this.cursorVisible)
				this.locate(this.csrx, this.csry);
			this.emit('resize', init);
		};
		this.onContinue = ()=>{
			this.enter();
		};
	}
	
	write(x) {
		this.o.write(x);
	}
	
	// take control of terminal
	enter() {
		delete this.write;
		process.once('uncaughtException', this.onUncaughtException);
		this.i.setRawMode(true);
		this.write("\x1B[?1049h\x1B[?12l"); //alternate buffer + disable blinking cursor
		this.i.on('data', this.onKey);
		this.o.on('resize', this.onResize);
		process.once('exit', this.onKill);
		process.once('SIGTERM', this.onKill);
		process.once('SIGINT', this.onKill);
		this.onResize(true);
	}

	// release control + clean up
	leave() {
		this.i.removeListener('data', this.onKey);
		this.o.removeListener('resize', this.onResize);
		process.removeListener('uncaughtException', this.onUncaughtException);
		process.removeListener('exit', this.onKill);
		process.removeListener('SIGTERM', this.onKill);
		process.removeListener('SIGINT', this.onKill);
		process.removeListener('SIGCONT', this.onContinue);
		this.write("\x1B[r"); // reset scroll region
		this.write("\x1B[?1049l"); // main buffer
		this.i.setRawMode(false);
		this.write = ()=>{}; //this will override the prototype
	}
	
	// call this to suspend the process
	suspend() {
		this.leave();
		process.once('SIGCONT', this.onContinue);
		process.kill(process.pid, "SIGTSTP");
	}
	
	// it's important that the fucking bg color is set correctly first
	// otherwise you get flickering
	scroll(dist, top, bottom) {
		if (dist == 0)
			return;
		
		if (this.scrollTop !== top || this.scrollBottom !== bottom) {
			this.write(`\x1B[${top+1};${bottom+1}r`);
			this.scrollTop = top;
			this.scrollBottom = bottom;
		}
		
		if (dist > 0)
			this.write(`\x1B[${dist}T`);
		else if (dist < 0)
			this.write(`\x1B[${-dist}S`);
	}
	
	locate(x = 0, y = 0) {
		if (x && y)
			this.write(`\x1B[${y+1};${x+1}H`);
		else if (y)
			this.write(`\x1B[${y+1};H`);
		else if (x)
			this.write(`\x1B[;${x+1}H`);
		else
			this.write(`\x1B[H`);
	}

	color(color) {
		return `\x1B[48;2;${color>>16 & 255};${color>>8 & 255};${color & 255}m`;
	}

	fillLine(text, bg, scrollbar) {
		this.write(`${this.color(bg)}${text}\x1B[K`);
		if (scrollbar)
			this.write(`\x1B[${this.width}G${this.color(scrollbar)} `);
	}


	//todo:
	// so we want to give the illusion that the cursor can be controlled independantly of drawing
	// there will be public methods for show/hide/locate
	// so in "drawing mode", the cursor needs to be hidden, and then restored to the true position after
	
	endDraw() {
		if (this.cursorEnabled) {
			if (this.cursorVisible != true) {
				this.loadCursor();
				this.write("\x1B8\x1B[?25h");
				this.cursorVisible = true;
				this.locate(this.csrx, this.csry);
			}
		}
		this.drawing = false;
	}

	saveCursor() { this.write("\x1B7"); }
	loadCursor() { this.write("\x1B8"); }
	
	startDraw() {
		this.write("\x1B7");
		if (this.cursorVisible != false) {
			this.write("\x1B[?25l");
			this.cursorVisible = false;
		}
		this.drawing = true;
	}

	//
	setCursorPos(x, y) {
		this.csrx = x;
		this.csry = y;
		this.locate(x, y);
	}
	
	nextLine() {
		this.write("\n");
	}
}

module.exports = XTerm;
