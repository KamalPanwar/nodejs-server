
const fs=require('fs')
const http= require('http')
const url=require('url')


const replaceTemplate=(temp,product)=>{
   let output=temp.replace(/{%PRODUCTNAME%}/g ,product.productName)
   output=output.replace(/{%IMAGE%}/g ,product.image)
   output=output.replace(/{%PRICE%}/g ,product.price)
   output=output.replace(/{%FROM%}/g ,product.from)
   output=output.replace(/{%NUTRIENTS%}/g ,product.nutrients)
   output=output.replace(/{%QUANTITY%}/g ,product.quantity)
   output=output.replace(/{%DESCRIPTION%}/g ,product.description)
   output=output.replace(/{%ID%}/g ,product.id)
   if(!product.organic){
   output=output.replace(/{%NOT_ORGANIC%}/g ,'not-organic')
   }
   return output
}

const tempOverview=fs.readFileSync(`${__dirname}/templates/overview.html`,'utf-8')
const tempCard=fs.readFileSync(`${__dirname}/templates/card.html`,'utf-8')
const tempProduct=fs.readFileSync(`${__dirname}/templates/product.html`,'utf-8')

 const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8')
 const dataObj=JSON.parse(data)

const server=http.createServer((req,res)=>{
   /////////////////////overview page///////////////
    const pathname=req.url
     if(pathname==='/'||pathname==='/overview'){
      res.writeHead(200,{
         'Content-type':'text/html'
     })
        const cardHtml=dataObj.map((el)=> replaceTemplate(tempCard,el)
     ).join('')
   
     const output=tempOverview.replace('{%PRODUCT_CARDS%}',cardHtml)
        res.end(output)
     }else 
     ////////////////////Product///////////
     if(pathname==='/product'){
        res.end('This is product page')
     } else 
     ///////////////////API/////////
     if(pathname==='/api'){
        
        res.writeHead(200,{
            'Content-type':'application/JSON'
        })
        res.end(data)
       
     } else{
        res.writeHead(404,{
            'Content-type':'text/html',
            'my-owm-header':'hello-world'
        })
        res.end( '<h1>Page not found</h1>' )
     }
    
})

server.listen(8000,'127.0.0.1',()=>{
    console.log('server is running on port 8000')
})