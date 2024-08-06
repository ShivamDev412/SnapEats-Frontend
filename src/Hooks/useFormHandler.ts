import {
  DefaultValues,
  FieldValues,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";

type UseFormHandlerReturn<T extends FieldValues> = UseFormReturn<T>;

const useFormHandler = <T extends FieldValues>(
  defaultValues: DefaultValues<T> | undefined,
  schema: ZodSchema<unknown>
): UseFormHandlerReturn<T> => {
  return useForm<T>({
    defaultValues,
    resolver: zodResolver(schema),
  });
};

export default useFormHandler;
