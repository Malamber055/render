import express from 'express';
const router = express.Router();
import Contact from "../models/contact";

import {
  DisplayAboutUsPage,
  DisplayContactPage,
  DisplayHomePage,
  DisplayProductsPage,
  DisplayServicesPage
} from "../controllers";

/* ****************************** TOP LEVEL ROUTES *************************************** */
router.get('/', DisplayHomePage);

router.get('/home', DisplayHomePage);

router.get('/about', DisplayAboutUsPage);

router.get('/products', DisplayProductsPage);

router.get('/services', DisplayServicesPage);

router.get('/contact', DisplayContactPage);

// Contact.find().then(function (contacts){
//   console.log(contacts);
// }).catch(function (err)){
//   console.error("Encountered an Error reading from the database: " + err);
//   res.end();
// }

export default router;
