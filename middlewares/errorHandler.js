
const errorHandler = (err, req, res, next) => {
    const statusCode = (res.statusCode ? res.statusCode : 500);
    if(statusCode === 401){
        res.status(statusCode).json({ErrorMessage : err.message});
    }
    else if(statusCode === 404){
        res.status(statusCode).json({ErrorMessage : err.message});
    }
    else res.status(statusCode).json({ErrorMessage : err.message});
};

module.exports = errorHandler;