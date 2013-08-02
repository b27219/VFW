//Sabra May
//VFW 1307
//Aug 1, 2013

//Wait until DOM is ready

window.addEventListener("DOMContentLoaded", function() {
	
	//getElementById Function
	function $(x) {
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	function makeCats() {
		var formTag = document.getElementsByTagName("form"), 
			selectLi = $('selectList'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "select");
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
	
	function storeData(key) {
		//If there is no key, it is a brand new item and needs a new key
		if(!key) {
			var id 				=Math.floor(Math.random() *100000001);
		}else {
			//Set the id to the existing key we're editing so that it will save over the data
			//The key is the same key that's been passed along from the editSubmit event handler
			//the the validate function, and then passed here, into the storeData function
			id = key;
		}
		
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
		alert("There is no data in local storage so default data will be added.");
		autoFillData();
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
		getImage(obj.category[1], makeSubList);
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
	
	//Get the image for the right category
	function getImage(catName, makeSubList) {
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImage = document.createElement('img');
		var setSrc = newImage.setAttribute("src", "images/"+ catName + ".png");
		imageLi.appendChild(newImage);
	}
	
	//Auto Populate Local Storage
	function autoFillData() {
		//Store the JSON OBJECT into local storage
		for(var n in json) {
			var id = Math.floor(Math.random() *100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
		
	}
	
	//Make Item Links
	//Create the edit and elete links for each stored item wen displayed
	function makeItemLinks(key, linksLi) {
		//add edit single item link
		var editLink = document.createElement('a');
		editLink.href ="#";
		editLink.key = key;
		var editText = "Edit";
		editLink.addEventListener("click", editItem);
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
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	function editItem() {
		//get data from item in local storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//show the form
		toggleControls("off");
		
		//populate the form fields with current local Storage values
		$('idea').value = item.idea[1];
		$('date').value = item.date[1];
		$('select').value = item.category[1];
		if(item.iPhone[1] == "Yes") {
			$('iPhone').setAttribute("checked", "checked");
		}
		if(item.iPad[1] =="Yes") {
			$('iPad').setAttribute("checked", "checked");
		}
		$('priority').value = item.priority[1];
		$('notes').value = item.notes[1];
		
		//remove inital listener from the input 'save idea' button
		submit.removeEventListener("click", storeData);
		//change submit button value to say edit 
		$('submit').value = "Edit Idea";
		var editSubmit = $('submit');
		//Save the key value established in this function as a property of the editSubmit event
		//so we can use that value when we save the data we edited
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}
	
	function deleteItem() {
		var ask = confirm("Are you sure you want to delete this idea?");
		if(ask) {
			localStorage.removeItem(this.key);
			window.location.reload();
		}else {
			alert("Idea was not deleted");
		}
	}
	
	function validate(e) {
		//Define the elements we want to check
		var getIdea 	= $('idea');
		var getDate 	= $('date');
		var getCategory = $('select');
		
		//Reset error messages
		errMsg.innerHTML = "";
		getIdea.style.border = "1px solid black";
		getDate.style.border = "1px solid black";
		getCategory.style.border = "1px solid black";

				
		//Get Error Messages
		var messageAry = [];
		//Idea validation
		if(getIdea.value === "") {
			var ideaError = "Please enter the idea";
			getIdea.style.border = "1px solid red";
			messageAry.push(ideaError);
		}
		
		//Date validation
		if(getDate.value === "") {
			var dateError = "Please enter today's date";
			getDate.style.border = "1px solid red";
			messageAry.push(dateError);
		}
		
		//Category validation
		if(getCategory.value== "Choose a Category") {
			var catError = "Please choose a category";
			getCategory.style.border = "1px solid red";
			messageAry.push(catError);
		}
		
		//If there are errors, display on screen
		if(messageAry.length >=1) {
			for(var i=0, j=messageAry.length; i < j; i++) {
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		}else {
			//If there are no erros, save data. Send key value (from editData function)
			//Remember this key value it was passed through the editSubmit event listener as a property
			storeData(this.key);
		}
	}	
	
	//Variable defaults
	var catGroups = ["Choose a Category", "Games", "Productivity", "Health", "Education", "Music", "Photography", "Other"];
	makeCats();
	iPhoneValue = "No";
	iPadValue = "No";
	errMsg = $('errors');
	
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
	submit.addEventListener("click", validate);
});