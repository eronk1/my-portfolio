/**************************************************************
 * Global variable to store last used section type (for top-level)
 **************************************************************/
window.lastSectionType = "overview";
/* Global variable to store the cover image file (imported or selected) */
window.coverImageFile = null;

/**************************************************************
 * Mapping for nested default types based on parent's type
 **************************************************************/
const nestedDefaultMapping = {
  "large-section": "medium-section",
  "medium-section": "small-section",
  "small-section": "small-section",
  "overview": "overview",
  "conclusion": "conclusion"
};

/**************************************************************
 * 1. LOAD SUBJECTS FROM CONFIG.JS ON PAGE LOAD
 **************************************************************/
window.addEventListener('DOMContentLoaded', () => {
  const subjectSelect = document.getElementById('blogSubjectSelect');
  const newSubjectInput = document.getElementById('newSubjectInput');

  if (typeof mainData !== 'undefined' && Array.isArray(mainData["all-subjects"])) {
    mainData["all-subjects"].forEach(subj => {
      const option = document.createElement('option');
      option.value = subj;
      option.textContent = subj;
      subjectSelect.appendChild(option);
    });
  }

  const addNewOpt = document.createElement('option');
  addNewOpt.value = "__add_new__";
  addNewOpt.textContent = "Add New Subject...";
  subjectSelect.appendChild(addNewOpt);

  subjectSelect.addEventListener('change', () => {
    if (subjectSelect.value === "__add_new__") {
      newSubjectInput.style.display = "block";
    } else {
      newSubjectInput.style.display = "none";
      newSubjectInput.value = "";
    }
  });

  // Cover picture input event listener to update preview and store file in global variable
  const coverPictureInput = document.getElementById('coverPictureInput');
  coverPictureInput.addEventListener('change', () => {
    if (coverPictureInput.files && coverPictureInput.files.length > 0) {
      window.coverImageFile = coverPictureInput.files[0];
      updateCoverImagePreview(window.coverImageFile);
    } else {
      window.coverImageFile = null;
      document.getElementById('coverImagePreview').innerText = "No file selected";
    }
  });
});

/**************************************************************
 * 2. UI FOR ADDING SECTIONS & NESTED SECTIONS
 **************************************************************/
document.getElementById('addSectionBtn').addEventListener('click', () => {
  addSection(document.getElementById('sectionsContainer'));
});
// Create one initial section
addSection(document.getElementById('sectionsContainer'));

