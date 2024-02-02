import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigator = () => {
    return (
        <nav>
            <NavLink to="/" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}>Inicio</NavLink>
        </nav>
    );
};

export default Navigator;