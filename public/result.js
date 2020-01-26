//I'm pretty new to JavaScript so don't butcher me lol

//Character
var age = ["young", "mature", "middle aged"];
var bodytype = ["a bit chubby", "very athletic", "somewhat athletic", "pretty average", "very curvy", "pretty skinny", "somewhat skinny", "pretty plump", "very pear-shaped", "pretty muscular", "very voluptuous"];
var height = ["quite small", "quite tall", "about average sized"];

//Transformation types
var animalTF = ["skunk", "cow", "dog", "wolf", "cat", "tiger", "lion", "horse", "bird", "pig", "shark", "giraffe", "snake", "frog", "donkey", "chicken", "goat", "sheep", 
				"kangaroo", "elephant", "rat", "mouse", "hyena", "octopus", "panda", "bear", "hippo", "rhino", "snail", "spider", "bee", "crocodile", "bat", "zebra",
				"crab", "dolphin", "deer", "monkey", "koala", "lizard", "moose", "moth", "orca", "otter", "parrot", "penguin", "poodle", "seal", "fish", "turtle",
				"walrus", "beaver", "camel", "raccoon", "gazelle", "fox", "salamander", "bunny", "lemur", "scorpion", "llama", "squirrel", "panther", "sabretooth tiger",
				"axolotl", "goose", "turkey", "chameleon", "anteater", "butterfly", "mantis", "slug", "cow", "horse", "porcupine", "polar bear", "whale", "owl", "swan", 
				"jackal", "husky", "tanuki", "red panda", "ferret", "gorilla", "pangolin", "ostrich", "armadillo", "peacock", "sloth"];

var creatureTF = ["centaur", "dragon", "unicorn", "dinosaur", "succubus", "alien", "elf", "sphinx", "hellhound", "cerberus", "harpy", "hydra", "naga", "gryphon", "pegasus", 
				  "gargoyle", "goblin", "orc", "chimera", "slime", "cyclops", "mermaid", "dryad", "minotaur", "genie", "fairy", "drider", "chocobo", "goddess", "satyr", "deathclaw"];

var expansionTF = ["She transforms into a bimbo", "She gets pregnant", "Her breasts expand", "Her butt expands", "Her belly expands", "Her pussy expands", 
				   "Her hair grows", "She grows into a giantess", "She shrinks down", "She unevenly grows bigger", "Her lips expand", "Her feet expand", "Her nipples expand",
				   "Her tongue expands", "Her hips expand", "She transforms into a busty clown", "Her clit expands"];

var weirdTF = ["She grows extra breasts", "She grows extra arms", "She grows extra legs", "She grows extra pussies", "She grows extra eyes", "Her nipples turn into dicks",
			   "Her buttcheeks transform into boobs", "Her feet transform into hands", "Her hands transform into feet", "She grows breasts all over her body", "Her nipples turn into pussies",
			   "She transforms into a humantaur", "She starts filling up with eggs", "She grows a extra head", "She grows a huge dick", "Her arms and legs turn into tentacles", 
			   "Her nipples transform into hands", "She grows crotch-boobs", "She transforms into a boobslug", "Her nipples turn into lips", "Her nipples grow long", 
			   "Her hands and feet turn into boobs", "She turns into a dick", "She transforms into a dorse", "She starts laying eggs from her nipples", "Her mouth transforms into a pussy",
			   "She gets conjoined with another person", "She fuses with another person", "She transforms into a suckplant", "She transforms into a boob", 
			   "Her head transforms into a dick, and her breasts fuse together forming a ballsack", "She turns into a dick and fuses with the nearest person", "She grows breasts from her back",
			   "She splits into two shortstacks", "She grows a cock-tail", "She grows a big dick but instead of balls there are boobs", "Her hair turns into dicks", "Her hair turns into tentacles",
			   "She grows multiple dicks", "Her belly button changes into a pussy", "Her nipples turn into taps and her boobs fill up with liquids", "Her nipples turn into tentacles", "She grows an udder"];

var inanimateTF = ["/mod pool-toy", "pumpkin", "toy-soldier", "panties", "sexdoll", "tree", "mousepad", "/mod plushie", "flower", "onahole", "snowman", "doll", "statue",
				   "cake", "mushroom", "teddy bear", "pillow", "poster", "condom", "chair", "bra", "dildo", "cum", "car", "fountain", "mannequin", "candle", "pinata", 
				   "/mod costume", "chess piece", "candy", "chocolate", "/mod taxidermy head mount", "suit of themselves"];

var otherTF = ["mime", "nerd", "robot", "drag queen", "MILF", "femboi"];

//Stores all transformations the user has chosen
var possibleTFs = [];
var possibleMods = [];
possibleMods = animalTF.concat(creatureTF);

