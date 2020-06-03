import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';


const NewsListItem = ({ storyTitle, author, createdAt, id, storyUrl, onClickDelete, onClickOpenLink }) => {
    return (
        <div className="news-list-item">
            <Grid container spacing={7}>
                <Grid item xs={4}>
                    <div className="title" onClick={() => onClickOpenLink({ storyUrl })}>{storyTitle}</div>
                </Grid>
                <Grid item xs={5}>
                    <div className="author" onClick={() => onClickOpenLink({ storyUrl })}>- {author} -</div>
                </Grid>
                <Grid item xs={2}>
                    <div className="title" onClick={() => onClickOpenLink({ storyUrl })}>{createdAt}</div>
                </Grid>
                <Grid item xs={1}>
                    <div className="delete-action" onClick={() => onClickDelete({ id, title: storyTitle })} >{<DeleteIcon/>}</div>
                </Grid>
            </Grid>
        </div>
    );
};

NewsListItem.propTypes = {
    storyTitle: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
};

export default NewsListItem;