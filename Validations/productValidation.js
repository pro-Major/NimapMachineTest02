const { body } = require('express-validator')
const models = require('../models')
const Sequelize = models.Sequelize
const Op = Sequelize.Op
exports.productValidation = [
    body('PName')
        .exists().withMessage('product is required')
        .notEmpty().withMessage('Empty value is not valid')
        .isString().withMessage('value must be an string')
        .trim()
        .custom(async (value) => {
            return await models.Products.findOne({
                where: {
                    product: {
                        [Op.iLike]: value
                    }
                },
                isActive: true
            }).then(product => {
                if (product) {
                    return Promise.reject("Product name already exist !");
                }
            })
        })
]