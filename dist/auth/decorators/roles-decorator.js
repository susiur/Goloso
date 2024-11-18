"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const common_1 = require("@nestjs/common");
exports.getUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    if (!user)
        throw new common_1.InternalServerErrorException('User not found');
    return user;
});
//# sourceMappingURL=roles-decorator.js.map