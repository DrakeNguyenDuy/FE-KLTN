const { override, useBabelRc, addBundleVisualizer } = require('customize-cra');

module.exports = override(useBabelRc(), process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer());
