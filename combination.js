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


      console.log(chosen);
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
//뽑을 목록
let arr=[1,2,3,4,5,6,7,8,9,10];

//r개씩 뽑음
let r=4;

combination(arr,r);
