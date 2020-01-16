var timesused = 0;

//Character
var age = ["young", "mature", "middle aged"];
var bodytype = ["a bit chubby", "very athletic", "somewhat athletic", "pretty average", "very curvy", "'MILF-like'", "pretty skinny", "somewhat skinny", "pretty plump", "very pear-shaped", "pretty muscular", "like of a amazoness", "very voluptuous"];
var height = ["quite small", "quite tall", "about average sized"];

//Transformation types

var animalTF = ["skunk", "cow", "dog", "wolf", "cat", "tiger", "lion", "horse", "bird", "pig", "shark", "giraffe", "snake", "frog", "donkey", "chicken", "goat", "sheep", 
				"kangaroo", "elephant", "rat", "mouse"];

var creatureTF = ["centaur", "dragon", "unicorn", "dinosaur", "succubus", "alien", "elf", "sphinx", "hellhound", "cerberus", "harpy", "hydra", "naga", "gryphon", "pegasus", 
				  "gargoyle", "goblin", "orc", "chimera", "slime"];

var expansionTF = ["She transforms into a bimbo", "She gets MILF-ified", "She gets pregnant", "Her breasts expand", "Her butt expands", "Her belly expands", "Her pussy expands", 
				   "Her hair grows", "She grows into a giantess", "She shrinks down", "She unevenly grows bigger", "Her lips expand", "Her feet expand", "Her nipples expand",
				   "Her tongue expands", "Her hips expand", "She transforms into a busty clown"];

var weirdTF = ["She grows multiple breasts", "She grows multiple arms", "She grows multiple legs", "She grows multiple pussies", "She grows multiple eyes", "Her nipples turn into dicks",
			   "Her buttcheeks transform into boobs", "Her feet transform into hands", "Her hands transform into feet", "She grows breasts all over her body", "Her nipples turn into pussies",
			   "She transforms into a humantaur", "She starts filling up with eggs", "She grows another head", "She grows a huge dick", "Her arms and legs turn into tentacles", 
			   "Her nipples transform into hands", "She grows crotch-boobs", "She transforms into a boobslug", "Her nipples turn into lips", "Her nipples grow long", 
			   "Her hands and feet turn into boobs", "She turns into a dick", "She transforms into a dorse", "She starts laying eggs from her nipples", "Her mouth transforms into a pussy",
			   ""];

var inanimateTF = ["pooltoy", "pumpkin", "toy-soldier", "panties", "sexdoll", "tree", "mousepad", "plushie", "flower", "onahole", "snowman", "doll", "statue", "socks"];

var possibleTFs = [];

for(var i=0; i < animalTF.length; i++) animalTF[i] = "She transforms into a " + animalTF[i];
for(var i=0; i < creatureTF.length; i++) creatureTF[i] = "She transforms into a " + creatureTF[i];
for(var i=0; i < inanimateTF.length; i++) inanimateTF[i] = "She transforms into a " + inanimateTF[i];



//Other
var reaction = ["aroused by", "confused about", "scared of", "shocked by", "terrified of", "embarrassed of", "surprised of", "happy with", "annoyed by", 
				"excited of", "pissed about", "disappointed in", "nervous about", "amused by", "horny by", "curious with", "interested in", "oblivious of", "angry with"];

var trigger = ["a spell", "a miscast spell", "pissing off a witch", "a curse", "her family curse", "a weird app", "an allergy", "a virus outbreak", 
			   "some food", "taking in some suppliments", "a bootleg video-game", "a movie", "music", " uh... something?", "touching a old relic", 
			   "an experiment", "spoilt milk", "cheap make-up", "a weird mobile game", "an infection she got from a scratch", "her new tattoo", "a pop-up advertisement",
			   "an ancient trap", "an accidental wish", "excercising", "a spiked drink", "being a asshole", "drinking some old potion", "being late to work", 
			   "sexual intercourse", "sneezing", "a board game", "eating too much", "some homebrewed beer from a stranger", "being brainwashed", "being probed", "her new shampoo",
			   "genetically modified food", "loosing a bet", "swimming in a lake", "the full moon", "breaking rules", "failing school", "breaking the law", 
			   "being in the wrong place at the wrong time", "stepping in toxic waste", "coming across a mischievous genie", "her lying", "aliens", "mad doctor", 
			   "her own will", "stepping into toxic waste", "looting cursed treasure", "a VR headset", "video-game mods", "falling into a mold", "a spa treatment",
			   "a time machine", "a doctor who accidentally mixed up the clients", "a book", "a costume", "being caught spying", "a experiment gone wrong", "nothing",
			   "being brought back to life after dying", "loosing a game show", "a ancient artifact", "a controller", "a mask", "loosing in poker", "a super villain", 
			   "a teleporting accident", "a voodoo doll", "a 8-ball", "being hungry", "being transported to another reality", "taking a selfie", "a 'second' puberty",
			   "her phobia", "being exposed to radiation", "getting drunk", "volunteering", "form fitting clothing", "eating a snicker"]

var TFlocation = ["at a farm", "in her home", "at a temple", "at a laboratory", "in a forest", "in the circus", "on the subway", "at the park", "in a classroom", "in a courtroom", 
				  "in space", "at the beach", "in a theme park", "in a public bathroom", "at the public square", "somewhere in public", "in a dungeon", "at a party", 
				  "at the gym", "at a diary farm", "in a grocery store", "at a convention", "in a pool", "at work", "in the kitchen", "on the train", "in the elevator",
				  "at a casino", "at a diner", "on her couch", "in her garden", "in a factory", "on a race track", "in her bedroom", "at a tournament"];


function randomize()
{
	CreateCharacter();

	possibleTFs = [];
	if (document.getElementById("animal").checked) 
	{
		possibleTFs = possibleTFs.concat(animalTF);

	}

	if (document.getElementById("creature").checked) possibleTFs = possibleTFs.concat(creatureTF);
	if (document.getElementById("expansion").checked) possibleTFs = possibleTFs.concat(expansionTF);
	if (document.getElementById("weird").checked) possibleTFs = possibleTFs.concat(weirdTF);
	if (document.getElementById("inanimate").checked) possibleTFs = possibleTFs.concat(inanimateTF);


	document.getElementById("transformtitle").innerHTML = "Transformation";
	Transformation();

	document.getElementById("tfbutton").innerHTML = "Transform again!";
}

function RandomValue(array) 
{
	return array[Math.floor(Math.random()*array.length)];
}

//function AmountOfTFs() 
//{
//	timesused++;
//	document.getElementById("count").innerHTML = timesused;
//}

function CreateCharacter()
{
	if (document.getElementById("rand_char").checked === true)
	{
		document.getElementById("charactertitle").innerHTML = "Character";
		document.getElementById("CHARresult").innerHTML = "Your character is a " + RandomValue(age) + " woman, her body is " + RandomValue(bodytype) + " and she's " + RandomValue(height);
	}
	else
	{
		document.getElementById("charactertitle").innerHTML = "";
		document.getElementById("CHARresult").innerHTML = "";
	}
}

function Transformation()
{
	document.getElementById("TFresult").innerHTML = RandomValue(possibleTFs) + " and she is " + RandomValue(reaction) + " her transformation.\nThe transformation was caused by " + RandomValue(trigger);
	if (document.getElementById("INCLlocation").checked === true)
		document.getElementById("TFresult").innerHTML += ", the changes happen " + RandomValue(TFlocation);
}
