const express = require('express');
const app = express();

const device = require('express-device');
app.use(device.capture());

const compression = require('compression');
app.use(compression());

app.use(express.static('./public'));

app.get('/controlpanel', (req, res) => {
    res.redirect('http://nicholasm.byethost32.com/wp-admin');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('*', (req, res) => {
    res.redirect('/');
});

app.listen(process.env.PORT || 8080, () => console.log(`listening on 8080...`));
