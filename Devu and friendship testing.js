/**
 * Solves the "Devu and friendship testing" problem.
 * Reads input from standard input (process.stdin) for competitive programming.
 * Determines the maximum number of friendships Devu can save by counting unique party days.
 */

// Import the readline module for reading input line by line
const readline = require('readline');

// Create an interface for reading from stdin and writing to stdout
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false // Necessary for non-interactive environments
});

// --- State Variables ---
let testCaseCount = -1; // Total number of test cases, -1 means not read yet
let isReadingN = true;  // State flag: true = next line is N, false = next line is days array

// --- Process Input Line by Line ---
rl.on('line', (line) => {
  // Trim whitespace from the input line
  const trimmedLine = line.trim();

  if (testCaseCount === -1) {
    // --- Reading T ---
    // This is the first line, read the total number of test cases (T)
    testCaseCount = parseInt(trimmedLine, 10);
    // If T is 0, close immediately (edge case)
    if (testCaseCount === 0) {
        rl.close();
    }
  } else if (isReadingN) {
    // --- Reading N ---
    // We are expecting the number of friends (N).
    // We don't strictly *need* the value of N for the logic (Set handles duplicates),
    // but we must read this line to advance the input stream correctly.
    // const n = parseInt(trimmedLine, 10); // Optional: store N if needed later
    isReadingN = false; // Set the state to expect the days array next
  } else {
    // --- Reading Days Array ---
    // This line contains the space-separated days requested by friends.
    const days = trimmedLine.split(' ').map(Number); // Split string into array of numbers

    // --- Core Logic: Count Unique Days ---
    // Create a Set from the array of days.
    // A Set automatically stores only unique values.
    const uniqueDays = new Set(days);

    // The maximum number of friendships Devu can save is the count of unique days.
    console.log(uniqueDays.size);
    // --- End Core Logic ---

    // --- Prepare for Next Test Case ---
    isReadingN = true; // Reset state to expect N for the next test case
    testCaseCount--;   // Decrement the remaining test case counter

    // If all test cases have been processed, close the readline interface
    if (testCaseCount === 0) {
      rl.close();
    }
  }
});

// Optional: Handle the 'close' event if needed (e.g., for cleanup)
// rl.on('close', () => {
//   // console.error("Input stream ended.");
// });

/*
Explanation:

1.  Input Reading: Uses Node.js `readline` to read input line by line.
2.  State Management:
    * `testCaseCount`: Keeps track of how many test cases remain.
    * `isReadingN`: A boolean flag to differentiate between reading the line containing `n` and the line containing the days.
3.  Processing Test Cases:
    * The first line read is `T`.
    * For each test case:
        * The line containing `n` is read (but the value isn't strictly needed for this solution). The state `isReadingN` is set to `false`.
        * The next line containing the days is read, split into an array of numbers.
        * A `Set` is created from this array (`new Set(days)`). The `Set` automatically discards duplicate days.
        * The `size` property of the `Set` gives the count of unique days. This is the maximum number of friendships Devu can save.
        * The result (`uniqueDays.size`) is printed.
        * The state `isReadingN` is reset to `true`, and `testCaseCount` is decremented.
4.  Termination: `rl.close()` stops reading input once `testCaseCount` reaches 0.

How to Run:
   - Save the code as a `.js` file (e.g., `devu_friends.js`).
   - Run using Node.js, piping the input file: `node devu_friends.js < input.txt`
   - Or paste this exact code into the online judge's JavaScript editor.
*/
