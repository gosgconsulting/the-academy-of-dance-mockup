// Universal Sparti Builder Styles - Injected directly into DOM
export const SPARTI_STYLES = `
/* Sparti Builder Core Styles - Universal Plugin */
.sparti-builder-wrapper {
  position: relative;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

/* Toolbar Styles - Maximum Priority */
.sparti-toolbar {
  position: fixed !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  background: #ffffff !important;
  border-top: 1px solid #e5e7eb !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  z-index: 2147483647 !important;
  transition: all 0.3s ease;
  font-family: inherit !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-toolbar {
    background: #1f2937 !important;
    border-top-color: #374151 !important;
  }
}

.sparti-toolbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  max-width: 100%;
  margin: 0;
}

.sparti-toolbar-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
  font-size: 1rem;
}

@media (prefers-color-scheme: dark) {
  .sparti-toolbar-brand {
    color: #f9fafb;
  }
}

.sparti-toolbar-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Content Area */
.sparti-content-area {
  position: relative;
}

.sparti-content {
  padding-bottom: 80px !important;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

body.sparti-editing .sparti-content {
  cursor: crosshair !important;
  position: relative;
}

body.sparti-editing .sparti-content::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 80px;
  background: rgba(59, 130, 246, 0.05);
  pointer-events: none;
  z-index: 100;
}

/* Button Styles */
.sparti-btn {
  display: inline-flex !important;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  background: none;
  font-family: inherit;
  line-height: 1.25;
  user-select: none;
}

.sparti-btn-primary {
  background: #3b82f6 !important;
  color: #ffffff !important;
}

.sparti-btn-primary:hover {
  background: #2563eb !important;
}

.sparti-btn-success {
  background: #10b981 !important;
  color: #ffffff !important;
}

.sparti-btn-success:hover {
  background: #059669 !important;
}

.sparti-btn-ghost {
  background: transparent !important;
  color: #6b7280 !important;
  border: 1px solid #d1d5db !important;
}

.sparti-btn-ghost:hover {
  background: #f9fafb !important;
  color: #374151 !important;
}

.sparti-btn-outline {
  background: transparent !important;
  color: #374151 !important;
  border: 1px solid #d1d5db !important;
}

.sparti-btn-outline:hover {
  background: #f3f4f6 !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-btn-ghost {
    color: #9ca3af !important;
    border-color: #4b5563 !important;
  }
  
  .sparti-btn-ghost:hover {
    background: #1f2937 !important;
    color: #f3f4f6 !important;
  }
  
  .sparti-btn-outline {
    color: #f3f4f6 !important;
    border-color: #4b5563 !important;
  }
  
  .sparti-btn-outline:hover {
    background: #374151 !important;
  }
}

/* Overlay Styles */
.sparti-hover-overlay {
  border: 2px dashed #3b82f6 !important;
  background: rgba(59, 130, 246, 0.1) !important;
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.2) !important;
  pointer-events: none !important;
  z-index: 2147483640 !important;
}

.sparti-selection-overlay {
  border: 2px solid #3b82f6 !important;
  background: rgba(59, 130, 246, 0.1) !important;
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.3), 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
  pointer-events: none !important;
  z-index: 2147483641 !important;
}

.sparti-element-label {
  position: absolute;
  top: -24px;
  left: 0;
  background: #3b82f6 !important;
  color: #ffffff !important;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 0.25rem;
  font-weight: 500;
  white-space: nowrap;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
  z-index: 2147483642 !important;
}

/* Edit Panel Styles */
.sparti-edit-panel {
  position: fixed !important;
  right: 0 !important;
  top: 0 !important;
  width: 320px !important;
  height: calc(100vh - 80px) !important;
  background: #ffffff !important;
  border-left: 1px solid #e5e7eb !important;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.15) !important;
  z-index: 2147483646 !important;
  overflow-y: auto !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-edit-panel {
    background: #1f2937 !important;
    border-left-color: #374151 !important;
  }
}

.sparti-edit-panel-header {
  padding: 1rem !important;
  border-bottom: 1px solid #e5e7eb !important;
  background: #f9fafb !important;
  margin: 0 !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-edit-panel-header {
    border-bottom-color: #374151 !important;
    background: #111827 !important;
  }
}

.sparti-edit-header-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
}

.sparti-edit-header-content h3 {
  margin: 0 !important;
  font-size: 1rem !important;
  font-weight: 600 !important;
  color: #111827 !important;
  font-family: inherit !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-edit-header-content h3 {
    color: #f9fafb !important;
  }
}

.sparti-element-path {
  margin: 0 !important;
  font-size: 0.75rem !important;
  color: #6b7280 !important;
  text-transform: uppercase;
  font-family: inherit !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-element-path {
    color: #9ca3af !important;
  }
}

.sparti-edit-panel-content {
  padding: 1rem !important;
  background: inherit;
}

.sparti-edit-section {
  margin-bottom: 1.5rem !important;
  background: inherit;
}

.sparti-edit-label {
  display: flex !important;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem !important;
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  color: #374151 !important;
  font-family: inherit !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-edit-label {
    color: #d1d5db !important;
  }
}

.sparti-edit-textarea {
  width: 100% !important;
  padding: 0.75rem !important;
  border: 1px solid #d1d5db !important;
  border-radius: 0.375rem !important;
  background: #ffffff !important;
  color: #111827 !important;
  font-size: 0.875rem !important;
  resize: vertical !important;
  min-height: 80px !important;
  font-family: inherit !important;
  box-sizing: border-box !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-edit-textarea {
    background: #374151 !important;
    color: #f9fafb !important;
    border-color: #4b5563 !important;
  }
}

.sparti-edit-textarea:focus,
.sparti-edit-input:focus,
.sparti-edit-select:focus {
  outline: none !important;
  border-color: #3b82f6 !important;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
}

.sparti-edit-input,
.sparti-edit-select {
  width: 100% !important;
  padding: 0.5rem !important;
  border: 1px solid #d1d5db !important;
  border-radius: 0.375rem !important;
  background: #ffffff !important;
  color: #111827 !important;
  font-size: 0.875rem !important;
  font-family: inherit !important;
  box-sizing: border-box !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-edit-input,
  .sparti-edit-select {
    background: #374151 !important;
    color: #f9fafb !important;
    border-color: #4b5563 !important;
  }
}

/* Dropdown/Select Styles - High Priority */
.sparti-edit-select,
.sparti-dropdown-menu {
  background: #ffffff !important;
  z-index: 2147483645 !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  border: 1px solid #d1d5db !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-edit-select,
  .sparti-dropdown-menu {
    background: #374151 !important;
    border-color: #4b5563 !important;
  }
}

/* Form Controls */
.sparti-btn-sm {
  padding: 0.375rem 0.75rem !important;
  font-size: 0.8125rem !important;
}

.sparti-url-input {
  display: flex !important;
  gap: 0.5rem;
}

.sparti-url-input input {
  flex: 1 !important;
}

.sparti-color-controls {
  display: flex !important;
  gap: 1rem;
}

.sparti-color-input {
  flex: 1 !important;
  display: flex;
  flex-direction: column;
}

.sparti-color-input label {
  display: block !important;
  margin-bottom: 0.25rem !important;
  font-size: 0.75rem !important;
  font-weight: 500 !important;
  color: #6b7280 !important;
  font-family: inherit !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-color-input label {
    color: #9ca3af !important;
  }
}

.sparti-color-input input[type="color"] {
  width: 100% !important;
  height: 40px !important;
  border: 1px solid #d1d5db !important;
  border-radius: 0.375rem !important;
  background: none !important;
  cursor: pointer !important;
  padding: 0 !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-color-input input[type="color"] {
    border-color: #4b5563 !important;
  }
}

.sparti-checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sparti-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
}

.sparti-checkbox input[type="checkbox"] {
  width: auto;
}

.sparti-typography-controls,
.sparti-layout-controls {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sparti-input-group {
  display: flex;
  flex-direction: column;
}

.sparti-alignment-controls {
  display: flex;
  gap: 0.25rem;
}

.sparti-alignment-controls .sparti-btn {
  flex: 1;
}

.sparti-alignment-controls .sparti-btn.active {
  background: #3b82f6 !important;
  color: #ffffff !important;
}

.sparti-link-styling {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sparti-select-input {
  display: flex;
  flex-direction: column;
}

.sparti-image-preview,
.sparti-video-preview,
.sparti-link-preview {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: #f9fafb;
  text-align: center;
}

@media (prefers-color-scheme: dark) {
  .sparti-image-preview,
  .sparti-video-preview,
  .sparti-link-preview {
    border-color: #4b5563;
    background: #374151;
  }
}

.sparti-spacing-controls {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sparti-appearance-controls {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sparti-border-controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  align-items: end;
}

.sparti-border-controls .sparti-color-input {
  grid-column: span 2;
}

.sparti-preset-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.w-full {
  width: 100%;
}

/* Responsive Design */
@media (max-width: 768px) {
  .sparti-edit-panel {
    width: 100% !important;
    height: 50vh !important;
    top: 0 !important;
    bottom: 80px !important;
    border-left: none !important;
    border-bottom: 1px solid #e5e7eb !important;
  }
  
  @media (prefers-color-scheme: dark) {
    .sparti-edit-panel {
      border-bottom-color: #374151 !important;
    }
  }
  
  .sparti-toolbar-content {
    padding: 0.5rem 1rem !important;
  }
  
  .sparti-toolbar-brand span {
    display: none;
  }
  
  .sparti-content {
    padding-bottom: 60px !important;
  }

  body.sparti-editing .sparti-content::before {
    top: 0 !important;
    bottom: calc(60px + 50vh) !important;
  }
}

@media (prefers-contrast: high) {
  .sparti-toolbar {
    border-top-width: 2px !important;
  }
  
  .sparti-selection-overlay {
    border-width: 3px !important;
  }
  
  .sparti-hover-overlay {
    border-width: 2px !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sparti-builder-wrapper *,
  .sparti-btn,
  .sparti-content {
    transition: none !important;
    animation: none !important;
  }
}

.sparti-ui-force {
  position: fixed !important;
  z-index: 2147483647 !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
}

@media (max-width: 768px) {
  body.sparti-editing {
    overflow: hidden !important;
  }
  
  body.sparti-editing .sparti-content {
    overflow-y: auto !important;
    height: calc(100vh - 60px - 50vh) !important;
  }
}

.sparti-builder-wrapper {
  line-height: 1.5 !important;
  color: inherit !important;
  background: transparent !important;
}

.sparti-builder-wrapper * {
  transition: border 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease !important;
}

body.sparti-editing * {
  cursor: crosshair !important;
}

body.sparti-editing .sparti-toolbar *,
body.sparti-editing .sparti-edit-panel *,
body.sparti-editing .sparti-overlay *,
body.sparti-editing .sparti-ui * {
  cursor: default !important;
}

body.sparti-editing input,
body.sparti-editing textarea,
body.sparti-editing [contenteditable] {
  cursor: text !important;
}

body.sparti-editing button,
body.sparti-editing .sparti-btn,
body.sparti-editing a {
  cursor: pointer !important;
}

body.sparti-editing .sparti-btn:hover {
  cursor: pointer !important;
}

/* Admin Navigation Styles */
.sparti-admin-navigation {
  position: fixed !important;
  left: 0 !important;
  top: 0 !important;
  width: 280px !important;
  height: 100vh !important;
  background: #ffffff !important;
  border-right: 1px solid #e5e7eb !important;
  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.1) !important;
  z-index: 2147483645 !important;
  overflow-y: auto !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-admin-navigation {
    background: #1f2937 !important;
    border-right-color: #374151 !important;
  }
}

.sparti-nav-header {
  padding: 1.5rem !important;
  border-bottom: 1px solid #e5e7eb !important;
  background: #f9fafb !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-nav-header {
    background: #111827 !important;
    border-bottom-color: #374151 !important;
  }
}

.sparti-nav-title {
  font-size: 1.125rem !important;
  font-weight: 700 !important;
  color: #111827 !important;
  margin: 0 0 0.25rem 0 !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-nav-title {
    color: #f9fafb !important;
  }
}

.sparti-nav-subtitle {
  font-size: 0.875rem !important;
  color: #6b7280 !important;
  margin: 0 !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-nav-subtitle {
    color: #9ca3af !important;
  }
}

.sparti-nav-content {
  padding: 1rem !important;
}

.sparti-nav-group {
  margin-bottom: 1rem !important;
}

.sparti-nav-group-header {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  width: 100% !important;
  padding: 0.75rem !important;
  background: transparent !important;
  border: none !important;
  border-radius: 6px !important;
  cursor: pointer !important;
  transition: all 0.2s !important;
  font-family: inherit !important;
}

.sparti-nav-group-header:hover {
  background: #f3f4f6 !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-nav-group-header:hover {
    background: #374151 !important;
  }
}

.sparti-nav-group-title {
  font-size: 0.875rem !important;
  font-weight: 600 !important;
  color: #374151 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-nav-group-title {
    color: #d1d5db !important;
  }
}

.sparti-nav-group-toggle {
  color: #6b7280 !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-nav-group-toggle {
    color: #9ca3af !important;
  }
}

.sparti-nav-group-items {
  margin-left: 0.5rem !important;
  border-left: 2px solid #f3f4f6 !important;
  padding-left: 0.5rem !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-nav-group-items {
    border-left-color: #374151 !important;
  }
}

.sparti-nav-item {
  display: flex !important;
  align-items: center !important;
  gap: 0.75rem !important;
  width: 100% !important;
  padding: 0.75rem !important;
  background: transparent !important;
  border: none !important;
  border-radius: 6px !important;
  cursor: pointer !important;
  transition: all 0.2s !important;
  text-align: left !important;
  font-family: inherit !important;
}

.sparti-nav-item:hover {
  background: #f3f4f6 !important;
}

.sparti-nav-item.selected {
  background: #eff6ff !important;
  border: 1px solid #3b82f6 !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-nav-item:hover {
    background: #374151 !important;
  }
  
  .sparti-nav-item.selected {
    background: #1e3a8a !important;
    border-color: #3b82f6 !important;
  }
}

.sparti-nav-item-icon {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 32px !important;
  height: 32px !important;
  background: #f9fafb !important;
  border-radius: 6px !important;
  color: #6b7280 !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-nav-item-icon {
    background: #374151 !important;
    color: #9ca3af !important;
  }
}

.sparti-nav-item.selected .sparti-nav-item-icon {
  background: #3b82f6 !important;
  color: #ffffff !important;
}

.sparti-nav-item-content {
  flex: 1 !important;
  min-width: 0 !important;
}

.sparti-nav-item-label {
  display: block !important;
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  color: #111827 !important;
  margin-bottom: 0.125rem !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-nav-item-label {
    color: #f9fafb !important;
  }
}

.sparti-nav-item-meta {
  display: flex !important;
  align-items: center !important;
  gap: 0.25rem !important;
}

.sparti-nav-item-type {
  font-size: 0.75rem !important;
  color: #6b7280 !important;
  text-transform: capitalize !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-nav-item-type {
    color: #9ca3af !important;
  }
}

/* Schema Modal Styles */
.sparti-modal-overlay {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  z-index: 2147483647 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 1rem !important;
  backdrop-filter: blur(4px) !important;
}

.sparti-modal-backdrop {
  position: absolute !important;
  inset: 0 !important;
  background: rgba(0, 0, 0, 0.5) !important;
}

.sparti-modal-container {
  position: relative !important;
  width: 90% !important;
  max-width: 800px !important;
  max-height: 80vh !important;
  background: #ffffff !important;
  border-radius: 12px !important;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
  display: flex !important;
  flex-direction: column !important;
  overflow: hidden !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-modal-container {
    background: #1f2937 !important;
  }
}

.sparti-modal-content {
  display: flex !important;
  flex-direction: column !important;
  height: 100% !important;
}

.sparti-modal-header {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 1.5rem !important;
  border-bottom: 1px solid #e5e7eb !important;
  background: #f9fafb !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-modal-header {
    background: #111827 !important;
    border-bottom-color: #374151 !important;
  }
}

.sparti-modal-title-section {
  display: flex !important;
  align-items: center !important;
  gap: 1rem !important;
}

.sparti-schema-icon {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 48px !important;
  height: 48px !important;
  background: #3b82f6 !important;
  color: #ffffff !important;
  border-radius: 8px !important;
}

.sparti-modal-title {
  font-size: 1.25rem !important;
  font-weight: 700 !important;
  color: #111827 !important;
  margin: 0 !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-modal-title {
    color: #f9fafb !important;
  }
}

.sparti-modal-subtitle {
  font-size: 0.875rem !important;
  color: #6b7280 !important;
  margin: 0 !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-modal-subtitle {
    color: #9ca3af !important;
  }
}

.sparti-modal-close {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 40px !important;
  height: 40px !important;
  border: none !important;
  background: transparent !important;
  border-radius: 6px !important;
  color: #6b7280 !important;
  cursor: pointer !important;
  transition: all 0.2s !important;
}

.sparti-modal-close:hover {
  background: #f3f4f6 !important;
  color: #374151 !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-modal-close:hover {
    background: #374151 !important;
    color: #d1d5db !important;
  }
}

.sparti-modal-body {
  flex: 1 !important;
  overflow-y: auto !important;
  padding: 1.5rem !important;
}

.sparti-loading-state {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 3rem !important;
  text-align: center !important;
}

.sparti-spinner {
  width: 32px !important;
  height: 32px !important;
  border: 3px solid #f3f4f6 !important;
  border-top: 3px solid #3b82f6 !important;
  border-radius: 50% !important;
  animation: sparti-spin 1s linear infinite !important;
  margin-bottom: 1rem !important;
}

@keyframes sparti-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.sparti-error-state {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 3rem !important;
  text-align: center !important;
}

.sparti-error-icon {
  color: #dc2626 !important;
  margin-bottom: 1rem !important;
}

.sparti-error-title {
  font-size: 1.125rem !important;
  font-weight: 600 !important;
  color: #111827 !important;
  margin: 0 0 0.5rem 0 !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-error-title {
    color: #f9fafb !important;
  }
}

.sparti-error-message {
  color: #dc2626 !important;
  margin-bottom: 1.5rem !important;
}

.sparti-retry-button {
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  padding: 0.5rem 1rem !important;
  background: #3b82f6 !important;
  color: #ffffff !important;
  border: none !important;
  border-radius: 6px !important;
  cursor: pointer !important;
  transition: background 0.2s !important;
  font-family: inherit !important;
}

.sparti-retry-button:hover {
  background: #2563eb !important;
}

.sparti-schema-overview {
  background: #f9fafb !important;
  border: 1px solid #e5e7eb !important;
  border-radius: 8px !important;
  padding: 1.5rem !important;
  margin-bottom: 2rem !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-schema-overview {
    background: #111827 !important;
    border-color: #374151 !important;
  }
}

.sparti-overview-header {
  display: flex !important;
  align-items: center !important;
  gap: 1rem !important;
  margin-bottom: 1rem !important;
}

.sparti-overview-icon {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 48px !important;
  height: 48px !important;
  background: #3b82f6 !important;
  color: #ffffff !important;
  border-radius: 8px !important;
}

.sparti-overview-title {
  font-size: 1.25rem !important;
  font-weight: 700 !important;
  color: #111827 !important;
  margin: 0 !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-overview-title {
    color: #f9fafb !important;
  }
}

.sparti-overview-meta {
  font-size: 0.875rem !important;
  color: #6b7280 !important;
  margin: 0 !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-overview-meta {
    color: #9ca3af !important;
  }
}

.sparti-overview-description {
  color: #6b7280 !important;
  margin: 0 !important;
  line-height: 1.5 !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-overview-description {
    color: #9ca3af !important;
  }
}

.sparti-sections-container {
  margin-top: 2rem !important;
}

.sparti-sections-header {
  margin-bottom: 1.5rem !important;
}

.sparti-sections-title {
  font-size: 1.125rem !important;
  font-weight: 600 !important;
  color: #111827 !important;
  margin: 0 0 0.5rem 0 !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-sections-title {
    color: #f9fafb !important;
  }
}

.sparti-sections-subtitle {
  color: #6b7280 !important;
  margin: 0 !important;
  font-size: 0.875rem !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-sections-subtitle {
    color: #9ca3af !important;
  }
}

.sparti-empty-state {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 3rem !important;
  text-align: center !important;
  border: 2px dashed #d1d5db !important;
  border-radius: 8px !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-empty-state {
    border-color: #4b5563 !important;
  }
}

.sparti-empty-icon {
  color: #9ca3af !important;
  margin-bottom: 1rem !important;
}

.sparti-empty-title {
  font-size: 1.125rem !important;
  font-weight: 600 !important;
  color: #374151 !important;
  margin: 0 0 0.5rem 0 !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-empty-title {
    color: #d1d5db !important;
  }
}

.sparti-empty-description {
  color: #6b7280 !important;
  margin: 0 !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-empty-description {
    color: #9ca3af !important;
  }
}

.sparti-sections-table {
  border: 1px solid #e5e7eb !important;
  border-radius: 8px !important;
  overflow: hidden !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-sections-table {
    border-color: #374151 !important;
  }
}

.sparti-table-header {
  display: grid !important;
  grid-template-columns: 2fr 1fr 2fr 100px !important;
  background: #f9fafb !important;
  border-bottom: 1px solid #e5e7eb !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-table-header {
    background: #111827 !important;
    border-bottom-color: #374151 !important;
  }
}

.sparti-table-header-cell {
  font-size: 0.75rem !important;
  font-weight: 600 !important;
  color: #374151 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-table-header-cell {
    color: #d1d5db !important;
  }
}

.sparti-table-body {
  background: #ffffff !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-table-body {
    background: #1f2937 !important;
  }
}

.sparti-table-row {
  display: grid !important;
  grid-template-columns: 2fr 1fr 2fr 100px !important;
  border-bottom: 1px solid #f3f4f6 !important;
  cursor: pointer !important;
  transition: all 0.2s !important;
}

.sparti-table-row:hover {
  background: #f9fafb !important;
}

.sparti-table-row:last-child {
  border-bottom: none !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-table-row {
    border-bottom-color: #374151 !important;
  }
  
  .sparti-table-row:hover {
    background: #374151 !important;
  }
}

.sparti-table-cell {
  padding: 1rem !important;
  display: flex !important;
  align-items: center !important;
}

.sparti-section-name-cell {
  display: flex !important;
  align-items: center !important;
  gap: 0.75rem !important;
}

.sparti-section-type-icon {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 24px !important;
  height: 24px !important;
  background: rgba(59, 130, 246, 0.1) !important;
  border-radius: 4px !important;
}

.sparti-section-label {
  font-size: 0.875rem !important;
  font-weight: 600 !important;
  color: #111827 !important;
  margin: 0 !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-section-label {
    color: #f9fafb !important;
  }
}

.sparti-section-key {
  font-size: 0.75rem !important;
  color: #6b7280 !important;
  font-family: 'Courier New', monospace !important;
  margin: 0 !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-section-key {
    color: #9ca3af !important;
  }
}

.sparti-type-badge {
  font-size: 0.75rem !important;
  font-weight: 500 !important;
  padding: 0.25rem 0.5rem !important;
  border-radius: 4px !important;
  text-transform: capitalize !important;
}

.sparti-section-description-cell {
  flex-direction: column !important;
  align-items: flex-start !important;
}

.sparti-section-description {
  font-size: 0.875rem !important;
  color: #6b7280 !important;
  margin: 0 0 0.25rem 0 !important;
  line-height: 1.4 !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-section-description {
    color: #9ca3af !important;
  }
}

.sparti-section-fields-info {
  font-size: 0.75rem !important;
  color: #9ca3af !important;
  margin: 0 !important;
}

.sparti-section-actions {
  display: flex !important;
  gap: 0.5rem !important;
}

.sparti-action-btn {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 28px !important;
  height: 28px !important;
  border: 1px solid #d1d5db !important;
  background: #ffffff !important;
  border-radius: 4px !important;
  color: #6b7280 !important;
  cursor: pointer !important;
  transition: all 0.2s !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-action-btn {
    background: #374151 !important;
    border-color: #4b5563 !important;
    color: #9ca3af !important;
  }
}

.sparti-edit-btn:hover {
  border-color: #3b82f6 !important;
  color: #3b82f6 !important;
  background: #eff6ff !important;
}

.sparti-view-btn:hover {
  border-color: #10b981 !important;
  color: #10b981 !important;
  background: #ecfdf5 !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-edit-btn:hover {
    background: #1e3a8a !important;
  }
  
  .sparti-view-btn:hover {
    background: #064e3b !important;
  }
}

.sparti-modal-footer {
  padding: 1.5rem !important;
  border-top: 1px solid #e5e7eb !important;
  background: #f9fafb !important;
  display: flex !important;
  justify-content: flex-end !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-modal-footer {
    background: #111827 !important;
    border-top-color: #374151 !important;
  }
}

.sparti-btn {
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  padding: 0.5rem 1rem !important;
  border-radius: 6px !important;
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  border: none !important;
  cursor: pointer !important;
  transition: all 0.2s !important;
  font-family: inherit !important;
}

.sparti-btn-primary {
  background: #3b82f6 !important;
  color: #ffffff !important;
}

.sparti-btn-primary:hover {
  background: #2563eb !important;
}

.sparti-btn-secondary {
  background: #f3f4f6 !important;
  color: #374151 !important;
  border: 1px solid #d1d5db !important;
}

.sparti-btn-secondary:hover {
  background: #e5e7eb !important;
}

@media (prefers-color-scheme: dark) {
  .sparti-btn-secondary {
    background: #374151 !important;
    color: #d1d5db !important;
    border-color: #4b5563 !important;
  }
  
  .sparti-btn-secondary:hover {
    background: #4b5563 !important;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .sparti-admin-navigation {
    width: 100% !important;
    height: 50vh !important;
    top: 0 !important;
    border-right: none !important;
    border-bottom: 1px solid #e5e7eb !important;
  }
  
  .sparti-modal-container {
    max-width: 95vw !important;
    max-height: 95vh !important;
    margin: 0.5rem !important;
  }
  
  .sparti-modal-header {
    padding: 1rem !important;
  }
  
  .sparti-modal-body {
    padding: 1rem !important;
  }
  
  .sparti-modal-footer {
    padding: 1rem !important;
  }
  
  .sparti-table-header,
  .sparti-table-row {
    grid-template-columns: 1fr !important;
    gap: 0.5rem !important;
  }
  
  .sparti-table-cell {
    padding: 0.5rem !important;
  }
  
  .sparti-table-header-cell {
    display: none !important;
  }
  
  .sparti-section-actions {
    margin-top: 0.5rem !important;
    justify-content: flex-end !important;
  }
}

/* Focus styles for accessibility */
.sparti-table-row:focus {
  outline: 2px solid #3b82f6 !important;
  outline-offset: -2px !important;
}

.sparti-nav-item:focus {
  outline: 2px solid #3b82f6 !important;
  outline-offset: -2px !important;
}

.sparti-action-btn:focus {
  outline: 2px solid #3b82f6 !important;
  outline-offset: 1px !important;
}
`;

// CSS injection utility
export class SpartiStyleManager {
  private static styleId = 'sparti-builder-styles';
  private static injected = false;

  static injectStyles(): void {
    if (this.injected || document.getElementById(this.styleId)) return;
    
    const styleElement = document.createElement('style');
    styleElement.id = this.styleId;
    styleElement.textContent = SPARTI_STYLES;
    
    // Insert at the beginning of head for high priority
    document.head.insertBefore(styleElement, document.head.firstChild);
    this.injected = true;
  }

  static removeStyles(): void {
    const existingStyle = document.getElementById(this.styleId);
    if (existingStyle) {
      existingStyle.remove();
      this.injected = false;
    }
  }

  static isInjected(): boolean {
    return this.injected && !!document.getElementById(this.styleId);
  }
}