function addSection(parentContainer, data = null) {
  // Determine default section type based on whether this is nested or top-level
  let defaultType = window.lastSectionType;
  const parentSection = parentContainer.closest(".section-block");
  if (parentSection) {
    const parentType = parentSection.querySelector('.section-type').value;
    defaultType = nestedDefaultMapping[parentType] || parentType;
  }

  const sectionIndex = parentContainer.querySelectorAll('.section-block').length;
  const sectionDiv = document.createElement('div');
  sectionDiv.className = "section-block";

  const header = document.createElement('h3');
  header.textContent = "Section " + (sectionIndex + 1);
  sectionDiv.appendChild(header);

  const typeLabel = document.createElement('label');
  typeLabel.textContent = "Section Type:";
  sectionDiv.appendChild(typeLabel);

  const typeSelect = document.createElement('select');
  typeSelect.className = "section-type";
  ["overview", "small-section", "medium-section", "large-section", "conclusion"].forEach(opt => {
    const o = document.createElement('option');
    o.value = opt;
    o.textContent = opt;
    typeSelect.appendChild(o);
  });
  // Set default value
  typeSelect.value = (data && data.type) ? data.type : defaultType;
  // Update global lastSectionType if top-level section
  if (!parentSection) {
    window.lastSectionType = typeSelect.value;
  }
  // Also update global when changed
  typeSelect.addEventListener('change', () => {
    if (!parentSection) {
      window.lastSectionType = typeSelect.value;
    }
  });
  sectionDiv.appendChild(typeSelect);

  const titleLabel = document.createElement('label');
  titleLabel.textContent = "Section Title (optional):";
  sectionDiv.appendChild(titleLabel);

  const titleInput = document.createElement('input');
  titleInput.type = "text";
  titleInput.className = "section-title";
  titleInput.placeholder = "Enter section title";
  if (data && data.title) titleInput.value = data.title;
  sectionDiv.appendChild(titleInput);

  const textLabel = document.createElement('label');
  textLabel.textContent = "Section Text:";
  sectionDiv.appendChild(textLabel);

  const textDiv = document.createElement('div');
  textDiv.className = "section-text";
  textDiv.contentEditable = "true";
  textDiv.setAttribute("placeholder", "Enter section text");
  if (data && data.text) textDiv.innerHTML = revertCodeTags(data.text);
  sectionDiv.appendChild(textDiv);

  const formatCodeBtn = document.createElement('button');
  formatCodeBtn.type = "button";
  formatCodeBtn.className = "format-code-btn";
  formatCodeBtn.textContent = "Format Code";
  formatCodeBtn.addEventListener('click', () => {
    const sel = window.getSelection();
    if (!sel.rangeCount) return;
    const range = sel.getRangeAt(0);
    if (range.toString().length === 0) return;
    const codeNode = document.createElement('code');
    codeNode.textContent = range.toString();
    range.deleteContents();
    range.insertNode(codeNode);
    sel.collapse(codeNode, codeNode.childNodes.length);
  });
  sectionDiv.appendChild(formatCodeBtn);

  const includeCodeLabel = document.createElement('label');
  includeCodeLabel.textContent = "Include Code Section?";
  sectionDiv.appendChild(includeCodeLabel);

  const includeCodeCheckbox = document.createElement('input');
  includeCodeCheckbox.type = "checkbox";
  includeCodeCheckbox.className = "include-code";
  if (data && data.codeAttach) includeCodeCheckbox.checked = true;
  sectionDiv.appendChild(includeCodeCheckbox);

  // Container for multiple code snippets and add button
  const codeSnippetsContainer = document.createElement('div');
  codeSnippetsContainer.className = "code-snippets-container";
  if (includeCodeCheckbox.checked) {
    codeSnippetsContainer.style.display = "block";
  }
  sectionDiv.appendChild(codeSnippetsContainer);

  const addCodeSnippetBtn = document.createElement('button');
  addCodeSnippetBtn.type = "button";
  addCodeSnippetBtn.className = "add-code-snippet-btn";
  addCodeSnippetBtn.textContent = "Add Code Snippet";
  if (includeCodeCheckbox.checked) {
    addCodeSnippetBtn.style.display = "inline-block";
  }
  addCodeSnippetBtn.addEventListener('click', () => {
    const snippetWrapper = document.createElement('div');
    snippetWrapper.className = "code-snippet-wrapper";
    const snippetTextarea = document.createElement('textarea');
    snippetTextarea.className = "code-snippet";
    snippetTextarea.placeholder = "Paste code here (will be saved as .txt).";
    snippetWrapper.appendChild(snippetTextarea);

    const deleteSnippetBtn = document.createElement('button');
    deleteSnippetBtn.type = "button";
    deleteSnippetBtn.className = "delete-snippet-btn";
    deleteSnippetBtn.textContent = "Delete Snippet";
    deleteSnippetBtn.addEventListener('click', () => {
      snippetWrapper.remove();
    });
    snippetWrapper.appendChild(deleteSnippetBtn);

    codeSnippetsContainer.appendChild(snippetWrapper);
  });
  sectionDiv.appendChild(addCodeSnippetBtn);

  includeCodeCheckbox.addEventListener('change', () => {
    if (includeCodeCheckbox.checked) {
      codeSnippetsContainer.style.display = "block";
      addCodeSnippetBtn.style.display = "inline-block";
    } else {
      codeSnippetsContainer.style.display = "none";
      addCodeSnippetBtn.style.display = "none";
      codeSnippetsContainer.innerHTML = "";
    }
  });

  const stepGuideLabel = document.createElement('label');
  stepGuideLabel.textContent = "Step-by-Step Guide?";
  sectionDiv.appendChild(stepGuideLabel);

  const stepGuideCheckbox = document.createElement('input');
  stepGuideCheckbox.type = "checkbox";
  stepGuideCheckbox.className = "step-guide";
  if (data && data.stepByStepGuide) stepGuideCheckbox.checked = true;
  sectionDiv.appendChild(stepGuideCheckbox);

  const fileLabel = document.createElement('label');
  fileLabel.textContent = "File Upload (Pictures/txt documents):";
  sectionDiv.appendChild(fileLabel);

  const fileInput = document.createElement('input');
  fileInput.type = "file";
  fileInput.multiple = true;
  fileInput.className = "section-file";
  sectionDiv.appendChild(fileInput);

  // File preview container
  const previewContainer = document.createElement('div');
  previewContainer.className = "file-preview-container";
  sectionDiv.appendChild(previewContainer);

  // Keep track of files on this section
  sectionDiv._files = [];

  fileInput.addEventListener('change', () => {
    sectionDiv._files = Array.from(fileInput.files);
    updateFilePreview(sectionDiv);
  });

  const noteLabel = document.createElement('label');
  noteLabel.textContent = "Notes:";
  sectionDiv.appendChild(noteLabel);

  const notesContainer = document.createElement('div');
  notesContainer.className = "notes-container";
  sectionDiv.appendChild(notesContainer);

  const addNoteBtn = document.createElement('button');
  addNoteBtn.type = "button";
  addNoteBtn.className = "add-note-btn";
  addNoteBtn.textContent = "Add Note";
  addNoteBtn.addEventListener('click', () => {
    const noteBlock = document.createElement('div');
    noteBlock.className = "note-block";
    const noteArea = document.createElement('textarea');
    noteArea.placeholder = "Enter a note";
    noteBlock.appendChild(noteArea);

    const deleteNoteBtn = document.createElement('button');
    deleteNoteBtn.type = "button";
    deleteNoteBtn.className = "delete-note-btn";
    deleteNoteBtn.textContent = "Delete Note";
    deleteNoteBtn.addEventListener('click', () => {
      noteBlock.remove();
    });
    noteBlock.appendChild(deleteNoteBtn);

    notesContainer.appendChild(noteBlock);
  });
  sectionDiv.appendChild(addNoteBtn);

  const nestedContainer = document.createElement('div');
  nestedContainer.className = "nested-sections-container";
  sectionDiv.appendChild(nestedContainer);

  const addNestedBtn = document.createElement('button');
  addNestedBtn.type = "button";
  addNestedBtn.className = "add-nested-section-btn";
  addNestedBtn.textContent = "Add Nested Section";
  addNestedBtn.addEventListener('click', () => {
    addSection(nestedContainer);
  });
  sectionDiv.appendChild(addNestedBtn);

  // Add Delete Section button
  const deleteSectionBtn = document.createElement('button');
  deleteSectionBtn.type = "button";
  deleteSectionBtn.className = "delete-section-btn";
  deleteSectionBtn.textContent = "Delete Section";
  deleteSectionBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to delete this section?")) {
      sectionDiv.remove();
    }
  });
  sectionDiv.appendChild(deleteSectionBtn);

  sectionDiv.appendChild(document.createElement('hr'));

  // If data is provided, populate fields
  if (data) {
    // Notes
    if (data.note) {
      if (Array.isArray(data.note)) {
        data.note.forEach(nt => {
          const noteBlock = document.createElement('div');
          noteBlock.className = "note-block";
          const noteArea = document.createElement('textarea');
          noteArea.value = nt;
          noteBlock.appendChild(noteArea);

          const deleteNoteBtn = document.createElement('button');
          deleteNoteBtn.type = "button";
          deleteNoteBtn.className = "delete-note-btn";
          deleteNoteBtn.textContent = "Delete Note";
          deleteNoteBtn.addEventListener('click', () => {
            noteBlock.remove();
          });
          noteBlock.appendChild(deleteNoteBtn);

          notesContainer.appendChild(noteBlock);
        });
      } else if (typeof data.note === "string" && data.note.trim()) {
        const noteBlock = document.createElement('div');
        noteBlock.className = "note-block";
        const noteArea = document.createElement('textarea');
        noteArea.value = data.note;
        noteBlock.appendChild(noteArea);

        const deleteNoteBtn = document.createElement('button');
        deleteNoteBtn.type = "button";
        deleteNoteBtn.className = "delete-note-btn";
        deleteNoteBtn.textContent = "Delete Note";
        deleteNoteBtn.addEventListener('click', () => {
          noteBlock.remove();
        });
        noteBlock.appendChild(deleteNoteBtn);

        notesContainer.appendChild(noteBlock);
      }
    }
    // Code snippets
    if (data.codeSnippet) {
      if (Array.isArray(data.codeSnippet)) {
        data.codeSnippet.forEach(snippet => {
          const snippetWrapper = document.createElement('div');
          snippetWrapper.className = "code-snippet-wrapper";
          const snippetTextarea = document.createElement('textarea');
          snippetTextarea.className = "code-snippet";
          snippetTextarea.placeholder = "Paste code here (will be saved as .txt).";
          snippetTextarea.value = snippet;
          snippetWrapper.appendChild(snippetTextarea);

          const deleteSnippetBtn = document.createElement('button');
          deleteSnippetBtn.type = "button";
          deleteSnippetBtn.className = "delete-snippet-btn";
          deleteSnippetBtn.textContent = "Delete Snippet";
          deleteSnippetBtn.addEventListener('click', () => {
            snippetWrapper.remove();
          });
          snippetWrapper.appendChild(deleteSnippetBtn);

          codeSnippetsContainer.appendChild(snippetWrapper);
        });
      } else {
        const snippetWrapper = document.createElement('div');
        snippetWrapper.className = "code-snippet-wrapper";
        const snippetTextarea = document.createElement('textarea');
        snippetTextarea.className = "code-snippet";
        snippetTextarea.placeholder = "Paste code here (will be saved as .txt).";
        snippetTextarea.value = data.codeSnippet;
        snippetWrapper.appendChild(snippetTextarea);

        const deleteSnippetBtn = document.createElement('button');
        deleteSnippetBtn.type = "button";
        deleteSnippetBtn.className = "delete-snippet-btn";
        deleteSnippetBtn.textContent = "Delete Snippet";
        deleteSnippetBtn.addEventListener('click', () => {
          snippetWrapper.remove();
        });
        snippetWrapper.appendChild(deleteSnippetBtn);

        codeSnippetsContainer.appendChild(snippetWrapper);
      }
    }
    // Nested sections
    if (data.data && Array.isArray(data.data)) {
      data.data.forEach(nestedData => {
        addSection(nestedContainer, nestedData);
      });
    }
  }

  parentContainer.appendChild(sectionDiv);
}

