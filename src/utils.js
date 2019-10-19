export function randomArrayValue(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function isEmpty(value) {
  return value === "" ? true : false;
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

export const getPV = (rate, numberOfPeriods, PaymentAmount) => {
  return (PaymentAmount / rate) * (1 - Math.pow(1 + rate, -numberOfPeriods));
};
export const getLoanPV = (rate, numberOfPeriods, PaymentAmount) => {
  return PaymentAmount * ((1 - Math.pow(1 + rate, -numberOfPeriods)) / rate);
};

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