//Adds text infront of selected arrays when running to reduce text when editing
for(var i=0; i < animalTF.length; i++) animalTF[i] = "She transforms into a " + animalTF[i];
for(var i=0; i < creatureTF.length; i++) creatureTF[i] = "She transforms into a " + creatureTF[i];
for(var i=0; i < inanimateTF.length; i++) inanimateTF[i] = "She transforms into a " + inanimateTF[i];
for(var i=0; i < otherTF.length; i++) otherTF[i] = "She transforms into a " + otherTF[i];

//How the character reacts
var reaction = ["aroused by", "confused about", "scared of", "shocked by", "terrified of", "embarrassed of", "surprised by", "happy with", "annoyed by", 
				"excited about", "pissed about", "disappointed in", "nervous about", "amused by", "curious about", "very interested in", "oblivious of", "angry with"];

//How the transformation is triggered
var trigger = ["accidentally messing up a spell", "pissing off a witch", "their family curse kicking in,", "a strange morph app", "their allergy kicking in,", "contracting a virus", 
			   "eating old food", "taking in new supplements", "playing a bootleg video-game", "watching a movie", "listening to music", "breaking a cursed object in a store/end", 
			   "an experiment", "drinking a new energy drink", "putting on cheap make-up", "playing a mobile game", "an infection she got from a scratch", "getting a new tattoo", "clicking on a pop-up advertisement", 
			   "phrasing a wish poorly", "exercising", "drinking a spiked drink", "being an asshole", "drinking a old potion", "not coming to work/end", "activating a trap in a tomb/end",
			   "having sex", "sneezing", "playing a board game", "eating too much", "drinking homebrewed beer from a stranger", "being brainwashed", "trying out a new shampoo brand/end",
			   "eating genetically modified food", "loosing a bet", "drinking dirty water", "being exposed to the full moon", "breaking rules", "breaking the law and facing the consequences/end", "swimming in lake water/end",
			   "being in the wrong place at the wrong time/end", "stepping in toxic waste", "coming across a mischievous genie", "lying to people", "being zapped by aliens", "a mad doctor looking for his next victim/end", 
			   "stepping into toxic waste", "looting cursed treasure", "using a VR headset", "being pressed into a body shaping mold", "getting a free massage", "eating a strange plant on a space expedition/end",
			   "a doctor who accidentally mixed up his clients/end", "reading a book", "wearing a costume she bought from a pop-up store", "being caught spying on a witch", "an experiment gone wrong",
			   "waking up from a coma", "loosing in a game show/end", "breaking a artifact", "playing with a knock-off gameboy", "putting on a mask", "loosing a game of poker in a casino/end", "trying to stop a super-villain", 
			   "testing a teleporter/end", "someone modifying a voodoo doll of them", "playing around with a 8-ball", "being hungry", "being transported to another reality/end", "taking a selfie with a filter", "hitting a 'second' puberty",
			   "being exposed to radiation", "being drunk", "volunteering", "putting on form-fitting clothing", "opening a gift", "having a orgasm", "masturbating", "walking into a cursed dungeon and getting locked until the changes are over/end",
			   "getting a new job and needing to fit their standards/end", "opening spam email", "voulnteering at a magic show/end", "being bit by a weirdo", "being late to work/end",
			   "reading some old book", "angering an old woman", "drinking a limited edition latte", "winning the lottery", "vandalizing", "drinking too much", "doing drugs", "testing drugs for money",
			   "walking through a mirror", "looking at a funhouse mirror", "joining the circus/end", "pissing of a demon", "not following Unidentified-TF/end", "being sucked into a video-game",
			   "their teacher punishing them for bad grades/end", "a backfired prank", "their body adapting to the surroundings", "thinking of it", "being possessed by a spirit", "being curious about how it would feel like,", "wishing for a new life",
			   "a mischievous god", "being annoying", "stealing", "creating a character in a video-game", "cheating on their significant other", "dating a witch/end", "being struck by a lightning/end",
			   "being sucked into a black hole, and then spit back/end", "getting piercings", "using new sex-toys", "salesman showcasing his products/end", "going into the sewers/end", "using experimental pills",
			   "trying to prove magic isn't real", "kissing someone", "having a bad hygiene", "playing with a magic remote", "cosplaying", "breaking a magic wand", "using a knock-off sexdoll",
			   "messing up a ritual", "putting on magic clothing", "looking at transformation art", "watching porn", "being hypnotized", "wishing life was a bit more interesting", "a contamination on a space station/end",
			   "eating fruits", "being splashed with water", "being exposed to toxic gas", "voulnteering to be a 'test rat' for DNA experimenting/end", "wanting fit in with the 'cool' people", 
			   "being accused of being a witch", "using sunscreen from an unknown company", "fantasizing about it", "blackmailing someone", "someone sneezing at them", "getting a random DM asking about roleplaying",
			   "getting pranked by their geneticist friend", "making a wish at a fortune telling machine/end", "a wish, and apparently everyone thinks she's normal and has been this way since birth../end", 
			   "sneaking into a lab and accidentally breaking vials that released toxic fumes/end", "getting a vaccination/end", "using a unfinished teleporter at a laboratory/end", "being confused which one was the transformation-pod and which one was the cryo-pod/end",
			   "walking through a portal that mysteriously opened up", "injecting themselves with experimental nanobots that were only supposed to improve their health", "being kidnapped by a mad doctor and being used as their 'test rat'/end"];

