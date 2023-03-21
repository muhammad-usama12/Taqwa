import React, { useState, useEffect } from "react";
import "./box.scss";
import axios from "axios";

export default function Box(props) {
  const [data, setData] = useState("");
  const [filter, setFilter] = useState("");
  const [meta, setMeta] = useState("");
  const [random, setRandom] = useState(Math.floor(Math.random() * 7563));

  const handleClick = async () => {
    newHadith();
  };

  useEffect(() => {
    const fetchHadith = async () => {
      const res = await axios.get(
        "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-muslim.json"
      );
      const filter = res.data.hadiths[random - 1];
      setFilter(filter);
    };
    fetchHadith();
  }, [random]);

  const newHadith = () => {
    const randomNum = Math.floor(Math.random() * 7563);
    setRandom(randomNum);
  };

  useEffect(() => {
    if (filter) {
      setData(filter.text);
      setMeta(
        `Book: ${filter.reference.book} Hadith: ${filter.reference.hadith}`
      );
    }
  }, [filter]);

  return (
    <div>
      <article>
        {}
        <p>{data}</p>
        <br></br>
        <h6>{meta}</h6>
        <button onClick={handleClick}>Randomizer</button>
      </article>
    </div>
  );
}
