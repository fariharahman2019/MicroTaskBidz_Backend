const Router = require('koa-router');

const routes = new Router();
const health = require('./controllers/health');
const taskController = require('./controllers/tasks');
const userController = require('./controllers/users');
const { authenticate } = require('./middleware/auth');
const bidController = require('./controllers/bids');
const contractorController = require('./controllers/contractors');

routes.get('/health', health.check);
routes.get('/user', authenticate, userController.getDetails);
routes.post('/user', userController.signup);
routes.post('/user/password', userController.resetPassword);
routes.patch('/user/password/confirm', userController.confirmPassword);
routes.get('/tasks', authenticate, taskController.allTask);
routes.put('/user', authenticate, userController.update);
routes.post('/task', authenticate, taskController.createTask);
routes.post('/user/email/confirm', userController.confirmEmail);

routes.post('/user/signin', userController.signin);
routes.post('/bids', authenticate, bidController.createBid);
routes.patch('/user/password', authenticate, userController.changePassword);
routes.post('/contractor', contractorController.createContractor);
routes.get('/task/:taskId', authenticate, taskController.getTask);
routes.post('/contractor/signin', contractorController.signin);
module.exports = routes;
