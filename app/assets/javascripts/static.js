function handle_error(){

}

var app = app || {};

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

app.AppView = Backbone.View.extend({
  el: '#dateapp',

  initialize: function(){
    var date = new app.BadDate();
  }
})

$(function(){
  new app.AppView();
})
