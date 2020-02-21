//I'm pretty new to JavaScript so don't butcher me lol
//...and I'm very aware of how messy the code is, I didn't expect to go this far with this.


//Character
var bodytype = ["chubby", "athletic", "curvy", "skinny", "plump", "muscular", "voluptuous"];
var height = ["short", "very short", "tall", "very tall", "average sized"];
//var age = ["young", "mature", "middle aged", "old"];
var skinColor = ["pale", "fair", "dark", "brown", "tan", "lightly tanned", "rosy", "exotic", "amber", "chestnut", "bronze", "light"];
var hairStyle = ["wavy", "curled", "straight", "spiked", "thick", "frizzy", "braided"];
var hairLength = ["short", "long", "shoulder-length", "elbow-length", "very short"];
var hairColor = ["blond", "black", "jet black", "red", "platinum blond", "brown", "grey", "dark brown", "auburn"];
var eyeColor = ["amber", "blue", "brown", "gray", "green", "hazel", "red"];
var clothing = ["stylish", "revealing", "sporty", "simple", "modest", "winter", "casual", "sexy", "old", "no", "no"];
//var personality = ["approachable", "cooperative", "funny", "playful", "patient", "creative", "impatient", "outgoing", "bubbly"];


//Transformation types
var animalTF = ["skunk", "cow", "dog", "wolf", "cat", "tiger", "lion", "horse", "bird", "pig", "shark", "giraffe", "snake", "frog", "donkey", "chicken", "goat", "sheep", 
				"kangaroo", "elephant", "rat", "mouse", "hyena", "octopus", "panda", "bear", "hippo", "rhino", "snail", "spider", "bee", "crocodile", "bat", "zebra",
				"crab", "dolphin", "deer", "monkey", "koala", "lizard", "moose", "moth", "orca", "otter", "parrot", "penguin", "poodle", "seal", "fish", "turtle",
				"walrus", "beaver", "camel", "raccoon", "gazelle", "fox", "salamander", "bunny", "lemur", "scorpion", "llama", "squirrel", "panther", "sabretooth tiger",
				"axolotl", "goose", "turkey", "chameleon", "anteater", "butterfly", "mantis", "slug", "cow", "horse", "porcupine", "polar bear", "whale", "owl", "swan", 
				"jackal", "husky", "tanuki", "red panda", "ferret", "gorilla", "pangolin", "ostrich", "armadillo", "peacock", "sloth", "toad", "squid", "bull", "stallion",
				"wasp", "dinosaur", "t-rex", "velociraptor", "boar", "mammoth"];

var partialAnimalTF = ["Her genitals /t/ transform into those of a /Amod", "Her feet /t/ transform into those of a /Amod", "Her head /t/ transforms into that of a /Amod", "Her hands /t/ transform into those of a /Amod",
                       "Her arms /t/ transform into those of a /Amod", "Her ears /t/ transform into those of a /Amod", "Her legs /t/ transform into those of a /Amod", "Her face /t/ transforms into that of a /Amod",
                       "She /t/ grows a tail of a /Amod", "Her lower body /t/ transforms into that of a /Amod", "Her upper body /t/ transforms into that of a /Amod", "Her limbs /t/ transform into those of a /Amod",
                       "She /t/ grows an udder"]

var creatureTF = ["centaur", "dragon", "unicorn", "succubus", "alien", "elf", "sphinx", "hellhound", "cerberus", "harpy", "hydra", "naga", "gryphon", "pegasus", 
				  "gargoyle", "goblin", "orc", "chimera", "slime", "cyclops", "mermaid", "dryad", "minotaur", "genie", "fairy", "drider", "chocobo", "goddess", "satyr", "deathclaw",
				  "imp", "demon", "dwarf", "ghost", "ogre", "pixie", "siren", "vampire", "yeti", "twi'lek"];

