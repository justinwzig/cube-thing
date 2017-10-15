var three = THREE;
var container, stats;
var cube, raycaster;
var camera, scene, renderer;
var viewWidth, viewHeight, viewSize, aspectRatio;
var cliX, cliY, cliZ;
var mX, mY;
var baseX, baseY, baseZ;
var clickCount = 1;
var cubeSize = 5;

init();
animate();

function init(){
  //attach to html
  container = document.createElement('div');
  document.body.appendChild(container);

  //window stuff
  viewWidth=window.innerWidth;
  viewHeight=window.innerHeight;
  viewSize=25;

  //parts
  //camera (left, right, top, bottom, near, far)
  var aspectRatio = viewWidth/viewHeight;
	camera = new THREE.OrthographicCamera(-aspectRatio*viewSize/2, aspectRatio*viewSize/2, viewSize/2,-viewSize/2, -1000,  1000); //centered around the origin
	camera.position.x = 2.5;
  camera.position.y = -2.5;
  camera.position.z = -2.5;
  
  //scene
  scene = new three.Scene();
  
  //cube
  var geometry = new three.BoxGeometry(cubeSize, cubeSize, cubeSize);
  var material = new three.MeshFaceMaterial([
    new three.MeshBasicMaterial({color: 0x5559ff}),
    new three.MeshBasicMaterial({color: 0xff0000}),
    new three.MeshBasicMaterial({color: 0x0000ff}),
    new three.MeshBasicMaterial({color: 0xffff00}),
    new three.MeshBasicMaterial({color: 0x00ffff}),
    new three.MeshBasicMaterial({color: 0xff00ff})
  ]);
  cube = new three.Mesh(geometry,material);
  scene.add(cube);
  baseX = 0; 
  baseY = 0;
  baseZ = 0;

  //raycaster
  raycaster = new THREE.Raycaster();
  
	//renderer
  renderer = new three.WebGLRenderer();
  renderer.setClearColor(0x333333);
  renderer.setSize(viewWidth, viewHeight);
  container.appendChild(renderer.domElement);
  window.addEventListener('resize', onWindowResize, false);
}

//functions

function changeFace(){
  baseX=Math.random(0,10)*Math.PI;
  baseY=Math.random(0,10)*Math.PI;
  baseZ=Math.random(0,10)*Math.PI;

  cube.rotation.y = baseY+mX;
  cube.rotation.x = baseX+(mY/2);
  cube.rotation.Z = baseZ+(mY/2);
  
  console.log("X= "+baseX/Math.PI+", Y= "+baseY/Math.PI+", Z= "+baseZ/Math.PI+", ClickCount= "+clickCount);
  console.log(cube.rotation.Z);

  if(clickCount==3){
    clickCount=1;
    baseX==0;
    baseY==0;
    baseZ==0;
  } else {
    clickCount++;
  }


}

window.addEventListener('mousemove', function(e){
    //base cube movement
    cliX = event.clientX;
    cliY = event.clientY;
    cliZ = event.clientZ

    mX = (cliX-viewWidth/2)/viewWidth;
    mY = (cliY-viewHeight/2)/viewHeight;

    cube.rotation.y = baseY+mX;
    cube.rotation.x = baseX+(mY/2);
    cube.rotation.Z = baseZ+(mY/2);



    /*
    //Zones
    if(event.clientX < viewWidth/2 && event.clientY < viewHeight/2){
      currZone = 0; 
    } else if (event.clientX > viewWidth/2 && event.clientY < viewHeight/2){
      currZone = 1;viewWidth
    } else if (event.clientX > viewWidth/2 && event.clientY > viewHeight/2){
      currZone = 2;
    } else if (event.clientX < viewWidth/2 && event.clientY > viewHeight/2){
      currZone = 3;
    }

    if(currZone == 0 && prevZone == 0){

    }
    */

    /*
    //Weird implementation
    if(event.clientX < viewWidth/2 && event.clientY < viewHeight/2){
      cube.rotation.x = event.clientX/viewWidth*Math.PI;
    } else if(event.clientX > viewWidth/2 && event.clientY < viewHeight/2){
      cube.rotation.y = (event.clientX-viewWidth/2)/viewWidth*Math.PI;
    } else if(event.clientX > viewWidth/2 && event.clientY > viewHeight/2){
      cube.rotation.z = event.clientX/viewWidth*Math.PI;
      cube.rotation.y = (event.clientX-viewWidth/2)/viewWidth*Math.PI;
    } 
    //cube.lookAt(mouse3D);
    */
});


window.addEventListener('mousedown', function(e){
  
  var vector = new THREE.Vector3(
    (event.clientX/window.innerWidth)*2-1,
    -(event.clientY/window.innerWidth)*2+1,0.5);
  
  var intersectedObjects = rayCaster/intersectObjects(scene.children,true);

  print(intersectedObjects);

});

function onWindowResize(){
  scene.remove(camera);
  aspectRatio = viewWidth/viewHeight;
  camera = new THREE.OrthographicCamera(-aspectRatio*viewSize/2, aspectRatio*viewSize/2, viewSize/2,-viewSize/2, -1000,  1000); //centered around the origin
  camera.position.x = 2.5;
  camera.position.y = -2.5;
  camera.position.z = -2.5;
  camera.updateProjectionMatrix();
  renderer.setSize( viewWidth, viewHeight );
}


function animate(){
  frames();

	requestAnimationFrame(animate);
  render();
}

function render(){
  camera.lookAt( scene.position );
  renderer.render( scene, camera );
}
