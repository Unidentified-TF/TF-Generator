//I'm pretty new to JavaScript so don't butcher me lol

//Character
var age = ["young", "mature", "middle aged"];
var bodytype = ["a bit chubby", "very athletic", "somewhat athletic", "pretty average", "very curvy", "pretty skinny", "somewhat skinny", "pretty plump", "very pear-shaped", "pretty muscular", "very voluptuous"];
var height = ["quite small", "quite tall", "about average sized"];

var extraMod = ["pregnant ", "chubby ", "lactating ", "futa ", "bimbo ", "multi-breasted ", "giant ", "busty ", "submissive ", "short ", "pregnant lactating ", "multi-breasted futa ", " ", " "];

//Transformation types
var animalTF = ["skunk", "cow", "dog", "wolf", "cat", "tiger", "lion", "horse", "bird", "pig", "shark", "giraffe", "snake", "frog", "donkey", "chicken", "goat", "sheep", 
				"kangaroo", "elephant", "rat", "mouse", "hyena", "octopus", "panda", "bear", "hippo", "rhino", "snail", "spider", "bee", "crocodile", "bat", "zebra",
				"crab", "dolphin", "deer", "monkey", "koala", "lizard", "moose", "moth", "orca", "otter", "parrot", "penguin", "poodle", "seal", "fish", "turtle",
				"walrus", "beaver", "camel", "raccoon", "gazelle", "fox", "salamander", "bunny", "lemur", "scorpion", "llama", "squirrel", "panther", "sabretooth tiger",
				"axolotl", "goose", "turkey", "chameleon", "anteater", "butterfly", "mantis", "slug", "cow", "horse", "porcupine", "polar bear", "whale", "owl", "swan", 
				"jackal", "husky", "tanuki", "red panda", "ferret", "gorilla", "pangolin", "ostrich", "armadillo", "peacock", "sloth", "toad", "squid", "bull", "stallion",
				"wasp", "dinosaur", "t-rex", "velociraptor", "boar"];

var creatureTF = ["centaur", "dragon", "unicorn", "succubus", "alien", "elf", "sphinx", "hellhound", "cerberus", "harpy", "hydra", "naga", "gryphon", "pegasus", 
				  "gargoyle", "goblin", "orc", "chimera", "slime", "cyclops", "mermaid", "dryad", "minotaur", "genie", "fairy", "drider", "chocobo", "goddess", "satyr", "deathclaw",
				  "imp", "demon", "dwarf", "ghost", "ogre", "pixie", "siren", "vampire", "yeti", "twi'lek"];

var expansionTF = ["She transforms into a /extra/bimbo", "She gets pregnant", "Her breasts expand", "Her butt expands", "Her belly expands", "Her genitals expand", 
				   "Her hair grows", "She grows into a /extra/giantess", "She shrinks down", "She unevenly grows bigger", "Her lips expand", "Her feet expand", "Her nipples expand",
				   "Her tongue expands", "Her hips expand", "Her clit expands", "Her anus expands to the size of a donut"];

//Everything is written with "she", "her" and etc and then later replaced with the proper pronoun!
var TGfem = ["Her pussy transforms into a dick", "She transforms into a man", "She transforms into a femboi", "She transforms into a drag queen", "She transforms into a man", "She transforms into a man", "She grows a horsecock"];
var TGmale = ["Her dick transforms into a pussy", "She grows boobs", "She transforms into a woman", "She transforms into a bimbo", "She transforms into a amazoness", "She transforms into a pregnant woman", "She transforms into a woman", "She transforms into a woman", "Her dick turns into a mare's pussy with crotch-boobs"];
var TGoth = ["She grow boobs", "She grow a pussy", "She grow a dick", "She get pregnant", "She transforms into a man", "She transforms into a woman"];

