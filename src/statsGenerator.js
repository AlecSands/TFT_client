import * as d3 from "d3";
import * as fc from "d3fc";

function statsGenerator (stats, walterId, zachId, alecId, attr) {
  const walterStats = stats.filter(d => d.player === walterId);
  const alecStats = stats.filter(d => d.player === alecId);
  const zachStats = stats.filter(d => d.player === zachId);
  const oStats = stats.filter(d => d.player !== walterId && d.player !== zachId && d.player !== alecId);

  const walterShotsData = walterStats.map(d => {return {date: d.date, val: d[attr], dateLabel: d.dateLabel}});
  const alecShotsData = alecStats.map(d => {return {date: d.date, val: d[attr], dateLabel: d.dateLabel}});
  const zachShotsData = zachStats.map(d => {return {date: d.date, val: d[attr], dateLabel: d.dateLabel}});
  const oShotsData = oStats.map(d => {return {date: d.date, val: d[attr], dateLabel: d.dateLabel}});

  function calcDAve (pData) {
    let newData = [];
    let date = 0;
    let val = 0;
    let dateLabel = "";
    let tempVal = [];
    for (let i=0; i<pData.length; i++) {
      if (i === pData.length-1) {
        tempVal.push(pData[i].val);
        val = d3.mean(tempVal);
        newData.push({date: date, val: val, dateLabel: dateLabel});
      } else if (i === 0){
        date = pData[i].date;
        tempVal = [pData[i].val];
        dateLabel = pData[i].dateLabel;
      } else if (pData[i].dateLabel === dateLabel) {
        tempVal.push(pData[i].val);
      } else {
        tempVal.push(pData[i].val);
        val = d3.mean(tempVal);
        newData.push({date: date, val: val, dateLabel: dateLabel});
        date = pData[i].date;
        val = 0;
        tempVal = [pData[i].val];
        dateLabel = pData[i].dateLabel;
      }
    }
    return newData;
  }

  const wData = calcDAve(walterShotsData);
  const aData = calcDAve(alecShotsData);
  const zData = calcDAve(zachShotsData);
  const oData = calcDAve(oShotsData);
  return{z: zData, a: aData, w: wData, o: oData};
}

export default statsGenerator;
