/**
 * Custom Block: OPERASI HIMPUNAN - GABUNGAN (UNION)
 * GeoBlock BBGTK DIY
 */

Blockly.Blocks['csg_union'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("gabungan");

    // Slot Input Objek Pertama
    this.appendStatementInput("OBJECTS_1")
        .appendField("objek 1");

    // Slot Input Objek Kedua (Tambahan Slot 2)
    this.appendStatementInput("OBJECTS_2")
        .appendField("objek 2");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#E91E63");
    this.setTooltip("Menggabungkan volume dari dua kelompok objek atau lebih menjadi satu kesatuan");
  }
};

// Generator Kode JavaScript untuk Three.js Viewport
javascript.javascriptGenerator.forBlock['csg_union'] = function(block, generator) {
  var statement1 = generator.statementToCode(block, 'OBJECTS_1');
  var statement2 = generator.statementToCode(block, 'OBJECTS_2');

  return `
(function() {
  const unionGroup = new THREE.Group();
  let parentGroup = sceneGroup;
  sceneGroup = unionGroup;
  
  ${statement1}
  ${statement2}

  sceneGroup = parentGroup;
  sceneGroup.add(unionGroup);
})();
`;
};