var weirdTF = ["She grows multiple breasts", "She grows extra arms", "She grows extra legs", "She grows multiple pussies", "She grows extra eyes", "Her nipples turn into dicks",
			   "Her buttcheeks transform into boobs", "Her feet transform into hands", "Her hands transform into feet", "She grows breasts all over her body", "Her nipples turn into pussies",
			   "She transforms into a /extra/humantaur", "She starts filling up with eggs", "She grows a extra head", "She grows a huge dick", "Her arms and legs turn into tentacles", 
			   "Her nipples transform into hands", "She grows crotch-boobs", "She transforms into a boobslug", "Her nipples turn into lips", "Her nipples grow long", 
			   "Her hands and feet turn into boobs", "She transforms into a dick", "She transforms into a dorse", "She starts laying eggs from her nipples", "Her mouth transforms into a pussy",
			   "She gets conjoined with another person", "She fuses with another person", "She transforms into a suckplant", "She transforms into a boob", "She grows a big dick with huge balls",
			   "Her head transforms into a dick, and her breasts fuse together forming a ballsack", "She transforms into a dick and fuses with the nearest person", "She grows breasts on her back",
			   "She splits into two /extra/shortstacks", "She grows a cock-tail", "She grows a big dick with crotch-boobs", "Her hair turns into dicks", "Her hair turns into tentacles",
			   "She grows multiple dicks", "Her belly button changes into a pussy", "Her nipples turn into taps and her boobs fill up with drinks", "Her nipples turn into tentacles", "She grows an udder",
			   "Her tongue transforms into a dick", "Her eyes extrude from her face and turn into eyestalks", "Her neck extends", "Her fingers turn into dicks", "She grows dicks all over her body"];

var inanimateTF = ["/mod pool-toy", "pumpkin", "toy-soldier", "panties", "sexdoll", "tree", "mousepad", "/mod plushie", "flower", "onahole", "snowman", "doll", "statue",
				   "cake", "mushroom", "teddy bear", "pillow", "poster", "condom", "chair", "bra", "dildo", "cum-filled condom", "car", "fountain", "mannequin", "candle", "pinata", 
				   "/mod costume", "chess piece", "candy", "chocolate", "/mod taxidermy head mount", "suit of themselves", "/extra/blueberry", "banana", "ice sculpture", "raspberry", "pear",
				   "dessert", "melon", "cookie", "ice cream", "balloon", "bobblehead", "lava lamp", "puppet", "mirror", "rubber /mod"];

var otherTF = ["mime", "nerd", "/mod robot", "MILF", "amazoness", "goth", "robot", "clown"];

//Stores all transformations the user has chosen
var possibleTFs = [];
var possibleMods = [];
possibleMods = animalTF.concat(creatureTF);

//Adds text infront of selected arrays when running to reduce text when editing
for(var i=0; i < animalTF.length; i++) animalTF[i] = "She transforms into a /extra/" + animalTF[i];
for(var i=0; i < creatureTF.length; i++) creatureTF[i] = "She transforms into a /extra/" + creatureTF[i];
for(var i=0; i < inanimateTF.length; i++) inanimateTF[i] = "She transforms into a " + inanimateTF[i];
for(var i=0; i < otherTF.length; i++) otherTF[i] = "She transforms into a /extra/" + otherTF[i];

//How the character reacts
var reaction = ["aroused by", "confused about", "scared of", "shocked by", "terrified of", "embarrassed by", "surprised by", "happy with", "annoyed by", "ashamed of", "humiliated by",
				"excited about", "pissed about", "disappointed in", "nervous about", "amused by", "curious about", "very interested in", "oblivious of", "angry with", "indifferent about",
				"pleasantly surprised by", "confused and aroused by", "giddy about", "scared but intrigued by"];

