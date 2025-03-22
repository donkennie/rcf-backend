import { Repository } from 'typeorm';
import { BaseService } from '../../utils/base_service';
import { DatabaseUtil } from '../../utils/db';
import { Business } from './business_entity';

export class BusinessService extends BaseService<Business> {
    constructor() {
        let businessRepository: Repository<Business> | null = null;
        businessRepository = new DatabaseUtil().getRepository(Business);
        super(businessRepository);
    }
}