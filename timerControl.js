class TimerControl{
    constructor(){
        this.n = 0
        this.l = document.getElementById('timer-content');
    }
    setTimer(){
        window.setInterval(()=>{
            this.l.innerHTML = this.n;
            this.n++;
        },100);
    }

    reStartTimer(){
        this.n=0;
        clearInterval()
    }
}


module.exports = {TimerControl}