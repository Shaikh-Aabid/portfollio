import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// Floating Laptop with Code Screen
function DeveloperLaptop() {
    const groupRef = useRef();
    const screenRef = useRef();
    const screenGlowRef = useRef();
    const { mouse, viewport } = useThree();

    useFrame((state) => {
        const time = state.clock.elapsedTime;

        if (groupRef.current) {
            // Follow mouse smoothly
            const targetX = (mouse.x * viewport.width) / 6;
            const targetY = (mouse.y * viewport.height) / 8;

            groupRef.current.rotation.y = THREE.MathUtils.lerp(
                groupRef.current.rotation.y,
                targetX * 0.3 - 0.2,
                0.05
            );
            groupRef.current.rotation.x = THREE.MathUtils.lerp(
                groupRef.current.rotation.x,
                -targetY * 0.15 + 0.1,
                0.05
            );

            // Gentle floating
            groupRef.current.position.y = Math.sin(time * 1.2) * 0.1;
        }

        // Screen glow pulsing
        if (screenGlowRef.current) {
            screenGlowRef.current.material.emissiveIntensity = 0.8 + Math.sin(time * 2) * 0.2;
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, 0]} scale={1.1}>
            {/* Laptop Base */}
            <RoundedBox args={[2.8, 0.12, 1.8]} radius={0.05} position={[0, -0.8, 0]}>
                <meshStandardMaterial
                    color="#1e293b"
                    metalness={0.8}
                    roughness={0.2}
                />
            </RoundedBox>

            {/* Keyboard area */}
            <mesh position={[0, -0.73, 0.1]}>
                <boxGeometry args={[2.4, 0.02, 1.2]} />
                <meshStandardMaterial
                    color="#0f172a"
                    metalness={0.5}
                    roughness={0.4}
                />
            </mesh>

            {/* Keyboard keys (simplified grid) */}
            {[...Array(4)].map((_, row) =>
                [...Array(10)].map((_, col) => (
                    <mesh
                        key={`key-${row}-${col}`}
                        position={[-1 + col * 0.22, -0.71, -0.3 + row * 0.25]}
                    >
                        <boxGeometry args={[0.18, 0.02, 0.18]} />
                        <meshStandardMaterial
                            color="#334155"
                            metalness={0.3}
                            roughness={0.6}
                        />
                    </mesh>
                ))
            )}

            {/* Trackpad */}
            <mesh position={[0, -0.72, 0.55]}>
                <boxGeometry args={[0.8, 0.01, 0.5]} />
                <meshStandardMaterial
                    color="#475569"
                    metalness={0.6}
                    roughness={0.3}
                />
            </mesh>

            {/* Screen Frame (lid) */}
            <group position={[0, 0.15, -0.85]} rotation={[-0.3, 0, 0]}>
                <RoundedBox args={[2.8, 1.9, 0.08]} radius={0.05}>
                    <meshStandardMaterial
                        color="#1e293b"
                        metalness={0.8}
                        roughness={0.2}
                    />
                </RoundedBox>

                {/* Screen Display */}
                <mesh position={[0, 0, 0.045]} ref={screenRef}>
                    <planeGeometry args={[2.5, 1.6]} />
                    <meshStandardMaterial
                        color="#0a0a0f"
                        metalness={0.1}
                        roughness={0.8}
                    />
                </mesh>

                {/* Screen Glow */}
                <mesh position={[0, 0, 0.046]} ref={screenGlowRef}>
                    <planeGeometry args={[2.5, 1.6]} />
                    <meshStandardMaterial
                        color="#1e40af"
                        emissive="#3b82f6"
                        emissiveIntensity={0.8}
                        transparent
                        opacity={0.3}
                    />
                </mesh>

                {/* Code Lines on Screen */}
                {[...Array(8)].map((_, i) => (
                    <mesh key={i} position={[-0.9, 0.55 - i * 0.18, 0.05]}>
                        <boxGeometry args={[0.3 + Math.random() * 1.2, 0.06, 0.001]} />
                        <meshStandardMaterial
                            color={['#22d3ee', '#a78bfa', '#4ade80', '#fbbf24', '#f472b6'][i % 5]}
                            emissive={['#22d3ee', '#a78bfa', '#4ade80', '#fbbf24', '#f472b6'][i % 5]}
                            emissiveIntensity={1.5}
                            transparent
                            opacity={0.9}
                        />
                    </mesh>
                ))}

                {/* Cursor blink */}
                <Float speed={8} rotationIntensity={0} floatIntensity={0.05}>
                    <mesh position={[0.5, -0.35, 0.05]}>
                        <boxGeometry args={[0.02, 0.12, 0.001]} />
                        <meshStandardMaterial
                            color="#ffffff"
                            emissive="#ffffff"
                            emissiveIntensity={2}
                        />
                    </mesh>
                </Float>

                {/* Apple-like logo on back */}
                <mesh position={[0, 0, -0.045]}>
                    <circleGeometry args={[0.15, 32]} />
                    <meshStandardMaterial
                        color="#64748b"
                        metalness={0.9}
                        roughness={0.1}
                    />
                </mesh>
            </group>
        </group>
    );
}

