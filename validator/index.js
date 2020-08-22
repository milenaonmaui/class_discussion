exports.createPostValidator = (req, res, next) => {
    req.check('title', 'Title cannot be empty').notEmpty();
    req.check('title', 'Title must be between 4 and 150 characters').isLength({
        min:4,
        max: 150
    });
    req.check('body', 'Body cannot be empty').notEmpty();
    req.check('body', 'Body must be between 1 and 2000 characters').isLength({
        min: 1,
        max: 2000
    });
    const errors = req.validationErrors()

    if (errors) {
        const firstError = errors.map((error)=> error.msg)[0];
        return res.status(400).json({error: firstError})
    }

    // proceed to next middleware
    next();
}