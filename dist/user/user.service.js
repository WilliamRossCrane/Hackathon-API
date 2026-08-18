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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_logger_1 = require("./user.logger");
let UserService = class UserService {
    logger;
    constructor(logger) {
        this.logger = logger;
    }
    users = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    ];
    findAllUsers(name = '') {
        this.logger.log('Finding all users');
        return this.users.filter((user) => user.name.toLowerCase().includes(name.toLowerCase()));
    }
    findOneUser(id) {
        const user = this.users.find((user) => user.id === id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    createUser(dto) {
        this.logger.log('Creating user');
        const newUser = {
            id: this.users.length + 1,
            ...dto,
        };
        this.users.push(newUser);
        return newUser;
    }
    updateUser(id, dto) {
        this.logger.log(`Updating user ${id}`);
        const index = this.users.findIndex((user) => user.id === id);
        if (index === -1) {
            return null;
        }
        this.users[index] = {
            ...this.users[index],
            ...dto,
        };
        return this.users[index];
    }
    deleteUser(id) {
        this.logger.log(`Deleting user ${id}`);
        const index = this.users.findIndex((user) => user.id === id);
        if (index === -1) {
            return null;
        }
        const [deleted] = this.users.splice(index, 1);
        return deleted;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_logger_1.LoggerService])
], UserService);
//# sourceMappingURL=user.service.js.map