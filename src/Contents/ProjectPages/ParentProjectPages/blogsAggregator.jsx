/**
 * This aggregator auto-discovers all blog.json files and associated assets
 * (images, txt, md) in your src/blogs folder using Vite's import.meta.glob.
 *
 * It skips the folder named "0-Folder Format (only for reference) copy" and
 * computes a coverImage from the first available image file if "cover.png"
 * is not found. 
 *
 * Adjust the relative paths below if your aggregator file is located elsewhere.
 */

// 1) Import all blog.json files as normal objects
const blogModules = import.meta.glob('../../../blogs/**/blog.json', {
  eager: true,
  import: 'default'
});

// 2) Import all images as URLs (for <img src="..."/> usage)
const imageModules = import.meta.glob('../../../blogs/**/*.{png,jpg,jpeg,gif}', {
  eager: true,
  query: '?url',
  import: 'default'
});

// 3) Import all .txt/.md files as *raw text*, using the new "query" syntax
const textModules = import.meta.glob('../../../blogs/**/*.{txt,md}', {
  eager: true,
  query: '?raw',
  import: 'default'
});

function getBlogsArray() {
  console.log('Found blogModules keys:', Object.keys(blogModules));
  console.log('Found imageModules keys:', Object.keys(imageModules));
  console.log('Found textModules keys:', Object.keys(textModules));

  const blogs = [];

  for (const path in blogModules) {
    const blogData = blogModules[path];

    // Expected path format: "../../../blogs/<Category>/<FolderName>/blog.json"
    const regex = /..\/..\/..\/blogs\/([^/]+)\/([^/]+)\/blog\.json$/;
    const match = path.match(regex);

    if (match) {
      const category = match[1];     // e.g. "Steps", "Observations", etc.
      const folderName = match[2];   // e.g. "MyBlogFolder"

      // Skip the special "0-Folder Format" folder
      if (folderName === '0-Folder Format (only for reference) copy') {
        console.log('Skipping folder: 0-Folder Format');
        continue;
      }

      // Provide a function to get an image URL
      const getImage = (filename) => {
        const imagePath = `../../../blogs/${category}/${folderName}/pictures/${filename}`;
        return imageModules[imagePath] || null;
      };

      // Provide a function to get raw text (for .txt or .md)
      const getText = (filename) => {
        const textPath = `../../../blogs/${category}/${folderName}/pictures/${filename}`;
        return textModules[textPath] || null;  // returns the raw string or null
      };

      // Compute coverImage by searching the folder for an image
      let coverImage = null;
      const folderPattern = `../../../blogs/${category}/${folderName}/`;
      const candidateKeys = Object.keys(imageModules).filter(key =>
        key.startsWith(folderPattern) && /\.(png|jpe?g|gif)$/i.test(key)
      );
      candidateKeys.sort(); // Alphabetical order
      if (candidateKeys.length > 0) {
        coverImage = imageModules[candidateKeys[0]];
      }

      blogs.push({
        folderName,
        category,
        data: blogData,   // The JSON object from blog.json
        getImage,         // Function to get an image URL
        getText,          // Function to get raw text from .txt/.md
        coverImage        // Computed cover image URL (or null)
      });
    } else {
      console.log(`Path did not match expected pattern: ${path}`);
    }
  }

  if (blogs.length === 0) {
    console.log('No blogs found. Possibly no blog.json files, or incorrect path/regex.');
  } else {
    console.log(`Discovered ${blogs.length} blog(s).`);
  }

  return blogs;
}

export const allBlogs = getBlogsArray();