function updateFilePreview(sectionDiv) {
  const previewContainer = sectionDiv.querySelector('.file-preview-container');
  previewContainer.innerHTML = "";
  const files = sectionDiv._files || [];
  files.forEach(file => {
    const fileItem = document.createElement('div');
    fileItem.className = "file-preview-item";
    let fileDisplay;

    if (file.type.startsWith("image/")) {
      fileDisplay = document.createElement('img');
      fileDisplay.src = URL.createObjectURL(file);
      fileDisplay.alt = file.name;
      // Add click event for modal preview
      fileDisplay.addEventListener('click', () => {
        openModal(fileDisplay.src);
      });
    } else {
      fileDisplay = document.createElement('span');
      fileDisplay.textContent = file.name;
    }
    fileItem.appendChild(fileDisplay);

    const deleteFileBtn = document.createElement('button');
    deleteFileBtn.type = "button";
    deleteFileBtn.className = "delete-file-btn";
    deleteFileBtn.textContent = "Delete";
    deleteFileBtn.addEventListener('click', () => {
      sectionDiv._files = sectionDiv._files.filter(f => f !== file);
      updateFilePreview(sectionDiv);
    });
    fileItem.appendChild(deleteFileBtn);

    previewContainer.appendChild(fileItem);
  });
}

