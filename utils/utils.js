const randomTwoDigitInteger = () => {
  const mathRandom = Math.floor(Math.random() * 100) + 1;
  let randomTwoDigit;
  if (mathRandom < 10) {
    randomTwoDigit = `0${mathRandom}`;
  } else {
    randomTwoDigit = `${mathRandom}`;
  }
  return randomTwoDigit;
};

const randomFourDigitInteger = () => {
  const mathRandom = Math.floor(Math.random() * 10000) + 1;
  let randomFourDigit;
  if (mathRandom < 1000) {
    randomFourDigit = `${mathRandom}0`;
  } else {
    randomFourDigit = `${mathRandom}`;
  }
  return randomFourDigit;
};

const randomFiveDigitInteger = () => {
  const mathRandom = Math.floor(Math.random() * 100000) + 1;
  let randomFiveDigit;
  if (mathRandom < 10000) {
    randomFiveDigit = `${mathRandom}0`;
  } else {
    randomFiveDigit = `${mathRandom}`;
  }
  return randomFiveDigit;
};

module.exports = {
  randomTwoDigitInteger,
  randomFourDigitInteger,
  randomFiveDigitInteger,
};
