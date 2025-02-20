# Play Planner

## Description 

Play Planner is a Vite application built with React meant to give gamers a way to keep track of video games they would like to play and what games they have already played. There is a hole in the market of applications like *GoodReads* or *Letterboxd* which allow users to keep track of select media that is specifically for video games, and Play Planner would like to fill that void. 

## Installation 

Deployed site through [Render](https://playplanner.onrender.com/).

For development purposes:
1. Clone the repository using the following commands in terminal or bash:
    ```sh
    git clone https://github.com/rasersharpe/play-planner.git
    cd play-planner
    ```
2. Open the repo in VS Code and open the integrated terminal at the root level and run the following commands:
    ```sh
    npm install
    ```
    ```sh
    npm run build
    ```
3. Authenticate and build the server in postgres:
    ```sh
    psql -U postgres
    ```
    Enter <your_password>
    ```sh
    \i server/db/schema.sql;
    ```
    And then `\q` quit postgres.
4. Seed the database, then run the server and launch the Vite application in your default browser:
    ```sh
    npm run seed
    ```
    ```sh
    npm run start:dev
    ```

## Usage

For full function of the application, users must first create an account by navigating to the "Login" page by clicking the button on the top right of the screen and click the **Sign up here.** link at the bottom of the login form. To sign up, enter at unique username, a valid email, and a password. Signing up should automatically log new users in to their account and redirect them to the homepage. Users can then search for video games by title through the search bar. Once a game has been found, users can add that game to a "Wish List" of games they would like to play, or add it to a "Played Games" list, if they have already played it. 

## Acknowledgments

- [RAWG Video Games Database API](https://rawg.io/apidocs)
- Blake Anderson's [GitHub](https://github.com/Blakeroband)
- Jay Bhatt's [GitHub](https://github.com/rasersharpe)
- Jake Ringate's [GitHub](https://github.com/JAKES-CLOUD-SPACE)
- Kira Ziegler's [GitHub](https://github.com/kiralee97)

## License

Licensed under the [MIT License](https://opensource.org/license/MIT).