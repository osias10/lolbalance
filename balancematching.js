let tiercal=require('./tiercal');

let http = require('http');
let express = require('express');
let app = express();
const fs= require('fs');
let cors=require('cors');

let util = require('util');

let bodyParser= require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
//app.use(cors());

var server= http.createServer(app);


let port=3011;

//예시 json파일 읽기
//let testteamjson=fs.readFileSync('C:/jh/IT/Programing/nodejs/lolbalance/lolbalance/exampleTeam.json','utf-8');
let testteamjson=fs.readFileSync('./exampleTeam.json','utf-8');
let allsummoner=JSON.parse(testteamjson);
//console.log("json:"+data);

//console.log(allsummoner[0].nickname);

let allcombination=[]

let ajaxdata=[];


//모든 조합 저장
function getallcombination(arr,avgdiff,team1,team2){
  arr.push([avgdiff,team1,team2]);
  
  arr.sort(function(a,b){
    //console.log(a[0]+"-"+[b[0]]);
    return a[0] - b[0];
  });
  //console.log(team1);
  return arr;
}
//avgdiff(밸런스값차이 순으로 정렬)
/*
ta.sort(function(a,b){
console.log(a[2]+"-"+[b[2]]);
return a[0] - b[0];
});

*/




//배열 비교 및 값은 값 제거 (총 인원에서 team1 인원을 뺀 나머지만 구함)
function secondTeam(arr,arr2){
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


//해당 소환사의 티어 가져오기
function summonerTier(allsummoner,nickname){
  
  for (let i=0;i<allsummoner.length;i++){
    if (allsummoner[i].nickname.indexOf(nickname)>-1){
      return allsummoner[i].tier;
    }

  }

}
//팀 평균 구하기
function tieravg(allsummoner,team){
  let avg=0.0000000000;
  //console.log(team);
  for (i=0;i<team.length;i++){
    avg=avg+tiercal(summonerTier(allsummoner,team[i]));
    
  }
  
  avg=avg/(team.length);
  
  return avg;
}





function combination(ajaxdata,arr,r){

  
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
  
  
        //console.log("team1: "+chosen);
        //console.log(tieravg(chosen));
        //let team1= chosen;
        
        let team2 = secondTeam(arr,chosen);
        let team1 = secondTeam(arr,team2);
        //console.log("팀1");
        //console.log(team1);
        //console.log("팀2");
        //console.log(team2);
        getallcombination(allcombination,Math.abs(tieravg(ajaxdata,team1)-tieravg(ajaxdata,team2)),team1,team2);
        //console.log(team1);
        //console.log(tieravg(team1));
        //console.log(tieravg(team2));


        return chosen;
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



//소환사 목록
function getsummonernames(allsummoner){
  let sm=[]
  for (i=0;i<allsummoner.length;i++){
    sm.push(allsummoner[i].nickname);
    //console.log(sm+"   "+i);
  }
  return sm;
}







  //뽑을 목록
//let arr=[1,2,3,4,5,6,7,8,9,10];
//소환사 이름 추출
//let summonernames= getsummonernames(allsummoner);


//console.log(summonernames);
//console.log(summonernames.indexOf("4번"));  

  //r개씩 뽑음
//let r=5;

//combination(summonernames,r);
//console.log("Best 조합 - Team1: "+allcombination[0][1]+"    Team2: "+allcombination[0][2]+"    팀차이: "+allcombination[0][0]);
//console.log(tiercal(summonerTier(allsummoner,"9번")));
//console.log(tieravg(["3번","1번","10번"]));
/*
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://osias.duckdns.org/");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
*/
//let router=express.Router();



function code(type){
  if(type == "success") return 200;
  else if(type == "forbidden") return 403;
  else if(type =="fail") return 401;
  else return 400;
}



function resultJSON(type, message, result = null){
  return JSON.stringify({
    "result":{
      "code" : code(type),
      "message" : message,
      "data" : result
    }
  });
}

app.post('/callolbalance', function(req,res, next){
  let result={};
  let data={};
  //let summonerss=JSON.stringify(req.body);
  //let summoners2=JSON.parse(summonerss);
  //console.log(req);
  ajaxdata=[];
  console.log("계산 요청  ")
  //console.log(req.body);
  allcombination=[];
  for (let i=0;i<req.body.summonersName.length;i++){
    ajaxdata.push({"nickname" : req.body.summonersName[i], "tier" : req.body.summonersTier[i]});
  }
  console.log(ajaxdata);
  let summonernames= getsummonernames(ajaxdata);

  let r=5;
  combination(ajaxdata,summonernames,r);
  console.log("Best 조합 - Team1: "+allcombination[0][1]+"    Team2: "+allcombination[0][2]+"    팀차이: "+allcombination[0][0]);
  console.log("2nd 조합 - Team1: "+allcombination[1][1]+"    Team2: "+allcombination[1][2]+"    팀차이: "+allcombination[1][0]);
  console.log("3rd 조합 - Team1: "+allcombination[2][1]+"    Team2: "+allcombination[2][2]+"    팀차이: "+allcombination[2][0]);

  //console.log("계산 요청  "+req.body.nickname);
  //console.log(summonerss);
  //console.log("계산 요청  "+JSON.stringify(req.body));
  //console.log("계산 요청  "+req.body.sendData);
  //res.header("Access-Control-Allow-Origin", "https://osias.duckdns.org");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
  result= resultJSON("success","success",allcombination);
  //console.log(allcombination);
  res.send(result);
  
});

//app.use('/',router);


server.listen(port, function() {
    console.log('Server On !');
});