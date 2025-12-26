import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import night_icon from '../Assets/night.png'
import search_icon from '../Assets/search.png'
// import { url } from "inspector";
import { useEffect, useRef, useState } from "react";

type WeatherData = {
  humidity: number;
  windspeed: number;
  temperature: number;
  location: string;
  icon: string;
};


const WeatherNow = () => {

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData>([]);

  const ICON_MAP: Record<string, string> = {
    "01d":clear_icon,
    "01n":night_icon,
    "02d":cloud_icon,
    "02n":cloud_icon,
    "03d":cloud_icon,
    "03n":cloud_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "09d":rain_icon,
    "09n":rain_icon,
    "10d":rain_icon,
    "10n":rain_icon,
    "13d":snow_icon,
    "13n":snow_icon,

  }
  
  const search = async (city:string) => {

    if (!city.trim()) return;
    try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

        const icon = ICON_MAP[data.weather[0].icon] || clear_icon;

        setWeatherData({
          humidity: data.main.humidity,
          windspeed: data.wind.speed,
          temperature:Math.floor(data.main.temp),
          location:data.name,
          icon: icon
        })
    } catch (error){

    }

  }

  useEffect(()=> {
    (async () => {
      await search("london");
    })();
  },[])
  

  return (
    
    <main className="dark:bg-blue-500 bg-gray-300 p-8 rounded-4xl gap-8 flex flex-col min-h-full w-100">
      <section className="flex justify-between items-center text-blue-400">
        <h1 className="dark:text-white text-2xl">
          Weather <em className="text-orange-400 dark:text-yellow-400">NOW</em>
        </h1>
        <AnimatedThemeToggler
          className="text-indigo-800 dark:text-orange-400 scale-85 bg-gray-200"
          duration={800}
        />
      </section>
      <section className="flex justify-between bg-white rounded-full">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search By Place"
          className=" bg-white rounded-l-full text-sm text-black focus:outline-none w-full px-4 py-2 font-bold"
        />
        
        <button className="text-center bg-white rounded-e-full active:scale-95 text-sm tracking-wide px-4" onClick={() =>
          inputRef.current && search(inputRef.current.value)
        }>
          <img src={search_icon} alt=""/>
        </button>
      </section>
      <section className="flex flex-col items-center gap-3">
        <div>
          <span className="text-lg">{weatherData.location}</span>
        </div>
        <div className="flex flex-col items-center gap-10">
          <img
            src={weatherData.icon}
            alt="search location"
            className="w-20 h-auto "
          />
          <h1 className="text-7xl font-extrabold italic">{weatherData.temperature}&deg;C</h1>
        </div>
      </section>
      <section className="flex items-center justify-evenly">
        <div className="flex space-x-3 items-center bg-orange-400/45 p-3 rounded-lg dark:bg-white/20">
          <img src="src\Assets\humidity.png" alt="wind info" className="w-6 h-6"/>
          <div>
            <p className="text-sm">Humidity</p>
            <span>{weatherData.humidity} %</span>
          </div>
        </div>
        <div className="flex space-x-3 items-center bg-orange-400/45 p-3 rounded-lg dark:bg-white/20">
          <img src="src\Assets\wind.png" alt="wind info" className="w-6 h-6" />
          <div>
            <p className="text-sm">Wind Speed</p>
            <span>{weatherData.windspeed} km/h</span>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center w-full ">
        <p className="text-xs">
          Powered by - <span className="text-red-400">OpenWeather</span>
        </p>
        <small className="text-[10px]">
          Coded by{" "}
          <em className="text-pink-500 dark:text-lime-300">Sunag Arigala</em>
        </small>
      </section>
    </main>
  );
};

export default WeatherNow;
