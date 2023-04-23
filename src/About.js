import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class About extends Component {
  render() {

    return(
    <div>
      <h1>About</h1>
      <p>This is a page about pokemons fetched from pokeAPI.</p>
      <button><Link to="/">Pokedex</Link></button>
    </div>
  );}
}

export default About;