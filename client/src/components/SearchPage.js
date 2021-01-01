import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import SideBar from './HomePage/SideBar';
import PostItem from './PostItem';
import RightSideBar from './HomePage/RightSideBar';
import './QuestionsPage.css'
import Spinner from "./Spinner";


const SearchPage = (props) => {
    const posts = props.location.state.questions;
    console.log(posts);
    return posts === null ? <Spinner type='page' width='75px' height='200px'/> : <Fragment>
        <div className='page'>
            <SideBar/>
            <div id="content">
                <div id='mainbar' className='questions-page fc-black-800'>
                    <div className='questions-grid'>
                        <h3 className='questions-headline'>Returned Posts</h3>
                        <div className='questions-btn'>
                            <Link to='/add/question'>
                                <button className = 's-btn s-btn__primary'>Ask Question</button>
                            </Link>
                        </div>
                    </div>

                    <div className='questions'>
                        {posts.map(post => (
                            <PostItem key={post.id} post={post} />))}
                    </div>
                </div>
                <RightSideBar/>
            </div>
        </div>
        </Fragment>
};


export default SearchPage;
