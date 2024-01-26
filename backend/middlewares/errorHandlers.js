const Sequelize = require('sequelize');
class ErrorHandler extends Error {
  constructor(error, statusCode, details = null) {
    super(typeof error === 'object' ? error.error : error);
    this.details = typeof error === 'object' ? error.details || null : details;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    const response = { error: err.message };
    if (err.details !== null) {
      response.details = err.details;
    }
    return res.status(err.statusCode).json(response);
  }

  res.status(500).json({ error: 'Internal server error' });
};

const sequelizeErrorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    if (err instanceof ErrorHandler) {
      const response = { error: err.message };
      if (err.details !== null) {
        response.details = err.details;
      }
      return res.status(err.statusCode).json(response);
    }
    console.log(err);

    res.status(500).json({
        success: false,
        error: err,
        errMessage: err.message,
        stack: err.stack
    })
}
  if (process.env.NODE_ENV === 'PRODUCTION') {
    let error = { ...err }
  
    error.message = err.message;
  
    if (err instanceof ErrorHandler) {
      const response = { error: err.message };
      if (err.details !== null) {
        response.details = err.details;
      }
      return res.status(err.statusCode).json(response);
    }
    if (err instanceof Sequelize.ValidationError) {
      // Handle validation error
      const errorMessages = err.errors.map((e) => e.message);
      return res.status(400).json({ error: 'Validation error', details: errorMessages });
    }
     if (err instanceof Sequelize.UniqueConstraintError) {
      return res.status(400).json({ message: "Thing name must be unique for each user." });
    }  if (err instanceof Sequelize.ForeignKeyConstraintError) {
      return res.status(400).json({ message: "Invalid user_id provided." });
    }  if (err instanceof Sequelize.DatabaseError) {
      return res.status(500).json({ message: "Database Error" });
    }
  
    // Handling wrong JWT error
    if (err.name === 'JsonWebTokenError') {
        const message = 'JSON Web Token is invalid. Try Again!!!'
        error = new ErrorHandler(message, 400)
    }
  
    // Handling Expired JWT error
    if (err.name === 'TokenExpiredError') {
        const message = 'JSON Web Token is expired. Try Again!!!'
        error = new ErrorHandler(message, 400)
    }
  
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Internal Server Error'
    })
  }
  // if (err instanceof ErrorHandler) {
  //   const response = { error: err.message };
  //   if (err.details !== null) {
  //     response.details = err.details;
  //   }
  //   return res.status(err.statusCode).json(response);
  // }
  // if (err instanceof Sequelize.ValidationError) {
  //   // Handle validation error
  //   const errorMessages = err.errors.map((e) => e.message);
  //   return res.status(400).json({ error: 'Validation error', details: errorMessages });
  // }
  // else if (err instanceof Sequelize.UniqueConstraintError) {
  //   return res.status(400).json({ message: "Thing name must be unique for each user." });
  // } else if (err instanceof Sequelize.ForeignKeyConstraintError) {
  //   return res.status(400).json({ message: "Invalid user_id provided." });
  // } else if (err instanceof Sequelize.DatabaseError) {
  //   return res.status(500).json({ message: "Database Error" });
  // }
  
  // console.error('Unexpected Sequelize Error:', err);
  // return res.status(500).json({ message: "Unexpected Sequelize Error:" });
};



module.exports = { ErrorHandler, errorHandler, sequelizeErrorHandler };
