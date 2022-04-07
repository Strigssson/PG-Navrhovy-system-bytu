import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js'
import {OrbitControls} from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js'
import * as dat from 'dat.gui'

    //MENU S OVLADANIM

    //ZAPNUTIE VYPNUTIE DRAW AND BUILD MODU
    const drawBuildButton = document.querySelector('#drawBuild')
    if (drawBuildButton != null){
        drawBuildButton.addEventListener('click', drawBuild);
    }

    function drawBuild(){
        draw_and_build_Mode = !draw_and_build_Mode
        if (draw_and_build_Mode){
            moverMode = false
            alert("Draw and build mode activated")
        }else{
            moverMode = false
            alert("Draw and build mode disabled")
        }
    }

    //POSTAVENIE STIEN PO STLACENI BUILD TLACIDLA
    const buildButton = document.querySelector('#build')
    if (buildButton != null){
        buildButton.addEventListener('click',build);
    }


    //ZAPNUTIE VYPNUTIE MOVE MODU V DESIGNE
    const moveButton = document.querySelector('#move')
    if (moveButton != null){
        moveButton.addEventListener('click', move);
    }

    function move(){
        moverMode = !moverMode
        if (moverMode){
            draw_and_build_Mode = false
            alert("Mover mode activated")
        }else{
            draw_and_build_Mode = false
            alert("Mover mode disabled")
        }
    }

    //PRIDANIE ITEMOV DO BYTU - TO DO
    var draggableHelper = 0
    //LIVING ROOM

    //TV
    const tvButton = document.querySelector('#tv')
    if (tvButton != null){
        tvButton.addEventListener('click', addTV);
    }

    function addTV(){
        draw_and_build_Mode = false
        moverMode = true;
        createTV();
        draggable = furniture[furniture.length-1];
        draggableHelper = 0;

    }
    //COUCH
    const couchButton = document.querySelector('#couch')
    if (couchButton != null){
        couchButton.addEventListener('click', addCouch);
    }

    function addCouch(){
        draw_and_build_Mode = false
        moverMode = true;
        createCouch();
        draggable = furniture[furniture.length-1];
        draggableHelper = 0;

    }
    //SMALL TABLE
    const smalltableButton = document.querySelector('#smallTable')
    if (smalltableButton != null){
        smalltableButton.addEventListener('click', addsmallTable);
    }

    function addsmallTable(){
        draw_and_build_Mode = false
        moverMode = true;
        createTVTable();
        draggable = furniture[furniture.length-1];
        draggableHelper = 0;

    }

    //BEDROOM

    //BED
    const bedButton = document.querySelector('#bedButton')
    if (bedButton != null){
        bedButton.addEventListener('click', addbed);
    }

    function addbed(){
        draw_and_build_Mode = false
        moverMode = true;
        createBed();
        draggable = furniture[furniture.length-1];
        draggableHelper = 0;
    }
    //WARDROBE
    const wardrobeButton = document.querySelector('#wardrobe')
    if (wardrobeButton != null){
        wardrobeButton.addEventListener('click', addwardrobe);
    }

    function addwardrobe(){
        draw_and_build_Mode = false
        moverMode = true;
        createWardrobe();
        draggable = furniture[furniture.length-1];
        draggableHelper = 0;
    }

    //BATHROOM

    //TOILET
    const toiletButton = document.querySelector('#toilet')
    if (toiletButton != null){
        toiletButton.addEventListener('click', addtoilet);
    }

    function addtoilet(){
        draw_and_build_Mode = false
        moverMode = true;
        createToilet();
        draggable = furniture[furniture.length-1];
        draggableHelper = 0;
    }

    //SHOWER
    const showerButton = document.querySelector('#shower')
    if (showerButton != null){
        showerButton.addEventListener('click', addshower);
    }

    function addshower(){
        draw_and_build_Mode = false
        moverMode = true;
        createShower();
        draggable = furniture[furniture.length-1];
        draggableHelper = 0;
    }


    //KITCHEN

    //FRIDGE
    const fridgeButton = document.querySelector('#fridge')
    if (fridgeButton != null){
        fridgeButton.addEventListener('click', addfridge);
    }

    function addfridge(){
        draw_and_build_Mode = false
        moverMode = true;
        createFridge()
        draggable = furniture[furniture.length-1];
        draggableHelper = 0;
    }

    //KITCHENUNIT
    const unitButton = document.querySelector('#kitchenunit')
    if (unitButton != null){
        unitButton.addEventListener('click', addunit);
    }

    function addunit(){
        draw_and_build_Mode = false
        moverMode = true;
        createKitchenUnit();
        draggable = furniture[furniture.length-1];
        draggableHelper = 0;
    }

    //STOVE
    const stoveButton = document.querySelector('#stove')
    if (stoveButton != null){
        stoveButton.addEventListener('click', addstove);
    }

    function addstove(){
        draw_and_build_Mode = false
        moverMode = true;
        createStove();
        draggable = furniture[furniture.length-1];
        draggableHelper = 0;
    }

    //WINDOW/DOOR

    //WINDOW
    const windowButton = document.querySelector('#window')
    if (windowButton != null){
        windowButton.addEventListener('click', addwindow);
    }

    function addwindow(){
        draw_and_build_Mode = false
        moverMode = true;
        createWindow();
        draggable = furniture[furniture.length-1];
        draggableHelper = 0;
    }

    //DOOR
    const doorButton = document.querySelector('#door')
    if (doorButton != null){
        doorButton.addEventListener('click', adddoor);
    }

    function adddoor(){
        draw_and_build_Mode = false
        moverMode = true;
        createDoor();
        draggable = furniture[furniture.length-1];
        draggableHelper = 0;
    }



    //SKALOVANIE NABYTKU - EDIT SELECTED
    const updateButton = document.querySelector('#submit')
    if (updateButton != null){
        updateButton.addEventListener('click', submit);
    }

    function submit(){
        draggableHelper = 0;
        var width = document.getElementById('width').value
        var length = document.getElementById('length').value
        var height = document.getElementById('height').value
        var color = document.getElementById('color').value //FORMAT #000000
        var materialColor = color.replace('#','0x')

        if(draggable){
            //FARBENIE NABYTKU - NEMOZNOST FARBIT NECOLORABLE - TELEVIZOR, OKNO
            if(draggable.userData.name == 'Couch' && draggable.userData.colorable){
                draggable.children[4].material.color.setHex(materialColor);
                draggable.material.color.setHex(materialColor);
            }else if (draggable.userData.colorable){
                draggable.material.color.setHex(materialColor);
            }
            //SKALOVANIE NABYTKU
            if(!draggable.userData.vertical){
                if(draggable.geometry.parameters.width != width){
                    draggable.scale.x = width/draggable.geometry.parameters.width;
                    draggable.geometry.parameters.width = width;
                }
                if(draggable.geometry.parameters.height != length){
                    draggable.scale.y = length/draggable.geometry.parameters.height;
                    draggable.geometry.parameters.height = length;
                }
                if(draggable.geometry.parameters.depth != height){
                    if(!draggable.userData.wallable){
                        draggable.position.z = draggable.position.z + (height-draggable.geometry.parameters.depth);
                    }
                    draggable.scale.z = height/draggable.geometry.parameters.depth;
                    draggable.geometry.parameters.depth = height;
                }
            }else{
                if(draggable.geometry.parameters.width != width){
                    draggable.scale.x = width/draggable.geometry.parameters.width;
                    draggable.geometry.parameters.width = width;
                }
                if(draggable.geometry.parameters.depth != length){
                    draggable.scale.z = length/draggable.geometry.parameters.depth;
                    draggable.geometry.parameters.depth = length;
                }
                if(draggable.geometry.parameters.height != height){
                    if(height < draggable.geometry.parameters.height ){
                        draggable.position.y = draggable.position.y + (height-draggable.geometry.parameters.height)
                    }else{
                        draggable.position.y = draggable.position.y + (height-draggable.geometry.parameters.height)/2;
                    }
                    draggable.scale.y = height/draggable.geometry.parameters.height;
                    draggable.geometry.parameters.height = height;
                }
            }
        }
    }

    //ZMAZANIE NABYTKU - DELETE OBJECT
    const deleteButton = document.querySelector('#delete')
    if (deleteButton != null){
        deleteButton.addEventListener('click', deleteObj);
    }

    function deleteObj(){
        if(draggable){
            scene.remove(draggable)
            draggable = null;
            document.getElementById('width').value = null;
            document.getElementById('length').value = null;
            document.getElementById('height').value = null;
            document.getElementById('color').value = null;
            document.getElementById('name').value = null;
        }

}



    //ZAPNUTIE VYPNUTE VIEW MODU
    const viewButton = document.querySelector('#view')
    if (viewButton != null){
        viewButton.addEventListener('click', view);
    }

    function view(){
        draw_and_build_Mode = false
        moverMode = false
        alert("Viewer mode activated")
    }

    //NASTAVENIE OPACITY STIEN
    var opacity = false;
    const opacityButton = document.querySelector('#opacity')
    if (opacityButton != null){
        opacityButton.addEventListener('click', opacityfn);
    }

    function opacityfn(){
        opacity = !opacity;
        if(opacity){
            for(let w of walls){
                w.material.opacity = 0.1;
            }
        }else{
            for(let w of walls){
                w.material.opacity = 1;
            }
        }
    }

    //HELP BUTTON
    const helpButton = document.querySelector('#help')
    if (helpButton != null){
        helpButton.addEventListener('click', help);
    }

    function help(){
        alert("In Draw and build:\n" +
            "Use button to enable mode\n" +
            "Use mouse clicks to draw lines\n" +
            "After you draw lines press build button to build walls\n" +
            "In Design:\n" +
            "Use button to enable mover mode\n" +
            "Pick up/Drop furniture by clicking and drag with mouse\n" +
            "When picked up furniture, rotate it using arrows ← or →\n" +
            "Avoid trying to drop furniture in wall or other furniture\n" +
            "To edit dragging furniture go to Edit selected\n" +
            "To delete furniture press \"delete\" key or delete object button\n" +
            "In View:\n" +
            "Use button to disable all modes\n" +
            "Use Wall opacity to change opacity");
    }


    //CAMERA
    const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1500);
    camera.position.set(0,80,150);
    camera.lookAt(0,0,0);

    //RENDERER
    const renderer = new THREE.WebGLRenderer( {antialias:true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement)

    //SCENE
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfd1e5)

    export function animate(){
        requestAnimationFrame(animate);
        if(draggable != null){
            manipulateObject();
        }
        renderer.render(scene, camera);
    }

    //PRIDANIE OBLOHY DO OKOLIA
    var geometrySphere = new THREE.SphereGeometry(200,200,200);
    var cubeTexture = new THREE.ImageUtils.loadTexture('texture/sky.jpg');
    var materialSphere = new THREE.MeshBasicMaterial({map: cubeTexture, transparent:true, side:THREE.DoubleSide});
    var sphere = new THREE.Mesh(geometrySphere,materialSphere)

    sphere.position.set(0,0,0);
    scene.add(sphere)

    //OVLADANIE KAMERY
    const control = new OrbitControls(camera, renderer.domElement)


    //AMBIENT SVETLO
    let ambientLight = new THREE.AmbientLight(0xffffff, 0.20);
    scene.add(ambientLight);


    //POLE OBJEKTOV PRE TVORENIE STIEN
    var objects = [];

    //POLE OBJEKTOV NABYTOK
    var furniture = [];

    //POLE OBJEKTOV STENY
    var walls = [];

    //VYTVORENIE POVRCHU
    function createFloor(){
        let pos = {x: 0, y: -1, z: 3}
        let scale = {x: 100, y: 2, z:100}

        let blockPlane = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshPhongMaterial({color: 0xD3D3D3}))
        blockPlane.position.set(pos.x, pos.y, pos.z);
        blockPlane.scale.set(scale.x, scale.y, scale.z);
        blockPlane.castShadow = true;
        blockPlane.receiveShadow = true;
        scene.add(blockPlane);

        //PRIDANIE POVRCHU DO POLA - NA NOM SA BUDU TVORIT STENY

        objects.push(blockPlane);

        blockPlane.userData.name = 'GROUND';
        blockPlane.userData.ground = false;
        blockPlane.userData.collidable = false;
    }


    //EVENT LISTENER NA RESIZE OKNA
    window.addEventListener('resize', onWindowResize);

    export function onWindowResize(){
        camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    //POSUVANIE OBJEKTOV MYSOU PO ZEMI
    const raycaster = new THREE.Raycaster();
    const clickMouse = new THREE.Vector2();
    const moveMouse = new THREE.Vector2();
    var draggable;
    var deletable;
    var moverMode = false;

    var wallsArrayBoundingBox = []
    var furnitureArrayBoundingBox = []
    var collision = false;


    window.addEventListener('click', event => {
        if(moverMode){

            clickMouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            clickMouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

            raycaster.setFromCamera( clickMouse, camera );
            const intersects = raycaster.intersectObjects( scene.children );

            if(draggable){

                //vytvorenie bounding boxov pre steny
                let i = 0;
                for (let w of walls){
                        wallsArrayBoundingBox[i] = new THREE.Box3().setFromObject(w);
                    i++;
                }

                //vytvorenie BOUNDING BOXOV pre vsetky nabytky, okrem toho tahaneho
                let j = 0;
                for (let f of furniture){
                    if(f.uuid != draggable.uuid) {
                        furnitureArrayBoundingBox[j] = new THREE.Box3().setFromObject(f);
                        j++;
                    }
                }

                //VYTVORENIE BOUNDING BOXU TAHANEHO OBJEKTU
                var draggableBoundingBox = new THREE.Box3().setFromObject(draggable)


                //Kontrola zrazky nabytkov
                for (let b of furnitureArrayBoundingBox) {
                    if (draggableBoundingBox.intersectsBox(b)) {
                        collision = true;
                    }
                }

                if(!draggable.userData.wallable) {
                    //Kontrola zrazky nabytku a steny
                    for(let w of wallsArrayBoundingBox){
                        if(draggableBoundingBox.intersectsBox(w)){
                            collision = true;
                        }
                    }
                }


                if (collision){
                    alert('Nemozem pustit nabytok, je tu kolizia')
                    collision = false;
                }else if (draggableHelper != 0){
                        for (let o of intersects){
                            if(o.object.userData.ground || o.object.userData.wall){
                                furnitureArrayBoundingBox = [];
                                draggable = null;
                                collision = false;
                                document.getElementById('width').value = null;
                                document.getElementById('length').value = null;
                                document.getElementById('height').value = null;
                                document.getElementById('color').value = null;
                                document.getElementById('name').value = null;
                            }
                        }

                }else{
                    draggableHelper = 1;
                }

            //chytenie nabytku
            }else if(intersects.length > 0 && intersects[0].object.userData.draggable){
                draggable = intersects[0].object;
                //nastavenie hodnot pre EDIT nabytku
                var color = draggable.material.color.getHexString();
                var htmlColor = "#"+color;
                if (!draggable.userData.vertical){
                    document.getElementById('width').value = draggable.geometry.parameters.width;
                    document.getElementById('length').value = draggable.geometry.parameters.height;
                    document.getElementById('height').value = draggable.geometry.parameters.depth;
                }else{
                    document.getElementById('width').value = draggable.geometry.parameters.width;
                    document.getElementById('length').value = draggable.geometry.parameters.depth;
                    document.getElementById('height').value = draggable.geometry.parameters.height;
                }
                document.getElementById('color').value = htmlColor;
                document.getElementById('name').value = draggable.userData.name;
            }


        }
    })


    window.addEventListener('mousemove', event => {
        moveMouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        moveMouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    })


    function manipulateObject(){
        //NABYTOK PO ZEMI
        if(draggable != null){
            raycaster.setFromCamera(moveMouse, camera);
            const intersects = raycaster.intersectObjects( scene.children );

            //OTACANIE OZNACENEHO MOVABLE OBJEKTU SIPKAMI


            var rotateAngleFurniture = 0.00006
            var rotateAngleWallable = 0.00003

            window.addEventListener('keydown', event => {
                if(draggable.userData.rotatable){
                    if(draggable.userData.wallable){
                        var rotation_matrix = new THREE.Matrix4().identity();
                        if (event.keyCode == 37){
                            draggable.rotateOnAxis( new THREE.Vector3(0,0,1), rotateAngleWallable);
                        }else if (event.keyCode == 39){
                            draggable.rotateOnAxis( new THREE.Vector3(0,0,1), -rotateAngleWallable);
                        }
                    }else if (draggable.userData.vertical){
                        var rotation_matrix = new THREE.Matrix4().identity();
                        if (event.keyCode == 37){
                            draggable.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngleFurniture);
                        }else if (event.keyCode == 39){
                            draggable.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngleFurniture);
                        }
                    }else{
                        var rotation_matrix = new THREE.Matrix4().identity();
                        if (event.keyCode == 37){
                            draggable.rotateOnAxis( new THREE.Vector3(0,0,1), rotateAngleFurniture);
                        }else if (event.keyCode == 39){
                            draggable.rotateOnAxis( new THREE.Vector3(0,0,1), -rotateAngleFurniture);
                        }
                    }
                }
                if(event.keyCode == 46){
                    scene.remove(draggable);
                }
            })
            control.update();

            if(intersects.length > 0){
                for (let o of intersects) {
                    if(draggable.userData.wallable){
                        if(o.object.userData.wall){
                            draggable.position.x = o.point.x
                            draggable.position.z = o.point.z
                            draggable.position.y = o.point.y
                        }
                    }else if (o.object.userData.ground){
                        draggable.position.x = o.point.x
                        draggable.position.z = o.point.z
                    }
                }
            }
        }
    }



    // CIARA NA VYTVORENIE PODORYSU
    var raycasterWall = new THREE.Raycaster();
    var mouseLine = new THREE.Vector2();
    var intersects;
    var clickCount = 0;
    var controlPoints = []

    var finalPoints = []
    var finalPointsCounter = 0;
    var draw_and_build_Mode = false;

    window.addEventListener('click', event =>{
        if(draw_and_build_Mode){
            mouseLine.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseLine.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycasterWall.setFromCamera(mouseLine, camera);
            intersects = raycasterWall.intersectObjects( objects );

            if(intersects.length > 0){

                if(clickCount <=1) {
                    controlPoints[clickCount] = intersects[0].point.clone();
                    finalPoints[finalPointsCounter] = intersects[0].point.clone();
                    var cp = new THREE.Mesh(new THREE.SphereGeometry(0.125, 16, 12), new THREE.MeshBasicMaterial({color: 0xff0000}));
                    cp.position.copy(intersects[0].point);
                    scene.add(cp);

                    clickCount++;
                    finalPointsCounter++;
                }
                if(clickCount == 2){

                    const geometry = new THREE.BufferGeometry().setFromPoints(controlPoints)
                    const line = new THREE.Line(geometry,new THREE.LineBasicMaterial( { color: 0x000000 } ) )
                    scene.add(line)
                    line.position.y += 0.001
                    line.userData.line = true;

                    clickCount = 0;
                    controlPoints = []

                }
            }
        }

    })



    //VYTVORENIE STIEN A MIESTNOSTI S PODLAHOU A SVETLOM AK JE ZAPNUTY BUILDER MODE