function revertCodeTags(html) {
  // If needed, you can implement a real revert for code tags here
  return html;
}

/**************************************************************
 * 3. GATHER SECTION DATA RECURSIVELY
 **************************************************************/
function gatherSectionData(sectionDiv) {
  const secData = {};
  secData.type = sectionDiv.querySelector('.section-type').value;
  const t = sectionDiv.querySelector('.section-title').value.trim();
  secData.title = t || null;
  let textHtml = sectionDiv.querySelector('.section-text').innerHTML;
  textHtml = processCodeTags(textHtml);
  secData.text = textHtml || "";
  const includeCode = sectionDiv.querySelector('.include-code').checked;
  if (includeCode) secData.codeAttach = true;
  const stepGuide = sectionDiv.querySelector('.step-guide').checked;
  if (stepGuide) secData.stepByStepGuide = true;
  
  // Gather multiple code snippets
  const snippetFields = sectionDiv.querySelectorAll('.code-snippets-container .code-snippet');
  let snippets = [];
  snippetFields.forEach(field => {
    const s = field.value.trim();
    if (s) snippets.push(s);
  });
  if (snippets.length > 0) {
    sectionDiv._codeSnippets = snippets;
    secData.codeSnippet = (snippets.length === 1 ? snippets[0] : snippets);
  }
  
  // Gather notes
  const notesContainer = sectionDiv.querySelector('.notes-container');
  const noteBlocks = notesContainer.querySelectorAll('.note-block textarea');
  if (noteBlocks.length > 1) {
    secData.multiLineNotes = true;
    secData.note = Array.from(noteBlocks).map(nb => nb.value.trim()).filter(v => v);
  } else if (noteBlocks.length === 1) {
    const val = noteBlocks[0].value.trim();
    secData.note = val || null;
  } else {
    secData.note = null;
  }
  
  // Nested sections
  const nestedContainer = sectionDiv.querySelector('.nested-sections-container');
  const nestedSections = nestedContainer.querySelectorAll(':scope > .section-block');
  if (nestedSections.length > 0) {
    secData.data = [];
    nestedSections.forEach(ns => {
      secData.data.push(gatherSectionData(ns));
    });
  }
  return secData;
}

