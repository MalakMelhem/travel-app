import { getFormData } from '../src/client/js/formHandler';
global.Client = {
    postData: jest.fn(),
    updateUI: jest.fn(),
}

describe('getFormData function', () => {
    document.body.innerHTML = `
    <input id="depTime" value="10:00 AM">
    <input id="depFlight" value="AA123">
    <input id="arrTime" value="12:00 PM">
    <input id="arrFlight" value="AA124">
    <button id="remove-flight-info-data" class="remove">Remove</button>
`;

it('should correctly collect flight info data', async () => {
    const event = { preventDefault: jest.fn() };
    await getFormData(event);  
    expect(Client.postData).toHaveBeenCalledWith('http://localhost:3000/add-flight-info-data', expect.objectContaining({
      depTime: '10:00 AM',
      depFlight: 'AA123',
      arrTime: '12:00 PM',
      arrFlight: 'AA124'
    }));
    expect(Client.updateUI).toHaveBeenCalled();
  });

});
