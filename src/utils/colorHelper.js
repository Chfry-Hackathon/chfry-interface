export function calcColor(min, max, val) {
  let minHue = 0,
    maxHue = 240;
  const curPercent = (val - min) / (max - min);
  const colString = "hsl(" + (curPercent * (maxHue - minHue) + minHue) + ",100%,50%)";
  return colString;
}

export function setColor(num) {
  const numbers = Number(parseInt(num));
  if (numbers < 1.8) {
    return "rgba(253, 0, 0,6)";
  }
  return "green";
}
