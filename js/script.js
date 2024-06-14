var balance = 10000
var corn_price = 1
var land_cost = 10
var land_power = 1
var marketing_power = 0.25
var cps = 0
var land = 0
var marketing_cost = 50
var dps = 0
var marketing = 0
var pp = 0

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
  document.getElementById("prestige").innerHTML = "Prestige for " + Math.floor(Math.sqrt(balance/10000)) + " prestige points"
  document.getElementById("next_prestige").innerHTML = "Next prestige point at $" + ((Math.floor(Math.sqrt(balance/10000))+1)**2*10000)
  document.getElementById("ppcount").innerHTML = "Prestige Points: " + pp
}

function updateBalance(){
  balance += dps
  if (balance >= 10000){
    prestige.removeAttribute("hidden")
    next_prestige.removeAttribute("hidden")
    ppcount.removeAttribute("hidden")
    puclass.removeAttribute("hidden")
  }
}

function prestige_function(){
  if (balance >= 10000){
    pp += Math.floor(Math.sqrt(balance/10000))
    balance = 10
    corn_price = 1
    land_cost = 10
    land_power = 1
    marketing_power = 0.25
    cps = 0
    land = 0
    marketing_cost = 50
    dps = 0 
    marketing = 1
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
