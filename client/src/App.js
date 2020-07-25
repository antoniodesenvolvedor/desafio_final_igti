import React, { useState, useEffect, useLayoutEffect } from "react";

import css from "./app.module.css";
import Card from "./components/card/Card";
import TransApi from "./services/transactionApi";
import Header from "./components/header/Header";
import Spinner from "./components/spinner/Spinner";
import Popup from "./components/popup/Popup";

const intl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const dateTimeFormat = new Intl.DateTimeFormat("pt-BR");

export default function App() {
  let day = 0;

  const [transactions, setTransactions] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  let curMonth = 1;
  let curYear = 2019;
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({});
  const [title, setTitle] = useState("");
  const [rawTransactions, setRawTransactions] = useState([]);

  const loadTransactions = async (month = curMonth, year = curYear) => {
    setShowSpinner(true);
    curMonth = month;
    curYear = year;
    try {
      const response = await TransApi.get(
        `/api/transaction?month=${month}&year=${year}`
      );
      setRawTransactions(response.data);
      setTransactions(response.data);
      setShowSpinner(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSetData = (dataBody) => {
    setData(dataBody);
  };

  const setFilter = (param) => {
    const newTransactions = rawTransactions.filter((element) => {
      return (
        element.description.toLowerCase().indexOf(param.toLowerCase()) !== -1
      );
    });

    setTransactions(newTransactions);
  };

  const handleShowModal = (show, dataBody, title) => {
    setShowModal(show);
    if (show) {
      handleSetData(dataBody);
      setTitle(title);
    }
  };

  return (
    <div className={css.container}>
      <Popup
        showModal={showModal}
        handleShowModal={handleShowModal}
        data={data}
        loadTransactions={loadTransactions}
        handleSetData={handleSetData}
        title={title}
      />

      <Header
        intl={intl}
        loadTransactions={loadTransactions}
        transactions={transactions}
        showSpinner={showSpinner}
        handleShowModal={handleShowModal}
        dateTimeFormat={dateTimeFormat}
        setFilter={setFilter}
      />

      {showSpinner ? (
        <Spinner />
      ) : (
        transactions.map((element, index) => {
          let hr = false;
          if (day !== element.day) {
            if (day !== 0) {
              hr = true;
            }
            day = element.day;
          }
          return (
            <div key={index}>
              {hr && <div className={css.div}></div>}
              <Card
                loadTransactions={loadTransactions}
                ob={element}
                intl={intl}
                handleShowModal={handleShowModal}
              />
            </div>
          );
        })
      )}
    </div>
  );
}
