const EventEmitter = require('events');

const http =require('http')

class sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new EventEmitter();

myEmitter.on('newSale', () => {
  console.log('There was a new sale');
});

myEmitter.on('newSale', () => {
  console.log('Coustomer name: Jonas');
});

myEmitter.on('newSale', (stock) => console.log(`There are now ${stock} items left in stock `));

myEmitter.emit('newSale', 9);
/////////////////////////

const server=http.createServer()

server.on('request',(req,res)=>{
    console.log('request received')
    res.end('Request received')
})
server.on('request',(req,res)=>{
    console.log('Another request 😀')
})

server.on('close',()=>{
    console.log('Server Closed');
})

server.listen(8000,()=>{
    console.log('Waiting for requests...........')
})