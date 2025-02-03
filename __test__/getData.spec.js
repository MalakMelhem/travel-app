import { getData } from '../src/client/js/serverDataHandler'; 

global.fetch = jest.fn();

describe('getData function', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('should call fetch with the correct URL and return data', async () => {
    const mockResponse = { place: 'Paris', country: 'France' };
    const url = 'http://localhost:3000/all';

    fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });

    const result = await getData(url);

    expect(fetch).toHaveBeenCalledWith(url);
    expect(result).toEqual(mockResponse);
  });

});
