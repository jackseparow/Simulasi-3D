/**
 * Custom Block: PENCERMINAN / REFLEKSI (GeoBlock BBGTK DIY)
 */

// 1. Pencerminan Terhadap Bidang Utama (XY, XZ, YZ)
Blockly.Blocks['transform_mirror_plane'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("cerminkan terhadap bidang")
        .appendField(new Blockly.FieldDropdown([
          ["XY (Sumbu Z dibalik)", "XY"],
          ["XZ (Sumbu Y dibalik)", "XZ"],
          ["YZ (Sumbu X dibalik)", "YZ"]
        ]), "PLANE");
    this.appendStatementInput("OBJECTS").appendField("objek");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FF9800");
    this.setTooltip("Mencerminkan objek terhadap bidang utama (XY, XZ, atau YZ)");
  }
};

// 2. Pencerminan Terhadap Garis Tertentu (Line Reflection)
Blockly.Blocks['transform_mirror_line'] = {
  init: function() {
    this.appendDummyInput().appendField("cerminkan terhadap garis dari titik");
    this.appendValueInput("X1").setCheck("Number").appendField("x1");
    this.appendValueInput("Y1").setCheck("Number").appendField("y1");
    this.appendValueInput("Z1").setCheck("Number").appendField("z1");
    this.appendDummyInput().appendField("ke titik");
    this.appendValueInput("X2").setCheck("Number").appendField("x2");
    this.appendValueInput("Y2").setCheck("Number").appendField("y2");
    this.appendValueInput("Z2").setCheck("Number").appendField("z2");
    this.appendStatementInput("OBJECTS").appendField("objek");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FF9800");
    this.setTooltip("Mencerminkan objek terhadap garis 3D yang menghubungkan titik (x1,y1,z1) dan (x2,y2,z2)");
  }
};

// Generator Kode JavaScript untuk Three.js
javascript.javascriptGenerator.forBlock['transform_mirror_plane'] = function(block, generator) {
  var plane = block.getFieldValue('PLANE');
  var statement = generator.statementToCode(block, 'OBJECTS');

  return `
(function() {
  const subGroup = new THREE.Group();
  const parentGroup = sceneGroup;
  sceneGroup = subGroup;
  ${statement}
  sceneGroup = parentGroup;

  if ("${plane}" === "XY") subGroup.scale.z *= -1;
  if ("${plane}" === "XZ") subGroup.scale.y *= -1;
  if ("${plane}" === "YZ") subGroup.scale.x *= -1;

  sceneGroup.add(subGroup);
})();
`;
};

javascript.javascriptGenerator.forBlock['transform_mirror_line'] = function(block, generator) {
  var x1 = generator.valueToCode(block, 'X1', generator.ORDER_ATOMIC) || '0';
  var y1 = generator.valueToCode(block, 'Y1', generator.ORDER_ATOMIC) || '0';
  var z1 = generator.valueToCode(block, 'Z1', generator.ORDER_ATOMIC) || '0';
  var x2 = generator.valueToCode(block, 'X2', generator.ORDER_ATOMIC) || '10';
  var y2 = generator.valueToCode(block, 'Y2', generator.ORDER_ATOMIC) || '0';
  var z2 = generator.valueToCode(block, 'Z2', generator.ORDER_ATOMIC) || '0';
  var statement = generator.statementToCode(block, 'OBJECTS');

  return `
(function() {
  const subGroup = new THREE.Group();
  const parentGroup = sceneGroup;
  sceneGroup = subGroup;
  ${statement}
  sceneGroup = parentGroup;

  const p1 = new THREE.Vector3(Number(${x1}), Number(${y1}), Number(${z1}));
  const p2 = new THREE.Vector3(Number(${x2}), Number(${y2}), Number(${z2}));
  
  // Vektor arah garis pencerminan
  const axis = new THREE.Vector3().subVectors(p2, p1).normalize();

  if (axis.lengthSq() > 0) {
    // Transformasi pencerminan terhadap garis (rotasi 180 derajat mengitari garis)
    subGroup.position.sub(p1);
    subGroup.position.applyAxisAngle(axis, Math.PI);
    subGroup.rotateOnAxis(axis, Math.PI);
    subGroup.position.add(p1);
  }

  sceneGroup.add(subGroup);
})();
`;
};
