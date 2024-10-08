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
var pu11_amt = [0, 50, 1]
var pu12_amt = [0, 50, 1]
var pu21_amt = [0, 5000000, 1]
var pu22_amt = [0, 5000000, 0]
var u11_amt = [0, (3*10**14), 2]
var u12_amt = [0, (2*10**15), 1.4]
var prestige_unlocked = false
var puII_unlocked = false
var puIII_unlocked = false
var c1_unlocked = false
var c1 = [false, 0, 10**6, 1]
var uII_unlocked = false
var c2_unlocked = false
var c2 = [false, 0, 10**7, 1, 1]
var perks_unlocked = false
var perks = [[0, 0, 10**11], [0, 1, 2], [0, 1, 2], [0, 0, 50]]

setInterval(GUIupdate, 50)
setInterval(updateBalance, 100)
setInterval(statsUpdate, 50)

function save_game(){
  localStorage.setItem("balance", balance);
  localStorage.setItem("corn_price", corn_price);
  localStorage.setItem("land_cost", land_cost);
  localStorage.setItem("land_power", land_power);
  localStorage.setItem("cps", cps);
  localStorage.setItem("land", land);
  localStorage.setItem("marketing_cost", marketing_cost);
  localStorage.setItem("dps", dps);
  localStorage.setItem("marketing", marketing);
  localStorage.setItem("pp", pp);
  localStorage.setItem("u1_amt", JSON.stringify(u1_amt));
  localStorage.setItem("u2_amt", JSON.stringify(u2_amt));
  localStorage.setItem("pu1_amt", JSON.stringify(pu1_amt));
  localStorage.setItem("pu2_amt", JSON.stringify(pu2_amt));
  localStorage.setItem("pu3_amt", JSON.stringify(pu3_amt));
  localStorage.setItem("pu11_amt", JSON.stringify(pu11_amt));
  localStorage.setItem("pu12_amt", JSON.stringify(pu12_amt));
  localStorage.setItem("pu21_amt", JSON.stringify(pu21_amt));
  localStorage.setItem("pu22_amt", JSON.stringify(pu22_amt));
  localStorage.setItem("u11_amt", JSON.stringify(u11_amt));
  localStorage.setItem("u12_amt", JSON.stringify(u12_amt));
  localStorage.setItem("prestige_unlocked", prestige_unlocked);
  localStorage.setItem("puII_unlocked", puII_unlocked);
  localStorage.setItem("puIII_unlocked", puIII_unlocked);
  localStorage.setItem("c1_unlocked", c1_unlocked);
  localStorage.setItem("c1", JSON.stringify(c1));
  localStorage.setItem("uII_unlocked", uII_unlocked);
  localStorage.setItem("c2", JSON.stringify(c2))
  localStorage.setItem("c2_unlocked", c2_unlocked)
  localStorage.setItem("perks_unlocked", perks_unlocked)
  localStorage.setItem("perks", JSON.stringify(perks))
}

function load_save(){
  balance = loadVariable("balance", 0);
  corn_price = loadVariable("corn_price", 1);
  land_cost = loadVariable("land_cost", 10);
  land_power = loadVariable("land_power", 1);
  cps = loadVariable("cps", 0);
  land = loadVariable("land", 0);
  marketing_cost = loadVariable("marketing_cost", 100);
  dps = loadVariable("dps", 0);
  marketing = loadVariable("marketing", 0);
  pp = loadVariable("pp", 0);
  u1_amt = loadVariable("u1_amt", [0, 0, 0]);
  u2_amt = loadVariable("u2_amt", [0, 0, 0]);
  pu1_amt = loadVariable("pu1_amt", [0, 0, 0]);
  pu2_amt = loadVariable("pu2_amt", [0, 0, 0]);
  pu3_amt = loadVariable("pu3_amt", [0, 0, 0]);
  pu11_amt = loadVariable("pu11_amt", [0, 0, 0]);
  pu12_amt = loadVariable("pu12_amt", [0, 0, 0]);
  pu21_amt = loadVariable("pu21_amt", [0, 0, 0]);
  pu22_amt = loadVariable("pu22_amt", [0, 0, 0]);
  u11_amt = loadVariable("u11_amt", [0, 0, 0]);
  u12_amt = loadVariable("u12_amt", [0, 0, 0]);
  prestige_unlocked = loadVariable("prestige_unlocked", false);
  puII_unlocked = loadVariable("puII_unlocked", false);
  puIII_unlocked = loadVariable("puIII_unlocked", false);
  c1_unlocked = loadVariable("c1_unlocked", false);
  c1 = loadVariable("c1", [false, 0, 10**6, 1]);
  uII_unlocked = loadVariable("uII_unlocked", false);
  c2 = loadVariable("c2", [false, 0, 10**7, 1, 1])
  c2_unlocked = loadVariable("c2_unlocked", false)
  perks_unlocked = loadVariable("perks_unlocked", false)
  perks = loadVariable("perks", [[0, 0, 10**11], [0, 1, 2], [0, 1, 2], [0, 0, 100]])
}

