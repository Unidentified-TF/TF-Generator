//====================================================================================
//	Variables
//====================================================================================

var userhistory = window.localStorage;

// Settings
var nsfw = false;
var tg   = false;

// Arrays
var extraMod        = [];
var scenarios       = [];
var transformations = [];
var allCategories   = ["A", "C", "E", "I", "B", "F", "P", "CR", "MON", "AP", "AR", "BIMBO", "O", "XMAS", "HALLOWEEN"];

// Modifiers
var modifierBodymod, speech, categoryOfTF, lastAnimal, randDupe, genderPicked, addModifiers, followup, followupKey, lastChar, addFate, altering, enableSpeech, enableAltering;
var name, sex;

// Results
var tfprompt, charprompt;
var lastScenario, lastCharacter, copyOfResults;


//====================================================================================
//	Functions
//====================================================================================

/**
 * Initializes the prompt generation
 */
function Initialize() {
	// Resets variables
	speech = categoryOfTF = sex = charprompt = tfprompt = copyOfResults = "";
	enableAltering = enableSpeech = false; 
	addModifiers = addFate = true;
	randDupe = null;
	genderPicked = 0;

	GetSettings();
	SelectTFs();

	// Display the copy and tweet buttons
	document.getElementById("copybutton").removeAttribute("disabled");
	document.getElementById("tweetbutton").classList.remove("disabled");

	// Display the "lock" buttons for the character and TF
	document.getElementById("character-lock").style.display = "inline";
	document.getElementById("tf-lock").style.display = "inline";
}

/**
 * Finalizes the prompt generation
 */
function Finalize() {
	SaveHistory("<h3>Transformation</h3>" + tfprompt);

	copyOfResults = "#TFGenerator\n\n";
	if (charprompt) {
		copyOfResults += `Character:\n${charprompt}\n\n`;
	}
	copyOfResults += `Transformation:\n${tfprompt}`;

	TwitterShare(tfprompt);
}

/**
 * Gets all the user settings before generating the prompt
 */
function GetSettings() {
	const selectedGenderChange = document.getElementById("target-gender").value;

	tg   = false;
	sex  = undefined;
	nsfw = document.getElementById("nsfw").checked;

	// Sets the sex and TG based on the selected settings
	if (selectedGenderChange === "char-gender") {
		if (document.getElementById("female").checked === true) {
			sex = "MTF";
		} else if (document.getElementById("male").checked === true) {
			sex = "FTM";
		}
	} else if (selectedGenderChange === "MTF") {
		tg = true;
		sex = "MTF";
	} else if (selectedGenderChange === "FTM") {
		tg = true;
		sex = "FTM";
	} else if (selectedGenderChange === "FUTA") {
		sex = "FUTA";
	}

	// Gets all the selected/checked categories
	var selectedCategories = allCategories.filter(category => document.getElementById(category).checked);
	if (tg) { 
		selectedCategories.push("TG");
	}

	// Gets the speech and mental/world change settings
	if (document.getElementById("altering-toggle").checked) {
		enableAltering = true;
	}
	if (document.getElementById("speech-toggle").checked) {
		enableSpeech   = true;
	}

	// Selects a random category
	categoryOfTF = RandomValue(selectedCategories); 
}

/**
 * Creates the prompt
 */
function CreatePrompt() {
	Initialize();

	//console.log("TF:", categoryOfTF, "NSFW:", nsfw, "TG:", tg, "SEX:", sex)

	var result;

	// Creates a new character if it isn't locked
	if (!document.getElementById("lock-character-toggle").checked) { 
		CreateCharacter(); 
	}

	// Creates a new scenario if it isn't locked
	if (!document.getElementById("lock-tf-toggle").checked) {
		result = CreateScenario();
	} else {
		result = lastScenario;
	}

	result = Replacer(result);

	// Adds if there is no "/noFate" in the prompt
	if (addFate) {
		result += CreateFate();
	} else {
		result = FateReplacer(result, false);
	}

	// Adds if there is no "<x>" in the prompt
	if (addModifiers) {
		result += CreateModifiers();
	}

	// Saves the prompt with the right formatting, and displays it
	tfprompt = FixFormat(FixArticles(result));
	document.getElementById("tf-result").innerHTML = tfprompt;

	Finalize();
}

