var balance = 10
var corn_price = 1
var land_cost = 10
var land_power = 1
var cps = 0
var land = 0
var marketing_cost = 50
var dps = 0
var marketing = 0
var pp = 0
var u1_amt = [0, 10000, 1]
var u2_amt = [0, 50000, 0.25]
var pu1_amt = [0, 1, 1]
var pu2_amt = [0, 1, 5]
var pu3_amt = [0, 15, 10]

setInterval(GUIupdate, 50)
setInterval(updateBalance, 1000)
setInterval(statsUpdate, 50)

function GUIupdate(){
  document.getElementById("balance").textContent = "Balance: $" + Math.round(balance*100)/100
  document.getElementById("dps").textContent = "$/sec: " + Math.round(dps*100)/100
  document.getElementById("land").textContent = "Land: " + land + " (Cost: $" + land_cost + ")"
  document.getElementById("land_power").textContent = "Each land produces " + Math.round(land_power*u1_amt[2]*100)/100 + " corn per second"
  document.getElementById("multiplier").textContent = "Multiplier: " + land_power
  document.getElementById("cps").textContent = "Corn/sec: " + Math.round(cps*100)/100
  document.getElementById("dpc").textContent = "Corn price: $" + Math.round(corn_price*100)/100
  document.getElementById("dpc_upgrade").textContent = "Marketing: Increase demand to increase the price of corn by $" + Math.round(100*u2_amt[2])/100 + " (Cost: $" + marketing_cost + ")"
  document.getElementById("prestige").textContent = "Prestige for " + Math.floor(Math.sqrt(balance/1000000)) + " prestige points"
  document.getElementById("next_prestige").textContent = "Next prestige point at $" + ((Math.floor(Math.sqrt(balance/1000000))+1)**2*1000000)
  document.getElementById("ppcount").textContent = "Prestige Points: " + pp
  document.getElementById("u1_text").textContent = "Genetic Modifications: Increases crop yield (" + Math.round(u1_amt[2]*100)/100 + "x → " + Math.round(100*(u1_amt[2] + 0.7))/100 + "x)"
  document.getElementById("buy_u1").textContent = "Buy upgrade (" + Math.round(u1_amt[0]*100)/100 + "/" + pu2_amt[2] + ")"
  document.getElementById("u1_cost").textContent = "Cost: $" + Math.round(u1_amt[1]*100)/100
  document.getElementById("u2_text").textContent = "Better Marketing: Increased corn price gain per marketing ($" + Math.round(u2_amt[2]*100)/100 + " → $" + Math.round(100*(u2_amt[2] + 0.15))/100 + ")"
  document.getElementById("buy_u2").textContent = "Buy upgrade (" + Math.round(u2_amt[0]*100)/100 + "/" + pu2_amt[2] + ")"
  document.getElementById("u2_cost").textContent = "Cost: $" + Math.round(u2_amt[1]*100)/100
  document.getElementById("pu1_text").textContent = "Genetic Modifications II: Increases crop yield (" + Math.round(pu1_amt[2]*100)/100 + "x → " + Math.round(100*(pu1_amt[2] + 1.4))/100 + "x)"
  document.getElementById("buy_pu1").textContent = "Buy upgrade (" + pu1_amt[0] + "/5)"
  document.getElementById("pu1_cost").textContent = "Cost: " + Math.round(pu1_amt[1]*100)/100 + " PP"
  document.getElementById("pu2_text").textContent = "More Upgrades: Increase upgrade cap (" + pu2_amt[2] + " → " + (pu2_amt[2] + 2) + ")"
  document.getElementById("buy_pu2").textContent = "Buy upgrade (" + pu2_amt[0] + "/5)"
  document.getElementById("pu2_cost").textContent = "Cost: " + Math.round(pu2_amt[1]*100)/100 + " PP"
  document.getElementById("buy_pu3").textContent = "Buy upgrade (" + pu3_amt[0] + "/1)"
}

function statsUpdate(){
  cps = land*land_power*u1_amt[2]*pu1_amt[2]
  dps = cps*corn_price
  corn_price = 1+u2_amt[2]*marketing
}

function updateBalance(){
  balance += dps
  if (balance >= 1000000){
    prestige.removeAttribute("hidden")
    next_prestige.removeAttribute("hidden")
    ppcount.removeAttribute("hidden")
    puclass.removeAttribute("hidden")
  }
}

function prestige_function(){
  if (balance >= 1000000){
    pp += Math.floor(Math.sqrt(balance/1000000))
    balance = pu3_amt[2]
    corn_price = 1
    land_cost = 10
    land_power = 1
    cps = 0
    land = 0
    marketing_cost = 50
    dps = 0 
    marketing = 0
    u1_amt = [0, 10000, 1]
    u2_amt = [0, 50000, 0.25]
  }
}

function buyLand(){
  if (balance >= land_cost){
    if (land%7 == 6){
      land_power *= 2
    }
    balance -= land_cost
    land += 1
    land_cost = Math.floor(land_cost*1.4)
  }
}

function buyMarketing(){
  if (balance >= marketing_cost){
    balance -= marketing_cost
    marketing += 1
    marketing_cost = Math.floor(marketing_cost*1.4) 
  }
}

function u1(){
  if ((balance >= u1_amt[1]) && (u1_amt[0] < pu2_amt[2])){
    balance -= u1_amt[1]
    u1_amt[0] += 1
    u1_amt[1] = Math.round(((u1_amt[0]+1)**2.5)*10000)
    u1_amt[2] += 0.7
  }
}
function u2(){
  if ((balance >= u2_amt[1]) && (u2_amt[0] < pu2_amt[2])){
    balance -= u2_amt[1]
    u2_amt[0] += 1
    u2_amt[1] = Math.round(((u2_amt[0]+1)**2)*50000)
    u2_amt[2] += 0.15
  }
}

function pu1(){
  if ((pp >= pu1_amt[1]) && (pu1_amt[0] < 5)){
    pp -= pu1_amt[1]
    pu1_amt[0] += 1
    pu1_amt[1] = Math.round(((pu1_amt[0]+1)**2))
    pu1_amt[2] += 1.4
  }
}

function pu2(){
  if ((pp >= pu2_amt[1]) && (pu2_amt[0] < 5)){
    pp -= pu2_amt[1]
    pu2_amt[0] += 1
    pu2_amt[1] = Math.round((pu2_amt[0]+1)**2)
    pu2_amt[2] += 2
  }
}

function pu3(){
  if ((pp >= pu3_amt[1]) && (pu3_amt[0] < 1)){
    pp -= pu3_amt[1]
    pu3_amt[0] += 1
    pu3_amt[2] = 10000
  }
}
