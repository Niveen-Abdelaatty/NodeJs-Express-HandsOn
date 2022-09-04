const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..' , 'data', 'recommends.json');

function getStoredRestaurants(){
    const ExistingData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(ExistingData);
    return storedRestaurants;
}

function storedRestaurants(storedRestaurants){
    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
}

module.exports = {
    getStoredRestaurants: getStoredRestaurants,
    storedRestaurants: storedRestaurants
}