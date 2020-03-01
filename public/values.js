
//Character values
var bodytype   = ["chubby", "athletic", "curvy", "skinny", "plump", "muscular", "voluptuous", "thick", "endowed", "sleek", "bottom-heavy", "slender"];
var height     = ["short", "very short", "tall", "very tall", "average sized"];
var skinColor  = ["pale", "fair", "dark", "brown", "tan", "lightly tanned", "rosy", "exotic", "amber", "chestnut", "bronze", "light"];
var hairStyle  = ["wavy", "curled", "straight", "spiked", "thick", "frizzy", "braided", "afro", "damaged", "feathered", "messy", "wooly", "swept-back"];
var hairLength = ["short", "long", "shoulder-length", "elbow-length", "very short"];
var hairColor  = ["blond", "black", "jet black", "red", "platinum blond", "brown", "dark brown", "auburn", "ginger", "bleached"];
var eyeColor   = ["amber", "blue", "brown", "green", "hazel", "red", "heterochromic", "pink", "grey"];
var clothing   = ["stylish", "revealing", "sporty", "simple", "modest", "winter", "casual", "sexy", "old", "no", "no", "no"];

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
                       "She /t/ grows an udder", "Her butt /t/ transforms into that of a /Amod"]

var creatureTF  = ["centaur", "dragon", "unicorn", "succubus", "alien", "elf", "sphinx", "hellhound", "cerberus", "harpy", "hydra", "naga", "gryphon", "pegasus", 
				   "gargoyle", "goblin", "orc", "chimera", "slime", "cyclops", "mermaid", "dryad", "minotaur", "genie", "fairy", "drider", "chocobo", "goddess", "satyr", "deathclaw",
				   "imp", "demon", "dwarf", "ghost", "ogre", "pixie", "siren", "vampire", "yeti", "twi'lek", "bigfoot", "oni", "nymph", "gorgon", "griffin", "leprechaun", "hippogriff"];

var expansionTF = ["She /t/ transforms into a /extra/bimbo", "She gets pregnant", "Her breasts /t/ expand", "Her butt /t/ expands", "Her belly /t/ expands", "Her genitals /t/ expand", 
				   "Her hair /t/ grows long and thick", "She /t/ grows into a /extra/giantess", "She /t/ shrinks down", "She /t/ unevenly grows bigger", "Her lips /t/ expand", "Her feet /t/ expand", "Her nipples /t/ expand",
				   "Her tongue /t/ expands", "Her hips /t/ expand", "Her clit /t/ expands", "Her anus /t/ expands to the size of a donut"];

//Everything is written with "she", "her" and etc and then later replaced with the proper pronoun!
var TGfem  = ["Her pussy transforms into a dick", "She transforms into a man", "She transforms into a femboi", "She transforms into a drag queen", "She transforms into a man", "She transforms into a man", "She grows a horsecock", "She transforms into a E-boy"];
var TGmale = ["Her dick transforms into a pussy", "She grows boobs", "She transforms into a woman", "She transforms into a bimbo", "She transforms into a amazoness", "She transforms into a pregnant woman", "She transforms into a woman", "She transforms into a woman", "Her dick turns into a mare's pussy with crotch-boobs", "She transforms into a E-girl"];
var TGoth  = ["She grow boobs", "She grow a pussy", "She grow a dick", "She get pregnant", "She transforms into a man", "She transforms into a woman"];

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
			   "Her genitals transform into a boob", "She /t/ grows a uneven amount of boobs", "Her arms /t/ turn into dicks", "Her hair /t/ falls off"];

var inanimateTF = ["/mod pool-toy", "toy-soldier", "panties", "sexdoll", "mousepad", "/mod plushie", "onahole", "snowman", "doll", "statue", "candle holder", "house", "wind-up doll", "ball", "roman statue",
				   "teddy bear", "pillow", "poster", "condom", "chair", "bra", "dildo", "cum-filled condom", "car", "fountain", "mannequin", "candle", "pinata", "pair of socks", "pair of shoes",
				   "/mod costume", "chess piece", "/mod taxidermy head mount", "suit of themselves", "ice sculpture", "balloon", "bobblehead", "lava lamp", "puppet", "mirror", "rubber /mod", "tube of lipstick"];

var foodTF   = ["a pumpkin", "a cake", "candy", "chocolate", "a /extra/blueberry", "a banana", "a blueberry", "a pear", "a raspberry", "a dessert", "a melon", "a cookie", "a ice-cream topped of with sprinkles and a cherry", 
	            "a eggplant", "a pineapple", "a strawberry", "a dragon-fruit", "gingerbread", "bubblegum", "a gummy-bear", "a apple", "a hotdog", "a peach", "a bunch of grapes", "a cherry", "a pudding", "a blackberry", "a burger", "a cupcake",
	            "jello", "a donut", "a stuffed turkey", "a cream filled donut"];

