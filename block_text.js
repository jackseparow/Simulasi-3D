/**
 * Custom Block: TEKS 3D & TEKS 2D (Format Vertikal / Nested & Alignment)
 * GeoBlock BBGTK DIY
 */

// 1. Blok Teks 3D (Desain Vertikal Ke Bawah)
Blockly.Blocks['shape_text_3d'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("teks 3D");

    // Input Teks (String Input)
    this.appendValueInput("TEXT")
        .setCheck("String")
        .appendField("teks");

    // Ukuran Font
    this.appendValueInput("SIZE")
        .setCheck("Number")
        .appendField("ukuran");

    // Ketebalan Extrude 3D
    this.appendValueInput("HEIGHT")
        .setCheck("Number")
        .appendField("ketebalan");

    // Pilihan Jenis Font
    this.appendDummyInput()
        .appendField("font")
        .appendField(new Blockly.FieldDropdown([
          ["Helvetiker", "helvetiker"],
          ["Optimer", "optimer"],
          ["Gentilis", "gentilis"]
        ]), "FONT");

    // Pilihan Alignment / Center
    this.appendDummyInput()
        .appendField("posisi")
        .appendField(new Blockly.FieldDropdown([
          ["tengah (center)", "CENTER"],
          ["sudut (origin)", "ORIGIN"]
        ]), "ALIGN");

    this.setInputsInline(false); // Memaksa blok memanjang vertikal ke bawah
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#5BA58C");
    this.setTooltip("Membuat geometri huruf 3D timbul padat dengan opsi ukuran, ketebalan, font, dan pemusatan");
  }
};

// Generator Kode JavaScript untuk Three.js
javascript.javascriptGenerator.forBlock['shape_text_3d'] = function(block, generator) {
  var textStr = generator.valueToCode(block, 'TEXT', generator.ORDER_ATOMIC) || '"BBGTK DIY"';
  var sizeVal = generator.valueToCode(block, 'SIZE', generator.ORDER_ATOMIC) || '10';
  var heightVal = generator.valueToCode(block, 'HEIGHT', generator.ORDER_ATOMIC) || '2';
  var fontName = block.getFieldValue('FONT') || 'helvetiker';
  var align = block.getFieldValue('ALIGN') || 'CENTER';

  return `
(function() {
  const textStr = String(${textStr});
  const sizeVal = Number(${sizeVal});
  const heightVal = Number(${heightVal});
  const fontKey = "${fontName}";
  const isCenter = "${align}" === "CENTER";

  if (window.loadedFonts && window.loadedFonts[fontKey]) {
    const font = window.loadedFonts[fontKey];
    const textGeo = new THREE.TextGeometry(textStr, {
      font: font,
      size: sizeVal,
      height: heightVal,
      curveSegments: 12,
      bevelEnabled: false
    });

    textGeo.computeBoundingBox();
    if (isCenter) {
      textGeo.center(); // Memusatkan titik pusat di tengah teks
    }

    const mat = new THREE.MeshStandardMaterial({ 
      color: 0x5BA58C, 
      roughness: 0.4, 
      metalness: 0.1 
    });

    const mesh = new THREE.Mesh(textGeo, mat);
    sceneGroup.add(mesh);
  } else {
    console.warn("Font " + fontKey + " belum siap dimuat.");
  }
})();
`;
};

// 2. Blok Teks 2D (Flat Surface Profile)
Blockly.Blocks['shape_text_2d'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("teks 2D");

    this.appendValueInput("TEXT")
        .setCheck("String")
        .appendField("teks");

    this.appendValueInput("SIZE")
        .setCheck("Number")
        .appendField("ukuran");

    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#5BA58C");
    this.setTooltip("Membuat permukaan profil huruf 2D datar");
  }
};

javascript.javascriptGenerator.forBlock['shape_text_2d'] = function(block, generator) {
  var textStr = generator.valueToCode(block, 'TEXT', generator.ORDER_ATOMIC) || '"GeoBlock"';
  var sizeVal = generator.valueToCode(block, 'SIZE', generator.ORDER_ATOMIC) || '10';

  return `
(function() {
  const textStr = String(${textStr});
  const sizeVal = Number(${sizeVal});
  const fontKey = "helvetiker";

  if (window.loadedFonts && window.loadedFonts[fontKey]) {
    const font = window.loadedFonts[fontKey];
    const textGeo = new THREE.TextGeometry(textStr, {
      font: font,
      size: sizeVal,
      height: 0.01,
      curveSegments: 12
    });

    textGeo.computeBoundingBox();
    textGeo.center();

    const mat = new THREE.MeshBasicMaterial({ 
      color: 0x5BA58C, 
      side: THREE.DoubleSide 
    });

    const mesh = new THREE.Mesh(textGeo, mat);
    sceneGroup.add(mesh);
  }
})();
`;
};
