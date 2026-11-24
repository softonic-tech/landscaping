(function () {
  "use strict";

  var SITE = "https://www.sunnystarlandscaping.com";
  var PAGE_META = {
    "/": {
      title: "Gardening & Landscaping Dubai | Sunny Star",
      description:
        "Explore gardening and landscaping services in Dubai with Sunny Star. Contact our team to discuss your garden and request a quote.",
      image: SITE + "/assets/portfolio-img-001.jpg",
    },
    "/services/": {
      title: "Gardening Services in Dubai | Sunny Star Landscaping",
      description:
        "Browse gardening and landscaping services in Dubai from Sunny Star, including maintenance, irrigation, lawn care, planting and garden makeovers.",
      image: SITE + "/assets/portfolio-img-001.jpg",
    },
    "/projects/": {
      title: "Landscaping Projects in Dubai | Sunny Star",
      description:
        "View Sunny Star landscaping projects in Dubai, including irrigation, gravel design, artificial grass, planting and recent garden photos.",
      image: SITE + "/assets/american-school-sharjah-01.jpg",
    },
    "/areas/": {
      title: "Landscaping Areas We Serve in Dubai | Sunny Star",
      description:
        "Sunny Star provides gardening and landscaping services across Dubai communities including Palm Jumeirah, Emirates Hills, Dubai Hills Estate and Arabian Ranches.",
      image: SITE + "/assets/area-waterfront.webp",
    },
    "/about/": {
      title: "About Sunny Star Landscaping | Dubai Garden Care",
      description:
        "Learn about Sunny Star Landscaping LLC in Dubai. Quality work, reliable service and practical garden care for outdoor spaces.",
      image: SITE + "/assets/area-green.webp",
    },
    "/contact/": {
      title: "Contact Sunny Star Landscaping Dubai | Request a Quote",
      description:
        "Contact Sunny Star Landscaping in Dubai by phone, WhatsApp or email to discuss gardening services and request a free site visit.",
      image: SITE + "/assets/portfolio-img-018.jpg",
    },
  };

  /**
   * Tracking is disabled until real IDs are supplied.
   * Set window.__SS_TRACKING = { gtmId: "GTM-XXXX", ga4Id: "G-XXXX", adsId: "AW-XXXX" }
   * before this script runs, or edit the CONFIG object below.
   */
  var CONFIG = window.__SS_TRACKING || {
    gtmId: "",
    ga4Id: "",
    adsId: "",
    enabled: false,
  };

  function normalizePath(pathname) {
    if (!pathname || pathname === "/index.html") return "/";
    if (pathname.length > 1 && !pathname.endsWith("/")) return pathname + "/";
    return pathname;
  }

  function upsertMeta(selector, attr, key, value) {
    var el = document.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute("content", value);
  }

  function upsertCanonical(url) {
    var link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", url);
  }

  function updateSeoForPath(pathname) {
    var path = normalizePath(pathname);
    var meta = PAGE_META[path];
    if (!meta) return;
    var url = SITE + path;
    document.title = meta.title;
    upsertMeta('meta[name="description"]', "name", "description", meta.description);
    upsertCanonical(url);
    upsertMeta('meta[property="og:url"]', "property", "og:url", url);
    upsertMeta('meta[property="og:title"]', "property", "og:title", meta.title);
    upsertMeta(
      'meta[property="og:description"]',
      "property",
      "og:description",
      meta.description
    );
    upsertMeta('meta[property="og:image"]', "property", "og:image", meta.image);
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", meta.title);
    upsertMeta(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description",
      meta.description
    );
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", meta.image);
  }

  function track(eventName, detail) {
    var payload = Object.assign({ event: eventName }, detail || {});
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    if (typeof window.gtag === "function" && CONFIG.enabled) {
      window.gtag("event", eventName, detail || {});
    }
  }

  function installTags() {
    if (!CONFIG.enabled) return;
    if (CONFIG.gtmId) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(CONFIG.gtmId);
      document.head.appendChild(s);
    }
    if (CONFIG.ga4Id || CONFIG.adsId) {
      var id = CONFIG.ga4Id || CONFIG.adsId;
      var g = document.createElement("script");
      g.async = true;
      g.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
      document.head.appendChild(g);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      window.gtag("js", new Date());
      if (CONFIG.ga4Id) window.gtag("config", CONFIG.ga4Id);
      if (CONFIG.adsId) window.gtag("config", CONFIG.adsId);
    }
  }

  function bindClickTracking() {
    document.addEventListener(
      "click",
      function (event) {
        var target = event.target.closest("a[href], [data-track]");
        if (!target) return;
        var href = target.getAttribute("href") || "";
        var explicit = target.getAttribute("data-track");
        if (explicit === "phone_click" || href.indexOf("tel:") === 0) {
          track("phone_click", { link_url: href, interaction: "click" });
          return;
        }
        if (
          explicit === "whatsapp_click" ||
          href.indexOf("wa.me/") !== -1 ||
          href.indexOf("whatsapp.com") !== -1
        ) {
          track("whatsapp_click", { link_url: href, interaction: "click" });
        }
      },
      true
    );
  }

  function formValues(form) {
    var data = new FormData(form);
    var parts = [];
    data.forEach(function (value, key) {
      if (!value) return;
      parts.push(key + ": " + value);
    });
    return parts.join("\n");
  }

  function openWhatsAppEnquiry(form) {
    var body = formValues(form);
    var text =
      "Hello Sunny Star Landscaping,%0A%0AI would like to request a quote / free site visit.%0A%0A" +
      encodeURIComponent(body || "Please contact me about gardening services in Dubai.");
    var url = "https://wa.me/971566620246?text=" + text;
    track("whatsapp_click", {
      link_url: url,
      interaction: "form_handoff",
      note: "Form is not connected to a server backend; enquiry opens WhatsApp.",
    });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function hardenForms() {
    document.addEventListener(
      "submit",
      function (event) {
        var form = event.target;
        if (!(form instanceof HTMLFormElement)) return;
        if (
          form.classList.contains("aq-contact-form") ||
          form.classList.contains("aq-footer-news-form")
        ) {
          event.preventDefault();
          event.stopPropagation();
          if (typeof event.stopImmediatePropagation === "function") {
            event.stopImmediatePropagation();
          }
          if (!form.checkValidity()) {
            form.reportValidity();
            return;
          }
          openWhatsAppEnquiry(form);
          var note = form.querySelector("[data-form-note]");
          if (!note) {
            note = document.createElement("p");
            note.setAttribute("data-form-note", "true");
            note.style.marginTop = "12px";
            form.appendChild(note);
          }
          note.textContent =
            "Opening WhatsApp so your enquiry can reach the Sunny Star team. No server-side form backend is connected on this website.";
        }
      },
      true
    );
  }

  function markJsReady() {
    document.body.classList.add("js-ready");
  }

  function watchSpaNavigation() {
    updateSeoForPath(location.pathname);
    var pushState = history.pushState;
    var replaceState = history.replaceState;
    history.pushState = function () {
      var result = pushState.apply(this, arguments);
      updateSeoForPath(location.pathname);
      return result;
    };
    history.replaceState = function () {
      var result = replaceState.apply(this, arguments);
      updateSeoForPath(location.pathname);
      return result;
    };
    window.addEventListener("popstate", function () {
      updateSeoForPath(location.pathname);
    });
  }

  document.documentElement.lang = document.documentElement.lang || "en";
  installTags();
  bindClickTracking();
  hardenForms();
  watchSpaNavigation();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", markJsReady);
  } else {
    markJsReady();
  }

  // Expose helpers for manual testing.
  window.__ssSeo = {
    updateSeoForPath: updateSeoForPath,
    track: track,
    config: CONFIG,
  };
})();
