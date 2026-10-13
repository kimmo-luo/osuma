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
      adHint: 'Liitä vain ilmoituksen tehtävä- ja vaatimusosa, ei hakuohjeita, yhteystietoja tai yritysesittelyä.',
      cvLabel: 'CV',
      cvHint: 'Liitä CV:si tekstinä, esimerkiksi kopioimalla se Wordista tai PDF:stä.',
      adPlaceholder: 'Liitä työpaikkailmoituksen teksti tähän…',
      cvPlaceholder: 'Liitä CV:si teksti tähän…',
      compare: 'Vertaa',
      example: 'Esimerkki',
      clear: 'Tyhjennä',
      results: 'Tulos',
      requirements: 'CV:hen kuuluvat vaatimukset',
      letterLabel: 'Hakemuskirje (vapaaehtoinen)',
      letterHint: 'Jos liität kirjeen, Osuma tarkistaa siitä luonteeseen, asenteeseen ja motivaatioon liittyvät vaatimukset.',
      letterPlaceholder: 'Liitä hakemuskirjeesi teksti tähän…',
      letterTitle: 'Hakemukseen kuuluvat vaatimukset',
      tellTitle: 'Kerro nämä hakemuksessa',
      letterSummary: function (n) { return 'Luonne, asenne, motivaatio ja jaksaminen näkyvät paremmin hakemuskirjeessä kuin CV:ssä. Nämä ' + n + ' kohtaa eivät vaikuta prosenttiin.'; },
      tellSummary: function (n) { return 'Luonne, asenne ja motivaatio kerrotaan hakemuksessa. Liitä kirje yllä, niin Osuma tarkistaa nämä ' + n + ' kohtaa siitä. Ne eivät vaikuta prosenttiin.'; },
      whereBoth: 'CV:ssä ja kirjeessä',
      whereCv: 'CV:ssä',
      whereLetter: 'Kirjeessä',
      whereNone: 'Ei kummassakaan',
      whereTell: 'Kerro hakemuksessa',
      partlyBoth: 'Osittain CV:ssä ja kirjeessä',
      partlyCv: 'Osittain CV:ssä',
      partlyLetter: 'Osittain kirjeessä',
      noCvReqs: 'Ilmoituksessa ei ole CV:hen kuuluvia vaatimuksia, joten prosenttia ei lasketa.',
      keywordsNote: 'CV:hen kuuluvien vaatimusten sanat.',
      keywords: 'Avainsanat',
      found: 'Löytyy CV:stä',
      missing: 'Puuttuu CV:stä',
      howto: 'Vertailu tehdään sanan alun perusteella, joten taivutetut muodot ja yhdyssanat löytyvät (esim. "myynti" löytää sanan "myyntityössä" ja "kokemus" sanan "työkokemus"). Kaupan alan synonyymit (esim. esillelaitto = esillepano) tunnistetaan. Täytesanat, hakuohjeiden sanat, päivämäärät, osoitteet ja yrityksen nimi jätetään pois. Nuoli näyttää, mikä CV:n sana vastasi.',
      footer: 'Osuma v1 · ilman tekoälyä · MIT-lisenssi',
      noscript: 'Osuma tarvitsee JavaScriptin. Kaikki käsittely tapahtuu selaimessasi.',
      errBoth: 'Liitä sekä työpaikkailmoitus että CV.',
      errAd: 'Liitä työpaikkailmoitus.',
      errCv: 'Liitä CV.',
      errNoKeywords: 'Ilmoituksesta ei löytynyt vertailtavia sanoja.',
      scoreText: function (f, t) { return f + ' / ' + t + ' vaatimusten avainsanasta löytyy CV:stä.'; },
      scoreTextAll: function (f, t) { return f + ' / ' + t + ' ilmoituksen avainsanasta löytyy CV:stä.'; },
      other: 'Muu ilmoitusteksti (ei lasketa)',
      fallbackNote: 'Ilmoituksesta ei tunnistettu vaatimuslauseita, joten prosentti lasketaan koko ilmoituksen sanoista.',
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
      adHint: 'Paste only the duties and requirements part of the ad, not the application instructions, contact details or company introduction.',
      cvLabel: 'CV',
      cvHint: 'Paste your CV as text, for example by copying it from Word or a PDF.',
      adPlaceholder: 'Paste the job ad text here…',
      cvPlaceholder: 'Paste your CV text here…',
      compare: 'Compare',
      example: 'Example',
      clear: 'Clear',
      results: 'Result',
      requirements: 'Requirements for the CV',
      letterLabel: 'Cover letter (optional)',
      letterHint: 'If you add your letter, Osuma checks it for the requirements about personality, attitude and motivation.',
      letterPlaceholder: 'Paste your cover letter text here…',
      letterTitle: 'Requirements for the cover letter',
      tellTitle: 'Mention these in your application',
      letterSummary: function (n) { return 'Personality, attitude, motivation and stamina show better in a cover letter than in a CV. These ' + n + ' items do not affect the percentage.'; },
      tellSummary: function (n) { return 'Personality, attitude and motivation belong in the application. Add your letter above and Osuma checks these ' + n + ' items in it. They do not affect the percentage.'; },
      whereBoth: 'In CV and letter',
      whereCv: 'In CV',
      whereLetter: 'In letter',
      whereNone: 'In neither',
      whereTell: 'Mention in application',
      partlyBoth: 'Partly in CV and letter',
      partlyCv: 'Partly in CV',
      partlyLetter: 'Partly in letter',
      noCvReqs: 'The ad has no requirements for the CV, so no percentage is calculated.',
      keywordsNote: 'Words from the requirements for the CV.',
      keywords: 'Keywords',
      found: 'Found in CV',
      missing: 'Missing from CV',
      howto: 'Words are compared by their beginning, so inflected forms and compounds match (e.g. "manage" finds "managing", "kokemus" finds "työkokemus"). Common retail synonyms are recognised (e.g. esillelaitto = esillepano). Filler words, application instructions, dates, addresses and the company name are ignored. The arrow shows which CV word matched.',
      footer: 'Osuma v1 · no AI · MIT licence',
      noscript: 'Osuma needs JavaScript. Everything is processed in your browser.',
      errBoth: 'Paste both the job ad and your CV.',
      errAd: 'Paste the job ad.',
      errCv: 'Paste your CV.',
      errNoKeywords: 'No comparable words were found in the job ad.',
      scoreText: function (f, t) { return f + ' / ' + t + ' keywords from the requirements were found in your CV.'; },
      scoreTextAll: function (f, t) { return f + ' / ' + t + ' keywords from the ad were found in your CV.'; },
      other: 'Other ad text (not counted)',
      fallbackNote: 'No requirement sentences were recognised, so the percentage uses all words in the ad.',
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
      cv: 'Myyntiedustaja, Firma Oy 2019–2024\nToimin B2B-myyntityössä ja vastasin yritysasiakkaista. Käytin päivittäin Salesforcea ja vedin neljän hengen tiimiä.\n\nKielitaito: suomi (äidinkieli), englanti (sujuva)\nAjokortti: B',
      letter: 'Hei! Haen myyntipäällikön tehtävää, koska asiakaslähtöinen myyntityö on minulle luontevaa. Asenteeni on ratkaisukeskeinen, ja asiakkaat ovat kuvanneet minua luotettavaksi neuvottelijaksi.'
    },
    en: {
      ad: 'Sales Manager, London\n\nWe are looking for an experienced sales manager to lead our corporate sales.\n\nRequirements:\n- 3+ years of experience in B2B sales\n- Fluent English, Finnish is a plus\n- Experience with CRM systems, ideally Salesforce\n- Strong negotiation skills and a customer-focused attitude\n- Driving licence\n\nNice to have:\n- Team leadership\n- Advanced Excel',
      cv: 'Sales Representative, Firma Ltd 2019–2024\nWorked in B2B sales managing corporate customers. Used Salesforce daily and led a team of four.\n\nLanguages: Finnish (native), English (fluent)',
      letter: 'I am applying for the Sales Manager role because customer-focused sales comes naturally to me. My attitude is solution-oriented, and customers describe me as a reliable negotiator.'
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
    'oma omaa oman omat omia omien omalla omassa omaan omasta työt käy kertomana lukemassa ' +
    // Words that mark a requirement but say nothing about the skill itself.
    'halu halua kyky kykyä mahdollisuus mahdollisuuden lasketaan eduksesi eduksenne tärkeintä tärkeää kohtaan ' +
    'toimia asioita työssä työsi työssäsi aito aidosti ala alaa alalla alalta alan kiinnostus kiinnostusta ' +
    'muttei pakollinen pakollista välttämätön välttämätöntä välttämättä puh ota etsimämme etsimäsi työkaveri työkaverin työkaveriksi henkilö henkilöä henkilön tekijä tekijää ' +
    'hyvin hyvä hyvää hyvät hyviä hyvien erittäin todella paljon eri kaikki kaikkia kaiken kaikkien jokin jotain jotakin muu muut muita muiden ' +
    'esim yms jne mm ns ym noin yli alle kanssa mukaan kautta ennen jälkeen aikana lisäksi kohti vuoksi takia välillä vai voi voit voivat voida voisi ' +
    'tulee tulisi tulla pitää saa saada saat saamme ' +
    'haemme etsimme tarjoamme odotamme toivomme arvostamme edellytämme edellytetään vaadimme ' +
    'eduksi etua katsotaan plussaa mieluiten vähintään vuosi vuoden vuotta vuodesta ' +
    'hae hakea haku lisätietoja lisätiedot ' +
    'hei moi terve tervetuloa kiitos joten osa osan osana osaksi osia tehdä tehdään teet teemme tekee tekemään tehden ' +
    'pian aina lisää joskus usein harvoin sinne tänne siellä täällä sieltä täältä heti kahta kaksi kolme yksi yhden yhtä neljä viisi ' +
    'uusi uutta uuden uudet uusia uusien vielä ehkä juuri aivan melko hieman vähän enemmän ainakin esimerkiksi kuitenkin tietenkin tietysti toki ' +
    'siksi sitten myöhemmin nopeasti mahdollisimman myöskin jopa kerran kerro kerrot kertoa katso lue klikkaa linkki linkistä linkin ' +
    'alla alta yllä ylle mennessä viimeistään klo kello alkaen saakka asti tänään huomenna ensi heti mukaamme joukkoomme ' +
    'kiinnostunut kiinnostuitko kiinnostaako kuulostaako kuulostaa tule tulet tulemme pääset pääsee voimme haluat haluamme haluaisit ' +
    'hakee haetaan joukkoonsa päättyy lähetä lähettää lähetät tarkista tarkistathan tietoa tietoja aloittamaan aloittaa aloita opittavaa ' +
    'oy oyj ab ltd ky inc group ' +
    'sähköpostilla sähköpostitse sähköpostiin sähköposti osoite osoitteessa osoitteeseen osoitteesta ' +
    'haastattelemme haastatteluun haastatteluihin viikolla viikon ' +
    'maanantaina tiistaina keskiviikkona torstaina perjantaina lauantaina sunnuntaina ' +
    'www http https com fi'
  ).split(/\s+/);

  // Word beginnings that belong to application instructions or dates, not to the job.
  // Kept narrow so that skills such as "rekrytointi" or "sähköpostimarkkinointi" survive.
  var STOP_PREFIXES = [
    'sähköpostiosoit', 'roskapost', 'hakupäiv', 'hakuaj', 'hakuai', 'hakemu', 'hakulomak', 'hakuilmoit', 'hakuohj',
    'hakij', 'hakuprosess', 'rekryilmoit', 'rekrytointiprosess', 'valintaprosess', 'yhteystie',
    'kuukau', 'tammikuu', 'helmikuu', 'maaliskuu', 'huhtikuu', 'toukokuu', 'kesäkuu', 'heinäkuu', 'elokuu',
    'syyskuu', 'lokakuu', 'marraskuu', 'joulukuu',
    'spam', 'january', 'february', 'march', 'april',
    'june', 'july', 'august', 'september', 'october', 'november', 'december'
  ];

  // Email addresses, web addresses and bare domains (tokmanni.fi/ura) are skipped.
  // No i flag: a bare domain needs a lowercase ending, so "palvelusta.Se" and "ASP.NET" stay words.
  // Lengths are bounded so a huge pasted token cannot make the regex crawl.
  var ADDRESS_RE = /[^\s@]{1,64}@[^\s@]{1,255}|(?:[hH][tT][tT][pP][sS]?:\/\/|[wW]{3}\.)\S+|[\p{L}\p{N}-]{1,63}(?:\.[\p{L}\p{N}-]{1,63}){0,4}\.(?:fi|com|net|org|eu|se|info|biz)(?![\p{L}\p{N}])(?:\/\S*)?/gu;
  // Technology names that look like domains.
  var TECH_NAMES = ['asp.net', 'vb.net', 'ado.net'];
  function isAddress(m) { return TECH_NAMES.indexOf(m.toLowerCase()) === -1; }
  // Names that are not the employer.
  var NOT_COMPANY = ['gmail', 'hotmail', 'outlook', 'yahoo', 'linkedin', 'duunitori', 'oikotie', 'monster', 'jobly',
    'te-palvelut', 'tyomarkkinatori', 'google', 'facebook', 'instagram', 'rekry', 'careers', 'jobs', 'mail', 'www',
    'suomi', 'finland', 'sverige', 'norge', 'danmark', 'europe', 'nordic'];
  var COMPANY_RE = /(\p{Lu}[\p{L}&-]+)(?:\s+(\p{Lu}[\p{L}&-]+))?\s+(?:Oyj|Oy|Ab|Ltd|Inc|Ky|Group)(?![\p{L}])/gu;

  // Words in a small retail glossary that mean the same thing.
  var SYNONYMS = [
    ['esillelaitto', 'esillepano', 'esilleasettelu'],
    ['hyllytys', 'hyllyttäminen', 'hyllyttää'],
    ['kassatyö', 'kassatyöskentely', 'kassapalvelu', 'kassa'],
    ['asiakaspalvelu', 'asiakaspalvelija', 'asiakaspalvelutyö', 'asiakastyö'],
    ['myymälätyö', 'myymälätyöntekijä', 'myymäläapulainen'],
    ['tavaranvastaanotto', 'kuormanpurku', 'tavaranpurku', 'kuormapurku'],
    ['inventaario', 'inventointi'],
    ['somistus', 'somistaminen', 'merchandising'],
    ['hinnoittelu', 'hinnoitteleminen', 'hintamerkintä'],
    ['varastotyö', 'varastointi', 'varastotyöskentely'],
    ['vuorotyö', 'vuorotyöskentely'],
    ['siivous', 'siivoaminen'],
    ['shelving', 'stocking', 'restocking', 'replenishment'],
    ['cashier', 'checkout']
  ];

  var STOP_EN = (
    'and or the an of to in on at for with by from as is are be been being was were will would should shall can could may might must ' +
    'have has had do does did you your yours we our ours us they their them he she his her it its this that these those ' +
    'who whom whose which what where when why how not no nor but if so than then also very more most other others such into onto about ' +
    'over under all any some each both either neither etc e.g i.e eg ie plus well able strong good great excellent ideally preferably ' +
    'looking seeking join apply applicants candidate candidates role position opportunity offer offers including include includes ' +
    'within across per via there here just only own one ' +
    'requirements required nice least year years minimum hi hello thanks always often soon new two three'
  ).split(/\s+/);

  var STOP = Object.create(null);
  STOP_FI.concat(STOP_EN).forEach(function (w) { if (w) STOP[w] = true; });

  // Acronyms that would otherwise be stop words, kept when written in capitals (IT, US).
  var CAPS_KEEP = { it: true, us: true };
  // Very short skill names, kept when capitalised (C, R, Go, Qt).
  var SHORT_SKILLS = { c: true, r: true, go: true, qt: true };
  // Finnish passive and instructive verb forms describe the work, not a skill to look for:
  // vastaanotetaan, tarvitaan, siirrellään, kumarrellen, kurkottaen. Nouns such as
  // "tietokantaan" (n before -taan) are not caught.
  var VERB_FORM_RE = /(?:[aeiouyäö]t(?:aan|ään)|[aeiouyäö]d(?:aan|ään)|[aeiouyäö]ll(?:aan|ään)|[aä]en|[eiä]llen)$/;

  // ---------- Text processing ----------

  var TOKEN_RE = /[\p{L}\p{N}][\p{L}\p{N}+#.\-]*/gu;
  var HAS_LETTER = /\p{L}/u;

  // Blank out addresses but keep positions, so requirement lines still line up.
  function maskAddresses(text) {
    return text.replace(ADDRESS_RE, function (m) { return isAddress(m) ? ' '.repeat(m.length) : m; });
  }

  // Returns [{ word: lowercased, raw: original, index, length }]
  function tokenize(text) {
    var out = [];
    var m;
    var masked = maskAddresses(text);
    TOKEN_RE.lastIndex = 0;
    while ((m = TOKEN_RE.exec(masked)) !== null) {
      // A missing space after a full stop ("palvelusta.Se on") splits the token.
      var pieces = m[0].split(/\.(?=\p{Lu}\p{Ll})/u);
      var at = m.index;
      for (var i = 0; i < pieces.length; i++) {
        var raw = pieces[i].replace(/[.\-]+$/, '');
        if (raw) out.push({ word: raw.toLowerCase(), raw: raw, index: at, length: raw.length });
        at += pieces[i].length + 1;
      }
    }
    return out;
  }

  // The employer's name, guessed from the ad's email and web addresses
  // (rekry@tokmanni.fi → tokmanni) and from "Name Oy". Set by analyse().
  var companies = [];

  // How many words in the text start with `name`.
  function countWordStarts(text, name) {
    var n = 0;
    tokenize(text).forEach(function (t) { if (t.word.indexOf(name) === 0) n++; });
    return n;
  }

  function detectCompanies(ad) {
    var found = [];
    function add(name) {
      name = name.toLowerCase();
      if (name.length >= 3 && NOT_COMPANY.indexOf(name) === -1 && found.indexOf(name) === -1) found.push(name);
    }
    (ad.match(ADDRESS_RE) || []).filter(isAddress).forEach(function (addr) {
      var host = addr.replace(/^[^@]*@/, '').replace(/^https?:\/\//i, '').split(/[\/?#]/)[0]
        .replace(/[.,;:!?)\]]+$/, '');
      var labels = host.split('.').filter(Boolean);
      if (labels.length >= 2) add(labels[labels.length - 2]);
    });
    // "Name Oy" counts only when the name appears elsewhere too, so that a
    // customer or partner mentioned once (Microsoft Oy) is not dropped.
    var m;
    COMPANY_RE.lastIndex = 0;
    while ((m = COMPANY_RE.exec(ad)) !== null) {
      [m[1], m[2]].forEach(function (name) {
        if (name && countWordStarts(ad, name.toLowerCase()) >= 2) add(name);
      });
    }
    return found;
  }

  // The company name itself or with a short ending (Tokmannilla), not every
  // word that starts with it (Kone ≠ konetekniikka).
  function isCompany(w) {
    var d = degrade(w);
    for (var i = 0; i < companies.length; i++) {
      var c = degrade(companies[i]);
      if (d.indexOf(c) === 0 && d.length - c.length <= 4 && ENDING_RE.test(d.slice(c.length))) return true;
    }
    return false;
  }

  function hasStopPrefix(w) {
    for (var i = 0; i < STOP_PREFIXES.length; i++) {
      if (w.indexOf(STOP_PREFIXES[i]) === 0) return true;
    }
    return false;
  }

  function isKeyword(tok) {
    var w = tok.word;
    var raw = tok.raw;
    if (!HAS_LETTER.test(w)) return false; // pure numbers
    var caps = raw === raw.toUpperCase() && raw !== raw.toLowerCase();
    if (SHORT_SKILLS[w]) return raw.charAt(0) !== raw.charAt(0).toLowerCase();
    if (STOP[w]) return caps && !!CAPS_KEEP[w];
    if (hasStopPrefix(w) || isCompany(w)) return false;
    if (w.length >= 7 && VERB_FORM_RE.test(w)) return false;
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
  // A CV word "kokemus" counts for the ad's "kokemuksesta" (rest "ksesta"), but CV "sales"
  // does not count for the ad's "salesforce" (rest "force"), nor CV "java" for "javascript".
  var ENDING_RE = /^[aäeidghjklmnorstuyö]{0,6}$/;

  // Words must share at least this many letters, and most of the word.
  // Shorter words only match with a plain inflection ending (työ → työtä).
  var MIN_PREFIX = 5;
  var MAX_COMPOUND = 40;
  var MAX_GROUP_SCAN = 300;
  var COMPOUND_JOINT = /[aeiouyäöns]/;

  // Endings a short word may get: työ → työtä, työssä; app → apps.
  var SHORT_ENDINGS = {};
  ('n a ä ta tä na nä ksi ssa ssä sta stä lla llä lta ltä lle t s in ihin iin hin hon hun hän hön seen ' +
   'en an än on ön un yn ja jä ni si nsa nsä mme nne es ed ' +
   'et ita itä ella ellä elle elta eltä issa issä ista istä een ineen illa illä ille').split(' ').forEach(function (e) { SHORT_ENDINGS[e] = true; });

  // suomi/suomen, kieli/kielen: a final i often turns into e.
  function iToE(w) {
    return w.length >= 5 && w.charAt(w.length - 1) === 'i' ? w.slice(0, -1) + 'e' : w;
  }

  // iloinen/iloisena, positiivinen/positiivisesti: -nen turns into -se-.
  function nenToSe(w) {
    return w.length >= 6 && /nen$/.test(w) ? w.slice(0, -3) + 'se' : w;
  }

  function prefixMatch(a, c) {
    var p = commonPrefix(a, c);
    if (p < MIN_PREFIX) return false;
    if (c.length > a.length) {
      // CV word is longer: an inflected form or a compound (myynti → myyntityössä).
      return p >= stemLen(a.length);
    }
    // CV word is shorter: the ad uses an inflected form (kokemuksesta ← kokemus).
    return p >= stemLen(c.length) && ENDING_RE.test(a.slice(p));
  }

  // Does CV word `c` count as the ad word `a`?
  function wordsMatch(a, c) {
    if (a === c) return true;
    var da = degrade(a);
    var dc = degrade(c);
    if (da === dc) return true;
    if (Math.min(a.length, c.length) < MIN_PREFIX) {
      if (Math.min(a.length, c.length) < 3) return false; // UX, B: exact only
      var s = a.length < c.length ? a : c;
      var l = a.length < c.length ? c : a;
      return l.indexOf(s) === 0 && SHORT_ENDINGS[l.slice(s.length)] === true;
    }
    // Adjectives: compare iloise- with iloisena instead of iloinen.
    var na = nenToSe(a), nc = nenToSe(c);
    if ((na !== a || nc !== c) && commonPrefix(na, nc) >= MIN_PREFIX - 1 &&
        prefixMatch(degrade(na), degrade(nc))) return true;
    // Without gradation the words must still start alike (kuntoa ≠ kunnolla).
    if (commonPrefix(a, c) < MIN_PREFIX - 1) return false;
    return prefixMatch(da, dc) || prefixMatch(iToE(da), dc) || prefixMatch(da, iToE(dc));
  }

  // CV words indexed by their first three (degraded) letters, so lookups stay fast.
  // Compounds are also indexed by each later starting point (työkokemus → kokemus).
  function buildIndex(words) {
    var exact = Object.create(null);
    var buckets = Object.create(null);
    var tails = Object.create(null);
    words.forEach(function (w) {
      exact[w] = true;
      var d = degrade(w);
      if (d.length < 3) return;
      var k = d.slice(0, 3);
      (buckets[k] || (buckets[k] = [])).push(w);
      // Hyphen parts are indexed as words of their own; very long tokens are pasted junk.
      if (w.indexOf('-') !== -1 || w.length > MAX_COMPOUND) return;
      for (var i = 3; i + MIN_PREFIX <= w.length; i++) {
        // The first part of a Finnish compound usually ends in a vowel, n or s
        // (työ|kokemus, kielen|kääntäjä, asiakas|palvelu), not epänor|maali.
        if (!COMPOUND_JOINT.test(w.charAt(i - 1))) continue;
        var tk = w.substr(i, MIN_PREFIX - 1);
        (tails[tk] || (tails[tk] = [])).push({ word: w, tail: w.slice(i) });
      }
    });
    return { exact: exact, buckets: buckets, tails: tails };
  }

  function findWord(word, index) {
    if (index.exact[word]) return word;
    var d = degrade(word);
    if (d.length < 3) return null;
    var list = index.buckets[d.slice(0, 3)];
    if (list) {
      for (var i = 0; i < list.length; i++) {
        if (wordsMatch(word, list[i])) return list[i];
      }
    }
    // The ad word as the last part of a CV compound: kokemus → työkokemus.
    if (word.length >= MIN_PREFIX) {
      var tails = index.tails[word.substr(0, MIN_PREFIX - 1)];
      if (tails) {
        for (var j = 0; j < tails.length; j++) {
          if (wordsMatch(word, tails[j].tail)) return tails[j].word;
        }
      }
    }
    return null;
  }

  function findSynonym(word, index) {
    for (var i = 0; i < SYNONYMS.length; i++) {
      var group = SYNONYMS[i];
      // Both ways, so that "täydentämään" or "siistiä" does not join a group by a loose prefix.
      var own = group.filter(function (m) { return wordsMatch(word, m) && wordsMatch(m, word); });
      if (!own.length) continue;
      for (var j = 0; j < group.length; j++) {
        if (own.indexOf(group[j]) !== -1) continue;
        var hit = findWord(group[j], index);
        if (hit) return hit;
      }
    }
    return null;
  }

  // Hyphenated words (B-ajokortti, CRM-järjestelmä) also match when every
  // part is found separately, single letters included.
  var GENERIC_PART_RE = /^(?:osaami|taid|taito|kokemu|tuntemu|skills?$|knowledge$|experience$)/u;

  // An ad compound whose parts are both in the CV: suomen|kielellä ← suomi, äidinkieli.
  // Limited to language compounds (suomenkielinen, englanninkielellä): elsewhere two
  // unrelated CV words could cover the halves (Java + scripts ≠ JavaScript).
  function findCompoundParts(word, index) {
    if (word.length < 8 || word.length > MAX_COMPOUND || word.indexOf('-') !== -1) return null;
    if (!/.{4,}kiel/.test(word)) return null;
    for (var i = 4; i <= word.length - 4; i++) {
      if (!COMPOUND_JOINT.test(word.charAt(i - 1))) continue;
      var head = findWord(word.slice(0, i), index);
      if (!head) continue;
      var tail = findWord(word.slice(i), index);
      if (tail) return head === tail ? head : head + ' + ' + tail;
    }
    return null;
  }

  function findInCv(word, index) {
    var hit = findWord(word, index) || findSynonym(word, index) || findCompoundParts(word, index);
    if (hit || word.indexOf('-') === -1) return hit;
    var parts = word.split('-').filter(Boolean);
    // "Excel-osaaminen" is about Excel: generic parts need not be in the CV.
    var specific = parts.filter(function (p) { return !GENERIC_PART_RE.test(p); });
    if (specific.length) parts = specific;
    var hits = [];
    for (var i = 0; i < parts.length; i++) {
      var h = findWord(parts[i], index) || findSynonym(parts[i], index);
      if (!h) return null;
      if (hits.indexOf(h) === -1) hits.push(h);
    }
    return hits.length ? hits.join(' + ') : null;
  }

  var BULLET_RE = /^\s*(?:[-–—•*·▪●◦►]|\d{1,2}[.)])\s+/;
  // Sentence ends, but not after abbreviations (esim., mm.) or dates (31.10.).
  var SENTENCE_RE = /(?<!\b(?:e\.g|i\.e|esim|mm|ns|ym|jne|yms|tms|etc|ks|n|klo|puh)\.)(?<!\d\.)(?<=[.!?;])\s+|\r?\n+/i;

  // ---------- Sentence types ----------

  // A heading such as "Sinulla on:" or "Edellytämme" starts a requirement section.
  var REQ_HEADING_RE = /(sinulla on|jolla on|sinulta löytyy|edellytämme|edellytetään|toivomme|odotamme|arvostamme|vaadimme|vaatimukse|eduksi|plussaa|osaamista|(?:^|\s)profiili(?:si)?\b|you have|you bring|about you|who you are|looking for|your profile|requirements|we expect|we hope|qualifications|nice to have|must have)/i;
  // A heading such as "Tarjoamme:" starts a section that is not about the applicant.
  var OFFER_HEADING_RE = /(tarjoamme|meiltä saat|saat meiltä|edut|työsuhde-ed|we offer|benefits|what you get|about us|meistä)/i;
  // Headings without a colon must be short and consist of the heading phrase only.
  var BARE_HEADING_RE = /^(?:mitä\s+)?(?:sinulla on|toivomme|edellytämme|odotamme|arvostamme|vaatimukset|eduksi katsotaan|tarjoamme|meiltä saat|edut|työsuhde-edut|requirements|qualifications|nice to have|about you|your profile|we offer|benefits)(?:\s+(?:sinulta|meiltä|you))?$/i;
  // A sentence that opens with an offer is about the employer, whatever words follow.
  var OFFER_START_RE = /^(?:tarjoamme|meiltä saat|saat meiltä|we offer|you will get|you get)\b/i;

  // Words that make any sentence a requirement: kokemus, taito, kyky, halu, osaaminen, eduksi, edellytys…
  var REQ_PARTS = ['kokemu', 'taito', 'taido', 'taidoi', 'osaami', 'koulutu', 'tutkinto', 'pätevyy', 'kortti',
    'skill', 'knowledge', 'degree', 'qualif'];
  var REQ_STARTS = ['eduksi', 'eduks', 'edellyty', 'edellytä', 'edellyte', 'edellytt', 'vaatimu', 'vaaditaan',
    'required', 'requirement', 'abilit', 'experience', 'fyysi'];
  // Licences called "passi": hygieniapassi, anniskelupassi (not passionate, kompassi, ePassi).
  var REQ_PASSI_RE = /^(?:hygienia|anniskelu|alkoholi|tulityö|työturvallisuus|tieturva|ensiapu)passi/u;
  var REQ_HALU_RE = /^halu(?:a|n|ja|kas|kkuu\p{L}*|kkaa\p{L}*)?$/u;
  // kyky as a word or a skill compound (yhteistyökyky), not kilpailukykyinen.
  var REQ_KYKY_RE = /^(?:yhteistyö|vuorovaikutus|ongelmanratkaisu|oppimis|paineensieto|esiintymis|organisointi|johtamis|sopeutumis)?(?:kyky|kyvy|kyvyk)/u;
  // Not a requirement although it contains one of the parts: asiakaskokemus is about customers.
  // Benefits cards are not requirements either (lounaskortti, liikuntakortti).
  var NOT_REQ = ['asiakaskokemu', 'käyttäjäkokemu', 'ostokokemu', 'lounas', 'liikunta', 'virike', 'kulttuuri', 'epassi', 'smartum'];

  function isReqWord(w, prev) {
    for (var k = 0; k < NOT_REQ.length; k++) if (w.indexOf(NOT_REQ[k]) === 0) return false;
    if (w === 'experience' && (prev === 'customer' || prev === 'user')) return false;
    if (REQ_HALU_RE.test(w) || REQ_KYKY_RE.test(w) || REQ_PASSI_RE.test(w)) return true;
    for (var i = 0; i < REQ_PARTS.length; i++) if (w.indexOf(REQ_PARTS[i]) !== -1) return true;
    for (var j = 0; j < REQ_STARTS.length; j++) if (w.indexOf(REQ_STARTS[j]) === 0) return true;
    return false;
  }

  // Sentences about applying are dropped entirely. Strong words always mean
  // applying; weak ones only together with an applying verb or outside requirements
  // ("Kokemus hakemusten käsittelystä" is a requirement).
  var APPLY_STRONG = ['roskapost', 'hakupäiv', 'hakuaj', 'hakuai', 'hakulomak', 'hakuohj', 'hakulink',
    'hakuilmoit', 'rekrytointiviest'];
  var APPLY_WEAK = ['hakemu', 'hakuprosess', 'viimeistään', 'mennessä', 'application'];
  // Contact details are dropped unless the sentence names a requirement.
  var CONTACT_WORDS = ['yhteyttä', 'yhteydenot', 'lisätiedo', 'lisätieto'];
  var APPLY_VERBS = ['lähetä', 'lähettä', 'hae', 'hakea', 'jätä', 'jättä', 'täytä', 'tarkkail', 'tarkista', 'kurkat',
    'kurkkaa', 'send', 'apply', 'submit'];
  var EMAIL_WORD_RE = /^sähköpost(?:i|ia|iasi|isi|in|illa|illasi|itse|iin|iosoit\p{L}*)$/u;

  function startsWithAny(w, list) {
    for (var i = 0; i < list.length; i++) if (w.indexOf(list[i]) === 0) return true;
    return false;
  }

  function sentenceKind(text, section, inReq) {
    var words = tokenize(text).map(function (t) { return t.word; });
    var strong = false, weak = false, contact = false, verb = false, req = false;
    ADDRESS_RE.lastIndex = 0;
    if (ADDRESS_RE.test(text)) contact = true;
    ADDRESS_RE.lastIndex = 0;
    words.forEach(function (w, i) {
      if (startsWithAny(w, APPLY_STRONG)) strong = true;
      if (startsWithAny(w, APPLY_WEAK) || EMAIL_WORD_RE.test(w)) weak = true;
      if (startsWithAny(w, CONTACT_WORDS) || w === 'puh') contact = true;
      if (startsWithAny(w, APPLY_VERBS)) verb = true;
      if (isReqWord(w, words[i - 1])) req = true;
    });
    if (strong || (weak || contact) && verb || weak && !req && !inReq || contact && !req) return 'apply';
    if (section === 'offer' || OFFER_START_RE.test(text)) return 'other';
    return req || inReq ? 'req' : 'other';
  }

  // Does the text contain at least one countable keyword?
  function hasKeyword(text) {
    return tokenize(text).some(isKeyword);
  }

  // Splits the ad into sentences and labels each one 'req', 'other' or 'apply'.
  // A section lasts until the next heading. A bullet list also ends at the first
  // plain-text line after it, which is usually something else (company intro, contacts).
  function segmentAd(ad) {
    var out = [];
    var section = null; // 'req', 'offer', 'none' or null
    var sectionHasBullets = false;
    ad.split(/\r?\n/).forEach(function (line) {
      var text = line.trim();
      if (!text) return;
      var bullet = BULLET_RE.test(line);
      if (bullet) text = line.replace(BULLET_RE, '').trim();
      if (!bullet && sectionHasBullets) { section = null; sectionHasBullets = false; }

      // "Sinulla on: B-ajokortti ja hygieniapassi." on one line.
      var inline = !bullet && /^([^:]{1,60}):\s*(\S.*)$/.exec(text);
      if (inline && REQ_HEADING_RE.test(inline[1])) {
        out.push({ text: text, kind: sentenceKind(inline[2], 'req', true) });
        return;
      }

      var heading = !bullet && (/:\s*$/.test(text) || BARE_HEADING_RE.test(text));
      if (heading) {
        var words = tokenize(text).map(function (t) { return t.word; });
        var aboutApplying = words.some(function (w) {
          return startsWithAny(w, APPLY_STRONG) || startsWithAny(w, APPLY_WEAK) || startsWithAny(w, CONTACT_WORDS);
        });
        section = aboutApplying ? 'none' : REQ_HEADING_RE.test(text) ? 'req' : OFFER_HEADING_RE.test(text) ? 'offer' : 'none';
        sectionHasBullets = false;
        // "…jos olet täysi-ikäinen ja sinulla on:" carries a requirement of its own,
        // "Vaatimukset:" does not.
        var own = section === 'req' && hasKeyword(text.replace(new RegExp(REQ_HEADING_RE.source, 'gi'), ' '));
        out.push({ text: text, kind: own ? 'req' : 'other' });
        return;
      }
      if (bullet) sectionHasBullets = true;

      var pieces = bullet ? [text] : text.split(SENTENCE_RE).map(function (s) { return s.trim(); }).filter(Boolean);
      pieces.forEach(function (s) {
        // Bullet points count as requirements unless they list what the employer offers.
        var inReq = section === 'req' || bullet && section !== 'offer';
        out.push({ text: s, kind: sentenceKind(s, section, inReq) });
      });
    });
    return out;
  }

  // ---------- CV or application letter ----------

  // Skills, experience, education, languages, licences and systems belong in the CV.
  // Parts that may sit anywhere in a compound (työkokemus, kielitaito).
  var CV_PARTS = ['kokemu', 'koulutu', 'tutkin', 'kieli', 'kielen', 'kiele', 'kielt', 'englan', 'ruotsi', 'saksa',
    'venäjä', 'suome', 'suomi', 'kortti', 'ohjelm', 'sertifi', 'pätevyy', 'osaami', 'tuntemu', 'taito', 'taido',
    'experience', 'degree', 'certific', 'licen', 'language', 'english', 'finnish', 'swedish', 'software', 'knowledge',
    'skill'];
  // Short names checked at the start of a word only (atk, not jatkuva; excel, not excellent).
  var CV_WORD_RE = /^(?:atk(?:-|$)|excel(?!len)|office$|sap(?:-|$)|crm|erp(?:-|$)|it-|lupa(?!a|u)|lean(?:-|$)|system(?!at))/u;
  // järjestelmä is a system, järjestelmällinen is a personality trait.
  var CV_SYSTEM_RE = /järjestelm(?!ällis)/u;

  // Personality, attitude, motivation, availability and physical condition belong in the letter.
  var LETTER_PARTS = ['positiivi', 'aloittei', 'aloitteel', 'vuorovaikutu', 'yhteistyö', 'pelisilm', 'ylpe',
    'kiinnostu', 'asenne', 'asentee', 'innostu', 'motivaatio', 'motivoitu', 'täsmälli', 'luotettav', 'joustav',
    'palveluhenk', 'tiimihenk', 'tiimipelaaja', 'stressinsieto', 'paineensieto', 'huumori', 'liikkuvuu', 'vauhdik',
    'työskentelytyyl', 'rehelli', 'avulia', 'ystävälli', 'kohteliai', 'kehitty', 'sitoutu', 'vastuullis', 'huolelli',
    'järjestelmällis', 'työvuoro', 'vuorotyö', 'viikonlop', 'oppimishal',
    'positive', 'motivat', 'attitude', 'enthusias', 'proactive', 'self-start', 'interpersonal', 'passion',
    'reliable', 'flexib', 'cheerful', 'weekend', 'communicat'];
  // Trait words checked at the start of a word only: iloinen (not tiloissa), kunto (not kuntoutus),
  // energinen (not energia-ala), sosiaalinen (not sosiaalihuolto), friendly (not user-friendly).
  var LETTER_WORD_RE = /^(?:iloi|innok|reipas|reippa|ahker|sosiaalis|sosiaalinen|energi(?!a)|tehokka|loppuun|fyysi|kunto(?!ut|sal)|kunnossa|arkisin|iltaisin|friendly|player|shift)/u;

  function hasPart(w, parts) {
    for (var i = 0; i < parts.length; i++) if (w.indexOf(parts[i]) !== -1) return true;
    return false;
  }

  function isCvWord(w) {
    if (hasPart(w, CV_PARTS) || CV_WORD_RE.test(w) || CV_SYSTEM_RE.test(w) || REQ_PASSI_RE.test(w)) return true;
    // MS-Office, SAP-järjestelmä
    return w.indexOf('-') !== -1 && w.split('-').some(function (p) { return CV_WORD_RE.test(p); });
  }

  function isTraitWord(w) {
    return hasPart(w, LETTER_PARTS) || LETTER_WORD_RE.test(w) || REQ_HALU_RE.test(w);
  }

  // 'cv', 'letter' or 'none' (no signal). Anything for the CV wins.
  // `atStart`: the piece starts the sentence, so its first word is capitalised anyway.
  function clauseSignal(text, atStart) {
    var cvHit = false, weakCvHit = false, letterHit = false, otherHit = false;
    tokenize(text).forEach(function (t, i) {
      // A trait compound wins over its generic part: vuorovaikutustaidot is a trait,
      // neuvottelutaidot and kielitaito are skills.
      if (isTraitWord(t.word)) letterHit = true;
      else if (isCvWord(t.word)) {
        // Plain "taidot" / "skills" only says a skill is meant; next to a trait
        // ("communication skills", "ylpeyttä ammattitaidostasi") the trait decides.
        // Experience, education and the like always decide (kokemus vuorotyöstä).
        if (WEAK_CV_RE.test(t.word)) weakCvHit = true;
        else cvHit = true;
      } else if (isKeyword(t) && !(atStart && i === 0) && NAME_LIKE_RE.test(t.raw)) {
        otherHit = true;
      }
    });
    if (cvHit) return 'cv';
    if (letterHit) return 'letter';
    // A name-like word (Python, SQL, C#) is usually a skill; other pieces join a neighbour.
    return weakCvHit || otherHit ? 'cv' : 'none';
  }

  // Capitalised mid-sentence, all caps, or with digits or symbols.
  var NAME_LIKE_RE = /^\p{Lu}|[\d+#]/u;

  // Words that only say "a skill of some kind".
  var WEAK_CV_RE = /^(?:osaami|taid|taito|skills?$|ammattitai)/u;

  function clauseGroup(text) {
    return clauseSignal(text) === 'letter' ? 'letter' : 'cv';
  }

  // "Excel-osaaminen ja positiivinen asenne" or "Koulutus katsotaan eduksi, mutta
  // tärkeintä on positiivinen asenne" hold two kinds of requirement. Sentences are cut
  // at ";", ", mutta", "ja", "sekä" and "and", and neighbouring pieces of the same kind
  // are joined again, so a sentence is only split where the kind changes.
  // Not after a hyphen: "Atk- ja vuorovaikutustaidot" shares its last part.
  var CLAUSE_SEP_RE = /(;\s*|,\s+(?=(?:mutta|but|however)\b)|(?<!-)\s+(?:ja|sekä|and)\s+)/i;
  var CONJ_RE = /^(?:mutta|but|however)\s+/i;
  function splitClauses(text) {
    var bits = text.split(CLAUSE_SEP_RE);
    if (bits.length < 3) return [text];
    var out = []; // { text, kind }
    for (var i = 0; i < bits.length; i += 2) {
      var piece = bits[i];
      var sep = i > 0 ? bits[i - 1] : '';
      var kind = clauseSignal(piece, i === 0);
      var last = out[out.length - 1];
      if (last && (kind === 'none' || last.kind === 'none' || kind === last.kind)) {
        last.text += sep + piece;
        if (last.kind === 'none') last.kind = kind;
      } else {
        out.push({ text: piece, kind: kind });
      }
    }
    if (out.length < 2) return [text];
    return out.map(function (o) {
      var s = o.text.trim().replace(/[;,]\s*$/, function (m) { return m.charAt(0) === ';' ? ';' : ''; })
        .replace(CONJ_RE, '');
      return s.charAt(0).toUpperCase() + s.slice(1);
    });
  }

  function buildTextIndex(text) {
    var words = [];
    var seen = Object.create(null);
    function add(w) {
      if (w && !seen[w]) { seen[w] = true; words.push(w); }
    }
    tokenize(text).forEach(function (t) {
      add(t.word);
      if (t.word.indexOf('-') !== -1) t.word.split('-').forEach(add);
    });
    return buildIndex(words);
  }

  function analyse(ad, cv, letter) {
    companies = detectCompanies(ad);
    var index = buildTextIndex(cv);
    var hasLetter = !!(letter && letter.trim());
    var letterIndex = hasLetter ? buildTextIndex(letter) : null;

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
        // Capped so that thousands of similar words cannot freeze the page.
        for (var i = 0; i < list.length && i < MAX_GROUP_SCAN; i++) {
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

    // Only requirement sentences are scored. If none are recognised,
    // every sentence except the application instructions is used instead.
    var segments = segmentAd(ad);
    var reqSentences = segments.filter(function (s) { return s.kind === 'req'; });
    var fallback = !reqSentences.length;
    if (fallback) reqSentences = segments.filter(function (s) { return s.kind !== 'apply'; });
    var others = fallback ? [] : segments.filter(function (s) { return s.kind === 'other'; })
      .map(function (s) { return s.text; });

    // Each requirement clause goes either to the CV group or to the letter group.
    var cvClauses = [];
    var letterClauses = [];
    reqSentences.forEach(function (s) {
      splitClauses(s.text).forEach(function (c) {
        (clauseGroup(c) === 'letter' ? letterClauses : cvClauses).push(c);
      });
    });

    // Only the CV group is scored and shown as keyword chips.
    cvClauses.forEach(function (c) {
      tokenize(c).forEach(function (t) {
        if (isKeyword(t)) groupFor(t.word, t.raw).count++;
      });
    });

    var letterMatchOf = Object.create(null);
    function letterMatch(word) {
      if (!letterIndex) return null;
      if (!(word in letterMatchOf)) letterMatchOf[word] = findInCv(word, letterIndex);
      return letterMatchOf[word];
    }

    // Splits a clause into plain text and keywords, and counts which keywords
    // are found in the CV and in the letter. Inflected forms count once.
    function inspect(line, useLetter) {
      var parts = [];
      var pos = 0;
      var total = 0, inCv = 0, inLetter = 0, inEither = 0;
      var traits = 0, traitsFound = 0, traitInCv = false, traitInLetter = false;
      var counted = [];
      tokenize(line).forEach(function (t) {
        if (t.index > pos) parts.push({ text: line.slice(pos, t.index) });
        if (isKeyword(t)) {
          var cvHit = !!match(t.word);
          // The CV group is scored from the CV alone.
          var letterHit = useLetter && !!letterMatch(t.word);
          var trait = useLetter && isTraitWord(t.word);
          // For a trait the matching word must carry the trait too: CV "asiakaspalvelu"
          // does not show an "asiakaspalveluasenne".
          var cvTrait = trait && cvHit && isTraitWord(match(t.word));
          var letterTrait = trait && letterHit && isTraitWord(letterMatch(t.word));
          parts.push({ text: t.raw, ok: trait ? cvTrait || letterTrait : cvHit || letterHit });
          var key = groupOf[t.word] || degrade(t.word).slice(0, MIN_PREFIX);
          if (counted.indexOf(key) === -1) {
            counted.push(key);
            total++;
            if (cvHit) inCv++;
            if (letterHit) inLetter++;
            if (cvHit || letterHit) inEither++;
            if (trait) {
              traits++;
              if (cvTrait || letterTrait) traitsFound++;
              if (cvTrait) traitInCv = true;
              if (letterTrait) traitInLetter = true;
            }
          }
        } else {
          parts.push({ text: t.raw });
        }
        pos = t.index + t.length;
      });
      if (pos < line.length) parts.push({ text: line.slice(pos) });
      return {
        parts: parts,
        total: total,
        found: inCv,
        ok: total > 0 && inCv / total >= 0.5,
        // Traits are phrased in many ways, so a third is enough, counted from the CV
        // and the letter together. Trait words decide when the clause has any, so that
        // "asiakaspalvelu" in the CV does not tick off "Iloinen asiakaspalveluasenne".
        softOk: traits > 0 ? traitsFound / traits >= 1 / 3 : total > 0 && inEither / total >= 1 / 3,
        partly: traits > 0 ? traitsFound > 0 : inEither > 0,
        // Where it was found, judged by the trait words when the clause has any.
        inCv: traits > 0 ? traitInCv : inCv > 0,
        inLetter: traits > 0 ? traitInLetter : inLetter > 0
      };
    }

    function hasKeywords(r) { return r.total > 0; }
    var reqs = cvClauses.map(function (c) { return inspect(c, false); }).filter(hasKeywords);
    var letterReqs = letterClauses.map(function (c) { return inspect(c, true); }).filter(hasKeywords);

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
      letterReqs: letterReqs,
      hasLetter: hasLetter,
      others: others,
      fallback: fallback,
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

  // One requirement line. `badge` names where it was found (letter group only).
  function reqItem(q, status, badge) {
    var li = el('li', 'req ' + status);
    li.appendChild(hidden('span', 'req-icon', status === 'ok' ? '✓' : status === 'miss' ? '✗' : '•'));
    var text = el('span', 'req-text');
    if (!badge) text.appendChild(srOnly(q.ok ? t('reqOk') : t('reqMiss')));
    q.parts.forEach(function (p) {
      if (p.ok === undefined) text.appendChild(document.createTextNode(p.text));
      else text.appendChild(el('span', p.ok ? 'w-ok' : status === 'todo' ? '' : 'w-miss', p.text));
    });
    if (badge) {
      text.appendChild(document.createTextNode(' '));
      text.appendChild(el('span', 'where', badge));
    }
    li.appendChild(text);
    return li;
  }

  function fillList(list, items, make) {
    list.replaceChildren();
    items.slice(0, MAX_REQS).forEach(function (q) { list.appendChild(make(q)); });
    if (items.length > MAX_REQS) list.appendChild(el('li', 'empty', t('more')(items.length - MAX_REQS)));
  }

  function render(r) {
    var scored = r.total > 0;
    $('score-value').textContent = scored ? r.score : '–';
    document.querySelector('.score-num .pct').hidden = !scored;
    $('score-bar').style.width = (scored ? r.score : 0) + '%';
    $('score-text').textContent = !scored ? t('noCvReqs') :
      t(r.fallback ? 'scoreTextAll' : 'scoreText')(r.found.length, r.total);

    $('req-block').hidden = !r.reqs.length;
    var met = r.reqs.filter(function (q) { return q.ok; }).length;
    $('req-summary').textContent = t('reqSummary')(met, r.reqs.length);
    fillList($('req-list'), r.reqs, function (q) { return reqItem(q, q.ok ? 'ok' : 'miss'); });
    $('fallback-note').hidden = !r.fallback;

    // Personality, attitude and motivation: checked from the letter when there is one.
    $('letter-block').hidden = !r.letterReqs.length;
    $('letter-title').textContent = t(r.hasLetter ? 'letterTitle' : 'tellTitle');
    $('letter-summary').textContent = t(r.hasLetter ? 'letterSummary' : 'tellSummary')(r.letterReqs.length);
    fillList($('letter-list'), r.letterReqs, function (q) {
      if (!r.hasLetter) return reqItem(q, q.softOk ? 'ok' : 'todo', t(q.softOk ? 'whereCv' : 'whereTell'));
      var where = q.inCv && q.inLetter ? 'Both' : q.inCv ? 'Cv' : 'Letter';
      if (q.softOk) return reqItem(q, 'ok', t('where' + where));
      // Some words were found, but not enough: say where, as "partly".
      if (q.partly) return reqItem(q, 'todo', t('partly' + where));
      return reqItem(q, 'miss', t('whereNone'));
    });

    var otherList = $('other-list');
    otherList.replaceChildren();
    $('other-block').hidden = !r.others.length;
    r.others.slice(0, MAX_REQS).forEach(function (s) { otherList.appendChild(el('li', 'other', s)); });
    if (r.others.length > MAX_REQS) otherList.appendChild(el('li', 'empty', t('more')(r.others.length - MAX_REQS)));

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
    var r = analyse(ad, cv, $('letter').value);
    if (!r.total && !r.letterReqs.length) return showError('errNoKeywords');
    showError(null);
    lastResult = r;
    render(r);
    $('message').textContent = r.total ? t('announce')(r.score) : t('noCvReqs');
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
      $('letter').value = EXAMPLE[lang].letter;
      compare();
    });
    $('clear').addEventListener('click', function () {
      $('ad').value = '';
      $('cv').value = '';
      $('letter').value = '';
      showError(null);
      $('results').hidden = true;
      $('ad').focus();
    });
    // Ctrl/Cmd + Enter in any box runs the comparison.
    ['ad', 'cv', 'letter'].forEach(function (id) {
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
