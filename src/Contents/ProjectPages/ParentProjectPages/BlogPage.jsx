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

export default function BlogPage({ blogFolder }) {
  // Find the correct blog by folderName
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
    <div style={{ padding: '0.5rem' }}>
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

  const renderText = text ? <SmallText>{text}</SmallText> : null;

  // Renders images or code
  const renderPicture = () => {
    if (!picture) return null;
    if (multiPicture && Array.isArray(picture)) {
      return picture.map((picFile, i) => renderSingle(picFile, i));
    }
    return renderSingle(picture);
  };

  function renderSingle(picFile, key) {
    if (codeAttach && picFile.toLowerCase().endsWith('.txt')) {
      // If we truly want to fetch the text content, you'd do a fetch or dynamic import.
      return (
        <CodeBlock
          key={key}
          codeString={`(Code file: ${picFile}) -- load contents via fetch if needed`}
        />
      );
    }
    const src = getImage(picFile) || null;
    if (!src) return <SmallText key={key}>Image not found: {picFile}</SmallText>;
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
        <div style={{ margin: '1rem 0' }}>
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
        <div style={{ margin: '0.5rem 0' }}>
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
        <div style={{ margin: '0.5rem', color: 'gray' }}>
          <SmallText>Unsupported section type: {type}</SmallText>
        </div>
      );
  }
}
