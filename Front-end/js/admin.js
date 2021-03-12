const apiURL = "https://amberma2.com/COMP4537/labs/6/labAPI";
const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const input = "inpt";
const check = "check";
const checker = "checker";
const nothing = "Nothing";
const radio = "radio";
const divVal = "div";
const h2Val = "h2";
const textaVal = "textarea";
const questVal = "Question ";
const brVal = "br";
const inputVal = "input";
const buttonVal = "button";
const upText = "Update Question";
const upText2 = "update";
const newQuestValue = "newQuestion";
const createf1 = "<h3>New Question</h3>";
const createf2 = "<textarea id='newDesc' placeholder='Question Description'></textarea>";
const createf3 = "<br/>";
const createf4 = "<p id='ar";
const createf5 = "'>Answer ";
const createf6 = ":</p> <textarea id='ans";
const createf7 = "'> </textarea>";
const createf8 = "<input type='radio' name='potAns' id='check";
const createf9 = "'";
const createf10 = "qOptions";
const createf11 = "<button id='newAnswer'>Add New Answer</button>";
const createf12 = "<button id='removeAnswer'>Delete Last Answer</button";
const createf13 = "<button id='newSubmit'>Submit New Question</button>";
const createf14 = "newSubmit";
const createf15 = "newDesc";
const createf16 = "ans";
const createf17 = "newAnswer"
const createf18 = "p";
const createf19 = "potAns";
const createf20 = "ar";
const createf21 = "Answer ";
const createf22 = ":";
const createf23 = " Is Correct? : ";
const createf24 = "createQuestion";
const createf25 = "removeAnswer";
const questTextVal = "questions";
const cq = "Create Question";

//Question Editor Creation
function loadQuestions(){
    let xhttp = new XMLHttpRequest();
    xhttp.open(GET, apiURL, true);
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            if(this.responseText == nothing){
            } else {
                let gottenData = JSON.parse(this.responseText);
                for(let i = 0; i < gottenData.length; i++){
                    //Data From SQL
                    let ansArray = gottenData[i].Answer;
                    let questionId = gottenData[i].Question.Qid;
                    let questionDesc = gottenData[i].Question.Qdesc;
                    let number = i + 1;
                    //Create Section Data
                    let mainDiv = document.createElement(divVal);
                    let mainTitle = document.createElement(h2Val);
                    let mainQuest = document.createElement(textaVal);
                    let titleText = document.createTextNode(questVal + number);
                    let questText = document.createTextNode(questionDesc);
                    document.getElementById(questTextVal).appendChild(mainDiv);
                    mainTitle.appendChild(titleText);
                    mainQuest.appendChild(questText);
                    mainDiv.appendChild(mainTitle);
                    mainDiv.appendChild(mainQuest);
                    mainDiv.appendChild(document.createElement(brVal));
                    for(let j = 0; j < ansArray.length; j++){
                        let ansTextArea = document.createElement(textaVal);
                        let ansTextAreaText = document.createTextNode(ansArray[j].AnsDesc);
                        ansTextArea.appendChild(ansTextAreaText);
                        ansTextArea.id = input + number + j;
                        let ansInput = document.createElement(inputVal);
                        ansInput.id = check + number + j;
                        ansInput.name = checker + number;
                        ansInput.type = radio;
                        ansInput.checked = ansArray[j].Corr;
                        mainDiv.appendChild(ansTextArea);
                        mainDiv.appendChild(ansInput);
                        mainDiv.appendChild(document.createElement(brVal));
                    }
                    let updateButton = document.createElement(buttonVal);
                    let textButton = document.createTextNode(upText);
                    updateButton.id = upText2;
                    updateButton.appendChild(textButton);
                    updateButton.onclick = function(){
                        
                        let newArr = [];
                        
                        for(let j = 0; j < ansArray.length; j++){
                            let descriptionVal = document.getElementById(input + number + j).value;
                            let corVal = document.getElementById(check + number + j).checked;
                            let anObj = {"AnsId": ansArray[j].AnsId, "AnsDesc": descriptionVal, "Corr": corVal};
                            newArr.push(anObj);
                        }
                        
                        let newObj = {"Question":{"Qid": questionId, "Qdesc": questionDesc}, "Answer": newArr};
                        
                        let string = JSON.stringify(newObj);
                        
                        let xhttp2 = new XMLHttpRequest();
                        xhttp2.open(PUT, apiURL, true)
                        xhttp2.onreadystatechange = function(){
                            if(this.readyState == 4 && this.status == 200){
                                console.log(this.responseText);
                            }
                        }
                        xhttp2.send(string);
                    }
                    mainDiv.appendChild(updateButton);
                }
                
            }
        }
    }
    xhttp.send();
}

