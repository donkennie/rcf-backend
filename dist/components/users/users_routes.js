"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const users_controller_1 = require("./users_controller");
const express_validator_1 = require("express-validator");
const validator_1 = require("../../utils/validator");
const upload_image_1 = require("../../utils/upload-image");
const auth_util_1 = require("../../utils/auth_util");
const validUserInput = [
    (0, express_validator_1.body)('firstname').trim().notEmpty().withMessage('It should be required'),
    (0, express_validator_1.body)('lastname').trim().notEmpty().withMessage('It should be required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('It should be valid emailId'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 6, max: 12 }).withMessage('It must be between 6 and 12 characters in length')
];
const validChangePassword = [
    (0, express_validator_1.body)('oldPassword').trim().notEmpty().withMessage('It should be required'),
    (0, express_validator_1.body)('newPassword')
        .isLength({ min: 6, max: 12 }).withMessage('It must be between 6 and 12 characters in length')
];
const validResetPassword = [
    (0, express_validator_1.body)('token').trim().notEmpty().withMessage('It should be required'),
    (0, express_validator_1.body)('newPassword')
        .isLength({ min: 6, max: 12 }).withMessage('It must be between 6 and 12 characters in length')
];
const validOTP = [
    (0, express_validator_1.body)('otp').notEmpty().withMessage('It should be required'),
    (0, express_validator_1.body)('user_id').trim().notEmpty().withMessage('It should be required'),
];
class UserRoutes {
    baseEndPoint = '/api/users';
    constructor(app) {
        const controller = new users_controller_1.UserController();
        app.route(this.baseEndPoint)
            .all(auth_util_1.authorize)
            .get(controller.getAllHandler);
        app.route('/api/register')
            .post((0, validator_1.validate)(validUserInput), controller.addHandler);
        app.route(this.baseEndPoint + '/verify')
            .post((0, validator_1.validate)(validOTP), controller.verifyOtp);
        app.route(this.baseEndPoint + '/:id')
            .all(auth_util_1.authorize)
            .get(controller.getOneHandler)
            .put(controller.updateHandler)
            .delete(controller.deleteHandler);
        app.route('/api/login')
            .post(controller.login);
        app.route('/api/refresh_token')
            .post(controller.getAccessTokenFromRefreshToken);
        app.route(this.baseEndPoint + '/changePassword/:id')
            .all(auth_util_1.authorize)
            .post((0, validator_1.validate)(validChangePassword), controller.changePassword);
        app.route('/api/forgot_password')
            .post(controller.forgotPassword);
        app.route(this.baseEndPoint + '/upload-profile-pic')
            .put(upload_image_1.upload.single("file"), controller.UploadPicture);
        app.route('/api/reset_password')
            .post((0, validator_1.validate)(validResetPassword), controller.resetPassword);
    }
}
exports.UserRoutes = UserRoutes;
