"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRoutes = void 0;
const campaign_controller_1 = require("./campaign_controller");
class TaskRoutes {
    baseEndPoint = '/api/campaign';
    constructor(app) {
        const controller = new campaign_controller_1.CampaignController();
        app.route(this.baseEndPoint)
            .get(controller.getAllHandler)
            .post(controller.addHandler);
        app.route(this.baseEndPoint + '/:id')
            .get(controller.getDetailsHandler)
            .put(controller.updateHandler)
            .delete(controller.deleteHandler);
    }
}
exports.TaskRoutes = TaskRoutes;
