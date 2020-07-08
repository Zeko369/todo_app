interface Http {
  post: (url: string, body?: string) => Promise<any>;
  patch: (url: string, body?: string) => Promise<any>;
  delete: (url: string) => Promise<Response>;
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
  delete: (url) =>
    fetch(url, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    }),
};

export default http;
