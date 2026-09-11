/**
 * Custom Block: OPERASI HIMPUNAN - IRISAN (INTERSECTION)
 * GeoBlock BBGTK DIY
 */

Blockly.Blocks['csg_intersection'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("irisan");

    // Slot Input Objek Pertama
    this.appendStatementInput("OBJECTS_1")
        .appendField("objek 1");

    // Slot Input Objek Kedua (Tambahan Slot 2)
    this.appendStatementInput("OBJECTS_2")
        .appendField("objek 2");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#E91E63");
    this.setTooltip("Mengambil bagian volume yang saling berpotongan/beririsan di antara objek 1 dan objek 2");
  }
};

// Generator Kode JavaScript untuk Three.js Viewport
javascript.javascriptGenerator.forBlock['csg_intersection'] = function(block, generator) {
  var statement1 = generator.statementToCode(block, 'OBJECTS_1');
  var statement2 = generator.statementToCode(block, 'OBJECTS_2');

  return `
(function() {
  const group1 = new THREE.Group();
  const group2 = new THREE.Group();
  let parentGroup = sceneGroup;

  sceneGroup = group1;
  ${statement1}

  sceneGroup = group2;
  ${statement2}

  sceneGroup = parentGroup;

  const intersectionGroup = new THREE.Group();

  // Simulasi Visual Irisan (Intersection Highlight)
  group1.traverse(child => {
    if (child.isMesh) {
      child.material = child.material.clone();
      child.material.transparent = true;
      child.material.opacity = 0.7;
    }
  });

  group2.traverse(child => {
    if (child.isMesh) {
      child.material = child.material.clone();
      child.material.wireframe = true;
      child.material.color.setHex(0x00ffff);
    }
  });

  intersectionGroup.add(group1);
  intersectionGroup.add(group2);

  sceneGroup.add(intersectionGroup);
})();
`;
};
