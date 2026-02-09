const userName = document.getElementById("display-name")
const nameInput = document.querySelector(".name-input")
const emailInput = document.querySelector(".email-input")
const timer = document.getElementById("time")
const formPage = document.querySelector(".form")
const formSection = document.querySelector(".form-container")
const scoreSection = document.querySelector(".score-section")
const startBtn = document.querySelector(".start")
const nextBtn = document.querySelector(".next")
const prevBtn = document.querySelector(".prev")
const resetBtn = document.querySelector(".reset")
const submitBtn = document.querySelector(".submit")
const newGameBtn = document.querySelector(".new-game")
const questionPage = document.querySelector(".question-section")
let currentQuestion = document.getElementById("question")
let totalQuestions = document.getElementById("total-questions")
let userScore = document.getElementById("user-score")
let currentIndex = 0
let selection = document.getElementById("courses")
let optionOne = document.querySelector(".one")
let optionTwo = document.querySelector(".two")
let optionThree = document.querySelector(".three")
let optionFour = document.querySelector(".four")
let totalSeconds = 0
let intervalId = null
let totalUserScore = 0


fetchQuestion()

async function fetchQuestion() {
    try {
    const response = await fetch("./Data.json")
       if(!response.ok) {
           throw new Error("Could not fetch data")
       }

       const data = await response.json()
   
     mathArray = data.mathsQuestions
     englishArray = data.englishQuestions
     scienceArray = data.scienceQuestions
     physicsArray = data.physicsQuestions

    }

    catch(error){
      console.error(error)
    }
}


// START FUNCTION WITH THE OPTIONS AND CATEGORIES EMBEDDED
function startTest() {
    
if(selection.value === "maths") {
     let questionId = mathArray[currentIndex].id
     currentQuestion.textContent = mathArray[currentIndex].question
      optionFour.textContent = mathArray[currentIndex].optionOne
      optionThree.textContent = mathArray[currentIndex].optionFour
      optionOne.textContent = mathArray[currentIndex].optionTwo
      optionTwo.textContent = mathArray[currentIndex].optionThree
      totalQuestions.textContent = mathArray.length
      console.log(questionId)
          console.log("Math Questions")
     }

     if(selection.value === "english") {
     let questionId = englishArray[currentIndex].id
     currentQuestion.textContent = englishArray[currentIndex].question
      optionFour.textContent = englishArray[currentIndex].optionOne
      optionThree.textContent = englishArray[currentIndex].optionFour
      optionOne.textContent = englishArray[currentIndex].optionTwo
      optionTwo.textContent = englishArray[currentIndex].optionThree
      totalQuestions.textContent = englishArray.length
      console.log(questionId)
          console.log("English Questions")
     }

     if(selection.value === "science") {
    let questionId =scienceArray[currentIndex].id
     currentQuestion.textContent = scienceArray[currentIndex].question
     optionFour.textContent = scienceArray[currentIndex].optionOne
     optionThree.textContent = scienceArray[currentIndex].optionFour
     optionOne.textContent = scienceArray[currentIndex].optionTwo
     optionTwo.textContent = scienceArray[currentIndex].optionThree
     totalQuestions.textContent = scienceArray.length
     console.log(questionId)
          console.log("Science Questions")
     }


     if(selection.value === "physics") {
     let questionId = physicsArray[currentIndex].id
     currentQuestion.textContent = physicsArray[currentIndex].question
     optionFour.textContent = physicsArray[currentIndex].optionOne
     optionThree.textContent = physicsArray[currentIndex].optionFour
     optionOne.textContent = physicsArray[currentIndex].optionTwo
     optionTwo.textContent = physicsArray[currentIndex].optionThree
     totalQuestions.textContent = physicsArray.length
     console.log(questionId)
     console.log("Physics Question")
     }

 
}


// BUTTON SELECTION AND STORAGE OF ANSWERS 
function saveAnswer(questionId, selectedOption) {
   sessionStorage.setItem(`Question ${questionId}`, selectedOption)
}

 const options = document.querySelectorAll(".opt")
