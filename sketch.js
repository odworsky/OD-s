let people = []
let prcntData;
let myFont;
let bg
let druggie
let pAge
let pDrug
let coke
let fenty
let heroin
let ethanol

function preload(){
     coke = loadImage('assets/coke.png')
     fenty = loadImage('assets/fenty.png')
     heroin = loadImage('assets/heroin.png')
     ethanol = loadImage('assets/ethanol.png')
     prcntData = loadJSON('percentODbyAge.json')
     bg = loadImage('assets/bgrnd2.png')
     druggie = loadImage('assets/druggie.png')
     myFont = loadFont('assets/Pixel Coleco.otf');
}

function setup(){
    createCanvas(width, height)
    populate()
    bg.resize(0, windowHeight)
    coke.resize(100, 100)
    ethanol.resize(100, 100)
    heroin.resize(100, 100)
    fenty.resize(100, 100)
    imageMode(CENTER)
    textFont(myFont)
    pAge = round(random(14, 74))
    getPSize()
    druggie.resize(0, pSize)
    getInfo()
}

function draw(){
    resizeCanvas(windowWidth, windowHeight)
    background('black')
    image(bg, windowWidth/2, windowHeight/2)
    image(druggie, windowWidth/2, windowHeight/2+150)
    tint(255, 255, 255, 120)
    image(getImg(pDrug), windowWidth/2+80, windowHeight/2+260)
    tint(255)
    infoBox(5, 5)
}

function getInfo(){
    for (let p of people){
        if(p.old == pAge){
            pDrug = p.getDrug()
        }
    }
}

function getPSize(){
    if(pAge>18){
        pSize = 750
    } else{
        pSize = 600
    }
}

function infoBox(x, y){
    stroke('grey')
    strokeWeight(5)
    fill(0, 0, 150, 100)
    rect(x, y, 385, 100)
    noStroke()
    fill('white')
    textSize(30)
    text('age: '+ pAge, x+20,y+40)
    let col = getCol(pDrug)
    fill(col)
    text('drug: ' + pDrug, x+20,y+80)
    strokeWeight(0)
}

function populate(){
    for(let i = 14; i<75; i++){
        people.push(new Person(i))
    }
    for(let p of people){
        for(drug in prcntData){
            p.drug.push(drug)
            p.percent.push(prcntData[drug][p.old])
        }
        p.fillDrugs()
        console.log(p.drug)
        console.log(p.old, p.percent)
        console.log(p.drugs)
    }
    
}

function getCol(drug){
    let col
    if(drug == 'Heroin'){
        col = 'black'
        strokeWeight(5)
        stroke('red')
    }
    else if(drug == 'Fentanyl'){
        col = 'lime'
    }
    else if(drug == 'Cocaine'){
        col = 'white'
    }
    else if(drug == 'Oxycodone'){
        col = 'blue'
    }
    else if(drug == 'Oxymorphone'){
        col = 'green'
    }
    else if(drug == 'Ethanol'){
        col = 'purple'
    }
    else if(drug == 'Hydrocodone'){
        col = 'pink'
    }
    else if(drug == 'Benzodiazepine'){
        col = 'red'
    }
    else if(drug == 'Methadone'){
        col = 'orange'
    }
    else if(drug == 'Amphetamine'){
        col = 'brown'
    }
    else if(drug == 'Tramadol'){
        col = 'brown'
    }
    else if(drug == 'Hydromorphone'){
        col = 'brown'
    }
    else if(drug == 'OpiateNOS'){
        col = 'brown'
    }
    else if(drug == 'Opioid'){
        col = 'brown'
    }
    else{
        col = 'brown'
    }
    return col
}

function getImg(drug){
    let img
    if(drug == 'Heroin'){
        img = heroin
    }
    else if(drug == 'Cocaine'){
        img = coke
    }
    else if(drug == 'Ethanol'){
        img = ethanol
    }
    else{
        img = fenty
    }
    return img
}