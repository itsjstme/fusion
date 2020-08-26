let yelpAPI = require("yelp-api");

// Create a new yelpAPI object with your API key
let apiKey = process.env.YELP_CLIENT_SECRET;
let yelp = new yelpAPI(apiKey);

// Set any parameters, if applicable (see API documentation for allowed params)
let business_params = [
  {
    location: "Alpharetta, GA",
    term: "ice cream shop",
    limit: 5,
    sort_by: "rating",
  },
];

// Call the endpoint
yelp
  .query("businesses/search", business_params)
  .then((data) => {
    // Success
    // console.log(data);
    const obj = JSON.parse(data);
    var records = [];

    obj.businesses.forEach(function (record) {
      let review_params = [
        {
          locale: "en_US",
        },
      ];
      // Call the endpoint
      yelp
        .query(`businesses/${record.id}/reviews`, review_params)
        .then((reviews) => {
          // Success
          var rs = [];

          // console.log(reviews);
          const reviews_obj = JSON.parse(reviews);
          reviews_obj.reviews.forEach(function (review) {
            rs.push({
              name: review.user.name,
              review: review.text,
              rating: review.rating,
            });
          });

          records.push({
            name: record.name,
            address: record.location.display_address.join(" "),
          });

          console.log(records);
        })
        .catch((err) => {
          // Failure
          console.log(err);
        });
    }); ///
  })
  .catch((err) => {
    // Failure
    console.log(err);
  });