function processCodeTags(html) {
  // Convert <code> contents to escaped HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  doc.querySelectorAll('code').forEach(codeEl => {
    codeEl.innerHTML = codeEl.textContent
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  });
  return doc.body.innerHTML;
}

/**************************************************************
 * 4. DOWNLOAD BLOG FOLDER (ZIP) -> blog.json + pictures folder
 **************************************************************/
document.getElementById('downloadBlogZipBtn').addEventListener('click', () => {
  const folderNameInput = document.getElementById('folderName').value.trim();
  const blogTitle = document.getElementById('blogTitle').value.trim();
  const subjectSelect = document.getElementById('blogSubjectSelect');
  const newSubjectInput = document.getElementById('newSubjectInput');
  let finalSubject = subjectSelect.value;
  if (finalSubject === "__add_new__") {
    finalSubject = newSubjectInput.value.trim();
  }
  if (!blogTitle || !finalSubject) {
    alert("Please fill in required fields: Blog Title and Subject.");
    return;
  }
  const folderName = folderNameInput || "AutoFolder_" + Date.now();
  const now = new Date().toLocaleDateString();
  const blogJson = {
    headers: {
      created: now,
      updated: now,
      updateHistory: [now],
      title: blogTitle,
      picture: null,  // Cover image is not referenced in blog.json
      author: "Seon Kim",
      subject: finalSubject
    },
    data: []
  };
  const topSections = document.querySelectorAll('#sectionsContainer > .section-block');
  topSections.forEach(sec => {
    blogJson.data.push(gatherSectionData(sec));
  });

  const zip = new JSZip();
  const mainFolder = zip.folder(folderName);
  const picturesFolder = mainFolder.folder("pictures");
  
  // Cover picture export: if provided, store it inside "pictures" as "0.png"
  const coverPictureInput = document.getElementById('coverPictureInput');
  let coverFile = null;
  if (coverPictureInput.files && coverPictureInput.files.length > 0) {
    coverFile = coverPictureInput.files[0];
  } else if (window.coverImageFile) {
    coverFile = window.coverImageFile;
  }
  if (coverFile) {
    picturesFolder.file("0.png", coverFile);
  }
  
  let globalFileIndex = 1;

  // Helper to export section's attached files & code snippets
  function exportSectionFiles(sec, sectionDiv) {
    const files = sectionDiv._files || [];
    const snippets = sectionDiv._codeSnippets || [];
    const totalItems = files.length + snippets.length;
  
    // No files/snippets
    if (totalItems === 0) {
      sec.picture = "";
    }
    // Exactly one file/snippet
    else if (totalItems === 1) {
      if (files.length === 1) {
        const fileObj = files[0];
        const fileName = fileObj.name;
        const dotIndex = fileName.lastIndexOf('.');
        const baseName = (dotIndex !== -1) ? fileName.slice(0, dotIndex) : fileName;
  
        if (fileObj.type.startsWith("image/")) {
          // Keep original name for images
          sec.picture = fileName;
          picturesFolder.file(fileName, fileObj);
        } else {
          // Non-image: rename to .txt only if codeAttach is checked
          if (sec.codeAttach) {
            const newFileName = baseName + ".txt";
            sec.picture = newFileName;
            picturesFolder.file(newFileName, fileObj);
          } else {
            sec.picture = fileName;
            picturesFolder.file(fileName, fileObj);
          }
        }
      } else if (snippets.length === 1) {
        // Single code snippet
        const snippet = snippets[0];
        const snippetFileName = "snippet" + (globalFileIndex++) + ".txt";
        sec.picture = snippetFileName;
        picturesFolder.file(snippetFileName, snippet);
      }
    }
    // Multiple items
    else {
      sec.multiPicture = true;
      sec.picture = [];
  
      // First handle all code snippets
      snippets.forEach(snippet => {
        const snippetFileName = "snippet" + (globalFileIndex++) + ".txt";
        sec.picture.push(snippetFileName);
        picturesFolder.file(snippetFileName, snippet);
      });
  
      // Then handle uploaded files
      files.forEach(fileObj => {
        const fileName = fileObj.name;
        const dotIndex = fileName.lastIndexOf('.');
        const baseName = (dotIndex !== -1) ? fileName.slice(0, dotIndex) : fileName;
  
        if (fileObj.type.startsWith("image/")) {
          // Keep exact filename for images
          sec.picture.push(fileName);
          picturesFolder.file(fileName, fileObj);
        } else {
          // Non-image
          if (sec.codeAttach) {
            const newFileName = baseName + ".txt";
            sec.picture.push(newFileName);
            picturesFolder.file(newFileName, fileObj);
          } else {
            sec.picture.push(fileName);
            picturesFolder.file(fileName, fileObj);
          }
        }
      });
    }
  
    // Recurse for nested sections
    if (sec.data && Array.isArray(sec.data)) {
      const nestedContainer = sectionDiv.querySelector('.nested-sections-container');
      if (nestedContainer) {
        const nestedBlocks = nestedContainer.querySelectorAll(':scope > .section-block');
        for (let i = 0; i < sec.data.length; i++) {
          exportSectionFiles(sec.data[i], nestedBlocks[i]);
        }
      }
    }
  }
  
  

  function handleSections(dataArr, container) {
    const blocks = container.querySelectorAll(':scope > .section-block');
    dataArr.forEach((sec, i) => {
      exportSectionFiles(sec, blocks[i]);
    });
  }

  // Export files for top-level sections
  handleSections(blogJson.data, document.getElementById('sectionsContainer'));

  // Add blog.json to zip
  mainFolder.file("blog.json", JSON.stringify(blogJson, null, 2));

  // Finally generate the ZIP
  zip.generateAsync({ type: "blob" }).then(content => {
    saveAs(content, folderName + ".zip");
  });
});

