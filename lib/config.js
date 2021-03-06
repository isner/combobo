'use strict';

const extend = require('extend-shallow');

/**
 * The default config for Combobo
 * @type {Object}
 */
const defaults = {
  input: '.combobox',
  list: '.listbox',
  options: '.option', // qualified within `list`
  groups: null, // qualified within `list`
  openClass: 'open',
  activeClass: 'active',
  selectedClass: 'selected',
  useLiveRegion: true,
  multiselect: false,
  noResultsText: null,
  selectionValue: (selecteds) => selecteds.map((s) => s.innerText.trim()).join(' - '),
  optionValue: (option) => option.innerHTML,
  announcement: {
    count: (n) => `${n} options available`,
    selected: 'Selected.'
  },
  filter: 'contains' // 'starts-with', 'equals', or funk
};

/**
 * Merges user's config with defaults
 * @param  {Object} userConfig
 * @return {Object}
 */
module.exports = (userConfig) => {
  const config = {};
  const announcementConfig = {};
  // setup for announcement
  userConfig.announcement = userConfig.announcement || {};
  // merge user's announcement object with the announcement defaults
  extend(announcementConfig, defaults.announcement, userConfig.announcement);
  // merge the others...
  extend(config, defaults, userConfig);
  config.announcement = announcementConfig;

  return config;
};
