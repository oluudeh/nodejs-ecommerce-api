const fs = require('fs')
const path = require('path')

'use strict';

const SQL = `
-- --
INSERT INTO department (department_id, name, description) VALUES
       (1, 'Regional', 'Proud of your country? Wear a T-shirt with a national symbol stamp!'),
       (2, 'Nature', 'Find beautiful T-shirts with animals and flowers in our Nature department!'),
       (3, 'Seasonal', 'Each time of the year has a special flavor. Our seasonal T-shirts express traditional symbols using unique postal stamp pictures.');

-- --
INSERT INTO category (category_id, department_id, name, description) VALUES
       (1, 1, 'French', 'The French have always had an eye for beauty. One look at the T-shirts below and you''ll see that same appreciation has been applied abundantly to their postage stamps. Below are some of our most beautiful and colorful T-shirts, so browse away! And don''t forget to go all the way to the bottom - you don''t want to miss any of them!'),
       (2, 1, 'Italian', 'The full and resplendent treasure chest of art, literature, music, and science that Italy has given the world is reflected splendidly in its postal stamps. If we could, we would dedicate hundreds of T-shirts to this amazing treasure of beautiful images, but for now we will have to live with what you see here. You don''t have to be Italian to love these gorgeous T-shirts, just someone who appreciates the finer things in life!'),
       (3, 1, 'Irish', 'It was Churchill who remarked that he thought the Irish most curious because they didn''t want to be English. How right he was! But then, he was half-American, wasn''t he? If you have an Irish genealogy you will want these T-shirts! If you suddenly turn Irish on St. Patrick''s Day, you too will want these T-shirts! Take a look at some of the coolest T-shirts we have!'),
       (4, 2, 'Animal', ' Our ever-growing selection of beautiful animal T-shirts represents critters from everywhere, both wild and domestic. If you don''t see the T-shirt with the animal you''re looking for, tell us and we''ll find it!'),
       (5, 2, 'Flower', 'These unique and beautiful flower T-shirts are just the item for the gardener, flower arranger, florist, or general lover of things beautiful. Surprise the flower in your life with one of the beautiful botanical T-shirts or just get a few for yourself!'),
       (6, 3, 'Christmas', ' Because this is a unique Christmas T-shirt that you''ll only wear a few times a year, it will probably last for decades (unless some grinch nabs it from you, of course). Far into the future, after you''re gone, your grandkids will pull it out and argue over who gets to wear it. What great snapshots they''ll make dressed in Grandpa or Grandma''s incredibly tasteful and unique Christmas T-shirt! Yes, everyone will remember you forever and what a silly goof you were when you would wear only your Santa beard and cap so you wouldn''t cover up your nifty T-shirt.'),
       (7, 3, 'Valentine''s', 'For the more timid, all you have to do is wear your heartfelt message to get it across. Buy one for you and your sweetie(s) today!');

-- --
INSERT INTO product (product_id, name, description, price, discounted_price, image, image_2, thumbnail, display) VALUES
       (1, 'Arc d''Triomphe', 'This beautiful and iconic T-shirt will no doubt lead you to your own triumph.', 14.99, 0.00, 'arc-d-triomphe.gif', 'arc-d-triomphe-2.gif', 'arc-d-triomphe-thumbnail.gif', 0),
       (2, 'Chartres Cathedral', '"The Fur Merchants". Not all the beautiful stained glass in the great cathedrals depicts saints and angels! Lay aside your furs for the summer and wear this beautiful T-shirt!', 16.95, 15.95, 'chartres-cathedral.gif', 'chartres-cathedral-2.gif', 'chartres-cathedral-thumbnail.gif', 2),
       (3, 'Coat of Arms', 'There''s good reason why the ship plays a prominent part on this shield!', 14.50, 0.00, 'coat-of-arms.gif', 'coat-of-arms-2.gif', 'coat-of-arms-thumbnail.gif', 0),
       (4, 'Gallic Cock', 'This fancy chicken is perhaps the most beloved of all French symbols. Unfortunately, there are only a few hundred left, so you''d better get your T-shirt now!', 18.99, 16.99, 'gallic-cock.gif', 'gallic-cock-2.gif', 'gallic-cock-thumbnail.gif', 2),
       (5, 'Marianne', 'She symbolizes the "Triumph of the Republic" and has been depicted many different ways in the history of France, as you will see below!', 15.95, 14.95, 'marianne.gif', 'marianne-2.gif', 'marianne-thumbnail.gif', 2),
       (6, 'Alsace', 'It was in this region of France that Gutenberg perfected his movable type. If he could only see what he started!', 16.50, 0.00, 'alsace.gif', 'alsace-2.gif', 'alsace-thumbnail.gif', 0),
       (7, 'Apocalypse Tapestry', 'One of the most famous tapestries of the Loire Valley, it dates from the 14th century. The T-shirt is of more recent vintage, however.', 20.00, 18.95, 'apocalypse-tapestry.gif', 'apocalypse-tapestry-2.gif', 'apocalypse-tapestry-thumbnail.gif', 0),
       (8, 'Centaur', 'There were never any lady centaurs, so these guys had to mate with nymphs and mares. No wonder they were often in such bad moods!', 14.99, 0.00, 'centaur.gif', 'centaur-2.gif', 'centaur-thumbnail.gif', 0),
       (9, 'Corsica', 'Borrowed from Spain, the "Moor''s head" may have celebrated the Christians'' victory over the Moslems in that country.', 22.00, 0.00, 'corsica.gif', 'corsica-2.gif', 'corsica-thumbnail.gif', 0),
       (10, 'Haute Couture', 'This stamp publicized the dress making industry. Use it to celebrate the T-shirt industry!', 15.99, 14.95, 'haute-couture.gif', 'haute-couture-2.gif', 'haute-couture-thumbnail.gif', 3),
       (11, 'Iris', 'Iris was the Goddess of the Rainbow, daughter of the Titans Thaumas and Electra. Are you up to this T-shirt?!', 17.50, 0.00, 'iris.gif', 'iris-2.gif', 'iris-thumbnail.gif', 0),
       (12, 'Lorraine', 'The largest American cemetery in France is located in Lorraine and most of the folks there still appreciate that fact.', 16.95, 0.00, 'lorraine.gif', 'lorraine-2.gif', 'lorraine-thumbnail.gif', 0),
       (13, 'Mercury', 'Besides being the messenger of the gods, did you know that Mercury was also the god of profit and commerce? This T-shirt is for business owners!', 21.99, 18.95, 'mercury.gif', 'mercury-2.gif', 'mercury-thumbnail.gif', 2),
       (14, 'County of Nice', 'Nice is so nice that it has been fought over for millennia, but now it all belongs to France.', 12.95, 0.00, 'county-of-nice.gif', 'county-of-nice-2.gif', 'county-of-nice-thumbnail.gif', 0),
       (15, 'Notre Dame', 'Commemorating the 800th anniversary of the famed cathedral.', 18.50, 16.99, 'notre-dame.gif', 'notre-dame-2.gif', 'notre-dame-thumbnail.gif', 2),
       (16, 'Paris Peace Conference', 'The resulting treaties allowed Italy, Romania, Hungary, Bulgaria, and Finland to reassume their responsibilities as sovereign states in international affairs and thus qualify for membership in the UN.', 16.95, 15.99, 'paris-peace-conference.gif', 'paris-peace-conference-2.gif', 'paris-peace-conference-thumbnail.gif', 2),
       (17, 'Sarah Bernhardt', 'The "Divine Sarah" said this about Americans: "You are younger than we as a race, you are perhaps barbaric, but what of it? You are still in the molding. Your spirit is superb. It is what helped us win the war." Perhaps we''re still barbaric but we''re still winning wars for them too!', 14.99, 0.00, 'sarah-bernhardt.gif', 'sarah-bernhardt-2.gif', 'sarah-bernhardt-thumbnail.gif', 0),
       (18, 'Hunt', 'A scene from "Les Tres Riches Heures," a medieval "book of hours" containing the text for each liturgical hour of the day. This scene is from a 14th century painting.', 16.99, 15.95, 'hunt.gif', 'hunt-2.gif', 'hunt-thumbnail.gif', 2), 
       (19, 'Italia', 'The War had just ended when this stamp was designed, and even so, there was enough optimism to show the destroyed oak tree sprouting again from its stump! What a beautiful T-shirt!', 22.00, 18.99, 'italia.gif', 'italia-2.gif', 'italia-thumbnail.gif', 2),
       (20, 'Torch', 'The light goes on! Carry the torch with this T-shirt and be a beacon of hope for the world!', 19.99, 17.95, 'torch.gif', 'torch-2.gif', 'torch-thumbnail.gif', 2),
       (21, 'Espresso', 'The winged foot of Mercury speeds the Special Delivery mail to its destination. In a hurry? This T-shirt is for you!', 16.95, 0.00, 'espresso.gif', 'espresso-2.gif', 'espresso-thumbnail.gif', 0),
       (22, 'Galileo', 'This beautiful T-shirt does honor to one of Italy''s (and the world''s) most famous scientists. Show your appreciation for the education you''ve received!', 14.99, 0.00, 'galileo.gif', 'galileo-2.gif', 'galileo-thumbnail.gif', 0),
       (23, 'Italian Airmail', 'Thanks to modern Italian post, folks were able to reach out and touch each other. Or at least so implies this image. This is a very fast and friendly T-shirt--you''ll make friends with it!', 21.00, 17.99, 'italian-airmail.gif', 'italian-airmail-2.gif', 'italian-airmail-thumbnail.gif', 0),
       (24, 'Mazzini', 'Giuseppe Mazzini is considered one of the patron saints of the "Risorgimiento." Wear this beautiful T-shirt to tell the world you agree!', 20.50, 18.95, 'mazzini.gif', 'mazzini-2.gif', 'mazzini-thumbnail.gif', 2),
       (25, 'Romulus & Remus', 'Back in 753 BC, so the story goes, Romulus founded the city of Rome (in competition with Remus, who founded a city on another hill). Their adopted mother is shown in this image. When did they suspect they were adopted?', 17.99, 16.95, 'romulus-remus.gif', 'romulus-remus-2.gif', 'romulus-remus-thumbnail.gif', 2),
       (26, 'Italy Maria', 'This beautiful image of the Virgin is from a work by Raphael, whose life and death it honors. It is one of our most popular T-shirts!', 14.00, 0.00, 'italy-maria.gif', 'italy-maria-2.gif', 'italy-maria-thumbnail.gif', 0),
       (27, 'Italy Jesus', 'This image of Jesus teaching the gospel was issued to commemorate the third centenary of the "propagation of the faith." Now you can do your part with this T-shirt!', 16.95, 0.00, 'italy-jesus.gif', 'italy-jesus-2.gif', 'italy-jesus-thumbnail.gif', 0),
       (28, 'St. Francis', 'Here St. Francis is receiving his vision. This dramatic and attractive stamp was issued on the 700th anniversary of that event.', 22.00, 18.99, 'st-francis.gif', 'st-francis-2.gif', 'st-francis-thumbnail.gif', 2),
       (29, 'Irish Coat of Arms', 'This was one of the first stamps of the new Irish Republic, and it makes a T-shirt you''ll be proud to wear on St. Paddy''s Day!', 14.99, 0.00, 'irish-coat-of-arms.gif', 'irish-coat-of-arms-2.gif', 'irish-coat-of-arms-thumbnail.gif', 0),
       (30, 'Easter Rebellion', 'The Easter Rebellion of 1916 was a defining moment in Irish history. Although only a few hundred participated and the British squashed it in a week, its leaders were executed, which galvanized the uncommitted.', 19.00, 16.95, 'easter-rebellion.gif', 'easter-rebellion-2.gif', 'easter-rebellion-thumbnail.gif', 2),
       (31, 'Guiness', 'Class! Who is this man and why is he important enough for his own T-shirt?!', 15.00, 0.00, 'guiness.gif', 'guiness-2.gif', 'guiness-thumbnail.gif', 0),
       (32, 'St. Patrick', 'This stamp commemorated the 1500th anniversary of the revered saint''s death. Is there a more perfect St. Patrick''s Day T-shirt?!', 20.50, 17.95, 'st-patrick.gif', 'st-patrick-2.gif', 'st-patrick-thumbnail.gif', 0),
       (33, 'St. Peter', 'This T-shirt commemorates the holy year of 1950.', 16.00, 14.95, 'st-peter.gif', 'st-peter-2.gif', 'st-peter-thumbnail.gif', 2),
       (34, 'Sword of Light', 'This was the very first Irish postage stamp, and what a beautiful and cool T-shirt it makes for the Irish person in your life!', 14.99, 0.00, 'sword-of-light.gif', 'sword-of-light-2.gif', 'sword-of-light-thumbnail.gif', 0),
       (35, 'Thomas Moore', 'One of the greatest if not the greatest of Irish poets and writers, Moore led a very interesting life, though plagued with tragedy in a somewhat typically Irish way. Remember "The Last Rose of Summer"?', 15.95, 14.99, 'thomas-moore.gif', 'thomas-moore-2.gif', 'thomas-moore-thumbnail.gif', 2),
       (36, 'Visit the Zoo', 'This WPA poster is a wonderful example of the art produced by the Works Projects Administration during the Depression years. Do you feel like you sometimes live or work in a zoo? Then this T-shirt is for you!', 20.00, 16.95, 'visit-the-zoo.gif', 'visit-the-zoo-2.gif', 'visit-the-zoo-thumbnail.gif', 2),
       (37, 'Sambar', 'This handsome Malayan Sambar was a pain in the neck to get to pose like this, and all so you could have this beautiful retro animal T-shirt!', 19.00, 17.99, 'sambar.gif', 'sambar-2.gif', 'sambar-thumbnail.gif', 2),
       (38, 'Buffalo', 'Of all the critters in our T-shirt zoo, this is one of our most popular. A classic animal T-shirt for an individual like yourself!', 14.99, 0.00, 'buffalo.gif', 'buffalo-2.gif', 'buffalo-thumbnail.gif', 0),
       (39, 'Mustache Monkey', 'This fellow is more than equipped to hang out with that tail of his, just like you''ll be fit for hanging out with this great animal T-shirt!', 20.00, 17.95, 'mustache-monkey.gif', 'mustache-monkey-2.gif', 'mustache-monkey-thumbnail.gif', 2),
       (40, 'Colobus', 'Why is he called "Colobus," "the mutilated one"? He doesn''t have a thumb, just four fingers! He is far from handicapped, however; his hands make him the great swinger he is. Speaking of swinging, that''s what you''ll do with this beautiful animal T-shirt!', 17.00, 15.99, 'colobus.gif', 'colobus-2.gif', 'colobus-thumbnail.gif', 2),
       (41, 'Canada Goose', 'Being on a major flyway for these guys, we know all about these majestic birds. They hang out in large numbers on a lake near our house and fly over constantly. Remember what Frankie Lane said? "I want to go where the wild goose goes!" And when you go, wear this cool Canada goose animal T-shirt.', 15.99, 0.00, 'canada-goose.gif', 'canada-goose-2.gif', 'canada-goose-thumbnail.gif', 0),
       (42, 'Congo Rhino', 'Among land mammals, this white rhino is surpassed in size only by the elephant. He has a big fan base too, working hard to make sure he sticks around. You''ll be a fan of his, too, when people admire this unique and beautiful T-shirt on you!', 20.00, 18.99, 'congo-rhino.gif', 'congo-rhino-2.gif', 'congo-rhino-thumbnail.gif', 2),
       (43, 'Equatorial Rhino', 'There''s a lot going on in this frame! A black rhino is checking out that python slithering off into the bush--or is he eyeing you? You can bet all eyes will be on you when you wear this T-shirt!', 19.95, 17.95, 'equatorial-rhino.gif', 'equatorial-rhino-2.gif', 'equatorial-rhino-thumbnail.gif', 2),
       (44, 'Ethiopian Rhino', 'Another white rhino is honored in this classic design that bespeaks the Africa of the early century. This pointillist and retro T-shirt will definitely turn heads!', 16.00, 0.00, 'ethiopian-rhino.gif', 'ethiopian-rhino-2.gif', 'ethiopian-rhino-thumbnail.gif', 0),
       (45, 'Dutch Sea Horse', 'I think this T-shirt is destined to be one of our most popular simply because it is one of our most beautiful!', 12.50, 0.00, 'dutch-sea-horse.gif', 'dutch-sea-horse-2.gif', 'dutch-sea-horse-thumbnail.gif', 0),
       (46, 'Dutch Swans', 'This stamp was designed in the middle of the Nazi occupation, as was the one above. Together they reflect a spirit of beauty that evil could not suppress. Both of these T-shirts will make it impossible to suppress your artistic soul, too!', 21.00, 18.99, 'dutch-swans.gif', 'dutch-swans-2.gif', 'dutch-swans-thumbnail.gif', 2),
       (47, 'Ethiopian Elephant', 'From the same series as the Ethiopian Rhino and the Ostriches, this stylish elephant T-shirt will mark you as a connoisseur of good taste!', 18.99, 16.95, 'ethiopian-elephant.gif', 'ethiopian-elephant-2.gif', 'ethiopian-elephant-thumbnail.gif', 2),
       (48, 'Laotian Elephant', 'This working guy is proud to have his own stamp, and now he has his own T-shirt!', 21.00, 18.99, 'laotian-elephant.gif', 'laotian-elephant-2.gif', 'laotian-elephant-thumbnail.gif', 0),
       (49, 'Liberian Elephant', 'And yet another Jumbo! You need nothing but a big heart to wear this T-shirt (or a big sense of style)!', 22.00, 17.50, 'liberian-elephant.gif', 'liberian-elephant-2.gif', 'liberian-elephant-thumbnail.gif', 2),
       (50, 'Somali Ostriches', 'Another in an old series of beautiful stamps from Ethiopia. These big birds pack quite a wallop, and so will you when you wear this uniquely retro T-shirt!', 12.95, 0.00, 'somali-ostriches.gif', 'somali-ostriches-2.gif', 'somali-ostriches-thumbnail.gif', 0),
       (51, 'Tankanyika Giraffe', 'The photographer had to stand on a step ladder for this handsome portrait, but his efforts paid off with an angle we seldom see of this lofty creature. This beautiful retro T-shirt would make him proud!', 15.00, 12.99, 'tankanyika-giraffe.gif', 'tankanyika-giraffe-2.gif', 'tankanyika-giraffe-thumbnail.gif', 3),
       (52, 'Ifni Fish', 'This beautiful stamp was issued to commemorate National Colonial Stamp Day (you can do that when you have a colony). When you wear this fancy fish T-shirt, your friends will think it''s national T-shirt day!', 14.00, 0.00, 'ifni-fish.gif', 'ifni-fish-2.gif', 'ifni-fish-thumbnail.gif', 0),
       (53, 'Sea Gull', 'A beautiful stamp from a small enclave in southern Morocco that belonged to Spain until 1969 makes a beautiful bird T-shirt.', 19.00, 16.95, 'sea-gull.gif', 'sea-gull-2.gif', 'sea-gull-thumbnail.gif', 2),
       (54, 'King Salmon', 'You can fish them and eat them and now you can wear them with this classic animal T-shirt.', 17.95, 15.99, 'king-salmon.gif', 'king-salmon-2.gif', 'king-salmon-thumbnail.gif', 2),
       (55, 'Laos Bird', 'This fellow is also known as the "White Crested Laughing Thrush." What''s he laughing at? Why, at the joy of being on your T-shirt!', 12.00, 0.00, 'laos-bird.gif', 'laos-bird-2.gif', 'laos-bird-thumbnail.gif', 0),
       (56, 'Mozambique Lion', 'The Portuguese were too busy to run this colony themselves so they gave the Mozambique Company a charter to do it. I think there must be some pretty curious history related to that (the charter only lasted for 50 years)! If you''re a Leo, or know a Leo, you should seriously consider this T-shirt!', 15.99, 14.95, 'mozambique-lion.gif', 'mozambique-lion-2.gif', 'mozambique-lion-thumbnail.gif', 2),
       (57, 'Peru Llama', 'This image is nearly 100 years old! Little did this little llama realize that he was going to be made immortal on the Web and on this very unique animal T-shirt (actually, little did he know at all)!', 21.50, 17.99, 'peru-llama.gif', 'peru-llama-2.gif', 'peru-llama-thumbnail.gif', 2),
       (58, 'Romania Alsatian', 'If you know and love this breed, there''s no reason in the world that you shouldn''t buy this T-shirt right now!', 15.95, 0.00, 'romania-alsatian.gif', 'romania-alsatian-2.gif', 'romania-alsatian-thumbnail.gif', 0),
       (59, 'Somali Fish', 'This is our most popular fish T-shirt, hands down. It''s a beauty, and if you wear this T-shirt, you''ll be letting the world know you''re a fine catch!', 19.95, 16.95, 'somali-fish.gif', 'somali-fish-2.gif', 'somali-fish-thumbnail.gif', 2),
       (60, 'Trout', 'This beautiful image will warm the heart of any fisherman! You must know one if you''re not one yourself, so you must buy this T-shirt!', 14.00, 0.00, 'trout.gif', 'trout-2.gif', 'trout-thumbnail.gif', 0),
       (61, 'Baby Seal', 'Ahhhhhh! This little harp seal would really prefer not to be your coat! But he would like to be your T-shirt!', 21.00, 18.99, 'baby-seal.gif', 'baby-seal-2.gif', 'baby-seal-thumbnail.gif', 2),
       (62, 'Musk Ox', 'Some critters you just don''t want to fool with, and if I were facing this fellow I''d politely give him the trail! That is, of course, unless I were wearing this T-shirt.', 15.50, 0.00, 'musk-ox.gif', 'musk-ox-2.gif', 'musk-ox-thumbnail.gif', 0),
       (63, 'Suvla Bay', ' In 1915, Newfoundland sent its Newfoundland Regiment to Suvla Bay in Gallipoli to fight the Turks. This classic image does them honor. Have you ever heard of them? Share the news with this great T-shirt!', 12.99, 0.00, 'suvla-bay.gif', 'suvla-bay-2.gif', 'suvla-bay-thumbnail.gif', 0),
       (64, 'Caribou', 'There was a time when Newfoundland was a self-governing dominion of the British Empire, so it printed its own postage. The themes are as typically Canadian as can be, however, as shown by this "King of the Wilde" T-shirt!', 21.00, 19.95, 'caribou.gif', 'caribou-2.gif', 'caribou-thumbnail.gif', 2),
       (65, 'Afghan Flower', 'This beautiful image was issued to celebrate National Teachers Day. Perhaps you know a teacher who would love this T-shirt?', 18.50, 16.99, 'afghan-flower.gif', 'afghan-flower-2.gif', 'afghan-flower-thumbnail.gif', 2),
       (66, 'Albania Flower', 'Well, these crab apples started out as flowers, so that''s close enough for us! They still make for a uniquely beautiful T-shirt.', 16.00, 14.95, 'albania-flower.gif', 'albania-flower-2.gif', 'albania-flower-thumbnail.gif', 2),
       (67, 'Austria Flower', 'Have you ever had nasturtiums on your salad? Try it--they''re almost as good as having them on your T-shirt!', 12.99, 0.00, 'austria-flower.gif', 'austria-flower-2.gif', 'austria-flower-thumbnail.gif', 0),
       (68, 'Bulgarian Flower', 'For your interest (and to impress your friends), this beautiful stamp was issued to honor the George Dimitrov state printing works. You''ll need to know this when you wear the T-shirt.', 16.00, 14.99, 'bulgarian-flower.gif', 'bulgarian-flower-2.gif', 'bulgarian-flower-thumbnail.gif', 2),
       (69, 'Colombia Flower', 'Celebrating the 75th anniversary of the Universal Postal Union, a date to mark on your calendar and on which to wear this T-shirt!', 14.50, 12.95, 'colombia-flower.gif', 'colombia-flower-2.gif', 'colombia-flower-thumbnail.gif', 1),
       (70, 'Congo Flower', 'The Congo is not at a loss for beautiful flowers, and we''ve picked a few of them for your T-shirts.', 21.00, 17.99, 'congo-flower.gif', 'congo-flower-2.gif', 'congo-flower-thumbnail.gif', 2),
       (71, 'Costa Rica Flower', 'This national flower of Costa Rica is one of our most beloved flower T-shirts (you can see one on Jill, above). You will surely stand out in this T-shirt!', 12.99, 0.00, 'costa-rica-flower.gif', 'costa-rica-flower.gif', 'costa-rica-flower-thumbnail.gif', 0),
       (72, 'Gabon Flower', 'The combretum, also known as "jungle weed," is used in China as a cure for opium addiction. Unfortunately, when you wear this T-shirt, others may become hopelessly addicted to you!', 19.00, 16.95, 'gabon-flower.gif', 'gabon-flower-2.gif', 'gabon-flower-thumbnail.gif', 2),
       (73, 'Ghana Flower', 'This is one of the first gingers to bloom in the spring--just like you when you wear this T-shirt!', 21.00, 18.99, 'ghana-flower.gif', 'ghana-flower-2.gif', 'ghana-flower-thumbnail.gif', 2),
       (74, 'Israel Flower', 'This plant is native to the rocky and sandy regions of the western United States, so when you come across one, it really stands out. And so will you when you put on this beautiful T-shirt!', 19.50, 17.50, 'israel-flower.gif', 'israel-flower-2.gif', 'israel-flower-thumbnail.gif', 2),
       (75, 'Poland Flower', 'A beautiful and sunny T-shirt for both spring and summer!', 16.95, 15.99, 'poland-flower.gif', 'poland-flower-2.gif', 'poland-flower-thumbnail.gif', 2),
       (76, 'Romania Flower', 'Also known as the spring pheasant''s eye, this flower belongs on your T-shirt this summer to help you catch a few eyes.', 12.95, 0.00, 'romania-flower.gif', 'romania-flower-2.gif', 'romania-flower-thumbnail.gif', 0),
       (77, 'Russia Flower', 'Someone out there who can speak Russian needs to tell me what this plant is. I''ll sell you the T-shirt for $10 if you can!', 21.00, 18.95, 'russia-flower.gif', 'russia-flower-2.gif', 'russia-flower-thumbnail.gif', 0),
       (78, 'San Marino Flower', '"A white sport coat and a pink carnation, I''m all dressed up for the dance!" Well, how about a white T-shirt and a pink carnation?!', 19.95, 17.99, 'san-marino-flower.gif', 'san-marino-flower-2.gif', 'san-marino-flower-thumbnail.gif', 2),
       (79, 'Uruguay Flower', 'The Indian Queen Anahi was the ugliest woman ever seen. But instead of living a slave when captured by the Conquistadores, she immolated herself in a fire and was reborn the most beautiful of flowers: the ceibo, national flower of Uruguay. Of course, you won''t need to burn to wear this T-shirt, but you may cause some pretty hot glances to be thrown your way!', 17.99, 16.99, 'uruguay-flower.gif', 'uruguay-flower-2.gif', 'uruguay-flower-thumbnail.gif', 2),
       (80, 'Snow Deer', 'Tarmo has produced some wonderful Christmas T-shirts for us, and we hope to have many more soon.', 21.00, 18.95, 'snow-deer.gif', 'snow-deer-2.gif', 'snow-deer-thumbnail.gif', 2),
       (81, 'Holly Cat', 'Few things make a cat happier at Christmas than a tree suddenly appearing in the house!', 15.99, 0.00, 'holly-cat.gif', 'holly-cat-2.gif', 'holly-cat-thumbnail.gif', 0),
       (82, 'Christmas Seal', 'Is this your grandmother? It could be, you know, and I''d bet she''d recognize the Christmas seal on this cool Christmas T-shirt.', 19.99, 17.99, 'christmas-seal.gif', 'christmas-seal-2.gif', 'christmas-seal-thumbnail.gif', 2),
       (83, 'Weather Vane', 'This weather vane dates from the 1830''s and is still showing which way the wind blows! Trumpet your arrival with this unique Christmas T-shirt.', 15.95, 14.99, 'weather-vane.gif', 'weather-vane-2.gif', 'weather-vane-thumbnail.gif', 2),
       (84, 'Mistletoe', 'This well-known parasite and killer of trees was revered by the Druids, who would go out and gather it with great ceremony. Youths would go about with it to announce the new year. Eventually more engaging customs were attached to the strange plant, and we''re here to see that they continue with these cool Christmas T-shirts.', 19.00, 17.99, 'mistletoe.gif', 'mistletoe-2.gif', 'mistletoe-thumbnail.gif', 3),
       (85, 'Altar Piece', 'This beautiful angel Christmas T-shirt is awaiting the opportunity to adorn your chest!', 20.50, 18.50, 'altar-piece.gif', 'altar-piece-2.gif', 'altar-piece-thumbnail.gif', 2),
       (86, 'The Three Wise Men', 'This is a classic rendition of one of the season''s most beloved stories, and now showing on a Christmas T-shirt for you!', 12.99, 0.00, 'the-three-wise-men.gif', 'the-three-wise-men-2.gif', 'the-three-wise-men-thumbnail.gif', 0),
       (87, 'Christmas Tree', 'Can you get more warm and folksy than this classic Christmas T-shirt?', 20.00, 17.95, 'christmas-tree.gif', 'christmas-tree-2.gif', 'christmas-tree-thumbnail.gif', 2),
       (88, 'Madonna & Child', 'This exquisite image was painted by Filipino Lippi, a 15th century Italian artist. I think he would approve of it on a Going Postal Christmas T-shirt!', 21.95, 18.50, 'madonna-child.gif', 'madonna-child-2.gif', 'madonna-child-thumbnail.gif', 0),
       (89, 'The Virgin Mary', 'This stained glass window is found in Glasgow Cathedral, Scotland, and was created by Gabriel Loire of France, one of the most prolific of artists in this medium--and now you can have it on this wonderful Christmas T-shirt.', 16.95, 15.95, 'the-virgin-mary.gif', 'the-virgin-mary-2.gif', 'the-virgin-mary-thumbnail.gif', 2),
       (90, 'Adoration of the Kings', 'This design is from a miniature in the Evangelistary of Matilda in Nonantola Abbey, from the 12th century. As a Christmas T-shirt, it will cause you to be adored!', 17.50, 16.50, 'adoration-of-the-kings.gif', 'adoration-of-the-kings-2.gif', 'adoration-of-the-kings-thumbnail.gif', 2),
       (91, 'A Partridge in a Pear Tree', 'The original of this beautiful stamp is by Jamie Wyeth and is in the National Gallery of Art. The next best is on our beautiful Christmas T-shirt!', 14.99, 0.00, 'a-partridge-in-a-pear-tree.gif', 'a-partridge-in-a-pear-tree-2.gif', 'a-partridge-in-a-pear-tree-thumbnail.gif', 0),
       (92, 'St. Lucy', 'This is a tiny detail of a large work called "Mary, Queen of Heaven," done in 1480 by a Flemish master known only as "The Master of St. Lucy Legend." The original is in a Bruges church. The not-quite-original is on this cool Christmas T-shirt.', 18.95, 0.00, 'st-lucy.gif', 'st-lucy-2.gif', 'st-lucy-thumbnail.gif', 0),
       (93, 'St. Lucia', 'Saint Lucia''s tradition is an important part of Swedish Christmas, and an important part of that are the candles. Next to the candles in importance is this popular Christmas T-shirt!', 19.00, 17.95, 'st-lucia.gif', 'st-lucia-2.gif', 'st-lucia-thumbnail.gif', 2),
       (94, 'Swede Santa', 'Santa as a child. You must know a child who would love this cool Christmas T-shirt!?', 21.00, 18.50, 'swede-santa.gif', 'swede-santa-2.gif', 'swede-santa-thumbnail.gif', 2),
       (95, 'Wreath', 'Hey! I''ve got an idea! Why not buy two of these cool Christmas T-shirts so you can wear one and tack the other one to your door?!', 18.99, 16.99, 'wreath.gif', 'wreath-2.gif', 'wreath-thumbnail.gif', 2),
       (96, 'Love', 'Here''s a Valentine''s day T-shirt that will let you say it all in just one easy glance--there''s no mistake about it!', 19.00, 17.50, 'love.gif', 'love-2.gif', 'love-thumbnail.gif', 2),
       (97, 'Birds', 'Is your heart all aflutter? Show it with this T-shirt!', 21.00, 18.95, 'birds.gif', 'birds-2.gif', 'birds-thumbnail.gif', 2),
       (98, 'Kat Over New Moon', 'Love making you feel lighthearted?', 14.99, 0.00, 'kat-over-new-moon.gif', 'kat-over-new-moon-2.gif', 'kat-over-new-moon-thumbnail.gif', 0),
       (99, 'Thrilling Love', 'This girl''s got her hockey hunk right where she wants him!', 21.00, 18.50, 'thrilling-love.gif', 'thrilling-love-2.gif', 'thrilling-love-thumbnail.gif', 2),
       (100, 'The Rapture of Psyche', 'Now we''re getting a bit more serious!', 18.95, 16.99, 'the-rapture-of-psyche.gif', 'the-rapture-of-psyche-2.gif', 'the-rapture-of-psyche-thumbnail.gif', 2),
       (101, 'The Promise of Spring', 'With Valentine''s Day come, can Spring be far behind?', 21.00, 19.50, 'the-promise-of-spring.gif', 'the-promise-of-spring-2.gif', 'the-promise-of-spring-thumbnail.gif', 0);

-- --
INSERT INTO product_category (product_id, category_id) VALUES
       (1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1), (7, 1), (8, 1), (9, 1),
       (10, 1), (11, 1), (12, 1), (13, 1), (14, 1), (15, 1), (16, 1), (17, 1),
       (18, 1), (19, 2), (20, 2), (21, 2), (22, 2), (23, 2), (24, 2), (25, 2),
       (26, 2), (27, 2), (28, 2), (29, 3), (30, 3), (31, 3), (32, 3), (33, 3),
       (34, 3), (35, 3), (36, 4), (37, 4), (38, 4), (39, 4), (40, 4), (41, 4),
       (42, 4), (43, 4), (44, 4), (45, 4), (46, 4), (47, 4), (48, 4), (49, 4),
       (50, 4), (51, 4), (52, 4), (53, 4), (54, 4), (55, 4), (56, 4), (57, 4),
       (58, 4), (59, 4), (60, 4), (61, 4), (62, 4), (63, 4), (64, 4), (81, 4),
       (97, 4), (98, 4), (65, 5), (66, 5), (67, 5), (68, 5), (69, 5), (70, 5),
       (71, 5), (72, 5), (73, 5), (74, 5), (75, 5), (76, 5), (77, 5), (78, 5),
       (79, 5), (80, 6), (81, 6), (82, 6), (83, 6), (84, 6), (85, 6), (86, 6),
       (87, 6), (88, 6), (89, 6), (90, 6), (91, 6), (92, 6), (93, 6), (94, 6),
       (95, 6), (96, 7), (97, 7), (98, 7), (99, 7), (100, 7), (101, 7);


-- --
INSERT INTO attribute (attribute_id, name) VALUES (1, 'Size'), (2, 'Color');


-- --
INSERT INTO attribute_value (attribute_value_id, attribute_id, value) VALUES
       (1, 1, 'S'), (2, 1, 'M'), (3, 1, 'L'), (4, 1, 'XL'), (5, 1, 'XXL'),
       (6, 2, 'White'),  (7, 2, 'Black'), (8, 2, 'Red'), (9, 2, 'Orange'),
       (10, 2, 'Yellow'), (11, 2, 'Green'), (12, 2, 'Blue'),
       (13, 2, 'Indigo'), (14, 2, 'Purple');


-- --
INSERT INTO product_attribute (product_id, attribute_value_id) SELECT p.product_id, av.attribute_value_id FROM   product p, attribute_value av;


-- --
INSERT INTO shipping_region (shipping_region_id, shipping_region) VALUES
       (1, 'Please Select') , (2, 'US / Canada'),
       (3, 'Europe'),         (4, 'Rest of World');


-- --
INSERT INTO shipping (shipping_id,   shipping_type, shipping_cost, shipping_region_id) VALUES
       (1, 'Next Day Delivery ($20)', 20.00, 2),
       (2, '3-4 Days ($10)',          10.00, 2),
       (3, '7 Days ($5)',              5.00, 2),
       (4, 'By air (7 days, $25)',    25.00, 3),
       (5, 'By sea (28 days, $10)',   10.00, 3),
       (6, 'By air (10 days, $35)',   35.00, 4),
       (7, 'By sea (28 days, $30)',   30.00, 4);


-- --
INSERT INTO tax (tax_id, tax_type, tax_percentage) VALUES
       (1, 'Sales Tax at 8.5%', 8.50),
       (2, 'No Tax',            0.00);
`

  const formatBlocks = (content) => {
    //return new Promise((resolve, reject) => {
      const blocks = content.split("-- --").filter(b => b.trim().length > 0)
      console.log('blocks length ', blocks.length)
      return blocks.map(b => b.trim())
      //resolve(blocks)
    //})
  }

  const formatSQL = (sql) => {
      const lines = sql.split("\n").filter(line => line.trim().length > 0)
      //console.log("lines count ", lines.length)
    
      if (lines.length > 1) {
        const prefix = lines.shift()

        return lines.map(line => {
          let newLine = prefix.concat(' ').concat(line)
          if (newLine.endsWith(',')) {
            newLine = newLine.substring(0, newLine.length - 1) + ";";
          }
          return newLine
        })
      }

      return lines
  }

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*const blocks = formatBlocks(SQL)
    const string = blocks.join("")
    console.log('-------------------------------SQL BEBINS -------------------------')
    //console.log(string)
    console.log('-------------------------------SQL ENDS -------------------------')
    const filePath = path.join(__dirname, 'sql/insertion.sql')
    const sql = fs.readFileSync(filePath, { encoding: 'utf-8' } )
    return queryInterface.sequelize.query(sql).then(([result, metadata]) => {
      console.log('results  ', result)
      console.log('metadata  ', metadata)
    }).catch(err => {
      //console.log(line)
      console.log('error   ', err)
    })*/

    return new Promise((resolve, reject) => {
      const blocks = formatBlocks(SQL)
      blocks.forEach(block => {
        /*queryInterface.sequelize.query(block).then(([result, metadata]) => {
          console.log('results  ', result)
          console.log('metadata  ', metadata)
        }).catch(err => {
          console.log(block)
          console.log('error   ', err)
          reject(err)
        })*/
      })
      resolve()
    })

    /*return new Promise((resolve, reject) => {
      const blocks = formatBlocks(SQL)
      blocks.forEach(block => {
        const lines = formatSQL(block)
        lines.forEach(line => {
          try {
            //console.log(line)
            queryInterface.sequelize.query(line).then(([result, metadata]) => {
              console.log('results  ', result)
              console.log('metadata  ', metadata)
            }).catch(err => {
              console.log(line)
              console.log('error   ', err)
            })
              //console.log(i === lines.length - 1)
              //if (i === lines.length - 1) {
               // resolve()
              //}
            } catch(e) {
            console.log(line)
            reject(e)
            }
        })
      })*
        /*const lines = formatSQL(sql)
        lines.forEach((line, i) => {
          try {
            queryInterface.sequelize.query(line)
            console.log(i === lines.length - 1)
            if (i === lines.length - 1) {
             // resolve()
            }
          } catch(e) {
            reject(e)
          }
        })
        
    })*/
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('department', null, {}),
      queryInterface.bulkDelete('category', null, {}),
      queryInterface.bulkDelete('product', null, {}),
      queryInterface.bulkDelete('product_category', null, {}),
      queryInterface.bulkDelete('attribute', null, {}),
      queryInterface.bulkDelete('attribute_value', null, {}),
      queryInterface.bulkDelete('product_attribute', null, {}),
      queryInterface.bulkDelete('shipping_region', null, {}),
      queryInterface.bulkDelete('shipping', null, {}),
      queryInterface.bulkDelete('tax', null, {})
    ])
    
  }
};
