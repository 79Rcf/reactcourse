import { Client, Databases, ID, Query } from 'appwrite';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const IMAGE_PATH = import.meta.env.VITE_TMDB_IMAGE_URL;

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (movie, searchTerm) => { 
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [ Query.equal('searchTerm', searchTerm.toLowerCase().trim()) ]
    );

    if (result.documents.length > 0) {
      const doc = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        doc.$id,
        { count: doc.count + 1 }
      );
    } else {
      await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          searchTerm: searchTerm.toLowerCase().trim(),
          count: 1,
          movie_id: movie ? movie.id : null,
          poster_url: movie && movie.poster_path 
            ? `${IMAGE_PATH}${movie.poster_path}` 
            : null
        }
      );
    }
  } catch (error) {
    console.error('Appwrite - Search tracking failed:', {
      error: error.message,
      searchTerm,
      timestamp: new Date().toISOString()
    });
  }
};

export const getTrendingMovies = async () => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc('count')
    ]);
    return result.documents;
  } catch (error) {
    console.error('Appwrite - Failed to fetch trending movies:', {
      error: error.message,
      timestamp: new Date().toISOString()
    });
    return [];
  }
};