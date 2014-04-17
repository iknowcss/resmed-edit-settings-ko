ResMed: KnockoutJS Proof-of-concept
===================================

What is it?
-----------

A demonstration of what is possible with KnockoutJS. This is a partial implementation of the Edit Patient Prescription Page in EasyCare Online. I generate the UI using JSON metadata that defines modes, settings, and relationships between settings. When the user changes one of the modes or settings, the ViewModel updates.

How do I run it?
----------------
1. Clone the Git repository
2. Open up **/index.html** in your favorite browser

How do I test it?
-----------------

1. Open up **/test/test-runner.html** in your favorite browser

How do I fiddle with the metadata?
------------------------

### To edit device modes
  * Open **metadata/device-mode-metadata.js** in your favorite text editor
  * Modify the mode metadata objects
  * Save and reload the page

### To edit device settings
  * Open **metadata/device-setting-metadata.js** in your favorite text editor
  * Modify the settings metadata objects
  * Save and reload the page