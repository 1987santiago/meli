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
        <div className='search'>
            <a className='search__logo' href="/" title="Ir a Mercado Libre">
                <span>Mercado Libre</span>
            </a>
            <form className='search__form' action='/items' onSubmit={onSubmitHandler}>
                <input className='search__input' type='search' name='search' id='search' onChange={onChange} value={_query} />
                <button className='search__button' type='submit'><span>Buscar</span></button>
            </form>
        </div>
    );
};

export default Search; 