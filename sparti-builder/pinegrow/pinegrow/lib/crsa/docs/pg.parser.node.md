Here's the Markdown documentation for the methods of the `pgParserNode` class:

# pgParserNode Class

## Methods

### setDocument(document)
Sets the document for the node and all its children.
- `document`: The document to set.

### getPage()
Gets the page associated with the node.

### getParent()
Returns the parent node.

### getParentsBySelector(sel)
Returns an array of parent nodes that match the given selector.
- `sel`: The selector to match against.

### shouldHaveId()
Determines if the node should have an ID.

### getByPgId(id)
Gets a node by its Pinegrow ID.
- `id`: The Pinegrow ID to search for.

### withParents(func)
Executes a function for each parent node.
- `func`: The function to execute for each parent.

### withSelfAndParents(func)
Executes a function for the node itself and each parent node.
- `func`: The function to execute.

### walk(func, depth)
Walks through the node's children, executing a function for each.
- `func`: The function to execute for each child.
- `depth`: The current depth in the tree.

### walkSelfAndChildren(func)
Walks through the node itself and its children, executing a function for each.
- `func`: The function to execute.

### makeListByWalkingSelfAndChildren()
Creates a list of elements by walking through the node and its children.

### updatePositionInformation()
Updates the position information for the node and its children.

### getPositionInDocument(fast)
Gets the position of the node in the document.
- `fast`: If true, uses cached position information.

### findOne(sel, stop_func)
Finds the first child node that matches the given selector.
- `sel`: The selector to match against.
- `stop_func`: A function that determines when to stop searching.

### findOneKeepFindOrder(sel)
Finds the first child node that matches the given selector, maintaining the original order.
- `sel`: The selector to match against.

### findMaxItems(sel, max_items, stop_func, filter_func)
Finds child nodes that match the given selector, up to a maximum number.
- `sel`: The selector to match against.
- `max_items`: The maximum number of items to find.
- `stop_func`: A function that determines when to stop searching.
- `filter_func`: A function to filter the results.

### find(sel, single, only_children, stop_func, max_items, filter_func, order_by_find)
Finds child nodes that match the given selector.
- `sel`: The selector to match against.
- `single`: If true, returns only the first match.
- `only_children`: If true, only searches immediate children.
- `stop_func`: A function that determines when to stop searching.
- `max_items`: The maximum number of items to find.
- `filter_func`: A function to filter the results.
- `order_by_find`: If true, maintains the original order of the results.

### findIncludingSelf(sel, single, stop_func)
Finds nodes that match the given selector, including the node itself.
- `sel`: The selector to match against.
- `single`: If true, returns only the first match.
- `stop_func`: A function that determines when to stop searching.

### findOneIncludingSelf(sel)
Finds the first node that matches the given selector, including the node itself.
- `sel`: The selector to match against.

### findOneWithAttrValue(attr, value, tag)
Finds the first child node with a specific attribute value.
- `attr`: The attribute name.
- `value`: The attribute value to match.
- `tag`: Optional tag name to filter by.

### findWithAttrValue(attr, value, tag)
Finds all child nodes with a specific attribute value.
- `attr`: The attribute name.
- `value`: The attribute value to match.
- `tag`: Optional tag name to filter by.

### findWithMultipleAttrValues(list)
Finds all child nodes that match multiple attribute values.
- `list`: An array of attribute name-value pairs to match.

### getUniqueIdAttribute(pref, prev)
Gets a unique ID attribute for the node.
- `pref`: Prefix for the ID.
- `prev`: Previous ID to avoid duplicates.

### clone(dont_asign_id, copy_ids, no_children)
Creates a clone of the node.
- `dont_asign_id`: If true, doesn't assign a new ID to the clone.
- `copy_ids`: If true, copies the original IDs.
- `no_children`: If true, doesn't clone children.

### clearData()
Clears the node's data.

### setData(key, value)
Sets a data value for the node.
- `key`: The data key.
- `value`: The data value.

### getData(key, default_value)
Gets a data value from the node.
- `key`: The data key.
- `default_value`: Default value if the key doesn't exist.

### setDataUncloned(key, value)
Sets a data value that won't be cloned.
- `key`: The data key.
- `value`: The data value.

### getDataUncloned(key, default_value)
Gets an uncloned data value from the node.
- `key`: The data key.
- `default_value`: Default value if the key doesn't exist.

### getClonedFromPgEl()
Gets the original node that this node was cloned from.

### removeAllChildren()
Removes all child nodes.

### removeAllChildrenExcept(pgel)
Removes all child nodes except the specified one.
- `pgel`: The node to keep.

### html(html, withIds, formatOptions, dont_assign_ids)
Gets or sets the HTML content of the node.
- `html`: The HTML content to set (if provided).
- `withIds`: If true, includes Pinegrow IDs in the output.
- `formatOptions`: Options for formatting the HTML.
- `dont_assign_ids`: If true, doesn't assign new IDs.

