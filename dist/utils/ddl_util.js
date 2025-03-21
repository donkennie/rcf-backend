"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DDLUtil = void 0;
const uuid_1 = require("uuid");
const users_service_1 = require("../components/users/users_service");
const users_entity_1 = require("../components/users/users_entity");
const config = __importStar(require("../../server_config.json"));
const common_1 = require("./common");
class DDLUtil {
    static async addDefaultUser() {
        try {
            const service = new users_service_1.UsersService();
            const user = {
                user_id: (0, uuid_1.v4)(),
                firstname: 'Super',
                lastname: 'Admin',
                username: 'superadmin',
                memberRole: users_entity_1.MemberRole.Admin,
                email: config.default_user.email,
                account_verify: true,
                otp: 45323,
                password: await (0, common_1.encryptString)(config.default_user.password),
                created_at: new Date(),
                updated_at: new Date()
            };
            const result = await service.create(user);
            console.log('Add Default User Result', result);
            if (result.statusCode === 201) {
                return true;
            }
            return false;
        }
        catch (error) {
            console.error(`Error while addDefaultRole() => ${error.message}`);
            return false;
        }
    }
}
exports.DDLUtil = DDLUtil;
