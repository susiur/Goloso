"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const products_module_1 = require("./products/products.module");
const providers_module_1 = require("./providers/providers.module");
const clients_module_1 = require("./clients/clients.module");
const typeorm_1 = require("@nestjs/typeorm");
const provider_entity_1 = require("./providers/entities/provider-entity");
const product_entity_1 = require("./products/entities/product-entity");
const user_entity_1 = require("./auth/entities/user-entity");
const client_entity_1 = require("./clients/entities/client-entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, products_module_1.ProductsModule, providers_module_1.ProvidersModule, clients_module_1.ClientsModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'root',
                password: 'root',
                database: 'goloso',
                autoLoadEntities: true,
                synchronize: true,
                entities: [provider_entity_1.Provider, product_entity_1.Product, user_entity_1.AppUser, client_entity_1.Client],
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map