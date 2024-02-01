const express = require('express');
const {
    signResponse,
    getItems,
    getItem,
    getDescription,
    getPriceDetail
} = require('./middlewares');
const app = express();
const port = 3001;

/**
 * @path /api/items?q=​:query
 * @query ?q=:query // e.g. ?q=some%20to%20search
 * @endpoint https://api.mercadolibre.com/sites/MLA/search?q=​:query 
 **/
app.get('/api/items', getItems, getPriceDetail, signResponse, async (req, res, next) => {
    console.log('res.locals.body');
    console.dir(res.locals.body, { depth: 3 });
    res.send(JSON.stringify(res.locals.body));
});


/**
 * @path /api/items/:id
 * @query ?ids=:id,:id,id
 * @endpoint https://api.mercadolibre.com/items​/:id,
 * @endpoint https://api.mercadolibre.com/items/​:id​/description
**/
app.get('/api/items/:id', getItem, getPriceDetail, getDescription, signResponse, async (req, res, next) => {
    console.log('res.locals.body');
    console.dir(res.locals.body, { depth: 3 });
    res.send(JSON.stringify(res.locals.body));
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
