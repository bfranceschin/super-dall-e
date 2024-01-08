import { ClientOptions, OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

const subjects = [
  {title: "Dragon", description: "A mythical creature often depicted as a large and powerful serpent or other reptile with magical or spiritual qualities."},
  {title: "Forest", description: "A dense collection of trees covering a large area, filled with various types of flora and fauna."},
  {title: "Robot", description: "A machine capable of carrying out complex actions automatically, often humanoid in appearance."},
  {title: "Ancient Temple", description: "A structure devoted to worship or spiritual rituals, often associated with historical or archaeological significance."},
  {title: "Alien Planet", description: "A world outside our solar system, featuring unique landscapes, creatures, and ecosystems."},
  {title: "Castle", description: "A large building typically of the medieval period, fortified against attack with thick walls, battlements, towers, and often a moat."},
  {title: "Underwater City", description: "A futuristic or fantasy city located beneath the ocean's surface."},
  {title: "Space Station", description: "A large artificial structure in space, serving as a habitation and research facility for astronauts."},
  {title: "Dinosaur", description: "Prehistoric creatures that roamed the Earth millions of years ago, ranging from small bird-like creatures to massive behemoths."},
  {title: "Haunted House", description: "A building believed to be a center for supernatural occurrences or habitation by spirits."},
  {title: "Cyberpunk Cityscape", description: "A futuristic city characterized by a high-tech, low-life philosophy, often under corporate dominance and urban decay."},
  {title: "Garden of Eden", description: "The biblical 'paradise' said to be the perfect and pure garden of the world's first humans."},
  {title: "Surreal Landscape", description: "A dream-like or fantastical arrangement of elements, defying conventional physical laws or logic."},
  {title: "Renaissance Fair", description: "A historical setting, featuring elements from the 14th to the 17th century, focusing on arts, culture, and philosophical advancements."},
  {title: "Pirate Ship", description: "A vessel used by pirates during the Golden Age of Piracy, often characterized by its sails, cannons, and crew of outlaws."},
  {title: "Wild West Town", description: "A frontier town from the American Old West era, often associated with cowboys, saloons, and duels."},
  {title: "Japanese Garden", description: "A meticulously designed garden that emphasizes harmony, balance, and simplicity, often found in traditional Japanese aesthetics."},
  {title: "Viking Village", description: "A historical or mythical representation of a Norse village, complete with longhouses, weaponry, and Viking warriors."},
  {title: "Futuristic Metropolis", description: "A highly advanced city, featuring cutting-edge technology, towering skyscrapers, and a diverse population."},
  {title: "Magical Forest", description: "An enchanted woodland area, filled with mythical creatures, ancient trees, and magical phenomena."}
];

const styles = [
  {title: "Realistic", description: "Art that attempts to represent subject matter truthfully, without artificiality and avoiding speculative fiction and supernatural elements."},
  {title: "Impressionistic", description: "Characterized by relatively small, thin, yet visible brush strokes, open composition, emphasis on accurate depiction of light in its changing qualities."},
  {title: "Surreal", description: "A 20th-century avant-garde movement in art and literature which sought to release the creative potential of the unconscious mind."},
  {title: "Futuristic", description: "An artistic style that incorporates elements of science fiction and technology, envisioning potential futures and advanced technologies."},
  {title: "Cartoonish", description: "An art style that is non-realistic or semi-realistic, often used in animation for humor and caricature."},
  {title: "Abstract", description: "Art that does not attempt to represent an accurate depiction of a visual reality but instead uses shapes, colours, forms and gestural marks to achieve its effect."},
  {title: "Minimalist", description: "An art style that is stripped down to its essential elements, using limited color palettes, simple shapes, and minimal detailing."},
  {title: "Gothic", description: "Characterized by dark, mysterious, antiquated and homogenous features, it represents a dark and sometimes morbid aesthetic inclined towards the medieval."},
  {title: "Baroque", description: "An artistic style that used exaggerated motion and clear, easily interpreted detail to produce drama, tension, exuberance, and grandeur."},
  {title: "Renaissance", description: "A revival or renewed interest in something, representing the arts of the period characterized by an emphasis on classical learning and values."},
  {title: "Cubism", description: "An early-20th-century avant-garde art movement that revolutionized European painting and sculpture, characterized by an emphasis on the flat, two-dimensional surface of the picture plane."},
  {title: "Expressionism", description: "A modernist movement, originating in Germany at the beginning of the 20th century, which seeks to express the meaning of emotional experience rather than physical reality."},
  {title: "Art Deco", description: "A style of visual arts, architecture and design that first appeared in France just before World War I, characterized by bold geometric forms and vibrant colors."},
  {title: "Art Nouveau", description: "An international style of art, architecture and applied art, especially the decorative arts, known for its intricate linear designs and flowing curves based on natural forms."},
  {title: "Neo-Classical", description: "An 18th-century revival of classical style that emphasizes the qualities of simplicity and grandeur, inspired by the classical art and culture of Ancient Greece and Rome."},
  {title: "Pop Art", description: "An art movement that emerged in the United Kingdom and the United States during the mid- to late-1950s, characterized by themes and techniques drawn from popular mass culture."},
  {title: "Victorian", description: "Reflecting the tastes and values of the period in the United Kingdom during Queen Victoria's reign, characterized by ornate detailing and elaborate ornamentation."},
  {title: "Steampunk", description: "A retrofuturistic subgenre of science fiction or science fantasy that incorporates technology and aesthetic designs inspired by 19th-century industrial steam-powered machinery."}
];

const colorSchemes = [
  {title: "Vibrant", description: "Bright, lively colors that pop and stand out for an energetic feel."},
  {title: "Pastel", description: "Soft, light shades that create a soothing and delicate aesthetic."},
  {title: "Monochrome", description: "Various shades and tints of a single color, creating a cohesive and harmonious look."},
  {title: "Warm", description: "Colors that are typically associated with warmth, such as reds, oranges, and yellows."},
  {title: "Cool", description: "Colors that are often associated with a cool feeling, such as blues, greens, and purples."},
  {title: "Earth Tones", description: "Colors that mimic those found in nature, like browns, tans, greens, and beiges, often evoking a grounded, calm feel."},
  {title: "Neon", description: "Bright, fluorescent colors that are particularly luminous and striking."},
  {title: "Muted", description: "Colors that have been dulled or grayed, creating a subdued and understated look."},
  {title: "Jewel Tones", description: "Deep, saturated colors that resemble precious gemstones like sapphire, ruby, emerald, and amethyst."},
  {title: "Black and White", description: "A classic combination that uses only shades of black and white for a stark, timeless effect."},
  {title: "Sepia", description: "A reddish-brown color associated with monochrome photographs of the late 19th and early 20th centuries, giving an old-fashioned, vintage look."},
  {title: "Primary Colors", description: "The basic set of colors from which all other colors are derived: red, blue, and yellow."},
  {title: "Complementary", description: "Colors opposite each other on the color wheel, providing a high contrast and high impact color combination."},
  {title: "Analogous", description: "Colors that are next to each other on the color wheel, creating a serene and comfortable design."},
  {title: "Triadic", description: "A color scheme using three colors that are evenly spaced around the color wheel, offering vibrant yet balanced color palette."},
  {title: "Tetradic", description: "A color scheme involving four colors, composed of two complementary color pairs, offering plenty of variety."},
  {title: "Accented", description: "A color scheme that is mostly neutral with a pop of one accent color for interest and energy."}
];

const timePeriods = [
  {title: "Prehistoric", description: "Referring to the time before written records, often associated with the Stone Age, dinosaurs, and early human civilizations."},
  {title: "Ancient", description: "Related to the distant past, from the earliest human civilizations through the fall of the Western Roman Empire."},
  {title: "Medieval", description: "Pertaining to the Middle Ages, a period in European history from the 5th to the late 15th century."},
  {title: "Renaissance", description: "Associated with the period of European history marking the transition from the Middle Ages to modernity, from the 14th to the 17th century."},
  {title: "Baroque", description: "Relating to the period of artistic style that used exaggerated motion and clear detail to produce drama, tension, and grandeur, from the late 16th century to the early 18th century."},
  {title: "Victorian", description: "Pertaining to the period of Queen Victoria's reign, from 1837 to 1901, often noted for its strict social, cultural, and artistic norms."},
  {title: "Industrial Revolution", description: "Associated with the period of major industrialization that took place during the late 1700s and early 1800s."},
  {title: "Modern", description: "Referring to the period from the late 19th century to the present, characterized by rapid technological progress and cultural change."},
  {title: "Post-Modern", description: "Related to the late 20th century period in art, architecture, and criticism that represents a departure from modernism."},
  {title: "Contemporary", description: "Pertaining to the present and very recent times, characterized by the latest trends and modern technologies."},
  {title: "Futuristic", description: "Associated with the future, often featuring advanced technology, space travel, and other imagined developments."},
  {title: "Cyberpunk", description: "Related to a genre of science fiction set in a lawless subculture of an oppressive society dominated by computer technology."},
  {title: "Steampunk", description: "A genre of science fiction that has a historical setting and typically features steam-powered machinery rather than advanced technology."},
  {title: "Post-Apocalyptic", description: "Related to a time after a catastrophic event has drastically altered the earth and its ecosystems, often featuring survival themes."}
];

const moods = [
  {title: "Serene", description: "Calm, peaceful, and untroubled; tranquil, giving a sense of relaxation and calmness."},
  {title: "Mysterious", description: "Characterized by an atmosphere of secrecy and intrigue, evoking curiosity and mystique."},
  {title: "Joyful", description: "Reflecting, expressing, or causing great pleasure and happiness, often vibrant and lively."},
  {title: "Eerie", description: "Strange and frightening; inspiring fear or unease, often associated with the supernatural."},
  {title: "Chaotic", description: "In a state of complete confusion and disorder, tumultuous, unpredictable, and often overwhelming."},
  {title: "Melancholic", description: "Characterized by or causing or expressing sadness, often in a thoughtful or gentle manner."},
  {title: "Romantic", description: "Conducive to or characterized by the expression of love or affection, often idealized or fantastical."},
  {title: "Gloomy", description: "Dark or poorly lit, especially so as to appear depressing or frightening."},
  {title: "Whimsical", description: "Playfully quaint or fanciful, especially in an appealing and amusing way."},
  {title: "Majestic", description: "Having or showing impressive beauty or dignity, often associated with grandeur and splendor."},
  {title: "Nostalgic", description: "A sentimental longing or wistful affection for a period in the past, often with happy personal associations."},
  {title: "Surreal", description: "Marked by the intense irrational reality of a dream; bizarre, dreamlike, and slightly unnerving."},
  {title: "Tense", description: "Producing a feeling of anxiety or unease; tight with suspense or nervousness."},
  {title: "Inspiring", description: "Having the effect of inspiring someone; motivational and uplifting."},
  {title: "Mystical", description: "Having a spiritual meaning or reality that is neither apparent to the senses nor obvious to the intellect, often associated with the divine or supernatural."},
  {title: "Apocalyptic", description: "Describing or prophesying the complete destruction of the world, often associated with dramatic and cataclysmic events."},
  {title: "Utopian", description: "Modeled on or aiming for a state in which everything is perfect; idealistic."}
];

const weatherSeasons = [
  {title: "Sunny", description: "Bright with sunlight, clear skies, typically representing cheerful and warm conditions."},
  {title: "Rainy", description: "Characterized by rainfall, often creating a wet, reflective, and sometimes melancholic atmosphere."},
  {title: "Snowy", description: "Covered with or characterized by snow, often creating a serene, quiet, and sometimes cold atmosphere."},
  {title: "Autumnal", description: "Representing the season of autumn with its characteristic foliage colors, cooler temperatures, and harvest themes."},
  {title: "Spring", description: "Representing the season of spring, characterized by blooming flowers, mild weather, and a sense of renewal and growth."},
  {title: "Summer", description: "Representing the season of summer, characterized by hot, sunny weather, long days, and often associated with vacations and leisure."},
  {title: "Winter", description: "Representing the season of winter, characterized by cold weather, shorter days, and often associated with snow and ice."},
  {title: "Foggy", description: "Characterized by a thick cloud of tiny water droplets suspended in the atmosphere, reducing visibility and giving a mysterious or eerie feel."},
  {title: "Stormy", description: "Characterized by violent weather, including strong winds, rain, thunder, and lightning."},
  {title: "Overcast", description: "Covered with clouds; dull and gloomy, but typically dry."},
  {title: "Windy", description: "Characterized by strong winds, often leading to a sense of movement and change."},
  {title: "Tropical", description: "Characterized by hot and humid conditions, often associated with lush vegetation and abundant rainfall."},
  {title: "Drought", description: "A prolonged period of abnormally low rainfall, leading to a shortage of water and a more arid landscape."},
  {title: "Misty", description: "Covered with a thin layer of mist, creating a soft, dreamy atmosphere, often associated with the morning or calmness."},
  {title: "Blizzard", description: "A severe snowstorm with strong winds and intense snowfall, leading to low visibility and harsh conditions."},
  {title: "Heatwave", description: "A prolonged period of excessively hot weather, which may be accompanied by high humidity."},
  {title: "Hail", description: "Characterized by pellets of frozen rain, typically small and hard, falling during storms."},
  {title: "Seasonal Transition", description: "Representing the transition between two seasons, capturing elements of both, often reflecting change and contrast."}
];

const locations = [
  {title: "Urban", description: "Characterized by the city and city life, often featuring buildings, streets, and a dense population."},
  {title: "Rural", description: "Representing the countryside, often with open landscapes, farms, and a quieter, more natural setting."},
  {title: "Fantasy World", description: "An imaginary and often fantastical realm, featuring unique creatures, landscapes, and magical elements."},
  {title: "Outer Space", description: "The vast expanse beyond Earth's atmosphere, featuring planets, stars, galaxies, and other celestial phenomena."},
  {title: "Underwater", description: "A location beneath the surface of the water, featuring aquatic creatures, plants, and the sea floor."},
  {title: "Mountainous", description: "Characterized by mountains and rugged terrain, often remote and associated with adventure and natural beauty."},
  {title: "Desert", description: "An arid landscape with little to no vegetation, often featuring sand dunes, rocks, and sparse life forms."},
  {title: "Forest", description: "A large area covered chiefly with trees and undergrowth, often associated with mystery and diverse wildlife."},
  {title: "Tropical Island", description: "A small landmass in the ocean, typically located in the tropics, featuring beaches, palm trees, and a warm climate."},
  {title: "Arctic", description: "The cold, polar region around the North Pole, characterized by ice, snow, and extreme temperatures."},
  {title: "Volcanic", description: "An area characterized by volcanic activity, featuring lava flows, volcanic rock, and potentially active volcanoes."},
  {title: "Historical Landmark", description: "A place with historical significance or a well-known historical structure, often visited for its cultural heritage."},
  {title: "Industrial", description: "A location characterized by industry, often featuring factories, warehouses, and machinery."},
  {title: "Suburban", description: "A residential area on the outskirts of a city, typically featuring houses, parks, and a close-knit community."},
  {title: "Meadow", description: "An open field of grass and wildflowers, often idyllic and peaceful."},
  {title: "Underground", description: "Beneath the surface of the Earth, featuring caves, tunnels, and potentially subterranean life forms."},
  {title: "Futuristic City", description: "A modern or advanced city, often characterized by innovative technology, high-rise buildings, and a forward-thinking culture."},
  {title: "Ancient Ruins", description: "The remains of an ancient civilization's structures, often mysterious and historically significant."},
  {title: "Magical Realm", description: "A place of enchantment and wonder, often inaccessible to ordinary humans and governed by different laws of nature."}
];

const perspectives = [
  {title: "Bird's-Eye View", description: "A high-angle view of an object or scene from above, as if the observer were a bird, often used to give an overall perspective."},
  {title: "Worm's-Eye View", description: "A low-angle view of an object or scene from below, as if the observer were a worm, often used to make subjects look larger and more imposing."},
  {title: "First-Person Perspective", description: "The scene is shown from the viewpoint of a character involved in the action, creating a sense of immersion for the viewer."},
  {title: "Third-Person Perspective", description: "The observer is outside of the action, viewing the scene from a distance, often allowing for a more comprehensive view of the surroundings."},
  {title: "Aerial Perspective", description: "A view from an elevated position, providing a broad overview of a large area, often showcasing landscapes and large scenes."},
  {title: "Close-Up", description: "Focusing closely on a subject or object, capturing details that are usually not visible from a distance."},
  {title: "Panoramic View", description: "A wide-angle view that covers an extensive area, often used to capture landscapes or large scenes."},
  {title: "Side View", description: "The scene or object is viewed from the side, providing a profile view and highlighting depth and lateral relationships."},
  {title: "Isometric View", description: "A method of visually representing three-dimensional objects in two dimensions, where the view is at a 30-degree angle from the plane of the object."},
  {title: "Fisheye View", description: "A wide-angle view that produces strong visual distortion intended to create a wide panoramic or hemispherical image."},
  {title: "Over-the-Shoulder View", description: "The observer views the scene from behind and over the shoulder of one of the characters, often used in storytelling to connect the viewer with the character."},
  {title: "Dutch Angle", description: "A type of camera shot where the camera is tilted to one side, creating a sense of unease or tension in the scene."},
  {title: "Ground Level", description: "The perspective is from ground level, often used to make the viewer feel as though they are part of the scene."},
  {title: "High Angle", description: "The camera looks down on the subject from a high angle, diminishing the subject and making it appear less powerful."},
  {title: "Low Angle", description: "The camera looks up at the subject from a low angle, giving the subject a sense of power and dominance."}
];

const textures = [
  {title: "Smooth", description: "A texture with a soft, even surface, without any roughness or bumps."},
  {title: "Rough", description: "A texture with an uneven, irregular surface, often associated with a tactile, gritty feel."},
  {title: "Glossy", description: "A shiny, reflective surface that often adds a sleek and modern look to the image."},
  {title: "Matte", description: "A flat, non-reflective surface that absorbs light, often providing a more subdued and classic appearance."},
  {title: "Textured", description: "A surface that has a tactile quality and is characterized by a distinct feel or appearance, such as wood grain or fabric weave."},
  {title: "Metallic", description: "A texture that resembles metal, often shiny and reflective, adding an industrial or sleek feel."},
  {title: "Furry", description: "A soft, hairy texture resembling the fur of an animal, providing a sense of warmth and softness."},
  {title: "Crystalline", description: "Resembling crystals in appearance or structure, often with sharp, geometric forms and a sense of transparency or shininess."},
  {title: "Liquid", description: "A fluid or flowing texture, often associated with water, oil, or other liquids, capturing the movement and fluidity."},
  {title: "Granular", description: "A texture composed of small grains or particles, often providing a rough and gritty feel."},
  {title: "Porous", description: "Characterized by tiny holes or spaces, often found in materials like sponge, wood, or certain types of rock."},
  {title: "Woven", description: "Resembling the interlaced structure of woven fabrics or materials, providing a sense of craftsmanship and detail."},
  {title: "Flaky", description: "Composed of layers or flakes, often creating a delicate and fragile appearance."},
  {title: "Mossy", description: "Having the appearance or texture of moss, often providing a sense of softness and natural growth."},
  {title: "Rustic", description: "A texture that gives a sense of age, wear, or naturalness, often found in untreated wood, stone, or other natural materials."},
  {title: "Ethereal", description: "A delicate, light, and airy texture, often associated with things that are intangible or otherworldly."},
  {title: "Slick", description: "Smooth and glossy, often giving a wet or slippery appearance."},
  {title: "Feathery", description: "Light and fluffy, resembling the texture of feathers."},
  {title: "Sandy", description: "Rough and gritty, similar to the texture of sand."},
  {title: "Bubbly", description: "Characterized by round, often transparent shapes like bubbles, providing a sense of lightness and effervescence."}
];

const scales = [
  {title: "Gigantic", description: "Extremely large or massive in size, often creating a sense of awe or overpowering presence."},
  {title: "Tiny", description: "Very small in size, creating a sense of delicacy or minuteness."},
  {title: "Life-Size", description: "The same size as in real life, providing a realistic and relatable perspective."},
  {title: "Out-of-Proportion", description: "Elements are of an unrealistic size relative to each other, creating a surreal or exaggerated effect."},
  {title: "Expansive", description: "Covering a large area or volume, often giving a sense of vastness or openness."},
  {title: "Compact", description: "Small in size or volume, efficiently arranged or condensed."},
  {title: "Overwhelming", description: "So large or massive as to seem uncontrollable or insurmountable."},
  {title: "Subtle", description: "Small or delicate in size, not immediately obvious or noticeable, but important in effect."},
  {title: "Monumental", description: "Massive or imposing in size or scale, often resembling or serving as a monument."},
  {title: "Intricate", description: "Having many small or complex parts, showing great attention to detail."},
  {title: "Dwarfed", description: "Made to look or feel small in comparison to something much larger."},
  {title: "Sky-High", description: "Extremely tall or high, reaching or seeming to reach the sky."},
  {title: "Microscopic", description: "So small as to be visible only with a microscope."},
  {title: "Colossal", description: "Extremely large or great in a way that inspires awe or wonder."},
  {title: "Diminutive", description: "Extremely or unusually small."},
  {title: "Boundless", description: "Unlimited or immense, without definite boundaries or edges."},
  {title: "Squeezed", description: "Compressed into a smaller size or space, often creating a sense of pressure or tightness."},
  {title: "Stretched", description: "Extended or elongated, often beyond the usual or expected size."},
  {title: "Layered", description: "Consisting of several layers or levels, each varying in size and dimension."}
];

// Define your parameters and their options here
const parameters = {
  subjects: subjects,
  styles: styles,
  colorSchemes: colorSchemes,
  timePeriods: timePeriods,
  moods: moods,
  weatherSeasons: weatherSeasons,
  locations: locations,
  perspectives: perspectives,
  textures: textures,
  scales: scales
};
// If you add more parameters in the future, just add them to the 'parameters' object above.


// Function to pick a random item from an array
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Function to pick a random option for each parameter
export function getRandomParameters() {
  const selectedParameters = {};
  for (const [key, value] of Object.entries(parameters)) {
    selectedParameters[key] = getRandomItem(value);
  }
  return selectedParameters;
}

export async function generateDallEPrompt(selectedParameters) {
  // Constructing the prompt for GPT-3.5
  let content = "Create a detailed DALL-E 2 prompt based on the following parameters:\n";
  for (const [key, value] of Object.entries(selectedParameters)) {
    content += `${key}: ${value.title} - ${value.description}\n`;
  }

  // Instruction to ensure only the DALL-E 2 prompt is returned
  content += "\nRespond with only the DALL-E 2 prompt and nothing else.";

  try {
    // Making the API request to OpenAI's GPT-3.5
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: content }
      ],
      model: "gpt-3.5-turbo",
    });

    // Extracting the DALL-E 2 prompt from the response
    const dallEPrompt = completion.choices[0].message.content.trim();

    return dallEPrompt;
  } catch (error) {
    console.error('Error generating DALL-E prompt:', error);
    throw error;
  }
}
