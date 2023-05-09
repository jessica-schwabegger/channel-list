import './App.css';
import moment from 'moment';
import { useEffect, useState } from "react";
import { EpisodeDescription } from './components/EpisodeDescription';
import { Button } from './components/Button';

function App() {
  const todaysDate = new Date().toLocaleDateString("sv-SE");
  const [scheduleData, setScheduleData] = useState();
  const [counter, setCounter] = useState(0);
  const [dateToDisplay, setDateToDisplay] = useState(todaysDate);
  const [disableNext, setDisableNext] = useState(false);
  const [disablePrevious, setDisablePrevious] = useState(true);


  const getDateToDisplay = () => {
    let date = new Date();
    date.setDate(date.getDate() + counter);
    setDateToDisplay(date.toLocaleDateString("sv-SE"));
  };

  useEffect(() => {
    getDateToDisplay();
    limitToSevenDays(counter);
    const getEpisodes = async () => {
      const data = await fetch(`https://api.sr.se/api/v2/scheduledepisodes?channelid=164&date=${dateToDisplay}&format=json`);
      const response = await data.json();
      setScheduleData(response.schedule);
    };

    getEpisodes();
  },[counter]);

  const formatTime = (fullDate) => {
    const formatted =  moment(fullDate).format();
    const newDate = new Date(formatted);

    const options = {
      hour: "2-digit",
      minute: "2-digit",
    };
    return newDate.toLocaleString("sv-SE", options);
  };

  const limitToSevenDays = (counter) => {
    if (counter === 7) {
      setDisableNext(true);
    } else {
      setDisableNext(false);
    }

    if (counter !== 0) {
      setDisablePrevious(false);
    } else {
      setDisablePrevious(true);
    }
  }

  return (
    <div className="App">
        <h1>Tablå</h1>
      <div className="select-date-section">
        <p>Datum: {dateToDisplay}</p>
        <div>
          <Button
            disabled={disablePrevious}
            className={disablePrevious ? "disabled-button" : null}
            onClick={() => setCounter(counter - 1)}>
              Föregående
          </Button>
          <Button
            disabled={disableNext}
            className={disableNext ? "disabled-button" : null}
            onClick={() => setCounter(counter + 1)}>
            Nästa
          </Button>
        </div>
      </div>
      {scheduleData && (
        scheduleData.map((episode, index) => (
          <div className="episode-wrapper" key={index}>
            <div className="episode-row-section">
              <h3>{episode.title}</h3>
              <p>{formatTime(episode.starttimeutc)}</p>
            </div>
            <div className="episode-row-section">
              <EpisodeDescription description={episode.description} />
              <img src={episode.imageurl} alt="episode image"/>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
