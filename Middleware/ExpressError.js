class ExpressError extends Error{
    constructor(status, message){
        super();
        this.status = status;
        this.message = message;
    }
}

module.exports = ExpressError;

// 404 - Not Found
// 501 - Not Implemented
// 503 - Service Unavailable