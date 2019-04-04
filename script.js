
var stocks = [];
var text;
var i = 0;
var name = "John Doe";
var bank = 0;
var networth = 0;
var stocks = 0;
var price = 100;
var currentWorth = 0;
var stocksAvailable = 100;
//loadPrompt(); //This function is automatically called when the as the html page is loading, no need for anything from the HTML file -Tyler

document.getElementById("name").innerHTML = name;
document.getElementById("networth").innerHTML = "$" + networth;
document.getElementById("bank").innerHTML = "$" + bank;
document.getElementById("myStocks").innerHTML = "Owned: " + stocks;
document.getElementById("price").innerHTML = "Price per share: $" + price;
document.getElementById("currentWorth").innerHTML = "Networth of shares: $" + currentWorth;
document.getElementById("stocksAvailable").innerHTML = "Stocks Available: " + 100;

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
    document.getElementById("myStocks").innerHTML = "Owned: " + stocks;
    stocksAvailable = stocksAvailable - i;
    document.getElementById("stocksAvailable").innerHTML = "Stocks Available: " + 100;
    currentWorth = currentWorth + price * i;
    document.getElementById("currentWorth").innerHTML = "Networth of shares: $" + currentWorth;  
}
function sell() {
    bank = bank += i * price;
    document.getElementById("bank").innerHTML = "$" + bank;
    networth = networth += i * price;
    document.getElementById("networth").innerHTML = "$" + networth;
    stocks = stocks - i;
    document.getElementById("myStocks").innerHTML = "Owned: " + stocks;
    stocksAvailable = stocksAvailable + i;
    document.getElementById("stocksAvailable").innerHTML = "Stocks Available: " + 100;
    currentWorth = currentWorth - price * i;
    document.getElementById("currentWorth").innerHTML = "Networth of shares: $" + currentWorth;
}
function StartingStockValue(){
	return Math.floor(Math.random()*20)+10;
}

function getValue(id){
	return stocks[id].shares * stocks[id].value[(stocks[id].value.length)-1];
}

function GenerateStock(CompanyName, StartValue){
//alert('stocks generated called');
returnValue = {company:"", value:[0],shares:0}
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

//	


GenerateStartingStocks(stocks);

//alert('got here');

	html = '<table><th style="width: 50%">Name</th> <th style="width: 20%">Category</th> <th style="width: 10%">value</th> <th style="width: 10%">changed</th> <th style="width: 5%">own</th> <th style="width: 5%">worth</th>'
	
	//alert('got here 2');
	
	
	
	for(i = 0 ; i < stocks.length ; i++){
		
		html += "<tr>"
		html += "<td><button onclick='loadSelectedStock(" + i + ")'>" + stocks[i].company  + "</button></td>"
		html += "<td>" + stocks[i].shares  + "</td>"
		html += "<td>" + getValue(i)  + "</td>"
		html += "<td>" + stocks[i].value[((stocks[i].value.length)-1)]  + "</td>"
		html += "<td>" + (stocks[i].value[((stocks[i].value.length)-1)] - stocks[i].value[((stocks[i].value.length)-2)])  + "</td>"
		html += "</tr>"
		
	}
	html += "</td></tr></table>"
	
	document.getElementById("StockTableDiv").innerHTML = html;
	
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

//load hardcoded values for new  game
var name = person;
var bank = 10000;
var networth = 0;
var stocks = 0; 

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

