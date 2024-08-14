import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart1 = () => {
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        title: {
            text: "Support et Résolution des Problèmes"
        },
        data: [{
            type: "pie",
            indexLabel: "{label}: {y}%",        
            startAngle: -90,
            dataPoints: [
                { y: 30, label: "Tickets Résolus", color: "#008000" },
                { y: 25, label: "Tickets En Attente", color: "#193A69" },
                { y: 20, label: "Tickets Rejetés", color: "#FF0000" },
                { y: 15, label: "Tickets en Cours", color: "#F26622" },
                { y: 10, label: "Autres", color: "#57471e " }
            ]
        }]
    }

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <CanvasJSChart options={options} />
        </div>
    );
}

export default Chart1;
