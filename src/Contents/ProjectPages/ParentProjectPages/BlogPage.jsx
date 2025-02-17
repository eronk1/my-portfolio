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
        <h1 dangerouslySetInnerHTML={createMarkup(headers.title)} />
        {headers.subject && (
          <h2 dangerouslySetInnerHTML={createMarkup(headers.subject)} />
        )}
      </TitleText>

      {data.map((section, idx) => (
        // Mark top-level sections as "isRoot"
        <RenderSection
          key={idx}
          section={section}
          getImage={getImage}
          isRoot={true}
        />
      ))}

      {related.length > 0 && (
        <LargeSection>
          <MediumSection>
            <MediumText>Related Articles</MediumText>
            <ul>
              {related.map((ra, i) => (
                <a href={ra} key={i}>
                  {ra}
                </a>
              ))}
            </ul>
          </MediumSection>
        </LargeSection>
      )}
    </div>
  );
}

function RenderSection({ section, getImage, isRoot = false }) {
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

  // Renders text with code tags recognized as HTML <code>
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
    if (!src)
      return <SmallText key={key}>Image not found: {finalFile}</SmallText>;
    return <ImgSec key={key} ImgSrc={src} />;
  }

  // Renders notes with potential code tags processed
  const renderNotes = () => {
    if (!note) return null;
    if (multiLineNotes && Array.isArray(note)) {
      return note.map((n, i) => (
        <SmallText key={i} note>
          <strong style={{fontWeight: 700}}>Note:</strong>{' '}
          <span dangerouslySetInnerHTML={createMarkup(n)} />
        </SmallText>
      ));
    }
    if (typeof note === 'string' && note.trim()) {
      return (
        <SmallText note>
          <strong style={{fontWeight: 800}}>Note:</strong>{' '}
          <span dangerouslySetInnerHTML={createMarkup(note)} />
        </SmallText>
      );
    }
    return null;
  };

  // New helper function to render nested sections.
  // If "stepByStepGuide" is true, it will display a "Steps" header and list each step with "Step 1", "Step 2", etc.
  const renderNestedSections = () => {
    if (!Array.isArray(nestedData)) return null;
    if (stepByStepGuide) {
      return (
        <>
          {nestedData.map((child, i) => (
            <MediumSection key={i}>
              <MediumText>Step {i + 1}</MediumText>
              <RenderSection section={child} getImage={getImage} isRoot={false} />
            </MediumSection>
          ))}
        </>
      );
    } else {
      return nestedData.map((child, i) => (
        <RenderSection key={i} section={child} getImage={getImage} isRoot={false} />
      ));
    }
  };

  // Check if the entire section is empty
  function isSectionEmpty({ title, text, picture, note, data, codeAttach }) {
    const hasTitle = !!title?.trim();
    const hasText = !!text?.trim();
    const hasPicture =
      picture !== undefined &&
      picture !== null &&
      (Array.isArray(picture)
        ? picture.length > 0
        : picture.trim?.() !== '');
    const hasNote =
      note !== undefined &&
      note !== null &&
      (Array.isArray(note)
        ? note.length > 0
        : note.trim?.() !== '');
    const hasNested = Array.isArray(data) && data.length > 0;
    const hasCommand = !!codeAttach; // "command" means codeAttach

    // If none of these are present, the section is "empty"
    return !(hasTitle || hasText || hasPicture || hasNote || hasNested || hasCommand);
  }

  // If the section is empty, return null
  if (isSectionEmpty(section)) return null;

  // Depending on the section type and whether it has a parent,
  // we conditionally choose the header element and container.
  switch (type) {
    case 'overview':
      return (
        <LargeSection>
          {title ? (
            <LargeText>
              <span dangerouslySetInnerHTML={createMarkup(title)} />
            </LargeText>
          ) : (
            <LargeText>Overview</LargeText>
          )}
          <MediumSection>
            {renderText}
            {renderPicture()}
          </MediumSection>
        </LargeSection>
      );
    case 'small-section':
      if (isRoot) {
        return (
          <LargeSection>
            {title && (
              <LargeText>
                <span dangerouslySetInnerHTML={createMarkup(title)} />
              </LargeText>
            )}
            {renderText}
            {renderPicture()}
            {renderNotes()}
            {renderNestedSections()}
          </LargeSection>
        );
      } else {
        return (
            <MediumSection>
              {title && (
                <MediumText>
                  <span dangerouslySetInnerHTML={createMarkup(title)} />
                </MediumText>
              )}
              {renderText}
              {renderPicture()}
              {renderNotes()}
              {renderNestedSections()}
            </MediumSection>
        );
      }
    case 'medium-section':
      if (isRoot) {
        return (
          <LargeSection>
            {title && (
              <LargeText>
                <span dangerouslySetInnerHTML={createMarkup(title)} />
              </LargeText>
            )}
            {renderText}
            {renderPicture()}
            {renderNotes()}
            {renderNestedSections()}
          </LargeSection>
        );
      } else {
        return (
            <MediumSection>
              {title && (
                <MediumText>
                  <span dangerouslySetInnerHTML={createMarkup(title)} />
                </MediumText>
              )}
              {renderText}
              {renderPicture()}
              {renderNotes()}
              {renderNestedSections()}
            </MediumSection>
        );
      }
    case 'large-section':
      return (
        <LargeSection>
          {title && (
            <LargeText>
              <span dangerouslySetInnerHTML={createMarkup(title)} />
            </LargeText>
          )}
            <MediumSection>
              {renderText}
              {renderPicture()}
              {renderNotes()}
              {renderNestedSections()}
            </MediumSection>
        </LargeSection>
      );
    case 'section':
      // Modified to apply the "small-section" style
      if (isRoot) {
        return (
          <LargeSection>
            {title && (
              <LargeText>
                <span dangerouslySetInnerHTML={createMarkup(title)} />
              </LargeText>
            )}
            <MediumSection>
              {renderText}
              {renderPicture()}
              {renderNotes()}
              {renderNestedSections()}
            </MediumSection>
          </LargeSection>
        );
      } else {
        return (
            <MediumSection>
              {title && (
                <MediumText>
                  <span dangerouslySetInnerHTML={createMarkup(title)} />
                </MediumText>
              )}
              {renderText}
              {renderPicture()}
              {renderNotes()}
              {renderNestedSections()}
            </MediumSection>
        );
      }
    case 'conclusion':
      if (isRoot) {
        return (
          <LargeSection>
            <MediumSection>
              {title ? (
                <MediumText>
                  <span dangerouslySetInnerHTML={createMarkup(title)} />
                </MediumText>
              ) : (
                <MediumText>Conclusion</MediumText>
              )}
              {renderText}
              {renderPicture()}
            </MediumSection>
          </LargeSection>
        );
      } else {
        return (
            <MediumSection>
              {title && (
                <MediumText>
                  <span dangerouslySetInnerHTML={createMarkup(title)} />
                </MediumText>
              )}
              {renderText}
              {renderPicture()}
            </MediumSection>
        );
      }
    default:
      return (
        <MediumSection>
          <SmallText>Unsupported section type: {type}</SmallText>
        </MediumSection>
      );
  }
}
