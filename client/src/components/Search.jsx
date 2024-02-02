import React, { useEffect, useState } from 'react';

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

    return (
        <form action='/items'>
            <input type='search' name='search' id='search' onChange={onChange} value={_query} />
            <button type='submit'>Search</button>
        </form>
    );
};

export default Search; 