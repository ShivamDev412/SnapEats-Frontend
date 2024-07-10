import { FieldErrors } from "react-hook-form";

const CardInput = ({
    errors,
    id,
    element: Element,
  }: {
    errors: FieldErrors<any>;
    id: string;
    element: any;
  }) => {
    return (
      <div>
        <Element
          className={`appearance-none block w-full bg-transparent text-zinc-950 border ${
            errors[id] ? "border-red-700" : "border-zinc-400"
          } rounded py-4 px-3 text-lg placeholder:text-zinc-400 leading-tight hover:border-zinc-950 focus:outline-none focus:border-zinc-950`}
        />
        {errors[id] && (
          <p className=" text-red-700 text-[1rem] italic mt-1">
            {String(errors[id]?.message)}
          </p>
        )}
      </div>
    );
  };
  export default CardInput;