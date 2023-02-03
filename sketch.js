
// 0 is first screen
// 1 is second screen
var screen = 0; // First screen

var organics = [];// Organic stores the list of instances of the Organic objects 
var change; // Rotation changes
var colorsPalette;
var button;
var saveButton;
var myTextArea;
var myText;
var stuff;



/////////////////////////////////////////////////////////////////
/////////////////////////set up/////////////////////////////////
////////////////////////////////////////////////////////////////


function setup() {
  // Draw canvas to fit screen when extended
    createCanvas(windowWidth, windowHeight);
    
  // Create button on first screen to lead onto second screen
    let button = createButton("Let's Talk");
    let col = color(215, 118, 136);
    button.style('background-color', col);
    button.position(675,390);
    button.mousePressed(function(){button.remove()});
    button.mouseReleased(changeScreen);


 // Blob colours
 change = 0;
 colorsPalette = [color(146, 167, 202,30),
     color(186, 196, 219,30),
     color(118, 135, 172,30),
     color(76, 41, 81,30),
     color(144, 62, 92,30),
     color(178, 93, 119,30),
     color(215, 118, 136,30),
     color(246, 156, 164,30),];


     // Screen positioning of blob
 for (var i=0;i<110;i++){
 organics.push(new Organic(0.1+1*i,width/2,height/2,i*1,i*random(90),colorsPalette[floor(random(8))]));
 }  
 
 // Text box user input setup 
 let myTextArea = createElement('textarea', "Type here to share your thoughts and feelings.");  
    myTextArea.attribute("rows","32");
    myTextArea.attribute("cols","20");
    myTextArea.position(20,200);

    myTextArea.input(thinking);

    myText = "";
    stuff='';



// Create a button for saving the canvas
saveButton = createButton("Save Entry");
saveButton.position(45, 725);
saveButton.mousePressed(saveToFile); 

}


/////////////////////////////////////////////////////////////////
///////////////////////end of set up/////////////////////////////



/////////////////////////////////////////////////////////////////
//////////////////////////functions/////////////////////////////
////////////////////////////////////////////////////////////////

// Creating function to allow navigation onto seperate page
function changeScreen() {
  screen = 1;
}

  background(250,30,250);

// Making window resize to whatever screen size user chooses 
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function doSomething(){
  myText = input.value();
  myText.color("white");
  
}

function thinking() {
  stuff = this.value();
}


// When mouse is pressed or button is clicked it will lead 
// onto next screen, I haven't yet figured out how to make
// the button be the thing to change the screen, it 
// will change screen no matter where you click on the canvas.
// I want to change this
function mousePressed () {
  changeScreen();
  
}


function saveToFile() {
  // Save the current canvas to file as png
  saveCanvas('mycanvas', 'png')
}



////////////////////////////////////////////////////////////////




// Creating the conditionals to allow navigation onto two seperate 
// pages
let value = 0



/////////////////////////////////////////////////////////////////
/////////////////////////draw///////////////////////////////////
////////////////////////////////////////////////////////////////


function draw() {

  if (screen == 0) {
  firstScreen(); // Function for first screen
  } else if (screen == 1) {
  secondScreen(); // Function for second screen
  } 

}



//////////////////////////////////////////////////////////////////
////////////////////*** First screen contents ***/////////////////
///////////////////////////////////////////////////////////////////


function firstScreen() {
  background(123,123,222);

  textAlign(CENTER);
  stroke('black');
  textSize(40);
  textFont('Courier');
  text('How are you feeling today?', 725, 350);
  

saveButton.hide(); // Hide save canvas button from screen 1 
}



///////////////////////////////////////////////////////////////////
////////////////////***  Second screen contents ***////////////////
///////////////////////////////////////////////////////////////////


function secondScreen() {
  background(123,123,222,30); //(r,g,b,opacity)
  for(var i=0; i<organics.length;i++){
	  organics[i].show(change);
  }

  change+=0.01;

  //real time text
  text(' ' + stuff, 700, 200);
  text(myText, 600, 400);
  textAlign(CENTER);
  

saveButton.show(); // Reveal save canvas button

}



///////////////////////////////////////////////////////////////////
////////////////////////***  Blob function ***/////////////////////
///////////////////////////////////////////////////////////////////


function Organic(radius,xpos,ypos,roughness,angle,color){

  // Blob positioning
  this.radius = radius; 
  this.xpos = xpos; 
  this.ypos = ypos; 
  this.roughness = roughness; // How much the circle is distorted
  this.angle = angle; // Circle rotation
  this.color = color; // 

  this.show = function(change){

	noStroke(); 
	fill(this.color); 
	

	push(); 
	translate(xpos, ypos); // Move to xpos, ypos
	rotate(this.angle+change); // Rotate by this.angle+change

	// Begin shape based on the vertex points below
	beginShape(); 

	// Vertex points
	var off = 0;
	for (var i = 0; i < TWO_PI; i += 0.1) {
	  var offset = map(noise(off, change), 0, 1, -this.roughness, this.roughness);
	  var r = this.radius + offset;
	  var x = r * cos(i);
	  var y = r * sin(i);
	  vertex(x, y);
	  off += 0.1;
	}
	endShape(); // End and create the shape
	pop();

	}
}


