"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessService = void 0;
const base_service_1 = require("../../utils/base_service");
const db_1 = require("../../utils/db");
const business_entity_1 = require("./business_entity");
class BusinessService extends base_service_1.BaseService {
    constructor() {
        let businessRepository = null;
        businessRepository = new db_1.DatabaseUtil().getRepository(business_entity_1.Business);
        super(businessRepository);
    }
}
exports.BusinessService = BusinessService;
