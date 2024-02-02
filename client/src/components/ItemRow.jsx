import React from 'react';
import { NavLink } from 'react-router-dom'

const ItemRow = ({ data }) => {

    return (
        <>
            <NavLink to={`/items/${data.id}`}>
                <div className='itemPicture'><img src={data.picture} alt="Imagen de producto" title={data.title} /></div>
                <div className='itemData'>
                    <div>{data.price.currency} {data.price.amount}</div>
                    <div>{data.free_shipping}</div>
                    <div>{data.title}</div>
                    <div>{data.condition}</div>
                </div>
            </NavLink>
        </>
    );
};

export default ItemRow;