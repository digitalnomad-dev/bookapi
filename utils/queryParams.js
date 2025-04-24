const config = require('../config/config');

const parsePaginationParams = (query) => {
    const page = Math.max(1, parseInt(query.page) || 1);
    const pageSize = Math.min(
        config.pagination.maxPageSize,
        Math.max(1, parseInt(query.pageSize) || config.pagination.defaultPageSize)
    );
    return { page, pageSize };
};

const parseSortParams = (query, allowedFields) => {
    const sortBy = query.sortBy || 'createdAt';
    const sortOrder = query.sortOrder?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    if (allowedFields && !allowedFields.includes(sortBy)) {
        throw new Error(`Invalid sort field. Allowed fields: ${allowedFields.join(', ')}`);
    }

    return { sortBy, sortOrder };
};

const parseFilterParams = (query, allowedFilters) => {
    const filters = {};

    Object.keys(query).forEach(key => {
        if (allowedFilters && allowedFilters.includes(key) && query[key] !== undefined) {
            filters[key] = query[key];
        }
    });

    return filters;
};

const buildPaginationResponse = (data, total, page, pageSize) => {
    const totalPages = Math.ceil(total / pageSize);

    return {
        data,
        pagination: {
            currentPage: page,
            pageSize,
            totalItems: total,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1
        }
    };
};

module.exports = {
    parsePaginationParams,
    parseSortParams,
    parseFilterParams,
    buildPaginationResponse
}; 