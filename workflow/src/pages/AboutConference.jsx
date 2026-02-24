import { useRef, useCallback, useState, useEffect } from 'react';
import {
    Bold, Italic, Underline, Strikethrough,
    List, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify,
    Link, Code, Minus, Type,
    ChevronDown, Check
} from 'lucide-react';

/* ─── Pre-filled content ─────────────────────────────────────── */
const INITIAL_CONTENT = `<p><strong>Dear Esteemed Participants,</strong></p>

<p>It is with great joy and enthusiasm that we extend a warm invitation to participants from around the world to join us for the <strong>2nd International Meet and Expo on Renewable and Sustainable Energy (RENEWABLEMEET2026)</strong>, taking place in <strong>Rome, Italy, from May 25–26, 2026</strong>.</p>

<p>Following the resounding success of <strong>RENEWABLEMEET2025</strong>, held in <strong>Zurich, Switzerland</strong>, where we were honored to host a distinguished lineup of high-profile speakers, including leading <strong>professors, CEOs, researchers, and industry experts</strong>, we are thrilled to continue this journey with the next edition of the conference.</p>

<p>The theme for RENEWABLEMEET2026, <strong>"Empowering a Greener Future through Renewable and Sustainable Energy,"</strong> aims to bring together visionaries, innovators, and scholars from across the globe. This conference will provide a dynamic platform to explore groundbreaking research and emerging technologies through carefully curated scientific sessions covering <strong>Renewable Energy, Power Energy, Electrical Energy</strong>, and their real-world applications in <strong>industries, research institutes, electronic laboratories, thermal energy plants, and energy grids</strong>.</p>

<p>The future of renewable and sustainable energy has never looked brighter. Don't miss this exceptional opportunity to connect, collaborate, and innovate with the global energy community.</p>

<p><strong>Mark your calendars</strong> for this impactful event that promises to shape the future of sustainable energy. We look forward to welcoming you to <strong>Rome</strong> for an unforgettable experience!</p>

<p>&nbsp;</p>

<p><strong>Warm regards,</strong><br/>
R. Shashika<br/>
<strong>Conference Manager</strong><br/>
<em>Organizing Committee</em><br/>
<strong><em>RENEWABLEMEET2026</em></strong></p>`;

/* ─── Color palette ─────────────────────────────────────────── */
const SWATCHES = [
    ['#000000', '#222222', '#444444', '#666666', '#888888', '#aaaaaa', '#cccccc', '#eeeeee', '#f3f3f3', '#ffffff'],
    ['#ff0000', '#ff4444', '#ff9900', '#ffcc00', '#ffff00', '#00cc00', '#00ffff', '#0000ff', '#9900ff', '#ff00ff'],
    ['#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#cfe2f3', '#d9d2e9', '#ead1dc', '#ea9999', '#f9cb9c'],
    ['#ffe599', '#b6d7a8', '#a2c4c9', '#9fc5e8', '#b4a7d6', '#d5a6bd', '#e06666', '#f6b26b', '#ffd966', '#93c47d'],
    ['#76a5af', '#6fa8dc', '#8e7cc3', '#c27ba0', '#cc0000', '#e69138', '#f1c232', '#6aa84f', '#45818e', '#3d85c6'],
    ['#674ea7', '#a64d79', '#990000', '#b45f06', '#bf9000', '#38761d', '#134f5c', '#0b5394', '#351c75', '#741b47'],
];

/* ─── Shared: save & restore browser text selection ──────────── */
function saveSelection() {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return null;
    return sel.getRangeAt(0).cloneRange();
}
function restoreSelection(range) {
    if (!range) return;
    const sel = window.getSelection();
    if (!sel) return;
    sel.removeAllRanges();
    sel.addRange(range);
}

