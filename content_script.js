/**
 * @file content_script.js
 * This script is injected into web pages to find and hide the target pop-up.
 * It works by looking for an element with both 'popup-overlay' and 'show' classes.
 */

/**
 * Finds the pop-up element on the page and sets its display style to 'none'.
 */
const hidePopup = () => {
  // This selector finds the element that has BOTH 'popup-overlay' and 'show' classes.
  const popup = document.querySelector(".popup-overlay.show");

  // If the element is found on the page and is currently visible...
  if (popup && popup.style.display !== "none") {
    console.log("Pop-up found. Hiding it.");
    // ...we change its style to 'none', effectively hiding it from view.
    popup.style.display = "none";
  }
};

// --- SCRIPT EXECUTION ---

// First, we run the function immediately when the script loads.
// This handles cases where the pop-up is already in the HTML when the page loads.
hidePopup();

// Some websites load pop-ups dynamically (i.e., after the page has finished loading).
// To catch these, we use a MutationObserver to watch for any changes to the page's content.
// This is very efficient as it only runs our code when the page actually changes.
const observer = new MutationObserver((mutations) => {
  let shouldCheckForPopup = false;

  // Check each mutation to see if new nodes were added
  mutations.forEach((mutation) => {
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      // Check if any added nodes are elements (not text nodes)
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Check if the added element itself is the popup or contains the popup
          if (
            node.matches &&
            (node.matches(".popup-overlay.show") ||
              node.querySelector(".popup-overlay.show"))
          ) {
            shouldCheckForPopup = true;
          } else if (node.tagName === "DIV") {
            // Any new div could potentially become a popup, so check
            shouldCheckForPopup = true;
          }
        }
      });
    }

    // Also check for attribute changes that might show a popup
    if (mutation.type === "attributes") {
      const target = mutation.target;
      if (target.classList && target.classList.contains("popup-overlay")) {
        shouldCheckForPopup = true;
      }
    }
  });

  // Only run hidePopup if we detected relevant changes
  if (shouldCheckForPopup) {
    // Small delay to ensure the popup is fully rendered
    setTimeout(hidePopup, 10);
  }
});

// Start observing the entire document for any changes to its structure.
// We observe the documentElement (html) instead of just body to catch all changes
// 'childList: true' watches for added/removed elements.
// 'subtree: true' extends the watch to all descendants.
// 'attributes: true' watches for attribute changes (like class changes).
// 'attributeFilter' only watches for class and style changes to improve performance.
observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ["class", "style"],
});