loadQuestions();

//New Question Creation

let ansNum = 1;
let ansArray = [];
let corArray = [];
let createFunc = function(){
    document.getElementById(newQuestValue).innerHTML = createf1
    + createf2
    + createf3
    + createf4 + ansNum + createf5 + ansNum + createf6 + ansNum + createf7
    + createf8 + ansNum + createf9
    + createf3
    + createf4 + (ansNum + 1) + createf5 + (ansNum + 1) + createf6 + (ansNum + 1) + createf7
    + createf8 + (ansNum + 1) + createf9
    + createf3;
    ansNum++;
    document.getElementById(createf10).innerHTML = createf11
    + createf3
    + createf12
    + createf3
    + createf13
    + createf3;
    ansNum++;
    document.getElementById(createf14).onclick = function(){
        
        let hasOneCheck = 0;
        let hasNull = 0;
        let questionNull = 0;
        
        if(document.getElementById(createf15).value !== ""
        || document.getElementById(createf15).value !== null){
                        
            for(let i = 1; i < ansNum; i++){
                let val = document.getElementById(createf16 + i).value;
                let val2 = document.getElementById(check + i).checked;
                if(val2 === true){
                    hasOneCheck = 1;
                }
                if(val === "" || val === null){
                    hasNull = 1;
                }
                let index = i - 1;
                ansArray[index] = val;
                corArray[index] = val2;
            }
            if(hasOneCheck == 1){
                if(hasNull == 0){
                    let questionValue = document.getElementById(createf15).value;
                    
                    let mainObj = {"Question" : questionValue,
                                    "Answers" : ansArray,
                                    "Correct" : corArray};
                    console.log(mainObj);
            
                    let arString = JSON.stringify(mainObj);
                    let xhttp = new XMLHttpRequest();
                    xhttp.open(POST, apiURL, true);
                    xhttp.setRequestHeader("Content-Type", "text/plain");
                    xhttp.onreadystatechange = function(){
                        if(this.readyState == 4 && this.status == 200){
                            console.log(this.responseText);
                            let value = document.getElementById(newQuestValue);
                            let value2 = document.getElementById(createf10);
                            value.innerHTML = "";
                            value2.innerHTML = "";
                            loadQuestions();
                            let newButt = document.createElement(buttonVal);
                            newButt.id = createf24;
                            let buttText = document.createTextNode(cq);
                            newButt.appendChild(buttText);
                            document.getElementById(newQuestValue).appendChild(newButt);
                            document.getElementById(createf24).onclick = createFunc;
                            ansNum = 1;
                            ansArray = [];
                            corArray = [];
                        }
                    }
                    xhttp.send(arString);
                } else {
                    console.log("All answers must have a description");
                }
            } else {
                console.log("You must have an answer listed as correct");
            }
        } else {
            console.log("Question needs a description");
        }
    }
    document.getElementById(createf17).onclick = function(){
        if(ansNum < 5){
            let ansArea = document.createElement(createf18);
            let ansCode = document.createElement(textaVal);
            let ansCorr = document.createElement(inputVal);
            ansCorr.type = radio;
            ansCorr.name = createf19;
            ansCorr.id = check + ansNum;
            ansCode.id = createf16 + ansNum;
            ansArea.id = createf20 + ansNum;
            let ansText = document.createTextNode(createf21 + ansNum + createf22);
            let labText = document.createTextNode(createf23);
            ansArea.appendChild(ansText);
            ansNum++;
            document.getElementById(newQuestValue).appendChild(ansArea);
            document.getElementById(newQuestValue).appendChild(ansCode);
            document.getElementById(newQuestValue).appendChild(ansCorr);
        } else {
            console.log("You are only allowed to have 4 answers!");
        }
    }
    document.getElementById(createf25).onclick = function(){
        if(ansNum != 3){
            ansNum--;
            document.getElementById(createf20 + ansNum).remove();
            document.getElementById(check + ansNum).remove();
            document.getElementById(createf16 + ansNum).remove();
        } else {
            console.log("You must have at least 2 answers");
        }
    };
};
document.getElementById(createf24).onclick = createFunc;