"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessRoutes = void 0;
const business_controller_1 = require("./business_controller");
class BusinessRoutes {
    baseEndPoint = '/api/business';
    constructor(app) {
        const controller = new business_controller_1.BusinessController();
        app.route(this.baseEndPoint)
            .get(controller.getAllHandler)
            .post(controller.addHandler);
        app.route(this.baseEndPoint + '/:id')
            .get(controller.getOneHandler)
            .put(controller.updateHandler)
            .delete(controller.deleteHandler);
    }
}
exports.BusinessRoutes = BusinessRoutes;
