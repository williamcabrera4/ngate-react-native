function handleResponse(response) {
  if (response.status === 204) {
    return response;
  }

  const json = response.json();

  if (response.status < 200 || response.status >= 300) {
    const error = new Error(json.message);
    error.body = json;
    throw error;
  }

  return json;
}

function prepareRequestBody(method, data) {
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  return options;
}

const HttpClient = {
  get: uri => fetch(uri).then(handleResponse),
  post: (uri, data) => fetch(uri, prepareRequestBody('POST', data)).then(handleResponse)
};

export default HttpClient;