/**************************************************************
 * 1. LOAD main.json ON PAGE LOAD (IF PRESENT)
 *    AND POPULATE THE SUBJECT SELECT
 **************************************************************/
window.addEventListener('DOMContentLoaded', async () => {
  const subjectSelect = document.getElementById('blogSubjectSelect');
  const newSubjectInput = document.getElementById('newSubjectInput');
  
  // Attempt to fetch main.json from same directory
  try {
    const response = await fetch('./main.json');
    if (!response.ok) throw new Error('main.json not found');
    const mainData = await response.json();
    if (mainData["all-subjects"] && Array.isArray(mainData["all-subjects"])) {
      mainData["all-subjects"].forEach(subj => {
        const option = document.createElement('option');
        option.value = subj;
        option.textContent = subj;
        subjectSelect.appendChild(option);
      });
    }
  } catch (e) {
    console.log("Could not load main.json automatically.", e);
  }
  
  // Always add the "Add New Subject..." option at the end
  const addNewOpt = document.createElement('option');
  addNewOpt.value = "__add_new__";
  addNewOpt.textContent = "Add New Subject...";
  subjectSelect.appendChild(addNewOpt);

  // If "Add New Subject..." is selected, show the text input
  subjectSelect.addEventListener('change', () => {
    if (subjectSelect.value === "__add_new__") {
      newSubjectInput.style.display = "block";
    } else {
      newSubjectInput.style.display = "none";
      newSubjectInput.value = "";
    }
  });
});


/**************************************************************
 * 2. UI FOR ADDING SECTIONS & NESTED SECTIONS
 **************************************************************/
document.getElementById('addSectionBtn').addEventListener('click', () => {
  addSection(document.getElementById('sectionsContainer'));
});

// Add the first top-level section by default
addSection(document.getElementById('sectionsContainer'));

