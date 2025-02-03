import { postData } from '../src/client/js/serverDataHandler'; 
global.fetch = jest.fn();

describe('postData function', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('should call fetch with the correct URL and data', async () => {
    const mockResponse = { success: true };
    const url = 'http://localhost:3000/add-flight-info-data';
    const data = { depTime: '10:00 AM', depFlight: 'AA123', arrTime: '12:00 PM', arrFlight: 'AA124' };

    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse)
    });
    const result = await postData(url, data);

    expect(fetch).toHaveBeenCalledWith(url, expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }));
    expect(result).toEqual(mockResponse);
  });

});
