import fs from 'fs'
import underscoreEsm, {forEach} from "underscore";

export const chooseRandom = (array = [], numItems) => {
    if (array.length === 0 || array.length === 1) {
        return array;
    }
    if (numItems < 1 || numItems > array.length) {
        numItems = Math.floor(Math.random() * array.length);
    }
    const x = array.length - numItems;
    for (let i = 0; i < x; i++) {
        let randomIndex = Math.floor(Math.random() * array.length);
        array.splice(randomIndex, 1);
    }
    return array;
}

export const createPrompt = ({numQuestions = 1, numChoices = 2} = {}) => {
    let array = [];
    const type = 'input';
    for (let i = 0; i < numQuestions; i++) {
        let question = {
            type: type,
            name: `question-${i + 1}`,
            message: `Enter question ${i + 1}`
        }
        array.push(question);

        for (let j = 0; j < numChoices; j++) {
            let choice = {
                type: type,
                name: `question-${i + 1}-choice-${j + 1}`,
                message: `Enter answer choice ${j + 1} for question ${i + 1}`
            }
            array.push(choice);
        }
    }
    return array;
}

export const createQuestions = (input = {}) => {
    let result = [];
    let questions = [];
    let choices = [];
    const type = "list";
    for (const inputKey in input) {
        let stringsArray = inputKey.split("-");
        if (stringsArray.length === 2) {
            questions.push(inputKey);
        }
        if (stringsArray.length === 4) {
            choices.push(inputKey);
        }
    }
    questions.forEach(question => {
        let questionForResult = {
            type: type,
            name: question,
            message: input[question],
            choices: []
        }
        const numberOfQuestion = question.split("-")[1];
        choices.forEach(choice => {
            if (numberOfQuestion === choice.split("-")[1]) {
                questionForResult.choices.push(choice);
            }
        })
        result.push(questionForResult);
    });
    return result;

}

export const readFile = path =>
    new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)))
    })

export const writeFile = (path, data) =>
    new Promise((resolve, reject) => {
        fs.writeFile(path, data, err =>
            err ? reject(err) : resolve('File saved successfully')
        )
    })