### text(html, immediate)
Gets or sets the text content of the node.
- `html`: The text content to set (if provided).
- `immediate`: If true, only considers immediate text nodes.

### indentText(text, indent, level, html_options)
Indents the given text.
- `text`: The text to indent.
- `indent`: The indentation string.
- `level`: The indentation level.
- `html_options`: HTML formatting options.

### isDescendantOf(ancestor)
Checks if the node is a descendant of the given ancestor.
- `ancestor`: The potential ancestor node.

### contains(desc)
Checks if the node contains the given descendant.
- `desc`: The potential descendant node.

### getChildPos(child, skip_text)
Gets the position of a child node.
- `child`: The child node.
- `skip_text`: If true, skips text nodes when counting.

### index()
Gets the index of the node among its siblings.

### getChildAtPos(pos, skip_text)
Gets the child node at a specific position.
- `pos`: The position to get the child from.
- `skip_text`: If true, skips text nodes when counting.

### getFirstChild(incl_text)
Gets the first child node.
- `incl_text`: If true, includes text nodes.

### isChildOf(node)
Checks if the node is a child of the given node.
- `node`: The potential parent node.

### isEmpty()
Checks if the node is empty (has no children or only whitespace).

### isTextContentEmpty()
Checks if the node's text content is empty or only whitespace.

### hasChildren(all)
Checks if the node has children.
- `all`: If true, includes text nodes.

### hasChildrenNotIncludingScripts()
Checks if the node has children, excluding script nodes.

### getChildren(all)
Gets an array of the node's children.
- `all`: If true, includes text nodes.

### getLinkElement()
Gets the link element associated with the node.

### hasTextOnly(all)
Checks if the node only has text children.
- `all`: If true, includes all types of nodes.

### findElementWithTextOnly()
Finds the first descendant element that only contains text.

### isTheOnlyChild(all)
Checks if the node is the only child of its parent.
- `all`: If true, includes all types of nodes.

### next(include_text)
Gets the next sibling node.
- `include_text`: If true, includes text nodes.

### prev(include_text)
Gets the previous sibling node.
- `include_text`: If true, includes text nodes.

### prevWithSelector(sel)
Gets the previous sibling node that matches the given selector.
- `sel`: The selector to match against.

### nextWithSelector(sel)
Gets the next sibling node that matches the given selector.
- `sel`: The selector to match against.

### first(include_text)
Gets the first child node.
- `include_text`: If true, includes text nodes.

### last(include_text)
Gets the last child node.
- `include_text`: If true, includes text nodes.

### indexToElementIndex(idx)
Converts a child index to an element index.
- `idx`: The index to convert.

### insertAtIndex(parent, idx, skip_text)
Inserts the node at a specific index in the parent's children.
- `parent`: The parent node.
- `idx`: The index to insert at.
- `skip_text`: If true, skips text nodes when counting.

### insert(dest, before)
Inserts the node relative to another node.
- `dest`: The destination node.
- `before`: If true, inserts before the destination node.

### detach()
Detaches the node from its parent.

### detachAllChildren(except)
Detaches all child nodes except the specified one.
- `except`: The node to keep.

### moveChildrenToElement(pgel, prepend, trim)
Moves all children of this node to another element.
- `pgel`: The destination element.
- `prepend`: If true, prepends the children.
- `trim`: If true, trims whitespace.

### getPositionInfo()
Gets position information for the node.

### placeAtPositionInfo(pos)
Places the node at a specific position based on position info.
- `pos`: The position information.

### removeWithoutEvents(sub, ids)
Removes the node without triggering events.
- `sub`: If true, this is a sub-operation.
- `ids`: Array to store removed IDs.

### getRemovedFromPgel()
Gets the element from which this node was removed.

### remove(sub, ids)
Removes the node.
- `sub`: If true, this is a sub-operation.
- `ids`: Array to store removed IDs.

### insertBefore(dest)
Inserts the node before another node.
- `dest`: The destination node.

### insertAfter(dest)
Inserts the node after another node.
- `dest`: The destination node.

### nonElementChangesContainer(dest, func)
Handles non-element changes in a container.
- `dest`: The destination container.
- `func`: The function to execute.

### appendPrependWithoutEvent(dest, prepend)
Appends or prepends the node without triggering events.
- `dest`: The destination node.
- `prepend`: If true, prepends instead of appends.

### appendPrepend(dest, prepend)
Appends or prepends the node.
- `dest`: The destination node.
- `prepend`: If true, prepends instead of appends.

### indent()
Indents the node (moves it into its previous sibling).

### outdent()
Outdents the node (moves it out of its parent).

### canHaveChildren()
Checks if the node can have children.