/**
 * Creates the character description
 */
function CreateCharacter() {
	// Creates a new character if enabled, otherwise hide the character description
	if (document.getElementById('create-character').checked) {
		var description = "You are";

		// Gets the character settings
		const selectedGender = document.querySelector('input[name=gender]:checked').value;
		const charName       = document.getElementById("random-name").checked ? getRandomName(selectedGender) : document.getElementById("charname").value;
		const addClothing    = document.getElementById("clothing").checked;

		// Generates the character's values
		const g = {"female": 0, "male": 1, "person": 2}[selectedGender];
		const char_height = RandomValue(height);
		const body_type   = RandomValue(bodytype[g]);
		const hair_length = RandomValue(hairLength[g]);

		// Different format, depending whether the character has a name or not
		if (charName) {
			description += ` ${charName}, a ${char_height}, ${body_type} ${selectedGender}.`;
		} else {
			description += ` a ${char_height}, ${body_type} ${selectedGender}.`;
		}

		description += ` Your ${RandomValue(skinColor)} skin ${RandomValue(descriptor1)} your ${RandomValue(eyeColor)} eyes, while your ${hair_length}, ${RandomValue(hairStyle)}, ${RandomValue(hairColor)} hair adds to your ${RandomValue(descriptor2)}.`;

		// Adds clothing if enabled
		if (addClothing) {
			const clothing_style = RandomValue(clothing);
			const clothing_state = clothing_style === "no" ? "" : `${RandomValue(clothstate)} `;

			description += ` You're dressed in ${clothing_state}${clothing_style} attire, reflecting your ${RandomValue(characteristic)}.`;
		}

		// Saves the character prompt with the right formatting, and displays it
		charprompt = FixArticles(description);
		lastCharacter = charprompt;
		document.getElementById("character-result").innerHTML = charprompt;
	}
	else {
		document.getElementById("character-lock").style.display = "none";
		document.getElementById("character-result").innerHTML = "";
	}
}

/**
 * Prepares the appropriate TFs/Scenarios/Extras for the prompt
 */