function loadVariable(key, defaultValue) {
  const value = localStorage.getItem(key);
  if (value == null) {
    return defaultValue;
  }
  if (typeof defaultValue === 'boolean') {
    return (value == 'true');
  }
  if (Array.isArray(defaultValue)) {
    return JSON.parse(value);
  }
  if (!isNaN(defaultValue)) {
    return Number(value);
  }
  return value;
}

function GUIupdate(){
  document.getElementById("balance").textContent = "Balance: $" + num_format(Math.round(balance*100)/100)
  document.getElementById("balance2").textContent = "Balance: $" + num_format(Math.round(balance*100)/100)
  document.getElementById("dps").textContent = "$/sec: " + num_format(Math.round(dps*100)/100)
  document.getElementById("land").textContent = "Land: " + land + " (Cost: $" + num_format(Math.round(land_cost*100)/100) + ")"
  document.getElementById("land_power").textContent = "Each land produces " + num_format(Math.round(land_power*u1_amt[2]*100)/100) + " corn per second"
  document.getElementById("multiplier").textContent = "Multiplier: " + num_format(Math.round(land_power*100)/100)
  document.getElementById("cps").textContent = "Corn/sec: " + num_format(Math.round(cps*100)/100)
  document.getElementById("dpc").textContent = "Corn price: $" + Math.round(corn_price*100)/100
  document.getElementById("dpc_upgrade").textContent = "Marketing: Increase demand to increase the price of corn by $" + (Math.round(100*u2_amt[2])/100)*perks[2][1] + " (Cost: $" + num_format(Math.round(marketing_cost*100)/100) + ")"
  document.getElementById("prestige").textContent = "Prestige for " + num_format(Math.floor(Math.sqrt(balance/1000000))) + " prestige points"
  document.getElementById("next_prestige").textContent = "Next prestige point at $" + num_format(((Math.floor(Math.sqrt(balance/1000000))+1)**2*1000000))
  document.getElementById("ppcount").textContent = "Prestige Points: " + num_format(pp)
  document.getElementById("pp2").textContent = "Prestige Points: " + num_format(pp)
  document.getElementById("u1_text").textContent = "Genetic Modifications: Increases crop yield (" + Math.round(u1_amt[2]*100)/100 + "x → " + Math.round(100*(u1_amt[2] + 0.7*pu11_amt[2]*c2[3]))/100 + "x)"
  document.getElementById("buy_u1").textContent = "Buy upgrade (" + Math.round(u1_amt[0]*100)/100 + "/" + (pu2_amt[2]+pu22_amt[2]+perks[3][1]) + ")"
  document.getElementById("u1_cost").textContent = "Cost: $" + num_format(Math.round(u1_amt[1]*100)/100)
  document.getElementById("u2_text").textContent = "Better Marketing: Increased corn price gain per marketing ($" + Math.round(u2_amt[2]*100)/100 + " → $" + Math.round(100*(u2_amt[2] + 0.15*pu11_amt[2]*c1[3]))/100 + ")"
  document.getElementById("buy_u2").textContent = "Buy upgrade (" + Math.round(u2_amt[0]*100)/100 + "/" + (pu2_amt[2]+pu22_amt[2]+perks[3][1]) + ")"
  document.getElementById("u2_cost").textContent = "Cost: $" + num_format(Math.round(u2_amt[1]*100)/100)
  document.getElementById("pu1_text").textContent = "Genetic Modifications II: Increases crop yield (" + Math.round(pu1_amt[2]*100)/100 + "x → " + Math.round(100*(pu1_amt[2] + 1.4*c2[3]))/100 + "x)"
  document.getElementById("buy_pu1").textContent = "Buy upgrade (" + pu1_amt[0] + "/5)"
  document.getElementById("pu1_cost").textContent = "Cost: " + Math.round(pu1_amt[1]*100)/100 + " PP"
  document.getElementById("pu2_text").textContent = "More Upgrades: Increase upgrade cap (" + (pu22_amt[2] + pu2_amt[2]) + " → " + (pu22_amt[2] + pu2_amt[2] + 2) + ")"
  document.getElementById("buy_pu2").textContent = "Buy upgrade (" + pu2_amt[0] + "/5)"
  document.getElementById("pu2_cost").textContent = "Cost: " + Math.round(pu2_amt[1]*100)/100 + " PP"
  document.getElementById("buy_pu3").textContent = "Buy upgrade (" + pu3_amt[0] + "/1)"
  document.getElementById("pu11_text").textContent = "Better Upgrades: Increase the effectiveness of upgrades (" + Math.round(pu11_amt[2]*100)/100 + "x → " + Math.round(100*(pu11_amt[2] + 1))/100 + "x)"
  document.getElementById("buy_pu11").textContent = "Buy upgrade (" + pu11_amt[0] + "/5)"
  document.getElementById("pu11_cost").textContent = "Cost: " + Math.round(pu11_amt[1]*100)/100 + " PP"
  document.getElementById("pu12_text").textContent = "Black Friday: Reduce land and marketing costs (/" + Math.round(pu12_amt[2]*100)/100 + " → /" + Math.round(100*(pu12_amt[2] * 5))/100 + ")"
  document.getElementById("buy_pu12").textContent = "Buy upgrade (" + pu12_amt[0] + "/5)"
  document.getElementById("pu12_cost").textContent = "Cost: " + Math.round(pu12_amt[1]*100)/100 + " PP"
  document.getElementById("c1_goal").textContent = "Goal: " + num_format(c1[2])
  document.getElementById("c1_completions").textContent = "Completions: (" + c1[1] + "/5)"
  document.getElementById("c1_reward").textContent = "Challenge Reward: Increase the power of the 'Better Marketing' upgrade (" + c1[3] + "x → " + Math.round((c1[3] + 1.4)*100)/100 + "x)"
  document.getElementById("c2_goal").textContent = "Goal: " + num_format(c2[2])
  document.getElementById("c2_completions").textContent = "Completions: (" + c2[1] + "/5)"
  document.getElementById("c2_reward").textContent = "Challenge Reward: Increase the power of all three 'Genetic Modifications' upgrades (" + c2[3] + "x → " + Math.round((c2[3] + 0.5)*100)/100 + "x)"
  document.getElementById("u11_text").textContent = "Better Multiplier: Increases multiplier per 7 lands (" + Math.round(u11_amt[2]*100)/100 + "x → " + Math.round(100*(u11_amt[2] + 0.1))/100 + "x)"
  document.getElementById("buy_u11").textContent = "Buy upgrade (" + Math.round(u11_amt[0]*100)/100 + "/4)"
  document.getElementById("u11_cost").textContent = "Cost: $" + num_format(Math.round(u11_amt[1]*100)/100)
  document.getElementById("u12_text").textContent = "Better Cost Scaling: Reduce cost increase multiplier for land and marketing (" + Math.round(u12_amt[2]*100)/100 + "x → " + Math.round(100*(u12_amt[2] - 0.02))/100 + "x)"
  document.getElementById("buy_u12").textContent = "Buy upgrade (" + Math.round(u12_amt[0]*100)/100 + "/4)"
  document.getElementById("u12_cost").textContent = "Cost: $" + num_format(Math.round(u12_amt[1]*100)/100)
  document.getElementById("pu21_text").textContent = "Genetic Modifications III: Increases crop yield (" + pu21_amt[2] + "x → " + (pu21_amt[2] + 2.1*c2[3]) + "x)"
  document.getElementById("buy_pu21").textContent = "Buy upgrade (" + pu21_amt[0] + "/5)"
  document.getElementById("pu21_cost").textContent = "Cost: " + num_format(Math.round(pu21_amt[1]*100)/100) + " PP"
  document.getElementById("pu22_text").textContent = "Even More Upgrades: Increases cap of Upgrades I (" + Math.round(100*(pu2_amt[2] + pu22_amt[2]))/100 + " → " + Math.round(100*(pu2_amt[2] + pu22_amt[2] + 10))/100 + ")"
  document.getElementById("buy_pu22").textContent = "Buy upgrade (" + pu22_amt[0] + "/5)"
  document.getElementById("pu22_cost").textContent = "Cost: " + num_format(Math.round(pu22_amt[1]*100)/100) + " PP"
  document.getElementById("perk_cost").textContent = "Cost: " + num_format(perks[0][2]) + " PP"
  document.getElementById("p1_text").textContent = "Genetic Engineering - Increases crop yield (" + perks[1][1] + "x → " + (perks[1][1]+2) + "x)"
  document.getElementById("p2_text").textContent = "Better Ads - Increases marketing power (" + perks[2][1] + "x → " + (perks[2][1]+2) + "x)"
  document.getElementById("p3_text").textContent = "More Upgrades - Increases upgrade cap (" + (pu2_amt[2]+pu22_amt[2]+perks[3][1]) + " → " + (pu2_amt[2]+pu22_amt[2]+perks[3][1]+100) + ")"
  document.getElementById("p1_spent").textContent = "Perks Spent: " + perks[1][0]
  document.getElementById("p2_spent").textContent = "Perks Spent: " + perks[2][0]
  document.getElementById("p3_spent").textContent = "Perks Spent: " + perks[3][0]
  document.getElementById("unspent_perks").textContent = "Unspent Perks: " + perks[0][0]
}

