import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { cancer_info } from './cancer-info.js';
import { instrument_info } from './instrument-info.js';
import Reveal from './Reveal.jsx';
import SlidingCards from './SlidingCards.jsx';

const translation_of_types = {
  'Head': 'Đầu',
  'Chest': 'Ngực',
  'Abdomen': 'Bụng',
  'Pelvis': 'Khung chậu',
  'Left Arm': 'Tay trái',
  'Right Arm': 'Tay phải',
  'Left Leg': 'Chân trái',
  'Right Leg': 'Chân phải',
}

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

  const base = import.meta.env.BASE_URL || '/'; // to work locally and on GitHub

  const bodyRef = useRef(null);
  const loadModelRef = useRef(null);        // call loader after mount
  const clearHighlightRef = useRef(() => { }); // <- clear highlight before swap

  const [sex, setSex] = useState('female'); // 'male' | 'female'
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  // use latest sex (avoiding description issues)
  const sexRef = useRef(sex)
  useEffect(() => { sexRef.current = sex }, [sex])

  const instRef = useRef(null);
  const loadInstRef = useRef(null);        // call loader after mount

  const [inst, setInst] = useState('ct'); // 'ct' | 'mri' | 'mammography' | 'ultrasound' | 'xray'
  // const [selectedInsr, setSelectedInst] = useState(null);
  const [loadingInst, setLoadingInst] = useState(true);

  // use latest instrument (avoiding description issues)
  const instTypeRef = useRef(inst)
  useEffect(() => { instTypeRef.current = inst }, [inst])

  useEffect(() => {
    const container = bodyRef.current;
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

  useEffect(() => {
    const container = instRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.05, 100)
    camera.position.set(0.4, 0.3, 1.2)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    const hemi = new THREE.HemisphereLight(0xffffff, 0x223322, 1.0)
    const key = new THREE.DirectionalLight(0xffffff, 0.9)
    key.position.set(2, 3, 4)
    scene.add(hemi)
    scene.add(key)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.minDistance = 0.3
    controls.maxDistance = 3

    const loader = new GLTFLoader()
    let currentRoot = new THREE.Group()
    scene.add(currentRoot)

    const fitCameraToObject = (obj) => {
      const box = new THREE.Box3().setFromObject(obj)
      const size = new THREE.Vector3(); box.getSize(size)
      const center = new THREE.Vector3(); box.getCenter(center)
      controls.target.copy(center)
      const maxDim = Math.max(size.x, size.y, size.z)
      const fov = THREE.MathUtils.degToRad(camera.fov)
      const dist = Math.abs(maxDim / (2 * Math.tan(fov / 2))) * 1.2
      camera.position.set(center.x, center.y + dist * 0.3, dist)
      camera.lookAt(center)
      controls.update()
    }

    async function loadInstrument(which) {
      setLoadingInst(true)
      scene.remove(currentRoot)
      currentRoot.traverse(o => o.isMesh && (o.geometry?.dispose(), o.material?.dispose?.()))
      currentRoot = new THREE.Group()
      scene.add(currentRoot)

      switch (which) {
        case 'mri':
          hemi.intensity = 5
          key.intensity = 1.5
          key.color.set(0x88bbff)
          break
        case 'ct':
          hemi.intensity = 0.8
          key.intensity = 5
          key.color.set(0xffffff)
          break
        case 'xray':
          hemi.intensity = 1.3
          key.intensity = 5
          key.color.set(0xfefefe)
          break
        case 'ultrasound':
          hemi.intensity = 0.7
          key.intensity = 5
          key.color.set(0xfff6e8)
          break
        case 'mammography':
          hemi.intensity = 0.6
          key.intensity = 1.5
          key.color.set(0xffe8d0)
          break
        default:
          hemi.intensity = 1.0
          key.intensity = 0.9
          key.color.set(0xffffff)
          break
      }

      const url = `${base}models/${which}.glb`
      loader.load(url, gltf => {
        const model = gltf.scene
        model.traverse(o => {
          if (o.isMesh) {
            if (!o.material) {
              o.material = new THREE.MeshStandardMaterial({ color: 0xC4FDE0, roughness: 0.6 })
            }
          }
        })
        const box = new THREE.Box3().setFromObject(model)
        const size = new THREE.Vector3(); box.getSize(size)
        const scale = 0.6 / Math.max(size.y || size.x || size.z || 1e-3, 1e-3)
        model.scale.setScalar(scale)
        currentRoot.add(model)
        fitCameraToObject(model)
        setLoadingInst(false)
      }, undefined, (err) => {
        console.error('Instrument GLB load error', err)
        setLoadingInst(false)
      })
    }

    loadInstRef.current = loadInstrument
    loadInstrument(inst)



    const onResize = () => {
      const w = container.clientWidth, h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    let raf
    const animate = () => {
      raf = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      controls.dispose()
      renderer.dispose()
      scene.traverse(o => {
        if (o.isMesh) { o.geometry?.dispose(); o.material?.dispose?.() }
      })
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }

    }
  }, [])

  useEffect(() => {
    loadInstRef.current?.(inst)
  }, [inst])

  return (

    <section className="section">
      <h1>Các gia đình ở Việt Nam đã nói với chúng tôi rằng đôi khi việc hiểu về bệnh ung thư và các phương pháp điều trị ung thư là điều khó khăn. Hãy đọc bên dưới để tìm hiểu thêm thông tin...</h1>
      <Reveal dir="right" delay={1} style={{ display: 'flex', flexFlow:'row wrap'}} >
        <div className="card" style={{ flex: 1, overflow: 'auto', height: '65vh', minWidth:'350px'}}>
          <h2>UNG THƯ LÀ GÌ?</h2>
          <p>Ung thư là căn bệnh của các tế bào. Tế bào là những khối xây dựng căn bản của cơ thể con người. Cơ thể chúng ta được tạo nêu từ nhiều dạng tế bào khác nhau như tế bào xương, da và máu.</p>
          <p>
            Ung thư là gì?
            Ung thư là căn bệnh của các tế bào. Tế bào là những khối xây dựng căn bản của cơ thể con người. Cơ thể chúng ta được tạo nêu từ nhiều dạng tế bào khác nhau như tế bào xương, da và máu.
            Các tế bào bất thường tập hợp với nhau và tạo thành một cái bứu gọi là khối u. Có hai loại khối u:
          </p>
          <ul>
            <li>
              Các U Lành tính không phải là ung thư. Chúng không lan ra những phần khác của cơ thể.
            </li>
            <li>
              Các U Ác tính là ung thư. Chúng có thể lan ra các phần khác của cơ thể.
            </li>
          </ul>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <iframe width="450" height="253" src="https://www.youtube.com/embed/vYH4LAufLdM?si=SQLGUpez0sc0gJGv" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
        </div>
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '65vh',  minWidth:'350px'}}>
          <h2>NHỮNG QUAN NIỆM SAI LẦM VỀ UNG THƯ</h2>
          <p>Một ngày sau khi đi kiểm tra sức khỏe, bạn biết mình bị ung thư và cho rằng, mình đã mang án tử hình, điều đó là hoàn toàn sai lầm. Nếu tuân thủ việc khám sức khỏe và lộ trình điều trị của bác sĩ, bạn vẫn có thể sống khỏe tới già bởi nhiều loại ung thư có thể chữa khỏi tới 90%.</p>
          <div className="card" style={{ flex: 1, overflow: 'auto' }}>
            <SlidingCards />
          </div>
        </div>
      </Reveal>

      <Reveal dir="left" delay={2} style={{ marginTop: '1%', display: 'flex', flexFlow:'row wrap', alignItems: 'stretch', justifyContent: 'center' }}>
          <div className="canvas-shell" ref={bodyRef} style={{ flex: 1, height: '65vh', minWidth:'350px'}} />
          <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'stretch', height: '65vh', minWidth:'350px' }}>
            <h2>CÁC LOẠI UNG THƯ THƯỜNG GẶP VÀ NGUYÊN NHÂN</h2>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <div role="group" aria-label="Chọn cơ thể">
                <button
                  className={`btn ${sex === 'female' ? '' : 'btn--outline'}`}
                  onClick={() => setSex('female')}
                  aria-pressed={sex === 'female'}
                >
                  Nữ
                </button>
                <button
                  className={`btn ${sex === 'male' ? '' : 'btn--outline'}`}
                  style={{ marginLeft: '.5rem' }}
                  onClick={() => setSex('male')}
                  aria-pressed={sex === 'male'}
                >
                  Nam
                </button>
              </div>
              {loading && <span className="tag">Đang tải mô hình…</span>}
            </div>
            <div style={{ flex: 5, overflow:'auto'}}>
              {selected ? (
                <>
                  <h3 style={{ marginTop: 0 }}>
                    {translation_of_types[selected.region.match(/[A-Z][a-z]+/g).join(' ')]} — {sex === 'female' ? 'Nữ' : 'Nam'}
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
                    <p style={{ color: 'var(--muted)' }}>Chưa có thông tin cho vùng này...</p>
                  )}
                  <button className="btn btn--outline" style={{ marginTop: '.75rem' }} onClick={() => setSelected(null)}>
                    Bỏ chọn
                  </button>
                </>
              ) : (
                <p style={{ margin: 0, color: 'var(--muted)' }}>
                  Di chuột để làm nổi bật vùng cơ thể. Nhấp vào một vùng cơ thể để xem các loại ung thư liên quan và nguyên nhân thường gặp.
                </p>
              )}
            </div>
          </div>
      </Reveal>

      <Reveal dir="right" delay={3} style={{ marginTop: '1%', display: 'flex', flexFlow:'row wrap', alignItems: 'stretch', justifyContent: 'center' }}>
        
        <div className="card" style={{ display: 'flex', flexFlow:'column wrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '65vh', minWidth:'350px'}}>
          <h2>CHẨN ĐOÁN</h2>
          <div style={{ flex: 1, display: 'flex', flexFlow: 'column wrap', alignItems: 'stretch', justifyContent: 'stretch', overflow:'auto' }}>
            <div style={{ display: 'flex', flexFlow: 'column wrap' }}>
              <button
                className={`btn ${inst === 'ct' ? '' : 'btn--outline'}`}
                onClick={() => setInst('ct')}
              >
                Máy chụp CT/PET
              </button>
              <button
                className={`btn ${inst === 'mammography' ? '' : 'btn--outline'}`}
                onClick={() => setInst('mammography')}
                style={{ marginLeft: '.5rem' }}
              >
                Chụp nhũ ảnh
              </button>
              <button
                className={`btn ${inst === 'mri' ? '' : 'btn--outline'}`}
                onClick={() => setInst('mri')}
                style={{ marginLeft: '.5rem' }}
              >
                Cộng hưởng từ (MRI)
              </button>
              <button
                className={`btn ${inst === 'ultrasound' ? '' : 'btn--outline'}`}
                onClick={() => setInst('ultrasound')}
                style={{ marginLeft: '.5rem' }}
              >
                Siêu âm
              </button>
              <button
                className={`btn ${inst === 'xray' ? '' : 'btn--outline'}`}
                onClick={() => setInst('xray')}
                style={{ marginLeft: '.5rem' }}
              >
                X-quang
              </button>
              {loadingInst && <span className="tag" style={{ marginLeft: '.5rem' }}>Đang tải…</span>}
            </div>
            <p style={{ color: 'var(--muted)' }}>
              Thông tin chi tiết về chẩn đoán sẽ được bổ sung tại đây.
              Hãy xoay và phóng to/thu nhỏ thiết bị để khám phá cấu tạo của nó.
            </p>
            {instrument_info[inst.toLowerCase()]?.map((info, idx) => (
              <p key={idx} style={{ marginTop: '.5rem' }}>
                <strong>{info.description}</strong> — {info.note}
              </p>
            ))}
          </div>
          
        </div>
        <div className="canvas-shell" ref={instRef} style={{ flex: 1, height: '65vh', minWidth:'350px'}} />
      </Reveal>


      <Reveal dir="left" delay={4} style={{ marginTop: '1%', display: 'flex', flexFlow: 'row wrap', alignItems: 'stretch', justifyContent: 'center' }}>
        <div className="card" style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'stretch', justifyContent: 'center', flex: 1, height: '45vh', minWidth: '350px' }}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/TGRYL7ltvZA?si=KDDKCBi4HCCOT50C" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
        <div className="card" style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'stretch', flex: 1, height: '45vh', minWidth: '350px', overflow: 'auto' }}>
          <h2>CÁCH NHÌN NHẬN VỀ BỆNH UNG THƯ</h2>
          <p>Ung thư không phải dấu chấm hết!</p>
          <p>Xem video tại đây để tìm hiểu thêm.</p>

        </div>

      </Reveal>

      <Reveal dir="right" delay={5}>
        <h2>ĐIỀU TRỊ</h2>
        <div className='card'>
          
          <h3>Phẫu thuật</h3>
          <p><strong>Mô tả:</strong> Loại bỏ khối u hoặc mô ung thư ra khỏi cơ thể bằng cách can thiệp ngoại khoa. Thường áp dụng khi khối u còn khu trú.</p>
          <p><strong>Mục đích:</strong> Loại bỏ hoàn toàn khối u hoặc giảm kích thước khối u. Thường kết hợp với các phương pháp điều trị khác.</p>
          <p><strong>Ví dụ:</strong> Cắt bỏ khối u vú, cắt bỏ tuyến tiền liệt.</p>

          <h3>Xạ trị</h3>
          <p><strong>Mô tả:</strong> Sử dụng tia phóng xạ năng lượng cao (như tia X hoặc tia proton) để tiêu diệt tế bào ung thư hoặc làm nhỏ khối u.</p>
          <p><strong>Mục đích:</strong> Tiêu diệt tế bào ung thư, thường nhắm vào vùng cụ thể trong cơ thể.</p>
          <p><strong>Các loại:</strong> Xạ trị bên ngoài, xạ trị nội bộ (brachytherapy).</p>

          <h3>Hóa trị</h3>
          <p><strong>Mô tả:</strong> Sử dụng thuốc tấn công và tiêu diệt các tế bào phân chia nhanh, bao gồm tế bào ung thư.</p>
          <p><strong>Mục đích:</strong> Tiêu diệt tế bào ung thư trong toàn cơ thể, đặc biệt hiệu quả với ung thư đã di căn.</p>
          <p><strong>Cách dùng:</strong> Uống, truyền tĩnh mạch hoặc các phương pháp khác.</p>

          <h3>Miễn dịch trị liệu</h3>
          <p><strong>Mô tả:</strong> Kích thích hoặc phục hồi hệ miễn dịch của cơ thể để nhận diện và tấn công tế bào ung thư.</p>
          <p><strong>Mục đích:</strong> Tăng cường phản ứng miễn dịch hoặc loại bỏ các cơ chế ức chế hệ miễn dịch.</p>
          <p><strong>Ví dụ:</strong> Thuốc ức chế điểm kiểm soát miễn dịch (checkpoint inhibitors), liệu pháp tế bào CAR-T, liệu pháp cytokine.</p>

          <h3>Liệu pháp nhắm trúng đích</h3>
          <p><strong>Mô tả:</strong> Sử dụng thuốc hoặc chất đặc hiệu nhằm vào các phân tử liên quan đến sự phát triển và lan rộng của ung thư.</p>
          <p><strong>Mục đích:</strong> Can thiệp vào các con đường hoặc protein mà tế bào ung thư phụ thuộc.</p>
          <p><strong>Ví dụ:</strong> Thuốc ức chế tyrosine kinase, kháng thể đơn dòng.</p>

          <h3>Liệu pháp nội tiết</h3>
          <p><strong>Mô tả:</strong> Ngăn chặn hoặc loại bỏ hormone mà một số loại ung thư cần để phát triển.</p>
          <p><strong>Mục đích:</strong> Thường sử dụng cho ung thư vú và ung thư tuyến tiền liệt.</p>
          <p><strong>Ví dụ:</strong> Tamoxifen, thuốc ức chế aromatase, liệu pháp giảm androgen.</p>

          <h3>Cấy ghép tế bào gốc (cấy ghép tủy xương)</h3>
          <p><strong>Mô tả:</strong> Thay thế tủy xương bị tổn thương hoặc hủy hoại bằng tế bào gốc khỏe mạnh.</p>
          <p><strong>Mục đích:</strong> Thường áp dụng sau khi dùng liều cao hóa trị hoặc xạ trị để phục hồi khả năng tạo máu.</p>
          <p><strong>Loại:</strong> Tự thân (tế bào gốc của chính bệnh nhân), đồng loại (tế bào gốc từ người cho).</p>

          <h3>Y học chính xác / y học gen</h3>
          <p><strong>Mô tả:</strong> Tùy chỉnh phương pháp điều trị dựa trên đặc điểm di truyền của khối u.</p>
          <p><strong>Mục đích:</strong> Chọn phương pháp điều trị hiệu quả nhất dựa trên đặc tính phân tử của ung thư.</p>

          <p>Mỗi phương pháp có thể dùng riêng lẻ hoặc kết hợp tùy theo loại, giai đoạn, vị trí ung thư và tình trạng sức khỏe của người bệnh.</p>

        </div>
      </Reveal>
    </section>
  );
}