function addSection(parentContainer, data = null) {
  const sectionIndex = parentContainer.querySelectorAll('.section-block').length;
  const sectionDiv = document.createElement('div');
  sectionDiv.className = "section-block";

  // Title: "Section X"
  const header = document.createElement('h3');
  header.textContent = "Section " + (sectionIndex + 1);
  sectionDiv.appendChild(header);

  // Section Type
  const typeLabel = document.createElement('label');
  typeLabel.textContent = "Section Type:";
  sectionDiv.appendChild(typeLabel);

  const typeSelect = document.createElement('select');
  typeSelect.className = "section-type";
  ["overview","small-section","medium-section","large-section","conclusion"].forEach(opt => {
    const o = document.createElement('option');
    o.value = opt;
    o.textContent = opt;
    typeSelect.appendChild(o);
  });
  sectionDiv.appendChild(typeSelect);

  // Section Title
  const titleLabel = document.createElement('label');
  titleLabel.textContent = "Section Title (optional):";
  sectionDiv.appendChild(titleLabel);

  const titleInput = document.createElement('input');
  titleInput.type = "text";
  titleInput.className = "section-title";
  titleInput.placeholder = "Enter section title";
  sectionDiv.appendChild(titleInput);

  // Section Text (contenteditable div)
  const textLabel = document.createElement('label');
  textLabel.textContent = "Section Text:";
  sectionDiv.appendChild(textLabel);

  const textDiv = document.createElement('div');
  textDiv.className = "section-text";
  textDiv.contentEditable = "true";
  textDiv.setAttribute("placeholder", "Enter section text");
  sectionDiv.appendChild(textDiv);

  // Format Code button: wrap selected text in <code>
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

  // Include Code Section?
  const includeCodeLabel = document.createElement('label');
  includeCodeLabel.textContent = "Include Code Section?";
  sectionDiv.appendChild(includeCodeLabel);

  const includeCodeCheckbox = document.createElement('input');
  includeCodeCheckbox.type = "checkbox";
  includeCodeCheckbox.className = "include-code";
  sectionDiv.appendChild(includeCodeCheckbox);

  // Code Snippet input (shows if include code is toggled)
  const codeSnippetDiv = document.createElement('div');
  codeSnippetDiv.className = "code-snippet-field";

  const codeSnippetLabel = document.createElement('label');
  codeSnippetLabel.textContent = "Code Snippet:";
  codeSnippetDiv.appendChild(codeSnippetLabel);

  const codeSnippetTextarea = document.createElement('textarea');
  codeSnippetTextarea.className = "code-snippet";
  codeSnippetTextarea.placeholder = "Paste code here (will be saved as .txt if single file).";
  codeSnippetDiv.appendChild(codeSnippetTextarea);

  sectionDiv.appendChild(codeSnippetDiv);

  includeCodeCheckbox.addEventListener('change', () => {
    codeSnippetDiv.style.display = includeCodeCheckbox.checked ? "block" : "none";
  });

  // Step-by-step guide
  const stepGuideLabel = document.createElement('label');
  stepGuideLabel.textContent = "Step-by-Step Guide?";
  sectionDiv.appendChild(stepGuideLabel);

  const stepGuideCheckbox = document.createElement('input');
  stepGuideCheckbox.type = "checkbox";
  stepGuideCheckbox.className = "step-guide";
  sectionDiv.appendChild(stepGuideCheckbox);

  // File Upload
  const fileLabel = document.createElement('label');
  fileLabel.textContent = "File Upload (Pictures/txt documents):";
  sectionDiv.appendChild(fileLabel);

  const fileInput = document.createElement('input');
  fileInput.type = "file";
  fileInput.multiple = true;
  fileInput.className = "section-file";
  sectionDiv.appendChild(fileInput);

  // Keep track of uploaded files in the DOM element
  sectionDiv._files = [];

  fileInput.addEventListener('change', () => {
    sectionDiv._files = Array.from(fileInput.files);
  });

  // Notes
  const noteLabel = document.createElement('label');
  noteLabel.textContent = "Notes:";
  sectionDiv.appendChild(noteLabel);

  // Container for multiple note fields
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
    notesContainer.appendChild(noteBlock);
  });
  sectionDiv.appendChild(addNoteBtn);

  // Nested sections
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

  // Horizontal rule
  sectionDiv.appendChild(document.createElement('hr'));

  // If data was passed (importing from blog.json), fill it
  if (data) {
    if (data.type) typeSelect.value = data.type;
    if (data.title) titleInput.value = data.title;
    if (data.text) textDiv.innerHTML = revertCodeTags(data.text);
    if (data.codeAttach) {
      includeCodeCheckbox.checked = true;
      codeSnippetDiv.style.display = "block";
    }
    if (data.stepByStepGuide) {
      stepGuideCheckbox.checked = true;
    }
    // picture handled on final export (files can't be auto-populated)
    // notes
    if (Array.isArray(data.note)) {
      // multiple notes
      data.note.forEach(nt => {
        const noteBlock = document.createElement('div');
        noteBlock.className = "note-block";
        const noteArea = document.createElement('textarea');
        noteArea.value = nt;
        noteBlock.appendChild(noteArea);
        notesContainer.appendChild(noteBlock);
      });
    } else if (typeof data.note === "string" && data.note.trim()) {
      // single note
      const noteBlock = document.createElement('div');
      noteBlock.className = "note-block";
      const noteArea = document.createElement('textarea');
      noteArea.value = data.note;
      noteBlock.appendChild(noteArea);
      notesContainer.appendChild(noteBlock);
    }
    // nested sections
    if (Array.isArray(data.data)) {
      data.data.forEach(nestedData => {
        addSection(nestedContainer, nestedData);
      });
    }
  }

  parentContainer.appendChild(sectionDiv);
}

// Convert the user-supplied text (which may contain &lt;code&gt;) back to literal <code>
function revertCodeTags(html) {
  // We assume the text stored in JSON is something like <code>my &lt;stuff&gt;</code>
  // We want to show actual code tags in the editor
  // We'll just let the browser parse them, but we want to keep < and > in code
  // If the user had replaced them, we can rely on the fact that the HTML parser will interpret &lt; and &gt; as < and >
  // So we just return the raw HTML. The <code> tags themselves will remain.
  return html;
}


/**************************************************************
 * 3. GATHER SECTION DATA RECURSIVELY
 **************************************************************/