function build(){
            if (draw_and_build_Mode){
                var helpCounter = 0;
                var helpPoints = [];

                let helpMaxXAxis = 0;
                let helpMinXAxis = 0;

                let helpMaxZAxis = 0;
                let helpMinZAxis = 0;


                for (let i = 0; i < finalPointsCounter; i++){
                    helpPoints[helpCounter] = finalPoints[i];
                    // zistenie najvacsej a najmensej X suradnice
                    if(helpMaxXAxis < finalPoints[i].x || i == 0){
                        helpMaxXAxis = finalPoints[i].x;
                    }

                    if(helpMinXAxis > finalPoints[i].x || i == 0){
                        helpMinXAxis = finalPoints[i].x
                    }

                    // zistenie najvacsej a najmensej Z suradnice
                    if(helpMaxZAxis < finalPoints[i].z || i == 0){
                        helpMaxZAxis = finalPoints[i].z;
                    }

                    if(helpMinZAxis > finalPoints[i].z || i == 0){
                        helpMinZAxis = finalPoints[i].z
                    }


                    //VYTVORENIE STIEN
                    helpCounter++;
                    if (helpCounter == 2){
                        var shapeRoom = new THREE.Shape();
                        shapeRoom.moveTo(helpPoints[0].x, -helpPoints[0].z);
                        shapeRoom.lineTo(helpPoints[1].x, -helpPoints[1].z);



                        var extrudeWallSettings = {
                            steps: 5,
                            amount: 15,
                            depth: 10,
                            bevelEnabled: false
                        };
                        var extrudeWallGeom = new THREE.ExtrudeBufferGeometry(shapeRoom, extrudeWallSettings);
                        extrudeWallGeom.rotateX(-Math.PI / 2);
                        var wall = new THREE.Mesh(extrudeWallGeom, new THREE.MeshPhongMaterial({
                            color: 0xffffff,
                            transparent: true,
                            side: THREE.BackSide,
                        }));

                        wall.userData.coordinatePointX0 = helpPoints[0].x
                        wall.userData.coordinatePointX1 = helpPoints[1].x
                        wall.userData.coordinatePointZ0 = helpPoints[0].z
                        wall.userData.coordinatePointZ1 = helpPoints[1].z
                        wall.userData.wall = true;

                        scene.add(wall);

                        walls.push(wall)


                        helpCounter = 0;
                        helpPoints = [];


                    }
                }

                //PRIDANIE PODLAHY DO OBJEKTU
                var shapeFloor = new THREE.Shape();
                if (finalPoints.length > 2){
                    shapeFloor.moveTo(finalPoints[0].x, -finalPoints[0].z);
                    for (let p = 1; p < finalPoints.length; p++)
                    shapeFloor.lineTo(finalPoints[p].x, -finalPoints[p].z);
                }
                var extrudeFloorSettings = {
                steps: 1,
                    amount: 0.01,
                    bevelEnabled: false
                };
                var extrudeFloorGeom = new THREE.ExtrudeBufferGeometry(shapeFloor, extrudeFloorSettings);
                extrudeFloorGeom.rotateX(-Math.PI / 2);
                let floor = new THREE.Mesh(extrudeFloorGeom, new THREE.MeshPhongMaterial({color: 0xfff000}))
                floor.position.y += 0.01;

                scene.add(floor);

                floor.userData.name = 'HOUSEFLOOR';
                floor.userData.ground = true;



                //PRIDANIE SVETLA DO PRIBLIZNE STREDU VYTVORENEHO OBJEKTU
                if(finalPoints.length > 2){
                    var roomLight = new THREE.PointLight(0xffffff, 0.4);
                    var xAxis = (helpMaxXAxis + helpMinXAxis) / 2;
                    var zAxis = (helpMaxZAxis + helpMinZAxis) / 2 ;
                    roomLight.position.set(xAxis, 13, zAxis)
                    scene.add(roomLight);

                    const sphereSize = 1;
                    const pointLightHelper = new THREE.PointLightHelper (roomLight, sphereSize);
                    scene.add(pointLightHelper)
                }

            }
        finalPoints = []
        helpPoints = []
        finalPointsCounter = 0
        }





   createFloor();
    animate();




