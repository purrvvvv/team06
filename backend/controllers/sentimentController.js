const { spawn } = require('child_process');
const path = require('path');

// Path to your Python script
const pythonScriptPath = path.join('','./scripts/sentiment_analysis.py');  // Update this with the actual path to your Python script
console.log('Python file path is: ', pythonScriptPath);
// List of stock symbols
const stocks = ['AAPL', 'TSLA', 'KO', 'MSFT', 'JNJ', 'PFE', 'AMZN', 'JPM', 'BAC', 'JCP', 'BTU', 'AMRN', 'WFC', 'RF', 'CCL', 'FLG', 'CSAN', 'EVO'];

// Function to call the Python script for each stock
function getStockSentiment() {
  return new Promise((resolve, reject) => {
    // Spawn the Python process
    const pythonProcess = spawn('python', [pythonScriptPath]);

    let output = '';
    let errorOutput = '';

    // Capture the output from the Python script
    pythonProcess.stdout.on('data', (data) => {
      // console.log('Data from python script: ', data.toString());
      output += data.toString();
    });

    // Capture any errors
    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    // Resolve the promise with the output when the script completes
    pythonProcess.on('close', (code) => {
      if (code === 0) {

        resolve(output);
      } else {
        reject(`Python script failed with code ${code}: ${errorOutput}`);
      }
    });
  });
}

// Function to get sentiment for all stocks
async function getAllSentiment(req, res) {
  
  let results = [];
    try {
      const sentiment = await getStockSentiment();
      results.push(sentiment);
     
    } catch (error) {
      console.error(`Error fetching sentiment for }: ${error}`);
      results.push({
        error: `Error fetching sentiment for }`
      });
    }
    res.json(results);
  }
  // Send the sentiment data to the client

module.exports =
{
    getAllSentiment
}