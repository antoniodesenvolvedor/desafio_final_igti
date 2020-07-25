import React, { useState, useEffect } from "react";
import Calendar from "../calendar/Calendar";
import css from "./header.module.css";
import cssApp from "../../app.module.css";
import TransApi from "../../services/transactionApi";
import Spinner from "../spinner/Spinner";
import { promisify } from "util";

export default function Header(props) {
  const {
    intl,
    loadTransactions,
    transactions,
    showSpinner,
    handleShowModal,
    setFilter,
  } = props;

  const [totalTransactions, setTotalTransactions] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);

  const ISOdate = () => {
    const today = new Date();

    return (
      today.getFullYear() +
      "-" +
      today.getMonth().toString().padStart(2, "0") +
      "-" +
      today.getDate()
    );
  };

  const handleNew = () => {
    const title = "Inclusão de Lançamento";

    const data = {};
    data.type = "-";
    data.description = "";
    data.category = "";
    data.value = 0;
    data.yearMonthDay = ISOdate();

    handleShowModal(true, data, title);
  };

  const [yearMonthList, setYearMonthList] = useState([]);

  const nomeMeses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  const handleLoadTransactions = (value) => {
    const month = yearMonthList[value].month;
    const year = yearMonthList[value].year;
    loadTransactions(month, year);
  };

  const handleFilter = (e) => {
    const value = e.target.value;

    setFilter(value);
  };

  useEffect(() => {
    async function getMonthYearList() {
      try {
        const { data } = await TransApi.get("/api/transaction/monthYear");
        data.forEach((element, index) => {
          data[index].name = `${nomeMeses[element.month - 1]}/${element.year}`;
        });
        setYearMonthList(data);
      } catch (error) {
        console.log("erro" + error);
      }

      setShowCalendar(true);
      loadTransactions();
    }
    getMonthYearList();
  }, []);

  useEffect(() => {
    const totalTransactions = transactions.reduce((total, current) => {
      return total + 1;
    }, 0);

    const totalIncome = transactions.reduce((total, current) => {
      return total + (current.type === "+" ? current.value : 0);
    }, 0);

    const totalExpense = transactions.reduce((total, current) => {
      return total + (current.type === "-" ? current.value : 0);
    }, 0);

    setTotalTransactions(totalTransactions);
    setIncome(totalIncome);
    setExpense(totalExpense);
  }, [transactions]);

  if (!showCalendar) {
    return <Spinner />;
  } else {
    return (
      <div>
        <div className={css.header}>Bootcamp Full Stack - Desafio Final</div>
        <div className={css.header2}>Controle Financeiro Pessoal</div>

        <Calendar
          yearMonthList={yearMonthList}
          onChange={handleLoadTransactions}
        />

        {!showSpinner && (
          <div>
            <div className={css.headerContainer}>
              <div>
                <span className={cssApp.label}>Lançamentos: </span>
                <span className={cssApp.labelContent}>
                  {totalTransactions}{" "}
                </span>
              </div>
              <div>
                <span className={cssApp.label}>Receitas: </span>
                <span className={[cssApp.label, cssApp.blue].join(" ")}>
                  {intl.format(income)}
                </span>
              </div>
              <div>
                <span className={cssApp.label}>Despesas: </span>
                <span className={[cssApp.label, cssApp.red].join(" ")}>
                  {intl.format(expense)}
                </span>
              </div>
              <div>
                <span className={cssApp.label}>Saldo: </span>
                <span
                  className={[
                    income - expense < 0 ? cssApp.red : cssApp.blue,
                    cssApp.label,
                  ].join(" ")}
                >
                  {intl.format(income - expense)}
                </span>
              </div>
            </div>
            <div className={[cssApp.flexRow, cssApp.botaoPesquisa].join(" ")}>
              <div
                className="waves-light btn"
                style={{ marginRight: "15px", width: "225px" }}
                onClick={handleNew}
              >
                + NOVO LANÇAMENTO
              </div>
              <div className={"input-field"} style={{ width: "100%" }}>
                <input
                  placeholder="Filtro"
                  id="Filtro"
                  type="text"
                  className="active"
                  onChange={handleFilter}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
