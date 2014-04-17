(function (ResMed) {

  var MappedCollection = ResMed.ECO.Util.MappedCollection,
      DeviceSettingCollection = ResMed.ECO.Prescription.DeviceSettingCollection;

  /* DeviceMode */
  function DeviceMode(modeMetadata) {
    _.extend(this, modeMetadata);
  }

  /* DeviceModeCollection */
  DeviceModeCollection.prototype = new MappedCollection('enumName');
  DeviceModeCollection.prototype.constructor = DeviceModeCollection;
  function DeviceModeCollection() {
    MappedCollection.call(this, 'enumName');
  }

  /* DeviceModeFactory */
  function DeviceModeFactory(settingMetadata) {
    this.settings = new DeviceSettingCollection();
    _.each(settingMetadata, this.addSetting, this);
  }

  _.extend(DeviceModeFactory.prototype, {

    addSetting: function (settingMetadata) {
      this.settings.add(settingMetadata);
    },

    buildModesCollection: function (modesMetadata) {
      var modes = new DeviceModeCollection();
      _.each(modesMetadata, function (metadata) {
        modes.push(this.buildMode(metadata));
      }, this);
      return modes;
    },

    buildMode: function (modeMetadata) {
      var mode = new DeviceMode(modeMetadata),
          settings = [];

      _.each(mode.editableSettings, function (settingEnum) {
        if (this.settings.hasKey(settingEnum)) {
          settings.push(this.settings.get(settingEnum));
        }
      }, this);
      mode.editableSettings = settings;

      return mode;
    }

  });

  /* Export */
  ResMed.ECO.Prescription.DeviceMode = DeviceMode;
  ResMed.ECO.Prescription.DeviceModeCollection = DeviceModeCollection;
  ResMed.ECO.Prescription.DeviceModeFactory = DeviceModeFactory;

}(window.ResMed));