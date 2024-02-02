import React from 'react';

const Breadcrumb = ({ categories }) => {

    return (
        <div className="breadcrumb">
            <ul className='breadcrumb__list'>
                {
                    categories.map((category, i) =>
                        <li className="breadcrumb__item" key={i}>
                            {category.name}
                            <span className='breadcrumb__arrow'>></span>
                        </li>
                    )
                }
            </ul>
        </div>
    );
};

export default Breadcrumb;