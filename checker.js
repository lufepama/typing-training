let soundSuccess = new Audio('./media/human.mp3')
let soundFail = new Audio('./media/fart.mp3')


class Checker{
    constructor(){
        this.mainWord = null
        this.letter = null
        this.indexLetter = null
    }

    checkLetter(wordLetterInfo, callback){
        this.mainWord = wordLetterInfo.mainWord;
        this.letter = wordLetterInfo.letter;
        this.indexLetter = wordLetterInfo.indexLetter;

        if (matchLetterWithMainword(this.letter, this.mainWord[this.indexLetter])){
            callback('SUCCESS')
        }else{
            callback('FAIL')
        }
        if (isWordCompleted (this.mainWord, this.letter, this.indexLetter)){
            callback('COMPLETED')
        }
    }

    onFail(){
        showMessage('You failed')
    }

    onSuccess(){
        newCarousel.paintNextLetter()
        showMessage('You success!!')
    }

    onCompleted(){
        soundSuccess.play()
        newCarousel.showNextWord()
        wordTimer.setTimer()
        showMessage('Completed')
    }
}

// Clean code
function isEnterKeyPressed(keyBoard, isEnterAllowed){
    return (keyBoard === 'Enter' && isEnterAllowed ===true)
}
function matchLetterWithMainword(letter, mainWordLetter){
    return (letter == mainWordLetter)
}
function isWordCompleted(mainWord, letter, index){
    return (mainWord.length === (index+1) && mainWord[index] === letter)
}
function showMessage(message){
    console.log(message)
}
//Clean code

module.exports = {Checker, isEnterKeyPressed}