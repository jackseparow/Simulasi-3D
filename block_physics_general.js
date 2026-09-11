// block_physics_general.js

// 1. Blok Dunia Fisika / Environment (Gravitasi, Gesekan)
Blockly.Blocks['physics_world'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Atur Lingkungan Fisika");
    this.appendValueInput("GRAVITY")
        .setCheck("Number")
        .appendField("Gravitasi Z (m/s²)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#E65100");
    this.setTooltip("Mengatur gravitasi dunia fisika");
  }
};

jsGen.forBlock['physics_world'] = function(block) {
  var gravity = jsGen.valueToCode(block, 'GRAVITY', jsGen.ORDER_ATOMIC) || '-9.81';
  return `if (window.physicsWorld) window.physicsWorld.gravity.set(0, 0, ${gravity});\n`;
};

// 2. Blok Sifat Fisika Objek (Massa, Kecepatan, Bounciness)
Blockly.Blocks['physics_body'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Beri Sifat Fisika (Rigid Body)");
    this.appendValueInput("MASS")
        .setCheck("Number")
        .appendField("Massa (kg) [0 = Statis/Dinding]");
    this.appendValueInput("RESTITUTION")
        .setCheck("Number")
        .appendField("Membal / Pantulan (0-1)");
    this.appendValueInput("VX")
        .setCheck("Number")
        .appendField("Kecepatan Awal X");
    this.appendValueInput("VY")
        .setCheck("Number")
        .appendField("Kecepatan Awal Y");
    this.appendValueInput("VZ")
        .setCheck("Number")
        .appendField("Kecepatan Awal Z");
    this.appendStatementInput("OBJECT")
        .setCheck(null)
        .appendField("Objek 3D");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FF5722");
    this.setTooltip("Menjadikan objek 3D buatan pengguna memiliki massa dan merespon gaya fisika");
  }
};

jsGen.forBlock['physics_body'] = function(block) {
  var mass = jsGen.valueToCode(block, 'MASS', jsGen.ORDER_ATOMIC) || '1';
  var restitution = jsGen.valueToCode(block, 'RESTITUTION', jsGen.ORDER_ATOMIC) || '0.7';
  var vx = jsGen.valueToCode(block, 'VX', jsGen.ORDER_ATOMIC) || '0';
  var vy = jsGen.valueToCode(block, 'VY', jsGen.ORDER_ATOMIC) || '0';
  var vz = jsGen.valueToCode(block, 'VZ', jsGen.ORDER_ATOMIC) || '0';
  var branch = jsGen.statementToCode(block, 'OBJECT');

  var code = `
  (function() {
    const parentGroup = new THREE.Group();
    sceneGroup.add(parentGroup);

    const tempGroup = sceneGroup;
    sceneGroup = parentGroup;
    ${branch}
    sceneGroup = tempGroup;

    // Hitung Bounding Box objek buatan pengguna untuk membuat bentuk fisik (Collision Shape)
    const bbox = new THREE.Box3().setFromObject(parentGroup);
    const size = new THREE.Vector3();
    bbox.getSize(size);
    const center = new THREE.Vector3();
    bbox.getCenter(center);

    const halfExtents = new CANNON.Vec3(size.x / 2 || 0.5, size.y / 2 || 0.5, size.z / 2 || 0.5);
    const shape = new CANNON.Box(halfExtents);

    const mat = new CANNON.Material({ restitution: ${restitution} });
    const body = new CANNON.Body({
      mass: ${mass},
      shape: shape,
      material: mat
    });

    body.position.set(parentGroup.position.x + center.x, parentGroup.position.y + center.y, parentGroup.position.z + center.z);
    body.velocity.set(${vx}, ${vy}, ${vz});

    if (window.physicsWorld) window.physicsWorld.addBody(body);

    parentGroup.userData.physicsBody = body;
    if (window.simulatedObjects) window.simulatedObjects.push(parentGroup);
  })();
  `;
  return code;
};
