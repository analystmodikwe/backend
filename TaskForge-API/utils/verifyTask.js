// Simulates a slow external service (like calling a third-party API).
// setTimeout by itself has no way to "pause" async/await — it just fires
// a callback later. Wrapping it in a Promise gives something we CAN await:
// the promise doesn't resolve() until the timer fires.
const delay = (ms) =>{
    return new Promise((resolve) =>{
        setTimeout(resolve, ms);
    });
};

// the function for the actual verification, its async because it needs to await the artificial delay befor it can return the result
const verifyTask = async (task) => {

    // this will wait or load for 12 seconds like it is on a slow system
    await delay(12000);

    // the server wont crash without a title but will return an object with describing the failure
    if(!task.title) {
        return { valid:false, reason: "TASK IS MISSING A REQUIRED FIELD: (TITLE)"};
    }

    return { valid: true };
};

module.exports = verifyTask;
