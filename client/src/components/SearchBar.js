import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Search } from '../assets/Search.svg';


const SearchBar = () => {

    const [term, setTerm] = useState('');

    const history = useHistory();

    const updateTerm = (e) => {
        setTerm(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        searchPosts(term);
    }

    const searchPosts = async (term) => {
        const res = await fetch(`/api/search/${term}`)
        if (res.ok) {
            const data = await res.json();
            history.push({
              pathname: '/search',
              state: data,
            });
            return data;
        }
        throw res;
    }



    return (

        <form onSubmit={handleSubmit} className="grid--cell fl-grow1 searchbar px12 js-searchbar " autoComplete="off">
          <div className="ps-relative">
            <input
              onChange={updateTerm}
              type="text"
              name="search"
              value={term}
              maxLength="200"
              placeholder="Search Posts"
              className="s-input s-input__search js-search-field "
            />
            <input type="submit" value="" style={{display: 'none'}} />

            <Search/>
          </div>
        </form>

    );
};

export default SearchBar;
