import express from 'express';
import * as controller from './common.controller.js';

const router = express.Router();

router.get('/recent-visits', controller.getRecentVisits);
router.get('/favorite-channels', controller.getFavoriteChannels);

export default router;