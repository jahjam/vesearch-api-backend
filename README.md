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

### `GET` one recipe:

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

### `GET` recipes by a specific tag name (PROTECTED):

Tags: ["oil-free", "gluten-free", "low-cal", "nut-free", "soy-free", "sugar-free", "keto", "raw", "junk-food"]

| **GET** `https://vesearch-api.onrender.com/api/v1/recipes/findByTag/oil-free` |
| ----------------------------------------------------------------------------- |

Responds with recipes filtered by their tag.

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

### `GET` recipe statistics of all difficulty levels (PROTECTED):

| **GET** `https://vesearch-api.onrender.com/api/v1/recipes/statsByDifficulty` |
| ---------------------------------------------------------------------------- |

Responds with recipe statistics of each difficulty level.

### Example response:

```JSON
{
    "status": "success",
    "data": {
        "recipes": [
            {
                "_id": "COMPETENT",
                "numRecipes": 1,
                "avgCookTime": 40,
                "avgPrepTime": 30,
                "avgServings": 4,
                "numIngredients": 6
            },
             {
                "_id": "NOVICE",
                "numRecipes": 2,
                "avgCookTime": 20,
                "avgPrepTime": 8,
                "avgServings": 4,
                "numIngredients": 6
            }
        ]
    }
}
```

---

### `POST` a single recipe (PROTECTED):

| **POST** `https://vesearch-api.onrender.com/api/v1/recipes` |
| ----------------------------------------------------------- |

Responds with the added recipe.

### Example body:

| KEY         | VALUE        |
| ----------- | ------------ |
| name        | tofu noodles |
| prepTime    | 30           |
| cookTime    | 80           |
| difficulty  | proficient   |
| servings    | 4            |
| description | ...          |
| ...         | ....         |

### Example Response:

```JSON

{
    "status": "success",
    "data": {
        "recipe": {
            "name": "tofu noodles",
            "author": "6424ac1fe92fd2e21a18bc42",
            "prepTime": 30,
            "cookTime": 80,
            "difficulty": "proficient",
            "servings": 4,
            "ratingsAverage": 0,
            "description": "One for any noodle lover!",
            "dietTags": [
                "low-cal",
                "gluten-free"
            ],
            "nutritionProvided": true,
            "nutrition": {
                "kcal": {
                    "amount": 500,
                    "measurement": "g"
                },
                "fat": {
                    "amount": 60,
                    "measurement": "g"
                },
                "saturates": {
                    "amount": 80,
                    "measurement": "g"
                },
                "carbs": {
                    "amount": 15,
                    "measurement": "g"
                },
                "sugars": {
                    "amount": 0.5,
                    "measurement": "g"
                },
                "fibre": {
                    "amount": 100,
                    "measurement": "g"
                },
                "protien": {
                    "amount": 200,
                    "measurement": "g"
                },
                "salt": {
                    "amount": 0.2,
                    "measurement": "g"
                },
                "_id": "642a04ffd2be92d74b834859"
            },
            "ingredients": [
                {
                    "amount": 1,
                    "measurement": "cup",
                    "name": "Sliced carrots",
                    "_id": "642a04ffd2be92d74b83485a"
                },
                {
                    "amount": 240,
                    "measurement": "g",
                    "name": "tofu",
                    "_id": "642a04ffd2be92d74b83485b"
                },
                {
                    "amount": 2,
                    "measurement": "cloves",
                    "name": "Garlic",
                    "_id": "642a04ffd2be92d74b83485c"
                },
                {
                    "amount": 2,
                    "measurement": "tbs",
                    "name": "Turmeric",
                    "_id": "642a04ffd2be92d74b83485d"
                },
                {
                    "amount": 1,
                    "measurement": "thumb-sized",
                    "name": "Ginger",
                    "_id": "642a04ffd2be92d74b83485e"
                }
            ],
            "methodsProvided": false,
            "methodsAlternative": "https://vesearch-app.onrender.com/search",
            "coverImage": "recipe-35d39f090881b7646ff29dcd.jpeg",
            "isApproved": true,
            "flaggedForDeletion": false,
            "_id": "642a04ffd2be92d74b834858",
            "methods": [],
            "slug": "tofu-noodles",
            "__v": 0,
            "id": "642a04ffd2be92d74b834858"
        }
    }
}

```