/**************************************************************
 * 5. DOWNLOAD main.json
 **************************************************************/
document.getElementById('downloadMainJsonBtn').addEventListener('click', () => {
  let existingSubjects = [];
  if (typeof mainData !== 'undefined' && Array.isArray(mainData["all-subjects"])) {
    existingSubjects = mainData["all-subjects"].slice();
  }
  const subjectSelect = document.getElementById('blogSubjectSelect');
  const newSubjectInput = document.getElementById('newSubjectInput');
  let finalSubject = subjectSelect.value;
  if (finalSubject === "__add_new__") {
    finalSubject = newSubjectInput.value.trim();
  }
  if (finalSubject && !existingSubjects.includes(finalSubject)) {
    existingSubjects.push(finalSubject);
  }
  const mainJson = { "all-subjects": existingSubjects };
  const blob = new Blob([JSON.stringify(mainJson, null, 2)], { type: "application/json" });
  saveAs(blob, "main.json");
});

/**************************************************************
 * 6. IMPORT BLOG (blog.json, ZIP, or folder) -> Populate Fields and Import Pictures & Cover Image
 **************************************************************/
document.getElementById('importBlogBtn').addEventListener('click', () => {
  document.getElementById('importBlogInput').click();
});

document.getElementById('importBlogInput').addEventListener('change', async (e) => {
  const files = e.target.files;
  if (!files || files.length === 0) return;
  if (files.length > 1) {
    // Attempt folder import
    processFolderImport(files);
  } else {
    // Single file - could be blog.json or .zip
    const file = files[0];
    if (file.name.toLowerCase().endsWith(".zip")) {
      processZipImport(file);
    } else {
      try {
        const text = await file.text();
        const blogData = JSON.parse(text);
        document.getElementById('sectionsContainer').innerHTML = "";
        if (Array.isArray(blogData.data)) {
          blogData.data.forEach(sec => {
            addSection(document.getElementById('sectionsContainer'), sec);
          });
        }
        if (blogData.headers) {
          if (blogData.headers.title) {
            document.getElementById('blogTitle').value = blogData.headers.title;
          }
          if (blogData.headers.subject) {
            const subjectSelect = document.getElementById('blogSubjectSelect');
            let found = false;
            for (let i = 0; i < subjectSelect.options.length; i++) {
              if (subjectSelect.options[i].value === blogData.headers.subject) {
                subjectSelect.selectedIndex = i;
                found = true;
                break;
              }
            }
            if (!found) {
              subjectSelect.value = "__add_new__";
              document.getElementById('newSubjectInput').style.display = "block";
              document.getElementById('newSubjectInput').value = blogData.headers.subject;
            }
          }
        }
      } catch (err) {
        alert("Failed to parse blog.json file. Error: " + err);
      }
    }
  }
});

