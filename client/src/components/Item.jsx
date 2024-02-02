import React from 'react';

const Item = ({ item }) => {

    return (
        <>
            <div>
                <div className='item-picture'>
                    <img src={item.picture} alt="Imagen de producto" title={item.title} />
                </div>
                <div className='item-data'>
                    <div>{item.condition}</div>
                    <div>{item.price?.currency} {item.price?.amount}</div>
                    <div>{item.free_shipping}</div>
                    <div>{item.title}</div>
                </div>
            </div>
            <div className='item-description'>{item.description}</div>
        </>
    );
};

export default Item;