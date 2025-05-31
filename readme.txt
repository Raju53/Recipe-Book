Recipe-Book

This document provides instructions and details for the Recipe Book web application.

Project Description

This is a web-based Recipe Book application designed to allow users to add, view, and search for recipes. It provides a user-friendly interface for managing your favorite dishes, with all data stored directly in your browser.

Technologies Used

HTML5: For the core structure and content of the web pages. CSS3: For styling the application, ensuring an attractive and responsive user interface. JavaScript (ES6+): For all interactive functionality, including data management, dynamic content updates, and search logic.

Key Features

Add Recipes: Users can input and save new recipes, including the recipe name, image URL, a list of ingredients, and detailed preparation steps.

View Recipes: All added recipes are displayed in a visually appealing grid format on the main page.

Recipe Details: Click on any recipe card to open a modal that displays the full details of that recipe (all ingredients and instructions).

Search Functionality: A search bar allows users to quickly find recipes by typing keywords found in either the recipe name or its ingredients.

Data Persistence: Recipes are stored locally in the user's browser using localStorage. This means your recipes will remain saved even if you close the browser or refresh the page.

User-Friendly Interface: The application is designed to be intuitive and easy to navigate.

How to Run the Application

Download/Extract: Ensure you have extracted all project files ( index.html, style.css, and script.js) into a single folder.

Open in Browser: Simply open the index.html file in your preferred web browser (e.g., Chrome, Firefox, Edge, Safari). You can do this by double-clicking the file.

Start Using: The application will load, and you can begin adding recipes, viewing existing ones, or using the search feature.

Additional Notes

Local Storage: All recipe data is stored directly in your browser's localStorage. This means the data is tied to your specific browser on your computer. It is not stored on a server or shared across devices.

Image Handling: Recipe images are linked via a URL. If an image URL is invalid or not provided, a placeholder image will be displayed.

Scalability: For a larger-scale application with user accounts and cloud storage, a backend server and database would be required. This project focuses purely on front-end development and local browser persistence.