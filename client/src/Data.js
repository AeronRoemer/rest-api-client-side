import config from './config';

export default class Data {
  //api() accepts: api endpoint, http method, and body (any data associated with request), authorization info
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // Check if auth is required
    if (requiresAuth) {    
      //btoa creates a base-64 encoded string of data
    const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
    //sets Authorization headers to Basic and sends encoded credentials
    options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    //fetch request with modified url and options formatted as object
    return fetch(url, options);
  }

  async getUser(username, password) {
    const response = await this.api(`/users`, 'GET', null,  true, { username, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
}
