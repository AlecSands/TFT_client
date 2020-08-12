import * as d3 from "d3";
import * as fc from "d3fc";
import statsGenerator from './statsGenerator';

function createAxes(thing) {
  // define vars
  const walterId = thing.state.walterId;
  const alecId = thing.state.alecId;
  const zachId = thing.state.zachId;
  const height = thing.state.height;
  const width = thing.state.width;
  const margin = thing.state.margin;
  let stats = thing.state.stats;
  // reformat data to work with d3 axes
  stats = stats.map(d => {
    let data = d;
    data.goals = parseFloat(data.goals);
    return data;
  })

  let broStats = statsGenerator(stats, walterId, zachId, alecId);

  // functions for x and y axes
  const xAxis = g => g
    .attr("transform", "translate(0, " + (height - margin.bottom) + ")")
    .call(d3.axisBottom(x).ticks(width).tickSizeOuter(0));
  const yAxis = g => g
    .attr("transform", "translate("+margin.left+", 0)")
    .call(d3.axisLeft(y).ticks(width / 80).tickSizeOuter(0));

  // define the scales for x and y axes
  const x = d3.scaleBand()
    .domain(broStats.w.map(d => {
      let dataTemp = new Date(parseInt(d.date));
      // console.log(d.date + " " + dataTemp.getDate() + " " + dataTemp);
      let dataFinal = (dataTemp.getMonth() + 1) + "/" + dataTemp.getDate();
      return dataFinal;
    }))
    .range([margin.left, width - margin.right]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(broStats.w, d => d.val)])
    .range([height - margin.bottom, margin.top])
    .interpolate(d3.interpolateRound);

  // generate the actual axes using the dom refs
  d3.select(thing.xRef.current).call(xAxis).node()
  d3.select(thing.yRef.current).call(yAxis).node()
}

export default createAxes;
