import useOrderStatusPopUp from "./useOrderStatusPopUp";

const OrderStatusPopUp = () => {
  const { isVisible, popUpOrderMessages } = useOrderStatusPopUp();
  return (
    <div
      className={`text-sm lg:text-[1rem] flex flex-col items-center justify-center w-11/12 max-w-2xl mx-auto p-2 lg:p-4 rounded-lg shadow-lg fixed -top-20 left-1/2 transform -translate-x-1/2 z-10 bg-zinc-800 text-zinc-100 transition-transform duration-500 ease-in-out hover:cursor-pointer ${
        isVisible ? "translate-y-20" : "-translate-y-full"
      }`}
    >
      {popUpOrderMessages?.map((item) => (
        <p
          key={item.orderId}
          className="w-full border-b border-zinc-400 last:border-b-0 pb-2 mb-2 last:pb-0 last:mb-0"
        >
          {item.message.split('. ').map((sentence, index) => (
            <span key={index} className="block">
              {sentence.trim()}{index < item.message.split('. ').length - 1 ? '.' : ''}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
};

export default OrderStatusPopUp;
