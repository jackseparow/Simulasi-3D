// block_physics_general.js

// 1. Blok Lingkungan Fisika (Gravitasi & Lingkungan)
Blockly.Blocks['physics_world'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Atur Lingkungan Fisika");
    this.appendValueInput("GRAVITY_Z")
        .setCheck("Number")
        .appendField("Gravitasi Z (m/s²)");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#E65100");
    this.setTooltip("Mengatur arah dan percepatan gravitasi lingkungan");
  }
};

jsGen.forBlock['physics_world'] = function(block) {
  var gz = jsGen.valueToCode(block, 'GRAVITY_Z', jsGen.ORDER_ATOMIC) || '-9.81';
  return `if (window.physicsWorld) window.physicsWorld.gravity.set(0, 0, ${gz});\n`;
};

// 2. Blok Sifat Fisika Objek Buatan Pengguna
Blockly.Blocks['physics_body'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Beri Sifat Fisika (Rigid Body)");
    this.appendValueInput("MASS")
        .setCheck("Number")
        .appendField("Massa (kg) [0 = Statis/Dinding]");
    this.appendValueInput("RESTITUTION")
        .setCheck("Number")
        .appendField("Elastisitas / Pantulan (0-1)");
    this.appendValueInput("VX")
        .setCheck("Number")
        .appendField("Kecepatan V_x");
    this.appendValueInput("VY")
        .setCheck("Number")
        .appendField("Kecepatan V_y");
    this.appendValueInput("VZ")
        .setCheck("Number")
        .appendField("Kecepatan V_z");
    this.appendStatementInput("OBJECT")
        .setCheck(null)
        .appendField("Bentuk / Objek 3D");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FF5722");
    this.setTooltip("Menerapkan hukum fisika (massa, gaya, dan tumbukan) pada objek 3D");
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

    // Menghitung batas ukuran objek untuk Collision Shape
    const bbox = new THREE.Box3().setFromObject(parentGroup);
    const size = new THREE.Vector3();
    bbox.getSize(size);
    const center = new THREE.Vector3();
    bbox.getCenter(center);

    const halfExtents = new CANNON.Vec3(
      Math.max(size.x / 2, 0.1), 
      Math.max(size.y / 2, 0.1), 
      Math.max(size.z / 2, 0.1)
    );
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
