import axios from 'axios';

const request = (url: string, params: any = {}): Promise<any> => {
  const {
    method = 'get',
    ...requestParams
  } = params;

  return axios({
    url,
    method,
    ...requestParams,
  }).then(response => ({
    result: response.data,
  })).catch(error => ({
    error,
  }));
};


export default request;
