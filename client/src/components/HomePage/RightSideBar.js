import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTags } from '../../store/tags';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as Anyquestions } from '../../assets/quiz.svg';
import './RightSideBar.css';

const RightSideBar = () => {
  const tags = useSelector(state => state.tags.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  return (
    <div id='sidebar' className='side-bar'>
      <div className="s-sidebarwidget s-sidebarwidget__yellow s-anchors s-anchors__grayscale mb16"
        data-tracker="cb=1">
        <ul className="d-block p0 m0">
          <div
            className="s-sidebarwidget--header s-sidebarwidget__small-bold-text d:fc-black-900 bb bbw1">
            The Any Questions Blog
                    </div>
          <li className="s-sidebarwidget--item grid px16">
            <div className="grid--cell1 fl-shrink0">
              <svg aria-hidden="true" className="va-text-top svg-icon iconPencilSm" width="14" height="14"
                viewBox="0 0 14 14">
                <path
                  d="M11.1 1.71l1.13 1.12c.2.2.2.51 0 .71L11.1 4.7 9.21 2.86l1.17-1.15c.2-.2.51-.2.71 0zM2 10.12l6.37-6.43 1.88 1.88L3.88 12H2v-1.88z" />
              </svg>
            </div>
            <div className="grid--cell">
              <Link to="https://anyquestions.blog/2020/07/13/tales-from-documentation-write-for-your-dumbest-user/&quot;,null,null]"
                className="js-gps-track"
                data-ga="[&quot;community bulletin board&quot;,&quot;The Q/A Blog&quot;,&quot;https://anyquestions.blog/2020/07/13/tales-from-documentation-write-for-your-dumbest-user/&quot;,null,null]"
                data-gps-track="communitybulletin.click({ priority: 1, position: 0 })">Stories from online
                                documentation searching: Write for your fellow evaluators</Link>
            </div>
          </li>
          <li className="s-sidebarwidget--item grid px16">
            <div className="grid--cell1 fl-shrink0">
              <svg aria-hidden="true" className="va-text-top svg-icon iconPencilSm" width="14" height="14"
                viewBox="0 0 14 14">
                <path
                  d="M11.1 1.71l1.13 1.12c.2.2.2.51 0 .71L11.1 4.7 9.21 2.86l1.17-1.15c.2-.2.51-.2.71 0zM2 10.12l6.37-6.43 1.88 1.88L3.88 12H2v-1.88z" />
              </svg>
            </div>
            <div className="grid--cell">
              <Link to="https://any questions.blog/2020/07/14/podcast-252-a-conversation-on-diversity-and-representation/"
                className="js-gps-track"
                data-ga="[&quot;community bulletin board&quot;,&quot;The Overflow Blog&quot;,&quot;https://stackoverflow.blog/2020/07/14/podcast-252-a-conversation-on-diversity-and-representation/&quot;,null,null]"
                data-gps-track="communitybulletin.click({ priority: 1, position: 1 })">Webnar 256: a
                                conversation on react compoent reuse for better DOM rendering</Link>
            </div>
          </li>
          <div
            className="s-sidebarwidget--header s-sidebarwidget__small-bold-text d:fc-black-900 bb bbw1">
            Upcoming Events
                    </div>
          <li className="s-sidebarwidget--item grid px16">
            <div className="grid--cell1 fl-shrink0">
              <div className="favicon favicon-stackoverflow" title="Stack Overflow">
                <Anyquestions />
              </div>
            </div>
            <div className="grid--cell">
              <Link to="https://stackoverflow.com/election" className="fc-danger js-gps-track"
                data-ga="[&quot;community bulletin board&quot;,&quot;Upcoming Events&quot;,&quot;https://any questions.com/election&quot;,null,null]"
                data-gps-track="communitybulletin.click({ priority: 5, position: 2 })">2020 Forum
                                Moderator and Judge Election</Link>
              <div>ends <span title="2020-07-21 20:00:00Z" className="relativetime">in 6 days</span></div>
            </div>
          </li>
          <div
            className="s-sidebarwidget--header s-sidebarwidget__small-bold-text d:fc-black-900 bb bbw1">
            Featured on Meta
                    </div>
          <li className="s-sidebarwidget--item grid px16">
            <div className="grid--cell1 fl-shrink0">
              <div className="favicon favicon-stackexchangemeta" title="Meta Stack Exchange">
                <img className="meta-image" src='https://meta.stackexchange.com/Content/Sites/stackexchangemeta/Img/apple-touch-icon@2.png?v=c34d758b103d' alt='meta' />
              </div>
            </div>
            <div className="grid--cell">
              <Link to="https://meta.anyquestions.com/questions/350184/feedback-post-new-moderator-reinstatement-and-appeal-process-revisions"
                className="js-gps-track"
                data-ga="[&quot;community bulletin board&quot;,&quot;Featured on Meta&quot;,&quot;https://meta.stackexchange.com/questions/350184/feedback-post-new-moderator-reinstatement-and-appeal-process-revisions&quot;,null,null]"
                data-gps-track="communitybulletin.click({ priority: 3, position: 3 })">Feedback post: New
                                moderator and judge reinstatement and appeal process revisions</Link>
            </div>
          </li>
          <li className="s-sidebarwidget--item grid px16">
            <div className="grid--cell1 fl-shrink0">
              <div className="favicon favicon-stackexchangemeta" title="Meta Stack Exchange">
                <img className="meta-image" src='https://meta.stackoverflow.com/Content/Sites/stackexchangemeta/Img/apple-touch-icon@2.png?v=c34d758b103d' alt='meta' />
              </div>
            </div>
            <div className="grid--cell">
              <Link to="https://meta.stackexchange.com/questions/350544/the-new-moderator-agreement-is-now-live-for-moderators-to-accept-across-the-netw"
                className="js-gps-track"
                title="The new moderator agreement is now live for moderators to accept across the network"
                data-ga="[&quot;community bulletin board&quot;,&quot;Featured on Meta&quot;,&quot;https://meta.stackexchange.com/questions/350544/the-new-moderator-agreement-is-now-live-for-moderators-to-accept-across-the-netw&quot;,null,null]"
                data-gps-track="communitybulletin.click({ priority: 3, position: 4 })">The new moderator
                                agreement is now live for moderators to accept across the&hellip;</Link>
            </div>
          </li>
          <li className="s-sidebarwidget--item grid px16">
            <div className="grid--cell1 fl-shrink0">
              <div className="favicon favicon-anyquestionsmeta" title="Meta Any Questions">
                <Anyquestions />
              </div>
            </div>
            <div className="grid--cell">
              <Link to="https://meta.anyquestions.com/questions/399013/allow-bountied-questions-to-be-closed-by-regular-users"
                className="js-gps-track"
                data-ga="[&quot;community bulletin board&quot;,&quot;Featured on Meta&quot;,&quot;https://meta.anyquestions.com/questions/399013/allow-bountied-questions-to-be-closed-by-regular-users&quot;,null,null]"
                data-gps-track="communitybulletin.click({ priority: 6, position: 5 })">Allow bountied
                                questions along with answers and comments to be closed by regular users</Link>
            </div>
          </li>
          <li className="s-sidebarwidget--item grid px16">
            <div className="grid--cell1 fl-shrink0">
              <div className="favicon favicon-anyquestionsmeta" title="Meta Any Questions">
                <Anyquestions />
              </div>
            </div>
            <div className="grid--cell">
              <Link to="https://meta.anyquestions.com/questions/399106/2020-community-moderator-election-questionnaire"
                className="js-gps-track"
                data-ga="[&quot;community bulletin board&quot;,&quot;Featured on Meta&quot;,&quot;https://meta.anyquestions.com/questions/399106/2020-community-moderator-election-questionnaire&quot;,null,null]"
                data-gps-track="communitybulletin.click({ priority: 6, position: 6 })">2020 Community
                                Moderator Election - Questionnaire</Link>
            </div>
          </li>
        </ul>
      </div>

      <div className='side-bar-tags tags'>
          <h4 className='tag-headline'>Top Ten Tags</h4>
          {tags.slice(0, 9).map(tag => (
              <div key={tag.tagname} className='tag-content'>
                  <a className='s-tag s-tag__md' href={`/tags/${tag.tagname}`}>
                    {tag.tagname}
                  </a>
                              &nbsp;
                  <span className='tag-mult'>
                    <span>&times;</span>
                                  &nbsp;
                                  <span>{tag.posts_count}</span>
                  </span>
              </div>
          ))}
          <Link className='show-tags' to='/tags'>show more tags</Link>
      </div>

    </div>
  )
};



export default RightSideBar;
