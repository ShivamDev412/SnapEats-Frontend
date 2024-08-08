import { Categories, StoreListings } from "@/components/Home";
import { useLazyGetOrdersLiveStatusQuery } from "@/redux/slice/api/user/orderSlice";
import { useEffect } from "react";
const Home = () => {
  const [trigger] = useLazyGetOrdersLiveStatusQuery();
  useEffect(() => {
    trigger();
  }, [trigger]);
  return (
    <section className="w-full">
      <Categories />
      <StoreListings />
    </section>
  );
};

export default Home;