var expansionTF = ["She /t/ transforms into a /extra/bimbo", "She gets pregnant", "Her breasts /t/ expand", "Her butt /t/ expands", "Her belly /t/ expands", "Her genitals /t/ expand", 
				   "Her hair /t/ grows long and thick", "She /t/ grows into a /extra/giantess", "She /t/ shrinks down", "She /t/ unevenly grows bigger", "Her lips /t/ expand", "Her feet /t/ expand", "Her nipples /t/ expand",
				   "Her tongue /t/ expands", "Her hips /t/ expand", "Her clit /t/ expands", "Her anus /t/ expands to the size of a donut"];

//Everything is written with "she", "her" and etc and then later replaced with the proper pronoun!
var TGfem = ["Her pussy transforms into a dick", "She transforms into a man", "She transforms into a femboi", "She transforms into a drag queen", "She transforms into a man", "She transforms into a man", "She grows a horsecock"];
var TGmale = ["Her dick transforms into a pussy", "She grows boobs", "She transforms into a woman", "She transforms into a bimbo", "She transforms into a amazoness", "She transforms into a pregnant woman", "She transforms into a woman", "She transforms into a woman", "Her dick turns into a mare's pussy with crotch-boobs"];
var TGoth = ["She grow boobs", "She grow a pussy", "She grow a dick", "She get pregnant", "She transforms into a man", "She transforms into a woman"];

var weirdTF = ["She /t/ grows multiple breasts", "She /t/ grows extra arms", "She /t/ grows extra legs", "She /t/ grows multiple pussies", "She /t/ grows extra eyes", "Her nipples /t/ turn into dicks",
			   "Her buttcheeks /t/ transform into boobs", "Her feet /t/ transform into hands", "Her hands /t/ transform into feet", "She /t/ grows breasts all over her body", "Her nipples /t/ turn into pussies",
			   "She /t/ transforms into a /extra/humantaur", "She /t/ starts filling up with eggs", "She /t/ grows a extra head", "She /t/ grows a huge dick", "Her arms and legs /t/ turn into tentacles", 
			   "Her nipples /t/ transform into hands", "She /t/ grows crotch-boobs", "She /t/ transforms into a boobslug", "Her nipples /t/ turn into lips", "Her nipples /t/ grow long", 
			   "Her hands and feet /t/ turn into boobs", "She /t/ transforms into a dick", "She /t/ transforms into a dorse", "She starts laying eggs from her nipples", "Her mouth /t/ transforms into a pussy",
			   "She gets conjoined with another person", "She fuses with another person", "She /t/ transforms into a suckplant", "She /t/ transforms into a boob", "She /t/ grows a big dick with huge balls",
			   "Her head /t/ transforms into a dick, and her breasts fuse together forming a ballsack", "She /t/ transforms into a dick and fuses with the nearest person", "She /t/ grows breasts on her back",
			   "She splits into two /extra/shortstacks", "She /t/ grows a cock-tail", "She /t/ grows a big dick with crotch-boobs", "Her hair /t/ turns into dicks", "Her hair /t/ turns into tentacles",
			   "She /t/ grows multiple dicks", "Her belly button /t/ changes into a pussy", "Her nipples /t/ turn into taps and her boobs fill up with drinks", "Her nipples /t/ turn into tentacles",
			   "Her tongue /t/ transforms into a dick", "Her eyes /t/ extrude from her face and turn into eyestalks", "Her neck /t/ extends", "Her fingers /t/ turn into dicks", "She /t/ grows dicks all over her body", "Her boobs fuse into a single boob",
			   "Her genitals transform into a boob", "She /t/ grows a uneven amount of boobs", "Her arms /t/ turn into dicks"];

var inanimateTF = ["/mod pool-toy", "pumpkin", "toy-soldier", "panties", "sexdoll", "tree", "mousepad", "/mod plushie", "flower", "onahole", "snowman", "doll", "statue",
				   "cake", "mushroom", "teddy bear", "pillow", "poster", "condom", "chair", "bra", "dildo", "cum-filled condom", "car", "fountain", "mannequin", "candle", "pinata", 
				   "/mod costume", "chess piece", "candy", "chocolate", "/mod taxidermy head mount", "suit of themselves", "/extra/blueberry", "banana", "ice sculpture", "raspberry", "pear",
				   "dessert", "melon", "cookie", "ice cream", "balloon", "bobblehead", "lava lamp", "puppet", "mirror", "rubber /mod"];

