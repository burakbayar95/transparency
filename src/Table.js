import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Work from "./Work";

export default class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ex: [],
      dates: [],
      Fquantity: [],
      FPrice: [],
      Weight: [],
    };
  }
  componentDidMount() {
    fetch(
      "https://seffaflik.epias.com.tr/transparency/service/market/intra-day-trade-history?endDate=2020-02-26&startDate=2020-02-25"
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ ex: data.body.intraDayTradeHistoryList });
        const PHitems = this.state.ex.filter(
          (elem) => elem.conract.substr(0, 2) === "PH"
        );
        const PHDates = PHitems.map((element) => element.conract.substr(2));
        var distinctDates = [...new Set(PHDates)];

        var mainList = [];
        for (var i = 0; i < distinctDates.length; i++) {
          var price = 0;
          var quantity = 0;
          var num = 0;
          for (var j = 0; j < PHDates.length; j++) {
            if (distinctDates[i] === PHDates[j]) {
              num += 1;
              price += (PHitems[j].price * PHitems[j].quantity) / 10;
              quantity += PHitems[j].quantity / 10;
            }
          }
          var obj = {
            conract: distinctDates[i],
            price: price,
            quantity: quantity,
            num: num,
          };
          mainList.push(obj);
        }

        const dates = this.state.dates;
        const Fquantity = this.state.Fquantity;
        const FPrice = this.state.FPrice;
        const Weight = this.state.Weight;

        for (var a = 0; a < mainList.length; a++) {
          var date =
            mainList[a].conract.substr(4, 2) +
            "." +
            mainList[a].conract.substr(2, 2) +
            ".20" +
            mainList[a].conract.substr(0, 2) +
            " " +
            mainList[a].conract.substr(6, 2) +
            ":00";

          dates.push(date);
          Fquantity.push(mainList[a].quantity.toFixed(2));
          FPrice.push(mainList[a].price.toFixed(2));
          Weight.push(
            ((mainList[a].price * mainList[a].num) / PHDates.length).toFixed(2)
          );
        }
        this.setState({ FPrice });
        this.setState({ dates });
        this.setState({ Fquantity });
        this.setState({ Weight });
      });
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Tarih</th>
            <th scope="col">Toplam Miktar</th>
            <th scope="col">Toplam Fiyat</th>
            <th scope="col">Ağırlıklı Ortalama Fiyat</th>
          </tr>
        </thead>
        <tbody>
          <tr></tr>
          <Work
            dates={this.state.dates}
            Fquantity={this.state.Fquantity}
            FPrice={this.state.FPrice}
            Weight={this.state.Weight}
          />
        </tbody>
      </table>
    );
  }
}
