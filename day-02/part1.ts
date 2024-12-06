import { Execute } from './format';

const MIN = 1;
const MAX = 3;

export const execute: Execute = (reports) => {
  return reports.map(report => {
    const dir = Math.sign(report[1] - report[0]);
    let last = report[0];
    for(const n of report.slice(1)) {
      const diff = Math.abs(n - last);
      const sign = Math.sign(n - last);
      if (sign !== dir) {
        return false;
      }
      if(diff < MIN || diff > MAX) {
        return false;
      }
      last = n;
    }
    return true
  });
}