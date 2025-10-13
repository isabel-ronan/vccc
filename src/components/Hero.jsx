import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

export default function Hero() {
  const base = import.meta.env.BASE_URL || '/'; // to work locally and on GitHub

  const mountRef = useRef(null);

  useEffect(() => {
    let camera, scene, renderer, material, geometry, sprite, particles;
    let mouseX = 0, mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    // Init Scene
    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 2, 2000);
    camera.position.z = 1000;

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000 );
    scene.fog = new THREE.FogExp2(0x000000, 0.001);


    geometry = new THREE.BufferGeometry();
    const vertices = [];

    sprite = new THREE.TextureLoader().load(`${base}textures/disc.png`);
    sprite.colorSpace = THREE.SRGBColorSpace;

    for (let i = 0; i < 10000; i++) {
      const x = 2000 * Math.random() - 1000;
      const y = 2000 * Math.random() - 1000;
      const z = 2000 * Math.random() - 1000;
      vertices.push(x, y, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    material = new THREE.PointsMaterial({
      size: 35,
      sizeAttenuation: true,
      map: sprite,
      alphaTest: 0.5,
      transparent: true,
      color: new THREE.Color().setHSL(1.0, 0.3, 0.7)
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const onPointerMove = (event) => {
      if (!event.isPrimary) return;
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    };

    const onWindowResize = () => {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    document.addEventListener('pointermove', onPointerMove);
    window.addEventListener('resize', onWindowResize);

    const animate = () => {
      const time = Date.now() * 0.00005;

      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      const h = (360 * (1.0 + time) % 360) / 360;
      material.color.setHSL(h, 0.5, 0.5);

      renderer.render(scene, camera);

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('pointermove', onPointerMove);

      mountRef.current?.removeChild(renderer.domElement);

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="hero-section">
      <div
        ref={mountRef}
        className="three-canvas"
      />
      <div
        className="hero-content"
      >
        <h1>Caring for the Caregivers</h1>
        <p>You are not alone. We're here to support, guide, and stand with you.</p>

          <Link className="btn" to="/cancer">Find Out More</Link>
      </div>
    </div>
  );
}
