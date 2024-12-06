import { Execute } from './format';
import { strip } from '@utils/array';

const MIN = 1;
const MAX = 3;

const getDiffs = (report: number[]): number[] => {
  return report.slice(1).map((n, i) => n - report[i]);
}
const checkDiffs = (diffs: number[]): boolean => {
  const sign = Math.sign(diffs[0]);
  return diffs.every(diff => sign === Math.sign(diff) && Math.abs(diff) >= MIN && Math.abs(diff) <= MAX);
}

const checkJumpSafe = (last: number, dir: number, n: number): boolean => {
  const diff = Math.abs(n - last);
  const sign = Math.sign(n - last);
  return sign === (dir || sign) && diff >= MIN && diff <= MAX;
}

const checkReportSafe = (report: number[], tolerance: number = 1): boolean => {
  let dir = Math.sign(report[report.length - 1] - report[0]);
  let last = report[0];
  for(let i = 1; i < report.length; i++) {
    const n = report[i];
    const isSafe = checkJumpSafe(last, dir, n);
    if (!isSafe) {
      console.log(`unsafe jump at ${i}`, [last, n], [dir, Math.sign(n - last)], [n - last]);
      if (tolerance < 1) {
        const diffs = getDiffs(report);
        const diffsSafe = checkDiffs(diffs);
        console.log('unsafe', report, diffs, diffsSafe);
        if (diffsSafe) {
          console.log('mismatch:safe');
        }
        return false;
      }
      const [isLeftSafe, isRightSafe] = [
        checkReportSafe(strip(report, i - 1, 1), tolerance - 1),
        checkReportSafe(strip(report, i, 1), tolerance - 1),
      ];
      if (isLeftSafe || isRightSafe) {
        const r = isLeftSafe ? strip(report, i - 1, 1) : strip(report, i, 1);
        const diffs = getDiffs(r);
        const diffsSafe = checkDiffs(diffs);
        console.log(`safe`, r, diffs, diffsSafe);
        if (!diffsSafe) {
          console.log('mismatch:unsafe');
        }
        return true;
      }
      const diffs = getDiffs(report);
      const diffsSafe = checkDiffs(diffs);
      if (diffsSafe) {
        console.log('mismatch:safe');
      }
      return false;
    }
    if (!dir) {
      dir = Math.sign(n - last);
      console.log(`set dir to ${dir}`);
    }
    last = n;
  }
  const diffs = getDiffs(report);
  const diffsSafe = checkDiffs(diffs);
  console.log(`safe`, report, diffs, diffsSafe);
  if (!diffsSafe) {
    console.log('mismatch:unsafe');
  }
  return true
}

export const execute: Execute = (reports) => {
  return reports
    .map((report, i) => {
      console.group(`r${i}`);
      console.log(report, 'dz', getDiffs(report));
      const safe = checkReportSafe(report);
      console.groupEnd();
      return safe;
    });
}