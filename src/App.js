import React from 'react';
import * as d3 from "d3";
import * as fc from "d3fc";
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Card, CardHeader, CardContent, CardActions, Typography } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import createAxes from './axesCreator';
import statsGenerator from './statsGenerator';
import LineChart from './components/LineChart';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      stats: [],
      error: false,
      height: 400,
      width: 1200,
      margin: {left: 30, top: 30, right: 30, bottom: 30},
      alecId: '76561198160373236',
      walterId: '76561198032655243',
      zachId: '76561198065784767',
      attribute: 'goals'
    };
    this.useStyles = this.useStyles.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.xRef = React.createRef();
    this.yRef = React.createRef();
  }

  componentDidMount() {
    // get data from server
    let items = fetch('https://still-anchorage-53867.herokuapp.com/stats')
      // convert response data to json
      .then(response => response.json())
      .then((jsonData) => {
        let results = jsonData.results;
        results.sort((d,f) => {return(parseInt(d.date) - parseInt(f.date))});
        results = results.map(d => {
          let datatemp = new Date(parseInt(d.date));
          d.dateLabel = (datatemp.getMonth() + 1) + "/" + datatemp.getDate();
          return d;
        });
        this.setState({
          loading: false,
          stats: results
        });
        // create the axes
        createAxes(this);
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

  handleChange(event) {
    console.log(event);
    this.setState({
      attribute: event.target.value
    });
  }

  render() {
    const walterId = this.state.walterId;
    const alecId = this.state.alecId;
    const zachId = this.state.zachId;
    const loading = this.state.loading;
    let stats = this.state.stats;
    stats = stats.map(d => {
      let data = d;
      data.goals = parseFloat(data.goals);
      // data.date = parseInt(data.date);
      return data;
    })
    const error = this.state.error;
    const useStyles = this.useStyles;
    const variable = this.state.attribute;
    const handleChange = this.handleChange;

    const height = this.state.height;
    const width = this.state.width;
    const margin = this.state.margin;

    let broStats = statsGenerator(stats, walterId, zachId, alecId, 'goals');
    let statsTypes;
    if(stats.length>0) {
      statsTypes = Object.keys(stats[0]);
    }

    console.log(statsTypes);

    const x = d3.scaleLinear()
      .domain([0, d3.max(stats, d => d.shooting_percent)])
      .range([height - margin.bottom, margin.top])
      .interpolate(d3.interpolateRound);
      // .padding(0.1)
      // .round(true);

    const y = d3.scaleLinear()
      .domain([0, d3.max(stats, d => d.assists)])
      .range([height - margin.bottom, margin.top])
      .interpolate(d3.interpolateRound);

    const line = d3.line()
      .x(d => (x(d.date) + x.bandwidth()/2 ))
      .y(d => y(d.shots));

    if (loading) {
      return (<p>Loading...</p>)
    } else if (error) {
      return (<p>There was an error</p>)
    } else {
      return (
        <div className={useStyles.root} style={{ padding: 20 }}>
          <FormControl className={useStyles.formControl}>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={variable}
                onChange={handleChange}
              >
              <MenuItem value={'goals'}>Goals</MenuItem>
              {statsTypes.map(d => <MenuItem value={d}>{d}</MenuItem>)}
            </Select>
          </FormControl>

          <LineChart props={this.state} attribute={variable}/>
          <p>Walter = blue</p>
          <p>Zach = green</p>
          <p>Alec = red</p>
          <p>Opponents = gray</p>
          <svg viewBox="0 0 1200 400" style={{maxWidth: width + "px", font: "12px sans-serif"}}>
            {stats.map(d => <circle cx={x(d.shooting_percent)} cy={y(d.assists)} r="2"/>)}
            <g ref={this.xRef}></g>
            <g ref={this.yRef}></g>
          </svg>
        </div>
      )
    }
  }
}

export default App;
