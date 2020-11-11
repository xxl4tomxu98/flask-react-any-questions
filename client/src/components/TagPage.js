import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTagPosts } from '../store/posts';
import { getTag } from '../store/tags';
import { Link, useParams } from 'react-router-dom';
import SideBar from './HomePage/SideBar';
import PostItem from './PostItem';
import RightSideBar from './HomePage/RightSideBar';
import Spinner from "./Spinner";

const TagPage = () => {
    const posts = useSelector(state => state.posts.tagPosts);
    const tag = useSelector(state => state.tags.detail);
    const { tagname } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTag(tagname));
        dispatch(getTagPosts(tagname));
    }, [dispatch, tagname]);

    return posts === null ? <Spinner type='page' width='75px' height='200px'/> : <Fragment>
        <div className='page'>
            <SideBar/>

            <div id="content">
                <div id='mainbar' className='questions-page fc-black-800'>
                    <div className='questions-grid'>
                        <h4 className='questions-tags'>Questions tagged: [{tagname}]    Created: [{tag.created_at}]     Post count: [{tag.posts_count}]</h4>
                        <h5 className='question-tags'>{tag.description}</h5>
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
                        {posts.length === 0 ? ( <h4 style={{margin: '30px 30px'}}>There are no questions from this tag</h4> ) :
                            posts.map(post => (
                                <PostItem key={post.id} post={post} />
                            ))
                        }
                    </div>
                </div>
                <RightSideBar/>
            </div>
        </div>
    </Fragment>


};


export default TagPage;