// Single Tech Logo Label Component
function TechLabel({ position, name, color, glowColor, speed = 2 }) {
    const meshRef = useRef();
    const groupRef = useRef();
    
    useFrame((state) => {
        if (meshRef.current) {
            // Subtle pulse
            const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.05 + 1;
            meshRef.current.scale.set(pulse, pulse, 1);
        }
        // Face camera
        if (groupRef.current) {
            groupRef.current.lookAt(state.camera.position);
        }
    });

    return (
        <Float speed={speed} rotationIntensity={0.15} floatIntensity={0.35}>
            <group ref={groupRef} position={position}>
                {/* Background glow circle */}
                <mesh position={[0, 0, -0.03]}>
                    <circleGeometry args={[0.45, 32]} />
                    <meshStandardMaterial
                        color={color}
                        emissive={glowColor}
                        emissiveIntensity={1.5}
                        transparent
                        opacity={0.25}
                    />
                </mesh>
                {/* Icon circle with color */}
                <mesh ref={meshRef}>
                    <circleGeometry args={[0.35, 32]} />
                    <meshStandardMaterial
                        color={color}
                        emissive={glowColor}
                        emissiveIntensity={2}
                        metalness={0.7}
                        roughness={0.2}
                    />
                </mesh>
                {/* Framework initial/symbol */}
                <Text
                    position={[0, 0, 0.02]}
                    fontSize={0.25}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                >
                    {name.charAt(0)}
                </Text>
                {/* Framework name below */}
                <Text
                    position={[0, -0.52, 0]}
                    fontSize={0.1}
                    color={glowColor}
                    anchorX="center"
                    anchorY="middle"
                >
                    {name}
                </Text>
                {/* Glow light */}
                <pointLight color={glowColor} intensity={3} distance={2.5} />
            </group>
        </Float>
    );
}

// Floating Tech Logos - Flutter, Laravel, Vuetify, Vue.js
function FloatingTechLogos() {
    const groupRef = useRef();

    useFrame((state) => {
        const time = state.clock.elapsedTime;
        if (groupRef.current) {
            // Slow orbit
            groupRef.current.rotation.y = time * 0.06;
        }
    });

    const techStack = [
        { name: 'Flutter', position: [2.3, 0.8, 0], color: '#02569B', glowColor: '#54C5F8', speed: 2 },
        { name: 'Laravel', position: [-2.3, 0.5, 0.4], color: '#FF2D20', glowColor: '#FF6B5B', speed: 1.8 },
        { name: 'Vuetify', position: [2, -0.8, 0.6], color: '#1867C0', glowColor: '#5CBBF6', speed: 2.2 },
        { name: 'Vue', position: [-1.8, 1, -0.2], color: '#42B883', glowColor: '#42B883', speed: 1.9 },
    ];

    return (
        <group ref={groupRef}>
            {techStack.map((tech, index) => (
                <TechLabel
                    key={index}
                    position={tech.position}
                    name={tech.name}
                    color={tech.color}
                    glowColor={tech.glowColor}
                    speed={tech.speed}
                />
            ))}
        </group>
    );
}

