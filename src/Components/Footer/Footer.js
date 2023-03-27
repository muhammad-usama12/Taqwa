import React from "react";
import "./Footer.scss";

export default function Footer(props) {
  return (
    <footer>
      <span>
        @ 2023{" "}
        <a
          href="https://github.com/muhammad-usama12/Taqwa"
          target={"_blank"}
          rel="noreferrer"
        >
          Taqwa
        </a>{" "}
        by{" "}
        <a
          href="https://github.com/muhammad-usama12"
          target={"_blank"}
          rel="noreferrer"
        >
          Muhammad Usama
        </a>{" "}
      </span>
    </footer>
  );
}
