const lib = require('./serverLib.js');
const webApp = require('./webApp.js');
const logRequest = require('./logRequest.js').logRequest;
let app = webApp.create();

app.use(logRequest);
app.use(lib.loadUser);
app.use(lib.loginUserSendToHome);
app.use(lib.logoutUserSendToLogin);
app.get('/',lib.sendToLogin);
app.get('/fevicon.ico',lib.ignorePage);
app.get('/login', lib.getLogin);
app.post('/login', lib.postLogin);
app.get('/logout', lib.getLogout);
app.postServe(lib.displayPage);

module.exports = app;