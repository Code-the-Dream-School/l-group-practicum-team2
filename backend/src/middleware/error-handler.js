const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  
    console.error(err)
    let customError = {
        // set default
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try again later',
    }

    // PostgreSQL: unique violation 23505
    if (err.code === '23505') {
        customError.msg = `Duplicate value entered, please choose another value`
        customError.statusCode = StatusCodes.CONFLICT
    }

    // PostgreSQL: Foreign key violation 23503
    if (err.code === '23503') {
        customError.msg = `Related record not found or violates constraint`
        customError.statusCode = StatusCodes.BAD_REQUEST
    }
    // PostgreSQL: Invalid input syntax (bad ID/type) 22P02
    if (err.code === '22P02') {
        customError.msg = `Invalid input syntax provided`
        customError.statusCode = StatusCodes.BAD_REQUEST
    }

    // PostgreSQL: not_null_violation 23502
    if (err.code === '23502') {
        customError.msg = `Missing required field: ${err.column || 'unknown'}`
        customError.statusCode = StatusCodes.BAD_REQUEST
    }



    return res.status(customError.statusCode).json({ 
        success: false,
        message: customError.msg 
    })
}

module.exports = errorHandlerMiddleware