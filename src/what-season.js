const { NotImplementedError } = require('../extensions/index.js');

/**
 * Extract season from given date and expose the enemy scout!
 * 
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 * 
 * @example
 * 
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 * 
 */
function getSeason(date) {
  if (!date) {
      return 'Unable to determine the time of year!';
  }
  try {
      date.getTime();
  } catch (e) {
      throw new Error('Invalid date!');
  }

  if (!(date instanceof Date) || Object.prototype.toString.call(date) !== '[object Date]' || isNaN(date.getTime()) || typeof date !== 'object') {
      throw new Error('Invalid date!');
  }

  const month = (date.getMonth() + 1) % 12;

  switch (true) {
      case (month < 3):
          return 'winter';
      case (month < 6):
          return 'spring';
      case (month < 9):
          return 'summer';
      default:
          return 'autumn';
  }
}


module.exports = {
  getSeason
};
