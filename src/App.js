import React from 'react';
import logo from './logo.svg';
import * as d3 from "d3";
import * as fc from "d3fc";
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Card, CardHeader, CardContent, CardActions, Typography } from '@material-ui/core';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      stats: [],
      error: false,
      height: 400,
      width: 400,
      margin: {left: 30, top: 30, right: 30, bottom: 30}
    };
    this.xRef = React.createRef();
    this.yRef = React.createRef();
    this.useStyles = this.useStyles.bind(this);
  }

  componentDidMount() {
    let items = fetch('https://still-anchorage-53867.herokuapp.com/stats')
      .then(response => response.json())
      .then((jsonData) => {
        let results = jsonData.results;
        results.sort((d,f) => {return(parseInt(d.date) - parseInt(f.date))});
        results = results.map(d => {
          let data = d;
          data.date = new Date(parseInt(data.date));
          data.date = (data.date.getMonth() + 1) + "/" + data.date.getDate() + " - " + data.date.getHours() + ":" + data.date.getMinutes();
          return data;
        });
        this.setState({
          loading: false,
          stats: results
        });
        const height = this.state.height;
        const width = this.state.width;
        const margin = this.state.margin;
        const stats = this.state.stats;
        const xAxis = g => g
          .attr("transform", "translate(0, " + (height - margin.bottom) + ")")
          .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));
        const yAxis = g => g
          .attr("transform", "translate("+margin.left+", 0)")
          .call(d3.axisLeft(y).ticks(width / 80).tickSizeOuter(0));

        const x = d3.scaleBand()
          .domain(stats.map(d => d.date))
          .range([margin.left, width - margin.right]);

        const y = d3.scaleLinear()
          .domain([0, d3.max(stats, d => d.shots)])
          .range([height - margin.bottom, margin.top])
          .interpolate(d3.interpolateRound);

        d3.select(this.xRef.current).call(xAxis).node()
        d3.select(this.yRef.current).call(yAxis).node()
      })
      .catch((error) => {
        console.error(error.message)
        this.setState({error: true})
      });
  }

  useStyles(event) {
    makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    }));
  }

  render() {
    const loading = this.state.loading;
    let stats = this.state.stats;
    const error = this.state.error;
    const useStyles = this.useStyles;
    console.log(stats);

    const height = this.state.height;
    const width = this.state.width;
    const margin = this.state.margin;

    const x = d3.scaleBand()
      .domain(stats.map(d => d.date))
      .range([margin.left, width - margin.right]);
      // .padding(0.1)
      // .round(true);

    const y = d3.scaleLinear()
      .domain([0, d3.max(stats, d => d.shots)])
      .range([height - margin.bottom, margin.top])
      .interpolate(d3.interpolateRound);

    const abstractLine = d3.line()
      .x(d => (x(d.date) + x.bandwidth()/2 ))
      .y(d => y(d.val));

    const shotsData = stats.map(d => {return {date: d.date, val: d.shots}});

    const abstractLineD = abstractLine(shotsData);

    const line = d3.line()
      .x(d => (x(d.date) + x.bandwidth()/2 ))
      .y(d => y(d.shots));

    const thisLine = line(stats);

    const lineA = d3.line()
      .x(d => (x(d.date) + x.bandwidth()/2 ))
      .y(d => y(d.assists));

    const thisLineA = lineA(stats);

    const lineS = d3.line()
      .x(d => (x(d.date) + x.bandwidth()/2 ))
      .y(d => y(d.saves));

    const thisLineS = lineS(stats);

    if (loading) {
      return (<p>Loading...</p>)
    } else if (error) {
      return (<p>There was an error</p>)
    } else {
      return (
        <div className={useStyles.root} style={{ padding: 20 }}>
          <svg viewBox="0 0 400 400" style={{maxWidth: width + "px", font: "12px sans-serif"}}>
            <path d={abstractLineD} fill="none" stroke="steelblue" strokeWidth="1.5" strokeMiterlimit="1"></path>
            <path d={thisLineA} fill="none" stroke="red" strokeWidth="1.5" strokeMiterlimit="1"></path>
            <path d={thisLineS} fill="none" stroke="green" strokeWidth="1.5" strokeMiterlimit="1"></path>
            <g ref={this.xRef}></g>
            <g ref={this.yRef}></g>
          </svg>
        </div>
      )
    }
  }
}

export default App;