function gatherSectionData(sectionDiv) {
  const secData = {};
  // Type
  secData.type = sectionDiv.querySelector('.section-type').value;
  // Title
  const t = sectionDiv.querySelector('.section-title').value.trim();
  secData.title = t || null;
  // Text
  let textHtml = sectionDiv.querySelector('.section-text').innerHTML;
  // Replace < and > inside <code> blocks
  textHtml = processCodeTags(textHtml);
  secData.text = textHtml || "";

  // codeAttach
  const includeCode = sectionDiv.querySelector('.include-code').checked;
  if (includeCode) secData.codeAttach = true;

  // stepByStepGuide
  const stepGuide = sectionDiv.querySelector('.step-guide').checked;
  if (stepGuide) secData.stepByStepGuide = true;

  // code snippet
  const snippetField = sectionDiv.querySelector('.code-snippet');
  const codeSnippet = snippetField ? snippetField.value.trim() : "";
  if (codeSnippet) {
    // We'll store it in a separate file if single or in array if multiple
    // (We will rename on export)
    sectionDiv._codeSnippet = codeSnippet;
  }

  // notes
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

  // nested sections
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

// Replace < and > inside <code> tags with &lt; &gt;
function processCodeTags(html) {
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

  // Determine final subject
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

  // Build blog.json
  const blogJson = {
    headers: {
      created: now,
      updated: now,
      updateHistory: [now],
      title: blogTitle,
      picture: null,
      author: "Seon Kim",
      subject: finalSubject
    },
    data: []
  };

  // Gather top-level sections
  const topSections = document.querySelectorAll('#sectionsContainer > .section-block');
  topSections.forEach(sec => {
    blogJson.data.push(gatherSectionData(sec));
  });

  // Create ZIP
  const zip = new JSZip();
  const mainFolder = zip.folder(folderName);
  mainFolder.file("blog.json", JSON.stringify(blogJson, null, 2));

  // pictures folder
  const picturesFolder = mainFolder.folder("pictures");

  // We'll do a second pass to handle file naming logic
  // If codeAttach = false, single file => no extension
  // If codeAttach = false, multiple => array no extension
  // If codeAttach = true, single => no extension in JSON, physically .txt
  // If codeAttach = true, multiple => array with extension
  // Also handle code snippet if single code file or multiple code files.

  // We'll store a global file index to avoid collisions
  let globalFileIndex = 1;

  function exportSectionFiles(sec, sectionDiv) {
    // code snippet?
    if (sectionDiv._codeSnippet) {
      // If there's also ._files, we handle them all
      // The snippet might become a single file or be part of multiPicture
      // We do a special approach:
      //   If there's 1 total file + snippet => 2 => multiple
      //   If there's 0 total file + snippet => 1 => single
      //   If there's multiple files + snippet => multiple
      // We'll unify them in an array if needed
    }

    const files = sectionDiv._files || [];
    const snippet = sectionDiv._codeSnippet || "";

    // Determine total item count
    const totalItems = files.length + (snippet ? 1 : 0);

    if (totalItems === 0) {
      // no files, do nothing
      sec.picture = "";
    } else if (totalItems === 1) {
      // single item
      if (files.length === 1) {
        // single uploaded file
        const fileObj = files[0];
        if (sec.codeAttach) {
          // physically rename with extension .txt
          // JSON: "picture":"filename" (no extension)
          const baseName = fileObj.name.replace(/\.[^/.]+$/, "");
          sec.picture = baseName; // no extension in JSON
          const newFileName = baseName + ".txt";
          picturesFolder.file(newFileName, fileObj.file);
        } else {
          // codeAttach = false
          // JSON: "picture":"filename" (no extension)
          const baseName = fileObj.name.replace(/\.[^/.]+$/, "");
          sec.picture = baseName;
          picturesFolder.file(baseName, fileObj.file);
        }
      } else {
        // snippet only
        if (sec.codeAttach) {
          // physically store snippet as snippetX.txt
          const snippetFileName = "snippet" + (globalFileIndex++) + ".txt";
          sec.picture = snippetFileName.replace(".txt", ""); // no extension in JSON
          picturesFolder.file(snippetFileName, snippet);
        } else {
          // codeAttach = false but there's a snippet? Typically codeAttach should be true if there's a snippet, but let's handle gracefully
          const snippetFileName = "snippet" + (globalFileIndex++) + ".txt";
          sec.picture = snippetFileName.replace(".txt", "");
          picturesFolder.file(snippetFileName, snippet);
        }
      }
    } else {
      // multiple items
      sec.multiPicture = true;
      sec.picture = [];
      // If codeAttach is true, we store each item with extension in the array
      // If codeAttach is false, we store each item without extension
      // For snippet, we do snippetX.txt if codeAttach is true, else snippetX
      if (snippet) {
        if (sec.codeAttach) {
          const snippetFileName = "snippet" + (globalFileIndex++) + ".txt";
          sec.picture.push(snippetFileName);
          picturesFolder.file(snippetFileName, snippet);
        } else {
          const snippetFileName = "snippet" + (globalFileIndex++);
          sec.picture.push(snippetFileName);
          picturesFolder.file(snippetFileName, snippet);
        }
      }
      files.forEach(f => {
        const baseName = f.name.replace(/\.[^/.]+$/, "");
        if (sec.codeAttach) {
          // keep extension from original or force .txt? The instructions say:
          // "Inside the array all file extension me specified if codeAttach is set to true."
          // We'll use the original extension from the file if any.
          // If the user wants to attach code as .txt, they'd presumably have that extension. 
          // We'll guess we keep the original extension to meet "Inside the array all file extension be specified if codeAttach is set to true."
          const extMatch = f.name.match(/(\.[^/.]+)$/);
          let ext = extMatch ? extMatch[1] : ".txt";
          const newFileName = baseName + ext;
          sec.picture.push(newFileName);
          picturesFolder.file(newFileName, f.file);
        } else {
          // codeAttach = false => no extension
          sec.picture.push(baseName);
          picturesFolder.file(baseName, f.file);
        }
      });
    }

    // handle nested
    if (sec.data && Array.isArray(sec.data)) {
      const nestedBlocks = sectionDiv.querySelector('.nested-sections-container').querySelectorAll(':scope > .section-block');
      for (let i = 0; i < sec.data.length; i++) {
        exportSectionFiles(sec.data[i], nestedBlocks[i]);
      }
    }
  }

  // Recursively handle all sections
  function handleSections(dataArr, container) {
    const blocks = container.querySelectorAll(':scope > .section-block');
    dataArr.forEach((sec, i) => {
      exportSectionFiles(sec, blocks[i]);
      // nested sections are handled within exportSectionFiles
    });
  }

  handleSections(blogJson.data, document.getElementById('sectionsContainer'));

  // Generate ZIP
  zip.generateAsync({type:"blob"}).then(content => {
    saveAs(content, folderName + ".zip");
  });
});


