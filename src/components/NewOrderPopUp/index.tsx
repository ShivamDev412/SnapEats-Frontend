import Button from "../Button";
import AutoDecline from "./AutoDecline";
import useNewOrderPopUp from "./useNewOrderPopUp";

const NewOrderPopUp = () => {
  const { isVisible, handleOrder, popUpOrderData } = useNewOrderPopUp();
  return (
    <div
      className={` flex flex-col items-center justify-center w-11/12 max-w-2xl mx-auto p-6 rounded-lg shadow-lg absolute -top-20 left-1/2 transform -translate-x-1/2 z-10 bg-zinc-800 text-zinc-100 transition-transform duration-500 ease-in-out ${
        isVisible ? "translate-y-20" : "-translate-y-full"
      }`}
    >
      <h2 className="text-2xl font-semibold mb-4">
        New Order{popUpOrderData?.length ? "'s" : ""}
        {popUpOrderData?.length && popUpOrderData?.length > 1
          ? `(${popUpOrderData?.length})`
          : ""}
      </h2>
      <div className="flex flex-col gap-4 w-full max-h-[50vh] overflow-auto">
        {popUpOrderData?.map((order) => (
          <div key={order.id} className="flex flex-col gap-4 w-full px-2">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col w-full gap-1 p-2 border-b border-gray-200"
              >
                <div className="gap-2 flex">
                  <span className="font-medium">{item.quantity}x</span>
                  <span className="">{item.name}</span>
                </div>
                <span className="italic">{item.note}</span>
                <div className="ml-2 flex gap-2 flex-col">
                  {item.options.map((option) => (
                    <div
                      key={option.id}
                      className="flex gap-2 items-center text-zinc-400"
                    >
                      <span>{option.name}</span>
                      <span className="h-1 w-1 bg-zinc-100 rounded-full"></span>
                      <span>{option.choice}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex items-center mt-4 gap-2">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-lg font-semibold">
                ${order.totalAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex gap-4">
              <Button
                className="bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700 transition-colors"
                onClick={() => handleOrder(order.id, "accept")}
              >
                Accept
              </Button>
              <Button
                className="bg-red-600 text-white w-full py-2 rounded-lg hover:bg-red-700 transition-colors"
                onClick={() => handleOrder(order.id, "reject")}
              >
                <AutoDecline />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewOrderPopUp;
