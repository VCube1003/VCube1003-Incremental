var balance = 10**6
var corn_price = 1
var land_cost = 10
var land_power = 1
var cps = 0
var land = 0
var marketing_cost = 50
var dps = 0
var marketing = 0
var pp = 300000
var u1_amt = [0, 10000, 1]
var u2_amt = [0, 50000, 0.25]
var pu1_amt = [0, 1, 1]
var pu2_amt = [0, 1, 5]
var pu3_amt = [0, 15, 10]
var pu11_amt = [0, 50, 1]
var pu12_amt = [0, 50, 1]
var puII_unlocked = false

setInterval(GUIupdate, 50)
setInterval(updateBalance, 1000)
setInterval(statsUpdate, 50)

function GUIupdate(){
  document.getElementById("balance").textContent = "Balance: $" + num_format(Math.round(balance*100)/100)
  document.getElementById("dps").textContent = "$/sec: " + num_format(Math.round(dps*100)/100)
  document.getElementById("land").textContent = "Land: " + land + " (Cost: $" + num_format(Math.round(land_cost*10000)/10000) + ")"
  document.getElementById("land_power").textContent = "Each land produces " + num_format(Math.round(land_power*u1_amt[2]*100)/100) + " corn per second"
  document.getElementById("multiplier").textContent = "Multiplier: " + num_format(land_power)
  document.getElementById("cps").textContent = "Corn/sec: " + num_format(Math.round(cps*100)/100)
  document.getElementById("dpc").textContent = "Corn price: $" + Math.round(corn_price*100)/100
  document.getElementById("dpc_upgrade").textContent = "Marketing: Increase demand to increase the price of corn by $" + Math.round(100*u2_amt[2])/100 + " (Cost: $" + num_format(marketing_cost) + ")"
  document.getElementById("prestige").textContent = "Prestige for " + num_format(Math.floor(Math.sqrt(balance/1000000))) + " prestige points"
  document.getElementById("next_prestige").textContent = "Next prestige point at $" + num_format(((Math.floor(Math.sqrt(balance/1000000))+1)**2*1000000))
  document.getElementById("ppcount").textContent = "Prestige Points: " + num_format(pp)
  document.getElementById("u1_text").textContent = "Genetic Modifications: Increases crop yield (" + Math.round(u1_amt[2]*100)/100 + "x → " + Math.round(100*(u1_amt[2] + 0.7*pu11_amt[2]))/100 + "x)"
  document.getElementById("buy_u1").textContent = "Buy upgrade (" + Math.round(u1_amt[0]*100)/100 + "/" + pu2_amt[2] + ")"
  document.getElementById("u1_cost").textContent = "Cost: $" + num_format(Math.round(u1_amt[1]*100)/100)
  document.getElementById("u2_text").textContent = "Better Marketing: Increased corn price gain per marketing ($" + Math.round(u2_amt[2]*100)/100 + " → $" + Math.round(100*(u2_amt[2] + 0.15*pu11_amt[2]))/100 + ")"
  document.getElementById("buy_u2").textContent = "Buy upgrade (" + Math.round(u2_amt[0]*100)/100 + "/" + pu2_amt[2] + ")"
  document.getElementById("u2_cost").textContent = "Cost: $" + num_format(Math.round(u2_amt[1]*100)/100)
  document.getElementById("pu1_text").textContent = "Genetic Modifications II: Increases crop yield (" + Math.round(pu1_amt[2]*100)/100 + "x → " + Math.round(100*(pu1_amt[2] + 1.4))/100 + "x)"
  document.getElementById("buy_pu1").textContent = "Buy upgrade (" + pu1_amt[0] + "/5)"
  document.getElementById("pu1_cost").textContent = "Cost: " + Math.round(pu1_amt[1]*100)/100 + " PP"
  document.getElementById("pu2_text").textContent = "More Upgrades: Increase upgrade cap (" + pu2_amt[2] + " → " + (pu2_amt[2] + 2) + ")"
  document.getElementById("buy_pu2").textContent = "Buy upgrade (" + pu2_amt[0] + "/5)"
  document.getElementById("pu2_cost").textContent = "Cost: " + Math.round(pu2_amt[1]*100)/100 + " PP"
  document.getElementById("buy_pu3").textContent = "Buy upgrade (" + pu3_amt[0] + "/1)"
  document.getElementById("pu11_text").textContent = "Better Upgrades: Increase the effectiveness of upgrades (" + Math.round(pu11_amt[2]*100)/100 + "x → " + Math.round(100*(pu11_amt[2] + 1))/100 + "x)"
  document.getElementById("buy_pu11").textContent = "Buy upgrade (" + pu11_amt[0] + "/5)"
  document.getElementById("pu11_cost").textContent = "Cost: " + Math.round(pu11_amt[1]*100)/100 + " PP"
  document.getElementById("pu12_text").textContent = "Black Friday: Reduce land and marketing costs (/" + Math.round(pu12_amt[2]*100)/100 + " → /" + Math.round(100*(pu12_amt[2] * 5))/100 + ")"
  document.getElementById("buy_pu12").textContent = "Buy upgrade (" + pu12_amt[0] + "/5)"
  document.getElementById("pu12_cost").textContent = "Cost: " + Math.round(pu12_amt[1]*100)/100 + " PP"
}

