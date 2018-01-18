const lib = require('./appLib.js');
const webApp = require('./webApp.js');
let app = webApp.create();

const LoggerHandler = require('../handler/logger_handler.js');
const FileHandler = require('../handler/file_handler.js');
const PageNotFoundHandler = require('../handler/page_not_found_handler.js')

app.use(new LoggerHandler().getRequestHandler());


app.use(lib.loadUser);
app.use(lib.checkForAlreadyLoggedIn);
app.use(lib.loginUserSendToHome);
app.use(lib.logoutUserSendToLogin);
app.use(lib.viewTodo);
app.get('/login', lib.getLogin);
app.post('/login', lib.postLogin);
app.get('/logout', lib.getLogout);
app.get('/items',lib.getItems);
app.post('/addTodo',lib.addTodo);
app.get('/favicon.ico',lib.ignorePage);
app.postServe(new FileHandler().getRequestHandler());
// app.postServe(new PageNotFoundHandler().getRequestHandler())

module.exports = app;