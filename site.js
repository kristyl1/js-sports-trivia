
// import the utility functions "decodeHtml" and "shuffle"
import { decodeHtml, shuffle } from './utils.js' 

// get the elements from the DOM
const questionElement = document.querySelector('#question')
const answersElement = document.querySelector('#answers')
const nextQuestionElement = document.querySelector('#nextQuestion')

// IIFE (so we can use async/await)
;(async () => {

	// todo: create your "getNextQuestion" function
	const getNextQuestion = async () => {
		//Use the OpenTDB API URL
		const url = 'https://opentdb.com/api.php?amount=1&category=21&difficulty=easy&type=multiple'
		//Fetch the url
		const response = await fetch(url)
		//Parse the JSON response into a variable called json
		const json = await response.json()
		//Extract the question, correct answer, and incorrect answer
		const { question, correct_answer: correct, incorrect_answers: incorrect } = json.results[0]
		const answers = shuffle([ ...incorrect, correct ])
		//return the results
		return { question, answers, correct }
	}
	//TEST getNextQuestion
	//console.log(await getNextQuestion())

	// todo: create your "renderQuestion" function
	const renderQuestion = ({ question, answers, correct }) => { 
		console.log({ question, answers, correct});
		//Display the question on the page 
		questionElement.textContent = decodeHtml(question)
		//Display the answers on the page, clear out any elemnts from previous - set innerHTML to empty string. 
		//answersElement.textContent = (answers)
		answersElement.innerHTML = '';
		//Use a forEach loop to create a new button element for each answer
		answers.forEach(answer => {
			const button = document.createElement('button')
			//Set text content to the answer
			button.textContent = decodeHtml(answer);
			
			//Add click event listner to the button
			button.addEventListener('click', () => {
				if (answer === correct) {
					button.classList.add('correct')
					answersElement.querySelectorAll('button').forEach(b => b.disabled = true)
					alert('Correct!')
					return
				}
				
				button.disabled = true
				alert('Incorrect!')
				
			})
			answersElement.appendChild(button)
		})
	}
	//Get renderQUestion display to the page, returned from the getNextQuewstion
	const getQuestion = async () => {
		const trivia = await getNextQuestion();
		renderQuestion(trivia)

		console.log(trivia)
	}
	getQuestion();


	// todo: add the event listener to the "nextQuestion" button
	const nextQuestionElement = document.querySelector('#nextQuestion')
	nextQuestionElement.addEventListener('click', async () => {
		renderQuestion(await getNextQuestion())
		nextQuestionElement.disabled = true
		setTimeout(() => nextQuestionElement.disabled = false, 10000)

	})
	

})()

// mimic a click on the "nextQuestion" button to show the first question
nextQuestionElement.click()
