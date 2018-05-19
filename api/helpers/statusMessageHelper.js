const setResponse = (res, statusCode, message) => {
    res.status(statusCode);
    message ? res.send(message) : res.send();
}

export default setResponse;