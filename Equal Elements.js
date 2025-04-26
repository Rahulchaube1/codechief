/**
 * Solves the "Equal Elements" problem.
 * Reads input from standard input (process.stdin) for competitive programming.
 * Calculates the minimum operations to make all array elements equal by finding
 * the frequency of the most common element.
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
let currentN = 0;       // Stores the N for the current test case

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
    currentN = parseInt(trimmedLine, 10);
    isReadingN = false; // Set the state to expect the array next
    // Handle edge case N=0 or N=1 immediately (0 operations needed)
     if (currentN <= 1) {
        console.log(0); // 0 or 1 element already means all are equal
        isReadingN = true; // Expect N for the next case
        testCaseCount--;
        if (testCaseCount === 0) {
            rl.close();
        }
    }
  } else {
    // --- Reading Array and Processing ---
    // This line contains the space-separated array elements.
    const arr = trimmedLine.split(' ').map(Number); // Split string into array of numbers

    // --- Core Logic: Count Frequencies and Find Max ---
    const frequencyMap = new Map();
    let maxFrequency = 0;

    // Iterate through the array to count frequencies
    for (const element of arr) {
      const currentCount = (frequencyMap.get(element) || 0) + 1;
      frequencyMap.set(element, currentCount);
      // Update maxFrequency if the current element's count is higher
      if (currentCount > maxFrequency) {
        maxFrequency = currentCount;
      }
    }

    // The minimum operations needed is N - maxFrequency
    const minOperations = currentN - maxFrequency;
    console.log(minOperations);
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
2.  State Management: `testCaseCount`, `isReadingN`, `currentN` track the input state.
3.  Processing Test Cases:
    * Reads `T`.
    * For each case:
        * Reads `N`. Handles the base cases where `N` is 0 or 1 (0 operations needed).
        * Reads the array line.
        * Uses a `Map` (`frequencyMap`) to store the count of each element.
        * Iterates through the array, updating the counts in the map and tracking the `maxFrequency` seen so far.
        * Calculates the result: `minOperations = currentN - maxFrequency`.
        * Prints the result.
        * Resets state for the next test case.
4.  Termination: Closes `readline` when all test cases are done.

How to Run:
   - Save the code as a `.js` file (e.g., `equal_elements.js`).
   - Run using Node.js, piping the input file: `node equal_elements.js < input.txt`
   - Or paste this code into the online judge's JavaScript editor.
*/
