import {
  FoodType,
  useAddFoodTypeMutation,
  useGetAllFoodTypesQuery,
  useGetStoreFoodTypesQuery,
  useRemoveFoodTypeMutation,
} from "@/redux/slice/api/store/profileSlice";
import { setLoading } from "@/redux/slice/loadingSlice";
import Toast from "@/utils/Toast";
import { useDispatch } from "react-redux";

const useFoodTypes = () => {
  const dispatch = useDispatch();
  const { data: foodTypes, isFetching: foodTypesFetching } =
    useGetAllFoodTypesQuery("");
  const { data: storeFoodTypes, isFetching: storeFoodTypesFetching } =
    useGetStoreFoodTypesQuery("");

  const [addFoodType] = useAddFoodTypeMutation();
  const [removeFoodType] = useRemoveFoodTypeMutation();

  const handleFoodType = async (foodType: FoodType, type: string) => {
    try {
      dispatch(setLoading(true));
      const res =
        type === "foodTypes"
          ? await addFoodType({ id: foodType.id }).unwrap()
          : await removeFoodType({ id: foodType.id }).unwrap();
      if (res.success) {
        Toast(res.message, "success");
      } else {
        Toast("Operation failed", "error");
      }

      dispatch(setLoading(false));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(setLoading(false));
      Toast(error.data.message, "error");
    }
  };

  return {
    storeFoodTypesFetching,
    foodTypesFetching,
    handleFoodType,
    foodTypes,
    storeFoodTypes,
  };
};

export default useFoodTypes;
