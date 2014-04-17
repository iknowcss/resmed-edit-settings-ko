(function (ResMed, ko) {

  ko.applyBindings(new ResMed.ECO.Prescription.EditPrescriptionViewModel({
    settingsMetadata: window.DEVICE_SETTING_METADATA,
    modesMetadata:    window.DEVICE_MODE_METADATA
  }));

}(window.ResMed, window.ko));