//Sabra May 
//VFW 1307 
//Project 2 JavaScript
//July 18, 2013

window.addEventListener("DOMContentLoaded", function () {
	
	//getElementById Function
	function $(x) {
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	//create select field element and populate with options
	function makeCategory() {
		var formTag = document.getElementsByTagName("form"),
			selectLi = $('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "cats");
		for(var i=0, j=category.length; i<j; i++) {
			var makeOption = document.createElement('option');
			var optText = category[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}	
		selectLi.appendChild((makeSelect)); 
	}
	
	//Checkboxes
	function getCheckboxValue() {
	if($('iPhone').checked) {
		iPhoneValue = $('iPhone').value;
	}else {
		iPhoneValue = "No"
	}
	};
	
	function getiPadValue() {
		if($('iPad').checked) {
			iPadValue = $('iPad').value;
		}else {
			iPadValue = "No"
		}
	};
	
	//save Data in local storage
	function storeData() {
		var id		=Math.floor(Math.random()*10000001);
		//Gather form field values and store in an object
		//Object properties ontain array with the form label and input value
		getCheckboxValue();
		getiPadValue();
		var item 		=();
		item.group		=["Group", $('select').value];
		item.date		=["Date", $('date').value];
		item.priority	=["Priority", $('priority').value];
		item.item		=["Idea", $('item').value];
		item.iPhone		=["iPhone", iPhoneValue];
		item.iPad		=["iPad", iPadValue];
		item.notes		=["Notes". $('notes').value];
	}
	
	//Save Data to local storage useing stringify to convert our object to a string
	localStorage.setItem(id, JSON.stringify(item));
	alert("Contact is Saved");
	
	function getData() {
		//Write Data from Local Storage to Browser
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value); //convert string from local storage value back to an object by using JSON.parse
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			for(car n in obj) {
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+ " "+obj[n][1];
				makeSubli.innerHTML = optSubTet;
			}
		}
	}
	
	function clearLocal() {
		if(localStorage.length === 0) {
			alert("There is no data to clear")
		}else {
			localStorage.clear();
			alert("All ideas have been deleted");
			window.location.reload();
			return false;
		}
	}
	
	//Variable defaults
	
	var category = ["--Choose A Category--", "Games", "Productivity", "Health and Fitness", "Entertainment", "Education", "Music", "Photography", "Other"];
	
	makeCategory();
	iPhoneValue = "No"
	iPadValue = "No"
	
	

	//clear data
	var clearLocal = function() {
		if(localStorage.length === 0) {
			alert("There is nothing to clear");
		} else {
			localStorage.clear();
			alert("Data cleared");
			window.location.reload();
			return false;
		}
	};



	//set link & submit click events
	
	var displayLink = $('displayLink');
	displayLink.addEventListener("click", getData);
	
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	
	var save = $('submit');
	save.addEvenListener("click", storeData);






});