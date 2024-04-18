# Music Archive Management Mini App

This project is designed to assist a student, who isn't related to web development, with managing music archives for her thesis project within Tunisia TV Company. She is not related to web development and requires a user-friendly interface for organizing singers and their songs.

## Features

- **Authentication**: Users can log in securely using server actions and HTTP-only cookies.
- **Route Protection**: Middleware ensures that only authenticated users can access certain routes.
- **CRUD Operations**: Users can add, update, delete, and display singers and their songs.
- **Pagination**: Singers are displayed in a table with pagination for easier navigation.
- **Filtering**: Singers can be filtered by country, name, reference, and song.

## Technologies Used

- **TypeScript**: Ensures type safety and improves code readability.
- **Next.js 14.1**: A React framework for server-rendered applications.
- **Material-UI 5**: Provides React components for faster and easier web development.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/music-archive-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd music-archive-app
   ```

3. Create a `.env.local` file in the root directory of your project and add the following environment variables:

   ```plaintext
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ROOT_URL=your_root_url
   ```

   Replace `your_mongodb_uri`, `your_jwt_secret`, and `your_root_url` with your actual MongoDB URI, JWT secret, and root URL respectively.

4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

## Usage

Once the development server is running, you can access the app in your web browser at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the [MIT License](LICENSE).
