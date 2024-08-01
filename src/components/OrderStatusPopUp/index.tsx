import useOrderStatusPopUp from "./useOrderStatusPopUp";

const OrderStatusPopUp = () => {
  const { isVisible, popUpOrderMessages } = useOrderStatusPopUp();
  return (
    <div
      className={`text-lg flex flex-col items-center justify-center w-11/12 max-w-2xl mx-auto p-6 rounded-lg shadow-lg fixed -top-20 left-1/2 transform -translate-x-1/2 z-10 bg-zinc-800 text-zinc-100 transition-transform duration-500 ease-in-out ${
        isVisible ? "translate-y-20" : "-translate-y-full"
      }`}
    >
      { popUpOrderMessages?.map((item:any) => (
        <button key={item.orderId}>{item.message}</button>
      ))}
    </div>
  );
};

export default OrderStatusPopUp;