function SelectTFs() {
	// Resets variables
	transformations = [];
	modifierBodymod = bodymod;
	extraMod        = Mods[5];
	altering		= [Alterings[0]];

	if (!nsfw) {
		scenarios = [generalScenarios];    // SFW
	} else {
		scenarios = [allGeneralScenarios]; // NSFW + SFW
	}

	// Genderbends transformations
	if      (sex === "MTF" ) extraMod = Mods[0]; // "You transform into a 'female' dog"
	else if (sex === "FTM" ) extraMod = Mods[1]; // "You transform into a 'male' dog"
	else if (sex === "FUTA") extraMod = Mods[4]; // "You transform into a 'futa' dog"

	//================================================================================================================

	switch (categoryOfTF) {
		// Animals
		case "A":
			transformations = [["You /t/ transform into a /extra/<anthro> /animal/"],
							   ["You /t/ transform into a /FeralAnthro//animal/"], partAnimal,
							   ["You /t/ transform into a /FeralAnthro//animal/"], partAnimal];     	   // Animal TFs
			if (!nsfw) scenarios.push(animalScenarios);								                       // Animal scenarios (SFW)
			else 	   scenarios.push(allAnimalScenarios);								                   // Animal scenarios (NSFW + SFW)
			altering.push(Alterings[1]);								                                   // Animal altering
			if      (sex === "MTF") transformations.push(animalTG[0]);                                     // MTF (SFW)
			else if (sex === "FTM") transformations.push(animalTG[1]);                                     // FTM (SFW)
			else 	 	            transformations.push(animalTG[2]);                                     // General TGTF (SFW) (for FUTA and general)
			break;
		// Creatures
		case "C": 
			transformations = [["You /t/ transform into a /extra//creature/"],
								["You /t/ transform into a /extra//creature/"], partCreature];   		   // Creature TFs
			if (!nsfw) scenarios.push(creatureScenarios);								                   // Creature scenarios (SFW)
			else 	   scenarios.push(allCreatureScenarios);								               // Creature scenarios (NSFW + SFW)
			break;
		// Expansion
		case "E":
			if (!nsfw) { 
				transformations = [expansion]; 									              			   // Expansion TFs (SFW)
				scenarios.push(expansionScenarios);	                                                       // Expansion scenarios (SFW)
			} else {
				transformations = [allExpansion];   									                   // Expansion TFs (NSFW + SFW)
				scenarios.push(allExpansionScenarios);                                                     // Expansion scenarios (NSFW + SFW)
			}
			altering.push(Alterings[2]);								                                   // Expansion altering 

			if (sex === "MTF") {
				if (!nsfw) transformations.push(expansionTG[0]);  									       // MTF (NSFW)
				else 	   transformations.push(allMTFexpansions);                                         // MTF (SFW)
			} else if (sex === "FTM") {
				if (!nsfw) transformations.push(expansionTG[1]);  									       // FTM (NSFW)
				else 	   transformations.push(allFTMexpansions); 										   // FTM (SFW)
			} else if (nsfw) {
				transformations.push(NSFWexpansionTG[2]);                                                  // General TG (NSFW)
			}
			break;
		// Bodymod
		case "B":
			if (!nsfw) scenarios.push(bodymodScenarios);														      // Bodymod scenarios (SFW)
			else       scenarios.push(allBodymodScenarios);														      // Bodymod scenarios (NSFW + SFW)
			altering.push(Alterings[3]);								                                   			  // Bodymod altering
			if      (sex === "MTF" && nsfw) { transformations.push(allMTFbodymod); modifierBodymod = allMTFbodymod; } // MTF (NSFW)
			else if (sex === "FTM" && nsfw) { transformations.push(allFTMbodymod); modifierBodymod = allFTMbodymod; } // FTM (NSFW)
			else if (nsfw)                  { transformations = [allBodymod];      modifierBodymod = allBodymod;    } // bodymod TFs (NSFW + SFW)
			else                              transformations = [bodymod]; 									          // Bodymod TFs (SFW)
			break;
		// Inanimate
		case "I":
			scenarios.push(inanimateScenarios);  							                               // Inanimate scenarios
			altering.push(Alterings[4]);								                                   // Inanimate altering
			if (!nsfw) transformations = [inanimate];												       // Inanimate TFs (SFW)
			else       transformations.push(allInanimate);											       // Inanimate TFs (NSFW + SFW)	  
			break;
		// Food
		case "F":
			scenarios.push(foodScenarios);                                                                 // Food scenarios	
			altering.push(Alterings[5]);								                                   // Food altering							     
			if      (sex === "MTF" && nsfw) transformations.push(allMTFfood);                  			   // MTF (NSFW + SFW)
			else if (sex === "FTM" && nsfw) transformations.push(allFTMfood);      	          			   // FTM (NSFW + SFW)
			else if (nsfw)                  transformations.push(allGENfood);      	          			   // General TG (NSFW + SFW)
			else                            transformations = [food];                                      // Food TFs (SFW)
			break;
		// Plant
		case "P":
			transformations = [plant];                                              					   // Plant TFs
			scenarios.push(plantScenarios);                                                                // Plant scenarios
			altering.push(Alterings[6]);								                                   // Plant altering
			break;
		// Other
		case "O":
			transformations = [other];                                           					       // Other TFs
			scenarios.push(otherScenarios);                                                                // Other scenarios
			break;
		// Age progression
		case "AP":
			transformations = [AP];                                       						           // Age progression TFs
			scenarios.push(apScenarios);                                                                   // Age progression scenarios
			altering.push(Alterings[10]);								                                   // Age progression altering
			break;
		// Age regression
		case "AR":
			transformations = [AR];   						                                               // Age regression TFs
			scenarios.push(arScenarios);                                                                   // Age regression scenarios
			altering = [Alterings[9]];								                                       // Age regression altering
			break;
		// Pokemon & digimon
		case "MON":
			transformations = [poke_digimon]; 														       // Pokemon & digimon TFs
			scenarios.push(pokemonScenarios);                                                              // Pokemon & digimon scenarios
			altering.push(Alterings[11]);								                                   // Pokemon & digimon altering
			break;
		// Character
		case "CR":
			transformations = [character];									           					   // Character TFs
			scenarios.push(characterScenarios);                                                            // Character scenarios
			altering.push(Alterings[7]);								                                   // Character altering
			break;
		// Bimbo
		case "BIMBO":
			transformations = [["You /t/ transform into a /bimbo/"]];									   // Bimbo TFs
			scenarios.push(bimboScenarios);                                                                // Bimbo scenarios
			altering.push(Alterings[8]);								                                   // Bimbo altering
			break;
		// TG
		case "TG": 
			// MTF
			if (sex === "MTF") {
				extraMod = Mods[2]; 
				if (!nsfw) { 
					transformations = [TGMTF];                 											    // MTF (SFW)
					scenarios.push(tgScenarios[0]);            											    // MTF scenarios (SFW)
				} else { 
					transformations.push(allTGMTF);            												// MTF (NSFW + SFW)
					scenarios.push(allTGscenarios[0]);         												// MTF scenarios (NSFW + SFW)
				}
			}
			// FTM
			else if (sex === "FTM") {
				extraMod = Mods[3]; 
				if (!nsfw) {
					transformations = [TGFTM];                 												// FTM (SFW)
					scenarios.push(tgScenarios[1]);            												// FTM scenarios (SFW)
				} else { 
					transformations.push(allTGFTM);            												// FTM (NSFW + SFW)
					scenarios.push(allTGscenarios[1]);         												// FTM scenarios (NSFW + SFW)
				}
			}
			// General TG
			else {
				if (!nsfw) { 
					transformations = [TGGEN];				   											    // General TG (SFW)
					scenarios.push(everySFWTGscenario);        												// General TG scenarios (SFW)
				} else {
					transformations.push(allTGGEN); 		   												// General TG (NSFW + SFW)
					scenarios.push(everyTGscenario);           												// General TG scenarios (NSFW + SFW)
				}
			}
			break;
		// Christmas
		case "XMAS":
			transformations = [christmas]; 																	 // Christmas TFs
			scenarios.push(christmasScenarios);                                                              // Christmas scenarios
			altering.push(Alterings[12]);								                                     // Christmas altering
			break;
		// Halloween
		case "HALLOWEEN":
			transformations = [halloween]; 																     // Halloween TFs
			//scenarios.push(halloweenScenarios);                                                              // Halloween scenarios
			altering.push(Alterings[13]);								                                     // Halloween altering
			break;
	}

	// If the user turns off all categories, then they'll get a joke prompt
	if (transformations.length === 0) {
		scenarios = [["After turning off all the categories, /any/"]];
		transformations = [["You /t/ transform into #{1,\"a comedian\",\"yourself\",\"something strange! You look into a mirror and find your **own** reflection staring back at you\",\"nothing\",\"[||nothing||]\"}"]];
	}
}

