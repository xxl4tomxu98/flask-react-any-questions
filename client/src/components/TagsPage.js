import React, {useEffect, Fragment} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTags } from '../store/tags';
import './TagsPage.css'
import SideBar from './HomePage/SideBar';
import TagPanel from './TagPanel';
import RightSideBar from './HomePage/RightSideBar';
import Spinner from "./Spinner";

const TagsPage = () => {
    const tags = useSelector(state => state.tags.list);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTags());
    }, [dispatch]);

    return tags === null ? <Spinner type='page' width='75px' height='200px'/> : <Fragment>
        <div className='page'>
            <SideBar/>
            <div id="content">
                <div id='mainbar' className='tags-page fc-black-800'>
                    <h1 className='headline'>Tags</h1>
                    <p className='fs-body'>
                        A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.
                    </p>
                    <div className='headline-count'>
                        <span>1,025 tags</span>
                    </div>
                    <div className='user-browser'>
                        <div className='grid-layout'>
                            {tags.map(tag => (
                                <TagPanel key={tag.tagname} tag = {tag}/>))}
                        </div>
                    </div>
                </div>
                <RightSideBar/>
            </div>
        </div>
    </Fragment>
};


export default TagsPage;
