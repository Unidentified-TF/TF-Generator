
//Stores all of the results
var characterResult;
var transformationResult;
var finalResults = ""; //Saves the results for copy

var possibleTFs   = [];
var possibleMods  = [];
var possibleModsA = [];

//First function to run, gathers all information and displays it
function createResults() 
{
	randomizeValues(); //Gets all of the transformations the user picked

	//Displays the copy button and the lock toggle
	let copyButton = document.getElementById("copybutton").style.display = "inline";
	let transformationlock = document.getElementById("tflock").style.display = "inline";

	//If the transformation is not locked then it will produce results
	if (!document.getElementById("locktf").checked) {
		transformationResult = createTransformation();
		document.getElementById("TFresult").innerHTML = transformationResult;
	}
	//If the character is not locked then it will produce results
	if (!document.getElementById("lockchar").checked) {
		characterResult = createCharacter();
		if (characterResult != null) document.getElementById("CHARresult").innerHTML = Gender(characterResult, true);
	}
	//Saves the results for copying
	if (characterResult != null) finalResults = "Character:\n" + Gender(characterResult, true) + "\n\nTransformation:\n" + Gender(transformationResult);
	else finalResults = "Transformation:\n" + Gender(transformationResult);
}

//Takes in an array and returns a random value
function RandomValue(array) {
	return array[Math.floor(Math.random()*array.length)];
}

//Adds all transformations the user picked into a single array
function randomizeValues() 
{
	possibleTFs = []; //Stores all TF's the user wants

	if (document.getElementById("animal").checked) {
		possibleTFs = possibleTFs.concat(animalTF);                                                   //Adds animal TF
		possibleTFs = possibleTFs.concat(partialAnimalTF);                                            //Adds partial animal TF
	}
	if (document.getElementById("creature").checked)   possibleTFs = possibleTFs.concat(creatureTF);  //Adds creature TF
	if (document.getElementById("expansion").checked)  possibleTFs = possibleTFs.concat(expansionTF); //Adds expansion TF
	if (document.getElementById("tg").checked) {
		if (document.getElementById("female").checked) possibleTFs = possibleTFs.concat(TGfem);       //Adds TG for females
		if (document.getElementById("male").checked)   possibleTFs = possibleTFs.concat(TGmale);      //Adds TG for males
		if (document.getElementById("other").checked)  possibleTFs = possibleTFs.concat(TGoth);       //Adds TG for other
	}
	if (document.getElementById("weird").checked)      possibleTFs = possibleTFs.concat(weirdTF);     //Adds weird/bodymod TF
	if (document.getElementById("inanimate").checked)  possibleTFs = possibleTFs.concat(inanimateTF); //Adds inanimate TF
	if (document.getElementById("tffood").checked)     possibleTFs = possibleTFs.concat(foodTF);      //Adds food  TF
	if (document.getElementById("plant").checked)      possibleTFs = possibleTFs.concat(plantTF);     //Adds plant TF
	if (document.getElementById("tfother").checked)    possibleTFs = possibleTFs.concat(otherTF);     //Adds other TF
}

//Creates the character
function createCharacter() 
{
	if (document.getElementById("rand_char").checked) {
		//Shows the lock toggle
		document.getElementById("charlock").style.display = "inline";

		//Changes the character name
		let charName = document.getElementById("charname").value;
		if (charName.trim() != "") characterResult = document.getElementById("charname").value;
		else characterResult = "Your character"; //Default

		//Character title and description
		document.getElementById("charactertitle").innerHTML = "Character";
		characterResult += " is a " + RandomValue(height) + " " + RandomValue(bodytype) + " woman with " + RandomValue(skinColor) + " skin.<br> She has " + RandomValue(hairLength) + ", " + RandomValue(hairStyle) + ", " + RandomValue(hairColor) + " hair and " + RandomValue(eyeColor) + " eyes. She's currently wearing " + RandomValue(clothing) + " clothing.";

		return characterResult;
	}
	else { //Hides the lock toggle, title and results
		document.getElementById("charlock").style.display = "none";
		document.getElementById("charactertitle").innerHTML = "";
		document.getElementById("CHARresult").innerHTML = "";
	}
}

