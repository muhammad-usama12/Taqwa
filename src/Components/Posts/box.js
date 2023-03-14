import React, { useState, useEffect } from "react";
import "./box.scss";
import axios from "axios";
export default function Box(props) {
  const [data, setData] = useState("");
  const [filter, setFilter] = useState("");
  const [meta, setMeta] = useState("");
  const [random, setRandom] = useState(0);

  // const randomNum = Math.floor(Math.random() * 7563);

  // useEffect(() => {
  //   const fetchHadith = async () => {
  //     try {
  //       const res = await axios.get(
  //         "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-muslim.json"
  //       );
  //       setData(res.data.hadiths[`${randomNum}`].text);
  //     } catch (err) {
  //       console.log("ERROR:", err);
  //     }
  //   };
  // }, []);

  const handleClick = async () => {
    const randomNum = Math.floor(Math.random() * 7563);
    setRandom(randomNum);
    console.log(random);

    // const fetchHadith = async () => {
    //   const res = await axios.get(
    //     "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-muslim.json"
    //   );
    //   setData(res.data);
    //   console.log(data);
    // };
    const res = await axios.get(
      "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-muslim.json"
    );
    // setData(res.data.hadiths[`${random - 1}`].text);
    setFilter(res.data.hadiths[`${random - 1}`]);
    console.log("FILTER VAR:", filter);
    setData(filter.text);
    setMeta(
      `Book: ${filter.reference.book} Hadith: ${filter.reference.hadith}`
    );
    console.log("METADATA:", meta);
    // console.log(res.data.hadiths[`${random}`].text);
  };

  return (
    <article>
      <p>{data}</p>
      <br></br>
      <h6>{meta}</h6>
      <section className="article-container">{}</section>
      <button onClick={handleClick}>Randomizer</button>
    </article>
  );
}