//Where the transformation occurs 
var TFlocation = ["at a farm", "at home", "in a museum", "in a laboratory", "while walking in a forest", "in a circus", "on the subway", "in the park", "in class", 
				  "on the beach", "in a theme park", "in a public bathroom", "in public", "at a party", "while on the toilet", "while camping", "at a family reunion",
				  "at the gym", "in a grocery store", "at a convention", "at a pool", "at work", "in the kitchen", "in a elevator", "at a magic show", "in a factory",
				  "in a casino", "while eating at a fancy restaurant", "while sunbathing", "in her bedroom", "in a back alley", "at a fair", "on a plane", "on a train", "in a car",
				  "at the city square", "at a bar", "in a church", "in a coffee shop", "in the woods", "at the zoo", "at the doctor's office"];

//var reversal = ["is permanent!", "lasts for a month, but if she has sex... it'll become permanent", "lasts for 24 hours"]

//Stores all of the results to be able to copy to clipboard
var THEresults = "";


function randomize()
{
	CreateCharacter();

	possibleTFs = [];
	if (document.getElementById("animal").checked) possibleTFs = possibleTFs.concat(animalTF);
	if (document.getElementById("creature").checked) possibleTFs = possibleTFs.concat(creatureTF);
	if (document.getElementById("expansion").checked) possibleTFs = possibleTFs.concat(expansionTF);
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
	var temp_trigg = RandomValue(trigger);
	resultstring += temp_trigg.split('/end')[0];

	if (temp_trigg.substr(temp_trigg.length - 4) != "/end") {
		if (document.getElementById("INCLlocation").checked === true) resultstring += " " + RandomValue(TFlocation);
	}

	resultstring = resultstring.replace("/mod", RandomValue(possibleMods));

	return resultstring;
}

//First function to run, gathers all information and displays it
function FinalResults()
{
	randomize();
	resultstring = Transformation();
	characterresultstring = CreateCharacter();

	var copybuttonvisibility = document.getElementById("copybutton");
	copybuttonvisibility.style.display = "inline";

	document.getElementById("TFresult").innerHTML = Gender(resultstring);
	if (characterresultstring != null) 
	{
		document.getElementById("CHARresult").innerHTML = Gender(characterresultstring);
		THEresults = "Character:\n" + Gender(characterresultstring) + "\n\nTransformation:\n" + Gender(resultstring);
	}
	else
		THEresults = "Transformation:\n" + Gender(resultstring);
}

//Changes the gender of the character, default is female
function Gender(thestring) {

	var M_pronouns = ["his", "His", "he", "He", "he's", "man"];
	var O_pronouns = ["their", "Their", "they", "They", "they're", "person"];
	var pronouns = [];

	if (document.getElementById("female").checked === true) return thestring + ".";
	else if (document.getElementById("male").checked === true) pronouns = M_pronouns;
	else
	{
		pronouns = O_pronouns;
		thestring = thestring.replace("transforms", "transform");
	}

	thestring = thestring.replace("her", pronouns[0]);
	thestring = thestring.replace("Her", pronouns[1]);
	thestring = thestring.replace("she", pronouns[2]);
	thestring = thestring.replace("She", pronouns[3]);
	thestring = thestring.replace("she's", pronouns[4]);
	thestring = thestring.replace("woman", pronouns[5]);

	if (document.getElementById("other").checked === true)
	{
		thestring = thestring.replace("they's", "they're");
		thestring = thestring.replace("they is", "they're");
		thestring = thestring.replace("grows", "grow");
		thestring = thestring.replace("starts", "start");
		thestring = thestring.replace("shrinks", "shrink");
		thestring = thestring.replace("turns", "turn");

	}
	return thestring + ".";
}

//Copies the results to the clipboard
function copyButt(){
	THEresults = THEresults.replace("<br>", "\n");
	copyStringToClipboard(THEresults);
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

