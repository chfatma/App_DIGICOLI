import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class App extends Component {
    render() {
        const options = {
            animationEnabled: true,
            title: {
                text: "Satisfaction Client"
            },
            subtitles: [{
                text: "71% Positif",
                verticalAlign: "center",
                fontSize: 24,
                dockInsidePlotArea: true
            }],
            data: [{
                type: "doughnut",
                showInLegend: true,
                indexLabel: "{name}: {y}",
                yValueFormatString: "#,###'%'",
                dataPoints: [
                    { name: "Insatisfait", y: 5, color: "#FF0000" }, // Couleur personnalisée
                    { name: "Très Insatisfait", y: 31, color: "#008000" }, // Couleur personnalisée
                    { name: "Très Satisfait", y: 40, color: "#F26622" }, // Couleur personnalisée
                    { name: "Satisfait", y: 17, color: "#193A69" }, // Couleur personnalisée
                    { name: "Neutre", y: 7, color: "#57471e " } // Couleur personnalisée
                ]
            }]
        }

        return (
            <div>
                <CanvasJSChart options={options}
                    /* onRef={ref => this.chart = ref} */
                />
                {/* Vous pouvez obtenir une référence à l'instance du graphique comme indiqué ci-dessus en utilisant onRef. Cela vous permet d'accéder à toutes les propriétés et méthodes du graphique */}
            </div>
        );
    }
}

export default App;
