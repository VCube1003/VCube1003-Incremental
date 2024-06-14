var balance = 10
var corn_price = 1
var land_cost = 10
var land_power = 1
var marketing_power = 0.25
var cps = 0
var land = 0
var marketing_cost = 50
var dps = 0
var marketing = 1

setInterval(GUIupdate, 50)
setInterval(updateBalance, 1000)

function GUIupdate(){
  document.getElementById("balance").innerHTML = "Balance: $" + balance
  document.getElementById("dps").innerHTML = "$/sec: " + dps
  document.getElementById("land").innerHTML = "Land: " + land + " (Cost: $" + land_cost + ")"
  document.getElementById("land_power").innerHTML = "Each land produces " + land_power + " corn per second"
  document.getElementById("multiplier").innerHTML = "Multiplier: " + land_power
  document.getElementById("cps").innerHTML = "Corn/sec: " + cps
  document.getElementById("dpc").innerHTML = "Corn price: $" + corn_price
  document.getElementById("dpc_upgrade").innerHTML = "Marketing: Increase demand to increase the price of corn by $0.25 (Cost: $" + marketing_cost + ")"
}

function updateBalance(){
  balance += dps
}

function buyLand(){
  if (balance >= land_cost){
    if (land%7 == 6){
      land_power *= 2
    }
    balance -= land_cost
    land += 1
    land_cost = Math.floor(land_cost*1.4)
    cps = land*land_power
    dps = cps*corn_price
  }
}

function buyMarketing(){
  if (balance >= marketing_cost){
    balance -= marketing_cost
    marketing += 1
    marketing_cost = Math.floor(marketing_cost*1.4) 
    corn_price = 1+marketing_power*marketing
    dps = cps*corn_price
  }
}
