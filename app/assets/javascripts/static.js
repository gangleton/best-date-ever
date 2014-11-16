function handle_error(){

}

var app = app || {};

var map, infowindow;

app.BadDate = Backbone.Model.extend({
  initialize: function(){
    this.setCoordinates();
  },

  find: function(){
    var self = this;
    var data = {
      lat: this.get('latitude'),
      long: this.get('longitude')
    }

    $.get("/restaurants.json", data, function(res){
      var resto = _.sample(res);
      self.set({ name: resto.name, score: resto.score, lat: resto.lat, long: resto.long })
      
      loadRestaurant(self);
    });
  },

  urlRoot: '/date',

  setCoordinates: function(){
    var model = this;

    navigator.geolocation.getCurrentPosition(function(location){
      var coords = location.coords;

      model.set({ latitude: coords.latitude, longitude: coords.longitude });

      model.find();
    }, handle_error);
  }
})

function loadRestaurant(restaurant) {
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(restaurant.get('lat'), restaurant.get('long')),
    map: map
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(restaurant.get('name'));
    infowindow.open(map, marker);
  });
}

function initializeMap() {
  map = new google.maps.Map($("#map")[0], {
    center: {
      lat: 40.7259802,
      lng: -73.968023
    },
    zoom: 14,
    streetViewControl: false,
    mapTypeControl: false
  });

  infowindow = new google.maps.InfoWindow();

  var osmMapLayer = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
      return "http://a.tiles.mapbox.com/v4/mapmeld.6f0kvs4i/" +
        zoom + "/" + coord.x + "/" + coord.y + ".png?access_token=pk.eyJ1IjoibWFwbWVsZCIsImEiOiI0a1NzYW53In0.2gQTd6k9Ghw8UBK4DsciLA";
    },
    tileSize: new google.maps.Size(256, 256),
    isPng: true,
    alt: "MapBox",
    name: "MapBox",
    maxZoom: 16
  });
  map.mapTypes.set('MapBox',osmMapLayer);

  map.setMapTypeId('MapBox');
}

app.AppView = Backbone.View.extend({
  el: '#dateapp',

  initialize: function(){
    var date = new app.BadDate();
    initializeMap();
  }
})




$(function(){
  new app.AppView();
})
