import { Express, Router } from 'express';
import { UserRoutes } from '../components/users/users_routes';
import { BusinessRoutes } from '../components/business/business_routes';
// import { CampaignRoutes } from '../components/campaign/campaign_routes';

export class Routes {
    public router: Router;

    constructor(app: Express) {
        const routeClasses = [
            UserRoutes,
            BusinessRoutes,
            // CampaignRoutes
        ];

        for (const routeClass of routeClasses) {
            try {
                new routeClass(app);
                console.log(`Router : ${routeClass.name} - Connected`);
            } catch (error) {
                console.log(`Router : ${routeClass.name} - Failed`);
            }
        }
    }
}