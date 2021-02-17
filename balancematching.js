let tiercal=require('./tiercal');

let http = require('http');
let express = require('express');
let app = express();
const fs= require('fs');

var server= http.createServer(app);


let port=3010;

//예시 json파일 읽기
let testteamjson=fs.readFileSync('C:/jh/IT/Programing/nodejs/lolbalance/lolbalance/exampleTeam.json','utf-8');
//let data=JSON.parse(testteamjson);
//console.log("json:"+data);
console.log(testteamjson);


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

//배열 비교 및 값은 값 제거 (총 인원에서 team1 인원을 뺀 나머지만 구함)










  //뽑을 목록
let arr=[1,2,3,4,5,6,7,8,9,10];
  
  //r개씩 뽑음
let r=5;
  
combination(arr,r);
  



server.listen(port, function() {
    console.log('Server On !');
});