options.forEach(function (btn) {
    btn.addEventListener("click", (e)=> {
const styles = e.currentTarget.classList

if (styles.contains("four")) {
   optionFour.style.backgroundColor = "#7c7c7c"

   optionTwo.style.backgroundColor = "#f5f5f5"
   optionOne.style.backgroundColor = "#f5f5f5"
   optionThree.style.backgroundColor = "#f5f5f5"
optionFour.dataset.value = optionFour.textContent
saveAnswer((currentIndex + 1), optionFour.dataset.value)


} else if(styles.contains("three")) {
     optionThree.style.backgroundColor = "#7c7c7c"
     optionFour.style.backgroundColor = "#f5f5f5"
      optionOne.style.backgroundColor = "#f5f5f5"
      optionTwo.style.backgroundColor = "#f5f5f5"
optionThree.dataset.value = optionThree.textContent
saveAnswer((currentIndex + 1), optionThree.dataset.value)


}  else if(styles.contains("two")) {
      optionTwo.style.backgroundColor = "#7c7c7c"
      optionFour.style.backgroundColor = "#f5f5f5"
      optionOne.style.backgroundColor = "#f5f5f5"
      optionThree.style.backgroundColor = "#f5f5f5"
 optionTwo.dataset.value = optionTwo.textContent      
 saveAnswer((currentIndex + 1), optionTwo.dataset.value)


} else if (styles.contains("one")) {
     optionOne.style.backgroundColor = "#7c7c7c"
     optionFour.style.backgroundColor = "#f5f5f5"
      optionTwo.style.backgroundColor = "#f5f5f5"
      optionThree.style.backgroundColor = "#f5f5f5"
 optionOne.dataset.value = optionOne.textContent      
saveAnswer((currentIndex + 1), optionOne.dataset.value)
}


    })
})


// TIMING FUNCTION || TIMER FUNCTIONS

function startTimer() {
  
    if (intervalId) return

    intervalId = setInterval(()=> {
     totalSeconds ++

     const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0")
     const seconds = (totalSeconds % 60).toString().padStart(2, "0")
     

     timer.textContent = `${minutes}:${seconds}`
    }, 1000)
}

function stopTimer() {
     clearInterval(intervalId)
     intervalId = null
     totalSeconds = 0
     timer.textContent = "00:00"
}


function freezeTimer() {
   clearInterval(intervalId)
     intervalId = null
}

// CLEAR INPUT FUNCTION
function clearInput() {
userName.textContent = nameInput.value
nameInput.value = ""
emailInput.value = ""
}



// START GAME BUTTON EVENT LISTENER
startBtn.addEventListener("click", ()=> {
     
     if (nameInput.value === "" || emailInput.value === "" || selection.value === "choose") {
     console.log ("Please Fill in the Required Details")
     }

     else {
     startTest()
     clearInput()
     formSection.classList.add("form-visible")
     questionPage.classList.add("qs-visible")
     startTimer()
     formPage.addEventListener("submit", (event)=> {
     event.preventDefault()
     })
     sessionStorage.clear()
     }

})




// CHECK SCORE OF THE USER WHILE ANSWERING THE QUESTIONS


function checkMathScore() {
let scoreCount = 0
if (sessionStorage.getItem("Question 1") === mathArray[0].answer) {
 scoreCount++
} else {
 
}
if (sessionStorage.getItem("Question 2") === mathArray[1].answer ) {
 scoreCount++
} else {
 
}
if (sessionStorage.getItem("Question 3") === mathArray[2].answer ) {
 scoreCount++
} else {
 
}
if (sessionStorage.getItem("Question 4") === mathArray[3].answer ) {
 scoreCount++
} else {

}
if (sessionStorage.getItem("Question 5") === mathArray[4].answer ) {
scoreCount++
} else {
 
}
if (sessionStorage.getItem("Question 6") === mathArray[5].answer ) {
 scoreCount++
} else {

}
if (sessionStorage.getItem("Question 7") === mathArray[6].answer ) {
 scoreCount++
} else {
 
}
if (sessionStorage.getItem("Question 8") === mathArray[7].answer ) {
 scoreCount++
} else {
 
}
if (sessionStorage.getItem("Question 9") === mathArray[8].answer ) {
 scoreCount++
} else {

}
if (sessionStorage.getItem("Question 10") === mathArray[9].answer ) {
 scoreCount++
} else {
 
}

totalUserScore = scoreCount
}


function checkEnglishScore() {
let scoreCount = 0
if (sessionStorage.getItem("Question 1") === englishArray[0].answer ) {
 scoreCount++
} else {

}
if (sessionStorage.getItem("Question 2") === englishArray[1].answer ) {
  scoreCount++
} else {

}
if (sessionStorage.getItem("Question 3") === englishArray[2].answer ) {
  scoreCount++
} else {
 
}
if (sessionStorage.getItem("Question 4") === englishArray[3].answer ) {
  scoreCount++
} else {
 
}
if (sessionStorage.getItem("Question 5") === englishArray[4].answer ) {
 scoreCount++
} else {

}
if (sessionStorage.getItem("Question 6") === englishArray[5].answer ) {
  scoreCount++
} else {

}
if (sessionStorage.getItem("Question 7") === englishArray[6].answer ) {
 scoreCount++
} else {

}
if (sessionStorage.getItem("Question 8") === englishArray[7].answer ) {
 scoreCount++
} else {

}
if (sessionStorage.getItem("Question 9") === englishArray[8].answer ) {
  scoreCount++
} else {

}
if (sessionStorage.getItem("Question 10") === englishArray[9].answer ) {
  scoreCount++
} else {

}

    totalUserScore = scoreCount
}



