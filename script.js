let countyURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
let educationURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";

// Initialize variables for data arrays that D3 will use to draw map on canvas
let countyData;
let educationData;

// Reference to the canvas element
let canvas = d3.select('#canvas');

let drawMap = () => {
    /*  Send country data array to canvas svg path. D3 geoPath will convert
        coordinates to strings that can be used to draw SVG paths on canvas.
    */
    canvas.selectAll("path")
        .data(countyData)
        .enter()
        .append("path")
        .attr("d", d3.geoPath()) // "d" is set of coordinates needed to draw path
        .attr("class", "county") // Set class for CSS styling
}

/*  Asynchronous function using D3 json method to import JSON data. D3 requres a
    format of GeoJSON for map data.
    https://geojson.org/
*/
d3.json(countyURL).then(
    (data, error) => {
        if (error) {
            console.log(error);
        } else {
            /*  Counties are represented as objects in an array. Each object has a
                property called "id" that contains an array of arcs. Each arc is an
                array of coordinates used to draw lines on map.
            */

            /*  Use topojson library to convert TopoJSON to GeoJSON and extract features
                from TopoJSON object. Results in a set of coordinates for each county.
                FIPS code will be used to match county data with education data.
                (FIPS code is a unique identifier for each county, kinda like a zip code)
            */
            countyData = topojson.feature(data, data.objects.counties).features;

            console.log(countyData); // Make sure data is imported

            d3.json(educationURL).then(
                (data, error) => {
                    if (error) {
                        console.log(error);
                    } else {
                        educationData = data;
                        console.log(educationData); // Make sure data is imported

                        drawMap();
                    }
                }
            )
        }
    }
)
