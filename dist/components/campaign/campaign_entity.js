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
exports.Campaign = exports.TicketType = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../users/users_entity");
var TicketType;
(function (TicketType) {
    TicketType["Free"] = "Free";
    TicketType["Paid"] = "Paid";
})(TicketType || (exports.TicketType = TicketType = {}));
(0, typeorm_1.Entity)();
class Campaign {
    campaign_id;
    name;
    venue;
    description;
    whatsAppLink;
    duration;
    user_id;
    banner;
    ticketType;
    gallery_files;
    created_at;
    updated_at;
}
exports.Campaign = Campaign;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Campaign.prototype, "campaign_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, nullable: false, unique: false }),
    __metadata("design:type", String)
], Campaign.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, nullable: false, unique: false }),
    __metadata("design:type", String)
], Campaign.prototype, "venue", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: false, unique: false }),
    __metadata("design:type", String)
], Campaign.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: false, unique: false }),
    __metadata("design:type", String)
], Campaign.prototype, "whatsAppLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: false }),
    __metadata("design:type", String)
], Campaign.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Users, (userData) => userData.user_id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", String)
], Campaign.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: false, }),
    __metadata("design:type", String)
], Campaign.prototype, "banner", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TicketType,
        default: TicketType.Free,
    }),
    __metadata("design:type", String)
], Campaign.prototype, "ticketType", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: [] }),
    __metadata("design:type", Array)
], Campaign.prototype, "gallery_files", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Campaign.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Campaign.prototype, "updated_at", void 0);
