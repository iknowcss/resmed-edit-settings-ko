describe('DeviceSetting', function () {

  var DeviceSetting = window.ResMed.ECO.Prescription.DeviceSetting,
      sut;

  it('may be constructed from metadata', function () {
    var metadata = {
      enumName: 'PRESSURE',
      displayName: 'Set pressure',
      units: 'cmH2O',
      values: [
        { text: '4.0', value: '4.0' },
        { text: '4.2', value: '4.2' },
        { text: '4.4', value: '4.4' }
      ],
      defaultValue: 8.0
    };

    sut = new DeviceSetting(metadata);
    expect(sut.enumName).toBe('PRESSURE');
    expect(sut.displayName).toBe('Set pressure');
    expect(sut.units).toBe('cmH2O');
    expect(sut.values).toEqual([
      { text: '4.0', value: '4.0' },
      { text: '4.2', value: '4.2' },
      { text: '4.4', value: '4.4' }
    ]);
    expect(sut.defaultValue).toBe(8.0);
    expect(sut.enable).toBe(true);
  });

  it('may be constructed from metadata with a value range', function () {
    var metadata = {
      values: { from: 4.0, to: 4.4, step: 0.2 }
    };

    sut = new DeviceSetting(metadata);
    expect(sut.values).toEqual([
      { text: '4.0', value: '4.0' },
      { text: '4.2', value: '4.2' },
      { text: '4.4', value: '4.4' }
    ]);
  });

  it('has an observable currentValue', function () {
    sut = new DeviceSetting({ currentValue: 4.0 });
    expect(ko.isObservable(sut.currentValue)).toBe(true);
  });

  it('defines a current value if one is not already specified', function () {
    sut = new DeviceSetting({
      defaultValue: 5.0,
      currentValue: 4.0
    });
    expect(sut.currentValue()).toBe(4.0);

    sut = new DeviceSetting({
      defaultValue: 5.0
    });
    expect(sut.currentValue()).toBe(5.0);
  });

});

describe('DeviceSettingCollection', function () {

  var DeviceSettingCollection = window.ResMed.ECO.Prescription.DeviceSettingCollection,
      DeviceSetting = window.ResMed.ECO.Prescription.DeviceSetting,
      sut;

  beforeEach(function () {
    sut = new DeviceSettingCollection();
  });

  it('adds new settings from metadata', function () {
    var pressure,
        eprMode;

    sut.add({
      enumName: 'PRESSURE',
      displayName: 'Set pressure',
      units: 'cmH2O',
      values: { from: 4.0, to: 20.0, step: 0.2 },
      defaultValue: 8.0
    });
    expect(sut.length).toBe(1);
    pressure = sut.get('PRESSURE');
    expect(sut[0]).toEqual(pressure);
    expect(pressure instanceof DeviceSetting).toBe(true);
    expect(pressure.enumName).toBe('PRESSURE');
    expect(pressure.displayName).toBe('Set pressure');
    expect(pressure.units).toBe('cmH2O');
    expect(pressure.values instanceof Array).toBe(true);
    expect(pressure.defaultValue).toBe(8.0);

    sut.add({
      enumName: 'EPR_MODE',
      displayName: 'EPR Mode',
      values: [
        { text: 'Off', value: 'OFF' },
        { text: 'Ramp', value: 'RAMP_ONLY' },
        { text: 'Fulltime', value: 'FULLTIME' }
      ],
      defaultValue: 'OFF'
    });
    expect(sut.length).toBe(2);
    eprMode = sut.get('EPR_MODE');
    expect(sut[1]).toEqual(eprMode);
    expect(eprMode instanceof DeviceSetting).toBe(true);
    expect(eprMode.enumName).toBe('EPR_MODE');
    expect(eprMode.displayName).toBe('EPR Mode');
    expect(eprMode.units).toBe('');
    expect(eprMode.values instanceof Array).toBe(true);
    expect(eprMode.defaultValue).toBe('OFF');
  });

  describe('computed enable field', function () {

    function ComputedEnableTest(enableConditions) {
      this.collection = new DeviceSettingCollection();
      this.collection.add({ enumName: 'INDEPEND_SETTING' });
      this.collection.add({
        enumName: 'DEPEND_SETTING',
        enable: enableConditions
      });

      this.independSetting = this.collection.get('INDEPEND_SETTING');
      this.dependSetting = this.collection.get('DEPEND_SETTING');

      expect(ko.isComputed(this.independSetting.enable)).toBe(false);
      expect(ko.isComputed(this.dependSetting.enable)).toBe(true);
    }

    ComputedEnableTest.prototype.whenIndependentValueIs = function (newValue) {
      this.independSetting.currentValue(newValue);
      return this.dependSetting.enable();
    };

    it('enables a setting only when another setting is equal to a value', function () {
      var test = new ComputedEnableTest(
        [
          { setting: 'INDEPEND_SETTING', eqTo: 'ON' }
        ]
      );

      expect(test.whenIndependentValueIs('ON')).toBe(true);
      expect(test.whenIndependentValueIs('OFF')).toBe(false);
    });

    it('enables a setting only when another setting is NOT equal to a value', function () {
      var test = new ComputedEnableTest(
        [
          { setting: 'INDEPEND_SETTING', notEqTo: 'OFF' }
        ]
      );

      expect(test.whenIndependentValueIs('ON')).toBe(true);
      expect(test.whenIndependentValueIs('OFF')).toBe(false);
    });

  });

});