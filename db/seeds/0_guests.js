
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('guests').del()
    .then(function () {
      // Inserts seed entries
      knex('guests').insert([
        {
          fname: 'John',
          lname: 'Kraucunas',
          street: '3016 Co Rd Q',
          city: 'Decatur',
          state: 'NE',
          zip: 68020,
          num_guests: 1
        },
        {
          fname: 'Lana',
          lname: 'Kraucunas',
        },
        {
          fname: 'Cindy',
          lname: 'Andrews',
          street: '2810 Commons Drive',
          city: 'Lawrenceville',
          state: 'GA',
          zip: 30044,
          num_guests: 3
        },
        {
          fname: 'Ron',
          lname: 'Andrews',
        },
        {
          fname: 'Rusty',
          lname: 'Andrews',
        },
        {
          fname: 'Chris',
          lname: 'Andrews',
        },
        {
          fname: 'Ryan',
          lname: 'Andrews',
          street: '3152 Falconhurst Dr',
          city: 'Lilburn',
          state: 'GA',
          zip: 30047,
          num_guests: 1
        },
        {
          fname: 'Jessica',
          lname: 'Andrews',
        },
        {
          fname: 'Debbie',
          lname: 'Speck',
          street: '3463 Co Rd Q',
          city: 'Decatur',
          state: 'NE',
          zip: 68020,
          num_guests: 0
        },
        {
          fname: 'Tracy',
          lname: 'Bagley',
          street: '16698 290th St',
          city: 'Treynor',
          state: 'IA',
          zip: 51575,
          num_guests: 1
        },
        {
          fname: 'Steve',
          lname: 'Bagley',
        },
        {
          fname: 'Amy',
          lname: 'Daniel',
          street: '914 S 151 Circle',
          city: 'Omaha',
          state: 'NE',
          zip: 68154,
          num_guests: 1
        },
        {
          fname: 'Pat',
          lname: 'Daniel',
        },
        {
          fname: 'Jake',
          lname: 'Speck',
          street: '14663 Boyd Plaza',
          city: 'Omaha',
          state: 'NE',
          zip: 68116,
          num_guests: 1
        },
        {
          fname: 'Mike',
          lname: 'Williams',
          street: '950 Hwy 75',
          city: 'Tekamah',
          state: 'NE',
          zip: 68061,
          num_guests: 1
        },
        {
          fname: 'Molly',
          lname: 'Williams',
        },
        {
          fname: 'Elisha',
          lname: 'Muhleka',
          street: '4208 N 145th Plz #202',
          city: 'Omaha',
          state: 'NE',
          zip: 68116,
          num_guests: 1
        },
        {
          fname: 'TJ',
          lname: 'Muhleka',
        },
        {
          fname: 'Kaylyn',
          lname: 'Van Norstrand',
          street: '1210 Minutemen Ln',
          city: 'Eagleville',
          state: 'PA',
          zip: 19403,
          num_guests: 1
        },
        {
          fname: 'Keith',
          lname: 'Hopkins',
        },
        {
          fname: 'Brianna',
          lname: 'Hernandez',
          street: '2424 W Caithness Pl, #202',
          city: 'Denver',
          state: 'CO',
          zip: 80211,
          num_guests: 1
        },
        {
          fname: 'Rebekah',
          lname: 'Knappe',
          street: '2266 Palm Dr',
          city: 'Colorado Springs',
          state: 'CO',
          zip: 80918,
          num_guests: 1
        },
        {
          fname: 'Charles',
          lname: 'Bryant',
        },
        {
          fname: 'Megan',
          lname: 'MacNicholas',
          street: '3926 S Huron St',
          city: 'Englewood',
          state: 'CO',
          zip: 80110,
          num_guests: 1
        },
        {
          fname: 'Kathleen',
          lname: 'McLaughlin',
          street: '950 Forest St',
          city: 'Denver',
          state: 'CO',
          zip: 80220,
          num_guests: 1
        },
        {
          fname: 'Molly',
          lname: 'Kling',
        },
        {
          fname: 'Maggie',
          lname: 'Kuhlmann',
          street: '126 Pompano Ave',
          city: 'Galveston',
          state: 'TX',
          zip: 77550,
          num_guests: 1
        },
        {
          fname: 'Karel',
          lname: 'Capek',
        },
        {
          fname: 'Danny',
          lname: 'Fritz',
          street: '3627 York St',
          city: 'Denver',
          state: 'CO',
          zip: 80205,
          num_guests: 1
        },
        {
          fname: 'Stephani',
          lname: 'Meyer',
        },
        {
          fname: 'Brooks',
          lname: 'Patton',
          street: '2540 W 26th Ave',
          city: 'Denver',
          state: 'CO',
          zip: 80211,
          num_guests: 1
        },
        {
          fname: 'Leanne',
          lname: 'Cheung',
        },
        {
          fname: 'Dan',
          lname: 'Klein',
          street: '',
          city: 'Detroit',
          state: 'MI',
          zip: 0,
          num_guests: 1
        },
        {
          fname: 'Danny',
          lname: 'Robinson',
          street: '2955 Vallejo St, #26',
          city: 'Denver',
          state: 'CO',
          zip: 80211,
          num_guests: 1
        },
        {
          fname: 'Morgan',
          lname: 'Whaley',
          street: '3111 S Franklin',
          city: 'Englewood',
          state: 'CO',
          zip: 80113,
          num_guests: 1
        },
        {
          fname: 'Yarko',
          lname: 'Thomas',
        },
        {
          fname: 'Ruth',
          lname: 'Anna',
          street: '2061 Spur Cross Road',
          city: 'Grand Junction',
          state: 'CO',
          zip: 81597,
          num_guests: 1
        },
        {
          fname: 'Larry',
          lname: 'Anna',
        },
        {
          fname: 'Teagan',
          lname: 'Glenn',
          street: '11838 W Marlowe Ave',
          city: 'Morrison',
          state: 'CO',
          zip: 80465,
          num_guests: 1
        },
        {
          fname: 'Grace',
          lname: 'Glenn',
        },
        {
          fname: 'Tina',
          lname: 'Gibson',
          street: '240 Sycamore Rd',
          city: 'Elkton',
          state: 'MD',
          zip: 21921,
          num_guests: 3
        },
        {
          fname: 'Andrew',
          lname: 'Gibson',
        },
        {
          fname: 'Mark',
          lname: 'Gibson',
        },
        {
          fname: 'Ethan',
          lname: 'Gibson',
        },
        {
          fname: 'Jim',
          lname: 'Gibson',
          street: '501 N Bridge St',
          city: 'Elkton',
          state: 'MD',
          zip: 21921,
          num_guests: 0
        },
        {
          fname: 'Fran',
          lname: 'Romanek',
          street: '711 Nottingham Rd',
          city: 'Elkton',
          state: 'MD',
          zip: 21921,
          num_guests: 1
        },
        {
          fname: 'Jim',
          lname: 'Romanek',
        },
        {
          fname: 'Cindy',
          lname: 'Romanek Jenkins',
          street: '240 Johnstown Rd',
          city: 'Elkton',
          state: 'MD',
          zip: 21921,
          num_guests: 1
        },
        {
          fname: 'Graham',
          lname: 'McBain',
          street: '',
          city: '',
          state: 'CA',
          zip: 0,
          num_guests: 1
        },
        {
          fname: 'Alissa',
          lname: 'McBain',
        },
        {
          fname: 'Russ',
          lname: 'Duncan',
          street: '8226 E 24th Dr',
          city: 'Denver',
          state: 'CO',
          zip: 80238,
          num_guests: 1
        },
        {
          fname: 'Heather',
          lname: 'Duncan',
        },
        {
          fname: 'Christian',
          lname: 'Bellofatto',
          street: '1936 S Williams St',
          city: 'Denver',
          state: 'CO',
          zip: 80210,
          num_guests: 1
        },
        {
          fname: 'Maggie',
          lname: 'Bellofatto',
        },
        {
          fname: 'Parker',
          lname: 'Quackenbush',
          street: '828 Broadway, #525',
          city: 'Denver',
          state: 'CO',
          zip: 80203,
          num_guests: 1
        },
        {
          fname: 'Joe',
          lname: 'Nelson',
          street: '3050 N Race St',
          city: 'Denver',
          state: 'CO',
          zip: 80205,
          num_guests: 1
        },
        {
          fname: 'Ida',
          lname: 'Nelson',
        },
        {
          fname: 'Josh',
          lname: 'Nefsky',
          street: '8745 E 49th Place',
          city: 'Denver',
          state: 'CO',
          zip: 80238,
          num_guests: 1
        },
        {
          fname: 'Blair',
          lname: 'Nefsky',
        },
        {
          fname: 'Tanner',
          lname: 'McGraw',
          street: '1854 S Sherman St',
          city: 'Denver',
          state: 'CO',
          zip: 80210,
          num_guests: 1
        },

        {
          fname: 'Jessica',
          lname: 'McGraw',
        },
        {
          fname: 'Dan',
          lname: 'Hannigan',
          street: '5701 E 8th Ave, #421',
          city: 'Denver',
          state: 'CO',
          zip: 80220,
          num_guests: 1
        },
        {
          fname: 'Jana',
          lname: 'Ampoyo',
        },
        {
          fname: 'Kyle',
          lname: 'Coberly',
          street: '3008 Syracuse',
          city: 'Denver',
          state: 'CO',
          zip: 80238,
          num_guests: 1
        },
        {
          fname: 'Elyse',
          lname: 'Coberly',
        },
        {
          fname: 'Louisa',
          lname: 'Reese',
          street: '1245 N Logan St, #30',
          city: 'Denver',
          state: 'CO',
          zip: 80203,
          num_guests: 1
        },
        {
          fname: 'Drew',
          lname: 'Dahlman',
          street: '2445 Clarkson St, #1',
          city: 'Denver',
          state: 'CO',
          zip: 80205,
          num_guests: 1
        },
        {
          fname: 'Jack',
          lname: 'Rugile',
          street: '1875 W Beekman Pl',
          city: 'Denver',
          state: 'CO',
          zip: 80221,
          num_guests: 1
        },
        {
          fname: 'Kyle',
          lname: 'Sherman',
          street: '',
          city: '',
          state: 'CO',
          zip: 0,
          num_guests: 1
        },
        {
          fname: 'Lindsey',
          lname: 'Sherman',
        },
      ]);
    });
};
