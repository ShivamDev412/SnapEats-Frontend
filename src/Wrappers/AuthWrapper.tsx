import React from "react";
import LoginImage from "../assets/login_image.webp";

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  return (
    <main className="flex justify-between bg-zinc-950 h-screen text-zinc-100">
      <section className="hidden lg:flex flex-col justify-center items-center lg:w-6/12 2xl:w-7/12 h-full">
        <div className="h-auto w-7/12">
          <img
            src={LoginImage}
            alt="login_image_picture"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-4xl text-center">Satisfy Your Cravings</h2>
        <h3 className="text-2xl mt-2 text-center">
          From your local favorites to new discoveries, SnapEats delivers.
        </h3>
      </section>
      <section className="w-full lg:w-6/12 2xl:w-5/12 flex flex-col justify-center items-center h-full">
        {children}
      </section>
    </main>
  );
};

export default AuthWrapper;
