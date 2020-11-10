import React, {Fragment, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { addPost } from '../store/posts';
import './PostForm.css';
import {specialtyArr} from "./Profile/specialties";


const PostForm = () => {
    const currentUserId = useSelector(state => state.authentication.id);
    const dispatch = useDispatch();
    const history = useHistory();
    const [ formData, setFormData ] = useState({
        title: '',
        body: '',
        tags:[],
    });
    const { title, body, tags } = formData;

    function onChange(e){
        const { name, value } = e.target;
        if(name!=="tags"){
            return setFormData({ ...formData, [name]: value });
        } else{
            const selected=[];
            let selectedOption=(e.target.selectedOptions);
            for (let i = 0; i < selectedOption.length; i++){
                selected.push(selectedOption.item(i).value)
            }
            return setFormData({ ...formData, [name]: selected})
        }
    }


    const onSubmit = e => {
        e.preventDefault();
        dispatch(addPost(formData));
        history.push('/');
    };

    if (!currentUserId) {
        return <Redirect to='/login' />;
    }

    return <Fragment>
        <div className='post-form-container'>
            <div className='post-form-content'>
                <div className='post-form-header'>
                    <div className='post-form-headline fc-black-800'>
                        Ask a public question
                    </div>
                </div>
                <div className='post-form-section'>
                    <div className='postform' style={{width: '100%'}}>
                        <form onSubmit={onSubmit}>
                            <div className='question-form p16 s-card'>
                                <div className='question-layout'>
                                    <div className='title-grid'>
                                        <label className='form-label s-label'>
                                            Question Title
                                            <p className='title-desc fw-normal fs-caption'>
                                                Be specific and polite to your community members
                                            </p>
                                        </label>
                                        <input
                                            className='title-input s-input'
                                            type='text'
                                            name='title'
                                            value={title}
                                            onChange={onChange}
                                            id='title'
                                            placeholder='e.g. Is there an R function for finding the index of an element in a vector?'
                                        />
                                    </div>
                                    <div className='body-grid'>
                                        <label className='form-label s-label fc-black-800'>
                                            Question Body
                                            <p className='body-desc fw-normal fs-caption fc-black-800'>Include all the information someone would need to answer your question</p>
                                        </label>
                                        <textarea
                                            className='s-textarea'
                                            name='body'
                                            cols='30'
                                            rows='12'
                                            value={body}
                                            onChange={onChange}
                                            placeholder='Enter body with minimum 30 characters'
                                            id='body'
                                        >
                                        </textarea>
                                    </div>
                                    <div className='tag-grid'>
                                        <label className='form-label s-label'>
                                            Question Tag Names
                                            <p className='tag-desc fw-normal fs-caption'>
                                                Add up to 5 tags to describe what your question is about
                                            </p>
                                        </label>
                                        <select multiple value={tags} name="tags" placeholder="e.g. (ajax flask string)" onChange={onChange} className='tag-input s-input'>
                                        {specialtyArr.map((item, index) => <option key={`${item}-${index}`} tags={item}>{item}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='post-button mt32'>
                                <button className='s-btn s-btn__primary' id='submit-button' name='submit-button'>Post your question</button>
                            </div>
                        </form>
                    </div>
                    <aside>
                        <div className='right-panel'>
                            <div className='widget'>
                                <div className='s-sidebarwidget--header'>
                                    Step 1: Draft your question
                                </div>
                                <div className='widget-content fc-black-800'>
                                    <div className='summary'>
                                        <p className='sec1'>
                                            The community is here to help you with specific coding, algorithm, or language problems.
                                        </p>
                                        <p className='sec2'>
                                            Avoid asking opinion-based questions.
                                        </p>
                                    </div>
                                    <ol className='step-section'>
                                        <li className='step'>
                                            <button >
                                                <div className='step-cell'>
                                                    <div>
                                                        <img src='https://cdn.sstatic.net/Img/list-1.svg?v=e8dd475ba207' width='16' height='16' alt='1.' />
                                                    </div>
                                                    <span>Summarize the Problem</span>
                                                </div>
                                            </button>
                                            <div className='inst'>
                                                <div className='inst-content'>
                                                    <ul>
                                                        <li><p>Include details about your goal</p></li>
                                                        <li><p>Describe expected and actual results</p></li>
                                                        <li><p className='except'>Include any error messages</p></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li className='step'>
                                            <button>
                                                <div className='step-cell'>
                                                    <div>
                                                        <img src='https://cdn.sstatic.net/Img/list-2.svg?v=9382fc2c3631' width='16' height='16' alt='2.' />
                                                    </div>
                                                    <span>Explain Steps Explored</span>
                                                </div>
                                            </button>
                                            <div className='inst'>
                                                <div className='inst-content'>
                                                    <p className='step2'>
                                                        Show what you’ve tried and tell us what you found (on this site or elsewhere) and why it didn’t meet your needs. You can get better answers when you provide research.
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li style={{borderBottomRightRadius:'3px',borderBottomLeftRadius:'3px'}} className='step except-step'>
                                            <button>
                                                <div className='step-cell'>
                                                    <div>
                                                        <img src='https://cdn.sstatic.net/Img/list-3.svg?v=323a95564232' width='16' height='16' alt='3.' />
                                                    </div>
                                                    <span>Provide Code Snippets</span>
                                                </div>
                                            </button>
                                            <div className='inst'>
                                                <div className='inst-content'>
                                                    <p className='step3'>
                                                        When appropriate, share the minimum amount of code others need to reproduce your problem (also called a minimum, reproducible example)
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    </Fragment>
};



export default PostForm;
