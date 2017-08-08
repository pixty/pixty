//"test": "react-scripts test --env=jsdom",
import {fetchScene} from '../api'


describe('API', () => {

  it('Makes sure window.fetch is the one from the polyfill', () => {
    expect(window.fetch.polyfill).toBe(true);
  })

  it('Fetch scene data', () => {

    expect.assertions(1) 

    return fetchScene('fp-123')
    .then(data => {
      if (data["error"]) {        
        expect(data).toBe(null) //{ error: 'Network request failed' }
      } else {
        //expect(data).toBeInstanceOf(Object)

        expect(data.response).toEqual(expect.objectContaining({
          entities: expect.any(Object)            
          }
        ))
      }
    })
  })
})
