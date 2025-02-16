import React from 'react';
import {
  SmallText,
  MediumText,
  LargeText,
  TitleText,
  MediumSection,
  LargeSection,
  ImgSec
} from './ProjectPagesElements.jsx';
import { allBlogs } from './blogsAggregator.jsx';

/** Minimal code block example */
function CodeBlock({ codeString }) {
  return (
    <pre
      style={{
        background: '#f5f5f5',
        padding: '1rem',
        overflowX: 'auto',
        border: '1px solid #ccc'
      }}
    >
      <code>{codeString}</code>
    </pre>
  );
}

// 1) A helper that finds <code>...</code> in your text.
// 2) It replaces any < or > inside that block with &lt; or &gt;,
//    but leaves the actual <code> tags intact.
function escapeCodeInText(rawText) {
  if (!rawText) return '';
  return rawText.replace(/<code>([\s\S]*?)<\/code>/g, (match, p1) => {
    // Escape < and >
    const escapedContent = p1.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<code>${escapedContent}</code>`;
  });
}

// Use dangerouslySetInnerHTML with the result of escapeCodeInText
function createMarkup(text) {
  const safeHtml = escapeCodeInText(text);
  return { __html: safeHtml };
}

export default function BlogPage({ blogFolder }) {
  const blogObj = allBlogs.find(b => b.folderName === blogFolder);
  if (!blogObj) {
    return (
      <div style={{ padding: '1rem', color: 'red' }}>
        <h2>Blog not found: {blogFolder}</h2>
      </div>
    );
  }

  const { data: blogData, getImage } = blogObj;
  const { headers, data = [], 'related-articles': related = [] } = blogData;

  return (
    <div>
      <TitleText backC="#343b4f">
        <h1>{headers.title}</h1>
        {headers.subject && <h2>{headers.subject}</h2>}
      </TitleText>

      {data.map((section, idx) => (
        <RenderSection key={idx} section={section} getImage={getImage} />
      ))}

      {related.length > 0 && (
        <LargeSection>
          <MediumText>Related Articles</MediumText>
          <ul>
            {related.map((ra, i) => (
              <li key={i}>{ra}</li>
            ))}
          </ul>
        </LargeSection>
      )}
    </div>
  );
}

function RenderSection({ section, getImage }) {
  const {
    type,
    title,
    text,
    picture,
    stepByStepGuide,
    codeAttach,
    multiPicture,
    multiLineNotes,
    data: nestedData,
    note
  } = section;

  // Renders text with code tags recognized as HTML <code>:
  const renderText = text ? (
    <SmallText>
      <span dangerouslySetInnerHTML={createMarkup(text)} />
    </SmallText>
  ) : null;

  // Helper to append extension if missing
  function appendExtension(fileName) {
    if (/\.[a-zA-Z0-9]+$/.test(fileName)) {
      return fileName;
    }
    return codeAttach ? fileName + '.txt' : fileName + '.png';
  }

  // Renders images (or code if codeAttach is true)
  const renderPicture = () => {
    if (!picture) return null;
    if (multiPicture && Array.isArray(picture)) {
      return picture.map((picFile, i) => renderSingle(picFile, i));
    }
    return renderSingle(picture);
  };

  function renderSingle(picFile, key) {
    // Append extension if missing
    const finalFile = appendExtension(picFile);

    if (codeAttach && finalFile.toLowerCase().endsWith('.txt')) {
      // If we truly want to fetch the text content, you'd do a fetch or dynamic import.
      return (
        <CodeBlock
          key={key}
          codeString={`(Code file: ${finalFile}) -- load content via fetch if needed`}
        />
      );
    }
    const src = getImage(finalFile) || null;
    if (!src) return <SmallText key={key}>Image not found: {finalFile}</SmallText>;
    return <ImgSec key={key} ImgSrc={src} />;
  }

  const renderNotes = () => {
    if (!note) return null;
    if (multiLineNotes && Array.isArray(note)) {
      return note.map((n, i) => (
        <SmallText key={i}>
          <strong>Note:</strong> {n}
        </SmallText>
      ));
    }
    if (typeof note === 'string' && note.trim()) {
      return (
        <SmallText>
          <strong>Note:</strong> {note}
        </SmallText>
      );
    }
    return null;
  };

  const renderNested = () => {
    if (stepByStepGuide && Array.isArray(nestedData)) {
      return nestedData.map((child, i) => (
        <RenderSection key={i} section={child} getImage={getImage} />
      ));
    }
    return null;
  };

  // Check if the entire section is empty
  function isSectionEmpty({ title, text, picture, note, data, codeAttach }) {
    const hasTitle = !!title?.trim();
    const hasText = !!text?.trim();
    const hasPicture =
      picture !== undefined &&
      picture !== null &&
      (Array.isArray(picture) ? picture.length > 0 : picture.trim?.() !== '');
    const hasNote =
      note !== undefined &&
      note !== null &&
      (Array.isArray(note) ? note.length > 0 : note.trim?.() !== '');
    const hasNested = Array.isArray(data) && data.length > 0;
    const hasCommand = !!codeAttach; // "command" means codeAttach

    // If none of these are present, the section is "empty"
    return !(hasTitle || hasText || hasPicture || hasNote || hasNested || hasCommand);
  }

  // If the section is empty, return null
  if (isSectionEmpty(section)) return null;

  // Otherwise, switch on the "type" to determine the layout
  switch (type) {
    case 'overview':
      return (
        <LargeSection>
          {title && <MediumText>{title}</MediumText>}
          {renderText}
          {renderPicture()}
        </LargeSection>
      );
    case 'small-section':
      return (
        <div>
          {title && <MediumText>{title}</MediumText>}
          {renderText}
          {renderPicture()}
          {renderNotes()}
          {nestedData &&
            nestedData.map((child, i) => (
              <RenderSection key={i} section={child} getImage={getImage} />
            ))}
        </div>
      );
    case 'medium-section':
      return (
        <LargeSection>
          <MediumSection>
            {title && <MediumText>{title}</MediumText>}
            {renderText}
            {renderPicture()}
            {renderNotes()}
            {renderNested()}
          </MediumSection>
        </LargeSection>
      );
    case 'large-section':
      return (
        <LargeSection>
          {title && <LargeText>{title}</LargeText>}
          {renderText}
          {renderPicture()}
          {renderNotes()}
          {nestedData &&
            nestedData.map((child, i) => (
              <RenderSection key={i} section={child} getImage={getImage} />
            ))}
        </LargeSection>
      );
    case 'section':
      return (
        <div>
          {renderText}
          {renderPicture()}
          {renderNotes()}
          {nestedData &&
            nestedData.map((child, i) => (
              <RenderSection key={i} section={child} getImage={getImage} />
            ))}
        </div>
      );
    case 'conclusion':
      return (
        <LargeSection>
          {title && <MediumText>{title}</MediumText>}
          {renderText}
          {renderPicture()}
        </LargeSection>
      );
    default:
      return (
        <div>
          <SmallText>Unsupported section type: {type}</SmallText>
        </div>
      );
  }
}
