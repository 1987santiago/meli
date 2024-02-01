
const getFormattedItem = (item) => {
    return {
        id: item.id,
        title: item.title,
        currency_id: item.currency_id,
        price: item.price,
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping
    }
};

const getItemsData = (data) => {
    const items = data.map(item => getFormattedItem(item));
    return items;
};

const refactorPriceData = (item, price) => {
    const updatedItem = { ...item };
    const amount = item.price;
    delete updatedItem.currency_id;
    delete updatedItem.price;
    updatedItem.price = {
        currency: price.symbol,
        amount,
        decimals: price.decimal_places
    };
    return updatedItem;
}

module.exports = {
    getFormattedItem,
    getItemsData,
    refactorPriceData
};