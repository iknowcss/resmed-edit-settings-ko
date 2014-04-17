(function (ResMed, ko) {

  var DeviceModeFactory = ResMed.ECO.Prescription.DeviceModeFactory;

  /* EditPrescriptionViewModel View Model */
  function EditPrescriptionViewModel(options) {
    var mav = this;

    mav.deviceModes = new DeviceModeFactory(options.settingsMetadata)
      .buildModesCollection(options.modesMetadata);

    mav.selectedModeEnum = ko.observable('CPAP');
    mav.selectedMode = ko.computed(function () {
      return mav.deviceModes.get(mav.selectedModeEnum());
    });

    mav.activeSettings = ko.computed(function () {
      return mav.selectedMode().editableSettings;
    });
  }

  /* Export */
  ResMed.ECO.Prescription.EditPrescriptionViewModel = EditPrescriptionViewModel;

}(window.ResMed, window.ko));