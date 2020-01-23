//I'm pretty new to JavaScript so don't bully me lol



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

var expansionTF = ["She transforms into a bimbo", "She gets MILF-ified", "She gets pregnant", "Her breasts expand", "Her butt expands", "Her belly expands", "Her pussy expands", 
				   "Her hair grows", "She grows into a giantess", "She shrinks down", "She unevenly grows bigger", "Her lips expand", "Her feet expand", "Her nipples expand",
				   "Her tongue expands", "Her hips expand", "She transforms into a busty clown"];

var weirdTF = ["She grows multiple breasts", "She grows multiple arms", "She grows multiple legs", "She grows multiple pussies", "She grows multiple eyes", "Her nipples turn into dicks",
			   "Her buttcheeks transform into boobs", "Her feet transform into hands", "Her hands transform into feet", "She grows breasts all over her body", "Her nipples turn into pussies",
			   "She transforms into a humantaur", "She starts filling up with eggs", "She grows another head", "She grows a huge dick", "Her arms and legs turn into tentacles", 
			   "Her nipples transform into hands", "She grows crotch-boobs", "She transforms into a boobslug", "Her nipples turn into lips", "Her nipples grow long", 
			   "Her hands and feet turn into boobs", "She turns into a dick", "She transforms into a dorse", "She starts laying eggs from her nipples", "Her mouth transforms into a pussy",
			   "She gets conjoined with another person", "She fuses with another person", "She transforms into a suckplant", "She transforms into a boob"];

var inanimateTF = ["pool-toy", "pumpkin", "toy-soldier", "panties", "sexdoll", "tree", "mousepad", "plushie", "flower", "onahole", "snowman", "doll", "statue", "socks",
				   "cake", "mushroom", "teddy bear", "pillow", "poster", "condom", "chair"];

var otherTF = ["mime", "nerd", "robot"];

var possibleTFs = [];

for(var i=0; i < animalTF.length; i++) animalTF[i] = "She transforms into a " + animalTF[i];
for(var i=0; i < creatureTF.length; i++) creatureTF[i] = "She transforms into a " + creatureTF[i];
for(var i=0; i < inanimateTF.length; i++) inanimateTF[i] = "She transforms into a " + inanimateTF[i];
for(var i=0; i < otherTF.length; i++) otherTF[i] = "She transforms into a " + otherTF[i];

//Other
var reaction = ["aroused by", "confused about", "scared of", "shocked by", "terrified of", "embarrassed of", "surprised of", "happy with", "annoyed by", 
				"excited about", "pissed about", "disappointed in", "nervous about", "amused by", "curious about", "interested in", "oblivious of", "angry with"];

var trigger = ["a spell", "a miscast spell", "pissing off a witch", "her family curse", "a strange morph app", "her allergy", "a virus outbreak", 
			   "eating old food", "taking in new suppliments", "playing a bootleg video-game", "watching a movie", "listening to music", "nothing", "breaking something", 
			   "an experiment", "drinking a new energy drink", "putting on cheap make-up", "playing a mobile game", "an infection she got from a scratch", "her new tattoo", "clicking on a pop-up advertisement", 
			   "phrasing a wish badly", "exercising", "drinking a spiked drink", "being a asshole", "drinking a old potion", "not coming to work", 
			   "having sexual intercourse", "sneezing", "playing a board game", "eating too much", "drinking homebrewed beer from a stranger", "being brainwashed", "trying out a new shampoo brand",
			   "eating genetically modified food", "loosing a bet", "swimming in a lake", "the full moon", "breaking rules", "failing school", "breaking the law", 
			   "being in the wrong place at the wrong time", "stepping in toxic waste", "coming across a mischievous genie", "lying to people", "being zapped by aliens", "a mad doctor", 
			   "her being curious", "stepping into toxic waste", "looting cursed treasure", "using a VR headset", "being put into a mold", "a new spa treatment", 
			   "a doctor who accidentally mixed up the clients", "reading a book", "wearing a costume from a pop-up store", "being caught spying", "a experiment gone wrong",
			   "being brought back to life after dying", "loosing a game show", "breaking a artifact", "using a off-brand controller", "putting on a mask", "loosing in poker", "a super villain", 
			   "a teleporting accident", "a voodoo doll", "playing around with a 8-ball", "being hungry", "being transported to another reality", "taking a selfie with a filter", "hitting her 'second' puberty",
			   "being exposed to radiation", "being drunk", "volunteering", "trying on form fitting clothing", "opening a gift"];

var TFlocation = ["at a farm", "at home", "in a museum", "in a laboratory", "in the forest", "in a circus", "on the subway", "in the park", "in a classroom", 
				  "on the beach", "in a theme park", "in a public bathroom", "somewhere in public", "at a party", "on the toilet", 
				  "at the gym", "in a grocery store", "at a convention", "at a pool", "at work", "in the kitchen", "in her car", "in a elevator",
				  "in a casino", "at a fancy restaurant", "on her couch", "in her garden", "at a race track", "in her bedroom"];

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

function RandomValue(array) 
{
	return array[Math.floor(Math.random()*array.length)];
}

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

function Transformation()
{
	var resultstring = RandomValue(possibleTFs) + ", she is " + RandomValue(reaction) + " her transformation.\nThe transformation was caused by " + RandomValue(trigger);
	if (document.getElementById("INCLlocation").checked === true) resultstring += " " + RandomValue(TFlocation);
	return resultstring;
}

function FinalResults()
{
	randomize();
	resultstring = Transformation();
	characterresultstring = CreateCharacter();

	document.getElementById("TFresult").innerHTML = Gender(resultstring);
	if (characterresultstring != null) 
	{
		document.getElementById("CHARresult").innerHTML = Gender(characterresultstring);
		THEresults = "Character:\n" + Gender(characterresultstring) + "\n\nTransformation:\n" + Gender(resultstring);
	}
	else
		THEresults = "Transformation:\n" + Gender(resultstring);

	console.log(THEresults);
}

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

function copyButt(){
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
