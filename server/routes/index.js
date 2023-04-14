"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controllers_1 = require("../controllers");
router.get('/', controllers_1.DisplayHomePage);
router.get('/home', controllers_1.DisplayHomePage);
router.get('/about', controllers_1.DisplayAboutUsPage);
router.get('/products', controllers_1.DisplayProductsPage);
router.get('/services', controllers_1.DisplayServicesPage);
router.get('/contact', controllers_1.DisplayContactPage);
exports.default = router;
//# sourceMappingURL=index.js.map