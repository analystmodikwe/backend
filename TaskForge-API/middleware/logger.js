// observe and record what is happening as requests pass through the server
const logger = (req, res, next) => {

    // Print the HTTP method, the path that was requested, and the exact time the request happened.
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
};

module.exports = logger;
