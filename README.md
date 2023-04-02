A vegan search engine API for finding fully vegan recipes made using Node.js.

Documentation in process...

# DOCUMENTATION

Please note: Any route with (PROTECTED), denotes that a user must send a valid bearer token authorisation header in their request to access this route.

---

### `GET` all recipes:

| **GET** `https://vesearch-api.onrender.com/api/v1/recipes` |
| ---------------------------------------------------------- |

Responds with a list of all the recipes in the database.

### Example response:

```JSON
{
    "status": "success",
    "requestedAt": "31/03/2023 12:24:07AM GMT+01:00",
    "numOfResults": 1,
    "data": {
        "recipes": [
            {
                "_id": "6344080be0b152c1c9ec7f09",
                "name": "Bean burger",
                "author": {
                    "username": "eli"
                },
                "prepTime": 30,
                "cookTime": 40,
                "difficulty": "competent",
                "servings": 4,
                "ratingsAverage": 0,
                "description": "A juicy, tasty, ultra-healthy bean burger that will rival any other.",
                "dietTags": [
                    "oil-free"
                ],
                "nutritionProvided": false,
                "ingredients": [
                    {
                        "amount": 240,
                        "measurement": "g",
                        "name": "Black beans",
                        "_id": "6344080be0b152c1c9ec7f0a"
                    },
                    {
                        "amount": 240,
                        "measurement": "g",
                        "name": "Chickpeas",
                        "_id": "6344080be0b152c1c9ec7f0b"
                    },
                    {
                        "amount": 1,
                        "measurement": "handful",
                        "name": "Lettuce",
                        "_id": "6344080be0b152c1c9ec7f0c"
                    },
                    {
                        "amount": 1,
                        "measurement": "medium",
                        "name": "Avocado",
                        "_id": "6344080be0b152c1c9ec7f0d"
                    },
                    {
                        "amount": 1,
                        "measurement": "large",
                        "name": "Onion",
                        "_id": "6344080be0b152c1c9ec7f0e"
                    },
                    {
                        "amount": 1,
                        "measurement": "medium",
                        "name": "Bun",
                        "_id": "6344080be0b152c1c9ec7f0f"
                    }
                ],
                "methodsProvided": true,
                "methods": [
                    {
                        "id": 1,
                        "method": "Blend black beans, chickpeas, and onion in a food processor.",
                        "_id": "6344080be0b152c1c9ec7f10"
                    },
                    {
                        "id": 2,
                        "method": "Form into burger patties.",
                        "_id": "6344080be0b152c1c9ec7f11"
                    },
                    {
                        "id": 3,
                        "method": "Bake for 30 minutes.",
                        "_id": "6344080be0b152c1c9ec7f12"
                    },
                    {
                        "id": 4,
                        "method": "Assemble burger, starting with bottom bun, then lettuce, then burger patty, then top bun.",
                        "_id": "6344080be0b152c1c9ec7f13"
                    }
                ],
                "coverImage": "recipe-f1b5c8aba0bad8d608d0ade3.jpeg",
                "isApproved": true,
                "flaggedForDeletion": false,
                "slug": "bean-burger",
                "reviews": [
                    {
                        "_id": "63ab4e1acc5c9966a599ca11",
                        "rating": 4,
                        "comment": "Great!",
                        "author": {
                            "username": "eli"
                        },
                        "recipe": "6344080be0b152c1c9ec7f09"
                    },
                ],
                "id": "6344080be0b152c1c9ec7f09"
            }
        ]
    }
}
```

---

### Get one recipe:

| **GET** `https://vesearch-api.onrender.com/api/v1/recipes/:recipe_id` |
| --------------------------------------------------------------------- |

Responds with one recipes in the database given a recipe id.

### Example response:

```JSON
{
    "status": "success",
    "data": {
        "recipe": [
            {
                "_id": "6344080be0b152c1c9ec7f09",
                "name": "Bean burger",
                "author": {
                    "username": "eli"
                },
                "prepTime": 30,
                "cookTime": 40,
                "difficulty": "competent",
                "servings": 4,
                "ratingsAverage": 0,
                "description": "A juicy, tasty, ultra-healthy bean burger that will rival any other.",
                "dietTags": [
                    "oil-free"
                ],
                "nutritionProvided": false,
                "ingredients": [
                    {
                        "amount": 240,
                        "measurement": "g",
                        "name": "Black beans",
                        "_id": "6344080be0b152c1c9ec7f0a"
                    },
                    {
                        "amount": 240,
                        "measurement": "g",
                        "name": "Chickpeas",
                        "_id": "6344080be0b152c1c9ec7f0b"
                    },
                    {
                        "amount": 1,
                        "measurement": "handful",
                        "name": "Lettuce",
                        "_id": "6344080be0b152c1c9ec7f0c"
                    },
                    {
                        "amount": 1,
                        "measurement": "medium",
                        "name": "Avocado",
                        "_id": "6344080be0b152c1c9ec7f0d"
                    },
                    {
                        "amount": 1,
                        "measurement": "large",
                        "name": "Onion",
                        "_id": "6344080be0b152c1c9ec7f0e"
                    },
                    {
                        "amount": 1,
                        "measurement": "medium",
                        "name": "Bun",
                        "_id": "6344080be0b152c1c9ec7f0f"
                    }
                ],
                "methodsProvided": true,
                "methods": [
                    {
                        "id": 1,
                        "method": "Blend black beans, chickpeas, and onion in a food processor.",
                        "_id": "6344080be0b152c1c9ec7f10"
                    },
                    {
                        "id": 2,
                        "method": "Form into burger patties.",
                        "_id": "6344080be0b152c1c9ec7f11"
                    },
                    {
                        "id": 3,
                        "method": "Bake for 30 minutes.",
                        "_id": "6344080be0b152c1c9ec7f12"
                    },
                    {
                        "id": 4,
                        "method": "Assemble burger, starting with bottom bun, then lettuce, then burger patty, then top bun.",
                        "_id": "6344080be0b152c1c9ec7f13"
                    }
                ],
                "coverImage": "recipe-f1b5c8aba0bad8d608d0ade3.jpeg",
                "isApproved": true,
                "flaggedForDeletion": false,
                "slug": "bean-burger",
                "reviews": [
                    {
                        "_id": "63ab4e1acc5c9966a599ca11",
                        "rating": 4,
                        "comment": "Great!",
                        "author": {
                            "username": "eli"
                        },
                        "recipe": "6344080be0b152c1c9ec7f09"
                    },
                ],
                "id": "6344080be0b152c1c9ec7f09"
            }
        ]
    }
}
```

---

### Get recipes by a specific tag name (PROTECTED):

Tags: ["oil-free", "gluten-free", "low-cal", "nut-free", "soy-free", "sugar-free", "keto", "raw", "junk-food"]

| **GET** `https://vesearch-api.onrender.com/api/v1/recipes/findByTag/oil-free` |
| ----------------------------------------------------------------------------- |

Responds with recipes filtered by their tag.

```JSON
{
    "status": "success",
    "requestedAt": "31/03/2023 12:24:07AM GMT+01:00",
    "numOfResults": 1,
    "data": {
        "recipes": [
            {
                "_id": "6344080be0b152c1c9ec7f09",
                "name": "Bean burger",
                "author": {
                    "username": "eli"
                },
                "prepTime": 30,
                "cookTime": 40,
                "difficulty": "competent",
                "servings": 4,
                "ratingsAverage": 0,
                "description": "A juicy, tasty, ultra-healthy bean burger that will rival any other.",
                "dietTags": [
                    "oil-free"
                ],
                "nutritionProvided": false,
                "ingredients": [
                    {
                        "amount": 240,
                        "measurement": "g",
                        "name": "Black beans",
                        "_id": "6344080be0b152c1c9ec7f0a"
                    },
                    {
                        "amount": 240,
                        "measurement": "g",
                        "name": "Chickpeas",
                        "_id": "6344080be0b152c1c9ec7f0b"
                    },
                    {
                        "amount": 1,
                        "measurement": "handful",
                        "name": "Lettuce",
                        "_id": "6344080be0b152c1c9ec7f0c"
                    },
                    {
                        "amount": 1,
                        "measurement": "medium",
                        "name": "Avocado",
                        "_id": "6344080be0b152c1c9ec7f0d"
                    },
                    {
                        "amount": 1,
                        "measurement": "large",
                        "name": "Onion",
                        "_id": "6344080be0b152c1c9ec7f0e"
                    },
                    {
                        "amount": 1,
                        "measurement": "medium",
                        "name": "Bun",
                        "_id": "6344080be0b152c1c9ec7f0f"
                    }
                ],
                "methodsProvided": true,
                "methods": [
                    {
                        "id": 1,
                        "method": "Blend black beans, chickpeas, and onion in a food processor.",
                        "_id": "6344080be0b152c1c9ec7f10"
                    },
                    {
                        "id": 2,
                        "method": "Form into burger patties.",
                        "_id": "6344080be0b152c1c9ec7f11"
                    },
                    {
                        "id": 3,
                        "method": "Bake for 30 minutes.",
                        "_id": "6344080be0b152c1c9ec7f12"
                    },
                    {
                        "id": 4,
                        "method": "Assemble burger, starting with bottom bun, then lettuce, then burger patty, then top bun.",
                        "_id": "6344080be0b152c1c9ec7f13"
                    }
                ],
                "coverImage": "recipe-f1b5c8aba0bad8d608d0ade3.jpeg",
                "isApproved": true,
                "flaggedForDeletion": false,
                "slug": "bean-burger",
                "reviews": [
                    {
                        "_id": "63ab4e1acc5c9966a599ca11",
                        "rating": 4,
                        "comment": "Great!",
                        "author": {
                            "username": "eli"
                        },
                        "recipe": "6344080be0b152c1c9ec7f09"
                    },
                ],
                "id": "6344080be0b152c1c9ec7f09"
            }
        ]
    }
}
```

---