function statsUpdate(){
  land_power = u11_amt[2]**(Math.floor(land/7))
  land_cost = (10/pu12_amt[2])*(u12_amt[2]**land)*c2[4]
  marketing_cost = (50/pu12_amt[2])*(u12_amt[2]**marketing)*c2[4]
  u1_amt[1] = Math.round(((u1_amt[0]+1)**2.5)*10000)*c2[4]
  u2_amt[1] = Math.round(((u2_amt[0]+1)**2)*50000)*c2[4]
  if (u1_amt[0] > pu2_amt[2]+pu22_amt[2]+perks[3][1]){
    u1_amt[0] = pu2_amt[2]+pu22_amt[2]+perks[3][1]
  }
  if (u2_amt[0] > pu2_amt[2]+pu22_amt[2]+perks[3][1]){
    u2_amt[0] = pu2_amt[2]+pu22_amt[2]+perks[3][1]
  }
  u11_amt[1] = 4**u11_amt[0]*3*10**14*c2[4]
  u12_amt[1] = 4**u12_amt[0]*2*10**15*c2[4]
  cps = land*land_power*u1_amt[2]*pu1_amt[2]*pu21_amt[2]*perks[1][1]
  dps = cps*corn_price
  if (c1[0] == true){
    corn_price = 0.01
  }
  if (c1[0] == false){
    corn_price = 1+u2_amt[2]*marketing*perks[2][1]
  }
  u1_amt[2] = 1 + 0.7*u1_amt[0]*pu11_amt[2]*c2[3]
  u2_amt[2] = 0.25 + 0.15*u2_amt[0]*pu11_amt[2]*c1[3]
  pu1_amt[2] = 1 + 1.4*pu1_amt[0]*c2[3]
  pu11_amt[2] = 1 + pu11_amt[0]
  pu21_amt[2] = 1 + 2.1*pu21_amt[0]*c2[3]
  if (prestige_unlocked == true){
    prestige.removeAttribute("hidden")
    next_prestige.removeAttribute("hidden")
    ppcount.removeAttribute("hidden")
    puclass.removeAttribute("hidden")
  }
  if (puII_unlocked == true){
    pu2class.removeAttribute("hidden")
  }
  if (puIII_unlocked == true){
    pu3class.removeAttribute("hidden")
  }
  if (c1_unlocked == true){
    c1class.removeAttribute("hidden")
    chal_button.removeAttribute("hidden")
  }
  if (uII_unlocked == true){
    uIIclass.removeAttribute("hidden")
  }
  if ((c1[0] == true) && (balance >= c1[2])){
    c1[0] = false
    c1[1] += 1
    c1[2] *= 10
    c1[3] += 1.4
    document.getElementById("c1_enter").textContent = "Enter Challenge"
    uII_unlocked = true
    uIIclass.removeAttribute("hidden")
    prestige_function()
  }
  if ((c2[0] == true) && (balance >= c2[2])){
    c2[0] = false
    c2[1] += 1
    c2[2] *= 10
    c2[3] += 0.5
    c2[4] = 1
    document.getElementById("c2_enter").textContent = "Enter Challenge"
    prestige_function()
  }
  if (c1[1] >= 4){
    c2_unlocked = true
    c2class.removeAttribute("hidden")
  }
  if (c2[1] >= 2){
    perks_unlocked = true
    perk_button.removeAttribute("hidden")
  }
}

