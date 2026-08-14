import React, { useRef, useEffect, useState, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class CanvasErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('[HeroCanvas] WebGL Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const WebGLContextHandler: React.FC = () => {
  const { gl } = useThree();

  useEffect(() => {
    const canvasEl = gl.domElement;
    const handleContextLost = (event: Event) => {
      event.preventDefault();
    };
    const handleContextRestored = () => {};

    canvasEl.addEventListener('webglcontextlost', handleContextLost, false);
    canvasEl.addEventListener('webglcontextrestored', handleContextRestored, false);

    return () => {
      canvasEl.removeEventListener('webglcontextlost', handleContextLost);
      canvasEl.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [gl]);

  return null;
};

const AnimatedSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    timeRef.current += delta;
    meshRef.current.rotation.x = timeRef.current * 0.15;
    meshRef.current.rotation.y = timeRef.current * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1.8, 64, 64]} scale={1.2}>
        <MeshDistortMaterial
          color="#14161D"
          attach="material"
          distort={0.45}
          speed={3}
          roughness={0.2}
          metalness={0.8}
          wireframe={true}
        />
      </Sphere>
    </Float>
  );
};

const FloatingParticles: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);
  const count = 180;

  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (!particlesRef.current) return;
    timeRef.current += delta;
    particlesRef.current.rotation.y = timeRef.current * 0.04;
    particlesRef.current.rotation.x = timeRef.current * 0.02;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#66FCF1"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const MobileHeroFallback: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#0B0C10]">
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-tr from-accentCyan/20 via-accentTeal/10 to-transparent blur-3xl animate-pulse" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-accentCyan/20 animate-[spin_12s_linear_infinite]" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-dashed border-accentTeal/30 animate-[spin_18s_linear_infinite_reverse]" />
  </div>
);

export const HeroCanvas: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isTouch = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
      setIsMobile(isTouch);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return <MobileHeroFallback />;
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-0 bg-[#0B0C10]">
      <CanvasErrorBoundary fallback={<MobileHeroFallback />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{
            powerPreference: 'high-performance',
            antialias: true,
            failIfMajorPerformanceCaveat: false
          }}
        >
          <WebGLContextHandler />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#66FCF1" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#45A29E" />
          <AnimatedSphere />
          <FloatingParticles />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
};




