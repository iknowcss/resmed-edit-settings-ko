(function (ResMed) {
  
  var MappedCollection = ResMed.ECO.Util.MappedCollection;

  /* DeviceSetting */
  function DeviceSetting(settingMetadata, parentCollection) {
    _.extend(this, settingMetadata);
    this.parentCollection = parentCollection;

    if (!_.isArray(this.values) && _.isObject(this.values)) {
      this.values = this.generateValues(this.values.from, this.values.to, this.values.step);
    }

    if (!this.hasOwnProperty('units')) {
      this.units = '';
    }

    if (!this.hasOwnProperty('currentValue')) {
      this.currentValue = this.defaultValue;
    }
    this.currentValue = ko.observable(this.currentValue);

    if (this.hasOwnProperty('enable')) {
      this.enable = this.generateComputedEnable(this.enable);
    } else {
      this.enable = true;
    }
  }

  _.extend(DeviceSetting.prototype, {

    generateValues: function (from, to, step) {
      var values = [],
          i;

      for (i = from; i <= to; i += step) {
        values.push({
          text: i.toFixed(1),
          value: i.toFixed(1)
        });
      }

      return values;
    },

    generateComputedEnable: function (enableConditions) {
      var checkers = [],
          testKeys = _.keys(this.enableCheckers);

      _.each(enableConditions, function (condition) {
        var setting = this.parentCollection.get(condition.setting);
        _.each(testKeys, function (test) {
          if (condition.hasOwnProperty(test)) {
            checkers.push(_.bind(this.enableCheckers[test], null, setting, condition[test]));
          }
        }, this);
      }, this);

      return ko.computed(function () {
        var i;
        for (i = 0; i < checkers.length; i++) {
          if (checkers[i]() !== true) {
            return false;
          }
        }
        return true;
      });
    }

  });

  DeviceSetting.prototype.enableCheckers = {
    notEqTo: function (setting, value) {
      return setting.currentValue() != value;
    },
    eqTo: function (setting, value) {
      return setting.currentValue() == value;
    }
  };

  /* DeviceSettingCollection */
  DeviceSettingCollection.prototype = new MappedCollection('enumName');
  DeviceSettingCollection.prototype.constructor = DeviceSettingCollection;
  function DeviceSettingCollection() {
    MappedCollection.call(this, 'enumName');
  }

  _.extend(DeviceSettingCollection.prototype, {

    add: function (settingMetadata) {
      this.push(new DeviceSetting(settingMetadata, this));
    }

  });

  /* Export */
  ResMed.ECO.Prescription.DeviceSetting = DeviceSetting;
  ResMed.ECO.Prescription.DeviceSettingCollection = DeviceSettingCollection;

}(window.ResMed));