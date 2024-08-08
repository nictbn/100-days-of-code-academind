const express = require('express');

const blogController = require('../controllers/post-controller');
const guardRoute = require('../middlewares/auth-guard-middleware');

const router = express.Router();

router.get('/', blogController.getHomePage);

router.use(guardRoute);

router.get('/admin', blogController.getAdminPage);

router.post('/posts', blogController.createPost);

router.get('/posts/:id/edit', blogController.getSinglePost);

router.post('/posts/:id/edit', blogController.updatePost);

router.post('/posts/:id/delete', blogController.deletePost);

module.exports = router;
