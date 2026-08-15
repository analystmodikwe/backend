const { nanoid } = require("nanoid");

// seeded data so that i have something to test and verify on
const tasks = [

    // task 1
    {
        id: nanoid(),
        title: "Add animations to the app",
        completed: false,
        createdAt: new Date().toISOString,
    },

    // task2 with missing tite on purpose to see if the error handling actually works or not
    {
        id: nanoid(),
        
        completed: false,
        createdAt: new Date().toISOString,
    },

];

module.exports = tasks;