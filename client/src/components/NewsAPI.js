import fetch from 'isomorphic-unfetch';

const api_url = `http://localhost:8080/api/v1`

async function getNews() {
  try {
    const response = await fetch(`${api_url}/getNews`);
    const data = await response.json();
    
    return data;
  } catch(error) {
    throw Error(error);
  }
}

async function updateNews() {
  try {
    const response = await fetch(`${api_url}/updateNews`);
    const data = await response.json();
    
    return data;
  } catch(error) {
    throw Error(error);
  }
}

async function deleteNew({ id, title }) {
  try {
    const response = await fetch(
      `${api_url}/deleteNew`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({ id, title }),
      }
    );

    const message = await response.json();

    return message;
  } catch (error) {
    throw Error(error);
  }
}

export default {
  getNews,
  updateNews,
  deleteNew
}