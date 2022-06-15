export const loggedInUser = {
  id: 6,
  name: "Diana Garrett",
  username: "diana.garrett231",
  email: "Diana@yopmail.com",
  phone: "454 45632",
  dob: "04-06-1994",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRsbRYnwHo7eSy-5Uc29L1UgYk2kgVhH9qO1A&usqp=CAU",
};

export const users = [
  {
    id: 1,
    name: "Elberta Theurer",
    email: "etheurer@yopmail.com",
    username: "elberta",
    phone: "+1 454 456300",
    dob: "04-06-1994",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRsbRYnwHo7eSy-5Uc29L1UgYk2kgVhH9qO1A&usqp=CAU",
  },
  {
    id: 2,
    name: "Salome Hovee",
    email: "shovee@yopmail.com",
    username: "Salome",
    phone: "+1 454 49932",
    dob: "04-06-1994",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTmwNthcjpXHesWhhgiZgQhTTREec_7EP-dNw&usqp=CAU",
  },
  {
    id: 3,
    name: "Frederich Allderidge",
    email: "fallderidge@yopmail.com",
    username: "Frederich",
    phone: "+1 454 45632",
    dob: "04-06-1994",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS1HWDB6J1D4N-80QGiBJ8hgqVq3fFkSkcOTQ&usqp=CAU",
  },
  {
    id: 4,
    name: "Vernen Cottu",
    email: "vcottu@yopmail.com",
    username: "Vernen",
    phone: "+1 454 45632",
    dob: "04-06-1994",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRsbRYnwHo7eSy-5Uc29L1UgYk2kgVhH9qO1A&usqp=CAU",
  },
  {
    id: 5,
    name: "Edwina Linde",
    email: "elinde@yopmail.com",
    username: "Edwina",
    phone: "+1 454 45632",
    dob: "04-06-1994",
    image:
      "https://cdn.dribbble.com/users/2364329/screenshots/4812010/dribbble-23.jpg",
  },
  {
    id: 7,
    name: "John Moris",
    email: "john@yopmail.com",
    username: "John",
    phone: "+1 454 45635",
    dob: "04-06-1998",
    image:
      "https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png",
  },
  {
    id: 8,
    name: "Edward Linde",
    email: "edward@yopmail.com",
    username: "Edward",
    phone: "+1 454 45632",
    dob: "04-06-1994",
    image:
      "https://w7.pngwing.com/pngs/312/283/png-transparent-man-s-face-avatar-computer-icons-user-profile-business-user-avatar-blue-face-heroes.png",
  },
  {
    id: 9,
    name: "Jeff Martin",
    email: "jeff@yopmail.com",
    username: "Jeff",
    phone: "+1 454 45632",
    dob: "04-06-1994",
    noOfPosts: 21,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe1_6-PtcF48iM3PkReAZlBpbSaLDhKNyisg&usqp=CAU",
  },
];

export const posts = [
  {
    id: 1,
    description:
      "Samsung's new variant which goes beyond Galaxy to the Universe",
    images: ["https://dummyjson.com/image/i/products/3/1.jpg"],
    total_likes: 200,
    total_comments: 0,
    comments: [],
    user: loggedInUser,
    createdAt: "June 1, 2022",
  },
  {
    id: 2,
    description: null,
    images: [
      "https://dummyjson.com/image/i/products/4/1.jpg",
      "https://dummyjson.com/image/i/products/4/2.jpg",
      "https://dummyjson.com/image/i/products/4/3.jpg",
      "https://dummyjson.com/image/i/products/4/4.jpg",
    ],
    total_likes: 350,
    total_comments: 7,
    comments: [
      {
        postId: 1,
        id: 1,
        user: users[1],
        body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
      },
      {
        postId: 1,
        id: 2,
        user: users[2],
        body: "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et",
      },
      {
        postId: 1,
        id: 3,
        user: users[3],
        body: "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione",
      },
      {
        postId: 1,
        id: 4,
        user: users[5],
        body: "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati",
      },
      {
        postId: 1,
        id: 5,
        user: users[4],
        body: "harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et",
      },
      {
        postId: 2,
        id: 6,
        user: users[2],
        body: "doloribus at sed quis culpa deserunt consectetur qui praesentium\naccusamus fugiat dicta\nvoluptatem rerum ut voluptate autem\nvoluptatem repellendus aspernatur dolorem in",
      },
      {
        postId: 2,
        id: 7,
        user: users[4],
        body: "maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor",
      },
    ],
    user: loggedInUser,
    createdAt: "May 11, 2022",
  },
  {
    id: 3,
    description:
      "Huawei re- badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
    images: [],
    total_likes: 800,
    total_comments: 4,
    comments: [
      {
        postId: 1,
        id: 1,
        user: users[5],
        body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
      },
      {
        postId: 1,
        id: 2,
        user: users[3],
        body: "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et",
      },
      {
        postId: 1,
        id: 3,
        user: users[0],
        body: "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione",
      },
      {
        postId: 1,
        id: 4,
        user: users[3],
        body: "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati",
      },
    ],
    user: users[2],
    createdAt: "April 30, 2022",
  },
  {
    id: 4,
    description:
      "MacBook Pro 2021 with mini-LED display may launch between September, November",
    images: [
      "https://dummyjson.com/image/i/products/6/1.png",
      "https://dummyjson.com/image/i/products/6/2.jpg",
      "https://dummyjson.com/image/i/products/6/3.png",
      "https://dummyjson.com/image/i/products/6/4.jpg",
    ],
    total_likes: 200,
    total_comments: 1,
    comments: [
      {
        postId: 1,
        id: 1,
        user: users[4],
        body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
      },
    ],
    user: users[3],
    createdAt: "April 28, 2022",
  },
];
