import { animated, useSpring } from "@react-spring/web";
import { Dispatch, SetStateAction } from "react";

export default function Loading({
  setLoading,
}: {
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const props = useSpring({
    from: { width: "0%" },
    to: { width: "100%" },
    config: { duration: 2000 },
    onRest: () => setLoading(false),
  });
  return (
    <div className="bg-[#f9ecd2] h-screen w-screen flex flex-col justify-center items-center gap-8">
      <div className="w-1/2">
        <animated.div className="h-1 bg-black" style={props}></animated.div>
      </div>
      <h1 className="text-lg">Loading...</h1>
    </div>
  );
}
