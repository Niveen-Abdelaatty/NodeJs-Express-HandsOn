const express = require("express");
const restData = require("../util/restaurant-data");

const router = express.Router();

router.get("/restaurants", function (req, res) {
  let order = req.query.order;
  let nextOrder = 'desc';

  if(order !== 'asc' && order !== 'desc'){
    order = 'asc';
  }
  if(order === 'desc'){
    nextOrder = 'asc';
  }

  const storedRestaurants = restData.getStoredRestaurants();
  storedRestaurants.sort(function (resA, resB) {
    if ((order === "asc" && resA.name > resB.name) || (order === 'desc' && resB.name > resA.name)){
      return 1;
    }
      return -1;
  });

  res.render("restaurants", {
    restaurantsNumber: storedRestaurants.length,
    restaurants: storedRestaurants,
    nextOrder: nextOrder
  });
});

router.get("/restaurants/:id", function (req, res) {
  const storedRestaurants = restData.getStoredRestaurants();

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === req.params.id) {
      return res.render("restaurant-detail", { restaurant: restaurant });
    }
  }
  res.status(404).render("404");
});

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  const newRestaurant = req.body;
  const storedRestaurants = restData.getStoredRestaurants();
  storedRestaurants.push(newRestaurant);
  restData.storedRestaurants(storedRestaurants);

  res.redirect("/confirm");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;
