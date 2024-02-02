import React from 'react';

const Item = ({ item }) => {

    return (
        <>
            <div className='item'>
                <div className='item__picture'>
                    <img src={item.picture} alt="Imagen de producto" title={item.title} />
                </div>
                <div className='item__data' data-id={item.id}>
                    <span className='item__condition'>{item.condition === 'new' ? 'Nuevo' : 'Usado'}</span>
                    <h2 className='item__title'>{item.title}</h2>
                    <span className='item__price'>{item.price?.currency} {item.price?.amount}</span>
                    <span className='item__shipping'>{item.free_shipping}</span>
                    <button className='item__action' onClick={(ev) => console.log('Compraste!')}>Comprar</button>
                </div>
            </div>
            <section>
                <h4 className='item__subtitle'>Descripción del producto</h4>
                <p className='item__description'>{item.description}</p>
            </section>
        </>
    );
};

export default Item;