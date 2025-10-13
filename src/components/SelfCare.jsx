import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const THEMES = [
    { name: "Ocean", bg: 0x000726, fg: 0x4868f7, accent: 0x677acf, particles: 0xafbdfa, sound: 'island.wav' },
    { name: "Forest", bg: 0x011c0d, fg: 0x016b30, accent: 0x56c488, particles: 0x8dd6ae, sound: 'forest.wav' },
    { name: "Dawn", bg: 0x1c0000, fg: 0x6e0517, accent: 0xb0253d, particles: 0xed9fac, sound: 'nature.wav' },
    { name: "Evening", bg: 0x000000, fg: 0x4d4949, accent: 0xcfcccc, particles: 0xf0f0f0, sound: 'coffeeShop.wav' },
];

const PATTERNS = {
    "Coherent (5–5)": [5, 0, 5, 0],   // inhale, hold1, exhale, hold2
    "Box (4–4–4–4)": [4, 4, 4, 4],
    "4–7–8": [4, 7, 8, 0],
};

export default function SelfCare() {
    const base = import.meta.env.BASE_URL || '/'; // to work locally and on GitHub
    const mountRef = useRef(null);
    const rafRef = useRef(0);


    const listenerRef = useRef(null);
    const soundRef = useRef(null);
    const audioLoaderRef = useRef(null);


    const [running, setRunning] = useState(true);
    const [themeIdx, setThemeIdx] = useState(0);
    const [patternKey, setPatternKey] = useState("Coherent (5–5)");
    const [intensity, setIntensity] = useState(1.0);
    const [speed, setSpeed] = useState(1.0);
    const [hideUI, setHideUI] = useState(false);

    const runningRef = useRef(running);
    const speedRef = useRef(speed);
    const intensityRef = useRef(intensity);
    const patternRef = useRef(patternKey);
    useEffect(() => { runningRef.current = running; }, [running]);
    useEffect(() => { speedRef.current = speed; }, [speed]);
    useEffect(() => { intensityRef.current = intensity; }, [intensity]);
    useEffect(() => { patternRef.current = patternKey; }, [patternKey]);

    const [soundOn, setSoundOn] = useState(false);

    const cueRef = useRef(null);
    const subRef = useRef(null);

    const three = useRef({
        scene: null, camera: null, renderer: null, ro: null,
        bg: null, torus: null, ico: null, ring: null, particles: null, pMat: null,
        breathGroup: null,
        amb: null, key: null, rim: null,
        controls: null,
    });

    const playSound = () => {
        console.log("play sound")
        console.log(`${THEMES[themeIdx].sound} for ${THEMES[themeIdx].name} `)

        const audioLoader = audioLoaderRef.current;
        const sound = soundRef.current;
        if (!audioLoader || !sound) return;

        const url = `${base}sound/${THEMES[themeIdx].sound}`;

        if (sound.buffer && sound._srcUrl === url) {
            if (!sound.isPlaying) sound.play();
            return;
        }

        audioLoader.load(url, function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(true);
            sound.setVolume(0.5);
            sound.hasPlaybackControl = true;
            sound._srcUrl = url;
            sound.play();
        });
    }

    const stopSound = () => {
        const sound = soundRef.current;
        console.log(sound?.isPlaying);
        console.log("off")
        if (sound?.isPlaying) sound.pause();
    }

    useEffect(() => {
        const mount = mountRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 200);
        camera.position.set(0, 0.6, 6);


        const listener = new THREE.AudioListener();
        const sound = new THREE.Audio(listener);
        const audioLoader = new THREE.AudioLoader();
        camera.add(listener);
        listenerRef.current = listener;
        soundRef.current = sound;
        audioLoaderRef.current = audioLoader;


        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.setAnimationLoop(null);
        mount.appendChild(renderer.domElement);

        const onResize = () => {
            renderer.setSize(mount.clientWidth, mount.clientHeight);
            camera.aspect = mount.clientWidth / mount.clientHeight;
            camera.updateProjectionMatrix();
        };
        const ro = new ResizeObserver(onResize);
        ro.observe(mount);

        const amb = new THREE.AmbientLight(0xffffff, 0.55);
        const key = new THREE.DirectionalLight(0xffffff, 0.7); key.position.set(3, 5, 4);
        const rim = new THREE.DirectionalLight(0xffffff, 0.35); rim.position.set(-4, 3, -5);
        scene.add(amb, key, rim);

        const bg = new THREE.Mesh(
            new THREE.SphereGeometry(80, 32, 32),
            new THREE.MeshStandardMaterial({ color: THEMES[themeIdx].bg, roughness: 1, metalness: 0, side: THREE.BackSide })
        );
        scene.add(bg);

        const breathGroup = new THREE.Group();
        scene.add(breathGroup);

        const torus = new THREE.Mesh(
            new THREE.TorusGeometry(1.3, 0.08, 48, 256),
            new THREE.MeshStandardMaterial({
                color: THEMES[themeIdx].fg,
                roughness: 0.35, metalness: 0.2,
                emissive: THEMES[themeIdx].accent, emissiveIntensity: 0.15,
            })
        );
        breathGroup.add(torus);

        const ico = new THREE.Mesh(
            new THREE.IcosahedronGeometry(0.7, 1),
            new THREE.MeshStandardMaterial({
                color: THEMES[themeIdx].accent,
                roughness: 0.25, metalness: 0.35, flatShading: true,
                emissive: THEMES[themeIdx].fg, emissiveIntensity: 0.05,
            })
        );
        breathGroup.add(ico);

        const ring = new THREE.Mesh(
            new THREE.RingGeometry(1.45, 1.55, 128),
            new THREE.MeshBasicMaterial({ color: THEMES[themeIdx].accent, transparent: true, opacity: 0.35, side: THREE.DoubleSide })
        );
        ring.rotation.x = -Math.PI / 2;
        ring.position.y = -0.9;
        breathGroup.add(ring);

        const particleCount = 2000;
        const pts = new Float32Array(particleCount * 3);
        const area = 8;
        for (let i = 0; i < particleCount; i++) {
            pts[i * 3 + 0] = (Math.random() - 0.5) * area;
            pts[i * 3 + 1] = (Math.random() - 0.5) * area * 0.6;
            pts[i * 3 + 2] = (Math.random() - 0.5) * area;
        }
        const pGeom = new THREE.BufferGeometry();
        pGeom.setAttribute("position", new THREE.BufferAttribute(pts, 3));
        const pMat = new THREE.PointsMaterial({ size: 0.02, color: THEMES[themeIdx].particles, transparent: true, opacity: 0.9, depthWrite: false });
        const particles = new THREE.Points(pGeom, pMat);
        scene.add(particles);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 0, 0);
        controls.enablePan = false;
        controls.enableRotate = false;
        controls.enableDamping = true;
        three.current = { scene, camera, renderer, ro, bg, torus, ico, ring, particles, pMat, breathGroup, amb, key, rim, controls };

        const clock = new THREE.Clock();
        let elapsed = 0, last = 0;
        const minScale = 0.85, maxScale = 1.20;
        const easeIn = (x) => 1 - Math.cos((x * Math.PI) / 2);
        const easeOut = (x) => Math.sin((x * Math.PI) / 2);
        const clamp01 = (v) => Math.min(1, Math.max(0, v));
        const getPhase = (tMs, pattern, speedMul) => {
            const secs = pattern.map((s) => s * (1 / speedMul));
            const cycle = (secs[0] + secs[1] + secs[2] + secs[3]) * 1000;
            const tm = tMs % cycle;
            const [a, b, c, d] = secs.map((s) => s * 1000);
            if (tm < a) return { phase: 0, frac: tm / (a || 1), cycle };
            if (tm < a + b) return { phase: 1, frac: (tm - a) / (b || 1), cycle };
            if (tm < a + b + c) return { phase: 2, frac: (tm - a - b) / (c || 1), cycle };
            return { phase: 3, frac: (tm - a - b - c) / (d || 1), cycle };
        };

        let lastPhase = -1;
        const setCue = (phase) => {
            const cue = cueRef.current, sub = subRef.current;
            if (!cue) return;
            const labels = ["Inhale", "Hold", "Exhale", "Hold"];
            const subs = ["Breathe In", "Stay", "Breathe Out", "Stay"];
            if (phase !== lastPhase) {
                lastPhase = phase;
                cue.style.opacity = 0; if (sub) sub.style.opacity = 0;
                setTimeout(() => {
                    cue.textContent = labels[phase] || "";
                    if (sub) sub.textContent = subs[phase] || "";
                    cue.style.opacity = 1; if (sub) sub.style.opacity = 0.8;
                }, 140);
            }
        };

        const loop = () => {
            const now = clock.getElapsedTime() * 1000;
            const dt = now - last; last = now;

            if (runningRef.current) elapsed += dt;

            const T = three.current;
            const pattern = PATTERNS[patternRef.current];
            const spd = speedRef.current;
            const inten = intensityRef.current;

            const { phase, frac } = getPhase(elapsed, pattern, spd);
            setCue(phase);

            let s = minScale;
            if (phase === 0) s = minScale + (maxScale * inten - minScale) * easeIn(clamp01(frac));
            else if (phase === 1) s = maxScale * inten;
            else if (phase === 2) s = minScale + (maxScale * inten - minScale) * (1 - easeOut(clamp01(frac)));
            else s = minScale;
            T.breathGroup.scale.setScalar(s);

            T.torus.rotation.x += 0.002; T.torus.rotation.y += 0.0015;
            T.ico.rotation.x += 0.004; T.ico.rotation.y -= 0.003;

            const pulse = phase === 0 ? easeIn(frac) : phase === 2 ? 1 - easeOut(frac) : phase === 1 ? 1 : 0;
            T.ico.material.emissiveIntensity = 0.06 + pulse * 0.18;
            T.torus.material.emissiveIntensity = 0.12 + pulse * 0.18;
            T.ring.scale.setScalar(1 + 0.2 * (0.5 + 0.5 * Math.sin((elapsed / 1000) * 2)));
            T.ring.material.opacity = 0.15 + 0.25 * pulse;

            const t = elapsed / 1000;
            T.camera.position.x = Math.sin(t * 0.1) * 0.3;
            T.camera.position.y = 0.6 + Math.sin(t * 0.07) * 0.1;
            T.camera.lookAt(0, 0, 0);

            const pos = T.particles.geometry.attributes.position;
            for (let i = 0; i < pos.count; i++) {
                const y = pos.getY(i) + (Math.sin(t * 0.3 + i) * 0.0007 + 0.00025);
                pos.setY(i, y > 3 ? -3 : y);
            }
            pos.needsUpdate = true;
            T.controls.update();
            T.renderer.render(T.scene, T.camera);
            rafRef.current = requestAnimationFrame(loop);
        };

        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(loop);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            ro.disconnect();
            controls.dispose();
            renderer.dispose();

            if (soundRef.current) {
                try { soundRef.current.stop(); } catch {}
                try { soundRef.current.disconnect(); } catch {}
            }
            if (listenerRef.current) {
                try { camera.remove(listenerRef.current); } catch {}
            }


            if (renderer.domElement && renderer.domElement.parentNode === mount) {
                mount.removeChild(renderer.domElement);
            }
            scene.traverse((obj) => {
                if (obj.isMesh) {
                    obj.geometry?.dispose?.();
                    if (obj.material?.isMaterial) obj.material.dispose?.();
                }
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const T = THEMES[themeIdx];
        const { bg, torus, ico, pMat, ring } = three.current || {};
        if (!bg || !torus || !ico || !pMat || !ring) return;
        bg.material.color.setHex(T.bg);
        torus.material.color.setHex(T.fg);
        torus.material.emissive.setHex(T.accent);
        ico.material.color.setHex(T.accent);
        ico.material.emissive.setHex(T.fg);
        ring.material.color.setHex(T.accent);
        pMat.color.setHex(T.particles);
    }, [themeIdx]);


    useEffect(() => {
        if (soundOn) playSound();
        else stopSound();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [soundOn, themeIdx]);


    // keyboard
    useEffect(() => {
        const onKey = (e) => {
            if (e.code === "Space") setRunning((r) => !r);
            else if (e.code === "ArrowRight") setThemeIdx((i) => (i + 1) % THEMES.length);
            else if (e.code === "ArrowLeft") setThemeIdx((i) => (i - 1 + THEMES.length) % THEMES.length);
            else if (e.key.toLowerCase() === "h") setHideUI((v) => !v);
            else if (e.key.toLowerCase() === "s") toggleSound();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleSound = async () => {
        if (!soundOn) {
            playSound();
            setSoundOn(true);
        } else {
            setSoundOn(false);
            stopSound();
        }
    };

    return (
        <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
            <div ref={mountRef} style={{ width: "100%", height: "100%" }} />

            <div
                aria-live="polite"
                style={{
                    position: "absolute", left: 0, right: 0, top: "12%",
                    textAlign: "center", pointerEvents: "none",
                    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
                    color: "rgba(255,255,255,0.95)", textShadow: "0 2px 22px rgba(0,0,0,0.4)", userSelect: "none",
                }}
            >
                <div ref={cueRef} style={{ fontSize: "clamp(28px, 6vw, 64px)", letterSpacing: "0.02em", transition: "opacity 140ms ease", opacity: 1, fontWeight: 600 }}>
                    Inhale
                </div>
                <div ref={subRef} style={{ fontSize: "clamp(14px, 2.7vw, 18px)", marginTop: 6, opacity: 0.8, transition: "opacity 140ms ease" }}>
                    Breathe in
                </div>
            </div>

            {!hideUI && (
                <div
                    style={{
                        position: "absolute", left: 16, top: 16, right: 16,
                        display: "grid", gridTemplateColumns: "1fr auto", gap: 12,
                        pointerEvents: "none", fontFamily: "system-ui, sans-serif",
                        color: "rgba(255,255,255,0.92)",
                    }}
                >
                    <div style={{ pointerEvents: "auto", maxWidth: 560 }}>
                        <div style={panelStyle}>
                            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                                <button onClick={() => setRunning((r) => !r)} style={btnStyle}>
                                    {running ? "Pause" : "Start"}
                                </button>

                                <select value={patternKey} onChange={(e) => setPatternKey(e.target.value)} style={selStyle} aria-label="Breathing pattern">
                                    {Object.keys(PATTERNS).map((k) => <option key={k} value={k}>{k}</option>)}
                                </select>

                                <select value={themeIdx} onChange={(e) => setThemeIdx(Number(e.target.value))} style={selStyle} aria-label="Theme">
                                    {THEMES.map((t, i) => <option key={t.name} value={i}>{t.name}</option>)}
                                </select>

                                <button onClick={toggleSound} style={ghostBtnStyle} aria-label="Toggle calming sound">
                                    {soundOn ? "Sound: On" : "Sound: Off"}
                                </button>
                            </div>

                            <LabeledSlider label="Intensity" min={0.7} max={1.5} step={0.01} value={intensity} onChange={setIntensity} />
                            <LabeledSlider label="Speed" min={0.6} max={1.6} step={0.01} value={speed} onChange={setSpeed} help="(higher = faster cycle)" />

                            <div style={{ marginTop: 6, fontSize: 12, opacity: 0.75 }}>
                                Shortcuts: Space – start/pause • ←/→ theme • H – hide UI • S – sound
                            </div>
                        </div>
                    </div>
                    <div style={{ justifySelf: "end", pointerEvents: "auto" }}>
                        <button onClick={() => setHideUI(true)} style={ghostBtnStyle} aria-label="Hide UI">Hide UI (H)</button>
                    </div>
                </div>
            )}
            {hideUI && (
                <button
                    onClick={() => setHideUI(false)}
                    style={{ position: "absolute", right: 16, top: 16, padding: "8px 12px", borderRadius: 12, background: "rgba(0,0,0,0.35)", color: "white", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "system-ui, sans-serif" }}
                >
                    Show UI
                </button>
            )}
        </div>
    );
}

function LabeledSlider({ label, value, onChange, min, max, step, help }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 60px", gap: 8, alignItems: "center", marginTop: 6 }}>
            <div style={{ fontSize: 14, opacity: 0.9 }}>{label}</div>
            <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
            <div style={{ fontVariantNumeric: "tabular-nums", fontSize: 12, opacity: 0.8 }}>{value.toFixed(2)}</div>
            {help && <div style={{ gridColumn: "1 / -1", fontSize: 12, opacity: 0.6 }}>{help}</div>}
        </div>
    );
}

const panelStyle = {
    padding: 12,
    borderRadius: 16,
    background: "rgba(0,0,0,0.35)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.08)",
};

const btnStyle = {
    padding: "8px 12px",
    borderRadius: 12,
    background: "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
    color: "white",
    border: "1px solid rgba(255,255,255,0.2)",
    cursor: "pointer",
};

const ghostBtnStyle = {
    padding: "8px 12px",
    borderRadius: 12,
    background: "rgba(0,0,0,0.35)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.2)",
    cursor: "pointer",
};

const selStyle = {
    padding: "8px 10px",
    borderRadius: 10,
    background: "rgba(0,0,0,0.35)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.2)",
    cursor: "pointer",
};
