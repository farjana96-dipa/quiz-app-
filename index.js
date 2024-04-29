const myBtn = document.querySelector(".mybtn button");
const rulebox = document.querySelector(".rulesBox");
const exbtn = document.querySelector(".buttons .ex");
const conbtn = document.querySelector(".buttons .con");
const question = document.querySelector(".question");
const opt = document.querySelector(".myOptions");
const timeCount = document.querySelector(".timeCount .seconds"); 
const nextBtn = document.querySelector(".nextBtn");
const nextBtn1 = document.querySelector(".nextBtn1");
const timeLine = document.querySelector(".questionHeader .timeLines");
const resultBox = document.querySelector(".result-box");
const restart = document.querySelector(".buttons .restart1");
const quit = document.querySelector(".buttons .quit");



quit.onclick = ()=>{
    window.location.reload();
}

myBtn.onclick = ()=>{
    rulebox.classList.add("activeInfo");
}

exbtn.onclick = ()=>{
    rulebox.classList.remove("activeInfo");
}


conbtn.onclick = ()=>{
    question.classList.add("activeQuiz");
    showQuestion(0);
    startTime(15);
    startTimeLine(0);
}



let i = 0;
let counter;
let timeValue = 15;

let tLine;
let widthValue = 0;
let userScore = 0;



function showResult(){
    rulebox.classList.remove("activeInfo");
    question.classList.remove("activeQuiz");

    resultBox.classList.add("activeResult");

    let scr = document.querySelector(".score_text");
    if(userScore <=3){
        let scrtag = "<span>Carry On You Got <p>"+ userScore + "</p> out of <p>" + qs.length + "</p></span>";
        scr.innerHTML = scrtag;
    }
    else{
        scr.innerHTML = "<span>Congratulations !! Your Score is <p> " + userScore +"</p></span>";
    }
}



restart.onclick = ()=>{
    

     i = 0;
     counter;
     timeValue = 15;

     tLine;
     widthValue = 0;
     userScore = 0;
   
    question.classList.add("activeQuiz");
    showQuestion(0);
    startTime(15);
    startTimeLine(0);
}

nextBtn.onclick = ()=>{
        if(i < qs.length -1){
            i++;
            showQuestion(i); 
            clearInterval(counter);
            startTime(timeValue);

            clearInterval(tLine);
            startTimeLine(widthValue);
            nextBtn1.style.display = "none";
        }
        else{
            console.log("You have completed your task.");
            showResult();
        }
}
    

 
       


function showQuestion(index){
    const qus = document.querySelector(".text");
   
    const qtag = "<span>" + qs[index].n + "." + qs[index].q + "</span>";
    qus.innerHTML = qtag;
    /*var opt = document.querySelector(".myOptions");*/
    const optag ="<div class='options'><span>" + qs[index].options[0] + "</div></span>" + "<div class='options'><span>" + qs[index].options[1] + "</div></span>" + "<div class='options'><span>" + qs[index].options[2] + "</div></span>" + "<div class='options'><span>" + qs[index].options[3] + "</div></span>";
    opt.innerHTML = optag;

    const tq = document.querySelector(".total_que");
    const tqtag = "<p>" + qs[index].n +  " out of " + qs.length + " questions." + "</p>";
    tq.innerHTML = tqtag;

    const option = opt.querySelectorAll(".options");
    for(let j = 0;j<option.length; j++){
        option[j].setAttribute("onclick","optionSelected(this)");
    }
}



const tick = `<div class="tick-icon"><i class="fa fa-check"></i></div>`;
const cross = `<div class="cross-icon"><i class="fa fa-times"></i></div>`;

function optionSelected(ans){
    clearInterval(counter);
    clearInterval(tLine);
    const userAns = ans.textContent;
    const answer = qs[i].a;
    let allOption = opt.children.length;
    if(userAns == answer){
        userScore++;
        console.log(userScore);
        ans.classList.add("correct");
        console.log("Answer is correct");
        ans.insertAdjacentHTML("beforeend",tick);
    }
    else{
        ans.classList.add("Incorrect");
        for(let j = 0;j<allOption;j++){
            if(opt.children[j].textContent == answer){
                opt.children[j].setAttribute("class","options correct");
                opt.children[j].insertAdjacentHTML("beforeend",tick);
            }
        }
        console.log("ans is wrong");
        ans.insertAdjacentHTML("beforeend",cross);
    }

    for(let j = 0;j<allOption;j++){
        opt.children[j].classList.add("disabled");
    }

    nextBtn1.style.display = "block";
}

function startTime(time){
    counter = setInterval(timer,1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time <= 9){
            timeCount.textContent = "0" + time;
        }
        if(time<0){
            clearInterval(counter);
            timeCount.textContent = "00";
        }
    }
}

function startTimeLine(time){
    tLine = setInterval(timer,50);
    function timer(){
        time = time + 1;
        timeLine.style.width = time + "px";
        if(time > 319){
            clearInterval(tLine);
        }
    }
}