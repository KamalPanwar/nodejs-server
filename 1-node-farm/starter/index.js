import fs from 'fs';
import http from 'http';
import url, { fileURLToPath } from 'url';
import { dirname } from 'path';
import slugify from 'slugify';
import replaceTemplate from './modules/ReplaceTemplate.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slug = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slug);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  /////////////////////overview page///////////////
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const cardHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');

    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml);
    res.end(output);
  }
  ////////////////////Product///////////
  else if (pathname === '/product') {
    const { id } = query;
    const product = dataObj[id];
    const output = replaceTemplate(tempProduct, product);

    res.end(output);
  }
  ///////////////////API/////////
  else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/JSON',
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-owm-header': 'hello-world',
    });
    res.end('<h1>Page not found</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('server is running on port 8000');
});
