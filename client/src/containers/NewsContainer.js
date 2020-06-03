import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { getNews } from './../reducers/news';
import { setNews, deleteNew } from './../actions';
import NewsHeader from '../components/NewsHeader';
import NewsList from '../components/NewsList';

class NewsContainer extends Component {
    constructor() {
        super();
        this.state = {
            isLoadingData: true,
            newsList: [],
        }
    }

    componentDidMount = async () => {
        const { setNews } = this.props;
        await setNews();
    
        this.setState({isLoadingData: false})
    }

    handleOnClickDelete = async ({ id, title }) => {
        const { news, deleteNew } = this.props;
        console.log('entre');
        await deleteNew({ news, id, title });
    }

    handleOnClickOpenLink = async ({ storyUrl }) => {
        window.open(`${storyUrl}`,'_blank');
    }

    render() {
        return (
            <div>
                <NewsHeader title={'HN Feed'} subtitle={'We <3 hacker news!'}></NewsHeader>
                { this.state.isLoadingData === true ? 'Loading data..' :
                <NewsList news={this.props.news} onClickDelete={this.handleOnClickDelete} onClickOpenLink={this.handleOnClickOpenLink}></NewsList>
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setNews: value => dispatch(setNews(value)),
    deleteNew: value => dispatch(deleteNew(value)),
});

const mapStateToProps = state => {
    console.log('state=>', state)
    return {
        news: state,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsContainer);