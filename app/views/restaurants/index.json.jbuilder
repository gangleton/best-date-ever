json.array!(@restaurants) do |restaurant|
  json.extract! restaurant, :id, :name, :lat, :long, :score
  json.url restaurant_url(restaurant, format: :json)
end