function processZipImport(file) {
  JSZip.loadAsync(file)
    .then(zip => {
      // Determine if there's a top-level folder
      let topLevelFolder = null;
      for (const key in zip.files) {
        // If key is like "FolderName/" (only one folder level)
        if (zip.files[key].dir && key.split('/').length === 2 && key.endsWith('/')) {
          topLevelFolder = key;
          break;
        }
      }

      let blogJsonFile, picturesFolder, mainFolder;
      if (topLevelFolder) {
        mainFolder = zip.folder(topLevelFolder);
        blogJsonFile = mainFolder.file("blog.json");
        picturesFolder = mainFolder.folder("pictures");
      } else {
        blogJsonFile = zip.file("blog.json");
        picturesFolder = zip.folder("pictures");
        mainFolder = zip;
      }

      // Get cover image (0.png) if it exists
      let coverImagePromise = picturesFolder && picturesFolder.file("0.png")
        ? picturesFolder.file("0.png").async("blob")
        : Promise.resolve(null);

      if (!blogJsonFile) {
        throw new Error("blog.json not found in zip");
      }

      return Promise.all([blogJsonFile.async("string"), coverImagePromise])
        .then(([blogContent, coverBlob]) => {
          const blogData = JSON.parse(blogContent);
          let coverImageFile = coverBlob
            ? new File([coverBlob], "0.png", { type: coverBlob.type })
            : null;

          const picturesFiles = {};
          if (picturesFolder) {
            const picturePromises = [];
            picturesFolder.forEach((relativePath, fileEntry) => {
              // Only process files, not directories
              if (!fileEntry.dir) {
                picturePromises.push(
                  fileEntry.async("blob").then(blob => {
                    // Use only the base filename (e.g. "7.png")
                    const baseName = relativePath.split('/').pop();
                    picturesFiles[baseName] = new File([blob], baseName, { type: blob.type });
                  })
                );
              }
            });
            return Promise.all(picturePromises).then(() => {
              finishImport(blogData, picturesFiles, coverImageFile);
            });
          } else {
            finishImport(blogData, {}, coverImageFile);
          }
        });
    })
    .catch(error => {
      alert("Failed to import zip file: " + error);
    });
}


function processFolderImport(files) {
  let folderName = null;
  let blogJsonFile = null;
  let picturesFiles = {};
  let coverImageFile = null;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const relPath = file.webkitRelativePath;
    if (!folderName) {
      const parts = relPath.split("/");
      folderName = parts[0];
    }
    if (relPath === folderName + "/blog.json") {
      blogJsonFile = file;
    }
    if (relPath === folderName + "/0.png") {
      coverImageFile = file;
    }
    if (relPath.indexOf(folderName + "/pictures/") === 0) {
      const parts = relPath.split("/");
      const fileName = parts.slice(2).join("/");
      picturesFiles[fileName] = file;
    }
  }
  if (!blogJsonFile) {
    alert("blog.json not found in the imported folder");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const blogData = JSON.parse(e.target.result);
      finishImport(blogData, picturesFiles, coverImageFile);
    } catch(err) {
      alert("Failed to parse blog.json from folder: " + err);
    }
  };
  reader.readAsText(blogJsonFile);
}

