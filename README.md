# Node.js Menu Management Backend

This project is a Node.js backend application for managing a menu system with categories, subcategories, and items. This API allows you to create, read, edit, and search for categories, subcategories, and items.

## Project Overview

The application consists of three main components:

1. **Categories**: Represent top-level menu categories.
2. **Subcategories**: Each category can have multiple subcategories.
3. **Items**: Items belong to subcategories or directly to categories.

## Features

- **Create**: APIs to create categories, subcategories, and items.
- **Read**: APIs to get all categories, subcategories, or items or get them by ID or name.
- **Edit**: APIs to update category, subcategory, or item attributes.
- **Search**: API to search items by name.
- **Database**: Store all the data related to categories, subcategories, and items.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for creating REST APIs.
- **MongoDB**: NoSQL database for storing menu-related data (Alternatively, you can use any database of your choice).

## Project Setup

### Prerequisites

- Install [Node.js](https://nodejs.org/en/download/) (v14 or above).
- MongoDB installed locally or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for cloud-hosted MongoDB.

### Steps to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ajoyscorpion/guestara_assignment.git
   cd guestara_assignment
