import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Item from '../components/Item';
import Breadcrumb from '../components/Breadcrumb';
import Search from '../components/Search';

const ItemPage = () => {
    const [item, setItem] = useState({});
    const [categories, setCategories] = useState(['a', 'b', 'c']);
    const params = useParams();

    const getItem = (params) => {
        const endpoint = '/api/items/' + params?.id;
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                getCategories(data.item);
                setItem(data.item);
            })
    };

    const getCategories = (item) => {
        const endpoint = '/api/categories/' + item?.category_id;
        fetch(endpoint)
            .then(response => response.json())
            .then(categories => {
                setCategories(categories?.path_from_root);
            });
    };

    useEffect(() => {
        getItem(params);
    }, [params]);

    return (
        <>
            <Search onSubmit={() => { }} />
            <Breadcrumb categories={categories} />
            <main>
                <Item item={item} />
            </main>
        </>
    )
};

export default ItemPage;