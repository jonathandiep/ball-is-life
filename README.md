# Ball is Life

This is a web application that I have built to display the field goals of NBA players. It can display a scattered shot chart of a player's game and a hexbin heatmap of a player's season.

#### Scattered Shot Chart
![Scattered Shot Chart](http://i.imgur.com/6IyNEf5.png)

#### Hexbin Heatmap
![Hexbin Heatmap](http://i.imgur.com/qz4Mubm.png)

### How to run this project locally
Simply clone the repository and run
```
npm install
npm start
```

The app has also been deployed and can be seen here:
[http://ball-is.life](http://ball-is.life)

### Stuff used to make this:

 * [React](https://facebook.github.io/react/) for rendering the views
 * [Create React App](https://github.com/facebookincubator/create-react-app) for creating a React boilerplate
 * [Redux](http://redux.js.org/) for managing application state
 * [D3.js](https://d3js.org/) for creating the shotchart
 * [Bootstrap](https://v4-alpha.getbootstrap.com/) for the application styles
 * [Express](expressjs.com) for creating a backend to serve the files (and originally served an API backend)

This project gets data from the [NBA API Endpoints](https://github.com/bttmly/nba).
