import React, { useState, useEffect } from "react";

export default function Calendar({ yearMonthList, onChange }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [leftArrowEnabled, setLeftArrowEnabled] = useState(true);
  const [rigthArrowEnabled, setRigthArrowEnabled] = useState(false);

  const handleChangeCalendar = (e) => {
    const value = parseInt(e.target.value);
    setSelectedIndex(value);
    onChange(value);
  };

  const handleLeftArrow = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
      onChange(selectedIndex - 1);
    }
  };

  const handleRightArrow = () => {
    if (selectedIndex < yearMonthList.length - 1) {
      setSelectedIndex(selectedIndex + 1);
      onChange(selectedIndex + 1);
    }
  };

  return (
    <div style={styles.container}>
      <div
        className="waves-light btn"
        style={styles.item}
        onClick={handleLeftArrow}
        // disabled={leftArrowEnabled}
      >
        &lt;
      </div>
      <select
        className="browser-default"
        style={styles.calendar}
        onChange={handleChangeCalendar}
        value={selectedIndex}
      >
        {yearMonthList.map((value, index) => {
          return (
            <option key={index} value={index}>
              {value.name}
            </option>
          );
        })}
      </select>
      <div
        className="waves-light btn"
        style={styles.item}
        onClick={handleRightArrow}
      >
        &gt;
      </div>
    </div>
  );
}

const styles = {
  calendar: {
    width: "125px",
    padding: "10px",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
  },
  item: {
    margin: "5px",
  },
};
