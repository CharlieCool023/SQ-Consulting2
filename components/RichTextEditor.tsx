import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder
}) => {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'blockquote', 'code-block',
    'list',
    'color', 'background',
    'link'
  ];

  return (
    <div className="rich-text-editor">
      <style>{`
        .rich-text-editor .ql-toolbar {
          background-color: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-bottom: none !important;
          border-radius: 11px 11px 0 0 !important;
        }
        .rich-text-editor .ql-container {
          background-color: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-top: none !important;
          border-radius: 0 0 11px 11px !important;
          font-family: inherit;
        }
        .rich-text-editor .ql-editor {
          min-height: 200px;
          color: white;
          font-size: 16px;
        }
        .rich-text-editor .ql-editor.ql-blank::before {
          color: rgba(100, 116, 139, 0.5);
          font-style: italic;
        }
        .rich-text-editor .ql-toolbar button:hover,
        .rich-text-editor .ql-toolbar button:focus,
        .rich-text-editor .ql-toolbar button.ql-active {
          color: #8b5cf6 !important;
        }
        .rich-text-editor .ql-toolbar button:hover svg,
        .rich-text-editor .ql-toolbar button:focus svg,
        .rich-text-editor .ql-toolbar button.ql-active svg {
          stroke: #8b5cf6 !important;
        }
        .rich-text-editor .ql-stroke {
          stroke: rgba(255, 255, 255, 0.6) !important;
        }
        .rich-text-editor .ql-fill {
          fill: rgba(255, 255, 255, 0.6) !important;
        }
        .rich-text-editor .ql-picker-label {
          color: rgba(255, 255, 255, 0.6) !important;
        }
        .rich-text-editor .ql-picker-item:hover,
        .rich-text-editor .ql-picker-item.ql-selected {
          color: #8b5cf6 !important;
        }
        .rich-text-editor .ql-editor {
          padding: 12px 16px;
        }
      `}</style>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder || 'Start typing...'}
      />
    </div>
  );
};
