const apiURL = "https://amberma2.com/COMP4537/labs/6/labAPI";
const GET = "GET";
const noQuest = "No Questions Exist Yet";
const questLis = "questionList";
const nothing = "Nothing";
const qName = "questName";
const divValue = "div";
const h2Value = "h2";
const pValue = "p";
const labValue = "label";
const inptValue = "input";
const brValue = "br";
const buttonValue = "button";
const qt = "quest";
const capQues = "Question ";
const rad = "radio";
const sub = "Submit";
const sub2 = "submit";
const text2 = "Score is: ";
const text3 = "/";

let score = 0;
let totalQuestion = 0;
let xhttp = new XMLHttpRequest();

xhttp.open(GET, apiURL, true);
xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        let gottenData = this.responseText;
        console.log(gottenData);
        if(gottenData == nothing){
            document.getElementById(questLis).innerHTML = noQuest;
        } else {
            let jsonData = JSON.parse(gottenData);
            totalQuestion = jsonData.length;
            //console.log(jsonData);
            for(let i = 0; i < jsonData.length; i++){
                let object = jsonData[i];
                let number = i + 1;
                let name = qName + number;
                let questSpace = document.createElement(divValue);
                questSpace.id = qt;
                let questTitle = document.createElement(h2Value);
                let questPara = document.createElement(pValue);
                let titletext = document.createTextNode(capQues + number);
                let paraText = document.createTextNode(jsonData[i].Question.Qdesc);
                questPara.appendChild(paraText);
                questTitle.appendChild(titletext);
                questSpace.appendChild(questTitle);
                questSpace.appendChild(questPara);
                document.getElementById(questLis).appendChild(questSpace);
                for(let j = 0; j < jsonData[i].Answer.length; j++){
                    let label2 = document.createElement(labValue);
                    let labelText = document.createTextNode(jsonData[i].Answer[j].AnsDesc);
                    let inpt = document.createElement(inptValue);
                    let breaker = document.createElement(brValue);
                    inpt.type = rad;
                    inpt.value = jsonData[i].Answer[j].Corr;
                    inpt.name = name;
                    label2.appendChild(labelText);
                    questSpace.appendChild(label2);
                    questSpace.appendChild(inpt);
                    questSpace.appendChild(breaker);
                }
                console.log(object);
            }
            let subButton = document.createElement(buttonValue);
            let subText = document.createTextNode(sub);
            subButton.appendChild(subText);
            subButton.id = sub2;
            subButton.onclick = function(){
                for(let k = 0; k < jsonData.length; k++){
                    let number = k + 1;
                    let value = document.getElementsByName(qName + number);
                    for(let b = 0; b < value.length; b++){
                        if(value[b].checked){
                            if(value[b].value == true){
                                score++;
                            }
                            break;
                        }
                    }
                    console.log(value);
                }
                //console.log("Score is: " + score + "/" + totalQuestion);
                let sub = document.getElementById(sub2);
                sub.remove();
                let final_val = document.createElement(pValue);
                let final_text = document.createTextNode(text2 + score + text3 + totalQuestion);
                final_val.appendChild(final_text);
                document.getElementById(questLis).appendChild(final_val);
                alert(text2 + score + text3 + totalQuestion);
            }
            document.getElementById(questLis).appendChild(subButton);
        }    
    }
}
xhttp.send();