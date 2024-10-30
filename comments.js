//Create web server
const http = require('http');
const fs = require('fs');
const comments = require('./comments.json');
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/comments' && req.method === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(comments));
    } else if (req.url === '/comments' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            const comment = JSON.parse(body);
            comments.push(comment);
            fs.writeFileSync('./comments.json', JSON.stringify(comments));
            res.writeHead(201, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(comment));
        });
    } else {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
            message: 'Not found'
        }));
    }
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});