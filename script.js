var stocksArray = [];
var text;
// variable for incrementing functions
var i = 0;
var incrementCounter = 0;
//player name
var name = name;
var bank = 1000;
var networth = 0;
var stocks = 0;
var price = 100;
var currentWorth = 0;
var stocksAvailable = 100;
var selectedStockID= 0;
var eventString = "Death";
var o;

document.getElementById('event').value = eventString;
document.getElementById('inc').value = incrementCounter;
document.getElementById("name").innerHTML = localStorage.newPlayer;
document.getElementById("networth").innerHTML = "$" + networth;
document.getElementById("bank").innerHTML = "$" + bank;
document.getElementById("myStocks").innerHTML = "Owned: " + stocks;
document.getElementById("price").innerHTML = "Price per share: $" + price;
document.getElementById("currentWorth").innerHTML = "Networth of shares: $" + currentWorth;
document.getElementById("stocksAvailable").innerHTML = "Stocks Available: " + 100;

function StartingStockValue(){
    return Math.floor(Math.random()*20)+10;
}
function getValue(id){
    return stocksArray[id].shares * stocksArray[id].value[(stocksArray[id].value.length)-1];
}
function GenerateStock(CompanyName, StartValue){
    //returnValue = {company:"", value:[0],shares:0}
    returnValue = {company:"", value:[0],shares:0,trend:0,worth:0}
    returnValue.company = CompanyName;
    returnValue.value.push(StartValue);
    return returnValue;
}
function GenerateStartingStocks(StocksArray){
    StocksArray.push(GenerateStock("Toms Tailors", StartingStockValue()));
    StocksArray.push(GenerateStock("Bobs Butchery", StartingStockValue()));
    StocksArray.push(GenerateStock("Fuzzy Furrier", StartingStockValue()));
    StocksArray.push(GenerateStock("Musical Minsteral", StartingStockValue()));
    StocksArray.push(GenerateStock("Gold Mine", StartingStockValue()));
}
function loadStockTable(){

    if(stocksArray.length < 1){GenerateStartingStocks(stocksArray);}
    html = '<table style = "width: 100%"><th style="width: 40%">Name</th> <th style="width: 15%">Shares Owned</th> <th style="width: 15%">Worth</th> <th style="width: 15%">Price</th> <th style="width: 15%">Change</th>'

    for(i = 0 ; i < stocksArray.length ; i++){

        html += "<tr>"
        html += "<td><button onclick='loadSelectedStock(" + i + ")'>" + stocksArray[i].company  + "</button></td>"
        html += "<td id='shares'" + i + ">" + stocksArray[i].shares  + "</td>"
        html += "<td>" + getValue(i)  + "</td>"
        html += "<td>" + stocksArray[i].value[((stocksArray[i].value.length)-1)]  + "</td>"
        html += "<td>" + (stocksArray[i].value[((stocksArray[i].value.length)-1)] - stocksArray[i].value[((stocksArray[i].value.length)-2)])  + "</td>"
        html += "</tr>"
        incrementCounter = 0;
        document.getElementById('inc').value = incrementCounter;
    }
    html += "</td></tr></table>"
    document.getElementById("StockTableDiv").innerHTML = html;
    loadSelectedStock(selectedStockID);
}
// Load game funtion
// needs to be able to check if saved game exists
function loadGame() {
    if (confirm("You would like to load a saved game?")) {
        //load game
        text = "OK";
        window.open('index.html');
        } else {
        //cancel
        text = "Cancel";
        }  
        document.getElementById("loadgame").innerHTML = text;
        }
function newGame() {
        //new game     
        name = prompt("Please enter your name.", "Your Name");
        localStorage.setItem("newPlayer", name);
        text = name;
        window.open('index.html');
}
function incrementValueUp() {
    document.getElementById('inc').value = ++incrementCounter;
}
function incrementValueDown() {
    
    document.getElementById('inc').value = --incrementCounter;
}
function buy() {
    currentWorth = currentWorth + price * incrementCounter;
    if (bank < currentWorth) {
        alert("You do not have enough money to buy these shares.")
    }
    else{
    document.getElementById("networth").innerHTML = "$" + networth;
    bank = bank -= incrementCounter * price;
    document.getElementById("bank").innerHTML = "$" + bank;              
    stocks = stocks + incrementCounter;
    stocksArray[selectedStockID].shares += incrementCounter;
    document.getElementById("myStocks").innerHTML = "Owned: " + stocksArray[selectedStockID].shares;
    stocksAvailable = stocksAvailable - incrementCounter;
    document.getElementById("stocksAvailable").innerHTML = "Stocks Available: " + 100;
    
    document.getElementById("currentWorth").innerHTML = "Networth of shares: $" + currentWorth;
    loadStockTable();
    }
}
function sell() {
    if (stocks < incrementCounter) {
        alert("You shares to sell.")
    }
    else{
    bank = bank += incrementCounter * price;
    document.getElementById("bank").innerHTML = "$" + bank;
    document.getElementById("networth").innerHTML = "$" + networth;
    stocks = stocks - incrementCounter;
    stocksArray[selectedStockID].shares -= incrementCounter;
    document.getElementById("myStocks").innerHTML = "Owned: " + stocksArray[selectedStockID].shares;
    stocksAvailable = stocksAvailable + incrementCounter;
    document.getElementById("stocksAvailable").innerHTML = "Stocks Available: " + 100;
    currentWorth = currentWorth - price * incrementCounter;
    document.getElementById("currentWorth").innerHTML = "Networth of shares: $" + currentWorth;
    loadStockTable();
    }
}
function loadSelectedStock(StockID){
    SelectedStockID = StockID;
    document.getElementById("stockTitle").innerHTML = ""+stocksArray[StockID].company;
    document.getElementById("price").innerHTML = "Price per share: $" + stocksArray[StockID].value[((stocksArray[StockID].value.length)-1)];
    document.getElementById("myStocks").innerHTML = "Owned: " + stocksArray[StockID].shares;
    GenerateGraph(StockID);
}
function nextDay()
{
    for(j = 0; j< stocksArray.length;j++)
    {
        stocksArray[j].value.push(Math.floor(Math.random() * 125));
    }
    loadStockTable();
    event();
}
function GenerateGraph(StockID)
{
    //define variables
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    var valueLength = stocksArray[StockID].value.length;
    //clear canvas for redraw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //set color of lines
    ctx.strokeStyle = "#2368ff";
    //draw the dotted base line
    ctx.beginPath();
    ctx.setLineDash([5, 15]);
    ctx.moveTo(0, 125);
    ctx.lineTo(canvas.width, 125);
    ctx.stroke();
    //Set up for actual graphing
    ctx.beginPath();
    ctx.setLineDash([]);
    //draw a line from each value point of the given stock
    for(i = 0;i<valueLength;i++)
    {
        //draw a circle at every point
        ctx.arc((i*(canvas.width/valueLength)), -1*stocksArray[StockID].value[i]+125, 2, 0, 2 * Math.PI);
        //move from the current point to the future point and draw a line
        ctx.moveTo((i*(canvas.width/valueLength)), -1*stocksArray[StockID].value[i]+125);
        ctx.lineTo(((i+1)*(canvas.width/valueLength)), -1*stocksArray[StockID].value[i+1]+125);
        ctx.stroke();
    }
}
function event() {
    document.getElementById('event').value = "Not Death";
}
