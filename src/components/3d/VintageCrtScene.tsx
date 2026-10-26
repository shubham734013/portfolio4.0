import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { CrtScreenTextureGenerator, CRT_THEMES } from './CrtScreenTexture';
import { RotateCcw, Monitor, Palette, Sparkles } from 'lucide-react';

interface VintageCrtSceneProps {
  onCodePresetChange?: (presetName: string) => void;
}

export const VintageCrtScene: React.FC<VintageCrtSceneProps> = ({ onCodePresetChange }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeTheme, setActiveTheme] = useState<keyof typeof CRT_THEMES>('matrixGreen');
  const [activeCodePreset, setActiveCodePreset] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);

  // Mutable refs to decouple Three.js render loop from React state
  const sceneStateRef = useRef<{
    textureGen: CrtScreenTextureGenerator | null;
    canvasTexture: THREE.CanvasTexture | null;
    monitorGroup: THREE.Group | null;
    targetRotationX: number;
    targetRotationY: number;
    currentRotationX: number;
    currentRotationY: number;
    isSoftwareGl: boolean;
  }>({
    textureGen: null,
    canvasTexture: null,
    monitorGroup: null,
    targetRotationX: 0.05,
    targetRotationY: -0.22, // Slight initial 3/4 perspective to highlight 3D depth
    currentRotationX: 0.05,
    currentRotationY: -0.22,
    isSoftwareGl: false,
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect WebGL2 & Software WebGL
    let glContext: WebGL2RenderingContext | null = null;
    let isSoftware = false;
    try {
      const probeCanvas = document.createElement('canvas');
      glContext = probeCanvas.getContext('webgl2') as WebGL2RenderingContext;
      if (!glContext) {
        setWebGlSupported(false);
        return;
      }
      const ext = glContext.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : glContext.RENDERER;
      const gpu = String(glContext.getParameter(param));
      glContext.getExtension('WEBGL_lose_context')?.loseContext();
      isSoftware = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    } catch {
      isSoftware = true;
    }

    sceneStateRef.current.isSoftwareGl = isSoftware;

    // 2. Setup Three.js Scene, Camera, Renderer
    const width = container.clientWidth || 640;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, 0.25, 3.4);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftware,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftware ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftware;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Lighting Rig (Key, Fill, Rim & Contact Grounding)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5e6, 1.4);
    keyLight.position.set(2.8, 3.5, 2.5);
    keyLight.castShadow = !isSoftware;
    if (!isSoftware) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x78F28B, 0.55);
    rimLight.position.set(-3.2, 1.8, -2.0);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x90a4ae, 0.45);
    fillLight.position.set(-2.0, -1.0, 1.5);
    scene.add(fillLight);

    // 4. CRT Dynamic Canvas Screen Texture
    const textureGen = new CrtScreenTextureGenerator(1024, 768, activeTheme);
    const canvasTexture = new THREE.CanvasTexture(textureGen.canvas);
    canvasTexture.colorSpace = THREE.SRGBColorSpace;
    canvasTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    sceneStateRef.current.textureGen = textureGen;
    sceneStateRef.current.canvasTexture = canvasTexture;

    // 5. Build Procedural Vintage CRT Monitor Group (Multi-part assembly)
    const monitorGroup = new THREE.Group();
    sceneStateRef.current.monitorGroup = monitorGroup;
    monitorGroup.position.set(0, 0.05, 0);

    // Materials
    const vintageBeigeMat = new THREE.MeshStandardMaterial({
      color: 0x222622, // Refined dark charcoal/stealth CRT casing
      roughness: 0.55,
      metalness: 0.12,
    });

    const frontBezelMat = new THREE.MeshStandardMaterial({
      color: 0x181c18,
      roughness: 0.65,
      metalness: 0.08,
    });

    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x303830,
      roughness: 0.45,
      metalness: 0.25,
    });

    // Part A: Main Front Bezel (Chunky CRT frame)
    const bezelWidth = 2.05;
    const bezelHeight = 1.65;
    const bezelDepth = 0.35;
    const bezelGeom = new THREE.BoxGeometry(bezelWidth, bezelHeight, bezelDepth);
    const bezelMesh = new THREE.Mesh(bezelGeom, frontBezelMat);
    bezelMesh.position.set(0, 0.2, 0);
    bezelMesh.castShadow = !isSoftware;
    bezelMesh.receiveShadow = !isSoftware;
    monitorGroup.add(bezelMesh);

    // Part B: Deep Tapered Rear Cathode Ray Housing
    // CRT monitors are deep and taper towards the rear neck!
    const rearHousingGeom = new THREE.CylinderGeometry(0.55, 0.98, 1.15, 8, 1);
    rearHousingGeom.rotateX(Math.PI / 2);
    const rearHousingMesh = new THREE.Mesh(rearHousingGeom, vintageBeigeMat);
    rearHousingMesh.position.set(0, 0.2, -0.68);
    rearHousingMesh.scale.set(1.05, 0.85, 1.0);
    rearHousingMesh.castShadow = !isSoftware;
    monitorGroup.add(rearHousingMesh);

    // Part C: Rear Ventilation Grille Cap
    const rearCapGeom = new THREE.CylinderGeometry(0.35, 0.45, 0.3, 16);
    rearCapGeom.rotateX(Math.PI / 2);
    const rearCapMesh = new THREE.Mesh(rearCapGeom, accentMat);
    rearCapMesh.position.set(0, 0.2, -1.3);
    monitorGroup.add(rearCapMesh);

    // Part D: Visibly Curved CRT Glass Screen (Spherical Bulge Quad with Normalized UVs)
    const screenWidth = 1.76;
    const screenHeight = 1.32;
    const screenGeom = new THREE.PlaneGeometry(screenWidth, screenHeight, 32, 24);

    // Add realistic vintage CRT spherical screen curvature
    const posAttr = screenGeom.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const nx = x / (screenWidth / 2);
      const ny = y / (screenHeight / 2);
      const distSq = nx * nx + ny * ny;
      // Convex bulge: center curves forward toward viewer (+Z)
      const bulge = Math.max(0, 1 - distSq * 0.45) * 0.12;
      posAttr.setZ(i, bulge);
    }
    screenGeom.computeVertexNormals();

    const screenMat = new THREE.MeshStandardMaterial({
      map: canvasTexture,
      roughness: 0.2,
      metalness: 0.05,
      emissive: new THREE.Color(0xffffff),
      emissiveMap: canvasTexture,
      emissiveIntensity: 0.88,
    });

    const screenMesh = new THREE.Mesh(screenGeom, screenMat);
    screenMesh.position.set(0, 0.28, 0.18);
    monitorGroup.add(screenMesh);

    // Part E: Outer CRT Protective Glass Surface (Subtle Glare Reflection)
    const glassCoverGeom = screenGeom.clone();
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0xaaffc0,
      transparent: true,
      opacity: 0.14,
      roughness: 0.08,
      metalness: 0.15,
      depthWrite: false,
    });
    const glassMesh = new THREE.Mesh(glassCoverGeom, glassMat);
    glassMesh.position.set(0, 0.28, 0.188);
    monitorGroup.add(glassMesh);

    // Part F: Bottom Control Console & Physical Buttons
    // Power button with glowing LED
    const powerButtonGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.04, 16);
    powerButtonGeom.rotateX(Math.PI / 2);
    const powerButtonMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 });
    const powerButton = new THREE.Mesh(powerButtonGeom, powerButtonMat);
    powerButton.position.set(0.78, -0.44, 0.18);
    monitorGroup.add(powerButton);

    // Green Power LED
    const ledGeom = new THREE.SphereGeometry(0.022, 12, 12);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x78F28B });
    const ledMesh = new THREE.Mesh(ledGeom, ledMat);
    ledMesh.position.set(0.66, -0.44, 0.185);
    monitorGroup.add(ledMesh);

    // Contrast & Brightness Rotary Knobs
    [-0.72, -0.58].forEach((xPos) => {
      const knobGeom = new THREE.CylinderGeometry(0.038, 0.038, 0.035, 12);
      knobGeom.rotateX(Math.PI / 2);
      const knobMesh = new THREE.Mesh(knobGeom, accentMat);
      knobMesh.position.set(xPos, -0.44, 0.18);
      monitorGroup.add(knobMesh);
    });

    // Brand badge plate in the center bottom of the bezel
    const badgeGeom = new THREE.BoxGeometry(0.24, 0.045, 0.015);
    const badgeMat = new THREE.MeshStandardMaterial({ color: 0x445044, metalness: 0.6, roughness: 0.3 });
    const badge = new THREE.Mesh(badgeGeom, badgeMat);
    badge.position.set(0, -0.44, 0.185);
    monitorGroup.add(badge);

    // Part G: Monitor Swivel Neck and Weighted Pedestal Base
    const neckGeom = new THREE.CylinderGeometry(0.18, 0.22, 0.26, 16);
    const neckMesh = new THREE.Mesh(neckGeom, accentMat);
    neckMesh.position.set(0, -0.66, -0.15);
    monitorGroup.add(neckMesh);

    const baseGeom = new THREE.CylinderGeometry(0.68, 0.74, 0.09, 24);
    const baseMesh = new THREE.Mesh(baseGeom, vintageBeigeMat);
    baseMesh.position.set(0, -0.80, -0.12);
    baseMesh.castShadow = !isSoftware;
    baseMesh.receiveShadow = !isSoftware;
    monitorGroup.add(baseMesh);

    // Part H: Retro Mechanical Keyboard on Desk
    const keyboardGroup = new THREE.Group();
    keyboardGroup.position.set(0, -0.84, 0.72);
    keyboardGroup.rotation.x = -0.06;

    const kbBodyGeom = new THREE.BoxGeometry(1.6, 0.07, 0.54);
    const kbBody = new THREE.Mesh(kbBodyGeom, vintageBeigeMat);
    keyboardGroup.add(kbBody);

    // Stepped Keycaps Area
    const keycapsGeom = new THREE.BoxGeometry(1.48, 0.04, 0.44);
    const keycapsMat = new THREE.MeshStandardMaterial({ color: 0x1a201a, roughness: 0.7 });
    const keycaps = new THREE.Mesh(keycapsGeom, keycapsMat);
    keycaps.position.set(0, 0.045, 0);
    keyboardGroup.add(keycaps);

    // Spacebar highlight
    const spacebarGeom = new THREE.BoxGeometry(0.48, 0.045, 0.07);
    const spacebarMat = new THREE.MeshStandardMaterial({ color: 0x2e3b2e, roughness: 0.5 });
    const spacebar = new THREE.Mesh(spacebarGeom, spacebarMat);
    spacebar.position.set(0, 0.05, 0.14);
    keyboardGroup.add(spacebar);

    monitorGroup.add(keyboardGroup);

    // Part I: Retro Mouse
    const mouseGeom = new THREE.BoxGeometry(0.18, 0.07, 0.28);
    const mouseMesh = new THREE.Mesh(mouseGeom, vintageBeigeMat);
    mouseMesh.position.set(1.05, -0.82, 0.68);
    mouseMesh.rotation.y = -0.15;
    monitorGroup.add(mouseMesh);

    // Part J: Studio Desk Contact Grounding Surface
    const shadowGeom = new THREE.PlaneGeometry(3.6, 2.8);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x050805,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -0.849, 0.1);
    scene.add(shadowMesh);

    scene.add(monitorGroup);

    // 6. Interactive Pointer Movement & Damping
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      // Constrain rotation to subtle, satisfying bounds (±15 degrees horizontal, ±8 degrees vertical)
      sceneStateRef.current.targetRotationY = -0.22 + x * 0.35;
      sceneStateRef.current.targetRotationX = 0.05 - y * 0.18;
    };

    container.addEventListener('mousemove', handlePointerMove);

    // 7. Render Loop with Three.js Software-WebGL Pacing
    let frameId = 0;
    let isDisposed = false;
    let lastTime = performance.now();
    const startTime = performance.now();

    function afterDraw(cb: () => void) {
      if (!renderer || isDisposed) return;
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (isDisposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 6);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 60);
        }
      };
      frameId = window.setTimeout(poll, 6);
    }

    const renderTick = () => {
      if (isDisposed) return;

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const elapsed = now - startTime;

      // Update CRT Screen blinking cursor and dynamic texture
      if (textureGen.update(elapsed)) {
        canvasTexture.needsUpdate = true;
      }

      // Smooth exponential damping toward pointer target
      const s = sceneStateRef.current;
      s.currentRotationX = THREE.MathUtils.damp(s.currentRotationX, s.targetRotationX, 4.5, delta);
      s.currentRotationY = THREE.MathUtils.damp(s.currentRotationY, s.targetRotationY, 4.5, delta);

      // Subtle idle breathing motion
      const idleTilt = Math.sin(elapsed * 0.001) * 0.015;

      if (monitorGroup) {
        monitorGroup.rotation.x = s.currentRotationX + idleTilt;
        monitorGroup.rotation.y = s.currentRotationY;
      }

      renderer.render(scene, camera);

      if (isSoftware) {
        afterDraw(renderTick);
      } else {
        frameId = requestAnimationFrame(renderTick);
      }
    };

    renderTick();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isDisposed = true;
      if (isSoftware) {
        clearTimeout(frameId);
      } else {
        cancelAnimationFrame(frameId);
      }
      container.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      bezelGeom.dispose();
      rearHousingGeom.dispose();
      screenGeom.dispose();
      canvasTexture.dispose();
    };
  }, []);

  const handleResetAngle = () => {
    sceneStateRef.current.targetRotationX = 0.05;
    sceneStateRef.current.targetRotationY = -0.22;
  };

  const handleCyclePreset = () => {
    const next = (activeCodePreset + 1) % 2;
    setActiveCodePreset(next);
    if (sceneStateRef.current.textureGen) {
      sceneStateRef.current.textureGen.setPreset(next);
      if (sceneStateRef.current.canvasTexture) {
        sceneStateRef.current.canvasTexture.needsUpdate = true;
      }
    }
    if (onCodePresetChange) {
      onCodePresetChange(next === 0 ? 'ResQ 2.0 Dispatch' : 'Day Night GymOS QR');
    }
  };

  const handleCycleTheme = () => {
    const themes: (keyof typeof CRT_THEMES)[] = ['matrixGreen', 'amberPhosphor', 'cyberCyan'];
    const currentIndex = themes.indexOf(activeTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setActiveTheme(nextTheme);
    if (sceneStateRef.current.textureGen) {
      sceneStateRef.current.textureGen.setTheme(nextTheme);
      if (sceneStateRef.current.canvasTexture) {
        sceneStateRef.current.canvasTexture.needsUpdate = true;
      }
    }
  };

  return (
    <div
      className="relative w-full h-[460px] sm:h-[540px] md:h-[600px] flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
        aria-label="Interactive 3D Vintage CRT Computer Monitor rendering green code"
        role="img"
      />

      {/* Screen CRT ambient glow reflection behind the monitor */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-56 rounded-full pointer-events-none blur-3xl opacity-25"
        style={{
          backgroundColor:
            activeTheme === 'matrixGreen'
              ? '#78F28B'
              : activeTheme === 'amberPhosphor'
              ? '#FCA311'
              : '#00F5D4',
        }}
      />

      {/* Retro CRT Spec & Interaction Controls Pill (Docked bottom) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141814]/90 border border-[#2a382a] text-xs font-mono text-[#a3bfa3] shadow-lg backdrop-blur-sm z-20">
        <span className="flex items-center gap-1.5 text-[#78F28B] pr-2 border-r border-[#2a382a]">
          <span className="w-2 h-2 rounded-full bg-[#78F28B]" />
          CRT-3D
        </span>

        <button
          onClick={handleCyclePreset}
          className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-[#202920] hover:text-[#78F28B] transition-colors"
          title="Switch displayed code snippet"
          aria-label="Cycle code preset on 3D monitor"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>{activeCodePreset === 0 ? 'ResQ 2.0' : 'GymOS'}</span>
        </button>

        <button
          onClick={handleCycleTheme}
          className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-[#202920] hover:text-[#78F28B] transition-colors"
          title="Switch phosphor color (Green / Amber / Cyan)"
          aria-label="Change CRT phosphor color"
        >
          <Palette className="w-3.5 h-3.5" />
          <span>{activeTheme === 'matrixGreen' ? 'Green' : activeTheme === 'amberPhosphor' ? 'Amber' : 'Cyan'}</span>
        </button>

        <button
          onClick={handleResetAngle}
          className="p-1 rounded hover:bg-[#202920] hover:text-[#78F28B] transition-colors"
          title="Reset viewing angle"
          aria-label="Reset monitor angle"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>

      {/* Gentle interaction hint for new visitors */}
      <div className="absolute top-4 right-4 pointer-events-none hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-[#5b6f5b]">
        <Sparkles className="w-3 h-3 text-[#78F28B]" />
        <span>Move pointer to tilt 3D workstation</span>
      </div>

      {/* Fallback indicator if WebGL context was unavailable */}
      {!webGlSupported && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#101410] border border-[#283828] p-6 text-center">
          <p className="text-sm font-mono text-[#78F28B] mb-2">[3D WebGL Context Fallback]</p>
          <p className="text-xs text-[#8E928C] max-w-sm">
            Rendering 2D simulated workstation terminal. Interactive project case studies and code components remain fully functional below.
          </p>
        </div>
      )}
    </div>
  );
};
