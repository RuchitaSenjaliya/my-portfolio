/**
 * Common Utility & Helper Functions
 * General purpose utilities for UI behaviors, DOM actions, and calculations.
 */

/**
 * Triggers a file download in the browser from a raw string content.
 * 
 * @param content The text content of the file to download
 * @param fileName The default file name for the downloaded file
 * @param mimeType The file MIME type (defaults to 'text/plain')
 */
export function downloadTextFile(content: string, fileName: string, mimeType: string = 'text/plain') {
  if (typeof window === 'undefined') return;
  
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Smoothly scrolls the window to a target DOM element with a specific vertical offset.
 * 
 * @param targetId The ID of the target element (without the '#' prefix)
 * @param offset Vertical offset in pixels (defaults to 80)
 */
export function smoothScrollToElement(targetId: string, offset: number = 80) {
  if (typeof window === 'undefined') return;
  
  const element = document.getElementById(targetId);
  if (element) {
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
}

/**
 * Combines multiple conditional className values into a single space-separated string.
 * Simple utility when full clsx library is not preferred.
 * 
 * @param classes List of class values, boolean values, or undefined conditions
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Triggers a file download in the browser for a file located at a specific URL.
 * 
 * @param url The URL of the file to download
 * @param fileName The default file name for the downloaded file
 */
export function downloadFileFromUrl(url: string, fileName: string) {
  if (typeof window === 'undefined') return;
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

