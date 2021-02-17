console.log('start tiercal.js');

function insert(tier){
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


module.exports = insert