const {
    getFormattedItem,
    getItemsData,
    refactorPriceData } = require('./utils');

const signResponse = (req, res, next) => {
    if (res.locals?.body) {
        res.locals.body.author = {
            name: 'Santiago',
            lastname: 'Marchioni'
        };
    }
    next();
};

const getItems = async (req, res, next) => {
    const QUERY = req?.query?.q;
    const LIMIT = 4;
    const endpoint = `https://api.mercadolibre.com/sites/MLA/search?q=​${QUERY}&limit=${LIMIT}`;
    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            res.locals.body = {
                items: getItemsData(data?.results) // data.results => [{item}, {item}, {item}]
            };
            next();
        })
}

const getItem = (req, res, next) => {
    const ITEM_ID = req?.params?.id;
    const endpoint = 'https://api.mercadolibre.com/items/';
    fetch(endpoint + ITEM_ID)
        .then(response => response.json())
        .then(data => {
            const item = getFormattedItem(data);
            item.sold_quantity = data.sold_quantity;
            res.locals.body = res.locals.body || {};
            res.locals.body.item = item;
            next();
        });
};

const getCategories = async (req, res, next) => {
    const CATEGORY_ID = req?.params?.id;
    const endpoint = `https://api.mercadolibre.com/categories/${CATEGORY_ID}`;
    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            res.locals.body = data;
            next();
        })
};

const getDescription = async (req, res, next) => {
    const ITEM_ID = req?.params?.id;
    const endpoint = `https://api.mercadolibre.com/items/${ITEM_ID}/description`;
    fetch(endpoint)
        .then(response => response.json())
        .then(description => {
            res.locals.body.item.description = description?.plain_text;
            next();
        });
};

const getPriceDetail = async (req, res, next) => {
    const body = res.locals.body;
    const CURRENCY_ID = (body.items) ? body?.items[0]?.currency_id : body?.item?.currency_id;
    const endpoint = `https://api.mercadolibre.com/currencies/${CURRENCY_ID}`;
    fetch(endpoint)
        .then(response => response.json())
        .then(price => {
            if (body.items) {
                const updatedItems = body.items.map(item => refactorPriceData(item, price));
                res.locals.body.items = updatedItems;
            } else {
                res.locals.body.item = refactorPriceData(body.item, price);
            }
            next();
        });
};

module.exports = {
    signResponse,
    getItems,
    getItem,
    getDescription,
    getPriceDetail,
    getCategories,
}