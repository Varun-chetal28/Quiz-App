// defining variables
const nextbutton = document.querySelector('.next');
const backbutton = document.querySelector('.back')
const clock = document.querySelector('.time');
const option_container = document.querySelector('.option-container')
let quizApp = new Array();
let ques_no=0;
let count=0;
let time = 30;
function shufflearray(shuffle_array){
    return shuffle_array.sort( ()=>Math.random()-0.5);
}
const shuffle_array = [0,1,2,3]
// Creating function to define variables and load data
function load_data(){
    const ques = document.querySelector('.question-container');
    const option1 = document.querySelector('.option1');
    const option2 = document.querySelector('.option2');
    const option3 = document.querySelector('.option3');
    const option4 = document.querySelector('.option4');
    shufflearray(shuffle_array);
    const scorecount = document.querySelector('.score');
    ques.innerHTML = quizApp[ques_no].questions;
    option1.innerHTML = quizApp[ques_no].options[shuffle_array[0]];
    option2.innerHTML = quizApp[ques_no].options[shuffle_array[1]];
    option3.innerHTML = quizApp[ques_no].options[shuffle_array[2]];
    option4.innerHTML = quizApp[ques_no].options[shuffle_array[3]];
    scorecount.innerHTML = count;
    if(ques_no==0){
        backbutton.style.display = "none";
    }
    else{
        backbutton.style.display = "block";
    }
    if(ques_no==9){
        nextbutton.innerHTML = "Finish"
    }
    else{
        nextbutton.style.display = "block";
    }
    if(ques_no == 10){
            let body = document.querySelector(".panel")
            nextbutton.addEventListener("click" , ()=>{
                PlaneHelper.innerHTML = "Thankyou"
    
            })

    }
}
fetch('https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple')
.then((response)=>response.json())
.then((data) => {

    //creating quiz array to access objects easily
    for(let i=0;i<data.results.length;i++){
        quizApp.push({
            questions: data.results[i].question,
            correct_option: data.results[i].correct_answer,
            options: [data.results[i].correct_answer, ...data.results[i].incorrect_answers]
        });
    }
    //function to load for first time
    load_data();

    //event for next button
    nextbutton.addEventListener('click', () => {
        nextquestion();
    });
    //event for selecting an option
    option_container.addEventListener('click' , (e)=>{
        if(e.target.innerHTML==quizApp[ques_no].correct_option){
            count++;
        }
        nextquestion();
    })
    //event for back button
    backbutton.addEventListener('click' , ()=>{
        previousquestion();
    });
});
function previousquestion(){
    ques_no--;
    load_data();
    time = 31;
}
function nextquestion(){
    ques_no++;
    load_data();
    time = 31;
}
setInterval(() => {
    time--;
    if(time==0){
        nextquestion();
    }
    clock.innerHTML = time;
}, 1000);
