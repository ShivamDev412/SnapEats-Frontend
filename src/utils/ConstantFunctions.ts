import moment from "moment-timezone";
export const checkIfOpen = (openTime: string, closeTime: string) => {
  const currentTime = moment().tz("America/Toronto").format("HH:MM A");
  const openingTime = moment(openTime).tz("America/Toronto").format("HH:MM A");
  const closingTime = moment(closeTime).tz("America/Toronto").format("HH:MM A");
  const isOpen = currentTime >= openingTime && currentTime <= closingTime;
  return isOpen;
};
