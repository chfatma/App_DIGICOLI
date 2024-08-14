import React, { Component } from "react";
import CanvasJSReact from '@canvasjs/react-stockcharts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { dataPoints: [], isLoaded: false };
  }

  componentDidMount() {
    // Référence : https://reactjs.org/docs/faq-ajax.html#exemple-en-utilisant-les-résultats-ajax-pour-définir-l'état-local
    fetch("https://canvasjs.com/data/gallery/react/btcusd2017-18.json")
      .then(res => res.json())
      .then(
        (data) => {
          var dps = [];
          for (var i = 0; i < data.length; i++) {
            dps.push({
              x: new Date(data[i].date),
              y: Number(data[i].close)
            });
          }
          this.setState({
            isLoaded: true,
            dataPoints: dps
          });
        }
      )
  }

  render() {
    const options = {
      title: {
        text: "Graphique d'analyse des ventes de licences"
      },
      theme: "light2",
      subtitles: [{
        text: "BTC/USD"
      }],
      charts: [{
        axisX: {
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: "MMM DD YYYY"
          }
        },
        axisY: {
          title: "Prix du Bitcoin",
          prefix: "$",
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: "$#,###.##"
          }
        },
        toolTip: {
          shared: true
        },
        data: [{
          name: "Prix (en USD)",
          type: "splineArea",
          color: "#193A69", // Changez selon la couleur désirée
          yValueFormatString: "$#,###.##",
          xValueFormatString: "MMM DD YYYY",
          dataPoints: this.state.dataPoints
        }]
      }],
      navigator: {
        slider: {
          minimum: new Date("2024-05-01"),
          maximum: new Date("2025-05-01")
        }
      }
    };
    const containerProps = {
      width: "100%",
      height: "500px",
      margin: "auto"
    };
    return (
      <div>
        <div>
          {
            // Référence : https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator
            this.state.isLoaded && 
            <CanvasJSStockChart containerProps={containerProps} options={options}
              /* onRef = {ref => this.chart = ref} */
            />
          }
        </div>
      </div>
    );
  }
}

export default App;
