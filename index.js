const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = process.env.PORT || 3000;

// Route to get the Chrome path

app.get('/',(req,res)=>{
res.json({
    message:"server is working ."
})
})
app.get('/chrome-path', (req, res) => {
  // Execute the command to find the Chrome path
  exec('which google-chrome-stable || which google-chrome || which chromium-browser', (err, stdout, stderr) => {
    if (err || stderr) {
      // If there's an error or no path found, respond with an error message
      return res.status(500).send('Chrome/Chromium not found on the server.');
    }
    
    // Send the Chrome path as the response
    res.send(`Chrome/Chromium path: ${stdout.trim()}`);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
