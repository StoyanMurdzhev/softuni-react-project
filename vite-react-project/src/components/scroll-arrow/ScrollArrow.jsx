import React from "react";
import styles from "./ScrollArrow.module.css";

export default function ScrollArrow() {

  function handleScroll() {
    const recentRecipesSection = document.querySelector("section");
    if (recentRecipesSection) {
      recentRecipesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.scrollArrow} onClick={handleScroll}>
      <div className={styles.arrow}></div>
    </div>
  );
  
};
