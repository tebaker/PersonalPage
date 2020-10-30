function rollTheDice() {
	// Grabbing user-typed seed
	let seed = document.getElementById("seed").value;
	
	// Setting time of roll to time now
	let timeOfRoll = new Date();
	timeOfRoll = timeOfRoll.getFullYear() + '-' +
				(timeOfRoll.getMonth()+1) + '-' +
				 timeOfRoll.getDate() + '-' +
				 timeOfRoll.getHours() + '-' + 
				 timeOfRoll.getMinutes() + '-' +
				 timeOfRoll.getSeconds() + '-' +
				 timeOfRoll.getMilliseconds();

	// Generating random number between 1 and 1000
	let nextRandom = new Math.seedrandom(seed + timeOfRoll);
	let resultOfRoll = Math.ceil(1000 * nextRandom());

	// Displaying result of roll
	document.getElementById("results").innerHTML =
		"<br>Result of Roll: " + "<b>" + resultOfRoll + "</b>" +
		"<br>Seed used is: "   + "<b>" + seed         + "</b>" +
		"<br>Time of Roll: "   + "<b>" + timeOfRoll   + "</b>";
}

function validateRoll() {
	let seedUsed = document.getElementById("seedUsed").value;
	let timeOfRollUsed = document.getElementById("timeOfRollUsed").value;

	// Generating same random number between 1 and 1000
	let nextRandom = new Math.seedrandom(seedUsed + timeOfRollUsed);
	let validatedRoll = Math.ceil(1000 * nextRandom());

	// Displaying result of roll
	document.getElementById("validate").innerHTML = 
		"<br>Outcome of Roll Was: "  + "<b>" + validatedRoll  + "</b>";
}