//"test": "react-scripts test --env=jsdom",
import {fetchOrgs, postSession} from '../api';

describe('API', () => {

  it('Success login', async () => {
    expect.assertions(1);
    const data = await postSession('super', '123');
    expect(data.response.user.login).toEqual('super');
  });

  it('Makes sure window.fetch is the one from the polyfill', () => {
    expect(window.fetch.polyfill).toBe(true);
  });

  it('Fetch scene data', () => {

    return fetchOrgs()
    .then(data => {
      if (data["error"]) {
        expect(data).toBe(null); //{ error: 'Network request failed' }
      } else {
        expect(data).toBeInstanceOf(Object);

        /*expect(data.response).toEqual(expect.objectContaining({
          entities: expect.any(Object)
          }
        ))*/
      }
    });
  });
});
