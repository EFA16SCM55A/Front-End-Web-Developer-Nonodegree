
/*I created free account in https://foursquare.com/developers/apps to benefit from the service for foursquare developers
Client ID
J11FYRR4Z0ZGUT302Z34T5WVSIIMBXUGZNHEF0HIM1NWLSZD
Client Secret
VUGWRGUOTSD3CINWCEPIZAJG5APXLBPHZLIFHZDVU1WQQK3I
My Apps:neighborhoodmap
My Name:Elham */


export const myClientId = " J11FYRR4Z0ZGUT302Z34T5WVSIIMBXUGZNHEF0HIM1NWLSZD"
export const myClientSecret = "VUGWRGUOTSD3CINWCEPIZAJG5APXLBPHZLIFHZDVU1WQQK3I"
const version  = 20181311;
/*this function will return the information that will be needed to present in the marker by using foursquare  */
export const getInfoForMarkerW = (MarkerId) => {

  return fetch(`${"https://api.foursquare.com/v2/venues/"}${MarkerId}?client_id=${myClientId}&client_secret=${myClientSecret}&v=${version}`)
    .then(response => {

      if(!response.ok ){
        console.error("Ooops there is problem");
        throw response.ok
      }
      else {return response.json();}
      }).then(result => {return result.response;});
};
//create categories array
/*To get Venue Categories from https://developer.foursquare.com/docs/resources/categories
Below is the Foursquare Venue Category Hierarchy. Categories that specify 
a list of “Supported Countries” can only appear on venues in those countries. 
All other categories are supported globally by default. 
We also return a formatted JSON response of the hierarchy here. The list is so long but I will use part from it for initial values*/

const venueCategories = [
  {id: "Music Venue",
   name: "4bf58dd8d48988d1e5931735"},
  {id: "Pachinko Parlor",
   name: "5744ccdfe4b0c0459246b4b8"},
  {id: "Travel & Transport",
   name: "4d4b7105d754a06379d81259"},
  {id: "Residence",
   name: "4e67e38e036454776db1fb3a"},
  {id: "Professional & Other Places",
   name: "4d4b7105d754a06375d81259"},
  {id: "Movie Theater",
   name: "4bf58dd8d48988d17f941735"},
  {id: "Event",
   name: "4d4b7105d754a06373d81259"},
  {id: "College & University",
   name: "4d4b7105d754a06372d81259"},
]


/*fetch('https://api.foursquare.com/v2/venues/explore?client_id=CLIENT_ID&client_secret=CLIENT_SECRET&v=20180323&limit=1&ll=40.7243,-74.0018&query=coffee')
    .then(function() {
        // Code for handling API response
    })
    .catch(function() {
        // Code for handling errors
    });*/
/*this function will return the categories by using the map center first through using venue categories through foursquare  */
export const getVenueCategoriesCenter = (centerMap) => {

  const venueCategoryId = venueCategories.map(BeCategoryId => BeCategoryId.name);

  return fetch(`${"https://api.foursquare.com/v2/venues/"}search?ll=${centerMap.lat},
    ${centerMap.lng}&client_id=${myClientId}&client_secret=${myClientSecret}&v=${version}&categoryId=${venueCategoryId}&radius=1609&limit=50`)
    .then(response => {
      if(!response.ok ){
          console.error("Ooops there is problem");
          throw response.ok
          } 
      else{
      return response.json();}})
    .then(result => {
    const exactVenues = result.response.venues
    .filter(venueLocation =>venueLocation.location.address && venueLocation.location.city);
    return exactVenues;
    });
};
