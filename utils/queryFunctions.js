module.exports = class QueryFunctions {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };

    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    excludedFields.forEach(field => delete queryObj[field]);

    let queryString = JSON.stringify(queryObj);

    queryString = queryString.replace(/\b(gte?|lte?)\b/g, op => `$${op}`);

    const queryObjRebuild = JSON.parse(queryString);

    if (queryObj.name) {
      const queryRegexName = new RegExp(queryObj.name, 'i');
      queryObjRebuild.name = queryRegexName;
    }

    this.query.find(queryObjRebuild);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.replaceAll(',', ' ');

      this.query.sort(sortBy);
    } else {
      this.query.sort('name');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.replaceAll(',', ' ');

      this.query.select(fields);
    } else {
      this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = +this.queryString.page || 1;

    const resultsPerPage = +this.queryString.limit || 50;

    const skip = (page - 1) * resultsPerPage;

    this.query.skip(skip).limit(resultsPerPage);

    return this;
  }
};
