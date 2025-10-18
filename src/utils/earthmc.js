import axios from 'axios';

const BASE_URL = 'https://api.earthmc.net/v3/aurora';

/**
 * Fetch detailed information about specific nations
 * @param {string[]} nationNames - Array of nation names to query
 * @returns {Promise<Object[]>} Array of nation data objects
 */
export async function getNations(nationNames) {
  try {
    const response = await axios.post(`${BASE_URL}/nations`, {
      query: nationNames
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching nation data:', error.message);
    throw error;
  }
}

/**
 * Fetch list of all nations (names and UUIDs only)
 * @returns {Promise<Object[]>} Array of nation objects with name and uuid
 */
export async function getAllNations() {
  try {
    const response = await axios.get(`${BASE_URL}/nations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all nations:', error.message);
    throw error;
  }
}

/**
 * Format a timestamp to a readable date
 * @param {number} timestamp - Unix timestamp in milliseconds
 * @returns {string} Formatted date string
 */
export function formatTimestamp(timestamp) {
  if (!timestamp) return 'N/A';
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

/**
 * Format coordinates for display
 * @param {Object} coords - Coordinates object with x, y, z
 * @returns {string} Formatted coordinates
 */
export function formatCoordinates(coords) {
  if (!coords) return 'N/A';
  return `X: ${Math.round(coords.x)}, Y: ${coords.y}, Z: ${Math.round(coords.z)}`;
}
