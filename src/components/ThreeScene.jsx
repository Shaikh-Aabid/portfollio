import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float } from '@react-three/drei';
import * as THREE from 'three';

// Interactive Robot Character
function RobotCharacter() {
    const groupRef = useRef();
    const headRef = useRef();
    const leftEyeRef = useRef();
    const rightEyeRef = useRef();
    const { mouse, viewport } = useThree();

    useFrame((state) => {
        if (groupRef.current) {
            // Body follows mouse with smooth lerp
            const targetX = (mouse.x * viewport.width) / 4;
            const targetY = (mouse.y * viewport.height) / 4;

            groupRef.current.rotation.y = THREE.MathUtils.lerp(
                groupRef.current.rotation.y,
                targetX * 0.3,
                0.05
            );
            groupRef.current.rotation.x = THREE.MathUtils.lerp(
                groupRef.current.rotation.x,
                -targetY * 0.2,
                0.05
            );

            // Floating animation
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
        }

        // Head looks at mouse more intensely
        if (headRef.current) {
            headRef.current.rotation.y = THREE.MathUtils.lerp(
                headRef.current.rotation.y,
                mouse.x * 0.5,
                0.1
            );
            headRef.current.rotation.x = THREE.MathUtils.lerp(
                headRef.current.rotation.x,
                -mouse.y * 0.3,
                0.1
            );
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            {/* Body */}
            <mesh position={[0, -0.3, 0]} castShadow>
                <capsuleGeometry args={[0.6, 0.8, 8, 16]} />
                <meshStandardMaterial
                    color="#1a1a2e"
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Body glow ring */}
            <mesh position={[0, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.65, 0.03, 8, 32]} />
                <meshStandardMaterial
                    color="#00d4ff"
                    emissive="#00d4ff"
                    emissiveIntensity={2}
                />
            </mesh>

            {/* Chest light */}
            <mesh position={[0, -0.1, 0.55]}>
                <circleGeometry args={[0.15, 32]} />
                <meshStandardMaterial
                    color="#00d4ff"
                    emissive="#00d4ff"
                    emissiveIntensity={3}
                />
            </mesh>

            {/* Head */}
            <group ref={headRef} position={[0, 0.9, 0]}>
                {/* Main head */}
                <mesh castShadow>
                    <sphereGeometry args={[0.5, 32, 32]} />
                    <meshStandardMaterial
                        color="#16213e"
                        metalness={0.9}
                        roughness={0.1}
                    />
                </mesh>

                {/* Visor */}
                <mesh position={[0, 0.05, 0.35]}>
                    <boxGeometry args={[0.7, 0.25, 0.2]} />
                    <meshStandardMaterial
                        color="#0a0a0a"
                        metalness={1}
                        roughness={0}
                    />
                </mesh>

                {/* Left Eye */}
                <mesh ref={leftEyeRef} position={[-0.18, 0.05, 0.45]}>
                    <sphereGeometry args={[0.08, 16, 16]} />
                    <meshStandardMaterial
                        color="#00d4ff"
                        emissive="#00d4ff"
                        emissiveIntensity={3}
                    />
                </mesh>

                {/* Right Eye */}
                <mesh ref={rightEyeRef} position={[0.18, 0.05, 0.45]}>
                    <sphereGeometry args={[0.08, 16, 16]} />
                    <meshStandardMaterial
                        color="#00d4ff"
                        emissive="#00d4ff"
                        emissiveIntensity={3}
                    />
                </mesh>

                {/* Antenna */}
                <mesh position={[0, 0.55, 0]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
                    <meshStandardMaterial color="#7c3aed" metalness={0.8} />
                </mesh>
                <mesh position={[0, 0.7, 0]}>
                    <sphereGeometry args={[0.06, 16, 16]} />
                    <meshStandardMaterial
                        color="#7c3aed"
                        emissive="#7c3aed"
                        emissiveIntensity={2}
                    />
                </mesh>
            </group>

            {/* Left Arm */}
            <group position={[-0.8, -0.2, 0]}>
                <mesh rotation={[0, 0, 0.3]}>
                    <capsuleGeometry args={[0.12, 0.5, 4, 8]} />
                    <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Hand */}
                <mesh position={[-0.2, -0.4, 0]}>
                    <sphereGeometry args={[0.15, 16, 16]} />
                    <meshStandardMaterial color="#16213e" metalness={0.9} roughness={0.1} />
                </mesh>
            </group>

            {/* Right Arm */}
            <group position={[0.8, -0.2, 0]}>
                <mesh rotation={[0, 0, -0.3]}>
                    <capsuleGeometry args={[0.12, 0.5, 4, 8]} />
                    <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Hand - waving */}
                <Float speed={4} rotationIntensity={0.5} floatIntensity={0.2}>
                    <mesh position={[0.2, -0.4, 0]}>
                        <sphereGeometry args={[0.15, 16, 16]} />
                        <meshStandardMaterial color="#16213e" metalness={0.9} roughness={0.1} />
                    </mesh>
                </Float>
            </group>
        </group>
    );
}

// Particle background
function ParticleField() {
    const count = 80;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i += 3) {
            pos[i] = (Math.random() - 0.5) * 12;
            pos[i + 1] = (Math.random() - 0.5) * 12;
            pos[i + 2] = (Math.random() - 0.5) * 12;
        }
        return pos;
    }, []);

    const pointsRef = useRef();

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.04}
                color="#00d4ff"
                transparent
                opacity={0.5}
                sizeAttenuation
            />
        </points>
    );
}

export default function ThreeScene() {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            minHeight: '500px',
            position: 'relative',
            zIndex: 1,
            cursor: 'grab'
        }}>
            <Canvas
                shadows
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
                onCreated={(state) => state.gl.setClearColor(0x000000, 0)}
            >
                <PerspectiveCamera makeDefault position={[0, 0.5, 5]} fov={50} />

                {/* Lighting */}
                <ambientLight intensity={0.3} />
                <directionalLight
                    position={[5, 5, 5]}
                    intensity={1.5}
                    castShadow
                    color="#ffffff"
                />
                <pointLight position={[-3, 2, 2]} intensity={1} color="#00d4ff" />
                <pointLight position={[3, 2, 2]} intensity={0.8} color="#7c3aed" />
                <pointLight position={[0, -2, 3]} intensity={0.5} color="#f472b6" />

                {/* Scene elements */}
                <RobotCharacter />
                <ParticleField />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={false}
                />
            </Canvas>

            <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.4)',
                pointerEvents: 'none'
            }}>
                Move your mouse to interact ✨
            </div>
        </div>
    );
}
