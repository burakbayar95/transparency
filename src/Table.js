import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class Table extends Component {
  render() {
    //console.log(this.props.object)
    //console.log(this.props.ex)
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
        <tr>


          <th scope="row">{this.props.dates}</th>
          <td>{this.props.Fquantity}</td>
          <td>{this.props.FPrice}</td>
          <td>{this.props.Weight}</td>
         



        </tr>
      </tbody>
    </table>

      
    )
  }
}





















/*
import React, { Component } from 'react'

export default function Table() {
  
  
 

    fetch(
        "https://seffaflik.epias.com.tr/transparency/service/market/intra-day-trade-history?endDate=2020-02-26&startDate=2020-02-25"
      )
        .then((res) => res.json())
        .then((data) => {
          const PHitems = data.body.intraDayTradeHistoryList.filter(
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
    
          for(var a=0; a<mainList.length; a++){
            var row = document.createElement("tr");
            var first1 = document.createElement("th");
    
            var date = mainList[a].conract.substr(4,2) +"."+ mainList[a].conract.substr(2,2)+".20"+mainList[a].conract.substr(0,2)+" "+ mainList[a].conract.substr(6,2) +":00";
    
            first1.appendChild(document.createTextNode(date));
            var second1 = document.createElement("th");
            second1.appendChild(document.createTextNode(mainList[a].quantity.toFixed(2)));
            var third1 = document.createElement("th");
            third1.appendChild(document.createTextNode(mainList[a].price.toFixed(2)));
            var fourth1 = document.createElement("th");
            fourth1.appendChild(document.createTextNode((mainList[a].price/PHDates.length).toFixed(2)));
    
            row.appendChild(first1);
            row.appendChild(second1);
            row.appendChild(third1);
            row.appendChild(fourth1);
    
            table.appendChild(row);
    
          }
    
    
      const currentDiv = document.getElementById("x");
      currentDiv.appendChild(table)
        
        });

    return (
        <div id='x'>
            
        </div>
    )
}

*/