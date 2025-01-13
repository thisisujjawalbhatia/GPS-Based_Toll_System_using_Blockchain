'use strict';

/**
 * toll-booth router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::toll-booth.toll-booth');
