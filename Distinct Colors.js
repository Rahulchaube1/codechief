/**
 * Solves the "Distinct Colors" problem.
 * Reads input from standard input (process.stdin) for competitive programming.
 * Finds the minimum number of boxes required, which is equal to the maximum
 * number of balls of any single color.
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
let isReadingN = true;  // State flag: true = next line is N, false = next line is the array

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
    // We are expecting the number of colors (N).
    // We don't strictly *need* N later, as we just need the max of the next line,
    // but we must read this line to advance the input stream.
    // const n = parseInt(trimmedLine, 10); // Optional: store N if needed
    isReadingN = false; // Set the state to expect the array next
  } else {
    // --- Reading Array and Processing ---
    // This line contains the space-separated counts of balls for each color.
    const counts = trimmedLine.split(' ').map(Number); // Split string into array of numbers

    // --- Core Logic: Find Maximum Count ---
    // The minimum number of boxes needed is the maximum count of balls of any single color.
    let maxCount = 0;
    // Find the maximum value in the counts array
    // Method 1: Using Math.max with spread syntax (concise)
    // maxCount = Math.max(...counts);

    // Method 2: Using a loop (potentially slightly more efficient for very large arrays, though N is small here)
     for (const count of counts) {
         if (count > maxCount) {
             maxCount = count;
         }
     }

    // Handle the case where the input array might be empty (though constraints say N>=2)
    // If counts is empty, Math.max(...[]) results in -Infinity. The loop handles it correctly by staying 0.
    // If using Math.max, you might add: if (counts.length === 0) maxCount = 0;

    console.log(maxCount);
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

// Optional: Handle the 'close' event if needed
// rl.on('close', () => {
//   // console.error("Input stream ended.");
// });

/*
Explanation:

1.  Input Reading: Uses Node.js `readline` for standard input.
2.  State Management: `testCaseCount` and `isReadingN` track the input state.
3.  Processing Test Cases:
    * Reads `T`.
    * For each case:
        * Reads `N` (the value isn't strictly necessary for the logic).
        * Reads the line containing the ball counts (`A1, A2, ... AN`).
        * Finds the maximum value (`maxCount`) in the `counts` array. This represents the maximum number of balls of any single color.
        * Prints `maxCount`, which is the minimum number of boxes required.
        * Resets state for the next test case.
4.  Termination: Closes `readline` when all test cases are done.

How to Run:
   - Save the code as a `.js` file (e.g., `distinct_colors.js`).
   - Run using Node.js, piping the input file: `node distinct_colors.js < input.txt`
   - Or paste this code into the online judge's JavaScript editor.
*/
