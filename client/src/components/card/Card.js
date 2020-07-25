import React from "react";

import css from "./card.module.css";
import cssApp from "../../app.module.css";
import TransApi from "../../services/transactionApi";

export default function Card(props) {
  const { intl, loadTransactions, handleShowModal, ob } = props;

  const { day, category, description, value, type, yearMonthDay, _id } = ob;

  const colorClass = type === "-" ? cssApp.red : cssApp.blue;

  const handleDelete = async () => {
    const id = props.ob._id;
    try {
      const response = await TransApi.delete("/api/transaction/" + id);
      loadTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    const dataBody = {};
    const title = "Edição de Lançamento";
    dataBody.description = description;
    dataBody.category = category;
    dataBody.value = value;
    dataBody.yearMonthDay = yearMonthDay;
    dataBody.type = type;
    dataBody.id = _id;
    handleShowModal(true, dataBody, title);
  };

  return (
    <div className={css.container}>
      <div className={cssApp.flexRow}>
        <div className={[colorClass, css.titleCard].join(" ")}>{day}</div>
        <div>
          <div className={css.title}>{category}</div>
          <div>{description}</div>
        </div>
      </div>
      <div className={cssApp.flexRow}>
        <div className={css.money}>{intl.format(value)}</div>
        <div className={cssApp.flexRow}>
          <i
            className="material-icons"
            id={css.buttonCreate}
            onClick={handleUpdate}
          >
            create
          </i>
          <i className="material-icons" onClick={handleDelete}>
            delete
          </i>
        </div>
      </div>
    </div>
  );
}
