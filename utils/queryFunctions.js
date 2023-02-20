module.exports = class QueryFunctions {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // create clone of the query object
    const queryObj = { ...this.queryString };
    // remove fields that might be searched for in a query but are not relevant to filtering DB entries
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    // delete any of these present from the query object
    excludedFields.forEach(field => delete queryObj[field]);
    // turn query (json) object into string
    let queryString = JSON.stringify(queryObj);
    // replace any greater than, greater or equals (and vica versa) queries wit the correct '$' prefix or query won't work
    queryString = queryString.replace(/\b(gte?|lte?)\b/g, op => `$${op}`);
    // rebuild query object
    const queryObjRebuild = JSON.parse(queryString);
    // if query includes name, get the recipe even if name is incomplete (?name=tofu === 'Creamy Tofu Curry')
    if (queryObj.name) {
      const queryRegexName = new RegExp(queryObj.name, 'i');
      queryObjRebuild.name = queryRegexName;
    }
    // return string to query and search for a match
    this.query.find(queryObjRebuild);
    // return the object to allow next function to run and pass affected objected
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      // to avoid bugs replace any commas in query with a space
      const sortBy = this.queryString.sort.replaceAll(',', ' ');
      // call the mongoose sort method on the query (the more queries the more advanced sorting)
      this.query.sort(sortBy);
    } else {
      // by default sort the recipes in alphabetical order
      this.query.sort('name');
    }
    // return the object to allow next function to run and pass affected objected
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      // to avoid bugs replace any commas in query with a space
      const fields = this.queryString.fields.replaceAll(',', ' ');
      // call the mogoose select method on the query to display the desired fields only
      this.query.select(fields);
    } else {
      // by default we exclude the '__v' field as it's uneeded in the client data returned
      this.query.select('-__v');
    }
    // return the object to allow next function to run and pass affected objected
    return this;
  }

  paginate() {
    // assign the query page number or default it to 1
    const page = +this.queryString.page || 1;
    // assign the query results per page limit or default it to 50
    const resultsPerPage = +this.queryString.limit || 50;
    // calculate the skip value for the given page number and amount of results per page
    const skip = (page - 1) * resultsPerPage;
    // use mongoose skip and limit methods to apply pagination
    this.query.skip(skip).limit(resultsPerPage);
    // return the object to allow next function to run and pass affected objected
    return this;
  }
};
