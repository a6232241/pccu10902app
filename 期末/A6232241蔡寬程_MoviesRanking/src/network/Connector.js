const initParams = {
  api_key: '39612a00f197188663dd38c1a6aae2b1',
  language: 'zh-TW',
};

const getTMDB = async (url, params = {}) => {
  let resp = await fetch(`https://api.themoviedb.org/3${url}?api_key=39612a00f197188663dd38c1a6aae2b1&language=zh-TW`, {
    ...params,
    headers: { 'Content-Type': 'text/plain' },
    method: 'GET',
  });
  return await resp.json();
};

export { getTMDB };