//Generates the transformation description
function createTransformation()
{
	//Displays the title and changes the transform button text
	document.getElementById("transformtitle").innerHTML = "Transformation";
	document.getElementById("tfbutton").innerHTML = "Transform again!";

	transformationResult = RandomValue(possibleTFs) + ", she is " + RandomValue(reaction) + " it."; //Generates a random TF and a reaction
	
	if (document.getElementById("mental").checked) transformationResult += "<br> Her mind starts changing, making " + RandomValue(TFmental) + ".";
	transformationResult += "<br>The transformation was caused by ";
	transformationResult = Gender(transformationResult); //Adjusts the pronouns to fit the gender

	//Check to see if the trigger ends with /end, if not then it adds a location
	let temp_trigg = RandomValue(trigger);
	transformationResult += temp_trigg.split('/end')[0];
	if (temp_trigg.substr(temp_trigg.length - 4) != "/end") { if (document.getElementById("INCLlocation").checked) transformationResult += " " + RandomValue(TFlocation) + "."; }
	else transformationResult += ".";

	//Adds modifiers to animals and inanimate TF's (e.g. transforms into a 'fox' costume, head transforms into that of a 'cow')
	transformationResult = transformationResult.replace("/Amod", RandomValue(possibleModsA));
	transformationResult = transformationResult.replace("/mod", RandomValue(possibleMods));

	//Adds a extra modifier if the user wants it, if not then there will be none (e.g. transforms into a 'pregnant' cow)
	if (document.getElementById("INCLextra").checked) transformationResult = transformationResult.replace("/extra/", RandomValue(extraMod));
	else transformationResult = transformationResult.replace("/extra/", " ");

	//Adds the time it takes to TF
	for (i = 0; i < 2; i++) transformationResult = transformationResult.replace("/t/", RandomValue(TFtime));

	//If the user wants time/fate
	if (document.getElementById("time-fate").checked)
	{
		let temp_rev = RandomValue(TFreversal);
		let temp_temp = RandomValue(TFtemporary);
		transformationResult += "<br><br>The changes are " + temp_rev;
		transformationResult = transformationResult.replace("/time/", temp_temp);
		
		//Adds a potential extra modifier if the fate is temporary
		var temp_pen = RandomValue(TFpenalty);
		if(temp_pen != "" && temp_rev.substr(temp_rev.length - 9) != "permanent") {
			//Picks a random number (1 or 2) to choose the fate
			var rand_rev = Math.floor(Math.random() * 2) + 1;

			if (rand_rev === 1) transformationResult += ", but if they " +  temp_pen + " it becomes permanent";
			else if (temp_temp.substr(0, 4) === "in a") transformationResult += ", but if they " +  temp_pen + " then their transformation lengthes by " + RandomValue(TFtempPen);
		}
		transformationResult += ".";
	}
	return transformationResult;
}

//Changes the gender of the character, default is female
function Gender(thestring, char) 
{
	var M_pronouns = [" his ", "His ", " he ", "He ", " he's ", " man ", " him "];
	var O_pronouns = [" their ", "Their ", " they ", "They ", " they're ", " person ", " them ", " have "];
	var pronouns = [];

	if (document.getElementById("female").checked === true) return thestring;
	else if (document.getElementById("male").checked === true) pronouns = M_pronouns;
	else {
		pronouns = O_pronouns;
		thestring = thestring.replace("transforms", "transform");
	}

	thestring = thestring.replace(/(?:^|\W)making her(?:$|\W)/g, " making" + pronouns[6]);

	thestring = thestring.replace(/(?:^|\W)her(?:$|\W)/g, pronouns[0]);
	thestring = thestring.replace(/(?:^|\W)Her(?:$|\W)/g, pronouns[1]);
	thestring = thestring.replace(/(?:^|\W)she(?:$|\W)/g, pronouns[2]);
	thestring = thestring.replace(/(?:^|\W)She(?:$|\W)/g, pronouns[3]);
	thestring = thestring.replace(/(?:^|\W)she's(?:$|\W)/g, pronouns[4]);

	thestring = thestring.replace(/(?:^|\W)he s(?:$|\W)/g, pronouns[4]);
	thestring = thestring.replace(/(?:^|\W)they s(?:$|\W)/g, pronouns[4]);
	thestring = thestring.replace(/(?:^|\W)He s(?:$|\W)/g, pronouns[4]);
	thestring = thestring.replace(/(?:^|\W)They s(?:$|\W)/g, pronouns[4]);

	if (char === true) thestring = thestring.replace(/(?:^|\W)woman(?:$|\W)/g, pronouns[5]);

	if (document.getElementById("other").checked === true) {
		thestring = thestring.replace("they's", "they're");
		thestring = thestring.replace("they is", "they're");
		thestring = thestring.replace("grows", "grow");
		thestring = thestring.replace("starts", "start");
		thestring = thestring.replace(/(?:^|\W)mind start(?:$|\W)/g, " mind starts ");
		thestring = thestring.replace("shrinks", "shrink");
		thestring = thestring.replace("turns", "turn");
		thestring = thestring.replace(/(?:^|\W)has(?:$|\W)/g, pronouns[7]);
	}
	return thestring;
}

//Copies the results to the clipboard
function copyButt() 
{
	for (i = 0; i < 10; i++) {
		finalResults = finalResults.replace("<br>", "\n"); //removes html breaklines and inserts text breaklines
		finalResults = finalResults.replace(/ +(?= )/g,''); //removes double spaces
		finalResults = finalResults.replace(/^ +/gm, ''); //removes empty spaces at the begining of sentences
	}
	copyStringToClipboard(finalResults);
	console.log(finalResults); //For debugging purposes
}

function copyStringToClipboard (str) 
{
   var el = document.createElement('textarea');
   el.value = str;
   el.setAttribute('readonly', '');
   el.style = {position: 'absolute', left: '-9999px'};
   document.body.appendChild(el);
   el.select();
   document.execCommand('copy');
   document.body.removeChild(el);
}
