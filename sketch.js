

function setup(){
    createCanvas(windowWidth, windowHeight)
    person(windowWidth/2, windowHeight/2)
    
}

function person(x, y){
    rectMode(CENTER)
    ellipseMode(CENTER)
    fill('black')
    rect(x, y, 200, 300)
    ellipse(x, y-200, 100)
}