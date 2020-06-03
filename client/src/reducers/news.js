import { ADD_NEWS, REMOVE_NEW } from '../actions';

export const news = (state = {}, action) => {
    switch(action.type) {
        case ADD_NEWS:
            return action.payload.news
        case REMOVE_NEW:
            return action.payload.news.filter(n => n.id !== action.payload.id);
        default:
            return state;
    }
}

export default news;
