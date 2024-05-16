# Track Baby's Body Weight on a Weekly Basis

- The code uses express for the web framework, body-parser to handle JSON data, and moment for date manipulation.
- It defines in-memory storage for baby weight data (babyWeights) (replace with a database for persistence).
- The addWeightEntry function adds a new weight entry with date and weight to the data storage.
- The getWeeklyWeightData function retrieves weight data for a specific week based on a provided start date.

- The application defines two routes:
    - /weight (POST): Accepts a JSON object with date and weight to add a new entry.
    - /weight/:startDate (GET): Retrieves weight data for the week starting from the provided startDate.
