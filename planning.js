/*
This document serves as a blueprint where all the functionalities were planned before implementation
*/

// to extract individual hadith for formatting
axios
  .get(
    "https://www.hadithapi.com/api/hadiths?apiKey=$2y$10$ibAptVE2DF5023ErmcjcOoJH5G66yLL1a0sYwonI20s1g6FwT0u"
  )
  .then((res) => console.log(res));

// get the current location (coordinates)
const [latitude, setLatitude] = useState(null);
const [longitude, setLongitude] = useState(null);

useEffect(() => {
  navigator.geolocation.getCurrentPosition(function (position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    console.log(latitude);
    console.log(longitude);
  });
}, []);

/*
  API GET request for detecting user's location and showing times relevant to them
  https://api.aladhan.com/v1/calendar/2017/4?latitude=43.8482535&longitude=-79.2611175&method=2http://api.aladhan.com/v1/calendar/2019?latitude=51.508515&longitude=-0.1254872&method=2

  */
