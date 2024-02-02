import React, { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';

const Search = ({ query, onSubmit }) => {
    const [_query, setQuery] = useState(query);
    useEffect(() => {
        const searchInput = document.querySelector('#search');
        searchInput.addEventListener('search', (ev) => {
            onSubmit('');
        });
        // eslint-disable-next-line 
    }, [query]);

    const onChange = (ev) => {
        ev.preventDefault();
        setQuery(ev.target.value);
    };

    const onSubmitHandler = (ev) => {
        ev.preventDefault();
        console.log('Search::onSubmit()', ev.target.search.value);
        let regex = /(^[A-Z]{3}\d{8,16}$)/gm;
        const searchValue = ev.target.search.value;
        if (regex.test(searchValue)) {
            window.location.href = window.location.origin + `/items/${searchValue}`;
        } else {
            ev.target.submit();
        }
    };

    return (
        <form action='/items' onSubmit={onSubmitHandler}>
            <input type='search' name='search' id='search' onChange={onChange} value={_query} />
            <button type='submit'>Search</button>
        </form>
    );
};

export default Search; 