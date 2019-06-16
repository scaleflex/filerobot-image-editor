import { Log } from './logger';
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS104: Avoid inline assignments
 * DS204: Change includes calls to have a more natural evaluation order
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Various I/O based operations
class IO {
  static initClass() {
    // Used for parsing image URLs for domain names.
    this.domainRegex = /(?:(?:http|https):\/\/)((?:\w+)\.(?:(?:\w|\.)+))/;
  }

  // Is the given URL remote?
  // If a cross-origin setting is set, we assume you have CORS
  // properly configured.
  //
  // @param [DOMObject] img The image to check.
  // @return [Boolean]
  static isRemote(img) {
    if (img == null) { return false; }
    if (this.corsEnabled(img)) { return false; }
    return this.isURLRemote(img.src);
  }

  // Given an image, we check to see if a CORS policy has been defined.
  // @param [DOMObject] img The image to check.
  // @return [Boolean]
  static corsEnabled(img) {
    let needle;
    return (img.crossOrigin != null) && (needle = img.crossOrigin.toLowerCase(), ['anonymous', 'use-credentials'].includes(needle));
  }

  // Does the given URL exist on a different domain than the current one?
  // This is done by comparing the URL to `document.domain`.
  // @param [String] url The URL to check.
  // @return [Boolean]
  static isURLRemote(url) {
    const matches = url.match(this.domainRegex);
    if (matches) { return matches[1] !== document.domain; } else { return false; }
  }

  // Checks to see if the URL is remote, and if there is a proxy defined, it
  // @param [String] src The URL to check.
  // @return [String] The proxy URL if the image is remote. Nothing otherwise.
  static remoteCheck(src) {
    if (this.isURLRemote(src)) {
      if (!Caman.remoteProxy.length) {
        Log.info(`Attempting to load a remote image without a configured proxy. URL: ${src}`);
        return;
      } else {
        if (Caman.isURLRemote(Caman.remoteProxy)) {
          Log.info("Cannot use a remote proxy for loading images.");
          return;
        }

        return this.proxyUrl(src);
      }
    }
  }

  // Given a URL, get the proxy URL for it.
  // @param [String] src The URL to proxy.
  // @return [String] The proxy URL.
  static proxyUrl(src) {
    return `${Caman.remoteProxy}?${Caman.proxyParam}=${encodeURIComponent(src)}`;
  }

  // Shortcut for using one of the bundled proxies.
  // @param [String] lang String identifier for the proxy script language.
  // @return [String] A proxy URL.
  static useProxy(lang) {
    const langToExt = {
      ruby: 'rb',
      python: 'py',
      perl: 'pl',
      javascript: 'js'
    };

    lang = lang.toLowerCase();
    if (langToExt[lang] != null) { lang = langToExt[lang]; }
    return `proxies/caman_proxy.${lang}`;
  }
}

IO.initClass();

Caman.IO = IO;