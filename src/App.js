import React from 'react';
import { useState } from 'react';
import './App.css';



const weatherApi ={
  key:"5abdd1dfdcb434579d12c494dc90badf",
  base:"https://api.openweathermap.org/data/2.5/"
}

function App() {

  const[weather,setWeather] = useState({});
  const[query,setQuery] = useState('');

  const search =evt =>{
    if (evt.key === "Enter"){
      fetch(`${weatherApi.base}weather?q=${query}&units=metric&APPID=${weatherApi.key}`)
      .then(res=>res.json())
      .then(result =>{
        setWeather(result);
        setQuery('');
        console.log(result)
      }
      );
    }
  };

  const ShowDate =(d)=>{
    let months =["January","Febuary","March","April","May","June","July","August","September","October","November","December"];
    let days =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`

  }
  return (
    <div className= {(typeof weather.main !="undefined")? ((weather.main.temp > 24) ? 'app summer':'app') :'app'}>
      <main>
        <div className='search-box'>
           <input type='text' className='search-bar' 
           placeholder='search...' 
           onChange={e =>setQuery(e.target.value)}
           value={query}
          onKeyPress={search} />
        </div>
         {(typeof weather.main !="undefined") ? (
           <div>
             <div className='location'>
          <div className='city'>{weather.name},{weather.sys.country}Please search in search bar</div>
          <div className='date'>{ShowDate(new Date())}</div>
        </div>
        <div className='weather-box'>
          <div className='Temp'>
            {Math.round(weather.main.temp)}*C
          </div>
          <div className='state'>
            {weather.weather[0].description}
          </div>
        </div>
           </div>
         ) : ('')}
      
      </main>
    </div>
  );
}

export default App;
