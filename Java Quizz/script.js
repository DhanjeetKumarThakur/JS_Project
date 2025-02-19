/*
Few important things we needed 
- Global variables like Score (To hold the score), myQuestionList (to hold stores with options), 
and index (to show which question is need to display).

- functions like gameStart, createQuestion, createOptions and endGame


*/

let myQuestionList = [
    {
        Question: 'Lambda feature introduced in which of java version?',
        options : [
            {
                option: 'java 6',
                class: 'wrong'
            },
            {
                option: 'java 7',
                class: 'wrong'
            },
            {
                option: 'java 8',
                class: 'correct'
            },
            {
                option:'None of the above',
                class: 'wrong'
            }
        ]
    },
    {
        Question: 'Which of the below feature was introduced in Java 8.',
        options : [
            {
                option: 'Method Reference',
                class: 'wrong'
            },
            {
                option: 'Lambda Expression',
                class: 'wrong'
            },
            {
                option: 'Functional Interface',
                class: 'wrong'
            },
            {
                option: 'All of the options',
                class: 'correct'
            }
        ]

    },
    {
        Question: 'Correct syntax of Method Reference to call a static Method',
        options : [
            {
                option: 'ClassName:methodName()',
                class: 'wrong'
            },
            {
                option: 'new Class().methodName()',
                class: 'wrong'
            },
            {
                option: 'ClassName:: MethodName()',
                class: 'wrong'
            },
            {
                option: 'ClassName:: MethodName',
                class: 'correct'
            }
        ]

    },
    {
        Question: 'What is FunctionalInterface ?.',
        options : [
            {
                option: 'A interface which consist of more than one abstract method',
                class: 'wrong'
            },
            {
                option: 'A interface with one default method',
                class: 'wrong'
            },
            {
                option: 'A interface with one default & one static method',
                class: 'wrong'
            },
            {
                option: 'A interface which consists of only one abstract and can consist any number of default or static method',
                class: 'correct'
            }
        ]

    },
    {
        Question: 'True or False. Functional interface must be annotated with @FunctionalInterface.',
        options : [
            {
                option: 'True',
                class: 'wrong'
            },
            {
                option: 'False',
                class: 'correct'
            }
        ]

    },
    {
        Question: 'Why we need FunctionalInterface ?.',
        options : [
            {
                option: 'To envoke lambda expresion',
                class: 'correct'
            },
            {
                option: 'To envoke default method',
                class: 'wrong'
            },
            {
                option: 'To envoke static method',
                class: 'wrong'
            },
            {
                option: 'None of the above',
                class: 'wrong'
            }
        ]

    }
]


let score = 0; 
let index = 0;

document.querySelector('.start').addEventListener('click', gameStart)

function gameStart(){
    console.log('Game Started!!')

    createQuestion(myQuestionList, index);
}

function endGame(){
    //first element the document body to display score message.
    document.body.innerHTML = ''
    
    console.log('End Game')

    let message = document.createElement('h1');
    message.innerText = `You have scored ${score}/${myQuestionList.length}`
    message.style.textAlign ='center';
    document.body.appendChild(message);

}

function createQuestion(listOfQuestions, index){
    if(index >= listOfQuestions.length){
        return endGame();
    }else{
        //empty the document body to display Question & options
        document.body.innerHTML =''

        //create a div tag to hold Question and options all together
        let divTag = document.createElement('div');

        //create a h3 tag to store question
        let questionTag = document.createElement('h3');
        questionTag.innerText = `${listOfQuestions[index].Question}`

        //Now we need options
       let options = createOptions(listOfQuestions[index].options, index);

       //Now we need a Submit Button
       let submitButton = document.createElement('button');
       submitButton.setAttribute('type', 'submit');
       submitButton.innerText = 'Submit';

       submitButton.addEventListener('click', ()=> validateAnswer(index))

       //create a next button
       let nextButton = document.createElement('button');
       nextButton.setAttribute('type', 'button');
       nextButton.innerText = 'Next';
       nextButton.disabled = true;
       nextButton.style.display = 'None';
       nextButton.addEventListener('click', ()=> createQuestion(listOfQuestions, ++index));

       //append
       divTag.appendChild(questionTag);
       divTag.appendChild(options);
       divTag.appendChild(submitButton);
       divTag.appendChild(nextButton);

       document.body.appendChild(divTag);
    }
}

function createOptions(arrayOfOptions, index){
    //We need a section tag or div tag to hold all options together
    let sectionTag = document.createElement('section');

    for(let i = 0; i<arrayOfOptions.length;i++){
        //create a wrapper to hold radio button and label alltogether
        let wrapper = document.createElement('div');
        wrapper.style.display='flex';
        wrapper.style.alignItems = 'center';


        //create a radio button
        let radiobutton = document.createElement('input');
        radiobutton.setAttribute('type', 'radio');
        radiobutton.setAttribute('name', `option${index}`); //to make name unique
        radiobutton.setAttribute('id','option');
        radiobutton.setAttribute('value', `${arrayOfOptions[i].option}`)
        radiobutton.setAttribute('class', `${arrayOfOptions[i].class}`);

        //label tag
        let labelTag = document.createElement('label');
        labelTag.setAttribute('for', 'option');
        labelTag.style.fontSize = '25px';
        labelTag.innerText = `${arrayOfOptions[i].option}`;

        //append radiobutton, labeltag under wrapper
        wrapper.appendChild(radiobutton);
        wrapper.appendChild(labelTag);

        //append wrapper to sectionTag
        sectionTag.appendChild(wrapper);
    }

    return sectionTag;
}

function validateAnswer(index){
    let options = document.getElementsByName(`option${index}`);

    console.log(options) //NodeList

    let selectedOption = null;
    let correctOption = null;

    options.forEach(option =>{
        //check if option is selected
        if(option.checked){
            selectedOption = option;
        }

        //check if option dom contain any correct value
        if(option.classList.contains('correct')){
            correctOption = option;
        }
    })

    //What if no option is selected
    if(!selectedOption){
        alert('Please select correct option')
        return
    }

    //HighLight the selected option
    if(selectedOption.classList.contains('correct')){
        score++;
        selectedOption.nextElementSibling.style.color = 'green';
    }else{
        selectedOption.nextElementSibling.style.color = 'red';
    }

    //HighLight the correct option even if not selected
    if(correctOption){
        correctOption.nextElementSibling.style.color = 'green';
    }

    // Enable the "Next" button to move to the next question
   // document.querySelector('button[type="button"]').disabled = false;

    // Enable and display the "Next" button after validating the answer
    let nextButton = document.querySelector('button[type="button"]');
    nextButton.disabled = false;  // Enable the "Next" button
    nextButton.style.display = 'inline-block';  // Make the button visible
}