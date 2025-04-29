Mother's Day Blog Site

A beautiful, responsive React-based blog site dedicated to celebrating Mother's Day through stories, guides, and inspirational content.

Project Overview

This project is a feature-rich blog platform built with React, designed to showcase articles, stories, and content related to Mother's Day celebrations and more. The site features a clean, modern design with multiple page types, dynamic content loading, and an intuitive user interface.

The blog organizes content into various categories including:

Travels

Guides

Foods

Stories

Cities

Countries

Vlogs

*   Culture
*   History

Each article is presented with an engaging preview on the home page and can be viewed in detail on its own dedicated page.

## Visual Preview

*(Consider adding a screenshot or GIF of the running application here)*

## Technologies Used

*   **React:** JavaScript library for building user interfaces
*   **React Router:** For declarative routing in React applications
*   **CSS:** Custom styling for components

## Project Structure

The project follows a standard React application structure:

*   `public/`: Contains static assets and the main `index.html` file.
*   `src/`: Contains the core application code.
    *   `components/`: Reusable UI components (e.g., Header, Footer, ArticleCard).
    *   `pages/`: Top-level page components (e.g., HomePage, AboutPage).
    *   `data/`: Static data files (e.g., `articles.json`).
    *   `App.js`: Main application component, sets up routing.
    *   `index.js`: Entry point of the application.
    *   `*.css`: CSS files for styling components and pages.

## How to Run Locally

To run this project on your local machine:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd mothers-day-blog-site
    ```
    *(Replace `<repository-url>` with the actual URL of the repository)*

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm start
    ```

4.  **View in browser:**
    Open your browser and navigate to `http://localhost:3000`.

The site should now be running locally with hot-reload enabled (changes to the code will update the site automatically).

Features Implemented

Core Features

Responsive design that works on mobile, tablet, and desktop devices

Multi-page navigation between home, categories, about, contact, and article detail pages

Dynamic content loading from a JSON data source

Content & Layout

Featured articles carousel showcasing highlighted articles in a visually appealing slider

Category filtering to browse articles by category with interactive category cards

Visually engaging article preview cards on the home and category pages

Detailed article pages with sectioned content, images, and reading time estimate

Pagination to navigate through multiple pages of articles

Sidebar with additional content and navigation options

User Interface Components

Clean header with navigation menu and search functionality

Responsive mobile menu for smaller screens

Search functionality to search articles by title

Newsletter signup to collect emails for newsletter subscriptions

Suggested articles section for related content recommendations

Instagram showcase section for social media highlights

Footer with site information and additional navigation

Special Sections

Dedicated guide section for tutorials and how-to articles

Article detail pages support a mix of paragraphs, images, and section titles

Category exploration page to browse all available categories

Technical Implementation

React Router for seamless page navigation and URL routing

Component-based architecture using modular, reusable components

React state and context for managing application state

Custom CSS styling with separate CSS files for each component

Responsive images optimized for various screen sizes

Reading time calculation displayed on each article detail page

Expandability

The site is designed to be easily expandable with new articles, categories, and features. Adding a new article only requires updating the JSON data file, and new pages or components can be created without impacting existing functionality.
