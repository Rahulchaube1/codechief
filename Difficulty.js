/**
 * Solves the Chef and Dolls problem using Bitwise XOR.
 * Reads input from standard input (process.stdin) for competitive programming.
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
let testCaseCount = -1; // Total number of test cases, initialized to -1 (meaning not read yet)
let currentN = -1;      // Number of dolls for the *current* test case, -1 signifies expecting N
let dollsReadCounter = 0; // Counter for dolls read in the *current* test case
let currentMissingDollType = 0; // Stores the XOR result for the *current* test case

// --- Process Input Line by Line ---
rl.on('line', (line) => {
  // Trim whitespace and parse the line as an integer
  const num = parseInt(line.trim(), 10);

  if (testCaseCount === -1) {
    // --- Reading T ---
    // This is the first line, read the total number of test cases (T)
    testCaseCount = num;
    // If T is 0, close immediately (edge case)
    if (testCaseCount === 0) {
        rl.close();
    }
  } else if (currentN === -1) {
    // --- Reading N ---
    // We are expecting the number of dolls (N) for the next test case
    currentN = num;
    // Reset variables for the new test case
    dollsReadCounter = 0;
    currentMissingDollType = 0; // Crucial: Reset XOR accumulator for the new case

    // Handle edge case N=0 immediately (though constraints say N>=1)
    if (currentN === 0) {
        console.log(0); // Output 0 for an empty case
        currentN = -1; // Reset state to expect the next N
        testCaseCount--; // Decrement remaining test case counter
        // Check if all test cases are done after this N=0 case
        if (testCaseCount === 0) {
            rl.close();
        }
    }
  } else {
    // --- Reading a Doll Type ---
    // We are inside a test case, reading a doll type
    currentMissingDollType ^= num; // Apply the XOR operation
    dollsReadCounter++;            // Increment the count of dolls read for this case

    // Check if all dolls for the current test case have been read
    if (dollsReadCounter === currentN) {
      // --- End of Test Case ---
      console.log(currentMissingDollType); // Print the final XOR result (the missing doll)

      // Reset state to indicate we are ready for the next test case's N
      currentN = -1;
      testCaseCount--; // Decrement the remaining test case counter

      // If all test cases have been processed, close the readline interface
      if (testCaseCount === 0) {
        rl.close();
      }
    }
  }
});

// Optional: Handle the 'close' event if needed (e.g., for cleanup)
// rl.on('close', () => {
//   // console.error("Input stream ended."); // Example debug message
// });

/*
Key Points:
1.  Input Reading: Uses Node.js `readline` for efficient line-by-line input.
2.  State Management: `testCaseCount`, `currentN`, `dollsReadCounter`, `currentMissingDollType` track progress.
3.  XOR Logic: `currentMissingDollType ^= num` correctly accumulates the XOR sum. Pairs cancel out.
4.  Resetting State: `currentMissingDollType` is reset to 0 when a new `N` is read, ensuring test cases don't interfere. `currentN` is set back to -1 after a test case finishes.
5.  Output: `console.log()` prints the result for each completed test case.
6.  Termination: `rl.close()` stops reading input once `testCaseCount` reaches 0.

How to Run:
   - Save the code as a `.js` file (e.g., `chef_dolls.js`).
   - Run using Node.js, piping the input file: `node chef_dolls.js < input.txt`
   - Or paste this exact code into the online judge's JavaScript editor.
*/
