(function (ResMed, ko) {

  var DEVICE_SETTINGS_METADATA = [
    {
      enumName: 'PRESSURE',
      displayName: 'Set pressure',
      units: 'cmH2O',
      values: { from: 4.0, to: 20.0, step: 0.2 },
      defaultValue: 8.0
    },
    {
      enumName: 'EPR_MODE',
      displayName: 'EPR Mode',
      values: [
        { text: 'Off', value: 'OFF' },
        { text: 'Ramp', value: 'RAMP_ONLY' },
        { text: 'Fulltime', value: 'FULLTIME' }
      ],
      defaultValue: 'OFF'
    },
    {
      enumName: 'EPR_LEVEL',
      displayName: 'EPR Level',
      values: [
        { text: '1', value: 'ONE' },
        { text: '2', value: 'TWO' },
        { text: '3', value: 'THREE' }
      ],
      enable: [
        { setting: 'EPR_MODE', notEqTo: 'OFF' }
      ],
      defaultValue: 0
    },
    {
      enumName: 'EPAP_ASV',
      displayName: 'EPAP',
      units: 'cmH2O',
      values: { from: 4.0, to: 15.0, step: 0.2 },
      defaultValue: 8.0
    },
    {
      enumName: 'MIN_PS',
      displayName: 'Min PS',
      units: 'cmH2O',
      values: { from: 3.0, to: 6.0, step: 0.2 },
      defaultValue: 4.0
    },
    {
      enumName: 'MAX_PS',
      displayName: 'Max PS',
      units: 'cmH2O',
      values: { from: 8.0, to: 16.0, step: 0.2 },
      defaultValue: 12.0
    }
  ];

  var DEVICE_MODES_METADATA = [
    {
      enumName: 'CPAP',
      displayName: 'CPAP',
      editableSettings: [ 'PRESSURE', 'EPR_MODE', 'EPR_LEVEL' ]
    },
    {
      enumName: 'ASV',
      displayName: 'ASV',
      editableSettings: [ 'EPAP_ASV', 'MIN_PS', 'MAX_PS' ]
    }
  ];

  /* Apply! */
  ko.applyBindings(new ResMed.ECO.Prescription.EditPrescriptionViewModel({
    settingsMetadata: DEVICE_SETTINGS_METADATA,
    modesMetadata: DEVICE_MODES_METADATA
  }));

}(window.ResMed, window.ko));