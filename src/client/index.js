import {performAction, enableForm, getFormData, scrollTo} from './js/app';
import {cleanEntryForm, cleanFlightInfoForm, deleteFlightInfo, deleteTripData} from './js/cleaning';


import './styles/style.scss';
import './styles/typography.scss';
import './styles/hero.scss';
import './styles/results.scss';
import './styles/entry.scss';



// Event listener to add function to existing HTML DOM element

document.getElementById('addTrip').addEventListener('click', scrollTo);

document.getElementById('entryForm').addEventListener('submit', performAction);
document.getElementById('flight-info-btn').addEventListener('click', enableForm);
document.getElementById('flight-info-form').addEventListener('submit', getFormData);

document.getElementById('entry-remove-btn').addEventListener('click', cleanEntryForm);
document.getElementById('remove-form-flight-info').addEventListener('click', cleanFlightInfoForm);
document.getElementById('flight-info-data').addEventListener('click', deleteFlightInfo);
document.getElementById('remove-trip-data').addEventListener('click', deleteTripData);



