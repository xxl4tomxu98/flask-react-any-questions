import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './TagPanel.css';

const TagPanel = ({ tag: {tagname, created_at, posts_count} }) => {
    return (
        <div className='tag-card'>
            <div className='grid'>
                <div className='grid-cell'>
                    <Link className='s-tag' to={`/tags/${ tagname }`}>{ tagname }</Link>
                </div>
            </div>
            <div className='caption'>
                <div>
                    {posts_count} questions
                </div>
                <div>
                    added { moment(created_at).fromNow(true) } ago
                </div>
            </div>
        </div>
    )
};


export default TagPanel;
