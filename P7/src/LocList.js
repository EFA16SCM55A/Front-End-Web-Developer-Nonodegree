//source:https://jonathan-harrell.com/advanced-css-form-styling/
import React, { Component } from 'react';
import { getVenueCategoriesCenter, getInfoForMarkerW} from './Vencategory.js';

class LocList extends Component {


  constructor(props) {
    super();
    this.state = {
      categoriesMapCenter: [],
      categories: [],
      venues: [],
      searchInput: "",};}

  componentDidMount() {
    getVenueCategoriesCenter(this.props.centerMap)
    .then(exactVenues => {
      this.setState({
        venues:exactVenues,
        categoriesMapCenter: exactVenues});
      if(exactVenues) {this.createMarkersFPosition(exactVenues);}
    });
  }



/*this function will create marker to show the location and will retrive information about the location*/
  createMarkersFPosition(exactVenues) {
    const {neighborhoodMap} = this.props;
    const {venues} = this.state;
    const {infoWindow, isOpen } = this.props;
    venues.forEach((venue, marker) => {
      venue.marker = new window.google.maps.Marker({
    		map: neighborhoodMap,
    		position: venue.location,
    		title: venue.name,
    		open: false,
        animation: window.google.maps.Animation.DROP,
        id: venue.id});
        venue.marker.addListener('click', function() {
        const marker = this;
          venue.marker.setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout(function() {marker.setAnimation(null);}, 1000);
          getInfoForMarkerW(marker.id).then(data => {
          const { name, description, location,categories} = data.venue
          if(name){
          marker.name = name}
          else{marker.name = "NoData";}
          if(description)
          {marker.description = description} 
          else {marker.description = "Sorry, we don't know so much info";
          if(location.formattedAddress)
          {marker.location = location.formattedAddress}
          else{location.formattedAddress= "NoData";}
          if(categories.length > 0)
          {marker.categories = categories[0].name}
          else{marker.categories ="NoData";}}
          marker.content=marker;
          createInfowindow(marker.content);
          }).then(() => {infoWindow.setContent(marker.content);
            infoWindow.open(neighborhoodMap, marker);})
          isOpen();});
    });
  }

  /*to filter through using search box entries */
  filterSearchBox = (e) => {
    const {infoWindow} = this.props;
    infoWindow.close();
    const {venues} = this.state;
    const search = e.target.value.toLowerCase();
    this.setState({searchInput: search});
    const result = venues.filter(venue => {const found = venue.name.toLowerCase().indexOf(search) > -1;
      venue.marker.setVisible(found);
      return found;});
    this.setState({ categoriesMapCenter: result });
  };
  /*to filter through using icons */
  filterIcons = (filterObj) => {
    const {infoWindow} = this.props;
    infoWindow.close();
    const {venues} = this.state;
    const categoriesIcons = venues.filter(venue => {
      const venueCat = venue.categories;
      let category = venueCat.map(cat => cat.name)[0];
      /*"if(category ==Restaurant"|| category =="Hotel"||category =="Museum"||category =="Train Station)
      if(category !=Restaurant"&& category !="Hotel"&&category !="Museum"&&category !="Train Station")*/
      if(category === 'Hospital'){
      category ='Other POI'
      } 
      if(category === 'Sports Bar'){
      category ='Other POI'
      } 
      if(category === 'Pub'){
      category ='Other POI'
      } 
      if(category === 'American Restaurant' ){
      category ='Other POI'
      } 
     
      if(category === ' Monument'){
      category ='Other POI'
      } 
      if(category === 'Landmark' ){
      category ='Other POI'
      } 
      if(category === 'Music Venue' ){
      category ='Other POI'
      } 
      if(category === 'Building'){
      category ='Other POI'
      } 
      if(category === 'Furniture '){
      category ='Other POI'
      } 
      if(category === 'Convention Center' ){
      category ='Other POI'
      } 
      if(category === 'Social Club'){
      category ='Other POI'
      } 
      if(category === 'Library'){
      category ='Other POI'
      } 
      if(category === 'Pier'){
      category ='Other POI'
      } 
      if(category === 'General Entertainment'){
      category ='Other POI'
      } 
      if(category === 'Tiki Bar'){
      category ='Other POI'
      } 
      if(category === 'Office'){
      category ='Other POI'
      } 
      if(category === 'Gastropub'){
      category ='Other POI'
      } 
      if(category === 'Bar' ){
      category ='Other POI'
      } 
      if(category === 'Cocktail Bar'){
      category ='Other POI'
      } 
      const found = category.toLowerCase().includes(filterObj.toLowerCase());
      venue.marker.setVisible(found);
      return found;
    });
    this.setState({ categoriesMapCenter: categoriesIcons });
  };

  /*to assign icons for each catagory */
  assignIcon=(name)=>{
    if(name==="Restaurant"){name= require(`${"./resturanticon.png"}`);}
    if(name==="Hotel"){name= require(`${"./hotelicon.png"}`);}
    if(name==="Museum"){name=require(`${"./museumicon.png"}`);}
    if(name==="Train Station"){name= require(`${"./transportationicon.png"}`);}
    if(name==="Other POI"){name=require(`${"./moreicon.png"}`);}
    return name;
  }
  /*to help us to open the info by clicking */
    openOnClick = (venue) => {
    window.google.maps.event.trigger(venue.marker, "click");
  }
  render() {
    const categoriesList = ["Restaurant", "Hotel","Museum","Train Station","Other POI"]
    const { categoriesMapCenter } = this.state;
    const { windowOpen } = this.props;
    return(
      <div>
      <div className="form-group">
        <input id="dynamic-label-input"
              type="text"
              role="search"
              tabIndex={windowOpen ? "0" : "-1"}
              data-bind="textInput: filter"
              placeholder="search"
              onChange={this.filterSearchBox}/>
              <label htmlFor="dynamic-label-input">
              "10 Landmarks in Chicago You Don't Want to Miss, Go out and see with Elham"
              </label>
           
           </div>
          <ul className="categoriesList">
          {categoriesList.map(name => (
            <li key={name}
                role="button"
                tabIndex={windowOpen ? "0" : "-1"}
                onClick={() => this.filterIcons(name)}
                onKeyPress={() => this.filterIcons(name)}>
              <div className="container1">
              <img src={this.assignIcon(name)} alt="filter"/></div>

            </li>
          ))}
        </ul>
          <ul className="location" role="listbox">
                {categoriesMapCenter.map(venue => (
                  <li key={venue.id}
                      role="option"
                      aria-selected="true"
                      tabIndex={windowOpen ? "0" : "-1"}
                      onClick={() => this.openOnClick(venue)}
                      onKeyPress={() => this.window.google.maps.event.trigger(venue.marker, "click")}>
                    {venue.name}
                    </li>
                ))}
          </ul>

      </div>
    );
  }
}
export const createInfowindow  = (marker) => {
marker.content = `<div className="infowindow">
                      <div className="infoBox">
                        <h3 className="locationName">${marker.name}</h3>
                        <p className="address">${marker.location}</p>
                        <p className="description">${marker.description}</p>
                      </div>
                    </div>`
return marker}
export default LocList