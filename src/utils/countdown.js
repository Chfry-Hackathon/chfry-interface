let u = navigator.userAgent;
let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
let isSaf = /Safari/.test(u) && !/Chrome/.test(u);

function formatDate(t) {
  return t <= 9 ? "0" + t : t;
}

export function dateTiem(time) {
  let date = time ? new Date(time) : new Date();
  let dateUTC = date.toUTCString();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let strDate = date
    .getDate()
    .toString()
    .padStart(2, "0");
  if (isIOS || isSaf) {
    return `${date.getFullYear()}/${month}/${strDate} ${date.getHours()}:${formatDate(
      date.getMinutes()
    )}:${formatDate(date.getSeconds())}`;
  }
  return `${date.getFullYear()}-${month}-${strDate} ${date.getHours()}:${formatDate(
    date.getMinutes()
  )}:${formatDate(date.getSeconds())}`;
}

export function idoCountdown(time, def) {
  let reset = time;
  if (isIOS || isSaf) {
    reset = time.replace(/\-/g, "/");
  }
  const startTime = Date.now();
  const endTime = time
  if (startTime > endTime) return def;
  const msec = endTime - startTime;
  let day = parseInt(msec / 1000 / 60 / 60 / 24);
  let hr = parseInt((msec / 1000 / 60 / 60) % 24);
  let min = parseInt((msec / 1000 / 60) % 60);
  let sec = parseInt((msec / 1000) % 60);

  hr = hr > 9 ? hr : "0" + hr;
  min = min > 9 ? min : "0" + min;
  sec = sec > 9 ? sec : "0" + sec;
  return `${day}d ${hr}h ${min}m ${sec}s`;
}
