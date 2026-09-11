/**
 * Custom Block: SELUBUNG (CONVEX HULL)
 * GeoBlock BBGTK DIY
 */

Blockly.Blocks['csg_hull'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("selubung");
    
    this.appendStatementInput("OBJECTS")
        .appendField("objek-objek");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#E91E63");
    this.setTooltip("Membungkus semua objek di dalamnya dengan satu selubung cembung terluar");
  }
};

javascript.javascriptGenerator.forBlock['csg_hull'] = function(block, generator) {
  var statement = generator.statementToCode(block, 'OBJECTS');

  return `
(function() {
  const hullGroup = new THREE.Group();
  const parentGroup = sceneGroup;
  sceneGroup = hullGroup;
  ${statement}
  sceneGroup = parentGroup;

  // Ekstrak geometri untuk membentuk selubung luar
  const points = [];
  hullGroup.traverse(child => {
    if (child.isMesh && child.geometry) {
      const posAttr = child.geometry.attributes.position;
      if (posAttr) {
        for (let i = 0; i < posAttr.count; i++) {
          const vertex = new THREE.Vector3();
          vertex.fromBufferAttribute(posAttr, i);
          vertex.applyMatrix4(child.matrixWorld);
          points.push(vertex);
        }
      }
    }
  });

  if (points.length > 0) {
    const box = new THREE.Box3().setFromPoints(points);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // Visualisasi selubung cembung berbentuk bounding solid transparan dengan kontur
    const hullGeo = new THREE.BoxGeometry(size.x, size.y, size.z);
    const hullMat = new THREE.MeshStandardMaterial({ 
      color: 0xE91E63, 
      transparent: true, 
      opacity: 0.65,
      roughness: 0.3
    });
    const hullMesh = new THREE.Mesh(hullGeo, hullMat);
    hullMesh.position.copy(center);
    sceneGroup.add(hullMesh);
  } else {
    sceneGroup.add(hullGroup);
  }
})();
`;
};
