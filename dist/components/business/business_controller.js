"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskUtil = exports.BusinessController = void 0;
const base_controller_1 = require("../../utils/base_controller");
const business_service_1 = require("./business_service");
const users_controller_1 = require("../users/users_controller");
class BusinessController extends base_controller_1.BaseController {
    async addHandler(req, res) {
        try {
            const service = new business_service_1.BusinessService();
            const business = req.body;
            const isValidUser = await users_controller_1.UsersUtil.checkValidUserIds([business.user_id]);
            if (!isValidUser) {
                res.status(400).json({ statusCode: 400, status: 'error', message: 'Invalid user_id' });
                return;
            }
            const createdBusiness = await service.create(business);
            res.status(201).json(createdBusiness);
        }
        catch (error) {
            console.error(`Error while addUser => ${error.message}`);
            res.status(500).json({ statusCode: 500, status: 'error', message: 'Internal server error' });
        }
    }
    async getAllHandler(req, res) {
        const service = new business_service_1.BusinessService();
        const result = await service.findAll(req.query);
        const tasks = result.data;
        res.status(result.statusCode).json(result);
    }
    async getOneHandler(req, res) {
        const user = await users_controller_1.UsersUtil.getUserById(req.params.user_id);
        const service = new business_service_1.BusinessService();
        const result = await service.customQuery(`user_id = '${user.user_id}'`);
        res.status(200).json(result);
    }
    async updateHandler(req, res) {
        const task = req.body;
        const service = new business_service_1.BusinessService();
        const result = await service.update(req.params.id, task);
        res.status(result.statusCode).json(result);
    }
    async deleteHandler(req, res) {
        const service = new business_service_1.BusinessService();
        const result = await service.delete(req.params.id);
        res.status(result.statusCode).json(result);
    }
}
exports.BusinessController = BusinessController;
class TaskUtil {
    static async notifyUsers(project, task, action) {
        if (project) {
            const userIds = project.user_ids;
            let subject = '';
            let body = '';
            if (action === 'add') {
                subject = 'New Task Created';
                body = `A new task has been created with the title ${task.title} and description ${task.description}`;
            }
            else if (action === 'update') {
                subject = 'Task Updated';
                body = `A task has been updated with the title ${task.title} and description ${task.description}`;
            }
            else if (action === 'delete') {
                subject = 'Task Deleted';
                body = `A task has been deleted with the title ${task.title} and description ${task.description}`;
            }
        }
    }
    static async notifyUsers_(project, task, newTask = true) {
        if (project) {
            const userIds = project.user_ids;
            for (const userId of userIds) {
                const user = await users_controller_1.UsersUtil.getUserById(userId);
                if (user) {
                }
            }
        }
    }
}
exports.TaskUtil = TaskUtil;
