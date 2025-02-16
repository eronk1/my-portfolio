// src/Contents/ProjectPages/blogsAggregator.jsx

/**
 * This aggregator auto-discovers all blog.json files and associated assets
 * (images, txt, md) in your src/blogs folder using Vite's import.meta.glob.
 *
 * Adjust the relative paths below if your aggregator file is located elsewhere.
 */

// 1) Gather all blog.json files under src/blogs/**/blog.json eagerly.
//    Using import: 'default' so each .json file is loaded as a default export.
const blogModules = import.meta.glob('../../../blogs/**/blog.json', {
    eager: true,
    import: 'default'
  });
  
  // 2) Gather all images, txt, md, etc. from src/blogs, returning file URLs eagerly.
  //    Using "query: '?url'" + "import: 'default'" to get direct file URLs (no more 'as: "url"' deprecation).
  const imageModules = import.meta.glob('../../../blogs/**/*.{png,jpg,jpeg,gif,txt,md}', {
    eager: true,
    query: '?url',
    import: 'default'
  });
  
  function getBlogsArray() {
    // Debug logs: see what was matched
    console.log('Found blogModules keys:', Object.keys(blogModules));
    console.log('Found imageModules keys:', Object.keys(imageModules));
  
    const blogs = [];
  
    // Each key is something like: "../../../blogs/Steps/MyBlog/blog.json"
    for (const path in blogModules) {
      // blogData should be the parsed JSON object if Vite automatically parses it
      const blogData = blogModules[path];
  
      // Example path: "../../../blogs/Steps/MyBlog/blog.json"
      // We'll extract "Steps" as category and "MyBlog" as folderName
      const regex = /..\/..\/..\/blogs\/([^/]+)\/([^/]+)\/blog\.json$/;
      const match = path.match(regex);
  
      if (match) {
        const category = match[1];     // e.g. "Steps", "Observations"
        const folderName = match[2];  // e.g. "MyBlog"
  
        // Provide a helper function that returns the file URL if found
        const getImage = (filename) => {
          const imagePath = `../../../blogs/${category}/${folderName}/${filename}`;
          return imageModules[imagePath] || null;
        };
  
        blogs.push({
          folderName,
          category,
          data: blogData,   // The JSON object from blog.json
          getImage         // A function for retrieving image or .txt URLs
        });
      } else {
        // If the path didn't match, optionally log it:
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
  