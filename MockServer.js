// Steps to Run MockServer.js
// Install Node.js v20.10.0:

// Ensure you have Node.js version 20.10.0 installed.
// node -v
// This should output v20.10.0.

// Navigate to the Directory:
// Open a terminal or command prompt and navigate to the directory containing MockServer.js:
// npm install express

// Use the node command to run MockServer.js:
// node MockServer.js (windows)
// or ./node MockServer.js (linux)

// Access the Server:
// Server is running at http://localhost:8000
// Open a web browser or use a tool like Postman or curl to interact with the API.

const express = require('express');
const cors = require('cors'); // Import cors middleware
const app = express();
const port = 8000;

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors()); // Enable CORS for all routes

// Mock data
const mockExpenseEntries = [
  {
    id: 1,
    item: "Evolved Node B",
    amount: Math.floor((Math.random() * 10) + 1),
    category: "eNodeB",
    location: "Athlone",
    spendOn: new Date(2020, 4, Math.floor((Math.random() * 30) + 1), 10, 10, 10),
    createdOn: new Date(2020, 4, Math.floor((Math.random() * 30) + 1), 10, 10, 10)
  },
  {
    id: 2,
    item: "Next-Generation Node B",
    amount: Math.floor((Math.random() * 10) + 1),
    category: "gNodeB",
    location: "Dublin",
    spendOn: new Date(2020, 4, Math.floor((Math.random() * 30) + 1), 10, 10, 10),
    createdOn: new Date(2020, 4, Math.floor((Math.random() * 30) + 1), 10, 10, 10)
  },
  {
    id: 3,
    item: "Mobility Management Entity",
    amount: Math.floor((Math.random() * 10) + 1),
    category: "MME",
    location: "Limerick",
    spendOn: new Date(2020, 4, Math.floor((Math.random() * 30) + 1), 10, 10, 10),
    createdOn: new Date(2020, 4, Math.floor((Math.random() * 30) + 1), 10, 10, 10)
  }
];
function randomId() {
  return Math.floor(Math.random() * 10000) + 1;
}
// Endpoints

// Get all expense entries
app.get('/api/expenses', (req, res) => {
  res.json(mockExpenseEntries);
});

// Get a single expense entry by ID
app.get('/api/expenses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const entry = mockExpenseEntries.find(entry => entry.id === id);
  if (entry) {
    res.json(entry);
  } else {
    console.log('Expense entry not found');
    res.status(404).send('Expense entry not found');
  }
});

app.post('/api/expenses', (req, res) => {

  // Validate the incoming request
  const { item, amount, category, location, spendOn, createdOn } = req.body;

  if (!item || !amount || !category || !location || !spendOn || !createdOn) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Create the new entry
  const newEntry = {
    id: randomId(), // Generate a unique ID
    item,
    amount,
    category,
    location,
    spendOn,
    createdOn,
  };

  // Add to the mock storage
  try {
    mockExpenseEntries.push(newEntry);
    console.log("New expense entry added:", newEntry); // Log the new entry
    res.status(201).json(newEntry); // Respond with the new entry
  } catch (error) {
    console.error("Error adding expense entry:", error);
    res.status(500).json({ error: "An error occurred while saving the entry." });
  }
});

// Update an expense entry by ID
app.put('/api/expenses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = mockExpenseEntries.findIndex(entry => entry.id === id);
  if (index !== -1) {
    mockExpenseEntries[index] = { ...mockExpenseEntries[index], ...req.body };
    res.json(mockExpenseEntries[index]);
  } else {
    res.status(404).send('Expense entry not found');
  }
});

// Delete an expense entry by ID
app.delete('/api/expenses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = mockExpenseEntries.findIndex(entry => entry.id === id);
  if (index !== -1) {
    const deletedEntry = mockExpenseEntries.splice(index, 1);
    res.json(deletedEntry);
    console.log("Id deleted: " + id);
  } else {
    console.log("Id not found: " + id);
    res.status(404).send('Expense entry not found');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
