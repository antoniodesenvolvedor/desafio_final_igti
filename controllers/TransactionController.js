const Transaction = require('../models/TransactionModel');


module.exports = {


  async getTransaction(req, res) {

    const { month, year } = req.query;


    if (!month || !year) {
      return res.status(400).send("É necessario informar os valores month e year");
    }
    try {
      let result = await Transaction.find({ month, year });

      result.sort((a, b) => {
        return parseInt(a.day) - parseInt(b.day)
      })

      return res.send(result);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async getMonthYear(req, res) {

    try {
      const result = await Transaction.find();
      let monthYear = result.map(({ month, year }) => {
        return JSON.stringify({ month, year });
      })

      let distinctMonthYear = [... new Set(monthYear)];

      distinctMonthYear = distinctMonthYear.map(element => {
        return JSON.parse(element);
      })

      distinctMonthYear.sort((a, b) => {
        if (b.year === a.year) {
          return a.month - b.month;
        }
        else {
          return a.year - b.year;
        }
      })

      return res.send(distinctMonthYear);
    } catch (err) {
      return res.status(400).send(err);
    }


  },
  async postTransaction(req, res) {

    try {
      const result = await Transaction(req.body).save();
      res.send(result);
    } catch (err) {
      res.status(400).send('Erro:' + err);
    }
  },
  async putTransaction(req, res) {

    const id = req.params.id;

    if (!id) {
      return res.send("É necessário informar um ID");
    }

    try {
      const result = await Transaction.findByIdAndUpdate({ _id: id }, req.body, { 'useFindAndModify': false });
      res.send(result);
    } catch (err) {
      res.status(400).send('Erro:' + err);
    }
  },
  async deleteTransaction(req, res) {

    const id = req.params.id;

    if (!id) {
      return res.send("É necessário informar um ID");
    }

    try {
      const result = await Transaction.findByIdAndDelete({ _id: id });
      res.send(result);
    } catch (err) {
      res.status(400).send('Erro:' + err);
    }
  },
}