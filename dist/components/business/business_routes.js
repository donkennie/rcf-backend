"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessRoutes = void 0;
const auth_util_1 = require("../../utils/auth_util");
const business_controller_1 = require("./business_controller");
class BusinessRoutes {
    baseEndPoint = '/api/business';
    constructor(app) {
        const controller = new business_controller_1.BusinessController();
        app.route(this.baseEndPoint)
            .all(auth_util_1.authorize)
            .get(controller.getAllHandler)
            .post(controller.addHandler);
        app.route(this.baseEndPoint + '/:id')
            .all(auth_util_1.authorize)
            .get(controller.getOneHandler)
            .put(controller.updateHandler)
            .delete(controller.deleteHandler);
    }
}
exports.BusinessRoutes = BusinessRoutes;
