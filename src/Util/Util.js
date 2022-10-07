export const ConvertToUrlForm = (data) => {
    var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    return formBody;
}
export const daysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
}
export const calcTime = (time) => {
  let now = new Date().getTime();
  let postTime = new Date(time).getTime();
  let diff = now - postTime;
  let day = Math.floor(diff / (1000 * 3600 * 24));
  let hour = Math.floor((diff - day * (1000 * 3600 * 24)) / (1000 * 3600));
  let min = Math.floor((diff - day * (1000 * 3600 * 24) - hour * ( 1000 * 3600)) / (1000 * 60));
  return [day, hour, min];
}
export const getEventTime = (time) => {
  
}

export const isNullOrEmpty = str => {
  if (str == null || str == '') return true;
  else return false;
};