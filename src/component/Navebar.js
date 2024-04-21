import React from 'react'
import PropTypes from 'prop-types';
import { Component } from 'react';
import logo from "../assets/img/markdown.webp";

export default function Navebar(props) {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
        <img src={logo} alt="Logo" className="me-2" style={{ width: '50px', borderRadius: '50%' }}/>
        {props.title}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/about">
                {props.about}
              </a>
            </li>
          </ul>
          
        </div>
      </div>
    </nav>
  );
}
