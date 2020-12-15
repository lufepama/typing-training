// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { TouchBarScrubber } = require("electron")
const { TimerControl } = require("./timerControl.js")


let firstWord = document.getElementById('firstWord')
let secondWord = document.getElementById('secondWord')
let thirdWord = document.getElementById('thirdWord-span-black')
let thirdWordGreen = document.getElementById('thirdWord-span-green')
let fourthWord = document.getElementById('fourthWord')
let fifthWord = document.getElementById('fifthWord')
let changeBtn = document.getElementById('change-btn')
let thirdWordDiv = document.getElementById('display-words-content-third')
let enterIsPressed = true
wordsList= ['hola','me','llamo','felipe','paz','martinez','y',
            'voy','a','ser','papa','dentro','de','siete',
            'meses','palabra16','palabra17','palabra18','palabra19','palabra20','palabra21',
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
        console.log(thirdWordDisplay)
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
        console.log('aqui!!!!!:  ' + this.wordListDisplay)
        firstWord.innerHTML = this.wordListDisplay[0];
        secondWord.innerHTML = this.wordListDisplay[1];
        thirdWord.innerHTML = this.wordListDisplay[2];
        fourthWord.innerHTML = this.wordListDisplay[3];
        fifthWord.innerHTML = this.wordListDisplay[4];   
        thirdWordGreen.innerHTML = ''
        this.wordIndex++
    }
    
    createSpanChild(word){
        let wordLength = word.length
        let finalWord = document.createElement('p')

        for (let i=0; i<wordLength; i++){
            let newTag = document.createElement('span')
            newTag.className = `tag-element-${i}`
            newTag.innerHTML = `${word[i]}`
            finalWord.appendChild(newTag)
        }
        return finalWord
    }

    getThirdWord(){
        return thirdWord
    }

    paintNextLetter(){

        let wordArray = thirdWord.innerHTML.split("")
        let firstLetter = wordArray[0]

        wordArray.shift()
        thirdWord.innerHTML = wordArray.join('');
        thirdWordGreen.innerHTML+=firstLetter
        console.log('letter: ' + firstLetter)
        console.log('array: ' + wordArray)
    }
}

let newCarousel = new Carousel(wordsList)
newCarousel.displayWords()

changeBtn.addEventListener('click', ()=>{
    newCarousel.showNextWord()
})

wordTimer = new TimerControl()

document.addEventListener('keyup', (keyBoard)=>{

    if (keyBoard.key === 'Enter' && enterIsPressed === true){
        
        wordTimer.reStartTimer()
        thirdWordDiv.style.filter= 'blur(0px)';
        let matchWord = newCarousel.getThirdWord()
        let matchWordInnerText = matchWord.innerText;
        let matchWordLength = matchWordInnerText.length
        let matchWordPointer = 0
        
        document.addEventListener('keyup', (keyBoard)=>{
            console.log(keyBoard)
            if (keyBoard.key === 'Enter'){
                enterIsPressed= false
            }
            if (keyBoard.key === matchWordInnerText[matchWordPointer]){
                 newCarousel.paintNextLetter()
                matchWordPointer++
            }
            if (matchWordPointer === matchWordLength){
                matchWordPointer=0;
                console.log(matchWordInnerText)
                matchWordInnerText=''
                newCarousel.showNextWord()
                wordTimer.setTimer()
                enterIsPressed = true
                thirdWordDiv.style.filter= 'blur(1.5px)';
                firstWord.style.color = 'green'
                secondWord.style.color = 'green'
            }
        })
    }
})