var otherTF = ["mime", "nerd", "robot /mod", "MILF", "amazoness", "goth", "robot", "clown"];

//Stores all transformations the user has chosen
var extraMod = ["pregnant ", "chubby ", "lactating ", "futa ", "bimbo ", "multi-breasted ", "giant ", "busty ", "submissive ", "small ", "pregnant lactating ", "multi-breasted futa ", " ", " "];

//Needs to save modifiers before text is added to the previous arrays
var possibleTFs = [];
var possibleMods = [];
var possibleModsA = [];
possibleMods = animalTF.concat(creatureTF);
possibleModsA = animalTF.concat(possibleModsA);

//Adds text infront of selected arrays when running to reduce text when editing
for(var i=0; i < animalTF.length; i++) animalTF[i] = "She /t/ transforms into a /extra/" + animalTF[i];
for(var i=0; i < creatureTF.length; i++) creatureTF[i] = "She /t/ transforms into a /extra/" + creatureTF[i];
for(var i=0; i < inanimateTF.length; i++) inanimateTF[i] = "She /t/ transforms into a " + inanimateTF[i];
for(var i=0; i < otherTF.length; i++) otherTF[i] = "She /t/ transforms into a /extra/" + otherTF[i];

//How the character reacts
var reaction = ["aroused by", "confused about", "scared of", "shocked by", "terrified of", "embarrassed by", "surprised by", "happy with", "annoyed by", "ashamed of", "humiliated by",
				"excited about", "pissed about", "disappointed by", "nervous about", "amused by", "curious about", "very interested by", "oblivious of", "angry about", "indifferent about",
				"pleasantly surprised by", "confused and aroused by", "giddy about", "scared but intrigued by"];

