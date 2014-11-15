function handle_error(){

}

var app = app || {};

app.BadDate = Backbone.Model.extend({
  initialize: function(){
    this.setCoordinates();
  },

  urlRoot: '/date',

  setCoordinates: function(callback){
    var model = this;

    navigator.geolocation.getCurrentPosition(function(location){
      var coords = location.coords;
      console.log(coords);

      model.set({ latitude: coords.latitude, longitude: coords.longitude });

      callback();
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