/**
 * Creates a transformation scenario
 * @returns The scenario
 */
function CreateScenario() {
	// Creates a scenario (66%), or creates a simple prompt (34%)
	if (chanceTrue(66)) {
		return lastScenario = GetValue(scenarios) + ".";
	} else {
		let scenario = GetValue(transformations);

		// Adds trigger after TF (66%), or adds trigger before TF (34%)
		if (chanceTrue(66)) {
			let t = CreateTrigger();
			scenario += `${t}.`;
			lastScenario = `<TA>${t}.`;
		} else { 
			let t = CreateTrigger(true);
			scenario = `${t} ${Lowercase(scenario)}.`; 
			lastScenario = `${t} <TB>.`;
		}
		return scenario;
	}
}

/**
 * Creates a trigger, or a location
 * @param {boolean} before If true, adds trigger before the TF, if false, adds trigger after the TF 
 * @returns A string with the trigger or location
 */
function CreateTrigger(before) {
	// Adds trigger or location after the TF (you transform... [location] | after [trigger])
	if (!before) {
		if (chanceTrue(50)) return " while " + RandomValue(TFlocation);       // Only adds location (50%)
		else                return " after " + RandomValue(trigger);          // Only adds trigger  (50%)
	}
	// Adds trigger or location before the TF (After [trigger] | While [location], you transform)
	else { 
		if (chanceTrue(33)) return "While " + RandomValue(TFlocation) + ",";  // Only adds location (33%)
		else                return "After " + RandomValue(trigger)    + ",";  // Only adds trigger  (67%)
	}
}

/**
 * Creates a fate for the prompt
 * @returns The fate
 */
