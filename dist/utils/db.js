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
exports.DatabaseUtil = void 0;
const typeorm_1 = require("typeorm");
const config = __importStar(require("../../server_config.json"));
class DatabaseUtil {
    server_config = config;
    static connection = null;
    repositories = {};
    static instance;
    constructor() {
        this.connectDatabase();
    }
    static async getInstance() {
        if (!DatabaseUtil.instance) {
            DatabaseUtil.instance = new DatabaseUtil();
            await DatabaseUtil.instance.connectDatabase();
        }
        return DatabaseUtil.instance;
    }
    async connectDatabase() {
        try {
            if (DatabaseUtil.connection) {
                return DatabaseUtil.connection;
            }
            else {
                const db_config = this.server_config.db_config;
                const AppSource = new typeorm_1.DataSource({
                    type: 'postgres',
                    host: db_config.host,
                    port: db_config.port,
                    username: db_config.username,
                    password: db_config.password,
                    database: db_config.dbname,
                    synchronize: true,
                    logging: false,
                    poolSize: 5,
                    ssl: true,
                    extra: {
                        ssl: {
                            rejectUnauthorized: false
                        }
                    }
                });
                await AppSource.initialize();
                DatabaseUtil.connection = AppSource;
                console.log('Connected to the database');
                return DatabaseUtil.connection;
            }
        }
        catch (error) {
            console.error('Error connecting to the database:', error);
        }
    }
    getRepository(entity) {
        try {
            if (DatabaseUtil.connection) {
                const entityName = entity.name;
                if (!this.repositories[entityName]) {
                    this.repositories[entityName] = DatabaseUtil.connection.getRepository(entity);
                }
                return this.repositories[entityName];
            }
            return null;
        }
        catch (error) {
            console.error(`Error while getRepository => ${error.message}`);
        }
    }
}
exports.DatabaseUtil = DatabaseUtil;
