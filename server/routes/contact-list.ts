import express from 'express';
const router = express.Router();

import {AuthGuard} from "../util";
import {
    DisplayAddPage,
    DisplayContactListPage,
    DisplayEditPage,
    ProcessAddPage, ProcessDeletePage,
    ProcessEditPage
} from "../controllers/contact-list";

/* ****************************** CONTACT-LIST ROUTES *************************************** */
router.get('/contact-list', AuthGuard, DisplayContactListPage);

/* Display the Add Page */
router.get('/add', AuthGuard, DisplayAddPage);


/* Process the Add Request */
router.post('/add', AuthGuard, ProcessAddPage);

/* Process the delete request contact */
router.get('/delete/:id', AuthGuard, ProcessDeletePage);


/* Display edit Page with data */
router.get('/edit/:id', AuthGuard, DisplayEditPage);


/* Process the edit Request */
router.post('/edit/:id', AuthGuard, ProcessEditPage);


export default router;
