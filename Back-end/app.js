let http = require('http');
let url = require('url');
let mysql = require('mysql');

const GET = "GET";
const PUT = "PUT";
const POST = "POST";
const OPTIONS = "OPTIONS"
const update1 = "UPDATE question SET qdesc = '";
const update2 = "' WHERE qid = '";
const update3 = "'";
const update4 = "UPDATE answer SET ansdesc = '";
const update5 = "', correct = '";
const update6 = "'  WHERE ansid = '";
const trueValue = "1";
const falseValue = "0";
const insert1 = "INSERT INTO question (qdesc) VALUES ('";
const insert2 = "')";
const insert3 = "INSERT INTO answer (qid, ansdesc, correct) VALUES ('";
const insert4 = "', '";
const select1 = "SELECT * FROM question";
const select2 = "SELECT * FROM answer WHERE qid = '";
const mainMSG = "Invalid";

let con = mysql.createConnection({
    host: "localhost",
    user: "ambermac_amb3r45",
    password: "cHPr?(NE!ps9",
    database: "ambermac_quiz"
});

let server = http.createServer(function(req, res) {
    
    if(req.method === PUT || req.method === OPTIONS){
        let string = "";
        req.on('data', chunk =>{
            string += chunk.toString();
        });
        req.on('end', () => {
            let parsed = JSON.parse(string);
            let sql = update1 + parsed.Question.Qdesc + update2 + parsed.Question.Qid + update3;
            con.query(sql, function(err, result, fields){
                if (err) throw err;
                for(let i = 0; i < parsed.Answer.length; i++){
                    let string2;
                    if(parsed.Answer[i].Corr == true){
                        string2 = trueValue;
                    } else {
                        string2 = falseValue;
                    }
                    let sql2 = update4 + parsed.Answer[i].AnsDesc + update5 + string2 + update6 + parsed.Answer[i].AnsId + update3;
                    con.query(sql2, function(err2, result2, fields2){
                        if (err2) throw err;
                    });
                    if(i == (parsed.Answer.length - 1)){
                        res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin':'*'});
                        res.write("Update Successful!");
                        res.end();
                    }
                }
            });
        });
   } else if(req.method === POST){
        let body = '';
        req.on('data', chunk =>{
            body += chunk.toString();
        });
        req.on('end', () => {
            let parsed = JSON.parse(body);
            let sql = insert1 + parsed.Question + insert2;
            con.query(sql, function(err, result, fields){
                if (err) throw err;
                let parseAns = parsed.Answers;
                let parseCor = parsed.Correct;
                for(let i = 0; i < parseAns.length; i++){
                    let string;
                    if(parseCor[i] == true){
                        string = trueValue;
                    } else {
                        string = falseValue;
                    }
                    let sql2 = insert3 + result.insertId + insert4 + parseAns[i] + insert4 + string + insert2;
                    con.query(sql2, function(err2, result2, fields2){
                        if(err2) throw err;
                    });
                    if(i == (parseAns.length - 1)){
                        res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin':'*'});
                        res.write("Write Successful");
                        res.end();
                    }
                }
            });
        });
   }
   else if(req.method === GET){
        let sql = select1;
        con.query(sql, function(err, result, fields){
            let quesAr = [];
            if (err) throw err;
            var count= Object.keys(result).length;
            for(let i = 0; i < count; i++){
                let object = {"Qid" : result[i].qid, "Qdesc" : result[i].qdesc};
                let ansAr = [];
                let sql2 = select2 + result[i].qid + update3;
                con.query(sql2, function(err2, result2, fields2){
                    if (err2) throw err;
                    var count2= Object.keys(result2).length;
                    for(let j = 0; j < count2; j++){
                        let object2 = {"AnsId" : result2[j].ansid, "AnsDesc" : result2[j].ansdesc, "Corr" : result2[j].correct}
                        ansAr.push(object2);
                    }
                    let object3 = {"Question" : object, "Answer" : ansAr};
                    quesAr.push(object3);
                    if(i == (count - 1)){
                        let parsed = JSON.stringify(quesAr);
                        res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin':'*'});
                        res.write(parsed);
                        res.end();
                    }
                });
            }
            if(count == 0){
                res.writeHead(200, {'Content-Type' : 'text/plain', 'Access-Control-Allow-Origin' : '*'});
                res.write("Nothing");
                res.end();
            }
        });
   } else {
         
        res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin':'*'});
        res.write(mainMSG);
        res.end();
     
   }
  
});

server.listen();