//How the transformation is triggered
var trigger = ["accidentally messing up a spell", "pissing off a witch", "their family curse kicking in,", "using a strange morph app", "their allergy kicking in,", "contracting a virus", 
			   "eating old food", "taking in new supplements", "playing a bootleg video-game", "watching a movie", "listening to music", "breaking a cursed object in a store/end", 
			   "doing an experiment", "drinking a new energy drink", "putting on cheap make-up", "playing a mobile game", "an infection they got from a scratch", "getting a new tattoo", "clicking on a pop-up advertisement", 
			   "phrasing a wish poorly", "exercising", "drinking a spiked drink", "being an asshole", "drinking a old potion", "not coming to work/end", "activating a trap in a tomb/end",
			   "having sex", "sneezing", "playing a board game", "eating too much", "drinking homebrewed beer from a stranger", "being brainwashed", "trying out a new shampoo brand/end",
			   "eating genetically modified food", "loosing a bet", "drinking dirty water", "being exposed to the full moon", "breaking rules", "breaking the law and facing the consequences/end", "swimming in lake water/end",
			   "being in the wrong place at the wrong time/end", "stepping in toxic waste", "coming across a mischievous genie", "lying to people", "being zapped by aliens", "being a mad-doctor's next plaything/end", 
			   "stepping into toxic waste", "looting cursed treasure", "using a VR headset", "being pressed into a body shaping mold", "getting a free massage", "eating a strange plant on a space expedition/end",
			   "a doctor who accidentally mixed up their clients/end", "reading a book", "wearing a costume they bought from a pop-up store", "being caught spying on a witch", "an experiment gone wrong",
			   "waking up from a coma", "loosing in a game show/end", "breaking a artifact", "playing with a knock-off gameboy", "putting on a mask", "loosing a game of poker in a casino/end", "trying to stop a super-villain", 
			   "testing a teleporter/end", "someone modifying a voodoo doll of them", "playing around with a 8-ball", "being hungry", "being transported to another reality/end", "taking a selfie with a filter", "hitting a 'second' puberty",
			   "being exposed to radiation", "being drunk", "volunteering", "putting on form-fitting clothing", "opening a gift", "having a orgasm", "masturbating", "being locked in a dungeon/end",
			   "needing to fit their new job's standards/end", "opening spam email", "volunteering at a magic show/end", "being bit by a weirdo", "being late to work/end",
			   "reading some old book", "angering an old woman", "drinking a limited edition latte", "winning the lottery/end", "vandalizing", "drinking some weird beer", "doing drugs", "testing drugs for money",
			   "walking through a mirror", "looking at a funhouse mirror", "joining the circus/end", "pissing of a demon", "not following Unidentified-TF/end", "being sucked into a video-game",
			   "their teacher punishing them for bad grades/end", "a backfired prank", "their body adapting to the surroundings", "thinking of it", "being possessed by a spirit", "being curious about how it would feel like,", "wishing for a new life",
			   "bumping into a mischievous god", "being annoying", "stealing", "creating a character in a video-game", "cheating on their significant other", "dating a witch/end", "being struck by a lightning/end",
			   "being sucked into a black hole, and then spit back/end", "getting piercings at the mall/end", "using new sex-toys", "a salesman showcasing his products/end", "going into the sewers/end", "using experimental pills",
			   "trying to prove magic isn't real", "kissing someone", "having bad hygiene", "playing with a magic remote", "cosplaying", "breaking a magic wand", "using a knock-off sexdoll",
			   "messing up a ritual", "putting on magic clothing", "looking at transformation art", "watching porn", "being hypnotized", "wishing life was a bit more interesting", "a contamination on a space station/end",
			   "eating fruits", "being splashed with water", "being exposed to toxic gas", "volunteering to be a 'test rat' for DNA experimenting/end", "wanting fit in with the 'cool' people", 
			   "being accused of being a witch", "using sunscreen from an unknown company", "fantasizing about it", "blackmailing someone", "someone sneezing at them", "getting a random DM asking about roleplaying",
			   "getting pranked by their geneticist friend", "making a wish at a fortune telling machine/end", "a wish, and apparently everyone thinks this is normal and they've been this way since birth../end", 
			   "sneaking into a lab and accidentally breaking vials that released toxic fumes/end", "getting a vaccination/end", "using a unfinished teleporter at a laboratory/end", "being confused between a transformation-pod and a cryo-pod/end",
			   "walking through a portal that mysteriously opened up", "injecting themselves with experimental nanobots", "being kidnapped by a mad doctor and being used as their 'test rat'/end",
			   "using essential oils", "using this generator", "putting on a cursed necklace", "touching old bones while on a excavation/end", "going on a ride in a themepark/end", "accidentally touching jizz", "drawing it", 
			   "making fun of someone who likes that kind of stuff", "breaking up with a witch", "making a video on Tik-Tok", "getting unbirthed, and later being rebirthed to their 'new mother's' likeness/end", "writing about it",
			   "drinking bathwater"];

//Where the transformation occurs 
var TFlocation = ["at a farm", "at home", "in a museum", "in a laboratory", "while walking in a forest", "in a circus", "on the subway", "in the park", "in class", 
				  "on the beach", "in a theme park", "in a public bathroom", "in public", "at a party", "while on the toilet", "while camping", "at a family reunion",
				  "at the gym", "in a grocery store", "at a convention", "at a pool", "at work", "in the kitchen", "in a elevator", "at a magic show", "in a factory",
				  "in a casino", "while eating at a fancy restaurant", "while sunbathing", "in their bedroom", "in a back alley", "at a fair", "on a plane", "on a train", "in a car",
				  "at the city square", "at a bar", "in a church", "in a coffee shop", "in the woods", "at the zoo", "at the doctor's office", "at an arcade", "while taking a shower",
				  "in the middle of a meeting", "while in a uber", "in a cellar", "in a hotel", "while giving a speech", "in a studio", "in a cave", "in a mall"];

