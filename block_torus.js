Blockly.Blocks['shape_torus'] = {
  init: function() {
    this.appendDummyInput().appendField("buat torus");
    this.appendValueInput("RADIUS").setCheck("Number").appendField("r-utama");
    this.appendValueInput("TUBE").setCheck("Number").appendField("r-tabung");
    this.appendDummyInput().appendField("titik acuan").appendField(new Blockly.FieldDropdown([["titik pusat", "CENTER"], ["tepi", "CORNER"]]), "ALIGN");
    this.appendValueInput("POS_X").setCheck("Number").appendField("x");
    this.appendValueInput("POS_Y").setCheck("Number").appendField("y");
    this.appendValueInput("POS_Z").setCheck("Number").appendField("z");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4C97FF");
  }
};
const genTorus = javascript.javascriptGenerator || javascriptGenerator;
genTorus.forBlock['shape_torus'] = function(block, generator) {
  const g = generator || genTorus;
  var radius = g.valueToCode(block, 'RADIUS', g.ORDER_ATOMIC) || '8';
  var tube = g.valueToCode(block, 'TUBE', g.ORDER_ATOMIC) || '3';
  var px = g.valueToCode(block, 'POS_X', g.ORDER_ATOMIC) || '0';
  var py = g.valueToCode(block, 'POS_Y', g.ORDER_ATOMIC) || '0';
  var pz = g.valueToCode(block, 'POS_Z', g.ORDER_ATOMIC) || '0';
  var align = block.getFieldValue('ALIGN');
  return `
(function() {
  const geom = new THREE.TorusGeometry(${radius}, ${tube}, 16, 100);
  const mat = new THREE.MeshStandardMaterial({ color: 0xC0C0C0, roughness: 0.4, metalness: 0.5 });
  const mesh = new THREE.Mesh(geom, mat);
  let finalX = Number(${px}), finalY = Number(${py}), finalZ = Number(${pz});
  if ("${align}" === "CORNER") {
    const outerR = Number(${radius}) + Number(${tube});
    finalX += outerR; finalY += outerR; finalZ += Number(${tube});
  }
  mesh.position.set(finalX, finalY, finalZ);
  sceneGroup.add(mesh);
})();
`;
};
