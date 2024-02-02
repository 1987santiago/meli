import React, { useEffect, useState } from 'react';
import ItemRow from '../components/ItemRow';
import Navigator from '../components/Navigator';
import Search from '../components/Search';

const SearchPage = () => {
    const query = decodeURIComponent(window.location.search).substring(8).split('+').join(' ');
    const [items, setItems] = useState([]);

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

    useEffect(() => {
        updateListing(query);
        // eslint-disable-next-line 
    }, [query]);

    return (
        <>
            <Search query={query} onSubmit={updateListing} />
            <Navigator />
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