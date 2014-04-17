describe('DeviceMode', function () {

  var DeviceMode = window.ResMed.ECO.Prescription.DeviceMode,
      sut;

  it('may be constructed from metadata', function () {
    var metadata = {
      enumName: 'CPAP',
      displayName: 'CPAP',
      editableSettings: [ 'PRESSURE', 'EPR_MODE', 'EPR_LEVEL' ]
    };

    sut = new DeviceMode(metadata);
    expect(sut.enumName).toBe('CPAP');
    expect(sut.displayName).toBe('CPAP');
    expect(sut.editableSettings).toEqual([ 'PRESSURE', 'EPR_MODE', 'EPR_LEVEL' ]);
  });

});

describe('DeviceModeCollection', function () {

  var DeviceMode = window.ResMed.ECO.Prescription.DeviceMode,
      DeviceModeCollection = window.ResMed.ECO.Prescription.DeviceModeCollection,
      sut;

  beforeEach(function () {
    sut = new DeviceModeCollection();
  });

  it('adds and maps new modes', function () {
    var cpapMode,
        asvMode;

    cpapMode = new DeviceMode({
      enumName: 'CPAP',
      displayName: 'CPAP',
      editableSettings: [ 'PRESSURE', 'EPR_MODE', 'EPR_LEVEL' ]
    });
    sut.push(cpapMode);

    expect(sut.get('CPAP')).toBe(cpapMode);
    expect(sut.length).toBe(1);

    asvMode = new DeviceMode({
      enumName: 'ASV',
      displayName: 'ASV',
      editableSettings: [ 'EPAP_ASV', 'MIN_PS', 'MAX_PS' ]
    });
    sut.push(asvMode);

    expect(sut.get('ASV')).toBe(asvMode);
    expect(sut.length).toBe(2);
  });
});

describe('DeviceModeFactory', function () {

  var DeviceSetting = window.ResMed.ECO.Prescription.DeviceSetting,
      DeviceMode = window.ResMed.ECO.Prescription.DeviceMode,
      DeviceModeFactory = window.ResMed.ECO.Prescription.DeviceModeFactory,
      sut;

  var TEST_SETTINGS_METADATA = [
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

  it('builds a collection of DeviceMode objects from metadata and translates editable settings to DeviceSetting objects', function () {
    var modesCollection,
        cpapMode,
        asvMode;

    sut = new DeviceModeFactory(TEST_SETTINGS_METADATA);

    modesCollection = sut.buildModesCollection([
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
    ]);

    expect(modesCollection.length).toBe(2);

    cpapMode = modesCollection.get('CPAP')
    expect(cpapMode instanceof DeviceMode).toBe(true);
    expect(cpapMode.editableSettings instanceof Array).toBe(true);
    expect(cpapMode.editableSettings[0]).toBe(sut.settings.get('PRESSURE'));
    expect(cpapMode.editableSettings[1]).toBe(sut.settings.get('EPR_MODE'));
    expect(cpapMode.editableSettings[2]).toBe(sut.settings.get('EPR_LEVEL'));

    asvMode = modesCollection.get('ASV')
    expect(asvMode instanceof DeviceMode).toBe(true);
    expect(asvMode.editableSettings instanceof Array).toBe(true);
    expect(asvMode.editableSettings[0]).toBe(sut.settings.get('EPAP_ASV'));
    expect(asvMode.editableSettings[1]).toBe(sut.settings.get('MIN_PS'));
    expect(asvMode.editableSettings[2]).toBe(sut.settings.get('MAX_PS'));
  });

});