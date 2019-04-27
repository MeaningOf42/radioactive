let frameR = 25
let graphW = 500
let spaceW = 500
let w = graphW + spaceW
let h = 500

let nucleiN = 100
let necleiR = 10

let halfLife = 10

let graphYScale = h/(nucleiN*2)
let graphXScale = 0.4


class Nuclei {
	constructor(halfLife, radius, x,y, xv,yv) {
		this.halfLife = halfLife
		this.x = x
		this.y = y
		this.xv = xv
		this.yv = yv
		this.radius = radius
	}

	dies(timeInt) {
		let prob = 1-0.5**(timeInt/this.halfLife)
		return (random()<prob ? true:false);
	}

	draw() {
  	noStroke()
		fill(0)
		this.x += this.xv
		this.y += this.yv
		if (this.x-necleiR < graphW) this.xv = abs(this.xv)
		if (this.x+necleiR > w) this.xv = -abs(this.xv)
		if (this.y-necleiR < 0) this.yv = abs(this.yv)
		if (this.y+necleiR > h) this.yv = -abs(this.yv)
		ellipse(this.x, this.y, this.radius, this.radius)
	}

}

let nucleis = []
let undecayed = []

function setup() {
	createCanvas(w, h)
	frameRate(frameR)
	for (let i=0; i<100; i++) nucleis.push(new Nuclei(halfLife, necleiR, random(graphW, w), random(h), random(-2,2),random(-2,2)))
}

function draw() {
	background(255)
	nucleis.forEach((item)=>item.draw())
	for (let i=nucleis.length-1; i>-1; i--)
		if (nucleis[i].dies(1/frameR)) nucleis.splice(i,1)

	undecayed.push(nucleis.length)
	stroke(0)
	for (i=0; i<undecayed.length-1;i++)
		line(graphW-20+(i-undecayed.length)*graphXScale, h-undecayed[i]*graphYScale, graphW-20+(i+1-undecayed.length)*graphXScale, h-undecayed[i+1]*graphYScale)

	line(graphW,0,graphW,h)
	line(graphW-20,0,graphW-20,h)

	rect(graphW-20,h-2-nucleis.length*graphYScale, 20,4)
}

function mouseClicked() {
	if (mouseX > graphW)
  	nucleis.push(new Nuclei(30, 10, mouseX, mouseY, random(-2,2),random(-2,2)))
	if (mouseX<graphW && mouseX > graphW - 20)
		for (let i = 0; i<(h-mouseY)/graphYScale - nucleis.length; i++)
			nucleis.push(new Nuclei(halfLife, necleiR, random(graphW, w), random(h), random(-2,2),random(-2,2)))
  // prevent default
  return false;
}
