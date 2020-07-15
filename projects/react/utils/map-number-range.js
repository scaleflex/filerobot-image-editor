export  default Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  console.log((this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}