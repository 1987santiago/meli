import React from 'react';
import { NavLink } from 'react-router-dom'

const ItemRow = ({ data }) => {

    return (
        <li className='item-row'>
            <NavLink className='item-row__link' to={`/items/${data.id}`}>
                <div className='item-row__picture'>
                    <img src={data.picture} alt="Imagen de producto" title={data.title} />
                </div>
                <div className='item-row__data'>
                    <span className='item-row__price'>{data.price.currency} {data.price.amount}</span>
                    <span className='item-row__shipping'>{data.free_shipping}</span>
                    <h5 className='item-row__title'>{data.title}</h5>
                    {/* <div className='item-row__condition'>Producto {data.condition === 'new' ? 'Nuevo' : 'Usado'}</div> */}
                </div>
            </NavLink>
        </li>
    );
};

export default ItemRow;