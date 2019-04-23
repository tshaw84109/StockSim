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
var price;
var currentWorth = 0;
var stocksAvailable = 100;
var selectedStockID= 0;
var eventString = "Death";
var o;
var day = 0;

document.getElementById('event').value = eventString;
document.getElementById('inc').value = incrementCounter;
document.getElementById("name").innerHTML = localStorage.newPlayer;
document.getElementById("networth").innerHTML = "$" + networth;
document.getElementById("bank").innerHTML = "$" + bank.toFixed(2);
document.getElementById("myStocks").innerHTML = "Owned: " + stocks;
document.getElementById("price").innerHTML = "Price per share: $" + price;
document.getElementById("currentWorth").innerHTML = "Networth of shares: $" + currentWorth;
document.getElementById("stocksAvailable").innerHTML = "Stocks Available: " + 100;

function StartingStockValue(){
	tempCents = Math.ceil(Math.random()*2000)+1000
    return tempCents/100;
}
function getWorth(id){
    return Math.ceil(stocksArray[id].shares * stocksArray[id].value[(stocksArray[id].value.length)-1]*100)/100;
}

function getValue(id){
    return stocksArray[id].value[(stocksArray[id].value.length)-1];
}

function GenerateStock(CompanyName, StartValue){
    //returnValue = {company:"", value:[0],shares:0}
    returnValue = {company:"", value:[0],shares:0,trend:0,swing:0,worth:0}
    returnValue.company = CompanyName;
	returnValue.trend = Math.random()-Math.random();
	returnValue.swing = 5+Math.random()*5+Math.random()*5;
    returnValue.value.push(StartValue);
    return returnValue;
}
function GenerateStartingStocks(StocksArray){
    StocksArray.push(GenerateStock("Toms Tailors", StartingStockValue()));
    StocksArray.push(GenerateStock("Bobs Butchery", StartingStockValue()));
    StocksArray.push(GenerateStock("Fuzzy Furrier", StartingStockValue()));
    StocksArray.push(GenerateStock("Musical Minsteral", StartingStockValue()));
    StocksArray.push(GenerateStock("Gold Mine", StartingStockValue()));
    StocksArray.push(GenerateStock("ChewChew Meat Shop", StartingStockValue()));
    StocksArray.push(GenerateStock("2-bit Smithing", StartingStockValue()));
    StocksArray.push(GenerateStock("The Cattle Ranch", StartingStockValue()));
    StocksArray.push(GenerateStock("Moonside Inn", StartingStockValue()));
    StocksArray.push(GenerateStock("Temple of the Gods", StartingStockValue()));
    StocksArray.push(GenerateStock("Stock N' Shop", StartingStockValue()));
}
function loadStockTable(){

    if(stocksArray.length < 1){GenerateStartingStocks(stocksArray);}
    html = '<table style = "width: 100%"><th style="width: 40%">Name</th> <th style="width: 15%">Shares Owned</th> <th style="width: 15%">Worth</th> <th style="width: 15%">Price</th> <th style="width: 15%">Change</th>'

    for(i = 0 ; i < stocksArray.length ; i++){

        html += "<tr>"
        html += "<td><button onclick='loadSelectedStock(" + i + ")'>" + stocksArray[i].company  + "</button></td>"
        html += "<td id='shares'" + i + ">" + stocksArray[i].shares  + "</td>"
        html += "<td>" + getWorth(i)  + "</td>"
        html += "<td>" + stocksArray[i].value[((stocksArray[i].value.length)-1)]  + "</td>"
        //html += "<td>" + Math.ceil(stocksArray[i].value[((stocksArray[i].value.length)-1)]*100 - stocksArray[i].value[((stocksArray[i].value.length)-2)]*100)/100  + "</td>"
        if ((stocksArray[i].value[((stocksArray[i].value.length)-1)] - stocksArray[i].value[((stocksArray[i].value.length)-2)]) < 0)
			{ 
				html += "<td style = 'color: #800000;'>" + (stocksArray[i].value[((stocksArray[i].value.length)-1)] - stocksArray[i].value[((stocksArray[i].value.length)-2)]).toFixed(2) + "</td>"
			} else
			{
				html += "<td style = 'color: #008000;'>" + (stocksArray[i].value[((stocksArray[i].value.length)-1)] - stocksArray[i].value[((stocksArray[i].value.length)-2)]).toFixed(2) + "</td>"
			}
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
    if (incrementCounter > 0)
	{
		document.getElementById('inc').value = --incrementCounter;
	}
	if (incrementCounter < 0) incrementCounter = 0;
}
function buy() {
    currentWorth = getValue(selectedStockID) * incrementCounter;
    if (bank < currentWorth) {
        alert("You do not have enough money to buy these shares.")
    }
    else{
    document.getElementById("networth").innerHTML = "$" + networth;
    bank = bank -= incrementCounter * price;
    document.getElementById("bank").innerHTML = "$" + bank.toFixed(2);              
    stocks = stocks + incrementCounter;
    stocksArray[selectedStockID].shares += incrementCounter;
    document.getElementById("myStocks").innerHTML = "Owned: " + stocksArray[selectedStockID].shares;
    stocksAvailable = stocksAvailable - incrementCounter;
    document.getElementById("stocksAvailable").innerHTML = "Stocks Available: " + 100;
    
    //document.getElementById("currentWorth").innerHTML = "Networth of shares: $" + currentWorth;
    loadStockTable();
    }
	loadSelectedStock(selectedStockID);
}
function sell() {
    if (incrementCounter > stocksArray[selectedStockID].shares) {
        alert("You don't have enough shares to sell.")
    }
    else{
    bank = bank += incrementCounter * price;
    document.getElementById("bank").innerHTML = "$" + bank.toFixed(2);
    document.getElementById("networth").innerHTML = "$" + networth;
    stocks = stocks - incrementCounter;
    stocksArray[selectedStockID].shares -= incrementCounter;
    document.getElementById("myStocks").innerHTML = "Owned: " + stocksArray[selectedStockID].shares;
    stocksAvailable = stocksAvailable + incrementCounter;
    document.getElementById("stocksAvailable").innerHTML = "Stocks Available: " + 100;
    currentWorth = currentWorth - price * incrementCounter;
    //document.getElementById("currentWorth").innerHTML = "Networth of shares: $" + currentWorth;
    loadStockTable();
    }
	loadSelectedStock(selectedStockID);
}
function loadSelectedStock(StockID){
    selectedStockID = StockID;
    document.getElementById("stockTitle").innerHTML = ""+stocksArray[StockID].company;
    document.getElementById("price").innerHTML = "Price per share: $" + stocksArray[StockID].value[((stocksArray[StockID].value.length)-1)];
    document.getElementById("myStocks").innerHTML = "Owned: " + stocksArray[StockID].shares;
	price = getValue(StockID);
    GenerateGraph(StockID);
	document.getElementById("currentWorth").innerHTML = "Networth of shares: $" + getWorth(StockID);
}
function nextDay()
{
    for(j = 0; j< stocksArray.length;j++)
    {
		if(getValue(j)>110) SplitStock(j);
		tempCents = getValue(j)*100;
		chang = (Math.random()-Math.random())*stocksArray[j].swing/50+stocksArray[j].trend/50;
		tempCents = Math.ceil(tempCents*(1+chang));
        stocksArray[j].value.push(tempCents/100);
		if(stocksArray[j].value.length > 60)
		{
			stocksArray[j].value.shift();
			stocksArray[j].value.shift();
		}
		if(stocksArray[j].trend < 1)stocksArray[j].trend += .002;
		if(stocksArray[j].trend > 1) stocksArray[j].trend = 1;
		if(stocksArray[j].swing > 5) stocksArray[j].swing -= .001;
		if(stocksArray[j].swing < 5) stocksArray[j].swing = 5;
		
    }
	day++;
    loadStockTable();
    event();
}

function SplitStock(StockID)
{
	stocksArray[StockID].value.push(getValue(StockID)/2);
	stocksArray[StockID].shares *= 2;
}



function GenerateGraph(StockID)
{
    //define variables
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    var valueLength = stocksArray[StockID].value.length;
    //clear canvas for redraw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //set color and width of lines
    ctx.strokeStyle = "#0061ff";
    ctx.lineWidth = 2;
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
    document.getElementById('event').value = "Day: " + day + " Today is a sunny day";
}