function statsUpdate(){
  cps = land*land_power*u1_amt[2]*pu1_amt[2]
  dps = cps*corn_price
  corn_price = 1+u2_amt[2]*marketing
  u1_amt[2] = 1 + 0.7*u1_amt[0]*pu11_amt[2]
  u2_amt[2] = 0.25 + 0.15*u2_amt[0]*pu11_amt[2]
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
    land_cost = 10/pu12_amt[2]
    land_power = 1
    cps = 0
    land = 0
    marketing_cost = 50/pu12_amt[2]
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
    land_cost = Math.round(land_cost*14000)/10000
  }
}

function buyMarketing(){
  if (balance >= marketing_cost){
    balance -= marketing_cost
    marketing += 1
    marketing_cost = Math.round(marketing_cost*140)/100
  }
}

function u1(){
  if ((balance >= u1_amt[1]) && (u1_amt[0] < pu2_amt[2])){
    balance -= u1_amt[1]
    u1_amt[0] += 1
    u1_amt[1] = Math.round(((u1_amt[0]+1)**2.5)*10000)
  }
}
function u2(){
  if ((balance >= u2_amt[1]) && (u2_amt[0] < pu2_amt[2])){
    balance -= u2_amt[1]
    u2_amt[0] += 1
    u2_amt[1] = Math.round(((u2_amt[0]+1)**2)*50000)
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

function pu11(){
  if ((pp >= pu11_amt[1]) && (pu11_amt[0] < 5)){
    pp -= pu11_amt[1]
    pu11_amt[0] += 1
    pu11_amt[1] = Math.round((pu11_amt[0]+1)**2*50)
    pu11_amt[2] += 1
  }
}

function pu12(){
  if ((pp >= pu12_amt[1]) && (pu12_amt[0] < 5)){
    pp -= pu12_amt[1]
    pu12_amt[0] += 1
    pu12_amt[1] = Math.round((pu12_amt[0]+1)**2*50)
    pu12_amt[2] *= 5
    land_cost /= 5
    marketing_cost /= 5
    if (land_cost > 0.01){
      land_cost = Math.round(land_cost*100)/100
    }
    else{
      land_cost = Math.round(land_cost*10000)/10000
    }
    marketing_cost = Math.round(marketing_cost*100)/100
  }
}

function puII_unlock(){
  if ((pp >= 69) && (puII_unlocked == false)){
    pp -= 69
    puII_unlocked == true
    pu2class.removeAttribute("hidden")
  }
}

function num_format(num) {
  if (num < 1000) {
    return num;
  }
  if (num >= 10**3 && num < 10**6) {
    return ((num / 10**3).toFixed(2) + " K");
  }
  if (num >= 10**6 && num < 10**9) {
    return ((num / 10**6).toFixed(2) + " M");
  }
  if (num >= 10**9 && num < 10**12) {
    return ((num / 10**9).toFixed(2) + " B");
  }
  if (num >= 10**12 && num < 10**15) {
    return ((num / 10**12).toFixed(2) + " T");
  }
  if (num >= 10**15 && num < 10**18) {
    return ((num / 10**15).toFixed(2) + " Qa");
  }
  if (num >= 10**18 && num < 10**21) {
    return ((num / 10**18).toFixed(2) + " Qi");
  }
  if (num >= 10**21 && num < 10**24) {
    return ((num / 10**21).toFixed(2) + " Sx");
  }
  if (num >= 10**24 && num < 10**27) {
    return ((num / 10**24).toFixed(2) + " Sp");
  }
  if (num >= 10**27 && num < 10**30) {
    return ((num / 10**27).toFixed(2) + " Oc");
  }
  if (num >= 10**30 && num < 10**33) {
    return ((num / 10**30).toFixed(2) + " No");
  }
  if (num >= 10**33 && num < 10**36) {
    return ((num / 10**33).toFixed(2) + " Dc");
  }
  if (num >= 10**36 && num < 10**39) {
    return ((num / 10**36).toFixed(2) + " UDc");
  }
  if (num >= 10**39 && num < 10**42) {
    return ((num / 10**39).toFixed(2) + " DDc");
  }
  if (num >= 10**42 && num < 10**45) {
    return ((num / 10**42).toFixed(2) + " TDc");
  }
  if (num >= 10**45 && num < 10**48) {
    return ((num / 10**45).toFixed(2) + " QaDc");
  }
  if (num >= 10**48 && num < 10**51) {
    return ((num / 10**48).toFixed(2) + " QiDc");
  }
  if (num >= 10**51 && num < 10**54) {
    return ((num / 10**51).toFixed(2) + " SxDc");
  }
  if (num >= 10**54 && num < 10**57) {
    return ((num / 10**54).toFixed(2) + " SpDc");
  }
  if (num >= 10**57 && num < 10**60) {
    return ((num / 10**57).toFixed(2) + " OcDc");
  }
  if (num >= 10**60 && num < 10**63) {
    return ((num / 10**60).toFixed(2) + " NoDc");
  }
  if (num >= 10**63 && num < 10**66) {
    return ((num / 10**63).toFixed(2) + " Vg");
  }
  return num;
}
