const { Sequelize } = require('../models');

const { Op } = Sequelize;

class Parametrizer {
  static getOptions(query, attributes, search = ['id', 'code', 'description']) {
    const { filter, sortField, sortDirection } = query;
    const limit = +query.pageSize;

    const variables = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < search.length; i++) {
      const variable = {
        [search[i]]: {
          [Op.like]: `%${filter}%`,
        },
      };
      variables.push(variable);
    }

    const where = filter ? {
      [Op.or]: variables,
    } : '';
    const page = +query.pageNumber || 0;
    const offset = (page) * limit;

    return {
      attributes,
      limit,
      offset,
      where,
      order: [
        [sortField, sortDirection],
      ],
    };
  }

  static responseOk(data, { limit }) {
    const { count, rows } = data;
    const stats = (data.stats ? data.stats : {});
    const pages = Math.ceil(count / limit);
    return {
      ok: true,
      payload: rows,
      count,
      pages,
      stats,
    };
  }

  static responseSelectOk(data, { limit }) {
    const payload = data;
    const count = data.length;
    const stats = (data.stats ? data.stats : {});
    const pages = Math.ceil(count / limit);
    return {
      ok: true,
      payload,
      count,
      pages,
      stats,
    };
  }
}

module.exports = Parametrizer;
