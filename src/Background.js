import React from "react";
import { useState, useEffect } from "react";
import sample1 from "./assets/sample1.mp4";
import sample2 from "./assets/sample2.mp4";
import sample3 from "./assets/sample3.mp4";
import sample4 from "./assets/sample4.mp4";
import sample5 from "./assets/sample5.mp4";
import sample6 from "./assets/sample6.mp4";
import sample7 from "./assets/sample7.mp4";
import sample8 from "./assets/sample8.mp4";
import sample9 from "./assets/sample9.mp4";
import sample10 from "./assets/sample10.mp4";
import sample11 from "./assets/sample11.mp4";
import sample12 from "./assets/sample12.mp4";

const samepleVideos = [
  sample1,
  sample2,
  sample3,
  sample4,
  sample5,
  sample6,
  sample7,
  sample8,
  sample9,
  sample10,
  sample11,
  sample12,
];

export default function Background() {
  const [video, currentVideo] = useState();

  useEffect(() => {
    const random = Math.floor(Math.random() * samepleVideos.length);
    console.log(random);
    currentVideo(samepleVideos[random]);
  }, []);

  return (
    <div className="background">
      <video src={video} autoPlay loop muted />
    </div>
  );
}
