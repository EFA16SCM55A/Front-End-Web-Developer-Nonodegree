/*   
Useful resources: 
https://www.diigo.com/outliner/fkkuvb/Udacity-Neighborhood-Map-Project-(project-%237)?key=25wgqnwals
https://developers.google.com/maps/documentation/javascript/markers#marker_labels
https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component
https://community.qlik.com/thread/207153
 //source:https://jonathan-harrell.com/advanced-css-form-styling/
https://developers.google.com/maps/documentation/javascript/adding-a-google-map
https://stackoverflow.com/questions/41709765/how-to-load-the-google-maps-api-script-in-my-react-app-only-when-it-is-require
**************************
ScriptLoader will hold the map,src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap">
Use this key in your application by passing it with the key=API_KEY parameter.
Your API key:AIzaSyDnqKXAc1RyiY8dHCkIKKXnzFEQJLLf1Bo
*/
import React, { Component } from 'react';
import { mapStyle } from './Style.js';
import scriptLoader from 'react-async-script-loader';
import LocList from './LocList.js';

class App extends Component {
  constructor(props) {
    super(props);
    var uluru = {lat: 41.8929416, lng: -87.6235586};
    this.state = {
      listMarker: true,
      infoWindow: {},
      infoWindowOpen: false,
      neighborhoodMap: {},
      centerMap:uluru ,
      MapNeedTime: false,
      error: false,
      screenWidth: window.innerWidth
    }

  }
  
  /*check Marker if it is openned, closed*/
  isOpen = () => {
    const { listMarker } = this.state;
    if (listMarker) {
       this.setState({listMarker: false});
     }
  }
/*Build map */
   componentDidUpdate({ isScriptLoadSucceed }) {
    const { centerMap } = this.state;

    if (isScriptLoadSucceed && !this.state.MapNeedTime) {
      let map = new window.google.maps.Map(document.getElementById('map'), {
          center: centerMap,
          zoom: 9,
          styles: mapStyle,
          gestureHandling: 'greedy',
          mapTypeControl: false
        });

        const createWindow = new window.google.maps.InfoWindow({maxWidth: 300});

        this.setState({
          neighborhoodMap: map,
          MapNeedTime: true,
          infoWindow: createWindow,
        });
    } else if (!this.state.MapNeedTime) {
      this.setState({ error: true });
    }
  }

/*make  make a page responsive
Build page, Make sections to have the list and map, load map */
  render() {
    const { listMarker, infoWindowOpen,
            infoWindow, neighborhoodMap,
            centerMap, MapNeedTime, error,
            screenWidth } = this.state;

    return (
      <div id="container" role="main">
        { screenWidth < 800 ? (
          <nav>
            <div></div>
            />
          </nav>) : " "}
        <section id="listSection"
                  tabIndex={ listMarker ? "0" : "-1"}
                  className={ listMarker ? "list-open" : "list-hide"}>
          { MapNeedTime ? (
           <LocList
            centerMap={centerMap}
            listMarker = {listMarker}
            infoWindowOpen={infoWindowOpen}
            infoWindow={infoWindow}
            neighborhoodMap={neighborhoodMap}
            filterSearchBox={this.filterSearchBox}
            filterIcons={this.filterIcons}
            isOpen={this.isOpen}/>) : (<p>sorry</p> )}
        </section>
         <section id="map">
          {error ? (<div id="maperror"></div>) : (<div id="mapload"></div>)}
        </section>
      </div>
    );
  }
}

export default scriptLoader([`https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyDnqKXAc1RyiY8dHCkIKKXnzFEQJLLf1Bo`]) (App);

