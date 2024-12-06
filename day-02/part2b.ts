import { Execute } from './format';
import { strip, sum } from '@utils/array';

const MIN = 1;
const MAX = 3;

const getDiffs = (report: number[]): number[] => {
  return report.slice(1).map((n, i) => n - report[i]);
}

const merge = (list: number[], i: number): number[] => {
  if (i < 0) {
    console.log('merge', list, i, list.slice(1));
    return list.slice(1);
  }
  if (i === list.length - 1) {
    console.log('merge', list, i, list.slice(0, list.length - 1));
    return list.slice(0, list.length - 1);
  }
  console.log('merge', list, i, [
    ...list.slice(0, i),
    list[i] + list[i + 1],
    ...list.slice(i + 2)
  ]);
  return [
    ...list.slice(0, i),
    list[i] + list[i + 1],
    ...list.slice(i + 2)
  ];
}

const checkDiffsFail = (diffs: number[], sign: number): number => {
  return diffs.findIndex(diff => sign !== Math.sign(diff) || Math.abs(diff) < MIN || Math.abs(diff) > MAX);
}

const checkReportSafe = (report: number[]): boolean => {
  const sign = Math.sign(report[report.length - 1] - report[0]);
  const diffs = getDiffs(report);
  const failsAt = checkDiffsFail(diffs, sign);

  if (failsAt === -1) {
    return true;
  }

  console.log('failed', failsAt, diffs);

  const [diffsLeft, diffsRight] = [
    merge(diffs, failsAt - 1),
    merge(diffs, failsAt),
  ];

  if (checkDiffsFail(diffsLeft, sign) === -1) {
    console.log('left passed', diffsLeft);
    return true;
  }

  if (checkDiffsFail(diffsRight, sign) === -1) {
    console.log('right passed', diffsRight);
    return true;
  }

  console.log('alt failed', diffsLeft, diffsRight);

  return false;
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