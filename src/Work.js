import React, { Component } from "react";
import Table from "./Table";

export default class Work extends Component {
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

        this.setState({ object: mainList });
        // console.log(this.state.object)

        const table = document.createElement("table");
        const header = document.createElement("tr");
        const first = document.createElement("th");
        first.appendChild(document.createTextNode("Tarih"));
        const second = document.createElement("th");
        second.appendChild(document.createTextNode("Toplam Miktar"));
        const third = document.createElement("th");
        third.appendChild(document.createTextNode("Toplam Fiyat"));
        const fourth = document.createElement("th");
        fourth.appendChild(document.createTextNode("Ağırlıklı Ortalama Fiyat"));

        header.appendChild(first);
        header.appendChild(second);
        header.appendChild(third);
        header.appendChild(fourth);

        table.appendChild(header);

        for (var a = 0; a < mainList.length; a++) {
          var row = document.createElement("tr");
          var first1 = document.createElement("th");

          var date =
            mainList[a].conract.substr(4, 2) +
            "." +
            mainList[a].conract.substr(2, 2) +
            ".20" +
            mainList[a].conract.substr(0, 2) +
            " " +
            mainList[a].conract.substr(6, 2) +
            ":00";
          this.setState({ dates: date });
          first1.appendChild(document.createTextNode(date));
          var second1 = document.createElement("th");
          second1.appendChild(
            document.createTextNode(mainList[a].quantity.toFixed(2))
          );
          var Fquantity = mainList[a].quantity.toFixed(2);
          this.setState({ Fquantity: Fquantity });
          var third1 = document.createElement("th");
          third1.appendChild(
            document.createTextNode(mainList[a].price.toFixed(2))
          );
          var FPrice = mainList[a].price.toFixed(2);
          this.setState({ FPrice: FPrice });
          var fourth1 = document.createElement("th");
          fourth1.appendChild(
            document.createTextNode(
              (mainList[a].price / PHDates.length).toFixed(2)
            )
          );
          var weight = (mainList[a].price / PHDates.length).toFixed(2);
          this.setState({ Weight: weight });

          row.appendChild(first1);
          row.appendChild(second1);
          row.appendChild(third1);
          row.appendChild(fourth1);

          table.appendChild(row);
        }

        const currentDiv = document.getElementById("x");
        currentDiv.appendChild(table);
      });
  }

  render() {
    return (
      <div id="x">
        <Table
          dates={this.state.dates}
          Fquantity={this.state.Fquantity}
          FPrice={this.state.FPrice}
        />
      </div>
    );
  }
}
