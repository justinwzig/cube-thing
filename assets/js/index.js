"use strict";

var scene, container, viewSize;
var cube, baseX, baseY, baseZ, spin;
var outlineCube;
var camera, renderer, aspectRatio;
var mouse, raycaster;

init();
animate();

function init(){
  //attach to html
  container = document.createElement('div');
  document.body.appendChild(container);

  //window stuff
  viewSize=25;

  //parts
  //camera (left, right, top, bottom, near, far)
  var aspectRatio = window.innerWidth/window.innerHeight;
	camera = new THREE.OrthographicCamera(-aspectRatio*viewSize/2, aspectRatio*viewSize/2, viewSize/2,-viewSize/2, -1000,  1000); //centered around the origin
  
  //scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x333333);

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  
  //cube
  var geometry = new THREE.BoxGeometry(2, 2, 2);
  var material = new THREE.MeshFaceMaterial([
    new THREE.MeshBasicMaterial({color: 0x5559ff}),
    new THREE.MeshBasicMaterial({color: 0xff0000}),
    new THREE.MeshBasicMaterial({color: 0x0000ff}),
    new THREE.MeshBasicMaterial({color: 0xffff00}),
    new THREE.MeshBasicMaterial({color: 0x00ffff}),
    new THREE.MeshBasicMaterial({color: 0xff00ff})
  ]);
  cube = new THREE.Mesh(geometry,material);
  scene.add(cube);
  baseX=0;
  baseY=0;
  baseZ=0;
  spin=true;

	//renderer
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
  container.appendChild(renderer.domElement);
  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('mousedown', onDocumentMouseDown, false)

  window.scene = scene; 
}

window.addEventListener('mousemove', function(e){
    if(spin){
      //base cube movement
      var cliX = event.clientX;
      var cliY = event.clientY;
      var cliZ = event.clientZ

      var mX = (cliX-window.innerWidth/2)/window.innerWidth;
      var mY = (cliY-window.innerHeight/2)/window.innerHeight;

      cube.rotation.y += baseY+mX;
      cube.rotation.x += baseX+(mY/2);
      cube.rotation.Z += baseZ+(mY/2);
    }
});


function onWindowResize(){
  scene.remove(camera);
  aspectRatio = window.innerWidth/window.innerWidth;
  camera = new THREE.OrthographicCamera(-aspectRatio*viewSize/2, aspectRatio*viewSize/2, viewSize/2,-viewSize/2, -1000,  1000); //centered around the origin
  //camera.position.x = 2.5;
  //camera.position.y = -2.5;
  //camera.position.z = -2.5;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerWidth );
}


function onDocumentMouseDown(){
  event.preventDefault();
  spin=false;

  var material = new THREE.MeshFaceMaterial([
     new THREE.MeshBasicMaterial({color: 0xf9f9f9, outline: true, linewidth: 10}),
     new THREE.MeshBasicMaterial({color: 0xf9f9f9, outline: true, linewidth: 10}),
     new THREE.MeshBasicMaterial({color: 0xf9f9f9, outline: true, linewidth: 10}),
     new THREE.MeshBasicMaterial({color: 0xf9f9f9, outline: true, linewidth: 10}),
     new THREE.MeshBasicMaterial({color: 0xf9f9f9, outline: true, linewidth: 10}),
     new THREE.MeshBasicMaterial({color: 0xf9f9f9, outline: true, linewidth: 10}),
  ]);
  outlineCube = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), material);
  scene.add(outlineCube);
  outlineCube.rotation.y=cube.rotation.y;
  outlineCube.rotation.x=cube.rotation.x;
  outlineCube.rotation.z=cube.rotation.z;
  scene.remove(cube);

  

}


function rotateCube(){
  cube.rotation.y += 0.02;
}


function animate(){
  if(spin)
    rotateCube();
  requestAnimationFrame(animate);
  render();
}

function render(){
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}
