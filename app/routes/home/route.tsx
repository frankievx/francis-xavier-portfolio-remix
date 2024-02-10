import { Link, Outlet } from "@remix-run/react";
import { Canvas, extend } from "@react-three/fiber";
import Rig from "~/components/Rig";
import Frame from "~/components/Frame";
import type { MetaFunction } from "@remix-run/node";
import Loading from "~/components/Loading";
import { useRef, useState } from "react";
import { Gltf, Html, PortalMaterialType, useGLTF } from "@react-three/drei";
import { geometry } from "maath";

extend(geometry);

// useGLTF.preload(
//   "pickles_3d_version_of_hyuna_lees_illustration-transformed.glb"
// );

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const ref = useRef<HTMLElement>();
  const [loading, setLoading] = useState(process.env.NODE_ENV === "production");
  const teaRef = useRef<PortalMaterialType>();
  const pickleRef = useRef<PortalMaterialType>();

  if (loading) return <Loading setLoading={setLoading} />;
  return (
    <main>
      <button className="z-10">
        <Link to="/">Home</Link>
      </button>
      <Canvas
        camera={{ fov: 75, position: [0, 0, 20] }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
        }}
        eventSource={ref.current}
        eventPrefix="client"
      >
        <Frame
          key="pickles"
          id="pickles"
          name={`pickles`}
          author="Omar Faruq Tawsif"
          bg="#e4cdac"
          position={[-1.15, 0, 0]}
          rotation={[0, 0.5, 0]}
        >
          {/* <Gltf
            src="/pickles_3d_version_of_hyuna_lees_illustration-transformed.glb"
            scale={8}
            position={[0, -0.7, -2]}
          /> */}
          <Html
            position={[-7, -0.7, -8]}
            rotation={[0, 0.5, 0]}
            distanceFactor={3}
            transform
          >
            <iframe
              // width={500}
              // height={700}
              className="h-[85dvh] w-[90dvw] md:w-[60dvw]"
              title="Bird Genoscape Mobile"
              src="https://bird-genoscape-mobile.vercel.app"
            />
          </Html>
          {/* <Html
            position={[0, 0, -20]}
            style={{ userSelect: "none" }}
            castShadow
            receiveShadow
            occlude="blending"
            transform
          >
            <iframe
              title="embed"
              width={500}
              height={700}
              src="https://bird-genoscape-mobile.vercel.app"
              frameBorder={0}
            />
          </Html> */}
        </Frame>
        <Frame
          key="tea"
          id="03"
          name="tea"
          author="Omar Faruq Tawsif"
          bg="#ddddd7"
        >
          <Html position={[0, 0.2, -2.5]} distanceFactor={2} center transform>
            <iframe
              // width={500}
              // height={700}
              className="h-[85dvh] w-[90dvw] md:w-[60dvw]"
              title="Simply Furnished"
              src="https://simply-furnished.vercel.app"
            />
          </Html>

          {/* <Gltf src="fiesta_tea-transformed.glb" position={[0, -2, -3]} /> */}
        </Frame>
        <Frame
          key="still"
          id="still"
          name="still"
          author="Omar Faruq Tawsif"
          bg="#d1d1ca"
          position={[1.15, 0, 0]}
          rotation={[0, -0.5, 0]}
        >
          <Gltf
            src="/still_life_based_on_heathers_artwork-transformed.glb"
            scale={2}
            position={[0, -0.8, -4]}
          />
        </Frame>
        <Outlet />
        <Rig />
      </Canvas>
    </main>
  );
}
