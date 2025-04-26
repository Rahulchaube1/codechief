/**
 * Solves the "Dominant Element" problem.
 * Reads input from standard input (process.stdin) for competitive programming.
 * Determines if an array has a dominant element (frequency strictly greater than all others).
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
    // We are expecting the size of the array (N).
    // We don't strictly *need* N later if we just process the array line,
    // but we must read this line to advance the input stream.
    // const n = parseInt(trimmedLine, 10); // Optional: store N if needed
    isReadingN = false; // Set the state to expect the array next
  } else {
    // --- Reading Array and Processing ---
    // This line contains the space-separated array elements.
    const arr = trimmedLine.split(' ').map(Number); // Split string into array of numbers

    // --- Core Logic: Find Dominant Element ---
    const frequencyMap = new Map();
    let maxFrequency = 0;

    // 1. Count frequencies and find the maximum frequency
    for (const element of arr) {
      const currentCount = (frequencyMap.get(element) || 0) + 1;
      frequencyMap.set(element, currentCount);
      if (currentCount > maxFrequency) {
        maxFrequency = currentCount;
      }
    }

    // 2. Count how many elements share the maximum frequency
    let elementsWithMaxFreq = 0;
    for (const frequency of frequencyMap.values()) {
      if (frequency === maxFrequency) {
        elementsWithMaxFreq++;
      }
    }

    // 3. Determine if a dominant element exists
    // A dominant element exists if and only if exactly one element
    // has the maximum frequency (and the array was not empty, maxFrequency > 0).
    // The maxFrequency > 0 check handles empty input edge case, though constraints prevent N=0.
    if (maxFrequency > 0 && elementsWithMaxFreq === 1) {
      console.log("YES");
    } else {
      console.log("NO");
    }
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
        * Reads `N` (though the value isn't directly used in the core logic here).
        * Reads the array line.
        * Uses a `Map` (`frequencyMap`) to store the count of each element.
        * Iterates through the array once to populate the `frequencyMap` and simultaneously find the `maxFrequency`.
        * Iterates through the *values* of the `frequencyMap` to count how many elements (`elementsWithMaxFreq`) achieved that `maxFrequency`.
        * Checks the condition: if `maxFrequency` is greater than 0 (i.e., the array wasn't empty) and `elementsWithMaxFreq` is exactly 1, prints "YES". Otherwise, prints "NO".
        * Resets state for the next test case.
4.  Termination: Closes `readline` when all test cases are done.

How to Run:
   - Save the code as a `.js` file (e.g., `dominant_element.js`).
   - Run using Node.js, piping the input file: `node dominant_element.js < input.txt`
   - Or paste this code into the online judge's JavaScript editor.
*/
