import React, {Component} from 'react';
import './App.css';
import Chart from './components/chart'
import $ from "jquery"
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, LineMarkSeries} from 'react-vis';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getFile(filePath) {
        return $.ajax({
            async: false,
            url: 'http://localhost:8081/get_file',
            type: 'POST',
            data: JSON.stringify(filePath),
            contentType: 'application/json;charset=UTF-8',
            success: function (res) {
                return res;
                },
            error: function (err) {
                console.log(err.statusText);
            }
        });
    }

    render() {
        let f = this.getFile("./data/LoanStats3a_2.csv").responseJSON;
        let mo_dct = {};
        let mo_counts = {};
        for(let i=0; i < f.length; i++) {
            const t = f[i];
            const mo = t["issue_d"];

            if (mo in mo_dct) {
                mo_dct[mo] += parseInt(t["loan_amnt"]);
                mo_counts[mo] += 1
            } else {
                mo_dct[mo] = parseInt(t["loan_amnt"]);
                mo_counts[mo] = 1;
            }
        }

        let yr_dct = {};
        for (let key in mo_dct) {
            const yr = key.slice(-3);
            if (yr in yr_dct) {
                yr_dct[yr] += mo_dct[key];
            } else {
                yr_dct[yr] = mo_dct[key];
            }
        }

        const data = [
            {x: 0, y: yr_dct["07\n"]},
            {x: 1, y: yr_dct["08\n"]},
            {x: 2, y: yr_dct["09\n"]},
            {x: 3, y: yr_dct["10\n"]},
            {x: 4, y: yr_dct["11\n"]}];

        const Chart = () => (
            <XYPlot width={window.innerWidth - 25} height={window.innerHeight - 50}>
                <XAxis tickValues={[0, 1, 2, 3, 4]}/>
                <YAxis/>
                <HorizontalGridLines />
                <LineMarkSeries data={data} />
            </XYPlot>
        );

        return (
            <div className="App">
                <Chart /> Yearly Total Loans
            </div>
        );
    }
}

export default App;