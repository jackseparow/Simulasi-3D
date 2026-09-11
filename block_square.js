Blockly.Blocks['shape_square'] = {
  init: function() {
    this.appendDummyInput().appendField("buat persegi 2D");
    this.appendValueInput("SIZE_X").setCheck("Number").appendField("panjang X");
    this.appendValueInput("SIZE_Y").setCheck("Number").appendField("lebar Y");
    this.appendDummyInput().appendField("titik acuan").appendField(new Blockly.FieldDropdown([["titik pusat", "CENTER"], ["tepi", "CORNER"]]), "ALIGN");
    this.appendValueInput("POS_X").setCheck("Number").appendField("x");
    this.appendValueInput("POS_Y").setCheck("Number").appendField("y");
    this.appendValueInput("POS_Z").setCheck("Number").appendField("z");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9C27B0");
  }
};
const genSquare = javascript.javascriptGenerator || javascriptGenerator;
genSquare.forBlock['shape_square'] = function(block, generator) {
  const g = generator || genSquare;
  var sx = g.valueToCode(block, 'SIZE_X', g.ORDER_ATOMIC) || '10';
  var sy = g.valueToCode(block, 'SIZE_Y', g.ORDER_ATOMIC) || '10';
  var px = g.valueToCode(block, 'POS_X', g.ORDER_ATOMIC) || '0';
  var py = g.valueToCode(block, 'POS_Y', g.ORDER_ATOMIC) || '0';
  var pz = g.valueToCode(block, 'POS_Z', g.ORDER_ATOMIC) || '0';
  var align = block.getFieldValue('ALIGN');
  return `
(function() {
  const geom = new THREE.PlaneGeometry(${sx}, ${sy});
  const mat = new THREE.MeshStandardMaterial({ color: 0xC0C0C0, roughness: 0.4, metalness: 0.5, side: THREE.DoubleSide });
  const mesh = new THREE.Mesh(geom, mat);
  let finalX = Number(${px}), finalY = Number(${py}), finalZ = Number(${pz});
  if ("${align}" === "CORNER") {
    finalX += ${sx} / 2; finalY += ${sy} / 2;
  }
  mesh.position.set(finalX, finalY, finalZ);
  sceneGroup.add(mesh);
})();
`;
};