// Premium Code Brackets < /> - Beautiful 3D Design
function CodeBrackets() {
    const leftBracketRef = useRef();
    const rightBracketRef = useRef();

    useFrame((state) => {
        const time = state.clock.elapsedTime;
        
        // Elegant floating motion
        if (leftBracketRef.current) {
            leftBracketRef.current.position.y = Math.sin(time * 0.7) * 0.08;
            leftBracketRef.current.rotation.z = Math.sin(time * 0.3) * 0.03;
            leftBracketRef.current.rotation.y = Math.sin(time * 0.4) * 0.1;
        }
        
        if (rightBracketRef.current) {
            rightBracketRef.current.position.y = Math.sin(time * 0.7 + 1) * 0.08;
            rightBracketRef.current.rotation.z = Math.sin(time * 0.3 + Math.PI) * 0.03;
            rightBracketRef.current.rotation.y = Math.sin(time * 0.4 + Math.PI) * 0.1;
        }
    });

    return (
        <>
            {/* ========== LEFT BRACKET < ========== */}
            <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.15}>
                <group ref={leftBracketRef} position={[-2.6, -0.2, 1]} scale={0.9}>
                    {/* Upper arm */}
                    <mesh rotation={[0, 0, Math.PI / 4]} position={[0.15, 0.28, 0]}>
                        <capsuleGeometry args={[0.055, 0.5, 12, 20]} />
                        <meshStandardMaterial
                            color="#22d3ee"
                            emissive="#0891b2"
                            emissiveIntensity={2}
                            metalness={0.8}
                            roughness={0.1}
                            transparent
                            opacity={0.95}
                        />
                    </mesh>
                    {/* Lower arm */}
                    <mesh rotation={[0, 0, -Math.PI / 4]} position={[0.15, -0.28, 0]}>
                        <capsuleGeometry args={[0.055, 0.5, 12, 20]} />
                        <meshStandardMaterial
                            color="#06b6d4"
                            emissive="#22d3ee"
                            emissiveIntensity={2}
                            metalness={0.8}
                            roughness={0.1}
                            transparent
                            opacity={0.95}
                        />
                    </mesh>
                    {/* Joint sphere */}
                    <mesh position={[0, 0, 0]}>
                        <sphereGeometry args={[0.08, 20, 20]} />
                        <meshStandardMaterial
                            color="#ffffff"
                            emissive="#22d3ee"
                            emissiveIntensity={3}
                            metalness={0.9}
                            roughness={0.05}
                        />
                    </mesh>
                    {/* Intense glow */}
                    <pointLight color="#22d3ee" intensity={4} distance={4} />
                </group>
            </Float>

            {/* ========== RIGHT BRACKET /> ========== */}
            <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.15}>
                <group ref={rightBracketRef} position={[2.6, -0.2, 1]} scale={0.9}>
                    {/* Slash / */}
                    <mesh rotation={[0, 0, Math.PI / 5.5]} position={[-0.42, 0, 0]}>
                        <capsuleGeometry args={[0.045, 0.65, 12, 20]} />
                        <meshStandardMaterial
                            color="#fbbf24"
                            emissive="#f59e0b"
                            emissiveIntensity={2.5}
                            metalness={0.7}
                            roughness={0.15}
                            transparent
                            opacity={0.95}
                        />
                    </mesh>
                    {/* Upper arm of > */}
                    <mesh rotation={[0, 0, -Math.PI / 4]} position={[-0.05, 0.28, 0]}>
                        <capsuleGeometry args={[0.055, 0.5, 12, 20]} />
                        <meshStandardMaterial
                            color="#a78bfa"
                            emissive="#8b5cf6"
                            emissiveIntensity={2}
                            metalness={0.8}
                            roughness={0.1}
                            transparent
                            opacity={0.95}
                        />
                    </mesh>
                    {/* Lower arm of > */}
                    <mesh rotation={[0, 0, Math.PI / 4]} position={[-0.05, -0.28, 0]}>
                        <capsuleGeometry args={[0.055, 0.5, 12, 20]} />
                        <meshStandardMaterial
                            color="#c084fc"
                            emissive="#a78bfa"
                            emissiveIntensity={2}
                            metalness={0.8}
                            roughness={0.1}
                            transparent
                            opacity={0.95}
                        />
                    </mesh>
                    {/* Joint sphere for > */}
                    <mesh position={[0.12, 0, 0]}>
                        <sphereGeometry args={[0.08, 20, 20]} />
                        <meshStandardMaterial
                            color="#ffffff"
                            emissive="#a78bfa"
                            emissiveIntensity={3}
                            metalness={0.9}
                            roughness={0.05}
                        />
                    </mesh>
                    {/* Glow lights */}
                    <pointLight color="#a78bfa" intensity={4} distance={4} />
                    <pointLight color="#fbbf24" intensity={2} distance={2.5} position={[-0.42, 0, 0]} />
                </group>
            </Float>
        </>
    );
}

