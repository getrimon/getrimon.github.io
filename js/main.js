(function () {
  const cfg = window.SITE_CONFIG || {};
  const projects = window.PROJECTS || [];

  /* ---------- Mobile nav ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".mobile-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("open");
      toggle.setAttribute(
        "aria-expanded",
        menu.classList.contains("open") ? "true" : "false"
      );
    });
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => menu.classList.remove("open"))
    );
  }

  /* ---------- Active nav link ---------- */
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach((a) => {
    if (a.getAttribute("data-nav") === path) a.classList.add("active");
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ---------- Inject config-driven content ---------- */
  document.querySelectorAll("[data-cfg]").forEach((el) => {
    const key = el.getAttribute("data-cfg");
    if (cfg[key]) {
      if (el.tagName === "A") el.href = cfg[key];
      else el.textContent = cfg[key];
    }
  });
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = cfg.year || new Date().getFullYear();
  });
  const waLinks = document.querySelectorAll('[href="#whatsapp"]');
  waLinks.forEach((a) => (a.href = cfg.whatsapp || "#"));
  const mailLinks = document.querySelectorAll('[href="#email"]');
  mailLinks.forEach((a) => (a.href = "mailto:" + (cfg.email || "")));

  /* ---------- Project card template ---------- */
  function projectCard(p) {
    return `
      <a class="project-card reveal" href="project.html?p=${p.slug}">
        <img class="project-thumb" src="${p.thumbnail}" alt="${p.title}" loading="lazy" />
        <div class="project-body">
          <div class="project-cat">${p.category} · ${p.year}</div>
          <h3>${p.title}</h3>
          <p>${p.shortDescription}</p>
          <div class="project-tech">
            ${p.technologies.slice(0, 3).map((t) => `<span class="badge">${t}</span>`).join("")}
          </div>
        </div>
      </a>`;
  }

  /* ---------- Home: featured projects ---------- */
  const featuredGrid = document.getElementById("featured-projects");
  if (featuredGrid) {
    const featured = projects.filter((p) => p.featured);
    featuredGrid.innerHTML = featured.map(projectCard).join("");
    observeNew(featuredGrid);
  }

  /* ---------- Work page: filterable grid ---------- */
  const workGrid = document.getElementById("work-grid");
  if (workGrid) {
    const cats = ["All", ...new Set(projects.map((p) => p.category))];
    const filterBar = document.getElementById("filter-bar");
    if (filterBar) {
      filterBar.innerHTML = cats
        .map(
          (c, i) =>
            `<button class="filter-btn${i === 0 ? " active" : ""}" data-cat="${c}">${c}</button>`
        )
        .join("");
      filterBar.addEventListener("click", (e) => {
        const btn = e.target.closest(".filter-btn");
        if (!btn) return;
        filterBar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        render(btn.getAttribute("data-cat"));
      });
    }
    function render(cat) {
      const list = cat === "All" ? projects : projects.filter((p) => p.category === cat);
      workGrid.innerHTML = list.length
        ? list.map(projectCard).join("")
        : `<div class="empty-state">No projects in this category yet.</div>`;
      observeNew(workGrid);
    }
    render("All");
  }

  /* ---------- Project detail page ---------- */
  const detailRoot = document.getElementById("project-detail");
  if (detailRoot) {
    const slug = new URLSearchParams(location.search).get("p");
    const p = window.getProjectBySlug ? window.getProjectBySlug(slug) : null;
    if (!p) {
      detailRoot.innerHTML = `<div class="empty-state"><h2>Project not found</h2><p>It may have been renamed or removed.</p><a class="btn btn-primary" href="work.html">Back to Work</a></div>`;
    } else {
      document.title = p.title + " — " + (cfg.brand || "Get Rimon");
      let html = `
        <div class="detail-meta">${p.category} · ${p.year} · ${p.client}</div>
        <h1>${p.title}</h1>
        <p style="font-size:1.1rem;max-width:60ch;">${p.description}</p>
        <img class="detail-hero-img" src="${p.thumbnail}" alt="${p.title}" />`;

      if (p.video) {
        html += `<div class="video-wrap">${
          p.video.includes("youtube") || p.video.includes("vimeo")
            ? `<iframe src="${p.video}" title="${p.title} video" allowfullscreen loading="lazy"></iframe>`
            : `<video src="${p.video}" controls></video>`
        }</div>`;
      }

      html += section("The Challenge", p.challenge);
      html += section("What I Did", p.whatIDid);
      html += section("The Solution", p.solution);

      if (p.businessValue && p.businessValue.length) {
        html += `<div class="detail-section"><h2>Business Value</h2><ul class="value-list">${p.businessValue
          .map((v) => `<li>${v}</li>`)
          .join("")}</ul></div>`;
      }

      if (p.technologies && p.technologies.length) {
        html += `<div class="detail-section"><h2>Technologies</h2><div class="project-tech">${p.technologies
          .map((t) => `<span class="badge">${t}</span>`)
          .join("")}</div></div>`;
      }

      if (p.gallery && p.gallery.length) {
        html += `<div class="detail-section"><h2>Project Gallery</h2><div class="detail-gallery">${p.gallery
          .map((g) => `<img src="${g}" alt="${p.title} gallery image" loading="lazy" />`)
          .join("")}</div></div>`;
      }

      if (p.websiteUrl) {
        html += `<a class="btn btn-accent" href="${p.websiteUrl}" target="_blank" rel="noopener">Visit Live Website</a>`;
      }

      const idx = projects.findIndex((x) => x.slug === p.slug);
      const next = projects[(idx + 1) % projects.length];
      if (next && next.slug !== p.slug) {
        html += `
          <div class="detail-section" style="margin-top:64px;border-top:1px solid var(--line);padding-top:40px;">
            <h2>Next Project</h2>
            <a class="project-card" href="project.html?p=${next.slug}" style="max-width:360px;display:block;margin-top:16px;">
              <img class="project-thumb" src="${next.thumbnail}" alt="${next.title}" loading="lazy" />
              <div class="project-body"><h3>${next.title}</h3></div>
            </a>
          </div>`;
      }

      detailRoot.innerHTML = html;
    }
  }

  function section(title, body) {
    if (!body) return "";
    return `<div class="detail-section"><h2>${title}</h2><p style="max-width:64ch;">${body}</p></div>`;
  }

  function observeNew(container) {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    container.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  }
})();
