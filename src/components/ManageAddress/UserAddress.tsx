import NoDataFound from "../NoDataFound";
import AddressCard from "./AddressCard";
import useUserAddress from "./useUserAddress";
import { AddressType } from "@/redux/slice/api/user/addressSlice";

const UserAddress: React.FC<{
  handleUpdateAddress: (address: AddressType) => void;
}> = ({ handleUpdateAddress }) => {
  const { data, handleDelete, markAsDefaultAddress } = useUserAddress();

  return (
    <section className="flex gap-4 mt-10 flex-wrap flex-1 h-full">
      {data?.data && data?.data?.length > 0 ? (
        <>
          {data?.data?.map((value) => (
            <AddressCard
              key={value.id}
              address={value}
              handleDelete={handleDelete}
              markAsDefaultAddress={markAsDefaultAddress}
              handleUpdateAddress={handleUpdateAddress}
            />
          ))}
        </>
      ) : (
        <NoDataFound message="You haven't added any address" />
      )}
    </section>
  );
};

export default UserAddress;
