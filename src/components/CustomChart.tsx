import { useTheme } from "styled-components";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend

} from 'chart.js'

import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { CustomChartProps } from "@/types";


  //registrar os componentes necessários do Chart.js.//
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

//CustomChart que será responsável por renderizar diferentes tipos de gráficos//

function CustomChart(props: CustomChartProps){

    const { data, labels, type} = props
    const theme = useTheme()
    const options = {
        responsive: true,
        scaleShowVerticalLinesa: false,
        scales: {
            x:{
                border: {
                    display: false,
                },
                grid: {
                    display: false,
                },
                ticks: {
                    color: theme.typographies.subtitle
                }
            },

            y: {
                border: {
                    display: false,
                },

                grid: {
                    color: theme.appDefaultStroke,
                },

                ticks: {
                    color: theme.typographies.subtitle,
                },
            },
        },
        puglins: {
            legend: {
                display: false,
            },
        }
    }


   // Os dados do gráfico precisam ser formatados de acordo com as expectativas do Chart.js://


    const chartData = {
        labels,
        datasets: [
            {
                data:data,
                borderColor: 'rgb(12,112,242)',
                backgroundColor: 'rgba(12,112,242,1)'
            }
        ]
    }
    return type === 'bar' ? (<Bar options={options} data={chartData} />) :
    (<Line options={options} data={chartData} />) 
}

export default CustomChart