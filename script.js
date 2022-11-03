const ui = new UI();
const quiz = new Quiz(sorular);
const soru = new Soru();

ui.btn_start.addEventListener("click",function(){

        ui.quiz_box.classList.add("active")
        startTime(10)
        startTimerLine()
        ui.soruGoster(quiz.soruGetir())
        ui.soruSayisiniGoster(quiz.soruIndex +1, quiz.sorular.length)
})

ui.btn_next.addEventListener("click",function(){
    if(quiz.sorular.length != quiz.soruIndex +1){
        quiz.soruIndex +=1;
        clearInterval(counter)
        clearInterval(counterLine)
        startTime(10)
        startTimerLine()
        ui.soruGoster(quiz.soruGetir())
        ui.soruSayisiniGoster(quiz.soruIndex +1, quiz.sorular.length)

        ui.btn_next.classList.remove("show")
    }else{
        console.log("Quiz bitti.")
        clearInterval(counter)
        clearInterval(counterLine)
        ui.score_box.classList.add("active")
        ui.quiz_box.classList.remove("active")
        ui.skoruGoster(quiz.sorular.length,quiz.dogruCevapSayisi)
    }
})


  
function optionSelected(option){
    clearInterval(counter)
    clearInterval(counterLine)
    let cevap = option.querySelector("span b").textContent;
    let soru = quiz.soruGetir()
    
    if(soru.cevabiKontrolEt(cevap)) {
        quiz.dogruCevapSayisi +=1;
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", ui.correctIcon);
    } else {
        option.classList.add("incorrect");
        option.insertAdjacentHTML("beforeend", ui.incorrectIcon);
    }

    for(let i=0; i< ui.option_list.children.length; i++){
        ui.option_list.children[i].classList.add("disabled")
    }

    ui.btn_next.classList.add("show")
}

ui.btn_quit.addEventListener("click",function(){
    window.location.reload();
})

ui.btn_replay.addEventListener("click",function(){
    quiz.soruIndex = 0;
    quiz.dogruCevapSayisi = 0;
    ui.btn_start.click();
    ui.score_box.classList.remove("active")
})

let counter;
let counterLine;
function startTime(time){
   counter = setInterval(timer,1000)

  function timer(){
    ui.time_second.textContent = time
    time --;

    if(time < 0){
        clearInterval(counter)
        ui.time_text.textContent="Süre Bitti!"

        let cevap = quiz.soruGetir().dogruCevap;

        for(let option of ui.option_list.children){
            if(option.querySelector("span b").textContent == cevap){
                option.classList.add("correct");
                option.insertAdjacentHTML("beforeend", ui.correctIcon);
            }
            option.classList.add("disabled");
        }
        ui.btn_next.classList.add("show")
        clearInterval(counter)
    }
  }
}

function startTimerLine(time){

    let line_width = 0;

    counterLine = setInterval(timer, 20);
    function timer(){
        line_width += 1;
        ui.time_line.style.width = line_width + "px"
        if(line_width > 549){
            clearInterval(counterLine)
        }
    }
}

