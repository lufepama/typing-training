// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { TouchBarScrubber } = require("electron")

let firstWord = document.getElementById('firstWord')
let secondWord = document.getElementById('secondWord')
let thirdWord = document.getElementById('thirdWord')
let fourthWord = document.getElementById('fourthWord')
let fifthWord = document.getElementById('fifthWord')
let changeBtn = document.getElementById('change-btn')
let thirdWordDiv = document.getElementById('display-words-content-third')
let trialInput = document.getElementById('trial')

wordsList= ['palabra1','palabra2','hola','palabra4','palabra5','quetal','piezo',
            'palabra8','palabra9','palabra10','palabra11','palabra12','palabra13','palabra14',
            'palabra15','palabra16','palabra17','palabra18','palabra19','palabra20','palabra21',
            ]

class Carousel{
    constructor(wordsList){
        this.wordsList = wordsList,
        this.wordListDisplay = null;
        this.wordIndex = -1;
    }

    //TODO Remove later
    showWordList(){
        let wordListLength = this.wordsList.length;
        for (let i=0; i<wordListLength; i++){
            console.log(this.wordsList[i])
        }
    }

    displayWords(){
        let thirdWordDisplay = this.wordsList[0]
        let fourthWordDisplay = this.wordsList[1]
        let fifthWordDisplay = this.wordsList[2]
        this.wordIndex = 3
        thirdWord.innerHTML = thirdWordDisplay;
        fourthWord.innerHTML = fourthWordDisplay;
        fifthWord.innerHTML = fifthWordDisplay;

        this.wordListDisplay = [firstWord.innerHTML, secondWord.innerHTML, thirdWord.innerHTML,fourthWord.innerHTML,fifthWord.innerHTML]
    }

    showNextWord(){
        for (let i=0 ; i<5; i++){
            this.wordListDisplay[i] = this.wordListDisplay[i+1]
            if (i===4){
                this.wordListDisplay[i] = this.wordsList[this.wordIndex]
            }
        }
        firstWord.innerHTML = this.wordListDisplay[0];
        secondWord.innerHTML = this.wordListDisplay[1];
        thirdWord.innerHTML = this.wordListDisplay[2];
        fourthWord.innerHTML = this.wordListDisplay[3];
        fifthWord.innerHTML = this.wordListDisplay[4];   
        this.wordIndex++
    }

    getThirdWord(){
        return thirdWord.innerHTML
    }

}

newCarousel = new Carousel(wordsList)
newCarousel.displayWords()

changeBtn.addEventListener('click', ()=>{
    newCarousel.showNextWord()
})

document.addEventListener('keypress', (keyBoard)=>{
    if (keyBoard.key ==='Enter'){
        thirdWordDiv.style.filter= 'blur(0px)';
        let matchWord = newCarousel.getThirdWord()
        let matchWordSplitted = matchWord.split("");
        let matchWordLength = matchWordSplitted.length
        let matchWordPointer = 0

        document.addEventListener('keypress', (keyBoard)=>{
            console.log(matchWordPointer)
            console.log(keyBoard.key)
            if (keyBoard.key === matchWordSplitted[matchWordPointer]){
                matchWordPointer++
            }
            if (matchWordPointer === matchWordLength){
                matchWordPointer=0
                newCarousel.showNextWord()
                thirdWordDiv.style.filter= 'blur(1.5px)';
                firstWord.style.color = 'green'
                secondWord.style.color = 'green'
            }
        })
    }
})

colorArray = ['blue', 'red', 'green', 'black']

for (let i=0;i<7;i++){
    let newTag = document.createElement('span')
    newTag.className = `trialclass-${i}`
    console.log(newTag.className)
    newTag.innerHTML = 'P'
    colorChoice = colorArray[Math.floor(Math.random()*colorArray.length )]
    newTag.style.color = `${colorChoice}`
    trialInput.appendChild(newTag)
}