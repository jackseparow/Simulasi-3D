/**
 * Custom Block: OPERASI HIMPUNAN - SELISIH (DIFFERENCE)
 * GeoBlock BBGTK DIY
 */

Blockly.Blocks['csg_difference'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("selisih");

    this.appendStatementInput("PRIMARY_OBJECT")
        .appendField("objek utama");

    this.appendStatementInput("SUBTRACT_OBJECTS")
        .appendField("dikurangi objek pemotong");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#E91E63");
    this.setTooltip("Mengurangi (memotong) objek utama dengan objek pemotong");
  }
};

// Generator Kode JavaScript untuk Three.js Viewport
javascript.javascriptGenerator.forBlock['csg_difference'] = function(block, generator) {
  var primaryStatement = generator.statementToCode(block, 'PRIMARY_OBJECT');
  var subtractStatement = generator.statementToCode(block, 'SUBTRACT_OBJECTS');

  return `
(function() {
  // Group untuk menampung Objek Utama
  const primaryGroup = new THREE.Group();
  let parentGroup = sceneGroup;
  sceneGroup = primaryGroup;
  ${primaryStatement}

  // Group untuk menampung Objek Pemotong
  const subtractGroup = new THREE.Group();
  sceneGroup = subtractGroup;
  ${subtractStatement}
  sceneGroup = parentGroup;

  // Wadah Hasil Operasi Selisih
  const differenceResultGroup = new THREE.Group();

  // Evaluasi Operasi Selisih Visual (CSG Simulation)
  subtractGroup.traverse(child => {
    if (child.isMesh) {
      // Membuat visualisasi ghost/wireframe untuk objek pemotong
      child.material = child.material.clone();
      child.material.wireframe = true;
      child.material.transparent = true;
      child.material.opacity = 0.25;
      child.material.color.setHex(0xff0044);
    }
  });

  // Tambahkan objek utama dan penanda pemotong ke scene
  differenceResultGroup.add(primaryGroup);
  differenceResultGroup.add(subtractGroup);

  sceneGroup.add(differenceResultGroup);
})();
`;
};
