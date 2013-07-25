//Sabra May
//VFW 1307
//July 25, 2013

//Wait until DOM is ready

window.addEventListener("DOMContentLoaded", function() {
	
	//getElementById Function
	function $(x) {
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	function makeCats() {
		var formTag = document.getElementsByTagName("form"), 
			selectLi = $('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "groups");
		for (var i=0, j=catGroups.length; i<j; i++) {
			var makeOption = document.createElement('option');
			var optText = catGroups[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
	//Find value of selected checkboxes
	/*var checkboxes = document.forms[0].device;
	
	console.log(checkboxes);*/
	function getiPhoneValues() {
		if($('iPhone').checked) {
			iPhoneValues = $("iPhone").value;
		}else {
			iPhoneValues= "No";
		}
	}
		function getiPadValues() {
			if($("iPad").checked) {
				iPadValues = $("iPad").value;
			}else {
				iPadValues = "No";
			}
	}
			
	function toggleControls(n){
	switch(n) {
		case "on":
			$('ideaForm').style.display = "none";
			$('clearLink').style.display = "inline";
			$('displayLink').style.display = "none";
			//$('addNew').style.display = "inline";
			//$('items').style.display = "none";
			break;
		case "off":
			$('ideaForm').style.display = "block";
			$('clearLink').style.display = "inline";
			$('displayLink').style.display = "inline";
			//$('addNew').style.display = "none";
			//$('items').style.display = "none";
			break;	
	default:
		return false;		
		}
	}
	
	function storeData() {
		var id 				=Math.floor(Math.random() *100000001);
	//Gather up all our form field values and store in an object
	//Object properties contain array with the form label and input value
	getiPhoneValues();
	getiPadValues();
	var item = {};
		item.idea 			=["Idea:", $('idea').value];
		item.date			=["Today's Date;", $('date').value];
		item.category		=["Choose a Category:", $('select').value];
		item.iPhone			=["iPhone", iPhoneValues];
		item.iPad			=["iPad", iPadValues];
		item.priority 		=["priority:", $('priority').value];
		item.notes			=["Notes:",$('notes').value];
				
	localStorage.setItem(id, JSON.stringify(item));
	alert("Idea Saved!");	
	}
	
	function getData() {
	toggleControls("on");
	if(localStorage.length === 0) {
		alert("There is no data in local storage.");
	}
	//Write Data from Local Storage to the browser
	var makeDiv = document.createElement('div');
	makeDiv.setAttribute("id", "items");
	var makeList = document.createElement('ul');
	makeDiv.appendChild(makeList);
	document.body.appendChild(makeDiv);
	$('items').style.display = "block";
	for (var i=0, len=localStorage.length; i<len; i++) {
		var makeli = document.createElement('li');
		var linksLi = document.createElement('li');
		makeList.appendChild(makeli);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		//convert the string from local storage value back to an object by using JSON.parse()
		var obj = JSON.parse(value);
		var makeSubList = document.createElement('ul');
		makeli.appendChild(makeSubList);
		for (var n in obj) {
			var makeSubli = document.createElement('li');
			makeSubList.appendChild(makeSubli);
			var optSubText = obj[n][0]+ " "+obj[n][1];
			makeSubli.innerHTML = optSubText;
			makeSubList.appendChild(linksLi);
		}
		makeItemLinks(localStorage.key(i), linksLi); //Create edit and delete buttons/link for each item in local storage
	}
	}
	
	//Make ITem Links
	//Create the edit and elete links for each stored item wen displayed
	function makeItemLinks(key, linksLi) {
		//add edit single item link
		var editLink = document.createElement('a');
		editLink.href ="#";
		editLink.key = key;
		var editText = "Edit";
		//editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		//add line break
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		//add delete single item link
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete";
		//deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	//Variable defaults
	var catGroups = ["Choose a Category", "Games", "Productivity", "Health and Fitness", "Entertainment", "Education", "Music", "Photography", "Other"];
	makeCats();
	iPhoneValue = "No";
	iPadValue = "No";
	
	//Clear Data
	var clearLocal = function() {
		if(localStorage.length === 0) {
			alert("There is no data to clear");
		}else {
			localStorage.clear();
			alert("Data cleared");
			window.location.reload();
			return false;
		}
	};
	
	//Set click events
	var displayLink = $("displayLink");
	displayLink.addEventListener("click", getData);
	var clearLink = $("clearLink");
	clearLink.addEventListener("click", clearLocal);
	var submit = $("submit");
	submit.addEventListener("click", storeData);
});