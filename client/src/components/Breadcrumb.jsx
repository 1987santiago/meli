import React from 'react';

const Breadcrumb = ({ categories }) => {

    return (
        <ul>
            {
                categories.map((category, i) =>
                    <li key={i}>{category.name} <span>></span></li>
                )
            }
        </ul>
    );
};

export default Breadcrumb;