function checkScienceScore() {
let scoreCount = 0
   if (sessionStorage.getItem("Question 1") === scienceArray[0].answer ) {
 scoreCount++
} else {
     
}
if (sessionStorage.getItem("Question 2") === scienceArray[1].answer ) {
     scoreCount++
}  else  {
      
}
if (sessionStorage.getItem("Question 3") === scienceArray[2].answer ) {
      scoreCount++
}  else {
      
}
 if (sessionStorage.getItem("Question 4") === scienceArray[3].answer ) {
      scoreCount++

} else  {
      
}
     if (sessionStorage.getItem("Question 5") === scienceArray[4].answer ) {
      scoreCount++
 
} else {
      
}
 if (sessionStorage.getItem("Question 6") === scienceArray[5].answer ) {
     scoreCount++
} 
else {
      
}
 if (sessionStorage.getItem("Question 7") === scienceArray[6].answer ) {
      scoreCount++

} else {
      
}
 if (sessionStorage.getItem("Question 8") === scienceArray[7].answer ) {
      scoreCount++

} else {
      
}
 if (sessionStorage.getItem("Question 9") === scienceArray[8].answer ) {
     scoreCount++

} else {
      
} 
if (sessionStorage.getItem("Question 10") === scienceArray[9].answer ) {
      scoreCount++
 
 } else {
      
 }

    totalUserScore = scoreCount
}


function checkPhysicsScore() {
  let scoreCount = 0
   if (sessionStorage.getItem("Question 1") === physicsArray[0].answer ) {
   scoreCount++
} else {
   
}
 if (sessionStorage.getItem("Question 2") === physicsArray[1].answer ) {
      scoreCount++
}  else {
   
}
 if (sessionStorage.getItem("Question 3") === physicsArray[2].answer ) {
       scoreCount++
}  else {
   
}

 if (sessionStorage.getItem("Question 4") === physicsArray[3].answer ) {
       scoreCount++

} else {
   
}
 if (sessionStorage.getItem("Question 5") === physicsArray[4].answer ) {
        scoreCount++
 
} else {
   
}
if (sessionStorage.getItem("Question 6") === physicsArray[5].answer ) {
       scoreCount++
} 
else {
   
}
if (sessionStorage.getItem("Question 7") === physicsArray[6].answer ) {
       scoreCount++

} else {
   
}
if (sessionStorage.getItem("Question 8") === physicsArray[7].answer ) {
        scoreCount++

} else {
   
}
if (sessionStorage.getItem("Question 9") === physicsArray[8].answer ) {
     scoreCount++

} else {
   
}
 if (sessionStorage.getItem("Question 10") === physicsArray[9].answer ) {
        scoreCount++
 } else{

 }

    totalUserScore = scoreCount
}



// NEXT BUTTON FUNCTIONS
function nextQuestion() {
     currentIndex++
     if (currentIndex >= mathArray.length) {
      return
     }
     startTest()
     optionFour.style.backgroundColor = "#f5f5f5"
     optionTwo.style.backgroundColor = "#f5f5f5"
     optionOne.style.backgroundColor = "#f5f5f5"
     optionThree.style.backgroundColor = "#f5f5f5"
      
}

// NEXT BUTTON EVENT LISTENER

nextBtn.addEventListener("click", () => {
     nextQuestion()
    
} )


// SUBMIT EVENT LISTENER

submitBtn.addEventListener("click", ()=>{
freezeTimer()
formSection.classList.add("form-visible")
questionPage.classList.remove("qs-visible")
scoreSection.classList.add("show-score")

if (selection.value === "maths") {
     checkMathScore()
    
} else if (selection.value === "english" ) {
  checkEnglishScore()
 
} else if (selection.value === "science") {
     checkScienceScore()
     
} else {
     checkPhysicsScore()
     
}
 
userScore.textContent = totalUserScore
})

// RESET EVENT LISTENER
resetBtn.addEventListener("click", ()=> {
stopTimer()
currentIndex = 0
userName.textContent = ""
formSection.classList.remove("form-visible")
questionPage.classList.remove("qs-visible")
 sessionStorage.clear()
     })



// NEW GAME EVENT LISTENER

newGameBtn.addEventListener("click", ()=> {
stopTimer()
userName.textContent = ""
currentIndex = 0
questionPage.classList.remove("qs-visible")
scoreSection.classList.remove("show-score")
formSection.classList.remove("form-visible")
sessionStorage.clear()

})
