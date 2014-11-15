class Restaurant
  include Mongoid::Document
  field :name, type: String
  field :lat, type: Float
  field :long, type: Float
  field :score, type: Integer
end
