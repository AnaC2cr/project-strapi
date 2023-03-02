"use strict";
/**
 * header controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

const getHeader = (entity) => {
  const link = [];
  for (const key in entity.link) {
    link.push({ label: entity.link[key].label, url: entity.link[key].url });
  }

  return Object.freeze({
    logo: entity.icon.url,
    link,
  });
};

module.exports = createCoreController("api::header.header", ({ strapi }) => ({
  async find(ctx) {
    const entity = await strapi.entityService.findMany("api::header.header", {
      populate: "*",
    });
    // const entity = await strapi.entityService.findMany("api::header.header", {
    //   populate: {
    //     icon: {
    //       fields: ["url"],
    //     },
    //     link: true,
    //   },
    // });

    return getHeader(entity);
    // return entity;
  },
}));