function CreateFate() {
	// Chance of adding a fate (60%)
	if (chanceTrue(60)) {
		// Fixed fate (25%), or random fate (75%)
		if (chanceTrue(25)) {
			return `<br><br>${FateReplacer(RandomValue(fixedFates), true)}.`;
		} else {
			return `<br><br>The changes are ${FateReplacer(RandomValue(fates), true)}.`;
		}
	}
	return "";
}

/**
 * Creates the modifiers for the prompt (speech changes and mental/world changes)
 * @returns The modifiers
 */
function CreateModifiers() {
	var mods = "";

	// If the prompt includes speech changes, then add a speech change (50%)
	if (enableSpeech && speech !== "" && chanceTrue(50)) {
		// Partial speech change (33%), or full speech change (67%)
		if (chanceTrue(33)) {
			mods += `<br><br>Your speech is now frequently interrupted by <b>${speech}</b>.`; 
		} else { 
			mods += `<br><br>You can no longer speak, <b>only</b> ${speech.slice(0, -3)}.`;
		}
	}

	// If the prompt includes mental/world changes
	if (enableAltering) {
		// If the prompt has a custom change, then add it (33%), otherwise add a random change (20%)
		if (altering[0].length === 1) {
			if (chanceTrue(33)) {
				mods += `<br><i><s>${altering[0]}</s></i>.`;
			}
		} else if (chanceTrue(20)) {
			mods += `<br><i><s>${GetValue(altering)}</s></i>.`;
		}
	}

	return mods;
}

/**
 * Returns a string based on the provided mode and gender
 * @param {number} mode The mode (1, 2, 3, 4, 5)
 * @param {number} excluded The excluded mode (5)
 * @returns The resulting string based on the mode and gender
 */
function GetSex(mode, excluded, m) {
    const sMap = {
        "MTF":  ["a female version of ", "girl", "male "],
        "FTM":  ["a male version of ", "boy", "female "],
        "FUTA": ["a futa version of ", "girl", ""]
    };

    switch (mode) {
        case 1: case 3:
            return sMap[sex] ? sMap[sex][mode - 1] : "";
		case 2:
			return sMap[sex] ? sMap[sex][mode - 1] : "girl";
        case 4:
            return sex === "FUTA" ? "a futa version of " : "";
		case 5:
			if (sex === excluded) return "";
			else return sMap[sex] ? sMap[sex][m - 1] : "";
        default:
            return "";
    }
}

/**
 * Gets an animal, with the correct gender
 * @param {*} array The animal array
 * @returns A string of the animal
 */
function GetAnimal(array) {
	var a, value = RandomValue(array);
	speech = "";

	// Extracts gender and sounds from animal results (if any), otherwise just returns the animal
  	if (Array.isArray(value)) {
		// If the animal includes both gender and sound
    	if (value.length === 3) {
    		if      (sex === "MTF")  a = value[0] + "/extraFix/";           // Female option (e.g. "cow")  + changes extras into female variants
			else if (sex === "FTM")  a = value[1] + "/extraFix/";           // Male option (e.g. "bull")   + changes extras into male variants
			else if (sex === "FUTA") a = value[0];                          // Futa option (e.g. "futa cow")
			else                     a = RandomValue([value[0], value[1]]); // Picks either male or female option
			speech = value[2];
		} 
		// If the animal only includes species and sound
		else if (value.length === 2) { 
			a = value[0]; 
			speech = value[1]; 
		}
	} else {
		a = value;
	}

    return lastAnimal = a;
}

/**
 * Gets "feral" or "anthro" to insert into /extra/, and with the correct format
 * @param {number} n Format
 * @param {number} fa Feral or anthro
 * @returns The processed string
 */
function FeralOrAnthro(n, fa) {
	if (fa === -1) { if (n == 2 || n == 3) return ""; else return " "; }

	let v; let pre = [" ", "", "", ", "];
	if (fa === 2)               v = "feral ";
	else if (fa > -1 && fa < 2) v = "anthro ";

	return pre[parseInt(n) - 1] + v;
}

/**
 * Replaces all placeholders
 * This function is messy, and is structured in order of importance, so it's hard to simplify. But hey, it works
 * @param {string} p String
 * @returns The processed string
 */
