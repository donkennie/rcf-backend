import { Express } from 'express';

import { CampaignController } from './campaign_controller';

export class TaskRoutes {

    private baseEndPoint = '/api/campaign';

    constructor(app: Express) {

        const controller = new CampaignController();

        app.route(this.baseEndPoint)

            .get(controller.getAllHandler)

            .post(controller.addHandler);

        app.route(this.baseEndPoint + '/:id')

            .get(controller.getDetailsHandler)

            .put(controller.updateHandler)

            .delete(controller.deleteHandler);

    }

}