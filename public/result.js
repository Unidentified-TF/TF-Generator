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
				"axolotl", "goose", "turkey", "chameleon", "anteater", "butterfly", "mantis", "slug", "cow", "horse", "porcupine"];

var creatureTF = ["centaur", "dragon", "unicorn", "dinosaur", "succubus", "alien", "elf", "sphinx", "hellhound", "cerberus", "harpy", "hydra", "naga", "gryphon", "pegasus", 
				  "gargoyle", "goblin", "orc", "chimera", "slime", "cyclops", "mermaid", "dryad", "minotaur", "genie", "fairy", "drider", "chocobo"];

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
			   "She grows multiple dicks", "Her belly button changes into a pussy", "Her nipples turn into taps and her boobs fill up with liquids", "Her nipples turn into tentacles"];

var inanimateTF = ["pool-toy", "pumpkin", "toy-soldier", "panties", "sexdoll", "tree", "mousepad", "plushie", "flower", "onahole", "snowman", "doll", "statue", "socks",
				   "cake", "mushroom", "teddy bear", "pillow", "poster", "condom", "chair", "bra", "dildo", "cum", "car", "fountain", "mannequin", "candle", "pinata", 
				   "costume", "chess piece"];

var otherTF = ["mime", "nerd", "robot", "drag queen", "MILF"];

//Stores all transformations the user has chosen
var possibleTFs = [];

//Adds text infront of selected arrays when running to reduce text when editing
for(var i=0; i < animalTF.length; i++) animalTF[i] = "She transforms into a " + animalTF[i];
for(var i=0; i < creatureTF.length; i++) creatureTF[i] = "She transforms into a " + creatureTF[i];
for(var i=0; i < inanimateTF.length; i++) inanimateTF[i] = "She transforms into a " + inanimateTF[i];
for(var i=0; i < otherTF.length; i++) otherTF[i] = "She transforms into a " + otherTF[i];

//How the character reacts
var reaction = ["aroused by", "confused about", "scared of", "shocked by", "terrified of", "embarrassed of", "surprised of", "happy with", "annoyed by", 
				"excited about", "pissed about", "disappointed in", "nervous about", "amused by", "curious about", "interested in", "oblivious of", "angry with"];

//How the transformation is triggered
var trigger = ["a spell", "a miscast spell", "pissing off a witch", "her family curse", "a strange morph app", "her allergy", "a virus outbreak", 
			   "eating old food", "taking in new suppliments", "playing a bootleg video-game", "watching a movie", "listening to music", "nothing", "breaking something", 
			   "an experiment", "drinking a new energy drink", "putting on cheap make-up", "playing a mobile game", "an infection she got from a scratch", "her new tattoo", "clicking on a pop-up advertisement", 
			   "phrasing a wish badly", "exercising", "drinking a spiked drink", "being a asshole", "drinking a old potion", "not coming to work", 
			   "having sexual intercourse", "sneezing", "playing a board game", "eating too much", "drinking homebrewed beer from a stranger", "being brainwashed", "trying out a new shampoo brand",
			   "eating genetically modified food", "loosing a bet", "swimming in a lake", "the full moon", "breaking rules", "failing school", "breaking the law", 
			   "being in the wrong place at the wrong time", "stepping in toxic waste", "coming across a mischievous genie", "lying to people", "being zapped by aliens", "a mad doctor", 
			   "her being curious", "stepping into toxic waste", "looting cursed treasure", "using a VR headset", "being put into a mold", "a new spa treatment", 
			   "a doctor who accidentally mixed up the clients", "reading a book", "wearing a costume from a pop-up store", "being caught spying", "a experiment gone wrong",
			   "being brought back to life after dying", "loosing in a game show", "breaking a artifact", "using a off-brand controller", "putting on a mask", "loosing a game of poker", "a super villain", 
			   "a teleporting accident", "a voodoo doll", "playing around with a 8-ball", "being hungry", "somehow being transported to another reality", "taking a selfie with a filter", "hitting her 'second' puberty",
			   "being exposed to radiation", "being drunk", "volunteering", "trying on form fitting clothing", "opening a gift", "orgasm", "them playing with themself", 
			   "getting a new job and needing to fit their standards", "opening spam email", "voulnteering at a magic show", "bit by someone suffering from the same transformation",
			   "reading some old book", "angering a old woman", "drinking a limited edition latte", "winning the lottery", "vandalizing", "drinking too much", "doing drugs",
			   "testing drugs for doctors", "being offered money for it", "misunderstanding things", "waking up after being cryogenically frozen for a 1000 years, and in need of a new body",
			   "walking through a mirror", "looking at a funhouse mirror", "joining the circus", "pissing of a demon", "not following Unidentified-TF", "being sucked into a video-game",
			   "failing a test", "a backfired prank", "her body adapting to survive", "dreaming it", "being possessed by a spirit", "her being curious", "wishing for a new life",
			   "feeling like she was useless", "being annoying", "stealing", "a character creator in a video-game", "cheating on her significant other", "dating a magic user", 
			   "sucked into a black hole", "getting piercings", "using new sex-toys", "saleswoman showcasing her products", "going into the sewers", "buying the wrong pills",
			   "trying to prove magic isn't real", "kissing someone", "not showering for a long time", "a magic remote", "cosplaying", "breaking a magic wand", "using a knock-off sexdoll",
			   "messing up a ritual", "magic clothing that won't come off", "looking at TF art", "watching porn", "being hypnotized", "wishing life was a bit more interesting", 
			   "getting into a accident and having to get a new body", "eating fruits at a local fruit market", "being splashed with water", 
			   "being accused of being a witch", "using sunscreen from a unknown company", "fantasizing", "blackmailing someone", "someone sneezing at them", "a role-player who slid into her DMs",
			   "getting pranked by her geneticist friend", "having an affair with a magic user's significant other", "making a wish at a fortune telling machine",
			   "blaspheming in earshot of a wrathful god", "being drafted into a new kind of branch", "selling her body", "buying a artifact"];

//Where the transformation occurs 
var TFlocation = ["at a farm", "at home", "in a museum", "in a laboratory", "in a forest", "in a circus", "on the subway", "in the park", "in a classroom", 
				  "on the beach", "in a theme park", "in a public bathroom", "in public", "at a party", "on the toilet", 
				  "at the gym", "in a grocery store", "at a convention", "at a pool", "at work", "in the kitchen", "in her car", "in a elevator",
				  "in a casino", "at a fancy restaurant", "on her couch", "in her garden", "at a race track", "in her bedroom", "in a back alley", "at a fair",
				  "on her bed"];

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
	var resultstring = RandomValue(possibleTFs) + ", she is " + RandomValue(reaction) + " her transformation.<br>The transformation was caused by " + RandomValue(trigger);
	if (document.getElementById("INCLlocation").checked === true) resultstring += " " + RandomValue(TFlocation);
	//resultstring += "<br>The transformation " + RandomValue(reversal);
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