function createWindow(){
    var windowFrameGeometry = new THREE.BoxGeometry(0.2,7,7);
    var windowFrameMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff
    })
    var windowFrame = new THREE.Mesh(windowFrameGeometry, windowFrameMaterial)
    windowFrame.position.y += 7;


    var windowGlassMaterial = new THREE.MeshBasicMaterial({color:0xADD8E6 , transparent:true, side:THREE.DoubleSide});
    var windowGlassGeometry = new THREE.BoxGeometry(0.21,6,6);
    var windowGlass = new THREE.Mesh(windowGlassGeometry, windowGlassMaterial)


    scene.add(windowGlass);
    scene.add(windowFrame);


    windowFrame.add(windowGlass);
    windowFrame.userData.name = 'Window';
    windowFrame.userData.wallable = true;
    windowFrame.userData.draggable = true;
    windowFrame.userData.rotatable = true;
    windowFrame.userData.colorable = false;
    windowFrame.rotation.x = 1.58
    furniture.push(windowFrame);
}

function createTV(){
        var TVGeometry = new THREE.BoxGeometry(0.2,6,4);
        var TVMaterial = new THREE.MeshLambertMaterial({
            color:0x000000
        })
        var TV = new THREE.Mesh(TVGeometry, TVMaterial);
        TV.position.set(-19.85,5,12)
        TV.rotation.x -= 1.575
        scene.add(TV);

        TV.userData.name = 'TV'
        TV.userData.draggable = true;
        TV.userData.wallable = true;
        TV.userData.rotatable = true;
        TV.userData.colorable = false;

        furniture.push(TV)


}

