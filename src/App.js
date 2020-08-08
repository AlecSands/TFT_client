import React from 'react';
import logo from './logo.svg';
import * as d3 from "d3";
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Card, CardHeader, CardContent, CardActions, Typography } from '@material-ui/core';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      stats: [],
      error: false
    }
    this.useStyles = this.useStyles.bind(this);
  }

  componentDidMount() {
    let items = fetch('https://still-anchorage-53867.herokuapp.com/stats')
      .then(response => response.json())
      .then((jsonData) => {
        this.setState({
          loading: false,
          stats: jsonData.results
        });
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
    const stats = this.state.stats;
    const error = this.state.error;
    const useStyles = this.useStyles;
    // console.log(stats);
    const shots = stats.map(d => d.shots);
    console.log(shots);
    console.log([d3.min(shots), d3.mean(shots), d3.max(shots)]);

    const height = 400;
    const width = 400;
    const margin = {top: 20, bottom: 20, left: 20, right: 20}

    const x = d3.scaleBand()
      .domain(stats.map(d => d.date))
      .range([margin.left, height - margin.right])
      .padding(0.1)
      .round(true);

    const y = d3.scaleLinear()
      .domain([0, d3.max(stats, d => d.shots)])
      .range([margin.top, width - margin.bottom])
      .interpolate(d3.interpolateRound);

    if (loading) {
      return (<p>Loading...</p>)
    } else if (error) {
      return (<p>There was an error</p>)
    } else {
      return (
        <div className={useStyles.root} style={{ padding: 20 }}>
          <svg viewBox="0 0 400 400" style={{maxWidth: width + "px", font: "12px sans-serif"}}>
            <g fill="steelblue">
              {stats.map(d => <rect y={y(d3.max(stats, d => d.shots)) - y(d.shots)} x={x(d.date)} height={y(d.shots)} width={x.bandwidth()}></rect>)}
            </g>
            <g fill="white" textAnchor="end" transform={"translate(" + (x.bandwidth() / 2) + ", 10)"}>
              {stats.map(d => <text y={y(d3.max(stats, d => d.shots)) - y(d.shots)} x={x(d.date)} dy="0.35em">{d.shots}</text>)}
            </g>
          </svg>
        </div>
      )
      // return (
      //   <div className={useStyles.root} style={{ padding: 20 }}>
      //     <svg viewBox="0 0 400 400" style={{maxWidth: width + "px", font: "10px sans-serif"}}>
      //       <g fill="steelblue">
      //         {stats.map(d => <rect y={y(d.date)} x={x(0)} width={x(d.shots) - x(0)} height={y.bandwidth()}></rect>)}
      //       </g>
            // <g fill="white" textAnchor="end" transform={"translate(-6," + (y.bandwidth() / 2) + ")"}>
            //   {stats.map(d => <text y={y(d.date)} x={x(d.shots)} dy="0.35em">{d.shots}</text>)}
            // </g>
      //     </svg>
      //   </div>
      // )
    }
  }
}

export default App;
