import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => (
    <header>
      <h1>This is a footer...</h1>
      <nav>
        <ul>
          <li>
            <NavLink to="/" activeClassName="active" exact>Home</NavLink>
          </li>
        </ul>
      </nav>
    </header>
);

export default Footer;
