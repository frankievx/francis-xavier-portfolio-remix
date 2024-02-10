import {
  MutableRefObject,
  createRef,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useFrame } from "@react-three/fiber";
import {
  useCursor,
  MeshPortalMaterial,
  PortalMaterialType,
  Html,
  Gltf,
} from "@react-three/drei";
import { easing } from "maath";
import { Camera, DoubleSide, Object3D, Vector3 } from "three";
import { useNavigate, useParams } from "@remix-run/react";

export default function Frame({
  id,
  name,
  // author,
  bg,
  width = 1,
  height = 1.61803398875,
  position,
  rotation,
  children,
  ...props
}: {
  id: string;
  name: string;
  author: string;
  bg?: string;
  width?: number;
  height?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  children: React.ReactNode;
}) {
  const htmlRef = useRef<HTMLElement>();
  const meshRef = createRef<Object3D>();
  const portal = createRef<PortalMaterialType>();
  const navigate = useNavigate();
  const params = useParams();
  const [hovered, hover] = useState(false);
  useCursor(hovered);
  useFrame((state, dt) => {
    easing.damp(
      portal?.current as { [key: string]: any },
      "blend",
      params?.project === name ? 1 : 0,
      0.2,
      dt
    );
  });

  useLayoutEffect(() => {
    setTimeout(() => console.log("htmlRef", htmlRef), 2000);
  }, [htmlRef]);

  const calcPosition = (
    el: Object3D,
    camera: Camera,
    size: { width: number; height: number }
  ): number[] => {
    console.log("size", size);
    console.log("camera", camera);
    console.log("el", el);
    console.log("portal", portal.current);
    return [0, 0, el.position.z - 10];
  };

  return (
    <group position={position} rotation={rotation} {...props}>
      {/* <Text
        font={"/Inter-Regular.woff"}
        fontSize={0.3}
        anchorY="top"
        anchorX="left"
        lineHeight={0.8}
        position={[-0.375, 0.715, 0.01]}
        material-toneMapped={false}
      >
        {name}
      </Text> */}
      {/* <Text
        fontSize={0.1}
        anchorX="right"
        position={[0.4, -0.659, 0.01]}
        material-toneMapped={false}
      >
        /{id}
      </Text>
      <Text
        fontSize={0.04}
        anchorX="right"
        position={[0.0, -0.677, 0.01]}
        material-toneMapped={false}
      >
        {author}
      </Text> */}
      <mesh
        ref={meshRef}
        name={name}
        onDoubleClick={(e) => {
          e.stopPropagation();
          navigate("/home/" + e.object.name);
        }}
        onPointerOver={(e) => hover(true)}
        onPointerOut={() => hover(false)}
      >
        {/* @ts-expect-error */}
        <roundedPlaneGeometry args={[width, height, 0.1]} />
        <MeshPortalMaterial
          ref={portal}
          events={params?.project === name}
          side={DoubleSide}
        >
          {bg && <color attach="background" args={[bg]} />}
          <Html
            ref={htmlRef}
            position={[0, 0.2, -2.5]}
            distanceFactor={2}
            center
            occlude="raycast"
            transform
            // calculatePosition={calcPosition}
          >
            <iframe
              // width={500}
              // height={700}
              className="h-[85dvh] w-[90dvw] md:w-[60dvw]"
              title="Simply Furnished"
              src="https://simply-furnished.vercel.app"
            />
          </Html>
          {/* <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh> */}
          {/* <group position={[0, 0.2, -1]}> */}

          {/* <Gltf
            src="/still_life_based_on_heathers_artwork-transformed.glb"
            scale={2}
            position={[0, -0.8, -4]}
          /> */}
          {/* </group> */}
          {/* {children} */}
        </MeshPortalMaterial>
      </mesh>
    </group>
  );
}
