let tiercal=require('./tiercal');

let http = require('http');
let express = require('express');
let app = express();
const fs= require('fs');

var server= http.createServer(app);


let port=3010;

//예시 json파일 읽기
//let testteamjson=fs.readFileSync('C:/jh/IT/Programing/nodejs/lolbalance/lolbalance/exampleTeam.json','utf-8');
let testteamjson=fs.readFileSync('./exampleTeam.json','utf-8');
let allsummoner=JSON.parse(testteamjson);
//console.log("json:"+data);

//console.log(allsummoner[0].nickname);


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

function tieravg(team){
  let avg=0.0000000000;
  //console.log(team);
  for (i=0;i<team.length;i++){
    avg=avg+tiercal(summonerTier(allsummoner,team[i]));
    
  }
  
  avg=avg/(team.length);
  
  return avg;
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
  
  
        //console.log("team1: "+chosen);
        //console.log(tieravg(chosen));
        let team2 = secondTeam(arr,chosen);
        //console.log("team2: "+team2);



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
let summonernames= getsummonernames(allsummoner);


//console.log(summonernames);
//console.log(summonernames.indexOf("4번"));  

  //r개씩 뽑음
let r=5;

combination(summonernames,r);
  
//console.log(tiercal(summonerTier(allsummoner,"9번")));
//console.log(tieravg(["3번","1번","10번"]));


server.listen(port, function() {
    console.log('Server On !');
});