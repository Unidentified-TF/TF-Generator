var characterResult;
var transformationResult;
var finalResults     = ""; //Saves the results for copy
userhistory = window.localStorage;

var possibleTFs      = []; //All possible TFs
var possibleAlts     = []; //All possible ALT starts / scenarios
var possibleBodyMods = []; //All possible bodymods
var extraMod         = []; //All possible extras
var startgender      = ""; //Character gender
var gender           = ""; //If TG is on (Male = MTF)

var MentalAltering   = ""; //If value has custom mental/world altering result
var CategoryOfTF     = ""; //Used for keeping track of the resulting TF ("cow" = "Animal")

var isSound = false; var sound = ""; var lockedTF = false;

window.onload = function() { DisplayHistory(); };


//====================================================================================
//	Functions
//====================================================================================

//Picks random out of array
function RandomValue(array) { return array[Math.floor(Math.random()*array.length)]; }

//Generates a transformation and character prompt
function CreatePrompt() {
	if      (document.getElementById("female").checked === true) startgender = "FEM"; 
	else if (document.getElementById("male").checked   === true) startgender = "MALE"; 
	else                                                         startgender = "OTH";

	//Displays the copy button and the lock toggle
	document.getElementById("copybutton").style.display = "inline";
	document.getElementById("tweet").style.display      = "";
	document.getElementById("tflock").style.display     = "inline";

	document.getElementById("transformtitle").innerHTML = "Transformation";

	//If the transformation is not locked then it will produce results
	if (!document.getElementById("locktf").checked)   { transformationResult = Transformation(); document.getElementById("TFresult").innerHTML = transformationResult; lockedTF = false; }
	else lockedTF = true;

	//If the character is not locked then it will produce results
	if (!document.getElementById("lockchar").checked) { characterResult = Character(); if (characterResult != null) document.getElementById("CHARresult").innerHTML = characterResult; }
	
	//Saves the results for copying
	if (characterResult != null) finalResults = "Character:\n" + characterResult + "\n\nTransformation:\n" + transformationResult;
	else finalResults = "Transformation:\n" + transformationResult;

	SaveHistory("<b>Transformation</b><br>" + transformationResult);

	TwitterShare("\"" + transformationResult + "\"");
}
//First function to run, gathers all information and displays it
function Transformation() {
	SelectTFs();

	console.log(startgender, gender, document.getElementById("tg").checked, document.getElementById("tgres").checked);

	let TFresult = "";
	let altB     = false, noFate = false; 
	CategoryOfTF = ""; MentalAltering = ""; isSound = false; sound = "";

	//ALT start has 66% chance of happening, otherwise it'll just go with the general start one
	if (Math.floor(Math.random() * 3) !== 1) {
		let alt = RandomValue(possibleAlts);
		TFresult += alt.split("/noFate")[0] + "."; 

		altB = true;
		if (alt.substr(alt.length - 7) === "/noFate") noFate = true; 
	}
	else {
		let tempTF = RandomValue(possibleTFs);
		if (Math.floor(Math.random() * 3) !== 1) TFresult += tempTF;
		else {
			altB = true;
			TFresult += AddTrigger(2) + " " + tempTF.charAt(0).toLowerCase() + tempTF.slice(1) + ".";
		}
	}

	//TFresult = "You wish /extra/cat/genderver2/s existed and after a few moments you /t/ transform into a cat/genderver2/$[7,\"A\"]"; altB = true;
	let PossAny = RandomValue(possibleTFs); let PossTG  = RandomValue(TGGEN); let PossBod = RandomValue(possibleBodyMods);

	TFresult  = TFresult.replace("/any/",     PossAny.charAt(0).toLowerCase() + PossAny.slice(1));
	TFresult  = TFresult.replace("/tg/",      PossTG.charAt(0).toLowerCase()  + PossTG.slice(1));
	if (PossBod) TFresult  = TFresult.replace("/bodymod/", PossBod.charAt(0).toLowerCase() + PossBod.slice(1));

	//console.log(TFresult);

	TFresult = Replacer(TFresult); //Needs to be here in case there is a /noFate in individual values

	//If any non alt-start result has noFate
	TFresult = TFresult.replace("/noFate", function(v){ altB = true; noFate = true; return ""; })

	//Adds location if it's not a alt start
	if (!altB) TFresult += AddTrigger() + ".";

	//Creates a trigger and replaces it in a /trigger/
	let trigg = AddTrigger(); TFresult = TFresult.replace("/trigger/", (trigg.charAt(0).toLowerCase() + trigg.slice(1)));

	//Adds duration of TF
	let dur = "";
	if(document.getElementById("time-fate").checked) { if(!noFate) dur = "<br><br>The changes are " + RandomValue(TFreversal) + "!"; }

	TFresult = Replacer(TFresult + dur);

	//Speech
	if(document.getElementById("INCLspeech").checked) {
		if (sound != "" && isSound && Math.floor(Math.random() * 2) === 1) {
			if (Math.floor(Math.random() * 3) === 1) TFresult += "<br><br>Your speech is now frequently interrupted by <b>" + sound + "</b>."; 
			else                                     TFresult += "<br><br>You can no longer speak, <b>only</b> " + sound.slice(0, -3) + ".";
		}
	}

	//Mental/world altering
	if(document.getElementById("mental").checked){
		if (MentalAltering != "") { if (Math.floor(Math.random() * 3) === 1) TFresult += "<br><i><s>" + MentalAltering + "</s></i>.";                } //If the value has its own alteration    (e.g. "You shrink": "You start enjoying being small")
		else                      { if (Math.floor(Math.random() * 5) === 1) TFresult += "<br><i><s>" + RandomValue(SelectAltering()) + "</s></i>."; } //If the category has its own alteration (e.g. Animal: "You get the urge to touch grass")
	}

	return FixArticles(TFresult);
}
//Creates the character
function Character() 
{
	if (document.getElementById("rand_char").checked) {
		//Shows the lock toggle
		document.getElementById("charlock").style.display = "inline";

		//Changes the character name
		let charName = document.getElementById("charname").value;
		if (charName.trim() != "") characterResult = "Your name is " + document.getElementById("charname").value + " and you are a ";
		else characterResult = "You are a "; //Default

		let chargender;
		if (startgender == "FEM") chargender = " woman"; else if (startgender == "MALE") chargender = " man"; else chargender = " person";

		//Character title and description
		document.getElementById("charactertitle").innerHTML = "Character";

		if(startgender == "FEM")
			characterResult += RandomValue(height) + " " + RandomValue(bodytype[0]) + chargender + " with " + RandomValue(skinColor) + " skin, " +  RandomValue(eyeColor) + " eyes and " + RandomValue(hairLength[0]) + ", " + RandomValue(hairStyle) + ", " + RandomValue(hairColor) + " hair.<br>You're currently wearing " + RandomValue(clothing) + " clothing.";
		else if(startgender == "MALE")
			characterResult += RandomValue(height) + " " + RandomValue(bodytype[1]) + chargender + " with " + RandomValue(skinColor) + " skin, " +  RandomValue(eyeColor) + " eyes and " + RandomValue(hairLength[1]) + ", " + RandomValue(hairStyle) + ", " + RandomValue(hairColor) + " hair.<br>You're currently wearing " + RandomValue(clothing) + " clothing.";
		else
			characterResult += RandomValue(height) + " " + RandomValue(bodytype[2]) + chargender + " with " + RandomValue(skinColor) + " skin, " +  RandomValue(eyeColor) + " eyes and " + RandomValue(hairLength[0]) + ", " + RandomValue(hairStyle) + ", " + RandomValue(hairColor) + " hair.<br>You're currently wearing " + RandomValue(clothing) + " clothing.";
		
		return characterResult;
	}
	else { //Hides the lock toggle, title and results
		document.getElementById("charlock").style.display = "none";
		document.getElementById("charactertitle").innerHTML = "";
		document.getElementById("CHARresult").innerHTML = "";
	}
}
//Controls accessible transformations
function SelectTFs() {

	//Resetting all values
	gender       = "";
	possibleTFs  = [];
	extraMod     = Mods[5];
	possibleAlts = altBeginning;

	//If TG is enabled
	if (document.getElementById("tg").checked) {
		if      (startgender === "MALE") { possibleTFs = possibleTFs.concat(TGMTF); possibleAlts = possibleAlts.concat(altBeginningTG[0]); }
	    else if (startgender === "FEM" ) { possibleTFs = possibleTFs.concat(TGFTM); possibleAlts = possibleAlts.concat(altBeginningTG[1]); }
		else if (startgender === "OTH" ) { possibleTFs = possibleTFs.concat(TGGEN); possibleAlts = possibleAlts.concat(allTGalts);         }
	}

	if (document.getElementById("tgres").checked) {
		if      (startgender === "MALE") { gender = "MTF"; extraMod = Mods[0]; }
	    else if (startgender === "FEM" ) { gender = "FTM"; extraMod = Mods[1]; }
	}
	else {
		if      (startgender === "FEM" ) extraMod = Mods[2];
		else if (startgender === "MALE") extraMod = Mods[3];
	}
	if (startgender === "OTH" ) { gender = "OTH"; extraMod = Mods[5]; }

	//Animal TFs
	if (document.getElementById("animal").checked) {
		possibleTFs  = possibleTFs.concat(animalTF, partialAnimalTF);                                //All animal TFs
		possibleAlts = possibleAlts.concat(altBeginningAnim);								         //Adds the animal ALT starts
		if      (gender === "MTF") possibleTFs = possibleTFs.concat(animalTG[0]);	                 //MTF animal TFs
		else if (gender === "FTM") possibleTFs = possibleTFs.concat(animalTG[1]);	                 //FTM animal TFs
		else if (gender === "OTH") possibleTFs = possibleTFs.concat(animalTG[2]); 	                 //General animal TGTFs
	}
	//Creature TFs
	if (document.getElementById("creature").checked) {
		possibleTFs  = possibleTFs.concat(creatureTF, partialCreatureTF);                            //ALL creature TFs
		possibleAlts = possibleAlts.concat(altBeginningCrea);								         //Adds the creature ALT starts
	}
	//Expansion TFs
	if (document.getElementById("expansion").checked) {
		possibleTFs = possibleTFs.concat(expansionTF);   									         //Base expansion TFs
		possibleAlts = possibleAlts.concat(altBeginningExpans);	                                     //Adds the expansion ALT starts
		if      (gender === "MTF") possibleTFs = possibleTFs.concat(expansionTG[0]);                 //MTF expansion TFs
		else if (gender === "FTM") possibleTFs = possibleTFs.concat(expansionTG[1]);                 //FTM expansion TFs
		else if (gender === "OTH") possibleTFs = possibleTFs.concat(expansionTG[2]);                 //General expansion TGTFs
	}
	//Body mod TFs
	if (document.getElementById("bodymod").checked) {
		possibleAlts = possibleAlts.concat(altBeginningBodyMod);																											           //Adds the body mod ALT starts
		if      (gender === "MTF"  || (startgender === "FEM"  && gender === "")) { possibleTFs = possibleTFs.concat(weirdMTF);                     possibleBodyMods = [...weirdMTF]; } //MTF bodymod TFs
		else if (gender === "FTM"  || (startgender === "MALE" && gender === "")) { possibleTFs = possibleTFs.concat(weirdFTM);                     possibleBodyMods = [...weirdFTM]; } //FTM bodymod TFs
		else                                                                     { possibleTFs = possibleTFs.concat(weirdMTF, weirdFTM, weirdOTH); possibleBodyMods = [...allWeird]; } //MTF/FTM bodymod TFs
		possibleTFs = possibleTFs.concat(weirdTF);                                                                                                                                     //General bodymod TFs
	}
	//Inanimate TFs
	if (document.getElementById("inanimate").checked)  {                      
		possibleTFs  = possibleTFs.concat(inanimateTF);           							         //ALL inanimate TFs
		possibleAlts = possibleAlts.concat(altBeginningInanim);  							         //Adds the inanimate ALT starts
	}
	//Food TFs
	if (document.getElementById("tffood").checked) {
		possibleTFs  = possibleTFs.concat(foodTF);                                                   //Base food TFs   
		possibleAlts = possibleAlts.concat(altBeginningFood);                                        //Adds the food ALT starts	
		if      (gender === "MTF")                  possibleTFs = possibleTFs.concat(foodTG[0]);     //MTF food TFs
		else if (gender === "FTM")                  possibleTFs = possibleTFs.concat(foodTG[1]);     //FTM food TFs
		else if (gender === "OTH")                  possibleTFs = possibleTFs.concat(foodTG[2]);     //General food TGTFs
	}
	//Plant TFs
	if (document.getElementById("plant").checked)   possibleTFs = possibleTFs.concat(plantTF);       //ALL plant TFs
	//Other TFs
	if (document.getElementById("tfother").checked) possibleTFs = possibleTFs.concat(otherTF);       //ALL other TFs
	//Age progression TFs
	if (document.getElementById("tfap").checked)    possibleTFs = possibleTFs.concat(apTF);          //ALL age progression TFs
	//Age regression TFs
	if (document.getElementById("tfar").checked)    possibleTFs = possibleTFs.concat(arTF);          //ALL age regression TFs
	//Pokemon / Digimon TFs
	if (document.getElementById("tfmon").checked)   possibleTFs = possibleTFs.concat(pokedigimonTF); //ALL pokemon / digimon TFs
	//Character TFs
	if (document.getElementById("tfchar").checked)  possibleTFs = possibleTFs.concat(charTF);        //ALL character TFs

	//If user deselects all categories
	if (possibleTFs.length === 0) possibleTFs.push("You painfully transform into a /gender/comedian/noFate");
}
//Returns an array of mental/world altering based on certain TFs
function SelectAltering(mode){
	if      (CategoryOfTF == "A") return Altering[0].concat(Altering[1]); //Animal
	else if (CategoryOfTF == "E") return Altering[0].concat(Altering[2]); //Expansion
	else if (CategoryOfTF == "B") return Altering[0].concat(Altering[3]); //Body mod
	else if (CategoryOfTF == "I") return Altering[0].concat(Altering[4]); //Inanimate
	else if (CategoryOfTF == "F") return Altering[0].concat(Altering[5]); //Food
	else if (CategoryOfTF == "P") return Altering[0].concat(Altering[6]); //Plant
	else return Altering[0]; 
}
//Returns gender
function GetGender(m){ 
	if (m == 1){
		if      (gender == "MTF") return "a female version of "; 
		else if (gender == "FTM") return "a male version of "; 
		else                      return ""; 
	}
	else if (m == 2){
		if      (gender == "MTF" || (startgender == "FEM"  && gender == "")) return "girl"; 
		else if (gender == "FTM" || (startgender == "MALE" && gender == "")) return "boy"; 
		else                                                                 return "girl";
	}
	else if (m == 3) {
		if      (gender == "MTF") return "male "; 
		else if (gender == "FTM") return "female "; 
		else                      return ""; 
	}
	else return "";
}
//Adds trigger + location
function AddTrigger(rev){
	let result;

	if(rev != 2){
		//Only adds location (33%)
		if (Math.floor(Math.random() * 3) === 1) result = " " + RandomValue(TFlocation);
		//Adds both a trigger and location (if it doesn /end) (66%)
		else {
			let temp_trigg = RandomValue(trigger);
			result = " after " + temp_trigg.split('/end')[0];
			if (temp_trigg.substr(temp_trigg.length - 4) != "/end") {
				//33% possibility of skipping the location
				if (Math.floor(Math.random() * 3) !== 1)
					result += " " + RandomValue(TFlocation);
			}
		}
	}
	else{
		let temp_trigg = RandomValue(trigger);
		result = "After " + temp_trigg.split('/end')[0];
		if (temp_trigg.substr(temp_trigg.length - 4) != "/end") {
			//66% possibility of skipping the location
			if (Math.floor(Math.random() * 3) == 1)
				result += " " + RandomValue(TFlocation);
		}
	}

	return result;
}
//Replaces /Amod with gender and sound
function ReplaceAnimal(arr){
	let res; 
	let val = RandomValue(arr);

	//Extracts gender and sounds from animal arrays
  	if (Array.isArray(val)){
		//If the animal array includes gender and sound (e.g. ["cow","bull","mooing"])
    	if (val.length === 3){
    		if      (gender == "MTF" || (startgender == "FEM"  && gender == "")) res = val[0] + "/extraFix/"; //Female option (e.g. "cow")  + changes extras into female variants
			else if (gender == "FTM" || (startgender == "MALE" && gender == "")) res = val[1] + "/extraFix/"; //Male option (e.g. "bull") + changes extras into male variants
			else                                               res = RandomValue([val[0], val[1]]);           //Picks either male or female option
			sound = val[2];
		} 
		//If the animal array is only species and sounds (e.g. ["cat","meowing"])
		else if (val.length == 2) { res = val[0]; sound = val[1]; }
	}
	//If the animal includes no gender or sound (e.g ["giraffe"])
	else { sound = ""; res = val; }

    return res + "$[7,\"A\"]";
}
//Replaces all placeholders
function Replacer(res, name, mentionedname){
	res = res.replace("/mod/",       function(empty) { isSound = true; return ReplaceAnimal(possibleMods) });
	res = res.replace("/Cmod",       RandomValue(possibleModsC));

	//Replaces arrays inside of string arrays $[1,"You transform into a #{1, "cow", "bull"}"]
	res = res.replace(/\#(.*?)\}/g, function (v) { 
		//console.log(v);
  		let ARR = JSON.parse("[" + v.slice(2, -1) + "]"); 

		//#{1} Picks random value out of the array
		if (ARR[0] == 1) return RandomValue(ARR.slice(1)); 

		//#{2} Picks the male or female values (or either) if MTF or FTM is active, otherwise it's random
		else if (ARR[0] == 2) { 
			if      (gender == "MTF" || (startgender == "FEM"  && gender == "")) return ARR[1] + "/extraFix/"; 
			else if (gender == "FTM" || (startgender == "MALE" && gender == "")) return ARR[2] + "/extraFix/"; 
			else                                                                 return RandomValue(ARR.slice(1)); 
		} 
	});

	//Gets arrays inside values/strings and replaces them
	res = res.replace(/\$(.*?)\]/g, function (v) { 
		let ARR = JSON.parse(v.slice(1)); 

		//$[1] Picks random value out of the array
		if (ARR[0] == 1) return RandomValue(ARR.slice(1)); 

		//$[2] Picks the male or female values (or either) if MTF or FTM is active, otherwise it's random
		else if (ARR[0] == 2) { 
			if      (gender == "MTF" || (startgender == "FEM"  && gender == "")) return ARR[1] + "/extraFix/"; 
			else if (gender == "FTM" || (startgender == "MALE" && gender == "")) return ARR[2] + "/extraFix/";
			else                                               return RandomValue(ARR.slice(1)); 
		} 
		//$[3] Grabs the sound (e.g "mooing") and stores it
		else if (ARR[0] == 3) { sound = ARR[1]; isSound = true; return ""; }

		//$[4] Tells the bot if the caster, victim or both are transforming
		else if (ARR[0] == 4) { WhoGotTFed = ARR[1]; return ""; } 

		//$[5] Tells the bot to not add a start (e.g. "you /t/ transform into...")
		else if (ARR[0] == 5) return ARR[1];

		//$[6] If there's a custom mental/world change
		else if (ARR[0] == 6) { MentalAltering = ARR[1]; return ""; }

		//$[7] Tells the generator what category of TF the result was and puts appropriate mental/world changes, penalties and fates
		else if (ARR[0] == 7) { CategoryOfTF = ARR[1].toUpperCase(); return "";  }
	});

	//Replaces placeholders with results
	if(res.includes("/instant/")) {  res = res.replace("/instant/", ""); res = res.replace("/t/", "instantly"); }
	if(res.includes("/slowly/"))  {  res = res.replace("/slowly/",  ""); res = res.replace("/t/", "slowly");    }

	//res = res.replace("/futa/",		      GetGender(4));
	//res = res.replace("/futamulti/",        GetGender(5));
	res = res.replace("/genderver/",		GetGender(1));
	res = res.replace("/revgender/",		GetGender(3));
	res = res.replace("/alien/",    		RandomValue(aliens));
	res = res.replace("/color/",    		RandomValue(colors));
	res = res.replace("/Tword/", 			RandomValue(triggerWords));
	res = res.replace("/circus/",   		RandomValue(circus));
	res = res.replace("/lastP/",    		RandomValue(["your crush", "your enemy", "one of your friends"]));
	res = res.replace("/FeralAnthro/",      RandomValue(["anthro ", "anthro ", "semi-feral ", "feral ", "", "", "", "", "", "", "", "", ""]));

	//Changes fate penalties into inanimate friendly for inanimate TFs
	if (CategoryOfTF == "I") { res = res.replace("/penalty/", RandomValue(InanimPen)); 
							   res = res.replace("/time/",    RandomValue(InanimTemp)); }
	else                     { res = res.replace("/penalty/", RandomValue(TFpenalty)); 
							   res = res.replace("/time/",    RandomValue(TFtemporary)); }

	for (let i = 0; i < 3; i++) {
		res = res.replace("<n>",            "<br><br>");
		res = res.replace("/t/",            RandomValue(TFtime));
		res = res.replace("/size/",         RandomValue(sizes));
		res = res.replace("/genderver2/",   GetGender(2));
		res = res.replace("/penaltytime/",  RandomValue(TFpenaltyEx));
		res = res.replace("/n/",            RandomValue(["two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"]));

		res = res.replace("/Amod",          function(empty) { isSound = true; return ReplaceAnimal(possibleModsA) });
		res = res.replace("/farm/",         function(empty) { isSound = true; return ReplaceAnimal(animalFarm) });
		res = res.replace("/pet/",     		function(empty) { isSound = true; return ReplaceAnimal(pets) });
	}
	
	//Puts an appropriate /extra/ result without "female" or "male" based on gendered values (e.g. ["mare","stallion"])
	if(res.includes("/extraFix/")) { 
		for (let i = 0; i < 2; i++) res = res.replace("/extraFix/", ""); 
									res = res.replace("/gender/",   ""); 
		if(document.getElementById("INCLextra").checked) {
			if      (gender == "MTF" || (startgender == "FEM"  && gender == "")) res = res.replace("/extra/", RandomValue(Mods[2])); //Replaces /extra/ with MTF  variants (e.g. "busty")
			else if (gender == "FTM" || (startgender == "MALE" && gender == "")) res = res.replace("/extra/", RandomValue(Mods[3])); //Replaces /extra/ with FTM  variants (e.g. "beefy")
			else    extraMod = Mods[5]; 
		}
	}

	if      (gender == "MTF") res = res.replace("/gender/", "female ");                                         //Replaces /gender/ with "female" if TG is applied
	else if (gender == "FTM") res = res.replace("/gender/", "male ");                                           //Replaces /gender/ with "male"   if TG is applied
	else if (gender == "OTH") res = res.replace("/gender/", RandomValue(["androgynous ", "female ", "male "])); //Replaces /gender/ with "male"   if TG is applied
	else                      res = res.replace("/gender/", "");                                                //If TG is not applied then /gender/ will disappear

	if (document.getElementById("INCLextra").checked) res = res.replace("/extra/", RandomValue(extraMod));
	else { 
		if      (gender == "MTF") res = res.replace("/extra/", "female ");
		else if (gender == "FTM") res = res.replace("/extra/", "male ");
		else                      res = res.replace("/extra/", ""); 
	}

	res = res.replace("undefined", "<b>[redacted]</b>");

	return res;
}
//Prints out active modifiers
function Debug(){
	console.log("Debugging:\n---\nChar lock:", document.getElementById("lockchar").checked, "\nTF lock:", document.getElementById("locktf").checked,
				"\nStart gender:", gender, "\nCreate char:", document.getElementById("rand_char").checked, "\nChar name:", document.getElementById("charname").value,
				"\n---\nAnimal:", document.getElementById("animal").checked, "\nCreature:", document.getElementById("creature").checked, "\nExpansion:", document.getElementById("expansion").checked,
				"\nTG:", document.getElementById("tg").checked, "\nBody mod:", document.getElementById("weird").checked, "\nInanimate:", document.getElementById("inanimate").checked,
				"\nFood:", document.getElementById("tffood").checked, "\nPlant:", document.getElementById("plant").checked, "\nAge:", document.getElementById("tfage").checked,
				"\nPoke/digimon:", document.getElementById("tfpok").checked, "\nOther:", document.getElementById("tfother").checked, "\n---\nLocation:", document.getElementById("INCLlocation").checked, 
				"\nTime/fate:", document.getElementById("time-fate").checked, "\nExtra:", document.getElementById("INCLextra").checked, "\nMental:", document.getElementById("mental").checked);
}
//Replaces A and AN based on the next word (code from: https://github.com/EamonNerbonne/a-vs-an)
function FixArticles(res) {
	let valTxt = res.replace(/\b(a|an) ([\s\(\"'“‘-]?\w*)\b/gim, function(match, article, following) {
		let input = following.replace(/^[\s\(\"'“‘-]+|\s+$/g, "");
	    let out = AvsAnSimple.query(input);
	    let newArticle = out.replace(/^a/i, article.charAt(0));
	    if (newArticle !== article) {
			newArticle = newArticle;
	  	}
	  	return newArticle + ' ' + following;
	});
	return valTxt;
}
var AvsAnSimple = function(n) {
	function i(n) {
	  	var r = parseInt(t, 36) || 0, f = r && r.toString(36).length, u, e;
	  	for (n.article = t[f] == "." ? "a" : "an", t = t.substr(1 + f), u = 0; u < r; u++) e = n[t[0]] = {}, t = t.substr(1), i(e)
	}
	var t = "2h.#2.a;i;&1.N;*4.a;e;i;o;/9.a;e;h1.o.i;l1./;n1.o.o;r1.e.s1./;01.8;12.1a;01.0;12.8;9;2.31.7;4.5.6.7.8.9.8a;0a.0;1;2;3;4;5;6;7;8;9;11; .22; .–.31; .42; .–.55; .,.h.k.m.62; .k.72; .–.82; .,.92; .–.8;<2.m1.d;o;=1.=1.E;@;A6;A1;A1.S;i1;r1;o.m1;a1;r1; .n1;d1;a1;l1;u1;c1.i1.a1.n;s1;t1;u1;r1;i1;a1;s.t1;h1;l1;e1;t1;e1.s;B2.h2.a1.i1;r1;a.á;o1.r1.d1. ;C3.a1.i1.s1.s.h4.a2.i1.s1;e.o1.i;l1.á;r1.o1.í;u2.i;r1.r1.a;o1.n1.g1.j;D7.a1.o1.q;i2.n1.a1.s;o1.t;u1.a1.l1.c;á1. ;ò;ù;ư;E7;U1;R.b1;o1;l1;i.m1;p1;e1;z.n1;a1;m.s1;p5.a1.c;e;h;o;r;u1.l1;o.w1;i.F11. ;,;.;/;0;1;2;3;4;5;6;71.0.8;9;Ae;B.C.D.F.I2.L.R.K.L.M.N.P.Q.R.S.T.B;C1;M.D;E2.C;I;F1;r.H;I3.A1;T.R1. ;U;J;L3.C;N;P;M;O1. ;P1;..R2.A1. ;S;S;T1;S.U2.,;.;X;Y1;V.c;f1.o.h;σ;G7.e1.r1.n1.e;h1.a3.e;i;o;i1.a1.n1.g;o2.f1. ;t1.t1. ;r1.i1.a;w1.a1.r1.r;ú;Hs. ;&;,;.2;A.I.1;2;3;5;7;B1;P.C;D;F;G;H1;I.I6;C.G.N.P.S1.D;T.K1.9;L;M1;..N;O2. ;V;P;R1;T.S1.F.T;V;e2.i1.r;r1.r1.n;o2.n6;d.e1.s;g.k.o2;l.r1;i1.f;v.u1.r;I3;I2;*.I.n1;d1;e1;p1;e1;n1;d2;e1;n1;c1;i.ê.s1;l1;a1;n1;d1;s.J1.i1.a1.o;Ly. ;,;.;1;2;3;4;8;A3. ;P;X;B;C;D;E2. ;D;F1;T.G;H1.D.I1.R;L;M;N;P;R;S1;m.T;U1. ;V1;C.W1.T;Z;^;a1.o1.i1.g;o1.c1.h1.a1;b.p;u1.s1.h1;o.ộ;M15. ;&;,;.1;A1;.1;S./;1;2;3;4;5;6;7;8;Ai;B.C.D.F.G.J.L.M.N.P.R.S.T.V.W.X.Y.Z.B1;S1;T.C;D;E3.P1;S.W;n;F;G;H;I4. ;5;6;T1;M.K;L;M;N;O1.U;P;Q;R;S;T1;R.U2. ;V;V;X;b1.u1.m;f;h;o2.D1.e.U1;..p1.3;s1.c;Ny. ;+;.1.E.4;7;8;:;A3.A1;F.I;S1.L;B;C;D;E3.A;H;S1. ;F1;U.G;H;I7.C.D1. ;K.L.N.O.S.K;L;M1;M.N2.R;T;P1.O1.V1./1.B;R2;J.T.S1;W.T1;L1.D.U1.S;V;W2.A;O1.H;X;Y3.C1.L;P;U;a1.s1.a1.n;t1.h;v;²;×;O5;N1;E.l1;v.n2;c1.e.e1.i;o1;p.u1;i.P1.h2.i1.a;o2.b2;i.o.i;Q1.i1.n1.g1.x;Rz. ;&;,;.1;J./;1;4;6;A3. ;.;F1;T.B1;R.C;D;E3. ;S1.P;U;F;G;H1.S;I2.A;C1. ;J;K;L1;P.M5;1.2.3.5.6.N;O2.H;T2;A.O.P;Q;R1;F.S4;,...?.T.T;U4;B.M.N.S.V;X;c;f1;M1...h2.A;B;ò;S11. ;&;,;.4.E;M;O;T1..3.B;D;M;1;3;4;5;6;8;9;A3. ;8;S2;E.I.B;C3.A1. ;R2.A.U.T;D;E6. ;5;C3;A.O.R.I1.F.O;U;F3;&.H.O1.S.G1;D.H3.2;3;L;I2. ;S1.O.K2.I.Y.L3;A2. ;.;I1. ;O.M3;A1. ;I.U1.R.N5.A.C3.A.B.C.E.F.O.O5. ;A1.I;E;S1;U.V;P7;A7;A.C.D.M.N.R.S.E1. ;I4;C.D.N.R.L1;O.O.U.Y.Q1. ;R;S1;W.T9.A1. ;C;D;F;I;L;M;S;V;U7.B.L.M.N.P.R.S.V;W1.R;X1.M;h1.i1.g1.a1.o;p1.i1.o1;n.t2.B;i1.c1.i;T4.a2.i2.g1.a.s1.c;v1.e1.s;e1.a1.m1.p;u1.i2.l;r;à;Um..1.N1..1.C;/1.1;11. .21.1;L1.T;M1.N;N4.C1.L;D2. .P.K;R1. .a;b2;a.i.d;g1.l;i1.g.l2;i.y.m;no. ;a1.n.b;c;d;e1;s.f;g;h;i2.d;n;j;k;l;m;n;o;p;q;r;s;t;u;v;w;p;r3;a.e.u1.k;s3. ;h;t1;r.t4.h;n;r;t;x;z;í;W2.P1.:4.A1.F;I2.B;N1.H.O1.V;R1.F1.C2.N.U.i1.k1.i1.E1.l1.i;X7;a.e.h.i.o.u.y.Y3.e1.t1.h;p;s;[5.A;E;I;a;e;_2._1.i;e;`3.a;e;i;a7; .m1;a1;r1. .n1;d2; .ě.p1;r1;t.r1;t1;í.u1;s1;s1;i1. .v1;u1;t.d3.a1.s1. ;e2.m1. ;r1. ;i2.c1.h1. ;e1.s1.e2.m;r;e8;c1;o1;n1;o1;m1;i1;a.e1;w.l1;i1;t1;e1;i.m1;p1;e1;z.n1;t1;e1;n1;d.s2;a1. .t4;a1; .e1; .i1;m1;a1;r.r1;u1.t.u1.p1. ;w.f3. ;M;y1.i;h9. ;,;.;C;a1.u1.t1;b.e2.i1.r1;a.r1.m1.a1.n;o4.m2.a1; .m;n8; .b.d.e3; .d.y.g.i.k.v.r1.s1. ;u1.r;r1. ;t1;t1;p1;:.i6;b1;n.e1;r.n2;f2;l1;u1;ê.o1;a.s1;t1;a1;l1;a.r1; .s1; .u.k1.u1. ;l3.c1.d;s1. ;v1.a;ma. ;,;R;b1.a.e1.i1.n;f;p;t1.a.u1.l1.t1.i1.c1.a1.m1.p1.i;×;n6. ;V;W;d1; .t;×;o8;c2;h1;o.u1;p.d1;d1;y.f1; .g1;g1;i.no. ;';,;/;a;b;c1.o;d;e2.i;r;f;g;i;l;m;n;o;r;s;t;u;w;y;z;–;r1;i1;g1;e.t1;r1.s;u1;i.r3. ;&;f;s9.,;?;R;f2.e.o.i1.c1.h;l1. ;p2.3;i1. ;r1.g;v3.a.e.i.t2.A;S;uc; ...b2.e;l;f.k2.a;i;m1;a1. .n3;a3; .n5.a;c;n;s;t;r1;y.e2; .i.i8.c2.o1.r1.p;u1.m;d1;i1.o;g1.n;l1.l;m1;o.n;s1.s;v1.o1;c.r5;a.e.i.l.o.s3. ;h;u1.r2;e.p3;a.e.i.t2.m;t;v.w1.a;xb. ;';,;.;8;b;k;l;m1;a.t;y1. ;y1.l;{1.a;|1.a;£1.8;À;Á;Ä;Å;Æ;É;Ò;Ó;Ö;Ü;à;á;æ;è;é1;t3.a;o;u;í;ö;ü1; .Ā;ā;ī;İ;Ō;ō;œ;Ω;α;ε;ω;ϵ;е;–2.e;i;ℓ;";
	return i(n), {
	  	raw: n,
	  	query: function(t) {
			var i = n, f = 0, u, r;
			do r = t[f++]; while ("\"‘’“”$'".indexOf(r) >= 0);
			for (;;) {
		  	if (u = i.article || u, i = i[r], !i) return u;
		  	r = t[f++] || " "
			}
	  	}
	}
}({});


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
//Generates a twitter link to share the user's prompt
function TwitterShare(result){
	result = result.replace(/<br><br>/g, "%0a");
	result = result.replace(/<br>/g, "%0a");
	result = result.replace(/<.*?>/g, "");
	result = result.replace(/,/g, "%E2%80%9A");

	//console.log(result);

	document.getElementById("tweet").href = "https://twitter.com/intent/tweet?text=I've been transformed!&hashtags=TFGenerator" + "%0a%0a"+ result;
	//document.getElementById("tweet").setAttribute('onclick',"https://twitter.com/intent/tweet?text=Check out this cool TF generator that generates random transformation scenarios!&url=https://unidentified-tf.github.io/TF-Generator/&hashtags=TFgenerator','_blank')")
}
//Grabs the latest prompt and saves it
function SaveHistory(result){

	if(!lockedTF){
		let first, second;

		first  = userhistory.getItem("History 1");
		second = userhistory.getItem("History 2");

		userhistory.setItem("History 3", second);
		userhistory.setItem("History 2", first);
		userhistory.setItem("History 1", result);
	}

	DisplayHistory();
}
//Displays latest 3 prompts
function DisplayHistory(){
	//Corrects collapsible content container's height
	let historycontent = document.getElementById("historycont");
	if (document.getElementById("historytab").classList.contains("active")) historycontent.style.maxHeight = historycontent.scrollHeight + historycontent.clientHeight + "px";

	//Updates the container's description
	if (userhistory.getItem("History 1") == null) document.getElementById("historydesc").innerHTML = "No history";
	else                                          document.getElementById("historydesc").innerHTML = "Showing last 3 transformations";

	//Inserts the history into the container
	                                                document.getElementById("History1").innerHTML = userhistory.getItem("History 1");
	if (userhistory.getItem("History 2") != "null") document.getElementById("History2").innerHTML = userhistory.getItem("History 2");
	if (userhistory.getItem("History 3") != "null") document.getElementById("History3").innerHTML = userhistory.getItem("History 3");
}
