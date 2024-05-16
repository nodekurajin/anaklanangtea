const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment'); // for date manipulation

const app = express();
const port = process.env.PORT || 3000;

// In-memory data storage (replace with a database for persistence)
const babyWeights = [];

function addWeightEntry(date, weight) {
  if (!(date instanceof Date) || typeof weight !== 'number' || weight <= 0) {
    throw new Error('Invalid weight entry data');
  }

  babyWeights.push({ date, weight });
}

function getWeeklyWeightData(startDate) {
  if (!(startDate instanceof Date)) {
    throw new Error('Invalid start date');
  }

  const weeklyData = [];
  const endDate = moment(startDate).endOf('week').toDate();

  for (let weightEntry of babyWeights) {
    if (moment(weightEntry.date).isBetween(startDate, endDate, 'day', '[]')) {
      weeklyData.push(weightEntry);
    }
  }

  return weeklyData;
}

app.use(bodyParser.json());

// Route to add a weight entry
app.post('/weight', (req, res) => {
  const { date, weight } = req.body;
  try {
    addWeightEntry(new Date(date), weight);
    res.json({ message: 'Weight entry added successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get weight data for a specific week
app.get('/weight/:startDate', (req, res) => {
  const startDate = new Date(req.params.startDate);
  try {
    const weeklyData = getWeeklyWeightData(startDate);
    res.json(weeklyData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
