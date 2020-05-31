
let http = require('http');
let express = require('express');
let bodyParser = require('body-parser');
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');
let app = express();

var request = require('request');

var server= http.createServer(app);
var socket = require('socket.io');
var io = socket(server);

var moment = require('moment');


io.set('transports', ['websocket', 'xhr-polling', 'jsonp-polling', 'htmlfile', 'flashsocket']);
io.set('origins', '*:*');
var cors = require('cors');
// CORS 설정
app.use(cors());


let port = 3010;

let path = require('path');

app.use(bodyParser.urlencoded({extended: false}));


//let gold1 = platinum

let challenger = 0.021
let grandmaster=challenger+0.048
let master=grandmaster+0.029
let diamond1=master+ 0.18
let diamond2= diamond1+0.32
let diamond3 = diamond2+ 0.53
let diamond4 = diamond3 + 1.3

let platinum1 = diamond4 + 0.92
let platinum2 = platinum1+1.2
let platinum3 = platinum2 +1.4
let platinum4 = platinum3 +3.4

let gold1 = platinum4 + 3.0
let gold2 = gold1 + 4.5
let gold3 = gold2 + 5.7
let gold4 = gold3 + 9.1

let silver1 = gold4 + 6.9
let silver2 = silver1 + 9.4
let silver3 = silver2 + 9.4
let silver4 = silver3 + 10

let bronze1 = silver4 + 7.3
let bronze2 = bronze1 + 5.9
let bronze3 = bronze2 + 4.4
let bronze4 = bronze3 + 5.6

let iron1 = bronze4 + 3.7
let iron2 = iron1 + 2.3
let iron3 = iron2 + 1.2
let iron4 = iron3+ 0.44


global.challenger;
global.grandmaster;
global.master;
global.diamond1;
global.diamond2;
global.diamond3;
global.diamond4;
global.platinum1;
global.platinum2;
global.platinum3;
global.platinum4;
global.gold1;
global.gold2;
global.gold3;
global.gold4;
global.silver1;
global.silver2;
global.silver3;
global.silver4;
global.bronze1;
global.bronze2;
global.bronze3;
global.bronze4;
global.iron1;
global.iron2;
global.iron3;
global.iron4;




let avgarr = new Array();
global.avgarr;
let mostbalance=999.9999;
global.mostbalance;
let mostbalanceteam1 = new Array();
global.mostbalanceteam1;
let mostbalanceteam2 = new Array();
global.mostbalanceteam2;


let testchosen;

global.testchosen;



let start;

function resultJSON(type,ballance,team1,team2){
  return JSON.stringify({
    "code" : type,
    "ballance" : ballacne,
    "team1" : team1,
    "team2" : team2
  });
}


function insert(tier){




  switch (tier) {
    case "challenger":
      return challenger;
      break;
    case  "grandmaster":
      return grandmaster;
      break;
    case "master":
      return master;
      break;

    case "diamond1":
      return diamond1;
      break;

    case "diamond2":
      return diamond2;
      break;
    case "diamond3":
      return diamond3;
      break;
    case "diamond4":
      return diamond4;
      break;

    case "platinum1":
      return platinum1;
      break;
    case "platinum2":
      return platinum2;
      break;
    case "platinum3":
      return platinum3;
      break;
    case "platinum4":
      return platinum4;
      break;

    case "gold1":
      return gold1;
      break;
    case "gold2":
      return gold2;
      break;
    case "gold3":
      return gold3;
      break;
    case "gold4":
      return gold4;
      break;

    case "silver1":
      return silver1;
      break;
    case "silver2":
      return silver2;
      break;
    case "silver3":
      return silver3;
      break;
    case "silver4":
      return silver4;
      break;

    case "bronze1":
      return bronze1;
      break;
    case "bronze2":
      return bronze2;
      break;
    case "bronze3":
      return bronze3;
      break;
    case "bronze4":
      return bronze4;
      break;

    case "iron1":
      return iron1;
      break;
    case "iron2":
      return iron2;
      break;
    case "iron3":
      return iron3;
      break;
    case "iron4":
      return iron4;
      break;


    default:

  }
}

