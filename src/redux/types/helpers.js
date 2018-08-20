export const createType = type => ({
  request: `${type}/REQUEST`,
  success: `${type}/SUCCESS`,
  fail: `${type}/FAIL`,
});
