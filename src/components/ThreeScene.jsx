import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, Text, RoundedBox, useTexture, Environment, ContactShadows } from '@react-three/drei';
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
                targetX * 0.25 - 0.2, // Smoother rotation range
                0.04                  // Lower lerp for ultimate smoothness
            );
            groupRef.current.rotation.x = THREE.MathUtils.lerp(
                groupRef.current.rotation.x,
                -targetY * 0.12 + 0.1, // Smoother tilting range
                0.04                   // Lower lerp for ultimate smoothness
            );

            // High-Performance Gentle floating
            groupRef.current.position.y = Math.sin(time * 0.8) * 0.15;
            groupRef.current.position.x = Math.cos(time * 0.5) * 0.05;
        }

        // Screen glow pulsing
        if (screenGlowRef.current) {
            screenGlowRef.current.material.emissiveIntensity = 0.8 + Math.sin(time * 2) * 0.2;
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, 0]} scale={0.9}>
            {/* Laptop Base */}
            <RoundedBox args={[2.8, 0.12, 1.8]} radius={0.05} position={[0, -0.8, 0]}>
                <meshPhysicalMaterial
                    color="#1e293b"
                    metalness={0.9}
                    roughness={0.1}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
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
                    <meshPhysicalMaterial
                        color="#0f172a"
                        metalness={0.95}
                        roughness={0.05}
                        clearcoat={1}
                        clearcoatRoughness={0.05}
                        reflectivity={1}
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
                        color="#0a0118"
                        emissive="#00f5ff"
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
                            color={['#00f5ff', '#ff00ea', '#00ff88', '#bf5af2', '#ffaa00'][i % 5]}
                            emissive={['#00f5ff', '#ff00ea', '#00ff88', '#bf5af2', '#ffaa00'][i % 5]}
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

// Single Tech Logo Component with actual image textures
function TechLogo({ position, name, glowColor, logoPath, speed = 2 }) {
    const meshRef = useRef();
    const groupRef = useRef();
    const texture = useTexture(logoPath);
    
    // Configure texture for transparent PNGs
    texture.colorSpace = THREE.SRGBColorSpace;
    
    useFrame((state) => {
        if (meshRef.current) {
            // Subtle pulse
            const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.03 + 1;
            meshRef.current.scale.set(pulse, pulse, 1);
        }
        // Face camera
        if (groupRef.current) {
            groupRef.current.lookAt(state.camera.position);
        }
    });

    return (
        <Float speed={speed} rotationIntensity={0.1} floatIntensity={0.3}>
            <group ref={groupRef} position={position}>
                {/* Glow background */}
                <mesh position={[0, 0, -0.02]}>
                    <circleGeometry args={[0.5, 32]} />
                    <meshStandardMaterial
                        color={glowColor}
                        emissive={glowColor}
                        emissiveIntensity={0.8}
                        transparent
                        opacity={0.15}
                    />
                </mesh>
                {/* Dark circular background */}
                <mesh position={[0, 0, -0.01]}>
                    <circleGeometry args={[0.42, 32]} />
                    <meshStandardMaterial
                        color="#0a0a15"
                        metalness={0.5}
                        roughness={0.3}
                    />
                </mesh>
                {/* Logo image on plane */}
                <mesh ref={meshRef}>
                    <planeGeometry args={[0.6, 0.6]} />
                    <meshBasicMaterial 
                        map={texture} 
                        transparent 
                        side={THREE.DoubleSide}
                    />
                </mesh>
                {/* Tech name below */}
                <Text
                    position={[0, -0.55, 0]}
                    fontSize={0.1}
                    color={glowColor}
                    anchorX="center"
                    anchorY="middle"
                >
                    {name}
                </Text>
                {/* Glow light */}
                <pointLight color={glowColor} intensity={1.5} distance={1.5} />
            </group>
        </Float>
    );
}



// Orbiting Tech Icons around the Laptop
function FloatingTechLogos() {
    const groupRef = useRef();
    const renderOrbitRadius = 2.2; // Spaced out for elegant Negative Space
    const orbitHeight = 0; // Same height as laptop center

    useFrame((state) => {
        const time = state.clock.elapsedTime;
        if (groupRef.current) {
            // Smooth continuous rotation around the laptop
            groupRef.current.rotation.y = time * 0.15;
        }
    });

    const basePath = import.meta.env.BASE_URL;
    const techStack = [
        { name: 'Flutter', glowColor: '#54C5F8', logoPath: `${basePath}logos/flutter.png` },
        { name: 'Laravel', glowColor: '#FF6B5B', logoPath: `${basePath}logos/laravel.png` },
        { name: 'Vue', glowColor: '#42B883', logoPath: `${basePath}logos/vue.png` },
        { name: 'Vuetify', glowColor: '#5CBBF6', logoPath: `${basePath}logos/vuetify.png` },
        { name: 'React', glowColor: '#61DAFB', logoPath: `${basePath}logos/react.png` },
        { name: 'MySQL', glowColor: '#5CBBF6', logoPath: `${basePath}logos/mysql.png` },
    ];

    // Calculate positions in a circle
    const getPosition = (index, total) => {
        const angle = (index / total) * Math.PI * 2;
        return [
            Math.cos(angle) * renderOrbitRadius,
            orbitHeight + Math.sin(index * 0.5) * 0.3, // Slight vertical variation
            Math.sin(angle) * renderOrbitRadius
        ];
    };

    return (
        <group ref={groupRef} position={[0, -0.2, 0]}>
            {techStack.map((tech, index) => (
                <TechLogo
                    key={index}
                    position={getPosition(index, techStack.length)}
                    name={tech.name}
                    glowColor={tech.glowColor}
                    logoPath={tech.logoPath}
                    speed={1.5 + index * 0.1}
                />
            ))}
        </group>
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
                <PerspectiveCamera makeDefault position={[0, 0, 6.5]} fov={45} />

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
                <group position={[0, 0.5, 0]}>
                    <DeveloperLaptop />
                    <FloatingTechLogos />
                    <ConnectionLines />
                </group>

                <ContactShadows
                    position={[0, -2.5, 0]}
                    opacity={0.4}
                    scale={15}
                    blur={2.5}
                    far={4}
                />

                <Environment preset="city" />

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
