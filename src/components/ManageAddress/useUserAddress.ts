import { useDispatch } from "react-redux";
import {
  useAddressQuery,
  useDeleteAddressMutation,
  useMarkAddressAsDefaultMutation,
} from "@/redux/slice/api/userSlice";

import Toast from "@/utils/Toast";
import { setLoading } from "@/redux/slice/loadingSlice";

const useUserAddress = () => {
  const { data } = useAddressQuery("");
  const dispatch = useDispatch();
  const [deleteAddress] = useDeleteAddressMutation();
  const [markAsDefault] = useMarkAddressAsDefaultMutation();
  const handleDelete = async (id: string) => {
    try {
      dispatch(setLoading(true));
      const res = await deleteAddress(id).unwrap();
      if (res.success) {
        dispatch(setLoading(false));
        Toast(res.message, "success");
      }
    } catch (err: any) {
      dispatch(setLoading(false));
      Toast(err.message, "error");
    }
  };
  const markAsDefaultAddress = async (id: string) => {
    try {
      dispatch(setLoading(true));
      const res = await markAsDefault(id).unwrap();
      if (res.success) {
        dispatch(setLoading(false));
        Toast(res.message, "success");
      }
    } catch (err: any) {
      dispatch(setLoading(false));
      Toast(err.message, "error");
    }
  };

  return { data, handleDelete, markAsDefaultAddress };
};
export default useUserAddress;
