/*
 * Created on Tue Jul 8 2022
 *
 * Author: Siddharth Kharwar
 */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Editable, withReact, Slate } from "slate-react";
import { withHistory } from "slate-history";
import { Editor, createEditor, Text, Node } from "slate";
import { ToggleButton, ToggleButtonGroup, Stack, Button } from "@mui/material";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
} from "@mui/icons-material/";

import "./style.css";
import escapeHTML from "escape-html";

const RichTextInput = ({ value, setValue, style, readOnly }) => {
  const allFormats = ["bold", "italic", "underline"];
  const [formats, setFormats] = useState([]);

  useEffect(() => {
    allFormats.forEach((format) => {
      if (formats.includes(format)) {
        Editor.addMark(editor, format, true);
      } else {
        Editor.removeMark(editor, format);
      }
    });
  }, [formats]);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <div className="rich-text-container">
        <Stack style={{ position: "sticky" }}>
          {!readOnly && (
            <ToggleButtonGroup
              value={formats}
              onChange={handleFormat}
              aria-label="Text Formatting"
            >
              <ToggleButton value="bold" aria-label="bold">
                <FormatBold />
              </ToggleButton>
              <ToggleButton value="italic" aria-label="italic">
                <FormatItalic />
              </ToggleButton>
              <ToggleButton value="underline" aria-label="underline">
                <FormatUnderlined />
              </ToggleButton>
            </ToggleButtonGroup>
          )}

          <Editable
            renderLeaf={renderLeaf}
            placeholder={"Your rich Blog here"}
            spellCheck
            autoFocus
            readOnly={readOnly}
            style={style}
          />
        </Stack>
      </div>
    </Slate>
  );
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

export const serializePlainText = (nodes) => {
  return nodes.map((n) => Node.string(n)).join("\n");
};

export const serialize = (node) => {
  if (Text.isText(node)) {
    let string = escapeHTML(node.text);
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }
    if (node.code) {
      string = `<code>${string}</code>`;
    }
    if (node.italic) {
      string = `<em>${string}</em>`;
    }
    if (node.underline) {
      string = `<u>${string}</u>`;
    }
    return string;
  }
  if (node && node.children) {
    const children = node.children.map((n) => serialize(n)).join("");

    switch (node.type) {
      case "paragraph":
        return `<p>${children}</p>`;
      default:
        return children;
    }
  }
};

export default RichTextInput;