### canDuplicate()
Checks if the node can be duplicated.

### canDelete()
Checks if the node can be deleted.

### canHaveSiblings()
Checks if the node can have siblings.

### canMove()
Checks if the node can be moved.

### isCollapsed()
Checks if the node is collapsed in the tree view.

### canInsertElement(pgel)
Checks if another element can be inserted into this node.
- `pgel`: The element to potentially insert.

### appendTo(dest)
Appends the node to another node.
- `dest`: The destination node.

### prependTo(dest)
Prepends the node to another node.
- `dest`: The destination node.

### append(node)
Appends a node to this node.
- `node`: The node to append.

### prepend(node)
Prepends a node to this node.
- `node`: The node to prepend.

### getClasses(class_attr)
Gets an array of the node's classes.
- `class_attr`: Optional alternative class attribute name.

### hasClass(cls)
Checks if the node has a specific class.
- `cls`: The class to check for.

### addClass(cls, class_sorter, no_sort)
Adds a class to the node.
- `cls`: The class to add.
- `class_sorter`: Optional function to sort classes.
- `no_sort`: If true, doesn't sort the classes.

### removeClass(cls, class_sorter)
Removes a class from the node.
- `cls`: The class to remove.
- `class_sorter`: Optional function to sort remaining classes.

### removeClassesStartingWith(cls)
Removes all classes that start with a specific string.
- `cls`: The string to match against class names.

### canAddClass(cls)
Checks if a class can be added to the node.
- `cls`: The class to potentially add.

### canRemoveClass(cls)
Checks if a class can be removed from the node.
- `cls`: The class to potentially remove.

### getInlineStylePropertyValue(prop, is_url)
Gets the value of an inline style property.
- `prop`: The CSS property name.
- `is_url`: If true, treats the value as a URL.

### setInlineStylePropertyValue(prop, value, is_url, add_important, safe_mode)
Sets the value of an inline style property.
- `prop`: The CSS property name.
- `value`: The value to set.
- `is_url`: If true, treats the value as a URL.
- `add_important`: If true, adds !important to the value.
- `safe_mode`: If true, uses a safer setting method.

### getInlineBackgroundImageFromBackground()
Gets the background image URL from the background property.

### getInlineBackgroundImage()
Gets the background image URL.

### setInlineBackgroundImage(url)
Sets the background image URL.
- `url`: The URL to set as the background image.

### transformSrcsetUrls(func)
Transforms URLs in the srcset attribute.
- `func`: A function to transform each URL.

### getElementId()
Gets the ID attribute of the node.

### getId()
Gets the Pinegrow ID of the node.

### assignId(prefix)
Assigns a new Pinegrow ID to the node.
- `prefix`: Optional prefix for the ID.

### getOrAssignId()
Gets the existing Pinegrow ID or assigns a new one.

### removePgIdAttributes()
Removes Pinegrow ID attributes from the node and its descendants.

### assignIdAndAddToCatalog(do_subnodes)
Assigns IDs and adds nodes to the catalog.
- `do_subnodes`: If true, processes child nodes as well.

### get$DOMElement($html)
Gets the jQuery DOM element for the node.
- `$html`: Optional jQuery object to search within.

### getDOMElement($html)
Gets the native DOM element for the node.
- `$html`: Optional jQuery object to search within.

### get$DOMElements(page, except_pv)
Gets all jQuery DOM elements for the node across different page views.
- `page`: The page object.
- `except_pv`: Optional page view to exclude.

### mapIdsToDomElement(node)
Maps Pinegrow IDs to a DOM element.
- `node`: The DOM element to map IDs to.

### isAutoClosedTag()
Checks if the node's tag is auto-closed.

### isValidTag(checkClosing)
Checks if the node's tag is a valid HTML5 tag.
- `checkClosing`: If true, checks the closing tag.

### isSingleTag()
Checks if the node's tag is a single (self-closing) tag.

### isProperlyClosed()
Checks if the node is properly closed.

### validate(strict)
Validates the node's structure.
- `strict`: If true, performs stricter validation.

### getNestingLevel()
Gets the nesting level of the node in the tree.

### getOpeningTag()
Gets the opening tag of the node as a string.

### getClosingTag()
Gets the closing tag of the node as a string.

### findChildNodeAtSourceIndex(index)
Finds a child node at a specific source index.
- `index`: The source index to search at.

### findNodeAtSourceIndex(index)
Finds a node at a specific source index.
- `index`: The source index to search at.

### getPath(precise)
Gets the path of the node in the tree.
- `precise`: If true, includes text nodes in the path.

### getRelativePath(to, precise)
Gets the relative path of the node to another node.
- `to`: The target node.
- `precise`: If true, includes text nodes in the path.

