
import multer from 'multer';

/**
 * Export the multer middleware instance
 */
export const upload = multer({ dest: 'uploads/', });