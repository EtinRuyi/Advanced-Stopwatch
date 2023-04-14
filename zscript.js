// Get stopwatch elements from HTML
const stopwatch = document.querySelector(".stopwatch");
const display = stopwatch.querySelector(".display");
const startBtn = document.querySelector(".start");
const pauseBtn = document.querySelector(".pause");
const resetBtn = document.querySelector(".reset");
const lapBtn = document.querySelector(".lap");
const clearlapBtn = document.querySelector(".clearlap");
const lapsList = document.querySelector(".laps");

// Initialize some variables
let startTime; // the time when the stopwatch started
let elapsedTime = 0; // the time that has passed since the stopwatch started
let timerInterval; // A reference to the setInterval that updates the stopwatch display
let laps = []; // an array to store lap times

// A function to format a time in milliseconds as a string in the format "hh:mm:ss:ms"
function formatTime(time) {
  // Calculate the hours, minutes, seconds, and milliseconds
  const hours = Math.floor(time / 3600000)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((time / 60000) % 60)
    .toString()
    .padStart(2, "0");
  let seconds = Math.floor((time / 1000) % 60);
  let milliseconds = Math.floor(time % 1000);
  // Handle the case where the milliseconds have rolled over to a full second
  if (milliseconds >= 1000) {
    seconds++;
    milliseconds = 0;
  }
  // Convert the seconds and milliseconds to strings and pad them with leading zeros if necessary
  seconds = seconds.toString().padStart(2, "0");
  milliseconds = Math.floor(milliseconds / 10)
    .toString()
    .padStart(2, "0");
  // Return the formatted time string
  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

// A function that updates the stopwatch display with the current elapsed time
function updateDisplay() {
  const elapsedTime = Date.now() - startTime;
  display.textContent = formatTime(elapsedTime);
}

// A function that Starts the stopwatch and update the display every 10 milliseconds
function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateDisplay, 10);
  // On clicking Start, Hide the start button and show the pause button
  startBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";
}

// A function that pauses the stopwatch and update the elapsed time
function pauseTimer() {
  clearInterval(timerInterval);
  // Update the elapsed time to reflect the time since starting the stopwatch
  elapsedTime = Date.now() - startTime;
  // On clicking Pause, Hide the pause button and show the start button
  startBtn.style.display = "inline-block";
  pauseBtn.style.display = "none";
}

// A function that resets the stopwatch and clear the lap list to its initial state
function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  // Update the stopwatch display to show the reset time
  display.textContent = formatTime(elapsedTime);
  // Clear the laps array and the laps list on the page
  laps = [];
  lapsList.innerHTML = "";
  // On clicking Reset, Hide the pause button and show the start button
  startBtn.style.display = "inline-block";
  pauseBtn.style.display = "none";
}

// Initialize a variable i and set its value to 0
let i = 0;
// Define a function named counter that increments i by 1 and returns its new value
const counter = () => {
  return (i += 1);
};

// Define a function named lapTimer that record a lap time and add it to the lap list
function lapTimer() {
  laps.push(formatTime(Date.now() - startTime));
  // Create a new li element to display the lap on the page
  const lapItem = document.createElement("li");
  // Set the text content of the li element to display the lap number and the lap time using the counter and laps array
  lapItem.textContent = `Lap ${counter()}: ${laps[laps.length - 1]}`;
  // Add the new lap li element to the lapsList element on the page
  lapsList.appendChild(lapItem);
}

// Clear all lap times from the lap list
function clearLaps() {
  // Reset the laps array
  laps = [];
  // Clear the lapsList element on the page
  lapsList.innerHTML = "";
}

// Add event listeners to the start, pause, reset, lap, and clear lap buttons, which trigger the corresponding functions
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", lapTimer);
clearlapBtn.addEventListener("click", clearLaps);
