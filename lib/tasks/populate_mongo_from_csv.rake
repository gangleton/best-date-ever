namespace :db do
  desc "populates database from CSV file"
  task populate: :environment do
    # without using chunks:
    filename = './data/restaurants.csv'
    options = {:key_mapping => {:unwanted_row => nil, :old_row_name => :new_name}}
    n = SmarterCSV.process(filename, options) do |array|
      puts array[0][:name], array[0][:lat], array[0][:lng], array[0][:score]
      #Restaurant.create( array.first )
      Restaurant.create( name: array[0][:name], lat: array[0][:lat], long: array[0][:lng], score: array[0][:score] )
    end
  end
end

