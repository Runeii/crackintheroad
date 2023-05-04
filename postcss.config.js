const path = require('path');

module.exports = {
  "plugins": [
    [
      "postcss-preset-env",
      {
        "stage": 1
      }
    ],
    [
      "postcss-mixins",
      {
        "mixinsDir": path.join(__dirname, 'src/styles/mixins'),
      }
    ]
  ]
}