function Replacer(p) {
	// For scenario locking
	p = p.replace(/\<TA\>/g, function()  { return GetValue(transformations); });
	p = p.replace(/\<TB\>/g, function(v) { v = GetValue(transformations); return v.charAt(0).toLowerCase() + v.slice(1); });

	// Needs to run before the rest
	p = p.replace(/\/any\//g,     function() { return Lowercase(GetValue(transformations)); });
	p = p.replace(/\/anyU\//g,    GetValue(transformations));
	p = p.replace(/\/trigger\//g, Lowercase(CreateTrigger()));
	if (modifierBodymod.length > 0) {
		p = p.replace("/bodymod/", Lowercase(RandomValue(modifierBodymod)));
	}

	p = p.replace(/\/person\//g,    RandomValue(person));
	p = p.replace(/\/inanimate\//g, function() { return ArrayReplacer(Lowercase(RandomValue(inanimate))); });
	p = p.replace(/\<x\>/,          function() { addModifiers = false; return ""; });
	p = p.replace(/\/mod\//g,       function() { return GetAnimal(animalsAndCreatures) });
	p = p.replace(/\/creature\//g,  function() { return ArrayReplacer(RandomValue(!nsfw ? creatures : allCreatures)); }); 
	p = p.replace(/\/pokemon\//g,   function() { return RandomValue(pokemon); });
	p = p.replace(/\/character\//g, function() { let c = ArrayReplacer(RandomValue(chars)); lastChar = c.replace(/ \*\(.*\)\*/g, ""); return c; });
	p = p.replace(/\/n\//g,         function() { return RandomValue(numberRange); });
	p = p.replace(/\/food\//g,      function() { return Lowercase(RandomValue(food))});
	p = p.replace(/\/bimbo\//g,     function() { if (sex === "FTM" || sex === "MALE") return "bimboi"; else if (sex === "FUTA") return "futa bimbo"; else return "bimbo"; });

	p = ArrayReplacer(p);

	//==========================================================

	// Sets the transformation speed as one of the following, if possible
	var timeChange = "";
	if (p.includes("/slowly/"))    { p = p.replace(/\/slowly\//g,    ""); timeChange = "slowly";      }
	if (p.includes("/rapid/"))     { p = p.replace(/\/rapid\//g,     ""); timeChange = "rapidly";     }
	if (p.includes("/instant/"))   { p = p.replace(/\/instant\//g,   ""); timeChange = "instantly";   }
	if (p.includes("/suddenly/"))  { p = p.replace(/\/suddenly\//g,  ""); timeChange = "suddenly";    }
	if (p.includes("/permanent/")) { p = p.replace(/\/permanent\//g, ""); timeChange = "permanently"; }
	
	// If none of the above, and if /ts/ or /ti/ are not present, then it will be random
	p = p.replace(/\/t[si]?\//g, function(v) { 
		if (!timeChange) { 
			let x = TFtime; 
			if      (v[2] === "i") x = TFfast; 
			else if (v[2] === "s") x = TFtimeS; 
			return RandomValue(x); 
		} else  {
			return timeChange; 
		}
	});

	p = p.replace(/\/genderver1\//g,  GetSex(1));
	p = p.replace(/\/genderver2\//g,  GetSex(2));
	//p = p.replace(/\/genderver.\//g,       function(v) { return GetSex(Number(v.slice(-2, -1))); });
	p = p.replace(/\/exclgender.\(.*\)\//g, function(v) { return GetSex(5, v.slice(13, -2), Number(v.slice(11,12))); });
	p = p.replace(/\/genderver2\//g,  GetSex(2));
	p = p.replace(/\/revgender\//g,	  GetSex(3));
	p = p.replace(/\/futa\//g,		  GetSex(4));
	p = p.replace(/\/alien\//g,    	  RandomValue(aliens));
	p = p.replace(/\/Tword\//g, 	  RandomValue(triggerWords));
	p = p.replace(/\<n\>/g,           "\n\n");

	// Modifiers that might show up multiple times, and need unique random values
	p = p.replace(/\/n\//g,      function() { return RandomValue(numberRange); });
	p = p.replace(/\/color\//g,  function() { return RandomValue(colors);      });
	p = p.replace(/\/size\//g,   function() { return RandomValue(sizes);       });
	p = p.replace(/\/big\//g,    function() { return RandomValue(bigSizes);    });
	p = p.replace(/\/pet\//g,    function() { return GetAnimal(pets);          });
	p = p.replace(/\/farm\//g,   function() { return GetAnimal(animalFarm);    });
	p = p.replace(/\/animal\//g, function() { return GetAnimal(animals);       });

	p = p.replace(/\/repeatAnimal\//g, lastAnimal);
	p = p.replace(/\/repeatCharacter\//g, lastChar);

	let fa = -1;
	p = p.replace(/\<anthro\>/g,      function () { fa = 1; return ""; });
	p = p.replace(/\/FeralAnthro\//g, function () { fa = Math.floor(Math.random() * 6); if (fa >= 3) return "/gender/"; else if (fa === 2) return "<fa3>/gender/"; else return "/extra/"; });
	p = p.replace(/\/anthro\//g,      function () { fa = Math.floor(Math.random() * 3); if (fa == 0) return "/extra/";  else { fa = -1; return "/gender/"; }});
	
	// Puts an appropriate /extra/ result without "female" or "male" based on gendered values (e.g. ["mare","stallion"])
	if (p.includes("/extraFix/")) { 
        p = p.replace(/\/extraFix\//g, ""); 
		p = p.replace(/\/gender\//g,   ""); 
		if      (sex === "MTF")   p = p.replace(/\/extra\//g, RandomValue(Mods[2])); // Replaces /extra/ with MTF  variants (e.g. "busty")
		else if (sex === "FTM")   p = p.replace(/\/extra\//g, RandomValue(Mods[3])); // Replaces /extra/ with FTM  variants (e.g. "beefy")
		else if (sex === "FUTA")  p = p.replace(/\/extra\//g, RandomValue(Mods[4])); // Replaces /extra/ with FUTA variants (e.g. "futa")
		else    extraMod = Mods[5]; 
	}

	if      (sex === "MTF")  p = p.replace(/\/gender\//g, "female "); // Replaces /gender/ with "female" if TG is applied
	else if (sex === "FTM")  p = p.replace(/\/gender\//g, "male ");   // Replaces /gender/ with "male"   if TG is applied
	else if (sex === "FUTA") p = p.replace(/\/gender\//g, "futa ");   // Replaces /gender/ with "futa"   if TG is applied
	else                     p = p.replace(/\/gender\//g, "");        // If TG is not applied then /gender/ will disappear

	p = p.replace(/\/extra\//g, RandomValue(extraMod));
	p = p.replace(/\/sens\//g,  RandomValue(sensation));
	p = p.replace(/\/sensL\//g, Lowercase(RandomValue(sensation)));
	p = p.replace(/\<fa.\>/g, function (v) { let index = v.slice(3, -1); return FeralOrAnthro(index, fa); });
	p = p.replace(/undefined/g, "**[redacted]**");

	// Needs to run last
	p = p.replace(/\/noFate/g, function()  { addFate = false; return ""; });
	p = p.replace(/up\(.*\)/g, function(v) { return Uppercase(v.slice(3,-1)); })

	return p;
}

/**
 * Gets arrays inside strings and replaces them "$[x,""...]" "#{x,""...}"
 * @param {string} p String
 * @returns The processed string
 */
function ArrayReplacer(p) {

	// Replaces arrays with this format #{n,"","",""} inside strings, there are usually used inside the next format $[n,"","",""]
	p = p.replace(/\#(.*?)\}/g, function (v) { 
		let ARR = JSON.parse("[" + v.slice(2, -1) + "]"); 

		// #{1} Picks a random value out of the array
		if (ARR[0] === 1) return RandomValue(ARR.slice(1)); 

		// #{2} Picks the male or female values (or either) if MTF or FTM is active, otherwise it's random
		else if (ARR[0] === 2) { 
			if      (sex === "MTF")  return ARR[1] + "/extraFix/"; 
			else if (sex === "FTM")  return ARR[2] + "/extraFix/"; 
			else if (sex === "FUTA") return ARR[1]; 
			else                     return RandomValue([ARR[1],ARR[1],ARR[2]]);
		} 
  	});

	// Replaces arrays with this format $[n,"","",""] inside strings
	p = p.replace(/\$(.*?)\]/g, function (v) { 
		let ARR = JSON.parse(v.slice(1)); 

		// $[1] Picks a random value out of the array
		if (ARR[0] === 1) { randDupe = RandomValue(ARR.slice(1)); return randDupe; }

		// $[2] Picks the male or female values (or either) if MTF or FTM is active, otherwise it's random
		else if (ARR[0] === 2) { 
			if      (sex === "MTF")  { genderPicked = 1; return ARR[1] + "/extraFix/"; }
			else if (sex === "FTM")  { genderPicked = 2; return ARR[2] + "/extraFix/"; }
			else if (sex === "FUTA") { genderPicked = 3; if (ARR[3] !== undefined) return ARR[3]; else return ARR[1]; }
			else {     
				let pick = RandomValue([ARR[1], ARR[1], ARR[2]]);
				if (pick === ARR[1]) { 
					genderPicked = 1; 
				} else {
					genderPicked = 2;
				}
				return pick;
			}
		} 

		// $[3] Saves the sound (e.g "mooing")
		else if (ARR[0] === 3) { speech = ARR[1]; return ""; }

		// $[4] Puts an appropriate description/change based on gender (e.g. You transform into a cow $[4] ("and grow a big udder"))
		else if (ARR[0] === 4) { return ARR[genderPicked]; }

		// $[5] Puts an appropriate TG change to unconventional TFs (e.g. You grow 10 years older $[5] ("and turn female"))
		else if (ARR[0] === 5) { 
			if (tg && sex !== undefined) {
				if      (sex === "MTF")  { return ARR[1] + ARR[2] + ARR[5]; }
				else if (sex === "FTM")  { return ARR[1] + ARR[3] + ARR[5]; }
			} else if (sex === "FUTA") { 
				return ARR[1] + ARR[4] + ARR[5]; 
			} else if (ARR[6] !== undefined) {
				return ARR[6];
			}
			return "";
		}

		// $[6] Custom mental/world change, instead of a random one
		else if (ARR[0] === 6) { altering = [[ARR[1]]]; return ""; }

		// $[7] --removed--

		// $[8] Picks a random value, with a follow-up (e.g. "cow:grazing fields" -> you transform into a cow, and now love <8> [grazing fields])
		else if (ARR[0] === 8) {
			var val = RandomValue(ARR.slice(1)).split(":");
			followupKey = val[0];
			followup    = val[1];
			return val[0];
		}

		// $[9] Custom gender change for the selected gender e.g. $[9,"MTF","You grow longer hair"], will only display if MTF is selected. Can also add an "else" $[9,"MTF","queen","king"], will display king in all cases, expect for MTF
		else if (ARR[0] === 9) {
			if (sex === ARR[1] || (ARR[1] === "" && sex == undefined)) {
				return ARR[2];
			} else if (sex !== ARR[1] && ARR[3] !== undefined) {
				return ARR[3];
			} else return ""; 
		}
	});

	p = p.replace(/\<1\>/g,	 randDupe);    // Fills in <1> with what came out of a $[1] array
	p = p.replace(/\<8\>/g,	 followup);    // Fills in <8> with follow-up from $[8] array
	p = p.replace(/\<8k\>/g, followupKey); // Fills in <8k> with follow-up key from $[8] array

	return p;
}

/**
 * Replaces fate placeholders
 * @param {string} fate The string
 * @param {boolean} hasFate If the string is a fate
 * @returns The processed string
 */
function FateReplacer(fate, hasFate) {
	// If the transformation is inanimate (food, plant, object), then it will use the inanimate fates
	if (["I", "P", "F"].includes(categoryOfTF)) {
		fate = fate.replace(/\/action\//g, RandomValue(fateAinanim));
		fate = fate.replace(/\/time\//g, RandomValue(fateTinanim));
	}
	// Otherwise it will use the general fates
	else {
		fate = fate.replace(/\/action\//g, RandomValue(fateAction));
		fate = fate.replace(/\/time\//g, RandomValue(fateTime));
	}

	// If the string is a fate, it will replace these modifiers (these do not show up in scenarios)
	if (hasFate) {
		fate = fate.replace(/\/penaltytime\//g, RandomValue(fateTimeEx));
		fate = fate.replace(/\/n\//g, RandomValue(numberRange));
		return ArrayReplacer(fate);
	}
	return fate;
}