//How the transformation is triggered
var trigger = ["accidentally messing up a spell", "pissing off a witch", "their family curse kicking in,", "using a strange morph app", "their allergy kicking in,", "contracting a virus", 
			   "eating old food", "taking in new supplements", "playing a bootleg video-game", "watching a movie", "listening to music", "breaking a cursed object in a store/end", 
			   "doing an experiment", "drinking a new energy drink", "putting on cheap make-up", "playing a mobile game", "an infection they got from a scratch", "getting a new tattoo", "clicking on a pop-up advertisement", 
			   "phrasing a wish poorly", "exercising", "drinking a spiked drink", "being an asshole", "drinking a old potion", "not coming to work/end", "activating a trap in a tomb/end",
			   "having sex", "sneezing", "playing a board game", "eating too much", "drinking homebrewed beer from a stranger", "being brainwashed", "trying out a new shampoo brand/end",
			   "eating genetically modified food", "loosing a bet", "drinking dirty water", "being exposed to the full moon", "breaking rules", "breaking the law and facing the consequences/end", "swimming in lake water/end",
			   "being in the wrong place at the wrong time/end", "stepping in toxic waste", "coming across a mischievous genie", "lying to people", "being zapped by aliens", "being kidnapped by a mad-doctor/end", 
			   "stepping into toxic waste", "looting cursed treasure", "using a VR headset", "being pressed into a body shaping mold", "getting a free massage", "eating a strange plant on a space expedition/end",
			   "a doctor who accidentally mixed up their clients/end", "reading a book", "wearing a costume they bought from a pop-up store/end", "being caught spying on a witch", "an experiment gone wrong",
			   "waking up from a coma", "losing a game show/end", "breaking a artifact", "playing with a knock-off gameboy", "putting on a mask", "loosing a game of poker in a casino/end", "trying to stop a super-villain", 
			   "testing a teleporter/end", "someone modifying a voodoo doll of them", "playing around with a 8-ball", "being hungry", "being transported to another reality/end", "taking a selfie with a filter", "hitting a 'second' puberty",
			   "being exposed to radiation", "being drunk", "volunteering", "putting on form-fitting clothing", "opening a gift", "having a orgasm", "masturbating", "being locked in a dungeon/end",
			   "needing to fit their new job's standards/end", "opening spam email", "volunteering at a magic show/end", "being bit by a weirdo", "being late to work/end",
			   "reading some old book", "angering an old woman", "drinking a limited edition latte", "winning the lottery/end", "vandalizing", "drinking some weird beer", "doing drugs", "testing drugs for money",
			   "walking through a mirror", "looking at a funhouse mirror", "joining the circus/end", "pissing off a demon", "not following Unidentified-TF/end", "being sucked into a video-game",
			   "their teacher punishing them for bad grades/end", "a prank backfiring", "their body adapting to the surroundings", "thinking of it", "being possessed by a spirit", "being curious about how it would feel like,", "wishing for a new life",
			   "bumping into a mischievous god", "being annoying", "stealing", "creating a character in a video-game", "cheating on their significant other", "dating a witch/end", "being struck by a lightning/end",
			   "being sucked into a black hole, and then spit back/end", "getting piercings at the mall/end", "using new sex-toys", "a salesman showcasing his products/end", "going into the sewers/end", "using experimental pills",
			   "trying to prove magic isn't real", "kissing someone", "having bad hygiene", "playing with a magic remote", "cosplaying", "breaking a magic wand", "using a knock-off sexdoll",
			   "messing up a ritual", "putting on magic clothing", "looking at transformation art", "watching porn", "being hypnotized", "wishing life was a bit more interesting", "a contamination on a space station/end",
			   "eating fruits", "being splashed with water", "being exposed to toxic gas", "volunteering to be a 'test rat' for DNA experimenting/end", "wanting to fit in with the 'cool' people", 
			   "being accused of being a witch", "using sunscreen from an unknown company", "fantasizing about it", "blackmailing someone", "someone sneezing at them", "getting a random DM asking about roleplaying",
			   "getting pranked by their geneticist friend", "making a wish at a fortune telling machine/end", "a wish, and apparently everyone thinks this is normal and they've been this way since birth../end", 
			   "sneaking into a lab and accidentally breaking vials that released toxic fumes/end", "getting a vaccination/end", "using an unfinished teleporter at a laboratory/end",
			   "walking through a portal that mysteriously opened up", "injecting themselves with experimental nanobots", "being kidnapped by a mad doctor and being used as their 'test rat'/end",
			   "using essential oils", "using this generator", "putting on a cursed necklace", "touching old bones while on a excavation/end", "going on a ride in a themepark/end", "accidentally touching jizz", "drawing it", 
			   "kinkshaming of someone who likes that kind of stuff", "breaking up with a witch", "making a video on Tik-Tok", "getting unbirthed, and later being rebirthed to their 'new mother's' likeness/end", "writing about it",
			   "drinking bathwater", "interfering with the mafia", "shaming others", "taking a deep breath", "breathing in alien air/end", "having an intern doctor perform a surgery on them/end", "being treated by a fake doctor/end", 
			   "photoshopping themselves like that", "trying out a new spa treatment/end", "taking a mud-bath at a spa/end", "listening to trash music", "having a wardrobe malfuntion", "not exercising/end", "destroying a expensive painting",
			   "trying out a 'cure' for a uncurable virus", "being held captive by a tribe/end", "testing out a new perfume", "taking an online quiz", "using a snapchat filter", "being too nice"];

//Where the transformation occurs 
var TFlocation = ["at a farm", "at home", "in a museum", "in a laboratory", "while walking in a forest", "in a circus", "on the subway", "in the park", "in class", 
				  "on the beach", "in a theme park", "in a public bathroom", "in public", "at a party", "while on the toilet", "while camping", "at a family reunion",
				  "at the gym", "in a grocery store", "at a convention", "at a pool", "at work", "in the kitchen", "in a elevator", "at a magic show", "in a factory",
				  "in a casino", "while eating at a fancy restaurant", "while sunbathing", "in their bedroom", "in a back alley", "at a fair", "on a plane", "on a train", "in a car",
				  "at the city square", "at a bar", "in a church", "in a coffee shop", "in the woods", "at the zoo", "at the doctor's office", "at an arcade", "while taking a shower",
				  "in the middle of a meeting", "while in a uber", "in a cellar", "in a hotel", "while giving a speech", "in a studio", "in a cave", "in a mall", "on a yacht"];