function updateBalance(){
  balance += dps/10
  if (balance >= 1000000){
    prestige_unlocked = true
  }
}

function open_farm(){
  farm.removeAttribute("hidden")
  upg.setAttribute("hidden", true)
  chal.setAttribute("hidden", true)
  p_class.setAttribute("hidden", true)
}

function open_upgrades(){
  farm.setAttribute("hidden", true)
  upg.removeAttribute("hidden")
  chal.setAttribute("hidden", true)
  p_class.setAttribute("hidden", true)
}

function open_challenges(){
  farm.setAttribute("hidden", true)
  upg.setAttribute("hidden", true)
  chal.removeAttribute("hidden")
  p_class.setAttribute("hidden", true)
}

function open_perks(){
  p_class.removeAttribute("hidden")
  upg.setAttribute("hidden", true)
  chal.setAttribute("hidden", true)
  farm.setAttribute("hidden", true)
}

function prestige_function(min=10**6){
  if (balance >= min){
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
    u11_amt = [0, (3*10**14), 2]
    u12_amt = [0, (2*10**15), 1.4]
  }
}

function buyLand(){
  if (balance >= land_cost){
    balance -= land_cost
    land += 1
  }
}

function buyMarketing(){
  if (balance >= marketing_cost){
    balance -= marketing_cost
    marketing += 1
  }
}

