Blockly.Blocks['shape_sphere'] = {
  init: function() {
    this.appendDummyInput().appendField("buat bola");
    this.appendValueInput("RADIUS").setCheck("Number").appendField("jari-jari (r)");
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
const genSphere = javascript.javascriptGenerator || javascriptGenerator;
genSphere.forBlock['shape_sphere'] = function(block, generator) {
  const g = generator || genSphere;
  var radius = g.valueToCode(block, 'RADIUS', g.ORDER_ATOMIC) || '5';
  var px = g.valueToCode(block, 'POS_X', g.ORDER_ATOMIC) || '0';
  var py = g.valueToCode(block, 'POS_Y', g.ORDER_ATOMIC) || '0';
  var pz = g.valueToCode(block, 'POS_Z', g.ORDER_ATOMIC) || '0';
  var align = block.getFieldValue('ALIGN');
  return `
(function() {
  const geom = new THREE.SphereGeometry(${radius}, 32, 16);
  const mat = new THREE.MeshStandardMaterial({ color: 0xC0C0C0, roughness: 0.4, metalness: 0.5 });
  const mesh = new THREE.Mesh(geom, mat);
  let finalX = Number(${px}), finalY = Number(${py}), finalZ = Number(${pz});
  if ("${align}" === "CORNER") {
    finalX += Number(${radius}); finalY += Number(${radius}); finalZ += Number(${radius});
  }
  mesh.position.set(finalX, finalY, finalZ);
  sceneGroup.add(mesh);
})();
`;
};
