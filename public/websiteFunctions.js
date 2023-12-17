//====================================================================================
//	Website functions
//====================================================================================

// Loads in the history from local storage on page load
window.onload = function() { DisplayHistory(); };

/**
 * Copies the prompt to the clipboard
 */
function CopyResult() {
	copyOfResults = copyOfResults.replace(/<br>/g, '\n')   // Removes html breaklines and inserts text breaklines
	                             .replace(/ +(?= )/g,'')   // Removes double spaces
								 .replace(/^ +/gm, '')     // Removes empty spaces at the beginning of sentences
								 .replace(/<[^>]*>/g, ''); // Removes all html tags

	// Create a temporary textarea to copy the text from
	var el = document.createElement('textarea');
	el.value = copyOfResults;
	el.setAttribute('readonly', '');
	el.style = {position: 'absolute', left: '-9999px'};
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
}

/**
 * Shares the prompt to Twitter/X
 * @param {string} result The prompt
 */
function TwitterShare(result) {
	result = result.replace(/<br><br>/g, "%0a%0a") // Replaces double html breaklines with URL breaklines
	               .replace(/<br>/g, "%0a")        // Replaces html breaklines with URL breaklines
                   .replace(/<.*?>/g, "")          // Removes all html tags
				   .replace(/,/g, "%E2%80%9A");    // Replaces commas with URL commas

	document.getElementById("tweetbutton").href = "https://twitter.com/intent/tweet?hashtags=TFGenerator" + "%0a%0a" + result;
}

/**
 * Saves the prompt to the user's history
 * @param {string} result The prompt
 */
function SaveHistory(result) {
	userhistory.setItem("History3", userhistory.getItem("History2"));
	userhistory.setItem("History2", userhistory.getItem("History1"));
	userhistory.setItem("History1", result);

	DisplayHistory();
}

/**
 * Displays the user's prompt history (if any)
 */
function DisplayHistory() {
	// Corrects collapsible content container's height
	const content = document.getElementById("historycont");
	if (document.getElementById("historytab").classList.contains("active")) {
		content.style.maxHeight = `${content.scrollHeight + content.clientHeight}px`;
	}

	// Updates the container's description, and shows the "clear history" button if there's history
	if (userhistory.getItem("History1") == null) {
		HistoryDescription("No history...", false);
	} else { 
		HistoryDescription("Showing the last 3 transformations.", true);
	}

	// Inserts the history into the container
	["History1", "History2", "History3"].forEach((id) => {
		let history = userhistory.getItem(id);
		if (history != "null") {
			document.getElementById(id).innerHTML = history;
		}
	});
}

/**
 * Clears the user's prompt history
 */
function ClearHistory() {
	if (confirm("Are you sure you want to clear your history?")) {
		const keepDark = userhistory.getItem("dark") == 1 ? true : false;

		// Updates the container's description, and hides the "clear history" button
		HistoryDescription("No history...", false);

		// Removes the history from the container
		["History1", "History2", "History3"].forEach((id) => {
			document.getElementById(id).innerHTML = "";
		});		

		userhistory.clear();

		if (keepDark) {
			userhistory.setItem("dark", 1);
		}
	}
}

/**
 * Updates the description of the history container and shows/hides the "clear history" button
 * @param {string} description The description
 * @param {boolean} btn True if the "clear history" button should be shown
 */
function HistoryDescription(description, btn) {
	document.getElementById("history-description").innerHTML = description;
	if (btn) {
		document.getElementById("clear-history-btn").style.display = "inline";
	} else {
		document.getElementById("clear-history-btn").style.display = "none";
	}
}