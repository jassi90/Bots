import { test, expect } from '@playwright/test';

test('spelling test with user input', async ({ page }) => {
  const wordToSpell = [
    "deep", "happy", "bump", "bear", "count", "dunk", "feet", "cold", 
    "alone", "click", "miss", "shirt", "roof", "here", "lamp", "lost",
    "lunch", "drift", "please", "spill", "tired", "large", "lake", "grab",
    "juice", "nook", "shops", "spot", "world", "math", "pick", "soap",
    "tools", "green", "muddy", "ripe", "sign", "soup", "warm", "fresh",
    "learn", "frosty", "crisp", "shape", "splash", "mushy", "group", "spine",
    "straps", "feast", "eagle", "berries", "caves", "blanket", "catch",
    "updo", "mule", "glow", "quick", "cotton", "seats", "baseball", "great",
    "playground", "monster", "enjoy", "jazzy", "jeans", "partner", "raindrop",
    "office", "young", "outside", "poem", "pillow", "steady", "Saturday",
    "needle", "above", "honking", "strange", "noisy", "video", "timer",
    "topics", "layer", "token", "control", "summer", "across", "stiff",
    "running", "field", "behind", "trace", "below", "loose", "spare", "cling",
    "grins", "giraffe", "groceries", "huddling", "jigsaw", "neighbors",
    "gasped", "mansion", "midday", "powwow", "bazaar", "astray", "liquid",
    "fuel", "massive", "women", "chuckle", "handstand", "machine", "leaking",
    "snazzy", "whee", "welcome", "pretend", "should", "sideways", "muster",
    "include", "sandwich", "Saturn", "violet", "mighty", "solution", "spiral",
    "thread", "velvet", "breathe", "taxicab", "report", "cobweb", "rodent",
    "spying", "showed", "scribbly", "recess", "highway", "reeds", "bolts",
    "squeeze", "softly", "wriggle", "motion", "terror", "murky", "harvest",
    "quill", "patio", "braids", "castle", "costume", "wagon", "wrench",
    "indeed", "gerbils", "village", "critters", "stifle", "dimple", "brother",
    "mistake", "harbor", "reunion", "balloon", "promise", "uproar", "Wednesday",
    "exactly", "severe", "twinkle", "snicker", "stumble", "smock", "natural",
    "childhood", "nonsense", "bandits", "champion", "superb", "tinge",
    "outcome", "groves", "ghostly", "convince", "biology", "captive", "streamers",
    "speckled", "hopscotch", "jumbled", "naughty", "dodgy", "ballerina", "cubism",
    "interact", "jerky", "diablo", "ablaze", "pivot", "karate", "bowler", "phantom",
    "locust", "council", "ointment", "Gothic", "midair", "hurricane", "laurel",
    "lollygag", "vermin", "argument", "wreckage", "dolphin", "infinite", "bittersweet",
    "fend", "disguise", "membrane", "magnolia", "sensation", "daredevil", "bypass",
    "oysters", "military", "gasket", "biceps", "voyage", "advantage", "applause",
    "nostrils", "television", "mattress", "soldier", "trousers", "albums", "muscles",
    "diploma", "harpoons", "rampage", "levitate", "spritzed", "clientele", "anecdotes",
    "haberdasher", "filigree", "catapults", "embroiled", "burro", "guava", "crescendo",
    "ocelot", "onyx", "demigod", "trek", "teriyaki", "contribute", "hocus-pocus",
    "narwhal", "melancholy", "merfolk", "gargoyles", "pavilions", "skeptical", "palette",
    "ogres", "goatee", "grotesque", "threshold", "flamboyant", "famine", "linoleum",
    "pesos", "rogue", "amnesia", "fruition", "bygone", "committee", "mirage",
    "newfangled", "surcharge", "marksmanship", "column", "plaque", "rebuke", "adversity",
    "symphony", "aquamarine", "altar", "stylistic", "flailed", "errands", "spree",
    "steeped", "smattering", "bibliophile", "graphite", "halo", "feisty", "transfixed",
    "aluminum", "residential", "deposition", "veterinarian", "skiff", "totem", "inferno",
    "buzzard", "eliminate", "writhes", "mourners", "respiratory", "perpetrate", "intestines",
    "sanitation", "barren", "lavishly", "suffice", "giddily", "tiff", "leeward",
    "hurly-burly", "monotone", "parroting", "techie", "gruesome", "tsunami", "anomaly",
    "banishment", "magenta", "conveyance", "cohort", "kindling", "treachery", "mañana",
    "squeal", "tersely", "autism", "foyer", "straightforward", "vial", "foist", "Samhain",
    "crystalline", "sentient", "technicalities", "crannies", "incorporeal", "Tlingit",
    "detainees", "delinquent", "grudgingly", "smoldering", "karma", "Cyclops", "translucent",
    "glabrous", "gondolas", "pentameter", "chlorofluorocarbon", "impeccable", "inimitable",
    "euphoria", "Euphrates", "artificial", "villainous", "ruffian", "buccaneer", "lubbers",
    "louis d’or", "ambiguity", "cache", "Madagascar", "catechism", "lieutenant", "cavalier",
    "circumspectly", "Chernobyl", "algebraic", "hydraulics", "klystron", "fuselage",
    "grosgrain", "Byzantine", "objet d’art", "séance", "reticule", "defibrillator",
    "rookery", "vociferous", "Carmelite", "cascabel", "San Joaquin", "cabeza", "imperator",
    "physician", "symbolizes", "camouflaged", "piñon", "dysfunctional", "creosote",
    "gravelly", "keening", "probation", "aesthetic", "suffocate", "endowed", "violence",
    "immunization", "assizes", "stockade", "gallipot", "Olympics", "miscreant", "Aquitaine",
    "muttonchops", "charade", "relegated", "conspiratorial", "puppeteer", "gullet",
    "rancid", "consensus", "accommodations", "emblem", "recoil", "upholstery", "effectual",
    "acquaintance", "fandango", "puncheon", "operant", "infrastructure", "alighted",
    "Canterbury", "barista", "Choctaws", "prosecutor", "noncommittal", "eulogy", "regales",
    "psychometry"
  ];

  // Set up the initial HTML structure only once
  await page.setContent(`
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spelling Test</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        margin: 0;
        background: linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet);
        background-size: 300% 300%;
        animation: rainbow 6s linear infinite;
      }

      @keyframes rainbow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      .game-screen {
        width: 80%; /* Increased width */
        height: 70%; /* Increased height */
        background-color: rgba(255, 255, 255, 0.8); /* Slightly transparent background for contrast */
        border-radius: 20px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }

      h1 {
        font-size: 3rem; /* Increased font size for heading */
        margin-bottom: 20px;
        color: #333;
      }

      .game-controls {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
      }

      button {
        padding: 15px 30px;
        font-size: 1.5rem; /* Increased button size */
        border: none;
        border-radius: 10px;
        background-color: #ff5722;
        color: white;
        cursor: pointer;
        transition: transform 0.2s, background-color 0.2s;
      }

      button:hover {
        background-color: #e64a19;
        transform: scale(1.1);
      }

      input {
        font-size: 1.5rem; /* Increased input size */
        padding: 10px;
        width: 70%;
        border: 2px solid #ddd;
        border-radius: 8px;
      }
    </style>
  </head>
  <body>
    <div class="game-screen">
      <h1>Spelling Game</h1>
      <div class="game-controls">
        <button id="sayWord">Say Word</button>
        <input id="wordInput" type="text" placeholder="Type the word here..." />
        <button id="checkSpelling">Check Spelling</button>
      </div>
      <p id="result"></p>
    </div>

    <script>
      let wordToSpell = "";

      // Function to say the word
      const sayWord = () => {
        const utterance = new SpeechSynthesisUtterance(wordToSpell);
        utterance.lang = 'en-US';
        utterance.rate = 0.4;
        speechSynthesis.speak(utterance);
      };

      // Function to check the spelling
      const checkSpelling = () => {
        const userInput = document.getElementById("wordInput").value.trim().toLowerCase();
        const result = document.getElementById("result");
        let feedbackMessage;

        if (userInput === wordToSpell) {
          feedbackMessage = "Correct!";
          result.textContent = feedbackMessage;
          result.style.color = "green";
        } else {
          feedbackMessage = "Incorrect!";
          result.textContent = feedbackMessage;
          result.style.color = "red";
        }

        const feedbackUtterance = new SpeechSynthesisUtterance(feedbackMessage);
        feedbackUtterance.lang = 'en-US';
        speechSynthesis.speak(feedbackUtterance);
      };

      // Button event listeners
      document.getElementById("sayWord").addEventListener("click", sayWord);
      document.getElementById("checkSpelling").addEventListener("click", checkSpelling);

      // Function to update the word to be spelled
      window.setWord = (word) => {
        wordToSpell = word;
      };
    </script>
  </body>
</html>

  `);

  // Iterate over words and test
  for (let i = 0; i < wordToSpell.length; i++) {
    // Select a random index from the wordToSpell array
    const randomIndex = Math.floor(Math.random() * wordToSpell.length);
    const randomWord = wordToSpell[randomIndex];

    // Update the word to spell dynamically in the page context
    await page.evaluate((word) => {
      window.setWord(word);  // Update the word to be spelled
    }, randomWord);

    console.log("Random word selected:", randomWord);

    await page.evaluate(() => {
        window.clickCount = 0; // Initialize click count to 0 in the browser context
    });
      
      // Add event listener in the page context to update click count
    await page.evaluate(() => {
        const button = document.querySelector('#checkSpelling');
        button.addEventListener('click', () => {
        window.clickCount++;  // Increment click count inside the page context
        console.log(`Button clicked ${window.clickCount} times`);
        });
    });
      
    // Simulate the user interaction by clicking the "sayWord" button
    await page.click('#sayWord');
    console.log(`The word "${randomWord}" has been spoken. Please type the word.`);
      
    // Wait for the button to be clicked (clickCount will be updated in the browser context)
    await page.waitForFunction(() => window.clickCount > 0);
      
    // Once clicked, move to the next word
    console.log('Button clicked. Moving to next word.');
      
    // Wait to check the result
    const resultText = await page.textContent('#result');
    console.log("Result:", resultText);
      

    await page.waitForTimeout(2000); // Wait before moving to the next word
  }
});