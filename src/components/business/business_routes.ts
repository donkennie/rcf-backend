import { Express } from 'express';
import { authorize } from '../../utils/auth_util';

import { BusinessController } from './business_controller';

export class BusinessRoutes {

    private baseEndPoint = '/api/business';

    constructor(app: Express) {

        const controller = new BusinessController();

        app.route(this.baseEndPoint)
            .all(authorize)
            .get(controller.getAllHandler)

            .post(controller.addHandler);

        app.route(this.baseEndPoint + '/:id')
            .all(authorize)
            .get(controller.getOneHandler)

            .put(controller.updateHandler)

            .delete(controller.deleteHandler);

    }

}