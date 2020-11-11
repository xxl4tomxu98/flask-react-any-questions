
import React, { useEffect, Fragment } from 'react';
import './HomePage.css'
import Footer from '../Footer';
import SideBar from './SideBar';
import PostItem from '../PostItem';
import RightSideBar from './RightSideBar';
import { getPosts } from '../../store/posts';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';




const HomePage = () => {
  const posts = useSelector(state => state.posts.list);

  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getPosts());
  }, [dispatch]);

  return posts === [] ? <Spinner type='page' width='75px' height='200px'/> : <Fragment>
      <div className='page'>
          <SideBar/>
          <div id="content">
              <div id='mainbar' className='homepage fc-black-800'>
                  <div className='questions-grid'>
                      <h3 className='questions-headline'>Top Ranked Questions</h3>
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
                      {posts.map(post => (
                          <PostItem key={post.id} post={post}/>))}
                  </div>
              </div>
              <RightSideBar/>
          </div>
      </div>
      <Footer />
  </Fragment>
};


export default HomePage
