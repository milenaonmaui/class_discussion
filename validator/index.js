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

exports.userSignupValidator = (req, res, next) => {
    req.check('name', 'Name cannot be empty').notEmpty();
    req.check('name', 'Name must be between 2 and 20 characters').isLength({
        min: 2,
        max: 20
    });
    req.check('email', 'Email cannot be empty').notEmpty();
    req.check('email', 'Email must be between 3 and 40 characters')
    .matches(/.+\@.+\../)
    .withMessage("Email must contain @")
    .isLength({
        min:3,
        max: 40
    })
    req.check('password', 'Password cannot be empty').notEmpty();
    req.check('password').isLength({
        min: 6,
        max: 20
    })
    .withMessage("Password must be minimum 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain at least one number");

    const errors = req.validationErrors()

    if (errors) {
        const firstError = errors.map((error)=> error.msg)[0];
        return res.status(400).json({error: firstError})
    }

    // proceed to next middleware
    next();
}

