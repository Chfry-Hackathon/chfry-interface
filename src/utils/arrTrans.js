export const arrTrans = function(data, n = 3, res = []) {
  const len = data.length;
  const lineNum = len % 4 === 0 ? len / 4 : Math.ceil(len / 4 + 1);
  for (let i = 0; i < lineNum; i++) {
    //原始数组不会被修改
    const temp = data.slice(i * n, i * n + n);
    res.push(JSON.parse(JSON.stringify(temp)));
  }

  return res;
};
