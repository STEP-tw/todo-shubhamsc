const lib = require('./appLib.js');
const webApp = require('./webApp.js');
let app = webApp.create();

const LoggerHandler = require('../handler/logger_handler.js');
const FileHandler = require('../handler/file_handler.js')
app.use(new LoggerHandler().getRequestHandler());


app.use(lib.loadUser);
app.use(lib.checkForAlreadyLoggedIn);
app.use(lib.loginUserSendToHome);
app.use(lib.logoutUserSendToLogin);
app.get('/login', lib.getLogin);
app.post('/login', lib.postLogin);
app.get('/logout', lib.getLogout);
app.post('/create',lib.createTodo);
app.get('/items',lib.getItems);
app.post('/addItem',lib.addItem);
app.get('/view',lib.viewTodo);
app.get('/favicon.ico',lib.ignorePage);
app.postServe(new FileHandler().getRequestHandler());

module.exports = app;