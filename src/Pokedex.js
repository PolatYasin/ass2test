import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style.css';
class Pokedex extends Component {
    state = {
        pokemons: [],
        nextUrl: '',
        prevUrl: '',
        selectedPokemon: null,
      };

  componentDidMount() {
    this.fetchPokemons();
  }

  fetchPokemons = () => {
    axios
      .get(this.state.nextUrl || 'https://pokeapi.co/api/v2/pokemon')
      .then(response => {
        this.setState({
          pokemons: response.data.results,
          nextUrl: response.data.next,
          prevUrl: response.data.previous,
        });
      })
      .catch(error => {
        console.log('list error:', error);
      });
  };

  handleNextClick = () => {
    if (this.state.nextUrl) {
      this.fetchPokemons(this.state.nextUrl);
    }
  };

  handlePrevClick = () => {
    if (this.state.prevUrl) {
      this.fetchPokemons(this.state.prevUrl);
    }
  };

  handlePokemonClick = async pokemon => {
    try {
      const response = await axios.get(pokemon.url);
      const selectedPokemon = {
        name: response.data.name,
        imageUrl: response.data.sprites.front_default,
        types: response.data.types.map(type => type.type.name),
        stats: response.data.stats,
        abilities: response.data.abilities.map(ability => ability.ability.name),
        height: response.data.height,
        weight: response.data.weight,
      };
      this.setState({ selectedPokemon });
    } catch (error) {
      console.log('get add. data error:', error);
    }
  };


  render() {
    const { pokemons, selectedPokemon } = this.state;
  
    return (
        <div className="pokedex-container">
          <div className="pokemon-list-container">
            <h1>Pokédex</h1>
            <button>
              <Link to="/about">about</Link>
            </button>
            <ul>
              {pokemons.map(pokemon => (
                <li
                  key={pokemon.name}
                  onClick={() => this.handlePokemonClick(pokemon)}
                  className={selectedPokemon && selectedPokemon.name === pokemon.name ? 'selected' : ''}
                >
                  {pokemon.name}
                </li>
              ))}
            </ul>
            <div>
              <button onClick={this.handlePrevClick}>Previous</button>
              <button onClick={this.handleNextClick}>Next</button>
            </div>
          </div>
          {selectedPokemon && (
            <div class="pokemon-details-container">
              <h2>{selectedPokemon.name}</h2>
              <img src={selectedPokemon.imageUrl} alt={selectedPokemon.name} />
              <p>
                <strong>Types:</strong> {selectedPokemon.types.join(', ')}
              </p>
              <p>
                <strong>Stats:</strong>
                <br />{' '}
                {selectedPokemon.stats.map(stat => (
                  <span key={stat.stat.name}>
                    <strong>{stat.stat.name}:</strong> {stat.base_stat}
                    <br />
                  </span>
                ))}
              </p>
              <p>
                <strong>Abilities: </strong>
                {selectedPokemon.abilities.join(', ')}
              </p>
              <p>
                <strong>Height: </strong>
                {selectedPokemon.height}
              </p>
              <p>
                <strong>Weight: </strong> {selectedPokemon.weight}
              </p>
            </div>
          )}
        </div>
      );
  } } export default Pokedex;