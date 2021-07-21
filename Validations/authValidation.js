const { body } = require('express-validator')
const models = require('../models')
const Sequelize = models.Sequelize
const Op = Sequelize.Op

exports.authValidation = [
    body('name')
        .exists().withMessage('userName is required')
        .notEmpty().withMessage('Empty value is not valid')
        .trim()
        .isLength({ min: 3, max: 20 }).withMessage('userName must be at least 3 characters and at most 20 characters')
        .custom(async (val) => {
            return await models.User.findOne({
                where: {
                    name: {
                        [Op.iLike]: val
                    },
                },
            }).then(result => {
                if (result) {
                    return Promise.reject('UserName already exists')
                }
            })
        }),

    body('email')
        .exists().withMessage('Email is required')
        .notEmpty().withMessage('Empty value is not valid')
        .isEmail().withMessage('Please provide proper e-mail Id')
        .custom(async (val) => {
            return await models.User.findOne({
                where: {
                    email: {
                        [Op.iLike]: val
                    },
                },

            }).then(result => {
                if (result) {
                    return Promise.reject('Email already exists')
                }
            })
        }),

    body('password')
        .exists().withMessage('password is required')
        .notEmpty().withMessage('Empty value is not valid')
        .trim()
        .isLength([{ min: 2, max: 10 }]).withMessage('Password characters must be of 5 to 10 characters long'),

    body('number')
        .exists().withMessage('mobileNumber is required')
        .notEmpty().withMessage('Empty value is not valid')
        .custom(async value => {
            return await models.User.findOne({
                where: {
                    number: value,
                },
            }).then(result => {
                if (result) {
                    return Promise.reject('UserName already exists')
                }
            })
        })
        .custom(async value => {
            if (!/^[0-9]{10}$/i.test(value)) {
                return Promise.reject("Invalid mobile number");
            }
        }),

    


   

    
]
