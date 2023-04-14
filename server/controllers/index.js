"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayContactPage = exports.DisplayProductsPage = exports.DisplayServicesPage = exports.DisplayAboutUsPage = exports.DisplayHomePage = void 0;
const util_1 = require("../util");
function DisplayHomePage(req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: (0, util_1.UserDisplayName)(req) });
}
exports.DisplayHomePage = DisplayHomePage;
function DisplayAboutUsPage(req, res, next) {
    res.render('index', { title: 'About Us', page: 'about', displayName: (0, util_1.UserDisplayName)(req) });
}
exports.DisplayAboutUsPage = DisplayAboutUsPage;
function DisplayServicesPage(req, res, next) {
    res.render('index', { title: 'Services', page: 'services', displayName: (0, util_1.UserDisplayName)(req) });
}
exports.DisplayServicesPage = DisplayServicesPage;
function DisplayProductsPage(req, res, next) {
    res.render('index', { title: 'Our Products', page: 'products', displayName: (0, util_1.UserDisplayName)(req) });
}
exports.DisplayProductsPage = DisplayProductsPage;
function DisplayContactPage(req, res, next) {
    res.render('index', { title: 'Contact Us', page: 'contact', displayName: (0, util_1.UserDisplayName)(req) });
}
exports.DisplayContactPage = DisplayContactPage;
//# sourceMappingURL=index.js.map