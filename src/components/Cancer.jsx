import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { cancer_info } from './cancer-info.js'

function applyRegionTags(gltfScene) {
  const REGION_RULES = [
    { region: 'Head', includes: ['head', 'skull', 'face'] },
    { region: 'Chest', includes: ['chest', 'thorax', 'rib', 'clavicle', 'sternum'] },
    { region: 'Abdomen', includes: ['abdomen', 'stomach', 'belly'] },
    { region: 'Pelvis', includes: ['pelvis', 'hip', 'pelvic'] },
    { region: 'LeftArm', includes: ['leftarm', 'l_arm', 'leftshoulder', 'lefthand', 'leftforearm'] },
    { region: 'RightArm', includes: ['rightarm', 'r_arm', 'rightshoulder', 'righthand', 'rightforearm'] },
    { region: 'LeftLeg', includes: ['leftleg', 'l_leg', 'leftthigh', 'leftcalf', 'leftfoot'] },
    { region: 'RightLeg', includes: ['rightleg', 'r_leg', 'rightthigh', 'rightcalf', 'rightfoot'] },
  ];

  gltfScene.traverse(obj => {
    if (obj.isMesh) {
      const name = (obj.name || '').toLowerCase();
      for (const rule of REGION_RULES) {
        if (rule.includes.some(k => name.includes(k))) {
          obj.userData.region = rule.region;
          obj.userData.originalMaterial = obj.material;
          break;
        }
      }
    }
  });
}

function getInfoFor(sex, region) {
  return [
    ...(cancer_info.shared[region] || []),
    ...((cancer_info[sex] && cancer_info[sex][region]) || [])
  ];
}