/**************************************************************
 * 5. DOWNLOAD main.json
 **************************************************************/
document.getElementById('downloadMainJsonBtn').addEventListener('click', async () => {
  // Attempt to load existing main.json, then update it
  let existingSubjects = [];
  try {
    const response = await fetch('./main.json');
    if (response.ok) {
      const data = await response.json();
      if (data["all-subjects"] && Array.isArray(data["all-subjects"])) {
        existingSubjects = data["all-subjects"];
      }
    }
  } catch (e) {
    console.log("No existing main.json found, will create a new one.");
  }

  const subjectSelect = document.getElementById('blogSubjectSelect');
  const newSubjectInput = document.getElementById('newSubjectInput');

  let finalSubject = subjectSelect.value;
  if (finalSubject === "__add_new__") {
    finalSubject = newSubjectInput.value.trim();
  }

  // If finalSubject is non-empty and not in existingSubjects, push it
  if (finalSubject && !existingSubjects.includes(finalSubject)) {
    existingSubjects.push(finalSubject);
  }

  const mainJson = { "all-subjects": existingSubjects };
  const blob = new Blob([JSON.stringify(mainJson, null, 2)], {type: "application/json"});
  saveAs(blob, "main.json");
});


/**************************************************************
 * 6. IMPORT BLOG (blog.json) -> Populate Fields
 **************************************************************/
document.getElementById('importBlogBtn').addEventListener('click', () => {
  document.getElementById('importBlogInput').click();
});

document.getElementById('importBlogInput').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const text = await file.text();
    const blogData = JSON.parse(text);
    // Fill the main fields
    if (blogData.headers) {
      if (blogData.headers.title) {
        document.getElementById('blogTitle').value = blogData.headers.title;
      }
      if (blogData.headers.subject) {
        const subjectSelect = document.getElementById('blogSubjectSelect');
        // Attempt to select the subject if it exists
        let found = false;
        for (let i = 0; i < subjectSelect.options.length; i++) {
          if (subjectSelect.options[i].value === blogData.headers.subject) {
            subjectSelect.selectedIndex = i;
            found = true;
            break;
          }
        }
        if (!found) {
          // If not found, choose "Add New Subject..." and fill it
          subjectSelect.value = "__add_new__";
          document.getElementById('newSubjectInput').style.display = "block";
          document.getElementById('newSubjectInput').value = blogData.headers.subject;
        }
      }
    }
    // Clear existing sections
    document.getElementById('sectionsContainer').innerHTML = "";
    // Add sections from data
    if (Array.isArray(blogData.data)) {
      blogData.data.forEach(sec => {
        addSection(document.getElementById('sectionsContainer'), sec);
      });
    }
  } catch (err) {
    alert("Failed to parse blog.json file. Error: " + err);
  }
});
