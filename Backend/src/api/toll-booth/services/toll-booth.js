'use strict';

/**
 * toll-booth service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::toll-booth.toll-booth');
