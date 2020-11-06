import React, {useEffect,Fragment} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../store/posts';
import { Link } from 'react-router-dom';
import SideBar from './HomePage/SideBar';
import PostItem from './PostItem';
import RightSideBar from './HomePage/RightSideBar';

import './QuestionsPage.css'
import Spinner from "./Spinner";


const QuestionsPage = () => {
    const posts = useSelector(state => state.posts.list);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts());
    }, [ dispatch ]);

    return posts === null ? <Spinner type='page' width='75px' height='200px'/> : <Fragment>
        <div className='page'>
            <SideBar/>
            <div id="content">
                <div id='mainbar' className='questions-page fc-black-800'>
                    <div className='questions-grid'>
                        <h3 className='questions-headline'>All Questions</h3>
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
                            <PostItem key={post.id} post={post} />))}
                    </div>
                </div>
                <RightSideBar/>
            </div>
        </div>
        </Fragment>
};


export default QuestionsPage;
