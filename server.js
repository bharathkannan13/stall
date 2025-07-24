const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// In-memory stall data (replace with DB for production)
let stalls = [
  { id: 1, booked: false, bookedBy: null },
  { id: 2, booked: false, bookedBy: null },
  { id: 3, booked: false, bookedBy: null },
  { id: 4, booked: false, bookedBy: null },
  { id: 5, booked: false, bookedBy: null },
  { id: 6, booked: false, bookedBy: null },
  { id: 7, booked: false, bookedBy: null },
  { id: 8, booked: false, bookedBy: null }
];

// Get all stalls and their status
app.get('/stalls', (req, res) => {
  res.json(stalls);
});

// Book a stall
app.post('/book', (req, res) => {
  const { stallId, company } = req.body;
  const stall = stalls.find(s => s.id === stallId);
  if (!stall) {
    return res.status(404).json({ error: 'Stall not found' });
  }
  if (stall.booked) {
    return res.status(400).json({ error: 'Stall already booked' });
  }
  stall.booked = true;
  stall.bookedBy = company;
  res.json({ success: true, stall });
});

// Reset all bookings (for testing/demo)
app.post('/reset', (req, res) => {
  stalls.forEach(s => {
    s.booked = false;
    s.bookedBy = null;
  });
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
