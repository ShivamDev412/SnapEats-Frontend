import { useState } from "react";
import Otp from ".";

export default function OTPInput() {
  const [otp, setOtp] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <Otp
        separator={<span>-</span>}
        value={otp}
        onChange={setOtp}
        length={5}
      />
    </div>
  );
}
