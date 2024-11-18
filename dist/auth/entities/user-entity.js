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
exports.AppUser = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let AppUser = class AppUser {
};
exports.AppUser = AppUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AppUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 20, nullable: false, unique: true }),
    __metadata("design:type", String)
], AppUser.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, nullable: false }),
    __metadata("design:type", String)
], AppUser.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)('text', {
        array: true,
        nullable: false,
        default: ['user']
    }),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", Array)
], AppUser.prototype, "role", void 0);
exports.AppUser = AppUser = __decorate([
    (0, typeorm_1.Entity)()
], AppUser);
//# sourceMappingURL=user-entity.js.map