const lib = require('./appLib.js');
const webApp = require('./webApp.js');
const logRequest = require('./logRequest.js').logRequest;
let app = webApp.create();

app.use(logRequest);
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
app.postServe(lib.displayPage);

module.exports = app;