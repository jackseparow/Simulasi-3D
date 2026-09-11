Blockly.Blocks['transform_rotate'] = {
  init: function() {
    this.appendDummyInput().appendField("rotasikan");
    this.appendValueInput("X").setCheck("Number").appendField("X (°)");
    this.appendValueInput("Y").setCheck("Number").appendField("Y (°)");
    this.appendValueInput("Z").setCheck("Number").appendField("Z (°)");
    this.appendStatementInput("OBJECTS").appendField("objek");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FF9800");
  }
};

Blockly.Blocks['transform_rotate_around_point'] = {
  init: function() {
    this.appendDummyInput().appendField("rotasikan sebesar");
    this.appendValueInput("ANGLE").setCheck("Number").appendField("(°)");
    this.appendDummyInput()
        .appendField("pada sumbu")
        .appendField(new Blockly.FieldDropdown([["X", "X"], ["Y", "Y"], ["Z", "Z"]]), "AXIS")
        .appendField("mengitari titik");
    this.appendValueInput("POS_X").setCheck("Number").appendField("x");
    this.appendValueInput("POS_Y").setCheck("Number").appendField("y");
    this.appendValueInput("POS_Z").setCheck("Number").appendField("z");
    this.appendStatementInput("OBJECTS").appendField("objek");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FF9800");
  }
};

javascript.javascriptGenerator.forBlock['transform_rotate'] = function(block, generator) {
  var rx = generator.valueToCode(block, 'X', generator.ORDER_ATOMIC) || '0';
  var ry = generator.valueToCode(block, 'Y', generator.ORDER_ATOMIC) || '0';
  var rz = generator.valueToCode(block, 'Z', generator.ORDER_ATOMIC) || '0';
  var statement = generator.statementToCode(block, 'OBJECTS');

  return `
(function() {
  const subGroup = new THREE.Group();
  const parentGroup = sceneGroup;
  sceneGroup = subGroup;
  ${statement}
  sceneGroup = parentGroup;

  subGroup.rotation.set(
    (Number(${rx}) * Math.PI) / 180,
    (Number(${ry}) * Math.PI) / 180,
    (Number(${rz}) * Math.PI) / 180
  );
  sceneGroup.add(subGroup);
})();
`;
};

javascript.javascriptGenerator.forBlock['transform_rotate_around_point'] = function(block, generator) {
  var angle = generator.valueToCode(block, 'ANGLE', generator.ORDER_ATOMIC) || '45';
  var axis = block.getFieldValue('AXIS');
  var px = generator.valueToCode(block, 'POS_X', generator.ORDER_ATOMIC) || '0';
  var py = generator.valueToCode(block, 'POS_Y', generator.ORDER_ATOMIC) || '0';
  var pz = generator.valueToCode(block, 'POS_Z', generator.ORDER_ATOMIC) || '0';
  var statement = generator.statementToCode(block, 'OBJECTS');

  return `
(function() {
  const subGroup = new THREE.Group();
  const parentGroup = sceneGroup;
  sceneGroup = subGroup;
  ${statement}
  sceneGroup = parentGroup;

  const point = new THREE.Vector3(Number(${px}), Number(${py}), Number(${pz}));
  const rad = (Number(${angle}) * Math.PI) / 180;
  
  subGroup.position.sub(point);
  if ("${axis}" === "X") subGroup.position.applyAxisAngle(new THREE.Vector3(1, 0, 0), rad);
  if ("${axis}" === "Y") subGroup.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), rad);
  if ("${axis}" === "Z") subGroup.position.applyAxisAngle(new THREE.Vector3(0, 0, 1), rad);
  subGroup.position.add(point);

  if ("${axis}" === "X") subGroup.rotation.x += rad;
  if ("${axis}" === "Y") subGroup.rotation.y += rad;
  if ("${axis}" === "Z") subGroup.rotation.z += rad;

  sceneGroup.add(subGroup);
})();
`;
};
