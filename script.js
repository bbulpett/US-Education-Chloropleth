let countyURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
let educationURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";

// Initialize variables for data arrays that D3 will use to draw map on canvas
let countyData;
let educationData;

// Reference to the canvas element
let canvas = d3.select('#canvas');

let drawMap = () => {
 // TODO: Draw the map on the canvas
}

// Asynchronous function using D3 json method to import JSON data
d3.json(countyURL).then(
  (data, error) => {
    if (error) {
      console.log(error);
    } else {
      countyData = data;
      console.log(countyData); // For debugging to make sure data is imported

      d3.json(educationURL).then(
        (data, error) => {
          if (error) {
            console.log(error);
          } else {
            educationData = data;
            console.log(educationData); // For debugging to make sure data is imported

            drawMap();
          }
        }
      )
    }
  }
)
