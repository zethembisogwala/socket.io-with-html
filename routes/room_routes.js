const path = require('path');

export function register(app) {
    app.get('/javascript', javascript);
    app.get('/swift', swift);
    app.get('/html', html);
}

const javascript = (request, response) => {
    response.sendFile(path.resolve('public/rooms/javascript.html'));
}

const swift = (request, response) => {
    response.sendFile(path.resolve('public/rooms/swift.html'));
}

const html = (request, response) => {
    response.sendFile(path.resolve('public/rooms/html.html'));
}