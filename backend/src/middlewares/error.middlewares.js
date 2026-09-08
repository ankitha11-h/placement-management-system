const errorMiddleware = (err, req, res, next) => {
    console.error(err);

    if (err.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid ID"
        });
    }
    //for duplication key error we use err.code === 11000 
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0]; //finds which field caused the duplication
        return res.status(400).json({
            success: false,
            message: `${field} already exists`
        });
    }

    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};

export default errorMiddleware;