const sampleListings = [
  {
    title: "Luxury Poolside Retreat",
    description:
      "Experience luxury living with an infinity pool overlooking breathtaking views. Designed for relaxation and elegance, this stay offers the perfect blend of comfort and style.\r\n",
    image: {
      url: "https://res.cloudinary.com/dypqxw7i6/image/upload/v1769327440/StaySphere/izr4hs7evo8iaygdoe2i.webp",
      filename: "StaySphere/izr4hs7evo8iaygdoe2i",
    },
    category: "Pools",
    price: 6999,
    location: "new delhi",
    coordinates: [28.6138954, 77.2090057],
    country: "India",
    reviews: [],
    __v: 0,
  },
  {
    title: "Beachfront Bliss",
    description:
      "Wake up to ocean views and golden sands at this beautiful beachfront stay. Enjoy sea breezes, stunning sunsets, and a relaxing coastal vibe perfect for a peaceful getaway.\r\n",
    image: {
      url: "https://res.cloudinary.com/dypqxw7i6/image/upload/v1769327713/StaySphere/sbvnyhdb1axzqgxc6dcq.avif",
      filename: "StaySphere/sbvnyhdb1axzqgxc6dcq",
    },
    category: "Beaches",
    price: 5999,
    location: "goa",
    coordinates: [15.3004543, 74.0855134],
    country: "India",
    reviews: [],
    __v: 0,
  },
  {
    title: "Hotel Silver Crown",
    description:
      "A modern and comfortable hotel offering well-furnished rooms with essential amenities, ideal for business and leisure travelers.\r\n",
    image: {
      url: "https://res.cloudinary.com/dypqxw7i6/image/upload/v1769327843/StaySphere/ugakjj4vml5gzuqnfgfs.avif",
      filename: "StaySphere/ugakjj4vml5gzuqnfgfs",
    },
    category: "Rooms",
    price: 7999,
    location: "pune",
    coordinates: [18.5213738, 73.8545071],
    country: "India",
    reviews: [],
    __v: 0,
  },
  {
    title: "Hotel Sunrise Residency",
    description:
      "A budget-friendly hotel providing clean and cozy rooms with easy access to major city attractions and public transport.\r\n",
    image: {
      url: "https://res.cloudinary.com/dypqxw7i6/image/upload/v1769327919/StaySphere/bzwcfeyqtawrsetyw2od.avif",
      filename: "StaySphere/bzwcfeyqtawrsetyw2od",
    },
    category: "Rooms",
    price: 8000,
    location: "banglore",
    coordinates: [24.8704721, 67.0847214],
    country: "India",
    reviews: [],
    __v: 1,
  },
  {
    title: "Hotel Royal Heritage",
    description:
      "Experience traditional hospitality with modern comfort at this elegant hotel located near popular city landmarks.\r\n",
    image: {
      url: "https://res.cloudinary.com/dypqxw7i6/image/upload/v1769328007/StaySphere/ztqi0qjmyw3ob75patzn.webp",
      filename: "StaySphere/ztqi0qjmyw3ob75patzn",
    },
    category: "Rooms",
    price: 6500,
    location: "jaipur",
    coordinates: [26.9154576, 75.8189817],
    country: "India",
    reviews: [],
    __v: 0,
  },
  {
    title: "Mountain Escape",
    description:
      "Unwind in the heart of the mountains surrounded by fresh air, scenic views, and peaceful nature. Ideal for travelers seeking relaxation, adventure, and a break from city life.\r\n",
    image: {
      url: "https://res.cloudinary.com/dypqxw7i6/image/upload/v1769330212/StaySphere/xgko0260gxkge1prhujs.avif",
      filename: "StaySphere/xgko0260gxkge1prhujs",
    },
    category: "Mountains",
    price: 1999,
    location: "uttarakhand",
    coordinates: [30.0417376, 79.089691],
    country: "India",
    reviews: [],
    __v: 0,
  },
  {
    title: "Hotel Grand Horizon",
    description:
      "One of the most popular stays offering premium comfort, modern amenities, and an exceptional guest experience.\r\n",
    image: {
      url: "https://res.cloudinary.com/dypqxw7i6/image/upload/v1769330353/StaySphere/q5jhtpsfzm9td0w3qvg2.avif",
      filename: "StaySphere/q5jhtpsfzm9td0w3qvg2",
    },
    category: "Trending",
    price: 3999,
    location: "goa",
    coordinates: [15.3004543, 74.0855134],
    country: "India",
    reviews: [],
    __v: 0,
  },
  {
    title: "Camp Pine Valley",
    description:
      "An outdoor camping stay offering tents, bonfire nights, and a close connection with nature.\r\n",
    image: {
      url: "https://res.cloudinary.com/dypqxw7i6/image/upload/v1769330449/StaySphere/j5xplsksurc1ksfw7mxh.avif",
      filename: "StaySphere/j5xplsksurc1ksfw7mxh",
    },
    category: "Camping",
    price: 1500,
    location: "rishikesh",
    coordinates: [30.1086537, 78.2916193],
    country: "India",
    reviews: [],
    __v: 0,
  },
  {
    title: "Hotel Royal Fort Palace",
    description:
      "A heritage palace hotel offering royal architecture, luxurious rooms, and a regal experience.\r\n",
    image: {
      url: "https://res.cloudinary.com/dypqxw7i6/image/upload/v1769349914/StaySphere/mlqvbaapdrwvkjemb54s.avif",
      filename: "StaySphere/mlqvbaapdrwvkjemb54s",
    },
    category: "Castle",
    price: 6500,
    location: "jaisalmer",
    coordinates: [26.9116615, 70.9124888],
    country: "India",
    reviews: [],
    __v: 0,
  },
  {
    title: "Hotel Tranquil Stay",
    description:
      "A comfortable and peaceful stay suitable for all types of travelers with modern facilities.\r\n",
    image: {
      url: "https://res.cloudinary.com/dypqxw7i6/image/upload/v1769349978/StaySphere/aj9o6v1pz0su24hd5uqj.avif",
      filename: "StaySphere/aj9o6v1pz0su24hd5uqj",
    },
    category: "Others",
    price: 5999,
    location: "chandigarh",
    coordinates: [30.7334421, 76.7797143],
    country: "India",
    reviews: [],
    __v: 0,
  },
  {
    title: "Camp Riverside Escape",
    description:
      "A scenic riverside camping stay offering cozy tents, bonfire evenings, and a peaceful natural atmosphere. Perfect for adventure lovers and weekend getaways.\r\n",
    image: {
      url: "https://res.cloudinary.com/dypqxw7i6/image/upload/v1769350087/StaySphere/vnax1zqphgdu5lem2ybh.avif",
      filename: "StaySphere/vnax1zqphgdu5lem2ybh",
    },
    category: "Camping",
    price: 3999,
    location: "kasol",
    coordinates: [32.0104317, 77.3166036],
    country: "India",
    reviews: [],
    __v: 0,
  },
  {
    title: "Hotel City Lights",
    description:
      "A modern city hotel offering stylish rooms, excellent connectivity, and easy access to major attractions and business hubs.\r\n",
    image: {
      url: "https://res.cloudinary.com/dypqxw7i6/image/upload/v1769350184/StaySphere/psiurddb7vm4fzlnyicl.avif",
      filename: "StaySphere/psiurddb7vm4fzlnyicl",
    },
    category: "Cities",
    price: 7000,
    location: "mumbai",
    coordinates: [19.054999, 72.8692035],
    country: "India",
    reviews: [],
    __v: 0,
  },
];

module.exports = { data: sampleListings };
