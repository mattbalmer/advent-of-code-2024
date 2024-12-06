import { Execute } from './format';

const MIN = 1;
const MAX = 3;

const getDiffs = (report: number[]): number[] => {
  return report.slice(1).map((n, i) => n - report[i]);
}

const merge = (list: number[], i: number): number[] => {
  if (i < 0) {
    return list.slice(1);
  }
  if (i === list.length - 1) {
    return list.slice(0, list.length - 1);
  }
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

  return [
    merge(diffs, failsAt - 1),
    merge(diffs, failsAt),
  ].some(diffs =>
    checkDiffsFail(diffs, sign) === -1
  );
}

export const execute: Execute = (reports) => {
  return reports
    .filter((report, i) =>
      checkReportSafe(report)
    )
    .length;
}