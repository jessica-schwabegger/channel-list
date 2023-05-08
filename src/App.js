import './App.css';
import moment from 'moment';
import { useEffect, useState } from "react";
import { EpisodeDescription } from './components/EpisodeDescription';

function App() {
  const [scheduleData, setScheduleData] = useState();

  useEffect(() => {
    const getChannels = async () => {
      const data = await fetch("https://api.sr.se/api/v2/scheduledepisodes?channelid=164&format=json");
      const response = await data.json();
      setScheduleData(response.schedule);
    };

    getChannels();
  },[]);

  const formatTime = (date) => {
    const formatted =  moment(date).format();
    const newDate = new Date(formatted);

    const options = {
      hour: "2-digit",
      minute: "2-digit",
    };
    return newDate.toLocaleString("en-GB", options);
  }

  return (
    <div className="App">
      <h1>Tablå</h1>
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
