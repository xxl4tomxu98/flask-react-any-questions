import React, { useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import '../HomePage/HomePage.css';
import { getBookmarkedPosts, getFollowings, getFollowedUserPosts } from '../../store/users';
import Spinner from '../Spinner';
import PostItem from '../PostItem.js';
import User from '../User.js';

const ProfileTabFavorites = () => {
    const id = useSelector(state => state.authentication.id);
    const myFavorites = useSelector(state => state.users.bookmarked);
    const followedUsers = useSelector(state => state.users.followings);
    const followedUserPosts = useSelector(state => state.users.followeduserposts);
    const dispatch = useDispatch();

    useEffect(() => {
          dispatch(getBookmarkedPosts(id));
          dispatch(getFollowings(id));

    }, [dispatch, id])

    // followedUsers.map(followedUser => dispatch(getFollowedUserPosts(id, followedUser.id)));

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

              <div id='mainbar' className='questions-page fc-black-800'>
                  <div className='questions-grid'>
                      <h3 className='questions-headline'>Your FollowedUser Questions</h3>
                      <div className='questions-btn'>
                          <Link to='/add/question'>
                              <button className = 's-btn s-btn__primary'>Ask Question</button>
                          </Link>
                      </div>
                  </div>
                  <div className='questions-tabs'>
                      <span>10,401,360 questions</span>
                  </div>
                  <div className='questions'>
                    {followedUsers.map(user =>
                        (<User key={user.id} user={user} />)
                        //  {followedUserPosts.map(post => (
                        //   <PostItem key={post.id} post={post} />))}
                    )}
                    {/* {followedUserPosts.map(post => (
                          <PostItem key={post.id} post={post} />))} */}

                  </div>
              </div>
          </div>
      </div>
    </Fragment>
}


export default ProfileTabFavorites