//티어 평균 계산
function tieravg(arr){
  let tierhap =0.000000;
  for(let i =0; i<arr.length;i++){
    //console.log(arr[i]);
    tierhap = tierhap+insert(arr[i]);
    //console.log(arr[i]+ "  :  "+insert(arr[i]));
  }
  console.log("tttttt"+tierhap);
  let avg = (tierhap / arr.length);
  //console.log("tttttttttt      "+avg);
  return avg;
}

function avgdiff(arr,arr2){
    let get;
  //  console.log(arr);
  //  console.log(arr2);
    get = Math.abs(tieravg(arr)-tieravg(arr2));
    return get;


}

// 배열 비교해서 같은값 제거 ( 나머지 배열만 구함)
function mm(arr,arr2){
  let t;
  let arrt = arr.slice(0);

  for(let i =0; i < arr2.length;i++){
    t=arrt.indexOf(arr2[i]);
    if (t != -1 ){

      arrt.splice(t,1);


    }
  }

  return arrt;
}


function combination(arr,r){
  arr = arr.sort();
  let used = new Array();
  if ( arr.length <10){
    console.log("내전 구성이 10명 이하입니다.");
    return;
  }

  for(let j=0;j<arr.length;j++){
    used.push(0);
  }

  function generate(chosen){

    if (chosen.length === r){
      //console.log(chosen);
    //  testchosen = chosen;
    //  console.log("testchosen:\t"+testchosen);
      let notchosen = mm(arr,chosen);
      //console.log(notchosen);
      let avgdiffs = avgdiff(chosen,notchosen);
      //console.log(avgdiff(chosen,notchosen));
      //console.log(avgdiffs);
      //console.log(avgdiffs);
      if (mostbalance>=avgdiffs){
        console.log("팀1 : "+chosen);
        console.log("팀2 : "+notchosen);
        console.log("평균비교값:"+avgdiffs);
        mostbalance = avgdiffs;
        //mostbalanceteam1=chosen;
        mostbalanceteam1=mm(arr,notchosen);
      //  console.log("왜 팀원안뜨지"+mostbalanceteam1);
        mostbalanceteam2=notchosen;

        let lolbalance = {"mostbalance" : avgdiffs , "mostbalanceteam1" : mm(arr,notchosen), "mostbalanceteam2" : notchosen};
        return lolbalance;
      }





      return;
    }



    if (chosen) {
      start = arr.indexOf(chosen[chosen.length-1])+1
    }
    else{
      start =0;
    }

    for(let nxt =start ;nxt<arr.length;nxt++ ){

      if (used[nxt] ===0 && (nxt ==0 || arr[nxt-1] !=arr[nxt] || used[nxt-1])){
        chosen.push(arr[nxt]);
        used[nxt] =1;
        generate(chosen);
        chosen.pop();
        used[nxt]=0;
      }
    }
  }
  generate(new Array());

}
console.log("start")

//combination(["challenger","grandmaster","silver3","silver4","bronze1","gold1","gold2","silver3","silver4","bronze1"], 5)
console.log("밸런스 율 : "+mostbalance);
console.log("Team1 : "+mostbalanceteam1);
console.log("Team2 : "+mostbalanceteam2);
//let plus = challenger+grandmaster+master+diamond1+diamond2+diamond3+diamond4+platinum1+platinum2+platinum3+platinum4+gold1+gold2+gold3+gold4+silver1+silver2+silver3+silver4+bronze1+bronze2+bronze3+bronze4+iron1+iron2+iron3+iron4;

//console.log(iron4);
//console.log(testchosen);

app.get('/lolbalance',function(req,res){
  res.sendFile(path.join(__dirname,'lolbalance.html'));


});

app.post('/lolbalance',function(req,res){
  //let arr = JSON.parse(req.body.teams);
  let arr = req.body.teams;
  console.log(arr);

  let result = {};

  let mostbal = combination(arr,5);

  resultJSON(200,mostbal['mostbalance'],mostbal['mostbalanceteam1'],mostbal['mostbalanceteam2']);


});


server.listen(port, function() {
    console.log('Server On !');
});