// Enhanced Particle Field - Data Flow
function DataParticles() {
    const count = 150;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i += 3) {
            pos[i] = (Math.random() - 0.5) * 15;
            pos[i + 1] = (Math.random() - 0.5) * 15;
            pos[i + 2] = (Math.random() - 0.5) * 15;
        }
        return pos;
    }, []);

    const colors = useMemo(() => {
        const cols = new Float32Array(count * 3);
        const colorPalette = [
            [0.13, 0.83, 0.93],    // Cyan
            [0.65, 0.55, 0.98],    // Purple
            [0.29, 0.87, 0.50],    // Green
            [0.22, 0.52, 0.96],    // Blue
            [0.98, 0.75, 0.14],    // Yellow
        ];
        for (let i = 0; i < count; i++) {
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            cols[i * 3] = color[0];
            cols[i * 3 + 1] = color[1];
            cols[i * 3 + 2] = color[2];
        }
        return cols;
    }, []);

    const pointsRef = useRef();

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
            pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
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
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                vertexColors
                transparent
                opacity={0.7}
                sizeAttenuation
            />
        </points>
    );
}

// Connection lines between elements
function ConnectionLines() {
    const linesRef = useRef();

    useFrame((state) => {
        if (linesRef.current) {
            linesRef.current.rotation.z = state.clock.elapsedTime * 0.05;
        }
    });

    const linePositions = useMemo(() => {
        const positions = [];
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const startRadius = 1.5;
            const endRadius = 2.5;
            positions.push(
                Math.cos(angle) * startRadius, Math.sin(angle) * 0.5, Math.sin(angle) * startRadius,
                Math.cos(angle) * endRadius, Math.sin(angle) * 0.5, Math.sin(angle) * endRadius
            );
        }
        return new Float32Array(positions);
    }, []);

    return (
        <group ref={linesRef}>
            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={12}
                        array={linePositions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="#3b82f6" transparent opacity={0.3} />
            </lineSegments>
        </group>
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
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

                {/* Ambient Lighting */}
                <ambientLight intensity={0.4} />
                
                {/* Key Lights */}
                <directionalLight
                    position={[5, 5, 5]}
                    intensity={1.2}
                    castShadow
                    color="#ffffff"
                />
                <directionalLight
                    position={[-3, 3, -3]}
                    intensity={0.8}
                    color="#a78bfa"
                />
                
                {/* Accent Point Lights */}
                <pointLight position={[-3, 2, 2]} intensity={1.5} color="#22d3ee" />
                <pointLight position={[3, 2, 2]} intensity={1.5} color="#a78bfa" />
                <pointLight position={[0, -2, 3]} intensity={1} color="#3b82f6" />

                {/* Scene Elements */}
                <DeveloperLaptop />
                <FloatingTechLogos />
                <CodeBrackets />
                <DataParticles />
                <ConnectionLines />

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
                pointerEvents: 'none',
                letterSpacing: '1px'
            }}>
                Move your mouse to interact 💻
            </div>
        </div>
    );
}
