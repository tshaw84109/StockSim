

var stocksArray = [];
var text;
var i = 0;
var name = "John Doe";
var bank = 0;
var networth = 0;
var stocks = 0;
var price = 100;
var currentWorth = 0;
var stocksAvailable = 100;
var selectedStockID= 0;
//loadPrompt(); //This function is automatically called when the as the html page is loading, no need for anything from the HTML file -Tyler


document.getElementById("name").innerHTML = name;
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
    returnValue = {company:"", value:[0],shares:0,trend:0}
    returnValue.company = CompanyName;
    returnValue.value.push(StartValue);
	returnValue.trend = (Math.random()-Math.random()-.01);
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

    }

    html += "</td></tr></table>"

    document.getElementById("StockTableDiv").innerHTML = html;
    loadSelectedStock(selectedStockID);
}




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
        if (confirm("You like to start a new game?")) {
        //new game
        text = "OK";
        window.open('index.html');
        } else {
        //cancel
        text = "Cancel";
        }         
        document.getElementById("loadgame").innerHTML = text;
}




function incrementValueUp() {
    document.getElementById('inc').value = ++i;
}
function incrementValueDown() {
    document.getElementById('inc').value = --i;
}
function buy() {
    networth = networth -= i * price;
    document.getElementById("networth").innerHTML = "$" + networth;
    bank = bank -= i * price;
    document.getElementById("bank").innerHTML = "$" + bank;              
    stocks = stocks + i;
    stocksArray[selectedStockID].shares += i;
    document.getElementById("myStocks").innerHTML = "Owned: " + stocksArray[selectedStockID].shares;
    stocksAvailable = stocksAvailable - i;
    document.getElementById("stocksAvailable").innerHTML = "Stocks Available: " + 100;
    currentWorth = currentWorth + price * i;
    document.getElementById("currentWorth").innerHTML = "Networth of shares: $" + currentWorth;
    loadStockTable();
    
}



function sell() {
    bank = bank += i * price;
    document.getElementById("bank").innerHTML = "$" + bank;
    networth = networth += i * price;
    document.getElementById("networth").innerHTML = "$" + networth;
    stocks = stocks - i;
    stocksArray[selectedStockID].shares -= i;
    document.getElementById("myStocks").innerHTML = "Owned: " + stocksArray[selectedStockID].shares;
    stocksAvailable = stocksAvailable + i;
    document.getElementById("stocksAvailable").innerHTML = "Stocks Available: " + 100;
    currentWorth = currentWorth - price * i;
    document.getElementById("currentWorth").innerHTML = "Networth of shares: $" + currentWorth;
    loadStockTable();
}






function loadPrompt() { //loadPrompt prompts the player to load or start a new game, as needed -Tyler
    //if (webdata file exists where we expect it)
        //then prompt user for load or new game
        if (confirm('Load a game? Press OK to load your last saved game, or press cancel to start a new game.')) {
        // User has selected to load
            //load game
            //end this function
            alert('You selected to load a game');
        } else {
            //alert('You selected to start a new game');
            newPlayer();
        }
    
    //else auto start a new game
    //alert('No saved game found, a new game is being started.');
        //input name

}

/*
//player global variable
var player = {
  name: "default player",
  cash: 10000,
  //networth: (calculated somehow)
  //start with no stocks
};
*/
/*
function newGame() { //return new player? nothing? a return code?
    
*/
/*
<body>
    <p>Click to begin</p>
    <button onclick="loadGame()">Here</button>
    <p id="loadgame"></p>

    <h2>Enter your player name.</h2>
    <button onclick="newPlayer()">click here</button>
    <p id="player"></p>
</body>
*/

function newPlayer() {
  var txt;
  var person = prompt("Please enter your name:", "YOUR NAME");
  if (person == null || person == "") {
    txt = "User cancelled the prompt.";
  } else {
    txt = "Hello " + person + "! How are you today?"; //Save player
  }
  //document.getElementById("player").innerHTML = txt;
  alert(txt);
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
        stocksArray[j].value.push(stocksArray[j].value[stocksArray[j].value.length-1]+
		Math.floor((Math.random()-Math.random())*10+stocksArray[j].trend));
		stocksArray[j].trend += 0.001;
    }
    loadStockTable();
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
//load hardcoded values for new  game
//var name = person;
//var bank = 10000;
//var networth = 0;
//var stocks = 0; 



//newPlayer();
    //create player object with the following assignments:
    //name
    //networth (calculated)
    //start with no stocks
    
    //call functions that load randomized data
    //generateStocks();
    //randomEvent();
    
    //save to webdata
    //return?

