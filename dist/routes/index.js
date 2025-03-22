"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const users_routes_1 = require("../components/users/users_routes");
const business_routes_1 = require("../components/business/business_routes");
class Routes {
    router;
    constructor(app) {
        const routeClasses = [
            users_routes_1.UserRoutes,
            business_routes_1.BusinessRoutes,
        ];
        for (const routeClass of routeClasses) {
            try {
                new routeClass(app);
                console.log(`Router : ${routeClass.name} - Connected`);
            }
            catch (error) {
                console.log(`Router : ${routeClass.name} - Failed`);
            }
        }
    }
}
exports.Routes = Routes;
