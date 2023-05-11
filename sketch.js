let people = []
let allDrugs = ['Heroin', 'Cocaine', 'Fentanyl', 'Oxycodone', 'Oxymorphone', 'Ethanol', 'Hydrocodone', 'Benzodiazepine', 'Methadone', 'Amphetamine', 'Ethanol', 'Tramadol', 'Hydromorphone', 'OpiateNOS', 'Opioid', 'Morphine']
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
let teddy
let drugArr
let pCent
let started = false
let pItem = 0
let seeFav = false

function preload(){
     teddy = loadImage('assets/teddy3.png')
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
    createCanvas(windowWidth, windowHeight)
    populate()
    imageMode(CENTER)
    textFont(myFont)
    started = false
}

function draw(){
    if(started){
        start()
    } else if (seeFav){
        resizeAll(int(localStorage.getItem('size')))
        resizeCanvas(windowWidth, windowHeight)
        background('black')
        image(bg, windowWidth/2, windowHeight/2)
        image(druggie, windowWidth/2, windowHeight/2+150)
        tint(255, 255, 255, 120)
        image(getImg(pDrug), windowWidth/2+80, windowHeight/2+260)
        tint(255)
        if(localStorage.getItem('age') < 19){
            teddie()
        }
        infoBox(5, 5, localStorage.getItem('age'), localStorage.getItem('rarity'), localStorage.getItem('drug'))
        textAlign(CENTER)
        fill('white')
        text('Press "M" to go to menu', windowWidth/2, windowHeight/2)
        textAlign(CORNER)
    } else {
        textSize(50)
        resizeCanvas(windowWidth, windowHeight)
        background('black')
        image(bg, windowWidth/2, windowHeight/2) 
        fill('white')
        textAlign(CENTER)
        text('Press "ENTER" to see random overdose', windowWidth/2, windowHeight/2)
        text('Press "O" to see your current overdose', windowWidth/2, windowHeight/2+100)
        textAlign(CORNER)
    }
}

function start(){
    resizeCanvas(windowWidth, 2*windowHeight)
    background('black')
    image(bg, windowWidth/2, windowHeight/2)
    image(druggie, windowWidth/2, windowHeight/2+150)
    tint(255, 255, 255, 120)
    image(getImg(pDrug), windowWidth/2+80, windowHeight/2+260)
    tint(255)
    if(pAge < 19){
        teddie()
    }
    ppl(pAge, pDrug)
    infoBox(5, 5, pAge, getPRarity(), pDrug)
    drugKey()
}

function makePerson(){
    let person = {
        rarity: getPRarity(),
        age: pAge,
        drug: pDrug,
        size: pSize,
        itemHeld: null
        //pItem
    }
    return person
}

function drugKey(){
    let yPos = windowHeight + 100
    textSize(25)
    fill('white')
    text('Drug Key', 95, yPos-15)
    textSize(10)
    for (let d of allDrugs){
        yPos+=15
        let col = getCol(d)
        fill('white')
        strokeWeight(1)
        text(d, 100, yPos)
        fill(col)
        rect(90, yPos-5, 5)
        noStroke()
    }
}

function ppl(age, drug){
    textSize(30)
    fill('white')
    text('Relative Overdoses of ' + age + ' Year Olds in the Data', 320, windowHeight+100)
    pCent = 0
    let i = 0
    for(let p of drugArr){
        if(drug == p){
            pCent++
        }
        i++
        fill(getCol(p))
        strokeWeight(2)
        drawPerson(230+10*i, windowHeight+250, .3)
    }
}

function resizeAll(sz){
    teddy.resize(150, 150)
    bg.resize(0, windowHeight)
    coke.resize(100, 100)
    ethanol.resize(100, 100)
    heroin.resize(100, 100)
    fenty.resize(100, 100)
    druggie.resize(0, round(sz, 5))
}

function getPRarity(){
    let rarity
    if(pCent>10){
        rarity = 'common'
    } else if(pCent>5){
        rarity = 'rare'
    } else if(pCent == 1){
        rarity = 'off-white'
    } else {
        rarity = 'legendary'
    }
    return rarity
}

function getInfo(){
    for (let p of people){
        if(p.old == pAge){
            pDrug = p.getDrug()
            drugArr = p.drugs
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

function teddie(){
    image(teddy, windowWidth/2-30, windowHeight/2+180)
}

function infoBox(x, y, age, rarity, drug){
    rectMode(CORNER)
    stroke('grey')
    strokeWeight(5)
    fill(0, 0, 150, 100)
    rect(x, y, 385, 150)
    noStroke()
    fill('white')
    textSize(30)
    text('age: '+ age, x+20,y+40)
    text('rarity: '+ rarity, x+20, y+120)
    let col = getCol(drug)
    fill(col)
    text('drug: ' + drug, x+20,y+80)
    noStroke()
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
    }
    
}

function getCol(drug){
    //console.log(drug)
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
        col = color(139, 64, 0)
    }
    else if(drug == 'Amphetamine'){
        col = color(200, 96, 96)
    }
    else if(drug == 'Tramadol' ){
        col = 'turquoise'
    }
    else if(drug == 'Hydromorphone'){
        col = 'yellow'
    }
    else if(drug == 'OpiateNOS'){
        col = color(237, 246, 190)
    }
    else if(drug == 'Opioid'){
        col = color(250, 170, 80)
    }
    else if(drug == 'Morphine'){
        col = color(100, 255, 100)
    }
    else{
        console.log(drug)

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

function drawPerson(x, y, k){
    ellipseMode(CENTER)
    rectMode(CENTER)
    ellipse(x, y, k*20)
    rect(x, y+(40*k), k*30, k*50, k*5)
    noStroke()
}

function keyPressed() {
    if (key == 'Enter') {
        started = true
        pAge = round(random(14, 74))
        pDrug = ''
        drugArr = []
        getPSize()
        resizeAll(pSize)
        getInfo()
    }
    else if (key == 's') {
        localStorage.setItem('rarity', makePerson().rarity)
        localStorage.setItem('age', makePerson().age)
        localStorage.setItem('drug', makePerson().drug)
        localStorage.setItem('item held', makePerson().itemHeld)
        localStorage.setItem('size', makePerson().size)
        console.log(localStorage)
    }
    else if(key == 'o'){
        if(!localStorage.getItem('size')){
            textAlign(CENTER)
            textSize(20)
            text('You have no druggie stored', windowWidth/2, windowHeight/2)
            textAlign(CORNER)
        } else{
            seeFav = true
        }
    }
    else if (key == 'm'){
        started = false
        seeFav = false
    }
  }