//how long the TF takes and if it's temporary or permanent
var TFtime = ["slowly", "near-instantly", "rapidly", "slowly", "very slowly", "", "", ""];
var TFreversal = ["permanent", "temporary and they'll change back /time/", "temporary and they'll change back /time/"];
var TFtemporary = ["in a year", "in a few years", "in a month", "in a few months", "in a day", "in a few days", "in a few minutes", "in a week", "in a few weeks", "next full moon", "after having sex", "after kissing someone", "after sleeping",
				   "after taking a shower", "when someone mentions their name", "when someone compliments them", "after performing a ritual", "after drinking water"];
var TFpenalty = ["masturbate", "have sex", "get pregnant", "are mean to someone","remove their clothes","cry","kinkshame others","eat candy","make fun of someone","kiss someone","drink alcohol","touch someone", "talk about their transformation", "talk", "", "", "", "", "", "", "", ""];
//var TFmental = ["She finds it hard to concentrate on anything but sex", "She suddenly wants to remove all of her clothing", "She suddenly feels the need to masturbate"];


//Stores all of the results to be able to copy to clipboard
var THEresults = "";

//Creates a character and adds all "checked" transformations into a single array
function randomize()
{
	CreateCharacter();

	possibleTFs = [];
	if (document.getElementById("animal").checked) 
	{
		possibleTFs = possibleTFs.concat(animalTF);
		possibleTFs = possibleTFs.concat(partialAnimalTF);
	}
	if (document.getElementById("creature").checked) possibleTFs = possibleTFs.concat(creatureTF);
	if (document.getElementById("expansion").checked) possibleTFs = possibleTFs.concat(expansionTF);
	if (document.getElementById("tg").checked) 
	{
		if (document.getElementById("female").checked === true) possibleTFs = possibleTFs.concat(TGfem);
		if (document.getElementById("male").checked === true) possibleTFs = possibleTFs.concat(TGmale);
		if (document.getElementById("other").checked === true) possibleTFs = possibleTFs.concat(TGoth);

	}
	if (document.getElementById("weird").checked) possibleTFs = possibleTFs.concat(weirdTF);
	if (document.getElementById("inanimate").checked) possibleTFs = possibleTFs.concat(inanimateTF);
	if (document.getElementById("tfother").checked) possibleTFs = possibleTFs.concat(otherTF);

	document.getElementById("transformtitle").innerHTML = "Transformation";
	document.getElementById("tfbutton").innerHTML = "Transform again!";

}

//Takes in an array and returns a random value
function RandomValue(array) 
{
	return array[Math.floor(Math.random()*array.length)];
}

//Creates the character
function CreateCharacter()
{
	var characterlock = document.getElementById("charlock");

	if (document.getElementById("rand_char").checked === true)
	{
		characterlock.style.display = "inline";
		document.getElementById("charactertitle").innerHTML = "Character";

		var characterresultstring;
		var thename = document.getElementById("charname").value;
		if (thename.trim() != "")
			characterresultstring = document.getElementById("charname").value;
		else
			characterresultstring = "Your character";
		characterresultstring += " is a " + RandomValue(height) + " " + RandomValue(bodytype) + " woman with " + RandomValue(skinColor) + " skin.<br> She has " + RandomValue(hairLength) + ", " + RandomValue(hairStyle) + ", " + RandomValue(hairColor) + " hair and " + RandomValue(eyeColor) + " eyes. She's currently wearing " + RandomValue(clothing) + " clothing";

		return characterresultstring;
	}
	else
	{
		characterlock.style.display = "none";
		document.getElementById("charactertitle").innerHTML = "";
		document.getElementById("CHARresult").innerHTML = "";
	}
}

