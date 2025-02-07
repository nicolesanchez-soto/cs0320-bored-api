const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3232;

// Enable CORS for public access
app.use(cors());

// Sample activity data
const activities = [
    { activity: "Refactor your code for the 7th time", type: "education", participants: 1 },
    { activity: "Pair-program with an HTA who already finished the assignment", type: "social", participants: 2 },
    { activity: "Attend Tim Nelson’s office hours and leave with more questions", type: "education", participants: 1 },
    { activity: "Convince your project partner to finally push their code", type: "social", participants: 2 },
    { activity: "Debug a null pointer exception for 3 hours", type: "recreational", participants: 1 },
    { activity: "Go to collab hours and pretend you understand everything", type: "education", participants: 4 },
    { activity: "Write test cases for code that barely works", type: "education", participants: 3 },
    { activity: "Convince your group that a full rewrite is 'probably' unnecessary", type: "social", participants: 5 },
    { activity: "Merge a CR that breaks everything, then disappear", type: "recreational", participants: 1 },
    { activity: "Watch an HTA solve your problem in 2 minutes", type: "education", participants: 1 },
    { activity: "Work on the sprint at 3 AM because 'future you' didn't exist", type: "education", participants: 1 },
    { activity: "Deploy a buggy backend and pretend it’s 'feature complete'", type: "recreational", participants: 3 },
    { activity: "Go on a hike but talk about CS0320 the whole time", type: "recreational", participants: 4 },
    { activity: "Host an emergency project meeting where no one joins", type: "social", participants: 6 },
    { activity: "Accidentally run `rm -rf /` and question everything", type: "recreational", participants: 1 },
    { activity: "Have an existential crisis over time complexity", type: "education", participants: 2 },
    { activity: "Hold a team meeting that turns into a debugging session", type: "social", participants: 7 },
    { activity: "Convince yourself that a bug 'probably won't happen during your demo'", type: "recreational", participants: 1 },
    { activity: "Find a bug, fix it, introduce 3 more", type: "education", participants: 2 },
    { activity: "Spend more time fixing Git conflicts than coding", type: "education", participants: 8 }
];

// Welcome message for root route
app.get("/", (req, res) => {
    res.send(`
        <h1>Welcome to the CS0320 Random (Bored) API!</h1>
        <p>For when you are bored and in need of a simple API.</p>
        <p>CS0320 is Brown's Introduction to Software Engineering course, taught by Tim Nelson!</p>
        <p>This API provides silly CS0320-themed activities, with participants ranging from 1 to 8.</p>
        <h2>Endpoints:</h2>
        <ul>
            <li><strong>/api/activity</strong> - Get a random CS0320-themed activity.</li>
            <li><strong>/api/activity?participants=X</strong> - Get a random activity that matches a specific number of participants.</li>
            <li><strong>/api/activities</strong> - Get a list of all available activities.</li>
            <li><strong>/api/activities/filter?participants=X</strong> - Get all activities that match a specific number of participants.</li>
        </ul>
        <p>Example usage:</p>
        <pre>
        GET /api/activity → Returns a random activity.
        GET /api/activity?participants={num} → Returns a random activity for {num} participants.
        GET /api/activities → Returns all activities.
        GET /api/activities/filter?participants={num} → Returns all activities that have {num} participants.
        </pre>
    `);
});

// Helper function to get a random activity
const getRandomActivity = (filter = {}) => {
    let filteredActivities = activities;

    if (filter.participants) {
        filteredActivities = filteredActivities.filter(a => a.participants == filter.participants);
    }

    if (filteredActivities.length === 0) return null;

    return filteredActivities[Math.floor(Math.random() * filteredActivities.length)];
};

// Route to get a random activity, optionally filtered by participants
app.get("/api/activity", (req, res) => {
    const participants = req.query.participants ? parseInt(req.query.participants) : null;

    const filter = {};
    if (participants) filter.participants = participants;

    const activity = getRandomActivity(filter);

    if (!activity) {
        return res.status(404).json({ error: "No activities found for given parameters" });
    }

    res.json({
        activity: activity.activity,
        type: activity.type,
        participants: activity.participants
    });
});

// Route to get all activities
app.get("/api/activities", (req, res) => {
    res.json(activities);
});

// Get all activities that match a specific number of participants
app.get("/api/activities/filter", (req, res) => {
    const participants = req.query.participants ? parseInt(req.query.participants) : null;

    if (!participants) {
        return res.status(400).json({ error: "Please provide a valid participants number" });
    }

    const filteredActivities = activities.filter(a => a.participants == participants);

    if (filteredActivities.length === 0) {
        return res.status(404).json({ error: "No activities found for given participant count" });
    }

    res.json(filteredActivities);
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server }; // Now properly exporting the server