//how long the TF takes and if it's temporary or permanent
//var TFtime = ["over a year", "a few minutes", "a few hours", "over a few months", "a week", "24 hours", "9 months", "a hour", "a minute", "nearly no time at all"];
//var TFreversal = ["permanent", "permanent", "permanent", "permanent", "permanent", "temporary and they'll change back in a year", "temporary and they'll change back in a month", "temporary and they'll change back in a week", "temporary and they'll change back in a day"];

//var TFmental = ["She finds it hard to concentrate on anything but sex", "She suddenly wants to remove all of her clothing", "She suddenly feels the need to masturbate"];


//Stores all of the results to be able to copy to clipboard
var THEresults = "";

//Creates a character and adds all "checked" transformations into a single array
function randomize()
{
	CreateCharacter();

	possibleTFs = [];
	if (document.getElementById("animal").checked) possibleTFs = possibleTFs.concat(animalTF);
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

//Takes in array and returns a random value
function RandomValue(array) 
{
	return array[Math.floor(Math.random()*array.length)];
}

//Creates the character
function CreateCharacter()
{
	if (document.getElementById("rand_char").checked === true)
	{
		document.getElementById("charactertitle").innerHTML = "Character";
		var characterresultstring = "Your character is a " + RandomValue(age) + " woman, her body is " + RandomValue(bodytype) + " and she's " + RandomValue(height);
		return characterresultstring;
	}
	else
	{
		document.getElementById("charactertitle").innerHTML = "";
		document.getElementById("CHARresult").innerHTML = "";
	}
}

//Creates the transformation
function Transformation()
{
	var resultstring = RandomValue(possibleTFs) + ", she is " + RandomValue(reaction) + " her transformation.<br>The transformation was caused by ";
	resultstring = Gender(resultstring);

	//resultstring += "<br>The changes take " + RandomValue(TFtime) + " to finish, after that it's " + RandomValue(TFreversal) + "<br>The transformation was caused by ";

	var temp_trigg = RandomValue(trigger);
	resultstring += temp_trigg.split('/end')[0];

	if (temp_trigg.substr(temp_trigg.length - 4) != "/end") {
		if (document.getElementById("INCLlocation").checked === true) resultstring += " " + RandomValue(TFlocation);
	}

	resultstring = resultstring.replace("/mod", RandomValue(possibleMods));
	if (document.getElementById("INCLextra").checked === true)
		resultstring = resultstring.replace("/extra/", RandomValue(extraMod));
	else
		resultstring = resultstring.replace("/extra/", " ");

	//resultstring += "<br><br>" + RandomValue(TFmental);

	return resultstring + ".";
}

//First function to run, gathers all information and displays it
function FinalResults()
{
	randomize();
	resultstring = Transformation();
	characterresultstring = CreateCharacter();

	var copybuttonvisibility = document.getElementById("copybutton");
	copybuttonvisibility.style.display = "inline";

	document.getElementById("TFresult").innerHTML = resultstring;
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

	var M_pronouns = [" his ", "His ", " he ", "He ", " he's ", " man, "];
	var O_pronouns = [" their ", "Their ", " they ", "They ", " they're ", " person, "];
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

	if (char === true) thestring = thestring.replace(/(?:^|\W)woman(?:$|\W)/g, pronouns[5]);

	if (document.getElementById("other").checked === true)
	{
		thestring = thestring.replace("they's", "they're");
		thestring = thestring.replace("they is", "they're");
		thestring = thestring.replace("grows", "grow");
		thestring = thestring.replace("starts", "start");
		thestring = thestring.replace("shrinks", "shrink");
		thestring = thestring.replace("turns", "turn");

	}
	return thestring;
}

//Copies the results to the clipboard
function copyButt(){
	THEresults = THEresults.replace("<br>", "\n");
	copyStringToClipboard(THEresults);

	console.log(THEresults);
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
