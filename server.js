const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.zip': 'application/zip',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8'
};

const server = http.createServer((req, res) => {
  // CORS & No-Cache for development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  let safeUrl = decodeURI(req.url.split('?')[0]);
  if (safeUrl === '/' || safeUrl === '') {
    safeUrl = '/index.html';
  }

  const filePath = path.normalize(path.join(BASE_DIR, safeUrl));

  // Security: prevent directory traversal
  if (!filePath.startsWith(BASE_DIR)) {
    res.statusCode = 403;
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.statusCode = 404;
      res.end(`File Not Found: ${safeUrl}`);
      return;
    }

    let actualPath = filePath;
    if (stats.isDirectory()) {
      actualPath = path.join(filePath, 'index.html');
    }

    fs.readFile(actualPath, (readErr, content) => {
      if (readErr) {
        res.statusCode = 404;
        res.end(`File Not Found: ${safeUrl}`);
        return;
      }

      const ext = path.extname(actualPath).toLowerCase();
      res.setHeader('Content-Type', MIME_TYPES[ext] || 'application/octet-stream');
      res.statusCode = 200;
      res.end(content);
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Team BAAAND Campus Navigation Server running at:`);
  console.log(`- http://localhost:${PORT}/prototype-final/index.html (Final Working App)`);
  console.log(`- http://127.0.0.1:${PORT}/prototype-final/index.html (IPv4 direct)`);
  console.log(`- http://localhost:${PORT}/index.html (Deliverables Hub)`);
});
