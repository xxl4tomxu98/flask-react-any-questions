import React, { useEffect, useState, Fragment } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../HomePage/HomePage.css';
import Spinner from '../Spinner';
import PostItem from '../PostItem.js';

const ProfileTabFavorites = () => {
    const id = useSelector(state => state.authentication.id);
    const [myFavorites, setMyFavorites] = useState([])

    useEffect(() => {
        async function fetchFavorites() {
            const res = await fetch(`/api/users/${id}/bookmarks`)
            const data = await res.json()
            return setMyFavorites(data.bookmarked)
        }
        fetchFavorites()
    }, [id])


    return myFavorites === null ? <Spinner type='page' width='75px' height='200px'/> : <Fragment>
      <div className='page'>

          <div id="content">
              <div id='mainbar' className='questions-page fc-black-800'>
                  <div className='questions-grid'>
                      <h3 className='questions-headline'>Your Bookmarked Questions</h3>
                      <div className='questions-btn'>
                          <Link to='/add/question'>
                              <button className = 's-btn s-btn__primary'>Ask Question</button>
                          </Link>
                      </div>
                  </div>
                  <div className='questions-tabs'>
                      <span>19,204,360 questions</span>
                  </div>
                  <div className='questions'>
                      {myFavorites.map(post => (
                          <PostItem key={post.id} post={post} />))}
                  </div>
              </div>

          </div>
      </div>
    </Fragment>
}


export default ProfileTabFavorites
