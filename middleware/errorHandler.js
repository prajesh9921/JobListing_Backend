const errorHandler = (error, req, res, next) => {
    console.log("ERROR: " + error);
    res.status(401).json({errorMessage: "Error occurred" + error});
}

module.exports = errorHandler;