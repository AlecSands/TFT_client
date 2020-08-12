import React from 'react';
import * as d3 from "d3";
import * as fc from "d3fc";
import createAxes from '../axesCreatorComponent';
import statsGenerator from '../statsGenerator';

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.xRef = React.createRef();
    this.yRef = React.createRef();
  }

  componentDidMount() {
    createAxes(this);
  }

  componentDidUpdate() {
    createAxes(this);
  }

  render() {
    const walterId = this.props.props.walterId;
    const alecId = this.props.props.alecId;
    const zachId = this.props.props.zachId;
    const loading = this.props.props.loading;
    const error = this.props.props.error;

    let stats = this.props.props.stats;

    const height = this.props.props.height;
    const width = this.props.props.width;
    const margin = this.props.props.margin;
    const attribute = this.props.attribute;

    // console.log(this.props.props);
    let broStats = statsGenerator(stats, walterId, zachId, alecId, attribute);

    const abstractLine = d3.line()
      .x(d => (x(d.date) + x.bandwidth()/2 ))
      .y(d => y(d.val));

    const x = d3.scaleBand()
      .domain(broStats.w.map(d => d.date))
      .range([margin.left, width - margin.right]);
      // .padding(0.1)
      // .round(true);

    const y = d3.scaleLinear()
      .domain([0, d3.max([...broStats.z, ...broStats.a, ...broStats.w, ...broStats.o], d => d.val)])
      .range([height - margin.bottom, margin.top])
      .interpolate(d3.interpolateRound);

    const walterLine = abstractLine(broStats.w);
    const alecLine = abstractLine(broStats.a);
    const zachLine = abstractLine(broStats.z);
    const oLine = abstractLine(broStats.o);

    if (loading) {
      return (<p>Loading...</p>)
    } else if (error) {
      return (<p>There was an error</p>)
    } else {
      return (
        <div>
          <h3>average {attribute} per game per day</h3>
          <svg viewBox="0 0 1200 400" style={{maxWidth: width + "px", font: "12px sans-serif"}}>
            <path d={walterLine} fill="none" stroke="steelblue" strokeWidth="1.5" strokeMiterlimit="1"></path>
            <path d={alecLine} fill="none" stroke="red" strokeWidth="1.5" strokeMiterlimit="1"></path>
            <path d={zachLine} fill="none" stroke="green" strokeWidth="1.5" strokeMiterlimit="1"></path>
            <path d={oLine} fill="none" stroke="lightgray" strokeWidth="1.5" strokeMiterlimit="1"></path>
            <g ref={this.xRef}></g>
            <g ref={this.yRef}></g>
          </svg>
        </div>
      )
    }
  }
}

export default LineChart;
