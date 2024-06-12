# Find Your Hat

## Description
This is a simple terminal game where the player needs to navigate a field to find their hat without falling into a hole. The game is written in JavaScript and runs in the Node.js environment.

## Game Elements
- `^` represents the hat
- `O` represents a hole
- `░` represents the field
- `*` represents the path taken by the player

## How to Play
The player starts at the top left corner of the field and can move up, down, left, or right. The goal is to reach the hat (`^`) without stepping into a hole (`O`). The game ends when the player finds their hat or falls into a hole.

## Installation
1. Make sure you have [Node.js](https://nodejs.org/en/) installed.
2. Clone this repository.
3. Navigate to the project directory and run `npm install` to install the required dependencies.

## Running the Game
To start the game, navigate to the project directory and run `node main.js`.

## Customizing the Game
You can customize the game by modifying the `generateField` method in the `Field` class. The parameters are:
- `w`: width of the field
- `h`: height of the field
- `percentageHoles`: percentage of the field that should be filled with holes

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)