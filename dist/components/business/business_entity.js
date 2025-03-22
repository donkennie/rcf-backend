"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Business = exports.Type = exports.Category = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../users/users_entity");
var Category;
(function (Category) {
    Category["Media"] = "Media";
    Category["Technology"] = "Technology";
    Category["Entertainment"] = "Entertainment";
    Category["FoodsAndDrinks"] = "Foods-Drinks";
    Category["Influencing"] = "Influencering";
    Category["Drinks"] = "Drinks";
    Category["Sports"] = "Sports";
})(Category || (exports.Category = Category = {}));
var Type;
(function (Type) {
    Type["Branded"] = "Branded";
    Type["NonBranded"] = "Non-Branded";
})(Type || (exports.Type = Type = {}));
let Business = class Business {
    business_id;
    name;
    location;
    summary;
    BusinessContact;
    bio;
    skill;
    title;
    user_id;
    logo;
    category;
    type;
    number;
    email;
    whatsapplink;
    supported_files;
    created_at;
    updated_at;
};
exports.Business = Business;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Business.prototype, "business_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, nullable: false, unique: true }),
    __metadata("design:type", String)
], Business.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, nullable: false, unique: false }),
    __metadata("design:type", String)
], Business.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: false, unique: false }),
    __metadata("design:type", String)
], Business.prototype, "summary", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: false, unique: false }),
    __metadata("design:type", String)
], Business.prototype, "BusinessContact", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500 }),
    __metadata("design:type", String)
], Business.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Business.prototype, "skill", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500 }),
    __metadata("design:type", String)
], Business.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Users, (userData) => userData.user_id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", String)
], Business.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: false }),
    __metadata("design:type", String)
], Business.prototype, "logo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Category,
        default: Category.Entertainment,
    }),
    __metadata("design:type", String)
], Business.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Type,
        default: Type.Branded,
    }),
    __metadata("design:type", String)
], Business.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: false }),
    __metadata("design:type", String)
], Business.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Business.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: false }),
    __metadata("design:type", String)
], Business.prototype, "whatsapplink", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: [], nullable: false }),
    __metadata("design:type", Array)
], Business.prototype, "supported_files", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Business.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Business.prototype, "updated_at", void 0);
exports.Business = Business = __decorate([
    (0, typeorm_1.Entity)()
], Business);
