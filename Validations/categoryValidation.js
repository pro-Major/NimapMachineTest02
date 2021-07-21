const { body } = require('express-validator')
const models = require('../models')
const Sequelize = models.Sequelize
const Op = Sequelize.Op
exports.categoryvalidation = [
    body('CName')
        .exists().withMessage('category is required')
        .notEmpty().withMessage('Empty value is not valid')
        .isString().withMessage('value must be an string')
        .trim()
        .custom(async (value) => {
            return await models.Category.findOne({
                where: {
                    CName: {
                        [Op.iLike]: value
                    }
                },
                isActive: true
            }).then(category => {
                if (category) {
                    return Promise.reject("Category name already exist !");
                }
            })
        })
]