function u1(){
  if ((balance >= u1_amt[1]) && (u1_amt[0] < (pu2_amt[2]+pu22_amt[2]+perks[3][1]))){
    balance -= u1_amt[1]
    u1_amt[0] += 1
  }
}
function u2(){
  if ((balance >= u2_amt[1]) && (u2_amt[0] < (pu2_amt[2]+pu22_amt[2]+perks[3][1]))){
    balance -= u2_amt[1]
    u2_amt[0] += 1
  }
}
function u11(){
  if ((balance >= u11_amt[1]) && (u11_amt[0] < 4)){
    balance -= u11_amt[1]
    u11_amt[0] += 1
    u11_amt[2] += 0.1
  }
}
function u12(){
  if ((balance >= u12_amt[1]) && (u12_amt[0] < 4)){
    balance -= u12_amt[1]
    u12_amt[0] += 1
    u12_amt[2] -= 0.02
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
    marketing_cost = Math.round(marketing_cost*100)/100
  }
}

function pu21(){
  if ((pp >= pu21_amt[1]) && (pu21_amt[0] < 5)){
    pp -= pu21_amt[1]
    pu21_amt[0] += 1
    pu21_amt[1] = Math.round((pu21_amt[0]+1)**2*5000000)
  }
}

function pu22(){
  if ((pp >= pu22_amt[1]) && (pu22_amt[0] < 5)){
    pp -= pu22_amt[1]
    pu22_amt[0] += 1
    pu22_amt[1] = Math.round((pu22_amt[0]+1)**2*5000000)
    pu22_amt[2] += 10
  }
}

function puII_unlock(){
  if ((pp >= 69) && (puII_unlocked == false)){
    pp -= 69
    puII_unlocked = true
  }
}

function puIII_unlock(){
  if ((pp >= 5*10**6) && (puIII_unlocked == false)){
    pp -= 5*10**6
    puIII_unlocked = true
  }
}

function c1_unlock(){
  if ((pp >= 10000) && (c1_unlocked == false)){
    pp -= 10000
    c1_unlocked = true
  }
}

function enter_c1(){
  if ((c1[0] == false) && (c1[1] < 5)){
    c1[0] = true
    document.getElementById("c1_enter").textContent = "Exit Challenge"
    prestige_function(0)
  }
  else if (c1[0] == true){
    c1[0] = false
    document.getElementById("c1_enter").textContent = "Enter Challenge"
    prestige_function(0)
  }
}

function enter_c2(){
  if ((c2[0] == false) && (c2[1] < 5)){
    c2[0] = true
    c2[4] = 10**5
    document.getElementById("c2_enter").textContent = "Exit Challenge"
    prestige_function(0)
  }
  else if (c2[0] == true){
    c2[0] = false
    c2[4] = 1
    document.getElementById("c2_enter").textContent = "Enter Challenge"
    prestige_function(0)
  }
}

function buy_perk(){
  if (pp >= perks[0][2]){
    pp -= perks[0][2]
    perks[0][2] *= 10
    perks[0][1] += 1
    perks[0][0] += 1
  }
}

function respec_perk(){
  perks[0][0] = perks[0][1]
  perks[1] = [0, 1, 2]
  perks[2] = [0, 1, 2]
  perks[3] = [0, 0, 100]
}

function purchase_perk(n){
  if (perks[0][0] >= 1){
    perks[0][0] -= 1
    perks[n][0] += 1
    perks[n][1] += perks[n][2]
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
