import NewsAPI from './../components/NewsAPI';

export const ADD_NEWS = 'ADD_NEWS';
export const REMOVE_NEW = 'REMOVE_NEW';

// actions creators
export const addNews = payload => ({ type: ADD_NEWS, payload });
export const removeNew = payload => ({ type: REMOVE_NEW, payload });


export const setNews = payload => async (dispatch) => {
    try {
      const news = await NewsAPI.getNews();
      
      dispatch(addNews(news))
    } catch (error) {
      throw Error(error);
    }
}

export const deleteNew = payload => async (dispatch) => {
  try {
    let { news, id, title } = payload;
    
    const response = await NewsAPI.deleteNew({ id, title });

    if(response.success === 'ok') {
      await dispatch(removeNew({ news, id }))
    }
  
  } catch (error) {
    throw Error(error)
  }
}