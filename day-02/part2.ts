import { Execute } from './format';
import { strip } from '@utils/array';

const MIN = 1;
const MAX = 3;

const checkJumpSafe = (last: number, dir: number, n: number): boolean => {
  const diff = Math.abs(n - last);
  const sign = Math.sign(n - last);
  return sign === dir && diff >= MIN && diff <= MAX;
}

const checkReportSafe = (report: number[], tolerance: number = 1): boolean => {
  let sign = Math.sign(report[report.length - 1] - report[0]);
  let last = report[0];

  for(let i = 1; i < report.length; i++) {
    const n = report[i];
    const isSafe = checkJumpSafe(last, sign, n);

    if (!isSafe) {
      if (tolerance < 1) {
        return false;
      }

      return [
        strip(report, i - 1, 1),
        strip(report, i, 1),
      ].some(alt =>
        checkReportSafe(alt, tolerance - 1)
      );
    }

    last = n;
  }

  return true
}

export const execute: Execute = (reports) => {
  return reports
    .filter((report, i) =>
      checkReportSafe(report)
    )
    .length;
}