var plantTF  = ["tree", "flower", "piranha plant", "succplant", "cactus", "pitcher plant", "venus flytrap", "alraune", "dryad", "rose", "rose bush", "fruit tree", "sunflower", "bush", "mushroom"];

var otherTF  = ["mime", "nerd", "robot /mod", "MILF", "amazoness", "goth", "robot", "clown", "geek", "E-girl"];

var extraMod = ["pregnant ", "chubby ", "lactating ", "futa ", "bimbo ", "multi-breasted ", "giant ", "busty ", "big bottomed ", "small ", "pregnant lactating ", "multi-breasted futa ", "egg laying ", " ", " "];

//Needs to save modifiers before text is added to the previous arrays
possibleMods = animalTF.concat(creatureTF);
possibleModsA = animalTF.concat(possibleModsA);

//Adds text infront of selected arrays when running to reduce text when editing
for(var i=0; i < animalTF.length; i++) animalTF[i] = "She /t/ transforms into a /extra/" + animalTF[i];
for(var i=0; i < creatureTF.length; i++) creatureTF[i] = "She /t/ transforms into a /extra/" + creatureTF[i];
for(var i=0; i < inanimateTF.length; i++) inanimateTF[i] = "She /t/ transforms into a " + inanimateTF[i];
for(var i=0; i < foodTF.length; i++) foodTF[i] = "She /t/ transforms into " + foodTF[i];
for(var i=0; i < plantTF.length; i++) plantTF[i] = "She /t/ transforms into a " + plantTF[i];
for(var i=0; i < otherTF.length; i++) otherTF[i] = "She /t/ transforms into a /extra/" + otherTF[i];

//How the character reacts
var reaction = ["aroused by", "confused about", "scared of", "shocked by", "terrified of", "embarrassed by", "very embarrassed by", "surprised by", "happy with", "annoyed by", "ashamed of", "humiliated by",
				"excited about", "pissed about", "disappointed by", "nervous about", "amused by", "curious about", "very interested by", "oblivious of", "angry about", "indifferent about",
				"pleasantly surprised by", "confused and aroused by", "giddy about", "scared but intrigued by", "very shocked by", "left speechless by"];

//How the transformation is triggered
var trigger = ["accidentally messing up a spell", "pissing off a witch", "their family curse kicking in,", "using a strange morph app", "their allergy kicking in,", "contracting a virus", 
			   "eating old food", "taking in new supplements", "playing a bootleg video-game", "watching a movie", "listening to music", "breaking a cursed object in a store/end", 
			   "doing an experiment", "drinking a new energy drink", "putting on cheap make-up", "playing a mobile game", "an infection they got from a scratch", "getting a new tattoo", "clicking on a pop-up advertisement", 
			   "phrasing a wish poorly", "exercising", "drinking a spiked drink", "being an asshole to everyone", "drinking a old potion", "not coming to work/end", "activating a trap in a tomb/end",
			   "having sex", "sneezing", "playing a board game with friends/end", "eating too much", "drinking homebrewed beer from a stranger", "being brainwashed", "trying out a new shampoo brand/end",
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
			   "being accused of being a witch", "using cheap sunscreen", "fantasizing about it", "blackmailing someone", "someone sneezing at them", "getting a random DM asking about roleplaying",
			   "getting pranked by their geneticist friend", "making a wish at a fortune telling machine/end", "a wish, and apparently everyone thinks this is normal and they've been this way since birth../end", 
			   "sneaking into a lab and accidentally breaking vials that released toxic fumes/end", "getting a vaccination/end", "using an unfinished teleporter at a laboratory/end",
			   "walking through a portal that mysteriously opened up", "injecting themselves with experimental nanobots", "being kidnapped by a mad doctor and being used as their 'test rat'/end",
			   "using essential oils", "using this generator", "putting on a cursed necklace", "touching old bones while on a excavation/end", "going on a ride in a theme park/end", "accidentally touching jizz", "imagining it", 
			   "kinkshaming someone", "breaking up with a witch", "making a video on Tik-Tok", "getting unbirthed, and later being rebirthed to their 'new mother's' likeness/end", "writing about it",
			   "drinking bathwater", "interfering with the mafia", "shaming others", "taking a deep breath", "breathing in alien air/end", "having an intern doctor perform a surgery on them/end", "being treated by a fake doctor/end", 
			   "photoshopping themselves like that", "trying out a new spa treatment/end", "taking a mud-bath at a spa/end", "listening to trash music", "having a wardrobe malfunction", "not exercising/end", "destroying a expensive painting",
			   "trying out a 'cure' for a uncurable virus", "being held captive by a tribe/end", "testing out a new perfume", "taking an online quiz", "using a snapchat filter", "being too nice", "eating pineapple pizza", 
			   "breaking a mirror", "walking under a ladder", "opening a umbrella indoors/end", "stepping on a fairy", "not giving an elderly woman their seat on a bus/end", "suffering a fatal accident and undergoing an experimental procedure/end",
			   "playing Dungeons & Dragons", "playing Jumanji", "being kidnapped and sold to a corrupt rich person/end", "falsely accusing someone of harassment", "using the wrong drugs", "not doing their taxes/end",
			   "asking Unidentified-TF for a request", "using a TF app which malfuntions", "summoning a god", "popping a clown's balloon", "swimming in toxic waste/end", "tasting Wonka candy", "eating fast-food", "noticing a bug in this generator and not reporting it/end",
			   "being used as a host for an alien", "using Discord on light mode", "wanting to attract their crush", "being forced by their parents to undergo the change", "becoming vegan", "licking a toad", "smoking", "vaping", "drinking breastmilk",
			   "wanting to speak to the manager of a store/end", "writing a customers name wrong on their coffee cup/end", "buying knock-off clothing at a cheap store/end", "pirating movies", "putting on a chocker", "praying to a god", "believing the earth is flat/end",
			   "not following the school rules/end", "being dared to annoy a witch", "breaking into a witch's house/end", "flirting with a witch", "kicking a leprechaun", "incorrectly guessing the answer to a riddle", "wishing for attention", "being hit by a cupid's arrow",
			   "cheating on a test/end", "cheating in poker/end", "dreaming of it"];

