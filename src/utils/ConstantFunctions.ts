import moment from "moment-timezone";
export const checkIfOpen = (openTime: string, closeTime: string) => {
  const currentTime = moment().tz("America/Toronto").format("HH:MM A");
  const openingTime = moment(openTime).tz("America/Toronto").format("HH:MM A");
  const closingTime = moment(closeTime).tz("America/Toronto").format("HH:MM A");
  const isOpen = currentTime >= openingTime && currentTime <= closingTime;
  return isOpen;
};
export const orderMessage = (orderStatus: string) => {
  switch (orderStatus) {
    case "ACCEPTED":
      return "has been accepted by the store";
    case "PREPARING":
      return "is being prepared";
    case "OUT_FOR_DELIVERY":
      return "is out for delivery";
    case "DELIVERED":
      return "has been delivered";
  }
};
