import * as d3 from "d3";
import * as fc from "d3fc";
import statsGenerator from './statsGenerator';

function createAxes(thing) {
  // define vars
  const walterId = thing.props.props.walterId;
  const alecId = thing.props.props.alecId;
  const zachId = thing.props.props.zachId;
  const height = thing.props.props.height;
  const width = thing.props.props.width;
  const margin = thing.props.props.margin;
  let stats = thing.props.props.stats;
  let attribute = thing.props.attribute;

  let broStats = statsGenerator(stats, walterId, zachId, alecId, attribute);

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
    .domain([d3.min([...broStats.z, ...broStats.a, ...broStats.w, ...broStats.o], d => d.val), d3.max([...broStats.z, ...broStats.a, ...broStats.w, ...broStats.o], d => d.val)])
    .range([height - margin.bottom, margin.top])
    .interpolate(d3.interpolateRound);

  // generate the actual axes using the dom refs
  d3.select(thing.xRef.current).call(xAxis).node()
  d3.select(thing.yRef.current).call(yAxis).node()
}

export default createAxes;
