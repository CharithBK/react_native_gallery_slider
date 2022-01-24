import axios from 'axios';

export const getDataList = async () => {
  const config = {
    headers: {
      Authorization: '563492ad6f917000010000015ebe68c13e38461f87cb23d87fedb64f',
    },
  };
  const url =
    'https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20';
  return await axios.get(url, config);
};
