import { Execute } from './format';
import { strip } from '@utils/array';

const MIN = 1;
const MAX = 3;

const checkJumpSafe = (last: number, dir: number, n: number): boolean => {
  const diff = Math.abs(n - last);
  const sign = Math.sign(n - last);
  return sign === (dir || sign) && diff >= MIN && diff <= MAX;
}

const checkReportSafe = (report: number[], tolerance: number = 1): boolean => {
  let dir = 0;
  let last = report[0];
  for(let i = 1; i < report.length; i++) {
    const n = report[i];
    const isSafe = checkJumpSafe(last, dir, n);
    if (!isSafe) {
      console.log(`unsafe jump at ${i}`, last, n);
      if (tolerance < 1) {
        console.log('unsafe', report);
        return false;
      }
      const [isLeftSafe, isRightSafe] = [
        checkReportSafe(strip(report, i, 1), tolerance - 1),
        checkReportSafe(strip(report, i + 1, 1), tolerance - 1),
      ];
      if (isLeftSafe || isRightSafe) {
        console.log(`safe`, isLeftSafe ? strip(report, i, 1) : strip(report, i + 1, 1));
        return true;
      }
      return false;
    }
    if (!dir) {
      dir = Math.sign(n - last);
      console.log(`set dir to ${dir}`);
    }
    last = n;
  }
  console.log(`safe`, report);
  return true
}

export const execute: Execute = (reports) => {
  return reports
    .filter((report, i) => {
      console.group(`r${i}`);
      console.log(report);
      const safe = checkReportSafe(report)
      console.groupEnd();
      return safe;
    })
    .length;
}