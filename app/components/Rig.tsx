import { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useParams } from "@remix-run/react";
import { useEffect } from "react";
import { Vector3 } from "three";

export default function Rig({
  position = new Vector3(0, 0, 2),
  focus = new Vector3(0, 0, 0),
}: {
  position?: Vector3;
  focus?: Vector3;
}) {
  const { controls, scene } = useThree();
  const params = useParams();
  useEffect(() => {
    const active = scene.getObjectByName(params?.project as string);
    console.log("active", active);
    if (active) {
      active?.parent?.localToWorld(position.set(0, 0.5, 0.25));
      active?.parent?.localToWorld(focus.set(0, 0, -2));
    }
    // @ts-expect-error - setLookAt is not in the types
    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true);
  });
  return (
    <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
  );
}
