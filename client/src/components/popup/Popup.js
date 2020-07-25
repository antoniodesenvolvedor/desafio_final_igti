import React, { useState, useEffect } from "react";
import css from "./popup.module.css";
import cssApp from "../../app.module.css";
import Modal from "react-modal";
import TransApi from "../../services/transactionApi";

Modal.setAppElement("#root");

export default function Popup({
  showModal,
  handleShowModal,
  data,
  title,
  loadTransactions,
  handleSetData,
}) {
  const closeModal = () => {
    handleShowModal(false);
  };

  const handleChangeInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    const newValue = Object.assign({}, data);
    newValue[id] = value;
    handleSetData(newValue);
  };

  const handleChangeRadio = (e) => {
    const id = e.target.id;
    let value = "";
    switch (id) {
      case "plus":
        value = "+";
        break;
      case "minus":
        value = "-";
        break;
      default:
        value = "";
    }

    const newValue = Object.assign({}, data);
    newValue.type = value;
    handleSetData(newValue);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!data.yearMonthDay) {
      return;
    }

    const newValue = Object.assign({}, data);
    const [year, month, day] = data.yearMonthDay.split("-");
    newValue.yearMonth = year + "-" + month;
    newValue.month = month;
    newValue.year = year;
    newValue.day = day;

    console.log(newValue);
    try {
      let response = null;
      if (newValue.id) {
        delete newValue.type;
        response = await TransApi.put(`api/transaction/${data.id}`, newValue);
      } else {
        response = await TransApi.post(`api/transaction`, newValue);
      }

      loadTransactions();
      closeModal();

      console.log("Response");
      console.log(response);
    } catch (error) {
      console.log("Error");
      console.log(error);
    }
  };

  return (
    <Modal isOpen={showModal} style={customStyles}>
      <div>
        <div className={css.titleContainer}>
          <div className={css.title}>{title}</div>
          <div className={css.title}>
            <div
              onClick={closeModal}
              className="waves-effect waves-light btn-small red"
            >
              <i className="material-icons">add</i>
            </div>
          </div>
        </div>
        <div className={css.innerBorder}>
          <form onSubmit={handleSave}>
            <div className={css.radio}>
              <label>
                <input
                  name="grupotipo"
                  type="radio"
                  checked={data.type === "-" || data.type === ""}
                  onChange={handleChangeRadio}
                  id="minus"
                  disabled={data.id}
                />
                <span>Despesa</span>
              </label>
              <label style={{ marginLeft: "15px" }}>
                <input
                  name="grupotipo"
                  type="radio"
                  id="plus"
                  checked={data.type === "+"}
                  onChange={handleChangeRadio}
                  disabled={data.id}
                />
                <span>Receita</span>
              </label>
            </div>
            <div className="input-field">
              <input
                id="description"
                type="text"
                value={data.description}
                className="validate"
                onChange={handleChangeInput}
                required
              />
              <label hmltfor="descricao" className="active">
                Descrição:
              </label>
            </div>
            <div className="input-field">
              <input
                id="category"
                type="text"
                value={data.category}
                className="validate"
                onChange={handleChangeInput}
                required
              />
              <label hmltfor="categoria" className="active">
                Categoria:
              </label>
            </div>
            <div className="input-field">
              <input
                id="value"
                type="number"
                value={data.value}
                className="validate"
                onChange={handleChangeInput}
              />
              <label hmltfor="valor" className="active">
                Valor:
              </label>
              <div className="input-field">
                <input
                  id="yearMonthDay"
                  type="date"
                  value={data.yearMonthDay}
                  className="validate"
                  onChange={handleChangeInput}
                  required
                />
              </div>
            </div>
            <input
              className="waves-effect waves-light btn"
              type="submit"
              value="Salvar"
            />
          </form>
        </div>
      </div>
    </Modal>
  );
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "75%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
