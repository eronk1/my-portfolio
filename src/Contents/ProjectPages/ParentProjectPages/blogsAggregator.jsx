/**
 * This aggregator auto-discovers all blog.json files and associated assets
 * (images, txt, md) in your src/blogs folder using Vite's import.meta.glob.
 *
 * It skips the folder named "0-Folder Format" and computes a coverImage from the first
 * available image file (png, jpg, jpeg, gif) if "cover.png" is not found.
 *
 * Adjust the relative paths below if your aggregator file is located elsewhere.
 */

const blogModules = import.meta.glob('../../../blogs/**/blog.json', {
    eager: true,
    import: 'default'
  });
  
  const imageModules = import.meta.glob('../../../blogs/**/*.{png,jpg,jpeg,gif,txt,md}', {
    eager: true,
    query: '?url',
    import: 'default'
  });
  
  function getBlogsArray() {
    console.log('Found blogModules keys:', Object.keys(blogModules));
    console.log('Found imageModules keys:', Object.keys(imageModules));
  
    const blogs = [];
  
    for (const path in blogModules) {
      const blogData = blogModules[path];
  
      // Expected path format: "../../../blogs/<Category>/<FolderName>/blog.json"
      const regex = /..\/..\/..\/blogs\/([^/]+)\/([^/]+)\/blog\.json$/;
      const match = path.match(regex);
  
      if (match) {
        const category = match[1];     // e.g. "Steps" or "Observations"
        const folderName = match[2];   // e.g. "MyBlogFolder"
  
        // Skip folder named "0-Folder Format"
        if (folderName === '0-Folder Format (only for reference) copy') {
          console.log('Skipping folder: 0-Folder Format');
          continue;
        }
  
        const getImage = (filename) => {
          const imagePath = `../../../blogs/${category}/${folderName}/pictures/${filename}`;
          console.log(imagePath)
          return imageModules[imagePath] || null;
        };
  
        // Compute coverImage: first, try "cover.png"
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
          getImage,         // Function to get an asset from the folder
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
  