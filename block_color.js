/**
 * Custom Block: UBAH WARNA (PALET WARNA VISUAL HTML5 & TRANSPARANSI)
 * GeoBlock BBGTK DIY
 */

// Membuat Custom Field Warna dengan Elemen HTML Color Picker Asli
function createNativeColorPickerField(defaultColor) {
  var field = new Blockly.FieldTextInput(defaultColor || '#ff0000');
  
  // Modifikasi cara blok merender tampilan dirinya di workspace
  field.initView = function() {
    // Panggil initView bawaan untuk membuat struktur dasar
    Blockly.FieldTextInput.prototype.initView.call(this);
    
    // Sembunyikan teks biasa (#ff0000)
    if (this.textElement_) {
      this.textElement_.style.display = 'none';
    }
  };

  // Override handler klik untuk memicu picker warna asli
  field.showEditor_ = function() {
    var self = this;
    var picker = document.createElement('input');
    picker.type = 'color';
    picker.value = self.getValue() || '#ff0000';
    
    picker.addEventListener('input', function() {
      self.setValue(picker.value);
    });
    
    picker.click(); // Membuka pop-up palet warna visual secara langsung
  };

  return field;
}

Blockly.Blocks['transform_color_palette'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ubah warna")
        .appendField(createNativeColorPickerField("#ff0000"), "COLOR");

    this.appendValueInput("OPACITY")
        .setCheck("Number")
        .appendField("transparansi (%)");

    this.appendStatementInput("OBJECTS")
        .appendField("objek");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FF9800");
    this.setTooltip("Klik untuk memilih warna secara visual dari palet warna dan atur transparansinya (0-100%)");
  }
};

// Generator Kode JavaScript untuk Three.js
javascript.javascriptGenerator.forBlock['transform_color_palette'] = function(block, generator) {
  var color = block.getFieldValue('COLOR') || '#ff0000';
  var opacity = generator.valueToCode(block, 'OPACITY', generator.ORDER_ATOMIC) || '0';
  var statement = generator.statementToCode(block, 'OBJECTS');

  return `
(function() {
  const subGroup = new THREE.Group();
  const parentGroup = sceneGroup;
  sceneGroup = subGroup;
  ${statement}
  sceneGroup = parentGroup;

  const alpha = 1 - (Math.min(Math.max(Number(${opacity}), 0), 100) / 100);

  subGroup.traverse(child => {
    if (child.isMesh) {
      child.material = child.material.clone();
      child.material.color.setStyle("${color}");
      if (alpha < 1) {
        child.material.transparent = true;
        child.material.opacity = alpha;
      }
    }
  });

  sceneGroup.add(subGroup);
})();
`;
};
