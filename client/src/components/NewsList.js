import React from 'react';
import PropTypes from 'prop-types';
import NewListItem from './NewsListItem';

const NewsList = ({ news, onClickDelete, onClickOpenLink }) => {
    return (
        <div>
            <div className="news-list">
                { news.map(n => 
                <NewListItem
                    id={n.id}
                    storyTitle={n.title}
                    author={n.author}
                    createdAt={n.created_at}
                    storyUrl={n.story_url}
                    onClickDelete={onClickDelete}
                    onClickOpenLink={onClickOpenLink}
                >
                </NewListItem>) }
            </div>
        </div>
    );
};

NewsList.propTypes = {
    news: PropTypes.array.isRequired,
    newsIds: PropTypes.array.isRequired,
    onClickDelete: PropTypes.func.isRequired,
};

export default NewsList;