/*
 * Osuma – compares a job ad with a CV entirely in the browser.
 * No network requests, no storage, no cookies.
 */
(function () {
  'use strict';

  // ---------- Texts ----------

  var I18N = {
    fi: {
      tagline: 'Vertaa työpaikkailmoitusta ja CV:täsi',
      privacy: 'Tekstit käsitellään vain tässä selaimessa. Mitään ei lähetetä minnekään, eikä käytössä ole analytiikkaa tai evästeitä.',
      adLabel: 'Työpaikkailmoitus',
      cvLabel: 'CV',
      adPlaceholder: 'Liitä työpaikkailmoituksen teksti tähän…',
      cvPlaceholder: 'Liitä CV:si teksti tähän…',
      compare: 'Vertaa',
      example: 'Esimerkki',
      clear: 'Tyhjennä',
      results: 'Tulos',
      requirements: 'Vaatimukset',
      keywords: 'Avainsanat',
      found: 'Löytyy CV:stä',
      missing: 'Puuttuu CV:stä',
      howto: 'Vertailu tehdään sanan alun perusteella, joten taivutetut muodot löytyvät (esim. "myynti" löytää sanan "myyntityössä"). Yleiset täytesanat jätetään pois. Nuoli näyttää, mikä CV:n sana vastasi.',
      footer: 'Osuma v1 · ilman tekoälyä · MIT-lisenssi',
      noscript: 'Osuma tarvitsee JavaScriptin. Kaikki käsittely tapahtuu selaimessasi.',
      errBoth: 'Liitä sekä työpaikkailmoitus että CV.',
      errAd: 'Liitä työpaikkailmoitus.',
      errCv: 'Liitä CV.',
      errNoKeywords: 'Ilmoituksesta ei löytynyt vertailtavia sanoja.',
      scoreText: function (f, t) { return f + ' / ' + t + ' ilmoituksen avainsanasta löytyy CV:stä.'; },
      reqSummary: function (f, t) { return f + ' / ' + t + ' vaatimuksesta täyttyy (vähintään puolet sen avainsanoista löytyy CV:stä).'; },
      announce: function (s) { return 'Vertailu valmis: ' + s + ' %.'; },
      more: function (n) { return '+ ' + n + ' lisää'; },
      none: 'Ei yhtään.',
      reqOk: 'Täyttyy: ',
      reqMiss: 'Ei täyty: ',
      times: function (n) { return ', ' + n + ' kertaa ilmoituksessa'; },
      cvWord: ', CV:ssä ',
      langGroup: 'Kieli / Language'
    },
    en: {
      tagline: 'Compare a job ad with your CV',
      privacy: 'Your texts are processed only in this browser. Nothing is sent anywhere, and there are no analytics or cookies.',
      adLabel: 'Job ad',
      cvLabel: 'CV',
      adPlaceholder: 'Paste the job ad text here…',
      cvPlaceholder: 'Paste your CV text here…',
      compare: 'Compare',
      example: 'Example',
      clear: 'Clear',
      results: 'Result',
      requirements: 'Requirements',
      keywords: 'Keywords',
      found: 'Found in CV',
      missing: 'Missing from CV',
      howto: 'Words are compared by their beginning, so inflected forms match (e.g. "manage" finds "managing", "myynti" finds "myyntityössä"). Common filler words are ignored. The arrow shows which CV word matched.',
      footer: 'Osuma v1 · no AI · MIT licence',
      noscript: 'Osuma needs JavaScript. Everything is processed in your browser.',
      errBoth: 'Paste both the job ad and your CV.',
      errAd: 'Paste the job ad.',
      errCv: 'Paste your CV.',
      errNoKeywords: 'No comparable words were found in the job ad.',
      scoreText: function (f, t) { return f + ' / ' + t + ' keywords from the ad were found in your CV.'; },
      reqSummary: function (f, t) { return f + ' / ' + t + ' requirements met (at least half of their keywords appear in your CV).'; },
      announce: function (s) { return 'Comparison done: ' + s + '%.'; },
      more: function (n) { return '+ ' + n + ' more'; },
      none: 'None.',
      reqOk: 'Met: ',
      reqMiss: 'Not met: ',
      times: function (n) { return ', ' + n + ' times in the ad'; },
      cvWord: ', in CV ',
      langGroup: 'Language / Kieli'
    }
  };

  var EXAMPLE = {
    fi: {
      ad: 'Myyntipäällikkö, Helsinki\n\nHaemme kokenutta myyntipäällikköä vastaamaan yritysasiakkaiden myynnistä.\n\nEdellytämme:\n- Vähintään 3 vuoden kokemus B2B-myyntityöstä\n- Sujuva suomen ja englannin kieli\n- Kokemus CRM-järjestelmistä, mieluiten Salesforce\n- Hyvät neuvottelutaidot ja asiakaslähtöinen asenne\n- B-ajokortti\n\nEduksi katsotaan:\n- Tiimin johtaminen\n- Excel-osaaminen',
      cv: 'Myyntiedustaja, Firma Oy 2019–2024\nToimin B2B-myyntityössä ja vastasin yritysasiakkaista. Käytin päivittäin Salesforcea ja vedin neljän hengen tiimiä.\n\nKielitaito: suomi (äidinkieli), englanti (sujuva)\nAjokortti: B'
    },
    en: {
      ad: 'Sales Manager, London\n\nWe are looking for an experienced sales manager to lead our corporate sales.\n\nRequirements:\n- 3+ years of experience in B2B sales\n- Fluent English, Finnish is a plus\n- Experience with CRM systems, ideally Salesforce\n- Strong negotiation skills and a customer-focused attitude\n- Driving licence\n\nNice to have:\n- Team leadership\n- Advanced Excel',
      cv: 'Sales Representative, Firma Ltd 2019–2024\nWorked in B2B sales managing corporate customers. Used Salesforce daily and led a team of four.\n\nLanguages: Finnish (native), English (fluent)'
    }
  };

  // ---------- Stop words ----------

  var STOP_FI = (
    'ja tai sekä että eli on ovat oli olivat olla ole olen olet olemme olette ollut olleet olisi olisit oltava olevan oleva olevaa olevia ' +
    'ei eikä en et emme ette eivät mutta vaan kuin kun jos niin myös vain jo nyt sitten siis sillä koska vaikka jotta kuten ' +
    'joka jotka jonka joiden jota joita jossa joissa josta joista johon joihin jolla joilla jolle joille jolta ' +
    'mikä mitkä mitä missä mistä mihin miten miksi milloin millä mille kuka ketkä kenen ' +
    'se sen sitä siinä siitä siihen sille siltä ne niiden niitä niissä niistä niihin niillä niille ' +
    'tämä tämän tätä tässä tästä tähän tällä tälle tältä nämä näiden näitä näissä näistä näihin näillä ' +
    'tuo tuon tuota nuo noiden ' +
    'minä minun minua minulla minulle minulta minussa sinä sinun sinua sinulla sinulle sinulta sinussa sinusta sinuun ' +
    'hän hänen häntä hänellä hänelle me meidän meitä meillä meille meiltä meihin meissä meistä ' +
    'te teidän teitä teillä teille teiltä he heidän heitä heillä heille ' +
    'oma omaa oman omat omia omien omalla omassa omaan ' +
    'hyvin hyvä hyvää hyvät hyviä hyvien erittäin todella paljon eri kaikki kaikkia kaiken kaikkien jokin jotain jotakin muu muut muita muiden ' +
    'esim yms jne mm ns ym noin yli alle kanssa mukaan kautta ennen jälkeen aikana lisäksi kohti vuoksi takia välillä vai voi voit voivat voida voisi ' +
    'tulee tulisi tulla pitää saa saada saat saamme ' +
    'haemme etsimme tarjoamme odotamme toivomme arvostamme edellytämme edellytetään vaadimme ' +
    'eduksi etua katsotaan plussaa mieluiten vähintään vuosi vuoden vuotta vuodesta ' +
    'hae hakea hakemus hakemuksen hakemuksesi haku hakuaika lisätietoja lisätiedot ' +
    'www http https com fi'
  ).split(/\s+/);

  var STOP_EN = (
    'and or the an of to in on at for with by from as is are be been being was were will would should shall can could may might must ' +
    'have has had do does did you your yours we our ours us they their them he she his her it its this that these those ' +
    'who whom whose which what where when why how not no nor but if so than then also very more most other others such into onto about ' +
    'over under all any some each both either neither etc e.g i.e eg ie plus well able strong good great excellent ideally preferably ' +
    'looking seeking join apply applicants candidate candidates role position opportunity offer offers including include includes ' +
    'within across per via there here just only own one ' +
    'requirements required nice least year years minimum'
  ).split(/\s+/);

  var STOP = Object.create(null);
  STOP_FI.concat(STOP_EN).forEach(function (w) { if (w) STOP[w] = true; });

  // Acronyms that would otherwise be stop words, kept when written in capitals (IT, US).
  var CAPS_KEEP = { it: true, us: true };
  // Very short skill names, kept when capitalised (C, R, Go, Qt).
  var SHORT_SKILLS = { c: true, r: true, go: true, qt: true };

  // ---------- Text processing ----------

  var TOKEN_RE = /[\p{L}\p{N}][\p{L}\p{N}+#.\-]*/gu;
  var HAS_LETTER = /\p{L}/u;

  // Returns [{ word: lowercased, raw: original, index, length }]
  function tokenize(text) {
    var out = [];
    var m;
    TOKEN_RE.lastIndex = 0;
    while ((m = TOKEN_RE.exec(text)) !== null) {
      var raw = m[0].replace(/[.\-]+$/, '');
      if (raw) out.push({ word: raw.toLowerCase(), raw: raw, index: m.index, length: raw.length });
    }
    return out;
  }

  function isKeyword(tok) {
    var w = tok.word;
    var raw = tok.raw;
    if (!HAS_LETTER.test(w)) return false; // pure numbers
    var caps = raw === raw.toUpperCase() && raw !== raw.toLowerCase();
    if (SHORT_SKILLS[w]) return raw.charAt(0) !== raw.charAt(0).toLowerCase();
    if (STOP[w]) return caps && !!CAPS_KEEP[w];
    if (w.length >= 3) return true;
    // Two-letter tokens only when they look like an acronym or symbol (UX, HR, C#)
    return w.length === 2 && (caps || /[+#]/.test(w));
  }

  function commonPrefix(a, b) {
    var n = Math.min(a.length, b.length);
    var i = 0;
    while (i < n && a.charCodeAt(i) === b.charCodeAt(i)) i++;
    return i;
  }

  // Finnish consonant gradation: myynti/myynnin, kauppa/kaupan, ilmoittaa/ilmoitus.
  // Both words get the same treatment, so this only affects how they compare.
  var gradeCache = Object.create(null);
  function degrade(w) {
    var g = gradeCache[w];
    if (g === undefined) {
      g = w.replace(/nn/g, 'nt').replace(/mm/g, 'mp').replace(/ll/g, 'lt').replace(/rr/g, 'rt')
        .replace(/kk/g, 'k').replace(/pp/g, 'p').replace(/tt/g, 't');
      gradeCache[w] = g;
    }
    return g;
  }

  // How many leading letters of a word must match.
  function stemLen(n) {
    if (n <= 4) return n;
    if (n <= 7) return Math.max(4, n - 2);
    return n - 3;
  }

  // Letters that Finnish case endings and English suffixes are made of.
  // "kokemus" may match "kokemuksesta" (rest "ksesta"), but "sales" must not
  // match "salesforce" (rest "force") nor "java" match "javascript".
  var ENDING_RE = /^[aäeidghjklmnorstuyö]{0,6}$/;

  // Does CV word `c` count as the ad word `a`?
  function wordsMatch(a, c) {
    if (a === c) return true;
    a = degrade(a);
    c = degrade(c);
    if (a === c) return true;
    if (a.length < 3 || c.length < 3) return false; // short words (UX, B) must match exactly
    var p = commonPrefix(a, c);
    if (c.length > a.length) {
      // CV word is longer: an inflected form or a compound (myynti → myyntityössä).
      // Short ad words may only get a short ending (SQL ≠ SQLite, Git ≠ GitHub).
      if (a.length <= 4 && c.length - a.length > a.length - 1) return false;
      return p >= stemLen(a.length);
    }
    // CV word is shorter: the ad uses an inflected form (kokemuksesta ← kokemus).
    return p >= stemLen(c.length) && ENDING_RE.test(a.slice(p));
  }

  // CV words indexed by their first three (degraded) letters, so lookups stay fast.
  function buildIndex(words) {
    var exact = Object.create(null);
    var buckets = Object.create(null);
    words.forEach(function (w) {
      exact[w] = true;
      var d = degrade(w);
      if (d.length < 3) return;
      var k = d.slice(0, 3);
      (buckets[k] || (buckets[k] = [])).push(w);
    });
    return { exact: exact, buckets: buckets };
  }

  function findWord(word, index) {
    if (index.exact[word]) return word;
    var d = degrade(word);
    if (d.length < 3) return null;
    var list = index.buckets[d.slice(0, 3)];
    if (!list) return null;
    for (var i = 0; i < list.length; i++) {
      if (wordsMatch(word, list[i])) return list[i];
    }
    return null;
  }

  // Hyphenated words (B-ajokortti, CRM-järjestelmä) also match when every
  // part is found separately, single letters included.
  function findInCv(word, index) {
    var hit = findWord(word, index);
    if (hit || word.indexOf('-') === -1) return hit;
    var parts = word.split('-').filter(Boolean);
    var hits = [];
    for (var i = 0; i < parts.length; i++) {
      var h = findWord(parts[i], index);
      if (!h) return null;
      if (hits.indexOf(h) === -1) hits.push(h);
    }
    return hits.length ? hits.join(' + ') : null;
  }

  var BULLET_RE = /^\s*(?:[-–—•*·▪●◦►]|\d{1,2}[.)])\s+/;
  var SENTENCE_RE = /(?<!\b(?:e\.g|i\.e|esim|mm|ns|ym|jne|yms|etc))(?<=[.!?;])\s+|\r?\n+/i;

  function requirementLines(ad) {
    var lines = ad.split(/\r?\n/);
    var bullets = lines.filter(function (l) { return BULLET_RE.test(l); })
      .map(function (l) { return l.replace(BULLET_RE, '').trim(); })
      .filter(Boolean);
    if (bullets.length) return bullets;
    // No bullet list: fall back to sentences.
    return ad.split(SENTENCE_RE)
      .map(function (s) { return s.trim(); })
      .filter(function (s) { return s && s.length <= 300; });
  }

  function analyse(ad, cv) {
    var cvWords = [];
    var seen = Object.create(null);
    function addCvWord(w) {
      if (w && !seen[w]) { seen[w] = true; cvWords.push(w); }
    }
    tokenize(cv).forEach(function (t) {
      addCvWord(t.word);
      if (t.word.indexOf('-') !== -1) t.word.split('-').forEach(addCvWord);
    });
    var index = buildIndex(cvWords);

    // Every distinct ad word is checked against the CV on its own.
    var matchOf = Object.create(null);
    function match(word) {
      if (!(word in matchOf)) matchOf[word] = findInCv(word, index);
      return matchOf[word];
    }

    // Inflected forms of the same word (kokemus, kokemusta) are shown as one
    // keyword. Words join a group only when they match its first word both ways.
    var groups = [];
    var groupBuckets = Object.create(null);
    var groupOf = Object.create(null);
    function groupFor(word, raw) {
      if (groupOf[word]) return groupOf[word];
      var d = degrade(word);
      var key = d.length >= 3 ? d.slice(0, 3) : '=' + word;
      var list = groupBuckets[key] || (groupBuckets[key] = []);
      var g = null;
      if (d.length >= 3) {
        for (var i = 0; i < list.length; i++) {
          var other = list[i].word;
          if (Math.abs(other.length - word.length) <= 3 && wordsMatch(word, other) && wordsMatch(other, word)) { g = list[i]; break; }
        }
      }
      if (!g) {
        g = { word: word, label: raw.toLowerCase(), count: 0, order: groups.length, match: null };
        groups.push(g);
        list.push(g);
      }
      var m = match(word);
      if (m && !g.match) g.match = m;
      groupOf[word] = g;
      return g;
    }

    tokenize(ad).forEach(function (t) {
      if (isKeyword(t)) groupFor(t.word, t.raw).count++;
    });

    var reqs = requirementLines(ad).map(function (line) {
      var parts = [];
      var pos = 0;
      var total = 0, found = 0;
      var counted = [];
      tokenize(line).forEach(function (t) {
        if (t.index > pos) parts.push({ text: line.slice(pos, t.index) });
        if (isKeyword(t)) {
          var ok = !!match(t.word);
          var key = groupOf[t.word] || t.word;
          parts.push({ text: t.raw, ok: ok });
          if (counted.indexOf(key) === -1) {
            counted.push(key);
            total++;
            if (ok) found++;
          }
        } else {
          parts.push({ text: t.raw });
        }
        pos = t.index + t.length;
      });
      if (pos < line.length) parts.push({ text: line.slice(pos) });
      return { parts: parts, total: total, found: found, ok: total > 0 && found / total >= 0.5 };
    }).filter(function (r) { return r.total > 0; });

    var foundGroups = groups.filter(function (g) { return g.match; });
    var missingGroups = groups.filter(function (g) { return !g.match; });
    function byWeight(a, b) { return b.count - a.count || a.order - b.order; }
    foundGroups.sort(byWeight);
    missingGroups.sort(byWeight);

    return {
      total: groups.length,
      found: foundGroups,
      missing: missingGroups,
      reqs: reqs,
      score: groups.length ? Math.round(100 * foundGroups.length / groups.length) : 0
    };
  }

  // ---------- UI ----------

  var MAX_REQS = 100;
  var MAX_CHIPS = 200;

  var $ = function (id) { return document.getElementById(id); };
  var lang = 'fi';
  var lastResult = null;
  var lastError = null;

  function t(key) { return I18N[lang][key]; }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function srOnly(text) { return el('span', 'sr-only', text); }

  function hidden(tag, cls, text) {
    var e = el(tag, cls, text);
    e.setAttribute('aria-hidden', 'true');
    return e;
  }

  function setLang(next) {
    lang = I18N[next] ? next : 'en';
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (node) {
      node.textContent = t(node.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (node) {
      node.placeholder = t(node.getAttribute('data-i18n-placeholder'));
    });
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });
    document.querySelector('.lang').setAttribute('aria-label', t('langGroup'));
    $('message').textContent = lastError ? t(lastError) : '';
    if (lastResult) render(lastResult);
  }

  function renderChips(list, groups, cls) {
    list.replaceChildren();
    if (!groups.length) {
      list.appendChild(el('li', 'empty', t('none')));
      return;
    }
    groups.slice(0, MAX_CHIPS).forEach(function (g) {
      var li = el('li', 'chip ' + cls, g.label);
      if (g.count > 1) {
        li.appendChild(hidden('span', 'n', '×' + g.count));
        li.appendChild(srOnly(t('times')(g.count)));
      }
      if (g.match && g.match !== g.word) {
        li.appendChild(hidden('span', 'via', '→ ' + g.match));
        li.appendChild(srOnly(t('cvWord') + g.match));
      }
      list.appendChild(li);
    });
    if (groups.length > MAX_CHIPS) list.appendChild(el('li', 'empty', t('more')(groups.length - MAX_CHIPS)));
  }

  function render(r) {
    $('score-value').textContent = r.score;
    $('score-bar').style.width = r.score + '%';
    $('score-text').textContent = t('scoreText')(r.found.length, r.total);

    var reqBlock = $('req-block');
    var reqList = $('req-list');
    reqList.replaceChildren();
    if (r.reqs.length) {
      reqBlock.hidden = false;
      var met = r.reqs.filter(function (q) { return q.ok; }).length;
      $('req-summary').textContent = t('reqSummary')(met, r.reqs.length);
      r.reqs.slice(0, MAX_REQS).forEach(function (q) {
        var li = el('li', 'req ' + (q.ok ? 'ok' : 'miss'));
        li.appendChild(hidden('span', 'req-icon', q.ok ? '✓' : '✗'));
        var text = el('span', 'req-text');
        text.appendChild(srOnly(q.ok ? t('reqOk') : t('reqMiss')));
        q.parts.forEach(function (p) {
          if (p.ok === undefined) text.appendChild(document.createTextNode(p.text));
          else text.appendChild(el('span', p.ok ? 'w-ok' : 'w-miss', p.text));
        });
        li.appendChild(text);
        reqList.appendChild(li);
      });
      if (r.reqs.length > MAX_REQS) reqList.appendChild(el('li', 'empty', t('more')(r.reqs.length - MAX_REQS)));
    } else {
      reqBlock.hidden = true;
    }

    $('found-count').textContent = '(' + r.found.length + ')';
    $('missing-count').textContent = '(' + r.missing.length + ')';
    renderChips($('found-list'), r.found, 'ok');
    renderChips($('missing-list'), r.missing, 'miss');
    $('results').hidden = false;
  }

  function showError(key) {
    lastError = key;
    lastResult = null;
    $('message').textContent = key ? t(key) : '';
    $('message').classList.toggle('error', !!key);
    if (key) $('results').hidden = true;
  }

  function compare() {
    var ad = $('ad').value.trim();
    var cv = $('cv').value.trim();
    if (!ad && !cv) return showError('errBoth');
    if (!ad) return showError('errAd');
    if (!cv) return showError('errCv');
    var r = analyse(ad, cv);
    if (!r.total) return showError('errNoKeywords');
    showError(null);
    lastResult = r;
    render(r);
    $('message').textContent = t('announce')(r.score);
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    $('results-title').focus({ preventScroll: true });
    $('results').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }

  function init() {
    var nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'fi';
    setLang(/^fi\b/i.test(nav) ? 'fi' : 'en');

    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
    });
    $('compare').addEventListener('click', compare);
    $('example').addEventListener('click', function () {
      $('ad').value = EXAMPLE[lang].ad;
      $('cv').value = EXAMPLE[lang].cv;
      compare();
    });
    $('clear').addEventListener('click', function () {
      $('ad').value = '';
      $('cv').value = '';
      showError(null);
      $('results').hidden = true;
      $('ad').focus();
    });
    // Ctrl/Cmd + Enter in either box runs the comparison.
    ['ad', 'cv'].forEach(function (id) {
      $(id).addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); compare(); }
      });
    });
  }

  // Exposed for tests in Node; harmless in the browser.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { analyse: analyse, wordsMatch: wordsMatch, tokenize: tokenize };
  } else {
    init();
  }
})();
