/**************************************************************
 * 1. LOAD SUBJECTS FROM CONFIG.JS ON PAGE LOAD
 *    AND POPULATE THE SUBJECT SELECT
 **************************************************************/
window.addEventListener('DOMContentLoaded', () => {
  const subjectSelect = document.getElementById('blogSubjectSelect');
  const newSubjectInput = document.getElementById('newSubjectInput');

  // Load subjects from config.js (mainData)
  if (typeof mainData !== 'undefined' && mainData["all-subjects"] && Array.isArray(mainData["all-subjects"])) {
    mainData["all-subjects"].forEach(subj => {
      const option = document.createElement('option');
      option.value = subj;
      option.textContent = subj;
      subjectSelect.appendChild(option);
    });
  } else {
    console.log("mainData not defined in config.js");
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
["overview", "small-section", "medium-section", "large-section", "conclusion"].forEach(opt => {
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
  // notes
  if (Array.isArray(data.note)) {
    data.note.forEach(nt => {
      const noteBlock = document.createElement('div');
      noteBlock.className = "note-block";
      const noteArea = document.createElement('textarea');
      noteArea.value = nt;
      noteBlock.appendChild(noteArea);
      notesContainer.appendChild(noteBlock);
    });
  } else if (typeof data.note === "string" && data.note.trim()) {
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

// Convert the user-supplied text (which may contain <code>) back to literal <code>
function revertCodeTags(html) {
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

// Replace < and > inside <code> tags with HTML entities
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

// Build blog.json structure
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

// Prepare ZIP
const zip = new JSZip();
const mainFolder = zip.folder(folderName);
const picturesFolder = mainFolder.folder("pictures");
let globalFileIndex = 1;

// Function to process section attachments and ensure the "picture" field is always set
function exportSectionFiles(sec, sectionDiv) {
  // Get all attached files (as File objects) and any code snippet.
  const files = sectionDiv._files || [];
  const snippet = sectionDiv._codeSnippet || "";
  const totalItems = files.length + (snippet ? 1 : 0);

  // No attachment at all.
  if (totalItems === 0) {
    sec.picture = ""; // Always set picture key, even if empty.
  }
  // Single attachment (either one file OR one snippet)
  else if (totalItems === 1) {
    // CASE 1: There's one file attached.
    if (files.length === 1) {
      const fileObj = files[0];
      const fileName = fileObj.name;
      const dotIndex = fileName.lastIndexOf('.');
      const baseName = dotIndex !== -1 ? fileName.substring(0, dotIndex) : fileName;
      // In blog.json, reference either the full fileName or the forced .txt version.
      if (sec.codeAttach) {
        const newFileName = baseName + ".txt";
        sec.picture = newFileName.replace(".txt", "");
        picturesFolder.file(newFileName, fileObj);
      } else {
        sec.picture = fileName;
        picturesFolder.file(fileName, fileObj);
      }
    }
    // CASE 2: There's only a snippet.
    else {
      if (sec.codeAttach) {
        const snippetFileName = "snippet" + (globalFileIndex++) + ".txt";
        sec.picture = snippetFileName.replace(".txt", "");
        picturesFolder.file(snippetFileName, snippet);
      } else {
        const snippetFileName = "snippet" + (globalFileIndex++);
        sec.picture = snippetFileName;
        picturesFolder.file(snippetFileName, snippet);
      }
    }
  }
  // Multiple attachments (files and/or snippet)
  else {
    sec.multiPicture = true;
    sec.picture = []; // Will be an array of references

    // If a snippet exists, process it first.
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

    // Process each attached file.
    files.forEach(fileObj => {
      const fileName = fileObj.name;
      const dotIndex = fileName.lastIndexOf('.');
      const baseName = dotIndex !== -1 ? fileName.substring(0, dotIndex) : fileName;

      if (sec.codeAttach) {
        const ext = dotIndex !== -1 ? fileName.substring(dotIndex) : ".txt";
        const newFileName = baseName + ext;
        sec.picture.push(newFileName);
        picturesFolder.file(newFileName, fileObj);
      } else {
        sec.picture.push(fileName);
        picturesFolder.file(fileName, fileObj);
      }
    });
  }

  // Process nested sections recursively.
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

// Process top-level and nested sections to update picture references.
function handleSections(dataArr, container) {
  const blocks = container.querySelectorAll(':scope > .section-block');
  dataArr.forEach((sec, i) => {
    exportSectionFiles(sec, blocks[i]);
  });
}

// First process every section to set the "picture" field
handleSections(blogJson.data, document.getElementById('sectionsContainer'));

// Now create blog.json with the updated data.
mainFolder.file("blog.json", JSON.stringify(blogJson, null, 2));

// Generate ZIP
zip.generateAsync({ type: "blob" }).then(content => {
  saveAs(content, folderName + ".zip");
});
});


/**************************************************************
* 5. DOWNLOAD main.json
**************************************************************/
document.getElementById('downloadMainJsonBtn').addEventListener('click', () => {
let existingSubjects = [];
if (typeof mainData !== 'undefined' && mainData["all-subjects"] && Array.isArray(mainData["all-subjects"])) {
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
  document.getElementById('sectionsContainer').innerHTML = "";
  if (Array.isArray(blogData.data)) {
    blogData.data.forEach(sec => {
      addSection(document.getElementById('sectionsContainer'), sec);
    });
  }
} catch (err) {
  alert("Failed to parse blog.json file. Error: " + err);
}
});
