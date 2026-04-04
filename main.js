// ── Three.js animated particle / neural-network background ──────────────────
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js';

(function initBackground() {
  const canvas = document.getElementById('bg-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 50;

  // ── Particles ──
  const COUNT = 500;
  const positions = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT * 3; i++) positions[i] = (Math.random() - 0.5) * 140;

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleMat = new THREE.PointsMaterial({
    color: 0x00d4ff,
    size: 0.35,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // ── Neural network lines (nearest-neighbour) ──
  const lineMat = new THREE.LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.07 });
  const THRESHOLD = 22;
  const lineGeo = new THREE.BufferGeometry();
  const linePositions = [];

  for (let i = 0; i < COUNT; i++) {
    const ax = positions[i * 3], ay = positions[i * 3 + 1], az = positions[i * 3 + 2];
    for (let j = i + 1; j < COUNT; j++) {
      const bx = positions[j * 3], by = positions[j * 3 + 1], bz = positions[j * 3 + 2];
      const d = Math.hypot(ax - bx, ay - by, az - bz);
      if (d < THRESHOLD) {
        linePositions.push(ax, ay, az, bx, by, bz);
      }
    }
  }

  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(lines);

  // ── Floating torus knot accent ──
  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(12, 3.5, 120, 18, 2, 3),
    new THREE.MeshBasicMaterial({ color: 0x7b5ea7, wireframe: true, transparent: true, opacity: 0.12 })
  );
  knot.position.set(38, -12, -30);
  scene.add(knot);

  // ── Mouse parallax ──
  const mouse = { x: 0, y: 0 };
  window.addEventListener('mousemove', e => {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // ── Resize ──
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ── Animate ──
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    particles.rotation.y = t * 0.012;
    particles.rotation.x = t * 0.006;
    lines.rotation.y = t * 0.012;
    lines.rotation.x = t * 0.006;

    knot.rotation.x = t * 0.2;
    knot.rotation.y = t * 0.14;

    // subtle parallax
    camera.position.x += (mouse.x * 4 - camera.position.x) * 0.04;
    camera.position.y += (-mouse.y * 4 - camera.position.y) * 0.04;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
  animate();
})();

// ── Intersection observer for fade-in elements ────────────────────────────────
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.15 }
);
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── Animate skill bars on scroll ─────────────────────────────────────────────
const barObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.width;
    }
  }),
  { threshold: 0.3 }
);
document.querySelectorAll('.skill-bar').forEach(bar => barObserver.observe(bar));

// ── Mini Three.js thumbnail canvases for project cards ───────────────────────
function initProjectCanvas(canvasEl, type) {
  if (!canvasEl) return;
  const r = new THREE.WebGLRenderer({ canvas: canvasEl, alpha: true, antialias: true });
  const w = canvasEl.offsetWidth || 340;
  const h = canvasEl.offsetHeight || 200;
  r.setPixelRatio(window.devicePixelRatio);
  r.setSize(w, h);
  const s = new THREE.Scene();
  const c = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
  c.position.z = 5;

  let mesh;
  if (type === 'sphere') {
    mesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.6, 4),
      new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.45 })
    );
  } else if (type === 'torus') {
    mesh = new THREE.Mesh(
      new THREE.TorusGeometry(1.2, 0.45, 16, 60),
      new THREE.MeshBasicMaterial({ color: 0x7b5ea7, wireframe: true, transparent: true, opacity: 0.45 })
    );
  } else {
    mesh = new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.4 })
    );
  }
  s.add(mesh);

  const cl = new THREE.Clock();
  function loop() {
    requestAnimationFrame(loop);
    const t = cl.getElapsedTime();
    mesh.rotation.x = t * 0.4;
    mesh.rotation.y = t * 0.6;
    r.render(s, c);
  }
  loop();
}

document.querySelectorAll('.project-thumb canvas[data-shape]').forEach(c => {
  initProjectCanvas(c, c.dataset.shape);
});