### getNodeFromPath(path, return_last_valid)
Gets a node from a given path.
- `path`: The path to follow.
- `return_last_valid`: If true, returns the last valid node if the full path is invalid.

### insertAtPath(node, path, precise)
Inserts a node at a specific path.
- `node`: The node to insert.
- `path`: The path to insert at.
- `precise`: If true, uses precise positioning.

### getUniqueSelectors(level, max_level, context_pgel, return_first, ignore_classes)
Gets unique CSS selectors for the node.
- `level`: The current level in the tree.
- `max_level`: The maximum level to search.
- `context_pgel`: The context element to start from.
- `return_first`: If true, returns only the first unique selector.
- `ignore_classes`: An array of classes to ignore.

### getUniqueSelector(base_pgel, ignore_classes)
Gets a unique CSS selector for the node.
- `base_pgel`: The base element to start from.
- `ignore_classes`: An array of classes to ignore.

### getPositionInSource()
Gets the position of the node in the source code.

### getScriptIndent()
Gets the indentation level for script content.

### changeToPhp(code)
Changes the node to a PHP script node.
- `code`: The PHP code to set.

### toDebug()
Generates a debug representation of the node.

### getTextContent()
Gets the text content of the node.

### containsServerSideScripts(check_attrs)
Checks if the node contains server-side scripts.
- `check_attrs`: If true, also checks attributes for scripts.

### canConvertToJade()
Checks if the node can be converted to Jade/Pug syntax.

### toJade(indent)
Converts the node to Jade/Pug syntax.
- `indent`: The indentation string to use.

### findLastNonScriptChild()
Finds the last non-script child node.

### getPlainTextName(obj)
Gets a plain text name for the node.
- `obj`: Optional object with naming options.

### getName(obj)
Gets a formatted name for the node.
- `obj`: Optional object with naming options.

### getViewHtml(page)
Gets the HTML representation of the node as it appears in the view.
- `page`: The page object.

### getViewInnerHtml(page)
Gets the inner HTML representation of the node as it appears in the view.
- `page`: The page object.

### toIncrementalDOM()
Converts the node to an Incremental DOM representation.

### toIncrementalDOMInner()
Converts the node's inner content to an Incremental DOM representation.

### patchDOMElementWithIncrementalDOM($el)
Patches a DOM element with the node's Incremental DOM representation.
- `$el`: The jQuery element to patch.

### isHidden()
Checks if the node is hidden.

### hide()
Hides the node.

### show()
Shows the node.

### update(oldHtml, domPgId)
Updates the node's representation.
- `oldHtml`: The previous HTML representation.
- `domPgId`: The Pinegrow ID of the DOM element that was updated.

### updateInner(oldHtml)
Updates the node's inner content.
- `oldHtml`: The previous inner HTML.

### executeScript(code)
Executes a script in the context of the node.
- `code`: The script code to execute.

### scrollTo()
Scrolls the view to the node.

### checkBrokenCode()
Checks for broken code in the node.

### selected()
Marks the node as selected.

### deselected()
Marks the node as deselected.

### removeFromDOM()
Removes the node from the DOM.

### toStringOriginal(format_html, options, func, only_content)
Converts the node to its original string representation.
- `format_html`: If true, formats the HTML output.
- `options`: Additional options for string conversion.
- `func`: Optional function to modify the output.
- `only_content`: If true, returns only the content.

### toStringWithIds(format_html, options, func, only_content)
Converts the node to a string representation with Pinegrow IDs.
- `format_html`: If true, formats the HTML output.
- `options`: Additional options for string conversion.
- `func`: Optional function to modify the output.
- `only_content`: If true, returns only the content.

### toStringContent(format_html, options)
Converts the node's content to a string representation.
- `format_html`: If true, formats the HTML output.
- `options`: Additional options for string conversion.

### toStringForCodeEditorOrSave(page, for_save, keep_collapsed, no_clone)
Converts the node to a string representation for code editing or saving.
- `page`: The page object.
- `for_save`: If true, prepares the output for saving.
- `keep_collapsed`: If true, keeps collapsed elements.
- `no_clone`: If true, doesn't clone the node before processing.

### getInfo()
Gets a PgNodeInfo object for the node.

### emitEvent(operation, object, data, page)
Emits an event for the node.
- `operation`: The operation that triggered the event.
- `object`: The object associated with the event.
- `data`: Additional data for the event.
- `page`: The page object.

### withEmitEvent(func, operation, object, data, page)
Executes a function while emitting an event.
- `func`: The function to execute.
- `operation`: The operation that triggered the event.
- `object`: The object associated with the event.
- `data`: Additional data for the event.
- `page`: The page object.

### withoutEvents(func)
Executes a function without emitting events.
- `func`: The function to execute.

This documentation covers the public interface of the `pgParserNode` class, describing each method's purpose and parameters.