function createCouch() {
    var couchSitGeometry = new THREE.BoxGeometry(2, 7, 0.65);
    var couchSitMaterial = new THREE.MeshPhongMaterial({
        color: 0xff0000
    })
    var couchSit = new THREE.Mesh(couchSitGeometry, couchSitMaterial);
    couchSit.position.z = 0.7
    couchSit.position.x = -1
    couchSit.position.y = 1
    couchSit.rotation.x = 1.57
    scene.add(couchSit);


    var couchLeanGeometry = new THREE.BoxGeometry(1, 7, 1);
    var couchLeanMaterial = new THREE.MeshPhongMaterial({
        color: 0xff0000
    })
    var couchLean = new THREE.Mesh(couchLeanGeometry, couchLeanMaterial);
    couchLean.position.z = -0.5
    couchLean.position.x = 0.5
    couchLean.position.y = 0
    scene.add(couchLean);


    var couchLegGeometry = new THREE.CylinderGeometry(0.1,0.2,0.58,64);
    var couchLegMaterial = new THREE.MeshPhongMaterial({
        color: 0xc0c0c0
    })
    var couchLeg = new THREE.Mesh(couchLegGeometry, couchLegMaterial);
    couchLeg.position.z = 0.62
    couchLeg.position.x = 0.6
    couchLeg.position.y = 3.2
    couchLeg.rotation.x = 1.6
    scene.add(couchLeg);

    var couchLeg2 = new THREE.Mesh(couchLegGeometry, couchLegMaterial);
    couchLeg2.position.z = 0.62
    couchLeg2.position.y = -3
    couchLeg2.position.x = 0.6
    couchLeg2.rotation.x = 1.6
    scene.add(couchLeg2);

    var couchLeg3 = new THREE.Mesh(couchLegGeometry, couchLegMaterial);
    couchLeg3.position.z = 0.62
    couchLeg3.position.y = -3
    couchLeg3.position.x = -0.7
    couchLeg3.rotation.x = 1.6
    scene.add(couchLeg3);

    var couchLeg4 = new THREE.Mesh(couchLegGeometry, couchLegMaterial);
    couchLeg4.position.z = 0.62
    couchLeg4.position.y = 3.2
    couchLeg4.position.x = -0.7
    couchLeg4.rotation.x = 1.6
    scene.add(couchLeg4);

    couchSit.add(couchLeg);
    couchSit.add(couchLeg2);
    couchSit.add(couchLeg3);
    couchSit.add(couchLeg4);
    couchSit.add(couchLean);



    couchSit.position.set(-12,1.1,13);



    couchSit.userData.draggable = true;
    couchSit.userData.rotatable = true;
    couchSit.userData.colorable = true;
    couchSit.userData.name = 'Couch'


    furniture.push(couchSit);


}

    function createTVTable(){

        //vrchna doska a RODIC
        var desk = new THREE.Mesh(new THREE.BoxBufferGeometry(2,4, 0.1), new THREE.MeshPhongMaterial({color: 0xff0000, side:THREE.DoubleSide}))
        desk.position.set(-16,1.2,12)
        desk.rotation.x -= 1.5708

        desk.userData.rotatable = true;
        desk.userData.draggable = true;
        desk.userData.colorable = true
        desk.userData.name = 'Small table'
        scene.add(desk);
        furniture.push(desk);

        //nohy
        var leg = new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.2,1.2,64), new THREE.MeshPhongMaterial({color: 0xc0c0c0}))
        leg.rotation.x -= 1.5708
        leg.position.set(-0.7,1.7,-0.575)
        scene.add(leg)
        var leg2 = new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.2,1.2,64), new THREE.MeshPhongMaterial({color: 0xc0c0c0}))
        leg2.rotation.x -= 1.5708
        leg2.position.set(0.7,1.7,-0.575)
        scene.add(leg2)
        var leg3 = new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.2,1.2,64), new THREE.MeshPhongMaterial({color: 0xc0c0c0}))
        leg3.rotation.x -= 1.5708
        leg3.position.set(-0.7,-1.7,-0.575)
        scene.add(leg3)
        var leg4 = new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.2,1.2,64), new THREE.MeshPhongMaterial({color: 0xc0c0c0}))
        leg4.rotation.x -= 1.5708
        leg4.position.set(0.7,-1.7,-0.575)
        scene.add(leg4)

        //JOIN EVERYTHING
        desk.add(leg)
        desk.add(leg2)
        desk.add(leg3)
        desk.add(leg4)
    }

    function createBed(){
        var bedGeometry = new THREE.BoxGeometry(6, 10, 0.65);
        var bedMaterial = new THREE.MeshPhongMaterial({
            color: 0xff0000
        })
        var bed = new THREE.Mesh(bedGeometry, bedMaterial);
        scene.add(bed);

        bed.position.y = 1
        bed.rotation.x = 1.57


        var bedLegGeometry = new THREE.CylinderGeometry(0.1,0.2,0.58,64);
        var bedLegMaterial = new THREE.MeshPhongMaterial({
            color: 0xc0c0c0
        })
        var bedLeg = new THREE.Mesh(bedLegGeometry, bedLegMaterial);
        bedLeg.position.z = 0.62
        bedLeg.position.x = 2.75
        bedLeg.position.y = 4.3
        bedLeg.rotation.x = 1.6
        scene.add(bedLeg);

        var bedLeg2 = new THREE.Mesh(bedLegGeometry, bedLegMaterial);
        bedLeg2.position.z = 0.62
        bedLeg2.position.y = -4.25
        bedLeg2.position.x = 2.75
        bedLeg2.rotation.x = 1.6
        scene.add(bedLeg2);

        var bedLeg3 = new THREE.Mesh(bedLegGeometry, bedLegMaterial);
        bedLeg3.position.z = 0.62
        bedLeg3.position.y = -4.25
        bedLeg3.position.x = -2.75
        bedLeg3.rotation.x = 1.6
        scene.add(bedLeg3);

        var bedLeg4 = new THREE.Mesh(bedLegGeometry, bedLegMaterial);
        bedLeg4.position.z = 0.62
        bedLeg4.position.y = 4.3
        bedLeg4.position.x = -2.75
        bedLeg4.rotation.x = 1.6
        scene.add(bedLeg4);

        var pillowGeometry = new THREE.BoxGeometry(1.75, 1, 0.2);
        var pillowMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff
        })
        var pillow = new THREE.Mesh(pillowGeometry, pillowMaterial);
        scene.add(pillow);
        pillow.position.z = -0.45;
        pillow.position.x = -1.5;
        pillow.position.y = -3.5;

        var pillow2 = new THREE.Mesh(pillowGeometry, pillowMaterial);
        scene.add(pillow2);
        pillow2.position.z = -0.45;
        pillow2.position.x = 1.5;
        pillow2.position.y = -3.5;

        var blanketGeometry = new THREE.BoxGeometry(5, 7, 0.2);
        var blanketMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff
        })
        var blanket = new THREE.Mesh(blanketGeometry, blanketMaterial);
        scene.add(blanket);
        blanket.position.z = -0.45;
        blanket.position.x = 0;
        blanket.position.y = 1;

        bed.userData.draggable = true;
        bed.userData.rotatable = true;
        bed.userData.colorable = true;
        bed.userData.name = 'Bed'


        furniture.push(bed);

        bed.add(bedLeg);
        bed.add(bedLeg2);
        bed.add(bedLeg3);
        bed.add(bedLeg4);
        bed.add(pillow);
        bed.add(pillow2);
        bed.add(blanket);

    }

    function createWardrobe(){
        var wardrobeGeometry = new THREE.BoxGeometry(6, 10, 3);
        var wardrobeMaterial = new THREE.MeshPhongMaterial({
            color: 0xa27c5b
        })
        var wardrobe = new THREE.Mesh(wardrobeGeometry, wardrobeMaterial);
        scene.add(wardrobe);
        wardrobe.position.y = 5

        var handleGeometry = new THREE.SphereGeometry(0.3,32,16)
        var handleMaterial = new THREE.MeshPhongMaterial({
            color: 0xffd700
        })
        var handle = new THREE.Mesh(handleGeometry, handleMaterial);
        scene.add(handle);
        handle.position.y = 0
        handle.position.x = -2
        handle.position.z = 1.75


        wardrobe.userData.draggable = true;
        wardrobe.userData.rotatable = true;
        wardrobe.userData.colorable = true;
        wardrobe.userData.vertical = true;
        wardrobe.userData.name = 'Wardrobe'

        furniture.push(wardrobe);

        wardrobe.add(handle);
    }

    function createToilet(){
        var bowlGeometry = new THREE.BoxGeometry(2,2,3)
        var bowlMaterial = new THREE.MeshPhongMaterial({
            color:0xffffff
        })
        var bowl = new THREE.Mesh(bowlGeometry,bowlMaterial)
        scene.add(bowl)
        bowl.position.y = 1.5

        var lidGeometry = new THREE.RingGeometry(0.5,1,32);
        var lidMaterial = new THREE.MeshPhongMaterial({
            color:0xff0000
        })
        var lid = new THREE.Mesh(lidGeometry,lidMaterial)
        scene.add(lid)
        lid.position.y = 1.01
        lid.position.z = 0.5
        lid.rotation.x = -1.575

        var tankGeometry = new THREE.BoxGeometry(2,3,1);
        var tankMaterial = new THREE.MeshPhongMaterial({
            color:0xffffff
        })
        var tank = new THREE.Mesh(tankGeometry,tankMaterial)
        scene.add(tank)
        tank.position.y = 1.5
        tank.position.z = -1

        var handleGeometry = new THREE.BoxGeometry(0.5, 0.2, 0.1);
        var handleMaterial = new THREE.MeshPhongMaterial({
            color: 0xc0c0c0
        })
        var handle = new THREE.Mesh(handleGeometry, handleMaterial);
        scene.add(handle);
        handle.position.y = 2.75
        handle.position.z = -1
        handle.position.x = 1.1

        bowl.userData.draggable = true;
        bowl.userData.rotatable = true;
        bowl.userData.colorable = true;
        bowl.userData.vertical = true;
        bowl.userData.name = 'Toilet'

        furniture.push(bowl);

        bowl.add(lid);
        bowl.add(tank);
        bowl.add(handle);


    }

    function createShower(){
        var showerGeometry = new THREE.BoxGeometry(6,10,6);
        var showerMaterial = new THREE.MeshStandardMaterial({
            transparent: true,
            opacity: 0.9,
            color: 0x000000
        })
        var shower = new THREE.Mesh(showerGeometry, showerMaterial)
        scene.add(shower)
        shower.position.y = 5

        var handleGeometry = new THREE.BoxGeometry(1.5, 0.2, 0.5);
        var handleMaterial = new THREE.MeshPhongMaterial({
            color: 0xc0c0c0
        })
        var handle = new THREE.Mesh(handleGeometry, handleMaterial);
        scene.add(handle);
        handle.position.y = 1
        handle.position.z = 3
        handle.position.x = -1.5

        shower.userData.draggable = true;
        shower.userData.rotatable = true;
        shower.userData.colorable = true;
        shower.userData.vertical = true;
        shower.userData.name = 'Shower'

        furniture.push(shower);

        shower.add(handle)
    }

    function createFridge(){
        var fridgeGeometry = new THREE.BoxGeometry(6, 10, 3);
        var fridgeMaterial = new THREE.MeshPhongMaterial({
            color: 0xc0c0c0
        })
        var fridge = new THREE.Mesh(fridgeGeometry, fridgeMaterial);
        scene.add(fridge);
        fridge.position.y = 5

        fridge.userData.draggable = true;
        fridge.userData.rotatable = true;
        fridge.userData.colorable = true;
        fridge.userData.vertical = true;
        fridge.userData.name = 'Fridge'

        var handleGeometry = new THREE.BoxGeometry(0.5, 4, 0.5);
        var handleMaterial = new THREE.MeshPhongMaterial({
            color: 0x000000
        })
        var handle = new THREE.Mesh(handleGeometry, handleMaterial);
        scene.add(handle);
        handle.position.y = 2.5
        handle.position.x = -2.5
        handle.position.z = 1.5

        var handle2Geometry = new THREE.BoxGeometry(0.5, 3, 0.5);
        var handle2 = new THREE.Mesh(handle2Geometry, handleMaterial);
        scene.add(handle2);
        handle2.position.y = -2.5
        handle2.position.x = -2.5
        handle2.position.z = 1.5

        var separatorGeometry = new THREE.BoxGeometry(5.99, 0.2, 0.5);
        var separatorMaterial = new THREE.MeshPhongMaterial({
            color: 0x000000
        })
        var separator = new THREE.Mesh(separatorGeometry,separatorMaterial)
        scene.add(separator);
        separator.position.z = 1.251
        separator.position.y = -0.5


        fridge.add(handle);
        fridge.add(handle2);
        fridge.add(separator);
        furniture.push(fridge);
    }

    function createKitchenUnit(){
        var unitGeometry = new THREE.BoxGeometry(4, 5, 4);
        var unitMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff
        })
        var unit = new THREE.Mesh(unitGeometry, unitMaterial);
        scene.add(unit);
        unit.position.y = 2.5

        var workGeometry = new THREE.BoxGeometry(4.1, 0.2, 4.1);
        var workMaterial = new THREE.MeshPhongMaterial({
            color: 0x000000
        })
        var work = new THREE.Mesh(workGeometry, workMaterial);
        scene.add(work);
        work.position.y = 2.5

        var handleGeometry = new THREE.BoxGeometry(0.2, 3.5, 0.5);
        var handleMaterial = new THREE.MeshPhongMaterial({
            color: 0x000000
        })
        var handle = new THREE.Mesh(handleGeometry, handleMaterial);
        scene.add(handle);
        handle.position.y = 0.5
        handle.position.x = 0.5
        handle.position.z = 1.8

        var handle2 = new THREE.Mesh(handleGeometry, handleMaterial);
        scene.add(handle2);
        handle2.position.y = 0.5
        handle2.position.x = -0.5
        handle2.position.z = 1.8

        var holeGeometry = new THREE.BoxGeometry(0.05, 5, 0.5);
        var hole = new THREE.Mesh(holeGeometry, handleMaterial)
        scene.add(hole);
        hole.position.z = 1.775

        unit.userData.draggable = true;
        unit.userData.rotatable = true;
        unit.userData.colorable = true;
        unit.userData.vertical = true;
        unit.userData.name = 'Kitchen unit'

        unit.add(work);
        unit.add(handle);
        unit.add(handle2);
        unit.add(hole);

        furniture.push(unit);
    }

    function createStove(){
        var stoveGeometry = new THREE.BoxGeometry(4, 5, 4);
        var stoveMaterial = new THREE.MeshPhongMaterial({
            color: 0xc0c0c0
        })
        var stove = new THREE.Mesh(stoveGeometry, stoveMaterial);
        scene.add(stove);
        stove.position.y = 2

        var plateGeometry = new THREE.CircleGeometry(0.5,32);
        var plateMaterial = new THREE.MeshPhongMaterial({
            color: 0x000000
        })
        var plate = new THREE.Mesh(plateGeometry, plateMaterial)
        scene.add(plate);
        plate.position.y = 2.6
        plate.rotation.x = -1.575
        plate.position.x = -1
        plate.position.z = -1

        var plate2 = new THREE.Mesh(plateGeometry, plateMaterial)
        scene.add(plate2);
        plate2.position.y = 2.6
        plate2.rotation.x = -1.575
        plate2.position.x = 1
        plate2.position.z = -1

        var plate3 = new THREE.Mesh(plateGeometry, plateMaterial)
        scene.add(plate3);
        plate3.position.y = 2.6
        plate3.rotation.x = -1.575
        plate3.position.x = 1
        plate3.position.z = 1

        var plate4 = new THREE.Mesh(plateGeometry, plateMaterial)
        scene.add(plate4);
        plate4.position.y = 2.6
        plate4.rotation.x = -1.575
        plate4.position.x = -1
        plate4.position.z = 1


        stove.userData.draggable = true;
        stove.userData.rotatable = true;
        stove.userData.colorable = true;
        stove.userData.vertical = true;
        stove.userData.name = 'Stove'

        var bakerGeometry = new THREE.BoxGeometry(3.5,2.75,0.1);
        var bakerMaterial = new THREE.MeshPhongMaterial({
            color: 0x000000
        })
        var baker = new THREE.Mesh(bakerGeometry, bakerMaterial);
        scene.add(baker);
        baker.position.z = 1.96

        var bakerHandleGeometry = new THREE.BoxGeometry(3.3, 0.2, 0.5);
        var bakerHandleMaterial = new THREE.MeshPhongMaterial({
            color: 0xc0c0c0
        })
        var bakerHandle = new THREE.Mesh(bakerHandleGeometry, bakerHandleMaterial);
        scene.add(bakerHandle);
        bakerHandle.position.y = 1
        bakerHandle.position.z = 1.9

        var burnerGeometry = new THREE.CylinderGeometry(0.2,0.2,0.2,32);
        var burnerMaterial = new THREE.MeshPhongMaterial({
            color: 0x000000
        })
        var burner = new THREE.Mesh(burnerGeometry,burnerMaterial)
        scene.add(burner);
        burner.position.y = 2
        burner.position.z = 1.96
        burner.position.x = -1.5
        burner.rotation.x = 1.575

        var burner2 = new THREE.Mesh(burnerGeometry,burnerMaterial)
        scene.add(burner2);
        burner2.position.y = 2
        burner2.position.z = 1.96
        burner2.position.x = -0.9
        burner2.rotation.x = 1.575

        var burner3 = new THREE.Mesh(burnerGeometry,burnerMaterial)
        scene.add(burner3);
        burner3.position.y = 1.75
        burner3.position.z = 1.96
        burner3.position.x = -0.3
        burner3.rotation.x = 1.575

        var burner4 = new THREE.Mesh(burnerGeometry,burnerMaterial)
        scene.add(burner4);
        burner4.position.y = 1.75
        burner4.position.z = 1.96
        burner4.position.x = 0.3
        burner4.rotation.x = 1.575

        var burner5 = new THREE.Mesh(burnerGeometry,burnerMaterial)
        scene.add(burner5);
        burner5.position.y = 2
        burner5.position.z = 1.96
        burner5.position.x = 0.9
        burner5.rotation.x = 1.575

        var burner6 = new THREE.Mesh(burnerGeometry,burnerMaterial)
        scene.add(burner6);
        burner6.position.y = 2
        burner6.position.z = 1.96
        burner6.position.x = 1.5
        burner6.rotation.x = 1.575

        stove.add(plate)
        stove.add(plate2)
        stove.add(plate3)
        stove.add(plate4)
        stove.add(baker)
        stove.add(bakerHandle)
        stove.add(burner)
        stove.add(burner2)
        stove.add(burner3)
        stove.add(burner4)
        stove.add(burner5)
        stove.add(burner6)

        furniture.push(stove);

    }

    function createDoor(){
        var doorGeometry = new THREE.BoxGeometry(0.2,4,7);
        var doorMaterial = new THREE.MeshPhongMaterial({
            color: 0x5c4033
        })
        var door = new THREE.Mesh(doorGeometry, doorMaterial)
        scene.add(door);

        var handleGeometry = new THREE.SphereGeometry(0.3,32,16)
        var handleMaterial = new THREE.MeshPhongMaterial({
            color: 0xffd700
        })
        var handle = new THREE.Mesh(handleGeometry, handleMaterial);
        scene.add(handle);
        handle.position.y = 1.5
        handle.position.x = 0.4


        var handle2 = new THREE.Mesh(handleGeometry, handleMaterial);
        scene.add(handle2);
        handle2.position.y = 1.5
        handle2.position.x = -0.4


        door.userData.name = 'Door';
        door.userData.wallable = true;
        door.userData.draggable = true;
        door.userData.rotatable = true;
        door.userData.colorable = false;
        door.rotation.x = 1.58
        door.position.y = 3.5

        door.add(handle);
        door.add(handle2);

        furniture.push(door);

    }

animate();

