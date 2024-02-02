import React, { useEffect, useState } from 'react';
import ItemRow from '../components/ItemRow';
import Search from '../components/Search';
import Breadcrumb from '../components/Breadcrumb';

const SearchPage = () => {
    const query = decodeURIComponent(window.location.search).substring(8).split('+').join(' ');
    const [items, setItems] = useState([]);
    const [categoryIdList, setCategoryIdList] = useState([]);

    const getItems = (encodedQuery) => {
        fetch('/api/items?q=' + encodedQuery)
            .then(response => response.json())
            .then(data => {
                setItems(data.items);
            });
    };

    const updateListing = (query) => {
        if (query === '') {
            setItems([]);
            return;
        }
        getItems(encodeURIComponent(query));
    };

    const getCategoryIdList = (items) => {
        const idList = [];
        items.forEach(item => {
            idList.push(item.category_id);
        });
        return idList;
    };

    const getRepeatedIds = (ids) => {
        const elementCounts = {};
        ids.forEach(id => {
            elementCounts[id] = (elementCounts[id] || 0) + 1;
        });
        return elementCounts;
    };

    const getCategoryId = (items) => {
        if (!items || items.length === 0) return;

        // 1. obtener el listado de IDs
        const categoryIdList = getCategoryIdList(items);

        // 2. Contar los IDs en busca de repetidos
        const idsObj = getRepeatedIds(categoryIdList);

        // 3. Obtener en número de máximas repeticiones de un ID
        const idValuesList = Object.values(idsObj);
        const maxValue = (Math.max(...idValuesList));

        // 4. Convertir el Objeto de Ids to iterable
        const idsEntries = (Object.entries(idsObj));

        // 5. Obtenemos el id con mayor repeticiones o en caso que no exista o sean varios, devuelve el primero
        const mostRepeatedIdTouple = idsEntries.filter(touple => (touple[1] === maxValue))
        const mostRepeatedId = mostRepeatedIdTouple[0][0];

        return mostRepeatedId;
    };

    const getCategoryPath = (id) => {
        fetch('/api/categories/' + id)
            .then(response => response.json())
            .then(data => {
                setCategoryIdList(data.path_from_root);
            });
    };

    useEffect(() => {
        const categoryId = getCategoryId(items);
        categoryId && getCategoryPath(categoryId);
    }, [items]);

    useEffect(() => {
        updateListing(query);
        // eslint-disable-next-line 
    }, [query]);

    return (
        <>
            <Search query={query} onSubmit={updateListing} />
            <Breadcrumb categories={categoryIdList} />
            <main>
                <ul>
                    {
                        items.map((item, i) => <ItemRow data={item} key={i} />)
                    }
                </ul>
            </main>
        </>
    );
};

export default SearchPage;