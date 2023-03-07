// to extract individual hadith for formatting
const apiUrl =
  "https://www.hadithapi.com/api/hadiths?apiKey=$2y$10$ibAptVE2DF5023ErmcjcOoJH5G66yLL1a0sYwonI20s1g6FwT0u";

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    for (const x of data.hadiths.data) {
      console.log(x);
    }
  })
  .catch((error) => {
    console.log(error);
  });
