// ═══════════════════════════════════════════════════════════════
// Central application state
// ═══════════════════════════════════════════════════════════════

// Collage state
export let loadedImages = [];
export let originalOrder = [];
export let _internalW = 0;
export let _internalH = 0;
export let _bgColor = '#ffffff';
export let _currentZoom = 'fit';
export let _lockedRatio = null;

// Per-image crop adjustments: Map<imgIndex, { zoom, focusX, focusY }>
export let _adjustments = {};
// Cell map from last render: [{ imgIdx, x, y, w, h }]
export let _cellMap = [];
export let _lastRenderScale = 1;
export let _lastRangees = null;
export let _forceRangees = null;
export let _hasPreview = false;
export let _autoRefreshTimer = null;

// BD / Manga state
export let _bdCells = [];
export let _bdBubbles = [];
export let _bdSelection = { type: null, id: null };
export let _bdMultiSelect = [];
export let _bdDragState = null;
export let _bdCanvasW = 0;
export let _bdCanvasH = 0;
export let _bdRenderScale = 1;
export let _bdCellIdCounter = 0;
export let _bdBubbleIdCounter = 0;
export let _bdMarginPct = 4;
export let _bdSnapLines = [];
export let _cropForBDCell = null;
export let _bdUndoStack = [];
export let _bdRedoStack = [];
export const BD_UNDO_MAX = 40;
export let _bdSpread = false;
export let _bdPageNum = false;

// BD Pan/Zoom state
export let _bdZoom = 1;
export let _bdIsPanning = false;
export let _bdPanStartX = 0;
export let _bdPanStartY = 0;
export let _bdPanStartOX = 0;
export let _bdPanStartOY = 0;

// ── State setters (needed because ES module exports are read-only bindings) ──
export function setState(key, value) {
  switch(key) {
    case 'loadedImages': loadedImages = value; break;
    case 'originalOrder': originalOrder = value; break;
    case '_internalW': _internalW = value; break;
    case '_internalH': _internalH = value; break;
    case '_bgColor': _bgColor = value; break;
    case '_currentZoom': _currentZoom = value; break;
    case '_lockedRatio': _lockedRatio = value; break;
    case '_adjustments': _adjustments = value; break;
    case '_cellMap': _cellMap = value; break;
    case '_lastRenderScale': _lastRenderScale = value; break;
    case '_lastRangees': _lastRangees = value; break;
    case '_forceRangees': _forceRangees = value; break;
    case '_hasPreview': _hasPreview = value; break;
    case '_autoRefreshTimer': _autoRefreshTimer = value; break;
    case '_bdCells': _bdCells = value; break;
    case '_bdBubbles': _bdBubbles = value; break;
    case '_bdSelection': _bdSelection = value; break;
    case '_bdMultiSelect': _bdMultiSelect = value; break;
    case '_bdDragState': _bdDragState = value; break;
    case '_bdCanvasW': _bdCanvasW = value; break;
    case '_bdCanvasH': _bdCanvasH = value; break;
    case '_bdRenderScale': _bdRenderScale = value; break;
    case '_bdCellIdCounter': _bdCellIdCounter = value; break;
    case '_bdBubbleIdCounter': _bdBubbleIdCounter = value; break;
    case '_bdMarginPct': _bdMarginPct = value; break;
    case '_bdSnapLines': _bdSnapLines = value; break;
    case '_cropForBDCell': _cropForBDCell = value; break;
    case '_bdUndoStack': _bdUndoStack = value; break;
    case '_bdRedoStack': _bdRedoStack = value; break;
    case '_bdSpread': _bdSpread = value; break;
    case '_bdPageNum': _bdPageNum = value; break;
    case '_bdZoom': _bdZoom = value; break;
    case '_bdIsPanning': _bdIsPanning = value; break;
    case '_bdPanStartX': _bdPanStartX = value; break;
    case '_bdPanStartY': _bdPanStartY = value; break;
    case '_bdPanStartOX': _bdPanStartOX = value; break;
    case '_bdPanStartOY': _bdPanStartOY = value; break;
  }
}
