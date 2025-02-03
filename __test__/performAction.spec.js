import { performAction } from '../src/client/js/formHandler';
// import { Client } from '../src/client/js/client';

// jest.mock('../src/client/js/client'); // Mock all client methods
global.Client = {
    postData: jest.fn(),
    updateUI: jest.fn(),
    validatePlaceName: jest.fn((val)=>val),
    countDown: jest.fn(),
    getCoordinates: jest.fn(),
    getWeather: jest.fn(),
    getImage: jest.fn(),
}


describe('performAction function', () => {
  let event;

  beforeEach(() => {
    event = { preventDefault: jest.fn() }; 
    jest.clearAllMocks();
  document.body.innerHTML = `
  <form id="entryForm">
       <div class="input-div">
        <label for="place">My trip to:</label> 
        <input id="place" name="place" type="text" placeholder="Enter Location" required value="Paris"/>
       </div>
       <div class="input-div">
        <label for="date">Departing:</label> 
        <input id="date" name="date" type="date" required value="2025-02-15"/>
       </div>  
      <div class="btns">
        <button class="primary-button" type="submit">save</button>
        <button id="entry-remove-btn" class="primary-button" type="button">remove</button>
      </div>
    </form>
  `;
  });

  it('should call preventDefault on the event', async () => {
    await performAction(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should validate place name', async () => {
    const placeName = 'Paris';
    Client.validatePlaceName.mockReturnValue(true);
    await performAction(event);
    expect(Client.validatePlaceName).toHaveBeenCalledWith(placeName);
  });

  it('should skip execution if validatePlaceName returns false', async () => {
    Client.validatePlaceName.mockReturnValue(false);
    await performAction(event);
    expect(Client.countDown).not.toHaveBeenCalled(); 
  });

  it('should handle countDown and fetch coordinates', async () => {
    const countDays = { date: '2025-02-15', daysUntilTrip: 12 };
    Client.countDown.mockReturnValue(countDays);
    const mockCoordinates = { totalResultsCount: 1, geonames: [{ lat: 48.8566, lng: 2.3522, countryName: 'France' }] };
    Client.validatePlaceName.mockReturnValue(true);
    Client.getCoordinates.mockResolvedValue(mockCoordinates);
    await performAction(event);
    expect(Client.getCoordinates).toHaveBeenCalledWith('Paris');
  });

  it('should call postData with correct data', async () => {
    const countDays = { date: '2025-02-3', daysUntilTrip: 0 };
    Client.countDown.mockReturnValue(countDays);
    const mockCoordinates = { totalResultsCount: 1, geonames: [{ lat: 48.8566, lng: 2.3522, countryName: 'France' }] };
    Client.getCoordinates.mockResolvedValue(mockCoordinates);
    const mockWeather = { data: [{ weather: { description: 'sunny' }, temp: 20, max_temp: 25, min_temp: 15 }] };
    Client.getWeather.mockResolvedValue(mockWeather);
    const mockImage = { hits: [{ webformatURL: 'url', tags: 'Paris' }] };
    Client.getImage.mockResolvedValue(mockImage);

    await performAction(event);

    expect(Client.postData).toHaveBeenCalledWith(
      'http://localhost:3000/add-coordinates-and-date-data',
      expect.objectContaining({
        latitude: 48.8566,
        longitude: 2.3522,
        country: 'France',
        place: 'Paris',
        date: '2025-02-3',
        daysUntilTrip: 0,
      })
    );
    expect(Client.postData).toHaveBeenCalledWith(
      'http://localhost:3000/add-trip-weather-data',
      expect.objectContaining({
        description: 'sunny',
        temp: 20,
        maxTemp: 25,
        minTemp: 15,
      })
    );
    expect(Client.postData).toHaveBeenCalledWith(
      'http://localhost:3000/add-trip-image-data',
      expect.objectContaining({
        url: 'url',
        alt: 'Paris',
      })
    );
    
  });

  it('should call updateUI', async () => {
    const countDays = { date: '2025-02-15', daysUntilTrip: 12 };
    Client.countDown.mockReturnValue(countDays);
    Client.validatePlaceName.mockReturnValue(true);
    const mockCoordinates = { totalResultsCount: 1, geonames: [{ lat: 48.8566, lng: 2.3522, countryName: 'France' }] };
    Client.getCoordinates.mockResolvedValue(mockCoordinates);
    const mockWeather = { data: [{ weather: { description: 'sunny' }, temp: 20, max_temp: 25, min_temp: 15 }] };
    Client.getWeather.mockResolvedValue(mockWeather);
    const mockImage = { hits: [{ webformatURL: 'url', tags: 'Paris' }] };
    Client.getImage.mockResolvedValue(mockImage);
    await performAction(event);

    expect(Client.updateUI).toHaveBeenCalled();
  });
});
