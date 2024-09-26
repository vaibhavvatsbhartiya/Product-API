const ProductModel = require("../models/ProductModel");

const getAllProducts = async (req, res) => {
    const { company, name, sort, fields, page, limit } = req.query;
    const queryObject = {};

    // Filter by company
    if (company) {
        queryObject.company = company;
    }

    // Filter by name using regex for partial match and case-insensitive search
    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }

    // Build the base query
    let apiData = ProductModel.find(queryObject);

    // Sorting the data
    if (sort) {
        let sortFix = sort.replace(",", " ");
        apiData = apiData.sort(sortFix);
    }

    // Selecting specific fields
    if (fields) {
        let fieldsFix = fields.replace(",", " ");
        apiData = apiData.select(fieldsFix);
    }

    // Pagination logic
    const pageNumber = Number(page) || 1;       // Default to page 1 if not specified
    const limitNumber = Number(limit) || 10;    // Default to 10 results per page
    const skipIt = (pageNumber - 1) * limitNumber; // Skip records for pagination

    // Applying pagination
    apiData = apiData.skip(skipIt).limit(limitNumber);

    // Execute the query
    const myProductData = await apiData;

    // Send the response with data and the number of hits
    res.status(200).json({ myProductData, nbHits: myProductData.length });
};



const getAllProductsTesting = async (req, res) => {
    const myProductData = await ProductModel.find(req.query);
    res.status(200).json({ myProductData });
}

module.exports = { getAllProducts, getAllProductsTesting };
