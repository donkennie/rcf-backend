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
exports.AppDataSource = exports.DatabaseUtil = void 0;
const typeorm_1 = require("typeorm");
const config = __importStar(require("../../server_config.json"));
const business_entity_1 = require("../components/business/business_entity");
const users_entity_1 = require("../components/users/users_entity");
const campaign_entity_1 = require("../components/campaign/campaign_entity");
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
                    entities: [users_entity_1.Users, business_entity_1.Business, campaign_entity_1.Campaign],
                    synchronize: true,
                    logging: false,
                    migrations: ["./src/migrations/*.ts"],
                    poolSize: 5,
                    ssl: true,
                    extra: {
                        ssl: {
                            rejectUnauthorized: false
                        },
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
const db_config = config.db_config;
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: db_config.host,
    port: db_config.port,
    username: db_config.username,
    password: db_config.password,
    database: db_config.dbname,
    entities: [users_entity_1.Users, business_entity_1.Business, campaign_entity_1.Campaign],
    synchronize: true,
    logging: true,
    migrations: ["./src/migrations/*.ts"],
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false
        },
        migrationsTableName: '_migrations',
        migrationsRun: true,
    }
});
