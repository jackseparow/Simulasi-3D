Blockly.Blocks['transform_scale'] = {
  init: function() {
    this.appendDummyInput().appendField("dilatasikan (skala)");
    this.appendValueInput("X").setCheck("Number").appendField("X");
    this.appendValueInput("Y").setCheck("Number").appendField("Y");
    this.appendValueInput("Z").setCheck("Number").appendField("Z");
    this.appendStatementInput("OBJECTS").appendField("objek");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FF9800");
  }
};

javascript.javascriptGenerator.forBlock['transform_scale'] = function(block, generator) {
  var sx = generator.valueToCode(block, 'X', generator.ORDER_ATOMIC) || '1';
  var sy = generator.valueToCode(block, 'Y', generator.ORDER_ATOMIC) || '1';
  var sz = generator.valueToCode(block, 'Z', generator.ORDER_ATOMIC) || '1';
  var statement = generator.statementToCode(block, 'OBJECTS');

  return `
(function() {
  const subGroup = new THREE.Group();
  const parentGroup = sceneGroup;
  sceneGroup = subGroup;
  ${statement}
  sceneGroup = parentGroup;

  subGroup.scale.set(Number(${sx}), Number(${sy}), Number(${sz}));
  sceneGroup.add(subGroup);
})();
`;
};