//Generates the transformation description
function Transformation()
{
	//Generates a random TF and a reaction
	var resultstring = RandomValue(possibleTFs) + ", she is " + RandomValue(reaction) + " it.<br>The transformation was caused by ";
	resultstring = Gender(resultstring); //Adjusts the pronouns to fit the gender

	//Saves the trigger so we can test if it ends or not, and then adds the trigger to the result without the "/end"
	var temp_trigg = RandomValue(trigger);
	resultstring += temp_trigg.split('/end')[0];

	//If the trigger does not end then it adds a location (if the user wants it)
	if (temp_trigg.substr(temp_trigg.length - 4) != "/end") if (document.getElementById("INCLlocation").checked === true) resultstring += " " + RandomValue(TFlocation);

	//Adds modifiers to animals and inanimate TF's (e.g. transforms into a 'fox' costume, head transforms into that of a 'cow')
	resultstring = resultstring.replace("/Amod", RandomValue(possibleModsA));
	resultstring = resultstring.replace("/mod", RandomValue(possibleMods));

	//Adds a extra modifier if the user wants it, if not then there will be none (e.g. transforms into a 'pregnant' cow)
	if (document.getElementById("INCLextra").checked === true) resultstring = resultstring.replace("/extra/", RandomValue(extraMod));
	else resultstring = resultstring.replace("/extra/", " ");

	//Adds the time it takes to TF
	resultstring = resultstring.replace("/t/", RandomValue(TFtime));

	//If the user wants time/fate
	if (document.getElementById("time-fate").checked === true)
	{
		var temp_rev = RandomValue(TFreversal)
		resultstring += "<br><br>The changes are " + temp_rev;
		resultstring = resultstring.replace("/time/", RandomValue(TFtemporary));
		//Adds a potential extra modifier if the fate is temporary
		var temp_pen = RandomValue(TFpenalty);
		if(temp_pen != "" && temp_rev != "permanent") resultstring += ", but if they " +  temp_pen + " it becomes permanent";
	}

	return resultstring + ".";
}

//First function to run, gathers all information and displays it
function FinalResults()
{
	randomize();
	if (!document.getElementById("lockchar").checked)
		characterresultstring = CreateCharacter();

	var copybuttonvisibility = document.getElementById("copybutton");
	copybuttonvisibility.style.display = "inline";

	var transformationlock = document.getElementById("tflock").style.display = "inline";

	if (!document.getElementById("locktf").checked){
		resultstring = Transformation();
		document.getElementById("TFresult").innerHTML = resultstring;
	}
	if (characterresultstring != null) 
	{
		document.getElementById("CHARresult").innerHTML = Gender(characterresultstring, true) + ".";
		THEresults = "Character:\n" + Gender(characterresultstring, true) + ".\n\nTransformation:\n" + Gender(resultstring);
	}
	else
		THEresults = "Transformation:\n" + Gender(resultstring);
}

//Changes the gender of the character, default is female
function Gender(thestring, char) {

	var M_pronouns = [" his ", "His ", " he ", "He ", " he's ", " man "];
	var O_pronouns = [" their ", "Their ", " they ", "They ", " they're ", " person ", " have "];
	var pronouns = [];

	if (document.getElementById("female").checked === true) return thestring;
	else if (document.getElementById("male").checked === true) pronouns = M_pronouns;
	else
	{
		pronouns = O_pronouns;
		thestring = thestring.replace("transforms", "transform");
	}

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

	if (document.getElementById("other").checked === true)
	{
		thestring = thestring.replace("they's", "they're");
		thestring = thestring.replace("they is", "they're");
		thestring = thestring.replace("grows", "grow");
		thestring = thestring.replace("starts", "start");
		thestring = thestring.replace("shrinks", "shrink");
		thestring = thestring.replace("turns", "turn");
		thestring = thestring.replace(/(?:^|\W)has(?:$|\W)/g, pronouns[6]);

	}
	return thestring;
}

//Copies the results to the clipboard
function copyButt(){
	for (i = 0; i < 10; i++)
		THEresults = THEresults.replace("<br>", "\n");
	copyStringToClipboard(THEresults);

	console.log(THEresults); //For debugging purposes
}

function copyStringToClipboard (str) {
   var el = document.createElement('textarea');
   el.value = str;
   el.setAttribute('readonly', '');
   el.style = {position: 'absolute', left: '-9999px'};
   document.body.appendChild(el);
   el.select();
   document.execCommand('copy');
   document.body.removeChild(el);
}