export default function Cancer() {
  const mountRef = useRef(null);
  const loadModelRef = useRef(null);        // call loader after mount
  const clearHighlightRef = useRef(() => { }); // <- clear highlight before swap

  const [sex, setSex] = useState('female'); // 'male' | 'female'
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  // use latest sex (avoiding description issues)
  const sexRef = useRef(sex)
  useEffect(() => { sexRef.current = sex }, [sex])

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // scene, camera, renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 1.6, 3.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // lights
    scene.add(new THREE.HemisphereLight(0xffffff, 0x223322, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 0.8);
    key.position.set(2, 3, 4);
    scene.add(key);

    // controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 1.5;
    controls.maxDistance = 6;
    controls.target.set(0, 1.2, 0);

    // model holder
    let currentRoot = new THREE.Group();
    scene.add(currentRoot);

    // raycast and highlight
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const highlightMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#89FBC2'),
      emissive: new THREE.Color('#0A9245'),
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.9
    });
    let lastHighlighted = null;

    function clearHighlight() {
      if (lastHighlighted?.mesh) {
        lastHighlighted.mesh.material = lastHighlighted.originalMaterial;
        lastHighlighted = null;
      }
    }
    clearHighlightRef.current = clearHighlight;

    function fitCameraToObject(obj) {
      const box = new THREE.Box3().setFromObject(obj);
      const size = new THREE.Vector3(); box.getSize(size);
      const center = new THREE.Vector3(); box.getCenter(center);
      controls.target.copy(center);
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = THREE.MathUtils.degToRad(camera.fov);
      let dist = Math.abs(maxDim / (2 * Math.tan(fov / 2)));
      dist *= 1.3;
      camera.position.set(center.x, center.y + 0.2, dist);
      camera.lookAt(center);
      controls.update();
    }

    const loader = new GLTFLoader();
    const base = import.meta.env.BASE_URL || '/'; // to work locally and on GitHub
    let loadToken = 0; // to avoid bad conditions on fast toggles

    async function loadModelForSex(sexVal) {
      const myToken = ++loadToken;
      setLoading(true);
      // remove old
      scene.remove(currentRoot);
      currentRoot.traverse(o => { if (o.isMesh) { o.geometry?.dispose(); o.material?.dispose?.(); } });
      currentRoot = new THREE.Group();
      scene.add(currentRoot);

      const url = `${base}models/${sexVal}.glb`;
      return new Promise((resolve, reject) => {
        loader.load(
          url,
          (gltf) => {
            if (myToken !== loadToken) return resolve(); // stale load, aborted
            const model = gltf.scene;
            model.traverse(o => {
              if (o.isMesh) {
                o.material = new THREE.MeshStandardMaterial({
                  color: new THREE.Color('#C4FDE0'),
                  metalness: 0,
                  roughness: 0.9
                });
                o.castShadow = o.receiveShadow = false;
              }
            });
            // normalize height
            const box = new THREE.Box3().setFromObject(model);
            const size = new THREE.Vector3(); box.getSize(size);
            const scale = 2 / Math.max(size.y, 1e-3);
            model.scale.setScalar(scale);

            applyRegionTags(model);
            currentRoot.add(model);
            fitCameraToObject(model);
            setLoading(false);
            resolve();
          },
          undefined,
          (err) => { console.error('GLB load error', err); setLoading(false); reject(err); }
        );
      });
    }

    // expose loader to call when model sex changes
    loadModelRef.current = loadModelForSex;

    // pointer handlers
    function onPointerMove(e) {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(currentRoot.children, true);
      const hit = intersects.find(i => i.object.userData.region);
      if (hit && hit.object !== lastHighlighted?.mesh) {
        clearHighlight();
        lastHighlighted = { mesh: hit.object, originalMaterial: hit.object.material };
        hit.object.material = highlightMat;
      } else if (!hit) {
        clearHighlight();
      }
    }

    function onClick() {
      if (!lastHighlighted?.mesh) return;
      const region = lastHighlighted.mesh.userData.region;
      if (!region) return;
      const currentSex = sexRef.current // get current sex for correct descriptions
      const items = getInfoFor(currentSex, region)
      setSelected({ region, items })
    }

    // resize window
    const onResize = () => {
      const w = container.clientWidth, h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('click', onClick);

    // animate window
    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // initial model
    loadModelForSex(sex);

    // cleanup
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('click', onClick);
      controls.dispose();
      renderer.dispose();
      scene.traverse(o => {
        if (o.isMesh) { o.geometry?.dispose(); o.material?.dispose?.(); }
      });
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
    };
  }, []); // mount once

  // reload model when sex changes
  useEffect(() => {
    // clear ui with old model
    clearHighlightRef.current?.();
    setSelected(null);
    // load new model
    loadModelRef.current?.(sex);
  }, [sex]);

  return (
    <section className="section">
      <h2>Common Cancers and Their Causes</h2>



      <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center' }}>
        <div className="canvas-shell" ref={mountRef} style={{ flex: 1 }} />

        <div className="card"  style={{flex:1, display: 'flex', flexDirection:'column', alignItems: 'stretch', justifyContent: 'stretch' }}>
          <div style={{ flex:1, display: 'flex', alignItems: 'center'}}>
            <div role="group" aria-label="Select body">
              <button
                className={`btn ${sex === 'female' ? '' : 'btn--outline'}`}
                onClick={() => setSex('female')}
                aria-pressed={sex === 'female'}
              >
                Female
              </button>
              <button
                className={`btn ${sex === 'male' ? '' : 'btn--outline'}`}
                style={{ marginLeft: '.5rem' }}
                onClick={() => setSex('male')}
                aria-pressed={sex === 'male'}
              >
                Male
              </button>
            </div>
            {loading && <span className="tag">Loading model…</span>}
          </div>
          <div style={{flex:5}}>
            {selected ? (
              <>
                <h3 style={{ marginTop: 0 }}>
                  {selected.region.match(/[A-Z][a-z]+/g).join(' ')} — {sex === 'female' ? 'Female' : 'Male'}
                </h3>
                {selected.items.length ? (
                  <ul style={{ marginTop: '.5rem' }}>
                    {selected.items.map((it, idx) => (
                      <li key={idx}>
                        <strong>{it.name}</strong>{it.note ? ` — ${it.note}` : ''}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: 'var(--muted)' }}>No information yet on this region...</p>
                )}
                <button className="btn btn--outline" style={{ marginTop: '.75rem' }} onClick={() => setSelected(null)}>
                  Clear Selection
                </button>
              </>
            ) : (
              <p style={{ margin: 0, color: 'var(--muted)' }}>
                Hover to highlight a body region. Click a body region to see associated cancers and common causes.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
