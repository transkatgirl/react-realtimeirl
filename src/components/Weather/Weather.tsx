import { Suspense } from 'react';
import { SvgLoader } from 'react-svgmt';

import valueFormatter from '@functions/valueFormatter';

import flagStore from '@store/flagStore';
import globalStore from '@store/globalStore';

import './Weather.scss';

const Weather = () => {
  const { useImperial } = flagStore.get();
  const { locationData } = globalStore.get();

  const icon = `assets/${locationData?.weather?.[0]?.icon}.svg`;
  const max = `assets/cloud-arrow-up.svg`
  const min = `assets/cloud-arrow-down.svg`

  const feels_like = valueFormatter('temperature', locationData.main.feels_like)
  const temp = valueFormatter('temperature', locationData.main.temp)
  const wind = valueFormatter('windspeed', locationData.wind.speed)
  const gust = valueFormatter('windspeed', locationData.wind.gust)

  return (
    <Suspense fallback={<div />}>
      <div className="weather-container">
        <div className="conditions">
          {locationData.weather[0].main} /{' '}
          {locationData.weather[0].description}
        </div>
        <div className="min-max">
          <div className="icon-container">
            <div className="icon-main">
              <SvgLoader path={icon} fill="white" stroke="black" strokeWidth="8px" />
            </div>
          </div>
        </div>
        <div className="current-weather">
          Current: {useImperial ? temp.imperial : temp.metric}
          <br />
          Feels like: {useImperial ? feels_like.imperial : feels_like.metric}
          <br />
          Wind: {useImperial ? wind.imperial : wind.metric} ({useImperial ? gust.imperial : gust.metric})
        </div>
      </div>
    </Suspense>
  );
};

export default Weather;