/* ─── Color Picker Dropdown ─────────────────────────────────── */
const ColorPickerDropdown = ({ execWithSelection, currentColor }) => {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popoverRef.current && !popoverRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const applyColor = (cmd, color) => {
        execWithSelection(cmd, color);
        setIsOpen(false);
    };

    return (
        <div className="color-picker-wrapper" ref={popoverRef}>
            <button
                className={`editor-btn color-trigger-btn${isOpen ? ' active' : ''}`}
                onMouseDown={(e) => { e.preventDefault(); setIsOpen(v => !v); }}
                title="Text & Background Color"
                type="button"
            >
                <div className="color-trigger-inner">
                    <span style={{ fontWeight: 800, fontSize: 15, lineHeight: 1 }}>A</span>
                    <span
                        className="color-indicator-bar"
                        style={{ backgroundColor: currentColor || '#000000' }}
                    />
                </div>
                <ChevronDown size={11} style={{ opacity: 0.6, marginLeft: 2 }} />
            </button>

            {isOpen && (
                <div className="color-popover">
                    <div className="color-panels-container">
                        {/* Background Color */}
                        <div className="color-panel">
                            <div className="color-panel-title">Background Color</div>
                            <button
                                className="color-panel-action"
                                onMouseDown={(e) => { e.preventDefault(); applyColor('hiliteColor', 'transparent'); }}
                            >Transparent</button>
                            <div className="color-grid">
                                {SWATCHES.map((row, i) => (
                                    <div key={`bg-${i}`} className="color-row">
                                        {row.map(color => (
                                            <button
                                                key={`bg-${color}`}
                                                className="color-swatch"
                                                style={{ backgroundColor: color }}
                                                onMouseDown={(e) => { e.preventDefault(); applyColor('hiliteColor', color); }}
                                                title={color}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <button className="color-panel-select-btn" onMouseDown={(e) => e.preventDefault()}>Select</button>
                        </div>

                        {/* Foreground Color */}
                        <div className="color-panel">
                            <div className="color-panel-title">Text Color</div>
                            <button
                                className="color-panel-action"
                                onMouseDown={(e) => { e.preventDefault(); applyColor('foreColor', '#000000'); }}
                            >Reset to default</button>
                            <div className="color-grid">
                                {SWATCHES.map((row, i) => (
                                    <div key={`fg-${i}`} className="color-row">
                                        {row.map(color => (
                                            <button
                                                key={`fg-${color}`}
                                                className="color-swatch"
                                                style={{ backgroundColor: color }}
                                                onMouseDown={(e) => { e.preventDefault(); applyColor('foreColor', color); }}
                                                title={color}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <button className="color-panel-select-btn" onMouseDown={(e) => e.preventDefault()}>Select</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

/* ─── Toolbar Button ─────────────────────────────────────────── */
const Btn = ({ onCmd, title, children, active }) => (
    <button
        className={`editor-btn${active ? ' active' : ''}`}
        onMouseDown={(e) => { e.preventDefault(); onCmd(); }}
        title={title}
        type="button"
    >
        {children}
    </button>
);

/* ─── Separator ─────────────────────────────────────────────── */
const Sep = () => <span className="toolbar-sep" />;

/* ─── Normalize browser color to hex ────────────────────────── */
function normalizeColor(raw) {
    if (!raw || raw === 'transparent' || raw === '') return '#000000';
    // RGB format: rgb(r, g, b)
    const m = raw.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (m) {
        return '#' + [m[1], m[2], m[3]]
            .map(n => parseInt(n).toString(16).padStart(2, '0'))
            .join('');
    }
    return raw.startsWith('#') ? raw : '#000000';
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function AboutConference() {
    const editorRef = useRef(null);
    const savedRangeRef = useRef(null);
    const [currentColor, setCurrentColor] = useState('#000000');

    /* Detect current text color at cursor/selection */
    const detectColor = useCallback(() => {
        savedRangeRef.current = saveSelection();
        const raw = document.queryCommandValue('foreColor');
        setCurrentColor(normalizeColor(raw));
    }, []);

    /* Save selection when user clicks inside editor */
    const handleEditorMouseUp = useCallback(() => { detectColor(); }, [detectColor]);
    const handleEditorKeyUp = useCallback(() => { detectColor(); }, [detectColor]);

    /* Execute command robustly — restores selection first */
    const exec = useCallback((cmd, value = null) => {
        editorRef.current?.focus();
        if (savedRangeRef.current) {
            restoreSelection(savedRangeRef.current);
        }
        document.execCommand(cmd, false, value);
        // Update saved range after command
        savedRangeRef.current = saveSelection();
    }, []);

    /* Wrapper that restores selection — used by color picker */
    const execWithSelection = useCallback((cmd, value) => {
        editorRef.current?.focus();
        if (savedRangeRef.current) {
            restoreSelection(savedRangeRef.current);
        }
        document.execCommand(cmd, false, value);
        savedRangeRef.current = saveSelection();
    }, []);

    /* Font / size dropdowns */
    const handleFontFamily = (e) => {
        e.target.blur(); // remove select focus so editor gets focus back
        exec('fontName', e.target.value);
    };
    const handleFontSize = (e) => {
        e.target.blur();
        exec('fontSize', e.target.value);
    };

    /* Link insertion */
    const insertLink = () => {
        editorRef.current?.focus();
        if (savedRangeRef.current) restoreSelection(savedRangeRef.current);
        const url = prompt('Enter URL:', 'https://');
        if (url && url !== 'https://') {
            document.execCommand('createLink', false, url);
        }
    };

    const handleSubmit = () => {
        const content = editorRef.current?.innerHTML;
        alert('Content submitted successfully!');
        console.log('Submitted:', content);
    };

    return (
        <div className="ac-page">
            {/* Page title */}
            <div className="ac-page-header">
                <h1 className="ac-page-title">ABOUT CONFERENCE</h1>
            </div>

            {/* Editor card */}
            <div className="editor-card">
                {/* Toolbar */}
                <div className="editor-toolbar">
                    {/* Font family */}
                    <select
                        className="toolbar-select font-family-select"
                        onChange={handleFontFamily}
                        title="Font Family"
                        defaultValue="sans-serif"
                        onMouseDown={(e) => { savedRangeRef.current = saveSelection(); }}
                    >
                        <option value="Arial">Arial</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="sans-serif">Source Sans Pro</option>
                        <option value="Verdana">Verdana</option>
                    </select>

                    {/* Font size */}
                    <select
                        className="toolbar-select font-size-select"
                        onChange={handleFontSize}
                        title="Font Size"
                        defaultValue="3"
                        onMouseDown={(e) => { savedRangeRef.current = saveSelection(); }}
                    >
                        <option value="1">8px</option>
                        <option value="2">10px</option>
                        <option value="3">12px</option>
                        <option value="4">14px</option>
                        <option value="5">18px</option>
                        <option value="6">24px</option>
                        <option value="7">36px</option>
                    </select>

                    <Sep />

                    {/* Color picker */}
                    <ColorPickerDropdown execWithSelection={execWithSelection} currentColor={currentColor} />

                    <Sep />

                    {/* Text formatting */}
                    <Btn onCmd={() => exec('bold')} title="Bold (Ctrl+B)"><Bold size={15} /></Btn>
                    <Btn onCmd={() => exec('italic')} title="Italic (Ctrl+I)"><Italic size={15} /></Btn>
                    <Btn onCmd={() => exec('underline')} title="Underline (Ctrl+U)"><Underline size={15} /></Btn>
                    <Btn onCmd={() => exec('strikeThrough')} title="Strikethrough"><Strikethrough size={15} /></Btn>

                    <Sep />

                    {/* Lists */}
                    <Btn onCmd={() => exec('insertUnorderedList')} title="Bullet List"><List size={15} /></Btn>
                    <Btn onCmd={() => exec('insertOrderedList')} title="Numbered List"><ListOrdered size={15} /></Btn>

                    <Sep />

                    {/* Alignment */}
                    <Btn onCmd={() => exec('justifyLeft')} title="Align Left"><AlignLeft size={15} /></Btn>
                    <Btn onCmd={() => exec('justifyCenter')} title="Align Center"><AlignCenter size={15} /></Btn>
                    <Btn onCmd={() => exec('justifyRight')} title="Align Right"><AlignRight size={15} /></Btn>
                    <Btn onCmd={() => exec('justifyFull')} title="Justify"><AlignJustify size={15} /></Btn>

                    <Sep />

                    {/* Misc */}
                    <Btn onCmd={insertLink} title="Insert Link"><Link size={15} /></Btn>
                    <Btn onCmd={() => exec('formatBlock', 'pre')} title="Code Block"><Code size={15} /></Btn>
                    <Btn onCmd={() => exec('insertHorizontalRule')} title="Horizontal Rule"><Minus size={15} /></Btn>

                    <Sep />

                    <Btn onCmd={() => exec('removeFormat')} title="Clear Formatting"><Type size={15} /></Btn>
                </div>

                {/* Editable body */}
                <div
                    className="editor-body"
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    dangerouslySetInnerHTML={{ __html: INITIAL_CONTENT }}
                    spellCheck={false}
                    onMouseUp={handleEditorMouseUp}
                    onKeyUp={handleEditorKeyUp}
                    onSelect={handleEditorMouseUp}
                />
            </div>

            {/* Submit */}
            <div className="ac-actions">
                <button className="btn-submit-content" onClick={handleSubmit}>
                    Submit Content
                </button>
            </div>
        </div>
    );
}
