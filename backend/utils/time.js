
const moment = require("moment-timezone");

const getIndiaTime = (date = new Date()) => {
  return moment(date).tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
};

module.exports = { getIndiaTime };
