const http = require("http");
const { URL } = require("url");

const PORT = Number(process.env.PORT || 5199);
const ORIGIN = "https://everswap.com";
const logs = [];

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".buf": "application/octet-stream",
  ".ico": "image/x-icon",
};

function remember(message) {
  const line = `${new Date().toISOString()} ${message}`;
  logs.push(line);
  if (logs.length > 250) logs.shift();
  console.log(line);
}

function contentType(pathname) {
  const match = pathname.match(/\.[^.\/]+$/);
  return mime[match ? match[0].toLowerCase() : ".html"] || "application/octet-stream";
}

function portfolioHtml(html) {
  let out = html;
  const whatsappUrl = "https://wa.me/917993502394";
  const gmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=mouglipraful@gmail.com";
  const replacements = [
    ["EverSwap | One Pool. Every Function.", "Mouli Portfolio"],
    ["Mouli Portfolio - Trade, Lend, Ship.", "Mouli Portfolio - Design, Code, Ship."],
    ["EverSwap", "Mouli Portfolio"],
    ["One Pool. Every Function.", "Selected work, systems, and visual craft."],
    ["DeFi at Peak.", "The Dev of the Future"],
    ["<h1 class=\"title\">Mouli Portfolio</h1>", "<h1 class=\"title\">Mouli</h1>"],
    ["<span>Pool</span>", "<span>Craft</span>"],
    ["Swap. Lend.", "Design. Code."],
    ["Borrow.", "Ship."],
    [
      "Mouli Portfolio unifies trading, lending, and borrowing through single-sided liquidity pools.",
      "Mouli builds future-ready web products, portfolio experiences, dashboards, and automation with clean UI, fast motion, and production-minded code.",
    ],
    ["Where liquidity", "Where ideas"],
    [
      "Smoother execution, more efficient markets, and better capital use across the system.",
      "I turn rough ideas into smooth front-end systems, blending design taste with practical engineering and reliable delivery.",
    ],
    ["for EVERyone", "for modern teams"],
    [">LPs<", ">Web Apps<"],
    [">Borrowers<", ">Interfaces<"],
    [">Traders<", ">Automation<"],
    [
      "Deposit one asset and earn from swaps, borrowing, and internal arbitrage.",
      "I build responsive websites, portfolio systems, and dashboards that feel fast, clear, and premium across every screen.",
    ],
    [
      "Access capital through single-asset collateral and a borrowing model built for changing markets.",
      "I shape complex product ideas into readable screens, useful states, and interaction flows that people can understand quickly.",
    ],
    [
      "Get better execution with direct swaps, cleaner routing, and more efficient markets.",
      "I connect design, code, and automation so projects move from concept to working product with fewer loose ends.",
    ],
    [
      "Earn from every function in the system through single-sided liquidity and unified pool exposure.",
      "Launch responsive portfolio sites and production dashboards with motion that feels intentional.",
    ],
    [
      "Access capital through one shared pool with simplified positions and smoother liquidity.",
      "Turn complex workflows into clear screens, fast controls, and readable interaction states.",
    ],
    [
      "Get better execution with direct swaps, cleaner routing, and more efficient markets.",
      "Connect design, code, and automation so work ships with fewer loose ends.",
    ],
    ["Re<span>DeFi</span>ned", "Pol<span>ish</span>ed"],
    [
      "A new model for deeper, cleaner, and more efficient liquidity.",
      "My work is shaped around depth, clarity, polish, and the kind of details that make a digital product feel alive.",
    ],
    ["One Pool", "One Portfolio"],
    ["Every Function", "Every Detail"],
    [
      "Building a more capital-efficient foundation for on-chain markets.",
      "Building refined digital work with strong layout, smooth motion, front-end engineering, and a future-facing developer mindset.",
    ],
    [">Launch App<", ">Contact<"],
    [">Coming soon<", ">Contact<"],
    ["Stay close to the summit", "Stay close to the craft"],
    [">Climb with<", ">Build with<"],
    [">Telegram<", ">Email<"],
    [">Twitter (X)<", ">GitHub<"],
    ['href="https://t.me/Mouli Portfolio"', 'href="mailto:mouli@example.com"'],
    ['href="https://x.com/Mouli PortfolioX"', 'href="https://github.com/"'],
    ["https://everswap.com/", "/"],
    ["https://everswap.com/meta/ogimage.jpg", "/meta/ogimage.jpg"],
  ];
  for (const [from, to] of replacements) out = out.split(from).join(to);
  out = out
    .replace(/<a id="site-header__cta" class="button is-transparent" role="button"/g, `<a id="site-header__cta" class="button is-transparent" role="button" href="${whatsappUrl}" target="_blank" rel="noopener"`)
    .replace(/<a id="site-header__mobile-cta" class="button" role="button"/g, `<a id="site-header__mobile-cta" class="button" role="button" href="${whatsappUrl}" target="_blank" rel="noopener"`)
    .replace(/<a id="home-pool__cta" class="button" role="button"/g, `<a id="home-pool__cta" class="button" role="button" href="${whatsappUrl}" target="_blank" rel="noopener"`)
    .replace(/<a role="button" href="mailto:mouli@example.com" target="_blank"> <span>Email<\/span> <\/a> <a role="button" href="https:\/\/github.com\/" target="_blank"> <span>GitHub<\/span> <\/a>/g, `<a role="button" href="${gmailUrl}" target="_blank" rel="noopener"> <span>Email</span> </a>`);
  out = out.replace(/<title>.*?<\/title>/, "<title>Mouli Portfolio - Design, Code, Ship.</title>");
  out = out.replace(/<script defer src="https:\/\/static\.cloudflareinsights\.com[^>]+><\/script>/g, "");
  out = out.replace(
    "</head>",
    `<style>
      #site-header__logo a svg,
      #site-header__mobile-logo a svg {
        display: none !important;
      }
      #site-header__logo a::before,
      #site-header__mobile-logo a::before {
        content: "◇ Mouli Portfolio";
        display: inline-flex;
        align-items: center;
        height: 32px;
        color: #f8f7f2;
        font-family: Britti Sans, Arial, sans-serif;
        font-size: clamp(18px, 2.8vw, 22px);
        font-weight: 700;
        letter-spacing: 0;
        white-space: nowrap;
      }
      #site-header__mobile-logo a::before { font-size: 18px; height: 20px; }
      #site-header__logo a { text-decoration: none; }
      #home-hero .kicker,
      #home-hero .title,
      #home-hero .subtitle {
        visibility: visible !important;
      }
      #home-hero .kicker,
      #home-hero .subtitle {
        word-spacing: 0.18em;
      }
      #home-hero .section__content {
        position: relative;
        z-index: 2;
      }
      #preloader-logo svg { display: none !important; }
      #preloader-logo::before {
        content: "◇";
        display: grid;
        place-items: center;
        width: 218px;
        height: 220px;
        color: #f8f7f2;
        font: 300 132px Feature Display, Georgia, serif;
      }
    </style></head>`
  );
  out = out.replace(
    "</body>",
    `<script>
      (() => {
        const heroSelector = "#home-hero .kicker, #home-hero h1.title, #home-hero .subtitle";
        const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
        const isVisible = (selector) => {
          const el = document.querySelector(selector);
          if (!el) return false;
          const style = getComputedStyle(el);
          return style.visibility !== "hidden" && Number(style.opacity || 1) > 0.04;
        };
        const paint = () => {
          const hero = document.querySelector("#home-hero");
          const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
          const heroNearStart = clamp((heroBottom - innerHeight * 0.55) / (innerHeight * 0.9), 0, 1);
          const laterSectionActive = [
            "#home-everblade .title",
            "#home-everblade .description",
            "#home-evernet .title",
            "#home-everyone .title",
            "#home-relayers .title",
            "#home-pool .title",
            "#home-join .title"
          ].some(isVisible);
          const opacity = laterSectionActive ? 0 : heroNearStart;
          document.querySelectorAll(heroSelector).forEach((el) => {
            el.style.setProperty("opacity", opacity.toFixed(3), "important");
            el.style.setProperty("visibility", opacity > 0.04 ? "visible" : "hidden", "important");
          });
          requestAnimationFrame(paint);
        };
        addEventListener("load", () => requestAnimationFrame(paint));
      })();
    </script></body>`
  );
  return out;
}

function portfolioJs(js) {
  return js.replace(
    "update(e){if(!properties.hasInitialized)return;let t=cameraControls.scene1AnimationRatio",
    "update(e){this.container.visible=!1;return;let t=cameraControls.scene1AnimationRatio"
  );
}

async function proxy(pathname, res) {
  const attempts = pathname === "/textures/lens_dirt.jpg"
    ? ["/textures/lens_dirt.jpg", "/textures/waterNormal.jpg"]
    : pathname === "/favicon.ico"
      ? ["/favicon.ico", "/meta/apple-touch-icon.png"]
      : [pathname];

  for (const candidate of attempts) {
    const remote = `${ORIGIN}${candidate}`;
    const response = await fetch(remote, {
      headers: {
        "user-agent": "Mozilla/5.0",
        "accept": "*/*",
      },
    });
    remember(`${response.status} ${pathname}${candidate !== pathname ? ` via ${candidate}` : ""}`);
    if (response.ok) {
      let body = Buffer.from(await response.arrayBuffer());
      if (pathname === "/_astro/hoisted.D5QinsOB.js") {
        body = Buffer.from(portfolioJs(body.toString("utf8")), "utf8");
      }
      res.writeHead(200, {
        "content-type": contentType(candidate),
        "cache-control": "no-store",
        "access-control-allow-origin": "*",
      });
      res.end(body);
      return;
    }
  }

  res.writeHead(404, { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" });
  res.end("Not found");
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
    const pathname = decodeURIComponent(url.pathname);

    if (pathname === "/__log") {
      res.writeHead(200, { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" });
      res.end(logs.join("\n"));
      return;
    }

    if (pathname === "/" || pathname === "/index.html") {
      const response = await fetch(`${ORIGIN}/`, { headers: { "user-agent": "Mozilla/5.0" } });
      let html = await response.text();
      html = portfolioHtml(html);
      remember(`200 ${pathname} transformed`);
      res.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
      res.end(html);
      return;
    }

    await proxy(pathname, res);
  } catch (error) {
    remember(`500 ${req.url} ${error.message}`);
    res.writeHead(500, { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" });
    res.end(error.stack || String(error));
  }
});

server.listen(PORT, "0.0.0.0", () => {
  remember(`Mouli portfolio proxy listening on http://127.0.0.1:${PORT}/`);
});
