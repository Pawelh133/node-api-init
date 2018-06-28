import _ from 'lodash';

const setResponse = (res, response) => {
  res.status(response.statusCode);
  res.send(
    _.omit(response, ['statusCode', 'success'])
  );
}

export default setResponse;