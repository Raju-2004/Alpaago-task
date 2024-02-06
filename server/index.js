// Import the required libraries and modules
const express = require('express');  // Import Express framework
const app = express();  // Create an instance of Express app
const PORT = process.env.PORT || 4000;  // Set the port for the server to listen on

// Import Firebase related modules8
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
var serviceAccount = require("./serviceAccountKey.json");

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Initialize Firebase app using serviceAccount credentials
initializeApp({
    credential: cert(serviceAccount),
  });

// Get a reference to the Firestore database
const db = getFirestore();

app.get('/',(req,res)=>{
    res.send('write');
})

app.listen(PORT,()=>{
    console.log("app is listening at port " +PORT);
})