//Where the transformation occurs 
var TFlocation = ["at a farm", "at home", "in a museum", "in a laboratory", "while walking in a forest", "in a circus", "on the subway", "in the park", "in class", 
				  "on the beach", "in a theme park", "in a public bathroom", "in public", "at a party", "while on the toilet", "while camping", "at a family reunion",
				  "at the gym", "in a grocery store", "while attending a convention", "at a pool", "at work", "in the kitchen", "in a elevator", "at a magic show", "in a factory",
				  "in a casino", "while eating at a fancy restaurant", "while sunbathing", "in their bedroom", "in a back alley", "at a fair", "on a plane", "on a train", "in a car",
				  "at the city square", "at a bar", "in a church", "in a coffee shop", "in the woods", "at the zoo", "at the doctor's office", "at an arcade", "while taking a shower",
				  "in the middle of a meeting", "while in a uber", "in a cellar", "in a hotel", "while giving a speech", "in a studio", "in a cave", "in a mall", "on a yacht", "at school", "at a concert",
				  "at a spa", "in the cinema", "in an abandoned house", "in a mansion", "in a changing room", "in a bus", "while touring Willy Wonka's factory", "in a fast-food restaurant", "at a reunion", "in a hospital",
				  "in a job interview", "at a graveyard", "in a toy shop", "on live TV"];

//how long the TF takes and if it's temporary or permanent
var TFtime      = ["slowly", "near-instantly", "rapidly", "slowly", "very slowly", "suddenly", "", "", ""];

var TFreversal  = ["permanent", "temporary and they'll change back /time/", "temporary and they'll change back /time/... but not fully, some traits are permanent"];

var TFtemporary = ["in a year", "in a few years", "in a month", "in a few months", "in a day", "in a few days", "in a few minutes", "in a week", "in a few weeks", "next full moon", "after having sex", "after a true love's kiss", "after sleeping",
				   "after taking a shower", "when someone mentions their name", "when someone compliments them", "after drinking water", "in a decade", "at midnight", "next blood moon", "next solar eclipse"];

var TFtempPen   = ["a year", "a few years", "a month", "a few months", "a day", "a few days", "a week", "a few weeks", "a decade"];

var TFpenalty   = ["masturbate", "have sex", "get pregnant", "are mean to someone", "remove their clothes", "cry", "kinkshame others", "eat candy", "make fun of someone", "kiss someone", "drink alcohol", "touch someone", "talk about their transformation", "talk", "", "", "", "", "", "", "", ""];

var TFmental    = ["it harder to concentrate on anything but sex", "her suddenly want to strip naked", "her suddenly feel the need to masturbate", "her /t/ lose her intelligence to where she cannot speak or stand on her own", "her /t/ gain the intelligence of a computer", 
			       "her /t/ forget about the transformation and think she's always been like this", "her urge for a master", "her /t/ more dominant", "her /t/ more submissive", "her /t/ go mute", "her constantly horny", "her /t/ very bitchy", "her /t/ hunger for cum",
			       "her fall in love with the next person she sees", "her /t/ grow more confident", "her /t/ loose all of her confidence", "her /t/ very bubbly and happy", "her /t/ feel more powerful", "her /t/ grow mad with power", "her do anything she's asked of"];
