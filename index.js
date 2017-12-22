//question:
//1. keyboard is unable to shift through choices due to the nature of grouping

const STORE = {
		questions: [
					{question: 'What was the date when Steve Jobs presented the first iPhone?', 
					  choices: ['January 9th, 2007','September 4th, 2006','July 4th, 2008','October 31st, 2007'],
					   answer: 0},
					{question: 'What was the screen size of the first iPhone?',
					  choices: ['3.5"','4.7"','5.5"','9.7"'],
					   answer: 0},
					{question: '2011 was a notable year for iPhone with the demise of Steve Jobs. Also, what feature was introduced with iPhone 4S?',
					  choices: ['Retina Display','Siri','3D Touch','Live Photos'],
					   answer: 1},
					{question: 'iPhone 6 and iPhone 6 Plus both released in 2014. What are their screen sizes?',
					  choices: ['3.5” and 4.7”','4.7” and 5.5”','5.5” and 7.9”','5.5” and 9.7”'],
					   answer: 1},
					{question: 'What color was first introduced in 2015 for iPhone 6S and iPhone 6S Plus?',
					  choices: ['Space Grey','Rose gold','Red','Jet Black'],
					   answer: 1},
					{question: 'What was the major change in iPhone 7?',
					  choices: ['Gorilla glass','Lightning connector','Retina display','Headphone Jack’s removal'],
					   answer: 3},
					{question: 'Which iPhone had a polycarbonate body but failed to impress although it was an affordable iPhone release?',
					  choices: ['iPhone 3G','iPhone 4S','iPhone 5C','iPhone SE'],
					   answer: 2},
					{question: 'How many iPhones have been sold in 10 years?',
					  choices: ['293 million','881 million','1.2 billion','4.7 billion'],
					   answer: 2},
					{question: 'What percentage of all Apple revenue does iPhone generate?',
					  choices: ['9%','36%','63%','97%'],
					   answer: 2},
		
					{question: 'How many iPhone apps can iPhone users choose from today?',
					  choices: ['0.3 million','2.2 million','56.6 million','130.5 million'],
					   answer: 1}],
	questionCount: 0,
	 correctCount: 0
};

function renderHome() {
	$('.js-header').html(`
		<h1>TAKE THE QUIZ:</h1>`);
	$('.js-content').html(`
		<p>How much of an Apple iPhone fanboy/girl are you?</p>
		<h3>"We're going to make some history together today."</h3>
		<p>10 years ago, with those words on January 9, 2007, Steve Jobs kicked off his presentation at Macworld, San Francisco to awe the world by unveiling the revolutionary product:</p>
		<h3 class="header-iphone">iPhone</h3>`);
	$('.home').html(`<p>Press Home to unlock</p>`);
	$('.bottom').html(`<button aria-label="home" class="home-button js-start"></button>`);
}

function startQuiz() {
	$('.bottom').on('click', '.js-start', event => {
		STORE.questionCount = 0;
		STORE.correctCount = 0;
		renderQuizApp(0);
	});
}

function generateQuestion(qCount) {
	const question = STORE.questions[qCount].question;
	return `<h1>`+(qCount+1)+`. `+question+`</h1>`;
}

function generateChoice(choice, index) {
	return `<label class="js-id_${index}" for="id_${index}"><input type="radio" id="id_${index}" name="radioChoice" value="${choice}" class="js-choice">${choice}</label><br class="br_${index}">`;
}

function generateChoicesString (choiceList) {
	const choices =	choiceList.map((choice, index) => generateChoice(choice, index)); 
	return choices.join("");
}

function generateButtons (qCount) {
	let buttons = "";

	if (qCount < STORE.questions.length-1) {
		buttons += `<button class="js-quiz-next">Next</button>`;
	}
	else if (qCount === STORE.questions.length-1) {
		buttons += `<button class="js-quiz-done">Score</button>`;
	}

	return buttons;
}

function generateProgress(qCount) {
	const percentLeft = 100*(1-(qCount+1)/STORE.questions.length);
	return `<p>`+Math.round(percentLeft)+`% remaining</p>`;
}

function renderQuizApp(qCount) {
		//Render quiz question
		$('.js-header').html(generateQuestion(qCount));
		//Render quiz choices 
		$('.js-quiz-form').html(generateChoicesString(STORE.questions[qCount].choices));
		
		$('.js-content').html('');
		//Render quiz buttons
		$('.js-button').html(generateButtons(qCount));
		//Render quiz progress track
		$('.js-status').html(generateProgress(qCount));

		$('.home').html(`<p>Press Home to restart</p>`);
}

function handleChoiceSelect() {
	$('.js-quiz-form').on('change', 'input[name="radioChoice"]', event => {
		const answerIndex = STORE.questions[STORE.questionCount].answer;
		const choiceSelectIndex = $('input[name="radioChoice"]:checked').index('input[name="radioChoice"]');

		if (choiceSelectIndex === answerIndex) {
			$('.js-id_'+choiceSelectIndex).addClass('js-choice-correct');
			$('.br_'+choiceSelectIndex).before("<span> Correct! </span>");

			STORE.correctCount++;
		} 
		else {
			$('.js-id_'+choiceSelectIndex).addClass('js-choice-wrong');
			$('.js-id_'+answerIndex).addClass('js-choice-correct');
			$('.br_'+choiceSelectIndex).before("<span> Wrong! </span>");
		}

		$('.js-choice').attr('disabled', 'disabled');
		console.log('correct count is '+STORE.correctCount);
	});
}

function handleNextQuestion() {
	$('.js-button').on('click', '.js-quiz-next', event => {
		console.log('next button is clicked!');

		STORE.questionCount++;
		renderQuizApp(STORE.questionCount);
	});
}

function renderQuizResult() {
	$('.js-button').on('click', '.js-quiz-done', event => {
		$('.js-header').html('<h1>You got '+STORE.correctCount+'/'+STORE.questions.length+' answers correct.</h1>');	
		$('.js-quiz-form').html('');
		
		if (STORE.correctCount < 8) {
			$('.js-content').html(`<p>On the plus side, that probably means you don't spend too much time on your iPhone :)</p>`);
		} 
		else {
			$('.js-content').html(`<p>You are a true iPhone fan! You probably spend too much time on your iPhone :)</p>`);
		}
	});	
}

function handleQuizApp() {
	renderHome();
	startQuiz(); //reset goes here also
	handleChoiceSelect();
	handleNextQuestion();
	renderQuizResult();
}

$(handleQuizApp);