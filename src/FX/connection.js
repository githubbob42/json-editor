import 'simple-errors';

const { Connection } = global.jsforce; // expect jsforce to be available globally via CDN on index.html
const SESSION_URL = 'https://login.fieldfx.com/session';
const LOGIN_URL = 'https://login.fieldfx.com/login';
const LOGOUT_URL = 'https://login.fieldfx.com/oauth/logout';
const PROXY_URL = 'https://login.fieldfx.com/salesforce';

export default function getConnection() {
  return fetch(SESSION_URL, { credentials: 'include' })
    .then(response => {
      if (response.ok && !response.redirected) return response.json();
      window.location.href = `${LOGIN_URL}?returnUrl=${encodeURIComponent(window.location.href)}`;
    })
    .then(session => {
      const { oauth, identity = {} } = session || {};
      if (!oauth) return Promise.reject();

      if (window.location.hostname === 'localhost') {
        oauth.proxyUrl = PROXY_URL;
      }

      const connection = new Connection(oauth);
      connection.identity = identity;
      connection.logout = () => (window.location.href = LOGOUT_URL);
      connection.restApi = resource => restApiFetch(connection, resource);

      return connection;
    });
}

function restApiFetch(connection, resource) {
  const { instanceUrl, version, accessToken } = connection;
  const escaped = resource.replace(/\s/g, '+');
  const options = { headers: { Authorization: `Bearer ${accessToken}` } };
  let url = `${instanceUrl}/services/data/v${version}/${escaped}`;

  if (window.location.hostname === 'localhost') {
    options.headers['salesforceproxy-endpoint'] = url;
    url = `${PROXY_URL}?${+Date.now()}.${Math.random()}`;
  }

  return fetch(url, options).then(response => {
    if (response.ok) return response.json();
    // try to log salesforce errors
    return response.json().then(errors => {
      console.error('API REQUEST FAILED', { resource, errors });
      throw Error.create('API REQUEST FAILED', { resource, errors });
    });
  });
}
