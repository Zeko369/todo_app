interface Http {
  post: (url: string, body: string) => Promise<Response>;
  patch: (url: string, body: string) => Promise<Response>;
}

const http: Http = {
  post: (url, body) =>
    fetch(url, {
      method: 'POST',
      body: body,
      headers: { 'content-type': 'application/json' },
    }).then((res) => res.json()),
  patch: (url, body) =>
    fetch(url, {
      method: 'PATCH',
      body: body,
      headers: { 'content-type': 'application/json' },
    }).then((res) => res.json()),
};

export default http;
