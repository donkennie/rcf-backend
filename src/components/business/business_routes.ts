import { Express } from 'express';

import { BusinessController } from './business_controller';

export class TaskRoutes {

    private baseEndPoint = '/api/business';

    constructor(app: Express) {

        const controller = new BusinessController();

        app.route(this.baseEndPoint)

            .get(controller.getAllHandler)

            .post(controller.addHandler);

        app.route(this.baseEndPoint + '/:id')

            .get(controller.getDetailsHandler)

            .put(controller.updateHandler)

            .delete(controller.deleteHandler);

    }

}