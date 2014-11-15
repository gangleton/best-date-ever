namespace :db do
  desc "populates database from CSV file"
  task populate: :environment do
    # without using chunks:
    filename = './data/CriticalRestaurants.csv'
    options = {:key_mapping => {:unwanted_row => nil, :old_row_name => :new_name}}
    n = SmarterCSV.process(filename, options) do |array|
      Restaurant.create( array.first )
    end
  end
end

