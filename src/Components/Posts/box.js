import React from "react";
import "./box.scss";
import axios from "axios";
export default function Box(props) {
  axios
    .get(
      "https://www.hadithapi.com/api/hadiths?apiKey=$2y$10$ibAptVE2DF5023ErmcjcOoJH5G66yLL1a0sYwonI20s1g6FwT0u"
    )
    .then((res) => console.log(res.data.hadiths));

  return (
    <article>
      <section className="article-container">{}</section>
    </article>
  );
}
