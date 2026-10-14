# Osuma

**[Suomeksi](#suomeksi) · [In English](#in-english)**

---

## Suomeksi

Osuma on ilmainen, selaimessa toimiva työkalu, joka vertaa työpaikkailmoitusta ja CV:täsi.

**Kokeile:** https://kimmo-luo.github.io/osuma/

### Miten se toimii

1. Liitä työpaikkailmoituksen tehtävä- ja vaatimusosa ensimmäiseen laatikkoon (ei hakuohjeita tai yhteystietoja).
2. Liitä CV:si teksti toiseen laatikkoon.
3. Halutessasi liitä hakemuskirjeesi kolmanteen laatikkoon.
4. Paina **Vertaa**.

### CV ja hakemuskirje tekevät eri asioita

Vaatimukset ja tehtävät jaetaan neljään ryhmään:

- **CV:hen kuuluvat**: taidot, kokemus, koulutus, kielet, kortit ja järjestelmät sekä työtehtävät ("Tehtäviisi kuuluu…", "Työhön kuuluu…", "Työssä pääset…"). **Prosentti lasketaan vain näistä.**
- **Saatavuus (vastaa vain, jos lomake kysyy)**: työvuorot, arkisin ja viikonloppuisin, tuntimäärä, ikä ja aloitusaika näytetään omana harmaana ryhmänä. Ne eivät vaikuta prosentteihin.
- **Hakemukseen kuuluvat**: luonne, asenne ja halu, esim. iloinen, positiivinen, oma-aloitteinen, vuorovaikutustaidot, yhteistyökyky, halu kehittyä, vauhdikas työ, fyysinen kunto. Luonnetta kuvaavat sanat ovat tiedostossa `sanasto.js` synonyymiryhminä, joten kirjeen "tulen toimeen erilaisten ihmisten kanssa" täyttää ilmoituksen "yhteistyökykyinen" ja "tavoitteellinen" täyttää "kilpailuvietin". Jos liität kirjeen, jokaisen kohdan vieressä näkyy, löytyykö se CV:stä, kirjeestä, molemmista vai ei kummastakaan. Ilman kirjettä nämä näytetään otsikolla **"Kerro nämä hakemuksessa"**.
- **Plussaa**: "Eduksi katsotaan:" -osion kohdat ja lauseet kuten "Myyntikokemus on plussaa, mutta ei vaatimus" näytetään omana ryhmänään. Niiden vieressä on ✓, jos asia löytyy CV:stä, mutta ne eivät vaikuta prosenttiin.

Jos ilmoituksessa ei ole kovia vaatimuksia (vuosien kokemus, tutkinto, kortti tai johtotehtävä), hakemukseen kuuluvat kohdat näytetään ensin, koska silloin asenne ja luonne painavat eniten. Jos CV:hen kuuluvia kohtia on alle kolme, prosentin alla on muistutus, ettei se kerro paljon.

Lause, jossa on sekä CV- että hakemusasioita, jaetaan kohdasta, jossa aihe vaihtuu (puolipiste, ", mutta", "ja", "sekä"): "Excel-osaaminen ja positiivinen asenne" → "Excel-osaaminen" CV:hen, "Positiivinen asenne" hakemukseen. Pelkkä yleissana kuten "taidot" ei vie luonteenpiirrettä CV-ryhmään ("vuorovaikutustaidot" on hakemusasia, "neuvottelutaidot" CV-asia).

Tulos näyttää:

- **prosenttiluvun**: kuinka suuri osa **CV:hen kuuluvien vaatimusten ja tehtävien** avainsanoista löytyy CV:stäsi
- **vaatimukset**: vaatimuslauseet vihreänä, jos vähintään puolet niiden avainsanoista löytyy CV:stä, muuten punaisena
- **avainsanat**: vaatimusten sanat, jotka löytyvät CV:stä (vihreä) tai puuttuvat (punainen)
- **muu ilmoitusteksti (ei lasketa)**: esittely ja edut harmaana

Vaatimuslauseiksi tunnistetaan luettelokohdat, lauseet otsikoiden kuten "Sinulla on:", "Edellytämme", "Toivomme", "Mitä odotamme sinulta?", "Sovit meidän tiimiin, jos:", "Sinä olet" tai "Etsimme henkilöä, joka" jälkeen seuraavaan otsikkoon asti (myös puhekieliset "Sulla on", "Sä oot"), lauseet kuten "Etsimme reippaita, tuloshakuisia myyjiä" ja "Jos olet myyntihenkinen ja tavoitteellinen…" sekä lauseet, joissa on sana kuten kokemus, taito, kyky, halu, osaaminen, eduksi, edellytys, koulutus tai ajokortti. Tehtävälauseiksi tunnistetaan "Tehtävät"- ja "Tehtäviisi kuuluu" -otsikoiden kohdat sekä lauseet kuten "Tehtävät keskittyvät…", "Tehtäviin kuuluu…", "Tehtävänkuvaan sisältyy…", "Työhön kuuluu…" ja "Työssä pääset palvelemaan…". "Tarjoamme"-osion kohdat ja edut ("Työssä pääset kehittämään osaamistasi") eivät ole vaatimuksia eivätkä tehtäviä. Hakuohjeet (sähköposti, roskaposti, hakemuksen jättäminen, hakuaika) ja yhteystiedot poistetaan kokonaan. Jos ilmoituksesta ei löydy yhtään vaatimuslausetta, prosentti lasketaan koko ilmoituksesta ja siitä näytetään huomautus.

Suomen taivutus on huomioitu: sanoja verrataan niiden alun perusteella, joten esimerkiksi "myynti" löytää sanan "myyntityössä" ja "kokemus" sanan "kokemuksesta". Yhteisen alun pitää olla vähintään 5 merkkiä ja suurin osa sanasta; lyhyemmät sanat löytyvät vain tavallisen taivutuspäätteen kanssa (työ → työtä, mutta käy ≠ käyttö). Myös yleisimmät astevaihtelut (myynti/myynnin, kauppa/kaupan) huomioidaan.

Lisäksi:

- Yhdyssanan loppuosa löytyy: "kokemus" löytää sanan "työkokemus".
- Ilmoituksen yhdyssanan alkuosa riittää: "myyntitaitoja" löytyy, kun CV:ssä on "myynti" (tai synonyymi "myyjä").
- Emojit (✅ ym.) poistetaan riveiltä ennen vertailua. "Tarjoamme sinulle" -otsikon jälkeiset rivit ovat etuja seuraavaan otsikkoon asti, myös ilman kaksoispistettä.
- Pieni kaupan alan synonyymilista: esim. esillelaitto = esillepano, hyllytys = hyllyttäminen, inventaario = inventointi.
- Luonne- ja asennesanasto (`sanasto.js`, suomeksi ja englanniksi): esim. kilpailuvietti = tuloshakuinen = tavoitteellinen, sinnikäs = ei lannistu, rohkea = uskaltaa, oma-aloitteinen = reipas. Kieltosana kumoaa sanan ("en ole kovin rohkea" ei täytä rohkeutta). Sanaston alussa on ohje uusien sanojen lisäämiseen.
- Pois jätetään täytesanat (*ja, on, sekä, että, joten, aina…*), hakuohjeiden sanat (hakemus, sähköpostilla, hakuaika, roskaposti…), kuukaudet ja päivämäärät, sähköposti- ja nettiosoitteet sekä yrityksen nimi, joka päätellään ilmoituksen osoitteista (rekry@yritys.fi) ja muodosta "Nimi Oy".

### Yksityisyys

- Kaikki tapahtuu selaimessasi. Tekstejä ei lähetetä minnekään.
- Ei palvelinta, ei analytiikkaa, ei evästeitä, ei paikallista tallennusta.
- Sivun Content-Security-Policy estää selainta ottamasta yhteyttä muualle (`connect-src 'none'`).
- Oikeinkirjoituksen tarkistus on pois päältä tekstilaatikoissa, jotta selaimen pilvipohjainen tarkistus ei lähetä tekstiä eteenpäin.

### Rajoitukset

Versio 1 vertaa sanoja, ei merkityksiä:

- Se tunnistaa vain synonyymilistoissa olevat ilmaukset ("johtaminen" vs. "vedin tiimiä" ei täsmää). Luonnetta kuvaavista asioista sanasto kattaa yleisimmät, mutta omin sanoin kuvattu asia ("korjaan asian kysymättä") jää usein tunnistamatta.
- Alkuun perustuva vertailu voi joskus antaa väärän osuman, kun eri sanat alkavat samoin (esim. englannin "international" ja "internal"). CV:n lyhyempi sana ei yleensä kelpaa ilmoituksen pidempään sanaan (CV:n "Java" ei täytä ilmoituksen "JavaScriptiä"), mutta lyhyt taivutuspääte hyväksytään, joten esim. "trukilla" täyttää "trukkikortin". Toisin päin osuma tulee aina, koska ilmoituksen "myynti" pitää löytää CV:n "myyntityössä".
- Yhdyssanan osia etsitään CV:stä erikseen vain kielissä: "suomenkielellä" löytyy, kun CV:ssä on "suomi" ja "äidinkieli".
- Jotta "kuntoa" ei löytäisi sanaa "kunnolla", astevaihtelu huomioidaan vasta neljän saman alkukirjaimen jälkeen. Siksi esim. kunta/kunnan ei täsmää.
- CV- ja hakemusryhmien jako perustuu sanalistaan, joten se voi joskus mennä väärin. Hakemusasioissa riittää, että kolmasosa luonnetta kuvaavista sanoista löytyy CV:stä tai kirjeestä; vähemmästä näytetään "Osittain".
- Vaatimuslauseiden tunnistus perustuu sanoihin ja otsikoihin. Vaatimus ilman tunnistettavaa sanaa jää harmaaksi, ja luettelon jälkeinen tavallinen teksti katsotaan muuksi tekstiksi.
- Yrityksen nimi tunnistetaan vain, jos se näkyy ilmoituksen sähköposti- tai nettiosoitteessa tai muodossa "Nimi Oy" ja nimi esiintyy ilmoituksessa vähintään kahdesti.

Tekoälypohjainen vertailu on suunnitteilla versioon 2.

### Kehitys

Pelkkä HTML, CSS ja JavaScript, ei riippuvuuksia eikä käännösvaihetta. Avaa `index.html` paikallisen palvelimen kautta (esim. `python -m http.server`) ja selaa osoitteeseen `http://localhost:8000`.

### Lisenssi

[MIT](LICENSE)

---

## In English

Osuma (Finnish for "a hit") is a free, browser-based tool that compares a job ad with your CV.

**Try it:** https://kimmo-luo.github.io/osuma/

### How it works

1. Paste the duties and requirements part of the job ad into the first box (not the application instructions or contact details).
2. Paste your CV into the second box.
3. Optionally paste your cover letter into the third box.
4. Press **Compare**.

### The CV and the cover letter do different jobs

Requirements and duties are split into four groups:

- **For the CV**: skills, experience, education, languages, licences and systems, plus the duties of the job ("Responsibilities", "Tehtäviisi kuuluu…"). **Only these are scored.**
- **Availability (answer only if the form asks)**: shifts, weekdays and weekends, weekly hours, age and start date are shown as their own grey group and do not affect the percentages.
- **For the cover letter**: personality, attitude and motivation, e.g. cheerful, positive, proactive, interpersonal skills, teamwork, willingness to learn, fast-paced work, physical fitness. The trait words live in `sanasto.js` as synonym groups, so "I get along with different people" in the letter satisfies "team player" in the ad, and "goal-oriented" satisfies "competitive". If you add your letter, each item shows whether it is found in the CV, the letter, both or neither. Without a letter they are listed under **"Mention these in your application"**.
- **Nice to have**: items under "Nice to have:" / "Eduksi katsotaan:" and sentences such as "Retail experience is a plus, but not required" are shown as their own group, with a ✓ when your CV has them. They do not affect the percentage.

If the ad has no hard requirements (years of experience, a degree, a licence or a supervisor's role), the letter items are shown first, because attitude and personality then matter most. With fewer than three CV items, a note under the percentage says that it does not tell much.

A sentence mixing both kinds is split where the topic changes (semicolon, ", but", "and"): "Python skills and a positive attitude" → "Python skills" to the CV, "A positive attitude" to the letter. A generic word such as "skills" does not move a trait into the CV group ("communication skills" belongs in the letter, "negotiation skills" in the CV).

The result shows:

- **a percentage**: how many keywords of the **requirements and duties for the CV** appear in your CV
- **requirements**: requirement sentences, green if at least half of their keywords are in your CV, red otherwise
- **keywords**: words from the requirements found in your CV (green) or missing from it (red)
- **other ad text (not counted)**: introduction and benefits, shown in grey

Requirement sentences are bullet points, sentences after headings such as "Sinulla on:", "Edellytämme", "Toivomme", "Mitä odotamme sinulta?", "Sovit meidän tiimiin, jos:", "You have:" or "Who you are" until the next heading, sentences such as "Etsimme reippaita, tuloshakuisia myyjiä" or "We are looking for energetic people", and sentences containing words such as kokemus, taito, kyky, halu, osaaminen, eduksi, edellytys, experience or skills. Duty sentences are items under headings such as "Tehtävät" or "Responsibilities" and sentences such as "Tehtäviin kuuluu…", "Tehtävänkuvaan sisältyy…", "Työhön kuuluu…" or "Your tasks…". Items under "Tarjoamme" / "We offer" and benefits ("Työssä pääset kehittämään osaamistasi", "You will get…") are neither requirements nor duties. Application instructions (email, spam folder, submitting the application, deadline) and contact details are removed entirely. If no requirement sentence is found, the whole ad is scored and a note says so.

Finnish inflection is taken into account: words are compared by their beginning, so "myynti" finds "myyntityössä" and "manage" finds "managing". The shared beginning must be at least 5 letters and most of the word; shorter words only match with a regular inflection ending (työ → työtä, but käy ≠ käyttö). Common Finnish consonant gradation (myynti/myynnin) is handled too.

Also:

- The last part of a compound is found: "kokemus" finds "työkokemus".
- The first part of an ad compound is enough: "myyntitaitoja" is found when the CV has "myynti" (or its synonym "myyjä").
- Emojis (✅ etc.) are removed before comparing. Lines after a "Tarjoamme sinulle" / "We offer" heading are benefits until the next heading, with or without a colon.
- A small retail synonym list: e.g. esillelaitto = esillepano, hyllytys = hyllyttäminen, inventaario = inventointi.
- A personality and attitude vocabulary (`sanasto.js`, Finnish and English): e.g. competitive = results-driven = goal-oriented, persistent = never gives up, brave = not afraid, proactive = energetic. A negation cancels a word ("not very brave" does not count). The file starts with instructions for adding words.
- Ignored: filler words (*and, the, ja, on, sekä, että, joten…*), Finnish application-instruction words (hakemus, sähköpostilla, hakuaika, roskaposti…), months and dates, email and web addresses, and the company name, which is inferred from the ad's addresses (jobs@company.fi) and from "Name Oy".

### Privacy

- Everything happens in your browser. Your texts are never sent anywhere.
- No server, no analytics, no cookies, no local storage.
- The page's Content-Security-Policy blocks the browser from connecting anywhere (`connect-src 'none'`).
- Spellcheck is disabled in the text boxes so that cloud-based browser spellcheckers do not send the text on.

### Limitations

Version 1 compares words, not meaning:

- It only recognises expressions in its synonym lists ("leadership" vs. "led a team" does not match). The trait vocabulary covers the common ones, but a trait described in your own words ("I fix things without being asked") is often missed.
- Prefix matching can occasionally give a false match when different words start the same way (e.g. "international" and "internal"). A shorter CV word usually does not count for a longer ad word ("Java" in the CV does not satisfy "JavaScript" in the ad), but a short inflection ending is accepted, so e.g. "trukilla" satisfies "trukkikortti". The other way round it always matches, because the ad's "myynti" must find "myyntityössä" in the CV.
- Compound parts are looked up separately only for languages: "suomenkielellä" is found when the CV has "suomi" and "äidinkieli".
- To keep "kuntoa" from matching "kunnolla", consonant gradation is only considered after four identical leading letters, so e.g. kunta/kunnan does not match.
- The split into CV and letter groups relies on a word list, so it can occasionally be wrong. For letter items, a third of the trait words found in the CV or letter is enough; fewer shows as "Partly".
- Requirement detection relies on words and headings. A requirement without a recognisable word stays grey, and plain text after a bullet list counts as other text.
- The company name is recognised only if it appears in the ad's email or web address, or as "Name Oy" with the name appearing at least twice in the ad.

AI-based comparison is planned for version 2.

### Development

Plain HTML, CSS and JavaScript with no dependencies or build step. Serve the folder locally (e.g. `python -m http.server`) and open `http://localhost:8000`.

### Licence

[MIT](LICENSE)