function finishImport(blogData, picturesFiles, coverImageFile) {
  document.getElementById('sectionsContainer').innerHTML = "";
  if (Array.isArray(blogData.data)) {
    blogData.data.forEach(sec => {
      addSection(document.getElementById('sectionsContainer'), sec);
    });
  }
  if (blogData.headers) {
    if (blogData.headers.title) {
      document.getElementById('blogTitle').value = blogData.headers.title;
    }
    if (blogData.headers.subject) {
      const subjectSelect = document.getElementById('blogSubjectSelect');
      let found = false;
      for (let i = 0; i < subjectSelect.options.length; i++) {
        if (subjectSelect.options[i].value === blogData.headers.subject) {
          subjectSelect.selectedIndex = i;
          found = true;
          break;
        }
      }
      if (!found) {
        subjectSelect.value = "__add_new__";
        document.getElementById('newSubjectInput').style.display = "block";
        document.getElementById('newSubjectInput').value = blogData.headers.subject;
      }
    }
  }
  // Reattach all imported files to their respective sections
  attachImportedFiles(blogData.data, document.getElementById('sectionsContainer'), picturesFiles);

  // If cover image exists, update preview
  if (coverImageFile) {
    window.coverImageFile = coverImageFile;
    updateCoverImagePreview(coverImageFile);
  } else {
    document.getElementById('coverImagePreview').innerText = "No file selected";
    window.coverImageFile = null;
  }
}

function findFileInPictures(picturesFiles, fileName) {
  // Direct match
  if (picturesFiles[fileName]) return picturesFiles[fileName];
  // Try matching any key that ends with the fileName
  for (const key in picturesFiles) {
    if (key.endsWith(fileName)) {
      return picturesFiles[key];
    }
  }
  return null;
}

function attachImportedFiles(dataArr, container, picturesFiles) {
  const sectionDivs = container.querySelectorAll(':scope > .section-block');
  for (let i = 0; i < dataArr.length; i++) {
    const sectionData = dataArr[i];
    const sectionDiv = sectionDivs[i];

    // Process picture property if non-empty
    if (sectionData.picture !== undefined && sectionData.picture !== null) {
      if (Array.isArray(sectionData.picture)) {
        sectionDiv._files = [];
        sectionData.picture.forEach(fileName => {
          const fileObj = findFileInPictures(picturesFiles, fileName);
          if (fileObj) {
            sectionDiv._files.push(fileObj);
          }
        });
      } else if (typeof sectionData.picture === "string" && sectionData.picture.trim() !== "") {
        const fileName = sectionData.picture.trim();
        const fileObj = findFileInPictures(picturesFiles, fileName);
        if (fileObj) {
          sectionDiv._files = [fileObj];
        }
      }
      updateFilePreview(sectionDiv);
    }

    // Recurse for nested sections
    if (sectionData.data && Array.isArray(sectionData.data)) {
      const nestedContainer = sectionDiv.querySelector('.nested-sections-container');
      attachImportedFiles(sectionData.data, nestedContainer, picturesFiles);
    }
  }
}




/**************************************************************
 * Modal Image Preview
 **************************************************************/
function openModal(src) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  modal.style.display = "block";
  modalImg.src = src;
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  modal.style.display = "none";
}

document.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

document.getElementById('imageModal').addEventListener('click', (e) => {
  if (e.target.id === "imageModal" || e.target.className === "close") {
    closeModal();
  }
});

/**************************************************************
 * NEW: Function to update cover image preview
 **************************************************************/
function updateCoverImagePreview(file) {
  const coverPreview = document.getElementById('coverImagePreview');
  if (coverPreview) {
    coverPreview.innerHTML = "";
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.alt = "Cover Image";
    img.style.maxWidth = "100px";
    img.style.maxHeight = "100px";
    // Add click event to open modal preview
    img.addEventListener('click', () => {
      openModal(img.src);
    });
    coverPreview.appendChild(img);
  }
}
