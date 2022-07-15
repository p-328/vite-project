import { useState, useRef, MutableRefObject } from 'react';
import Snackbar from '@mui/material/Snackbar';
import * as Nominatim from 'nominatim-browser-custom';
import Coords from './components/Coords';
import './App.css';
import Alert from '@mui/material/Alert';

function App() {
  const cityRef = useRef() as MutableRefObject<HTMLInputElement>;
  const locationRef = useRef() as MutableRefObject<HTMLInputElement>;
  const interpretRef = useRef() as MutableRefObject<HTMLSelectElement>;
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const lookup = (e: any) => {
    e.preventDefault();
    if (interpretRef.current.value === 'country') {
      Nominatim.geocode({
        city: cityRef.current.value,
        country: locationRef.current.value
      })
        .then((data: Nominatim.NominatimResponse[]) => {
          if (data.length == 0) {
            setErrMsg('Location not found!');
            return;
          }
          setErrMsg('');
          setLatitude(data[0].lat);
          setLongitude(data[0].lon);
        })
        .catch(err => {
          setErrMsg(err);
        });
    } else if (interpretRef.current.value === 'state') {
      Nominatim.geocode({
        city: cityRef.current.value,
        state: locationRef.current.value,
        country: "US"
      })
        .then((data: Nominatim.NominatimResponse[]) => {
          if (data.length == 0) {
            setErrMsg('Location not found!');
            return;
          }
          setErrMsg('');
          setLatitude(data[0].lat);
          setLongitude(data[0].lon);
        })
        .catch(err =>
          setErrMsg(err)
        )
    }
    cityRef.current.value = '';
    locationRef.current.value = '';
  }
  return (
    <div className="container">
      <h1>Coordinate Locator!</h1>
      <p>Find coordinates of any location you search!</p>
      <form onSubmit={lookup}>
        <label htmlFor="city">City:    </label>
        <br />
        <input type="text" id='city' ref={cityRef} className='input-lookup' required />
        <br />
        <label htmlFor='location-of-city'>Location of city:</label>
        <br />
        <input type="text" id='location-of-city' ref={locationRef} className='input-lookup' required />
        <br />
        <label htmlFor='interpret'>How to interpret location of city: </label>
        <select ref={interpretRef} id='interpret' className='select-filter' required>
          <option value="state">State</option>
          <option value="country" className='option-edge'>Country</option>
        </select>
        <br />
        <input type="submit" value="Lookup" className='btn-submit'/>
      </form>
      {
        latitude !== '' ? <Coords latitude={latitude} longitude={longitude}></Coords> : <div></div>
      }
      <Snackbar open={errMsg !== ''} autoHideDuration={6000} onClose={() => setErrMsg('')}>
        <Alert onClose={() => setErrMsg('')} severity='error' sx={{ width: '100%' }}>
          {errMsg}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default App
