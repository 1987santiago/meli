import React, { useEffect, useState } from 'react';
import Search from './Search';

const SearchContainer = ({ onSubmit }) => {
    const searchQuery = decodeURIComponent(window.location.search).substring(3);
    const [query, setQuery] = useState(searchQuery);

    const getItems = (endpoint, encodedQuery) => {
        fetch(endpoint + encodedQuery)
            .then(response => response.json())
            .then(data => {
                onSubmit(data?.items, `${window.location.origin}?q=${encodedQuery}`);
            });
    };

    const onSubmitHandler = (query) => {
        if (query === '') {
            onSubmit([]);
            window.history.replaceState({}, '', window.location.origin);
            return;
        }
        getItems('/api/items?q=', encodeURIComponent(query));
    };

    // useEffect(() => {
    //     onSubmitHandler(query);
    // }, [query]);

    return (
        <>
            <Search query={query} onSubmit={onSubmitHandler} />
        </>
    );
};

export default SearchContainer;            