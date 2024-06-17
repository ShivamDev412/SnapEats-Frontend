import { useDispatch, useSelector } from "react-redux";
import RegisterStoreSchema from "@/Schema/Store.Schema";
import {
  StoreRegisterType,
  useRegisterStoreMutation,
} from "@/redux/slice/api/store/profileSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Toast from "@/utils/Toast";
import { setStoreStatus } from "@/redux/slice/storeSlice";
import { RootState } from "@/redux/Store";

const useStoreRegister = () => {
  type FormField = z.infer<typeof RegisterStoreSchema>;
  const { storeStatus } = useSelector((state: RootState) => state.store);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    getValues,
    setValue,
    formState: { errors },
    setError,
  } = useForm<StoreRegisterType>({
    defaultValues: {
      email: "",
      name: "",
      address: "",
      phoneNumber: "",
      countryCode: "",
      lat: 0,
      lon: 0,
    },
    resolver: zodResolver(RegisterStoreSchema),
  });
  const [registerStore, { isLoading }] = useRegisterStoreMutation();
  const onSubmit: SubmitHandler<FormField> = async (credentials) => {
    try {
      const { email, name, address, phoneNumber, countryCode, lat, lon } =
        credentials;
      const res = await registerStore({
        email,
        name,
        address,
        phoneNumber,
        countryCode,
        lat,
        lon,
      }).unwrap();
      if (res.success) {
        Toast(res.message);
        if (res?.data?.status === "PENDING") {
          dispatch(setStoreStatus("pending"));
        }
      }
    } catch (error: any) {
      Toast(error.data.message);
    }
  };
  return {
    register,
    handleSubmit,
    onSubmit,
    reset,
    clearErrors,
    getValues,
    errors,
    setError,
    setValue,
    isLoading,
    storeStatus,
    // isFetching,
  };
};
export default useStoreRegister;
