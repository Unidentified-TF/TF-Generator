var characterResult;
var transformationResult;
var finalResults = ""; //Saves the results for copy

var possibleTFs  = [];
var possibleAlts = [];
var extraMod     = [];
var startgender  = "";
var gender       = "";

var isSound = false; var sound = [];


//====================================================================================
//	Functions
//====================================================================================

//Picks random out of array
function RandomValue(array) { return array[Math.floor(Math.random()*array.length)]; }

//Creates the transformation and character and displays it
function CreateResults() {
	//Displays the copy button and the lock toggle
	document.getElementById("copybutton").style.display = "inline";
	document.getElementById("tflock").style.display = "inline";

	document.getElementById("transformtitle").innerHTML = "Transformation";

	//If the transformation is not locked then it will produce results
	if (!document.getElementById("locktf").checked)   { transformationResult = Transformation(); document.getElementById("TFresult").innerHTML = transformationResult; }

	//If the character is not locked then it will produce results
	if (!document.getElementById("lockchar").checked) { characterResult = Character(); if (characterResult != null) document.getElementById("CHARresult").innerHTML = characterResult; }
	
	//Saves the results for copying
	if (characterResult != null) finalResults = "Character:\n" + characterResult + "\n\nTransformation:\n" + transformationResult;
	else finalResults = "Transformation:\n" + transformationResult;

	//debug();
}
//First function to run, gathers all information and displays it
function Transformation() {
	if (document.getElementById("female").checked === true) startgender = "FEM"; else if (document.getElementById("male").checked === true) startgender = "MALE"; else startgender = "OTH";

	selectTF();

	let TFresult = "";

	//Alternative start
	let altB = false;
	let noFate = false;
	if (Math.floor(Math.random() * 2) === 1) {
		let alt = RandomValue(possibleAlts);
		TFresult += alt.split("/noFate")[0] + "."; if (alt.substr(alt.length - 7) === "/noFate") noFate = true; altB = true;
	}
	else TFresult += RandomValue(possibleTFs) + ",";

	//Fills in all the empty fields
	let alt   = RandomValue(possibleTFs);
	TFresult  = TFresult.replace("/any/", alt.charAt(0).toLowerCase() + alt.slice(1));
	let TGres = RandomValue(TGGEN);
	TFresult  = TFresult.replace("/tg/", TGres.charAt(0).toLowerCase() + TGres.slice(1));

	//If any non alt-start result has noFate
	TFresult = TFresult.replace("/noFate", function(v){ altB = true; noFate = true; return ""; })

	//Mental/world altering
	if(document.getElementById("mental").checked)       { if (Math.floor(Math.random() * 5) === 1) TFresult += "<br><i><b>" + RandomValue(altering) + "</b></i>."; }

	//Adds location if it's not a alt start
	if(document.getElementById("INCLlocation").checked) { if (!altB) TFresult += "<br>" + addTrigger() + "."; } else TFresult = TFresult.slice(0, -1) + ".";

	//Creates a trigger and replaces it in a /trigger/
	let trigg = addTrigger(); TFresult = TFresult.replace("/trigger/", (trigg.charAt(0).toLowerCase() + trigg.slice(1)));

	//Adds duration of TF
	let dur = "";
	if(document.getElementById("time-fate").checked) { if(!noFate) dur = "<br><br>The changes are " + RandomValue(TFreversal) + "!"; }

	isSound = false; sound = [];

	TFresult = TFresult.replace("/mod/", function(token){isSound = true; return replaceAnimal(possibleMods)}); //needs to be here because it has potential modifiers that need to be replaced
	TFresult = replacer(TFresult);

	//Speech / sound
	for (i = 0; i < 3; i++) {
		TFresult = TFresult.replace("/Amod",  function(token){isSound = true; return replaceAnimal(possibleModsA)});
		TFresult = TFresult.replace("/farm/", function(token){isSound = true; return replaceAnimal(animalFarm)});
		TFresult = TFresult.replace("/pet/",  function(token){isSound = true; return replaceAnimal(pets)});
	}
	if (sound[0] != null && sound[0] != "" && isSound && Math.floor(Math.random() * 2) === 1) {if (Math.floor(Math.random() * 3) === 1) TFresult += "<br><br>Your speech is now frequently interrupted by " + sound[0] + "."; else TFresult += "<br><br>You can no longer speak, only " + sound[0].slice(0, -3) + ".";}
	
	//if(TFresult.includes("/extraFix/")) { for (i = 0; i < 2; i++) {TFresult = TFresult.replace("/extraFix/", ""); } if (gender == "MTF") { TFresult = TFresult.replace("/extra/", RandomValue(TGextras[2])); TFresult = TFresult.replace("/gender/", ""); } else if (gender == "FTM") { TFresult = TFresult.replace("/extra/", RandomValue(TGextras[3])); TFresult = TFresult.replace("/gender/", ""); } else extraMod = allMod; }
	//if(TFresult.includes("/extraFix/")){for(i=0;i<2;i++)TFresult=TFresult.replace("/extraFix/","");"MTF"==gender||"FEM"==startgender&&""==gender?(TFresult=TFresult.replace("/extra/",RandomValue(TGextras[2])),TFresult=TFresult.replace("/gender/","")):"FTM"==gender||"MALE"==startgender&&""==gender?(TFresult=TFresult.replace("/extra/",RandomValue(TGextras[3])),TFresult=TFresult.replace("/gender/","")):extraMod=allMod}
	if(TFresult.includes("/extraFix/")) { let fill = [RandomValue(TGextras[2]), RandomValue(TGextras[3])]; if(!document.getElementById("INCLextra").checked) {fill[0] = ""; fill[1] = ""; } for(i=0;i<2;i++) { TFresult = TFresult.replace("/extraFix/", ""); } if (gender === "MTF" || (startgender === "FEM" && gender === "")) { TFresult = TFresult.replace("/extra/", fill[0]); TFresult = TFresult.replace("/gender/", ""); } if (gender === "FTM" || (startgender === "MALE" && gender === "")) { TFresult = TFresult.replace("/extra/", fill[1]); TFresult = TFresult.replace("/gender/", ""); } else extraMod = allMod; }

	if (gender == "FTM") TFresult = TFresult.replace("/gender/", "male "); else if (gender == "MTF") TFresult = TFresult.replace("/gender/", "female "); else TFresult = TFresult.replace("/gender/", "");

	if (document.getElementById("INCLextra").checked) TFresult = TFresult.replace("/extra/", RandomValue(extraMod)); else TFresult = TFresult.replace("/extra/", "");
	TFresult = TFresult.replace("undefined", "<b>[redacted]</b>");

	return TFresult + replacer(dur);
}
//Creates the character
function Character() 
{
	if (document.getElementById("rand_char").checked) {
		//Shows the lock toggle
		document.getElementById("charlock").style.display = "inline";

		//Changes the character name
		let charName = document.getElementById("charname").value;
		if (charName.trim() != "") characterResult = "Your name is " + document.getElementById("charname").value + " and you are";
		else characterResult = "You are"; //Default

		//Character title and description
		document.getElementById("charactertitle").innerHTML = "Character";
		characterResult += " a " + RandomValue(height) + " " + RandomValue(bodytype) + replacer("/charGen/") + " with " + RandomValue(skinColor) + " skin.<br> You have " + RandomValue(hairLength) + ", " + RandomValue(hairStyle) + ", " + RandomValue(hairColor) + " hair and " + RandomValue(eyeColor) + " eyes.<br>You're currently wearing " + RandomValue(clothing) + " clothing.";
		//characterResult += "You have " + RandomValue(breasts) + "-cups"
		return characterResult;
	}
	else { //Hides the lock toggle, title and results
		document.getElementById("charlock").style.display = "none";
		document.getElementById("charactertitle").innerHTML = "";
		document.getElementById("CHARresult").innerHTML = "";
	}
}
//Controls accessible transformations
function selectTF(arg1, arg2) {
	possibleTFs  = [];
	possibleAlts = altBeginning;
	extraMod     = allMod;
	gender       = "";

	if (document.getElementById("tg").checked) {
		if      (startgender === "MALE") { possibleTFs = possibleTFs.concat(TGMTF); possibleAlts = possibleAlts.concat(altBeginningTG[0]); }
		else if (startgender === "FEM" ) { possibleTFs = possibleTFs.concat(TGFTM); possibleAlts = possibleAlts.concat(altBeginningTG[1]); }
		else if (startgender === "OTH" ) { possibleTFs = possibleTFs.concat(TGGEN); possibleAlts = possibleAlts.concat(allTGalts); }

		if(Math.floor(Math.random() * 2) === 1) {
			if(startgender === "FEM")  { gender = "FTM"; extraMod = TGextras[1]; }
			if(startgender === "MALE") { gender = "MTF"; extraMod = TGextras[0]; }
			if(startgender === "OTH")    gender = "OTH";
		}
	}
	else {
		if (startgender === "FEM" ) extraMod = TGextras[2];
		if (startgender === "MALE") extraMod = TGextras[3];
	}

	if (document.getElementById("animal").checked) {
		possibleTFs  = possibleTFs.concat(animalTF, partialAnimalTF);
		possibleAlts = possibleAlts.concat(altBeginningAnim);
		if      (gender === "MTF"  && document.getElementById("tg").checked) possibleTFs = possibleTFs.concat(animalTG[0]);
		else if (gender === "FTM"  && document.getElementById("tg").checked) possibleTFs = possibleTFs.concat(animalTG[1]);
		else if (gender === "OTH"  && document.getElementById("tg").checked) possibleTFs = possibleTFs.concat(animalTG[2]);
	}
	if (document.getElementById("creature").checked) {
		possibleTFs  = possibleTFs.concat(creatureTF, partialCreatureTF);
		possibleAlts = possibleAlts.concat(altBeginningCrea);
	}
	if (document.getElementById("expansion").checked) {
		possibleTFs = possibleTFs.concat(expansionTF);
		if      (gender === "MTF"  && document.getElementById("tg").checked) possibleTFs = possibleTFs.concat(expansionTG[0]);
		else if (gender === "FTM"  && document.getElementById("tg").checked) possibleTFs = possibleTFs.concat(expansionTG[1]);
		else if (gender === "OTH"  && document.getElementById("tg").checked) possibleTFs = possibleTFs.concat(expansionTG[2]);
	}
	if (document.getElementById("weird").checked) {
		if      (gender === "MTF"  || (startgender === "FEM"  && gender === ""))  possibleTFs = possibleTFs.concat(weirdMTF);
		else if (gender === "FTM"  || (startgender === "MALE" && gender === ""))  possibleTFs = possibleTFs.concat(weirdFTM);
		else                                                                      possibleTFs = possibleTFs.concat(weirdMTF, weirdFTM)
		possibleTFs = possibleTFs.concat(weirdTF);
	}
	if (document.getElementById("tffood").checked) {
		possibleTFs = possibleTFs.concat(foodTF); 
		if      (gender === "MTF"  && document.getElementById("tg").checked) possibleTFs = possibleTFs.concat(foodTG[0]);
		else if (gender === "FTM"  && document.getElementById("tg").checked) possibleTFs = possibleTFs.concat(foodTG[1]);
		else if (gender === "OTH"  && document.getElementById("tg").checked) possibleTFs = possibleTFs.concat(foodTG[2]);
	}
	if (document.getElementById("inanimate").checked)                        possibleTFs = possibleTFs.concat(inanimateTF);
	if (document.getElementById("plant").checked)      						 possibleTFs = possibleTFs.concat(plantTF);
	if (document.getElementById("tfother").checked)    						 possibleTFs = possibleTFs.concat(otherTF);
	if (document.getElementById("tfage").checked)                            possibleTFs = possibleTFs.concat(ageTF);
	if (document.getElementById("tfpok").checked)                            possibleTFs = possibleTFs.concat(pokemonTF);

	if (possibleTFs.length === 0) possibleTFs.push("You transform into a comedian/noFate");
}
//Returns gender
function getGender(m){ 
	if (m == 1){
		if      (gender == "MTF") return "a female version of "; 
		else if (gender == "FTM") return "a male version of "; 
		else                      return ""; 
	}
	else if (m == 2){
		if(document.getElementById("tg").checked){
			if      (gender == "MTF") return "girl"; 
			else if (gender == "FTM") return "boy"; 
			else return "girl";
		}
		else{
			if (startgender == "FEM")  return "girl";
			if (startgender == "MALE") return "boy";
			else return "girl";
		}
	}
	else return "";
}
//Adds trigger + location
function addTrigger(){
	let result = "";
	if (Math.floor(Math.random() * 5) === 1) result = "This happened " + RandomValue(TFlocation);
	else{
		let temp_trigg = RandomValue(trigger);
		result = "this was caused by " + temp_trigg.split('/end')[0];
		if (temp_trigg.substr(temp_trigg.length - 4) != "/end") result += " " + RandomValue(TFlocation);
	}
	return result;
}
//Replaces /Amod with gender and sound
function replaceAnimal(arr){
	let res = "";
	let val = RandomValue(arr);

	if (Array.isArray(val)){
		if (val.length === 3){
			if(document.getElementById("tg").checked){
				if(gender == "MTF")      res = val[0] + "/extraFix/";
				else if(gender == "FTM") res = val[1] + "/extraFix/";
				else                     res = RandomValue([val[0], val[1]]);
			}
			else{
				if(startgender == "FEM")       res = val[0] + "/extraFix/";
				else if(startgender == "MALE") res = val[1] + "/extraFix/";
				else                           res = RandomValue([val[0], val[1]]);
			}
			sound.push(val[2]);
		} 
		else if (val.length == 2) { res = val[0]; sound.push(val[1]); }
	}
	else sound.push("");

	if (res == "") res = val;
	return res;
}
//Replaces all placeholders
function replacer(res){
	//Gets arrays inside results and replaces them
	//res = res.replace(/\$(.*?)\]/g, function (v) { let ARR = JSON.parse(v.slice(1)); if (ARR[0] == 1) return RandomValue(ARR.slice(1)); else if (ARR[0] == 2) { if(gender == "MTF") return ARR[1] + "/extraFix/"; else if(gender == "FTM") return ARR[2] + "/extraFix/"; else return RandomValue(ARR.slice(1)) + "/extraFix/"; } else if (ARR[0] == 3) { sound[0] = ARR[1]; isSound = true; return ""; }});
	res = res.replace(/\$(.*?)\]/g, function (v) { let ARR = JSON.parse(v.slice(1)); if (ARR[0] === 1) return RandomValue(ARR.slice(1)); else if (ARR[0] === 2) { if(document.getElementById("tg").checked){ if (gender === "MTF") return ARR[1] + "/extraFix/"; else if(gender === "FTM") return ARR[2] + "/extraFix/"; else return RandomValue(ARR.slice(1)) + "/extraFix/"; } else { if(startgender === "FEM") return ARR[1] + "/extraFix/"; else if(startgender === "MALE") return ARR[2] + "/extraFix/"; else return RandomValue(ARR.slice(1)) + "/extraFix/"; }} else if (ARR[0] === 3) { sound[0] = ARR[1]; isSound = true; return ""; }});

	res = res.replace("/charGen/", function (v) { if (startgender == "FEM") return " woman"; if (startgender == "MALE") return " man"; else return " person"});

	//Replaces placeholders with results
	if(res.includes("/instant/"))  {   res = res.replace("/instant/", "");  res = res.replace("/t/", "instantly"); }
	res = res.replace("/genderver/",   getGender(1));
	for (i = 0; i < 2; i++)            res = res.replace("/genderver2/", getGender(2));
	for (i = 0; i < 3; i++)            res = res.replace("/t/", RandomValue(TFtime));
	res = res.replace("/Cmod",         RandomValue(possibleModsC));
	res = res.replace("/size/",        RandomValue(sizes));
	res = res.replace("/time/",        RandomValue(TFtemporary));
	res = res.replace("/alien/",       RandomValue(aliens));
	res = res.replace("/color/",       RandomValue(colors));
	res = res.replace("/triggerword/", RandomValue(triggerWords));
	res = res.replace("/circus/",      RandomValue(circus));
	//res = res.replace("/lastP/",       lastPeople[0][0]);
	res = res.replace("/lastP/",       "person above you");
	res = res.replace("/penalty/",     RandomValue(TFpenalty));
	for (i = 0; i < 2; i++)            res = res.replace("/penaltytime/", RandomValue(TFpenaltyEx));
	for (i = 0; i < 2; i++)            res = res.replace("/n/", RandomValue(["two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen"]));

	return res;
}
//Prints out active modifiers
function debug(){
	console.log("Debugging:\n---\nChar lock:", document.getElementById("lockchar").checked, "\nTF lock:", document.getElementById("locktf").checked,
				"\nStart gender:", gender, "\nCreate char:", document.getElementById("rand_char").checked, "\nChar name:", document.getElementById("charname").value,
				"\n---\nAnimal:", document.getElementById("animal").checked, "\nCreature:", document.getElementById("creature").checked, "\nExpansion:", document.getElementById("expansion").checked,
				"\nTG:", document.getElementById("tg").checked, "\nBody mod:", document.getElementById("weird").checked, "\nInanimate:", document.getElementById("inanimate").checked,
				"\nFood:", document.getElementById("tffood").checked, "\nPlant:", document.getElementById("plant").checked, "\nAge:", document.getElementById("tfage").checked,
				"\nPoke/digimon:", document.getElementById("tfpok").checked, "\nOther:", document.getElementById("tfother").checked, "\n---\nLocation:", document.getElementById("INCLlocation").checked, 
				"\nTime/fate:", document.getElementById("time-fate").checked, "\nExtra:", document.getElementById("INCLextra").checked, "\nMental:", document.getElementById("mental").checked);
}
/*function FixGrammar(result){
	result = result.replace(/\b(transform|expand|grow|steal|motion|start|click)\b/g, function(v) { return v + "s" });
	result = result.replace(/\b(go)\b/g, function(v) { return v + "es" });
	return result;
}*/

//Copies the results to the clipboard
function copyButt() 
{
	for (i = 0; i < 10; i++) {
		finalResults = finalResults.replace("<br>", "\n");   //removes html breaklines and inserts text breaklines
		finalResults = finalResults.replace(/ +(?= )/g,'');  //removes double spaces
		finalResults = finalResults.replace(/^ +/gm, '');    //removes empty spaces at the begining of sentences
	}
	finalResults = finalResults.replace(/<[^>]*>/g, '');

	copyStringToClipboard(finalResults);
	//console.log(finalResults); //For debugging purposes
}
function copyStringToClipboard (str){
   var el = document.createElement('textarea');
   el.value = str;
   el.setAttribute('readonly', '');
   el.style = {position: 'absolute', left: '-9999px'};
   document.body.appendChild(el);
   el.select();
   document.execCommand('copy');
   document.body.removeChild(el);
}
