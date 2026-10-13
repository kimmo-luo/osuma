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

Vaatimukset jaetaan kahteen ryhmään:

- **CV:hen kuuluvat**: taidot, kokemus, koulutus, kielet, kortit ja järjestelmät. **Prosentti lasketaan vain näistä.**
- **Hakemukseen kuuluvat**: luonne, asenne ja halu, esim. iloinen, positiivinen, oma-aloitteinen, vuorovaikutustaidot, yhteistyökyky, halu kehittyä, vauhdikas työ, työvuorot, fyysinen kunto. Jos liität kirjeen, jokaisen kohdan vieressä näkyy, löytyykö se CV:stä, kirjeestä, molemmista vai ei kummastakaan. Ilman kirjettä nämä näytetään otsikolla **"Kerro nämä hakemuksessa"**.

Lause, jossa on sekä CV- että hakemusasioita, jaetaan kohdasta, jossa aihe vaihtuu (puolipiste, ", mutta", "ja", "sekä"): "Excel-osaaminen ja positiivinen asenne" → "Excel-osaaminen" CV:hen, "Positiivinen asenne" hakemukseen. Pelkkä yleissana kuten "taidot" ei vie luonteenpiirrettä CV-ryhmään ("vuorovaikutustaidot" on hakemusasia, "neuvottelutaidot" CV-asia).

Tulos näyttää:

- **prosenttiluvun**: kuinka suuri osa **vaatimuslauseiden** avainsanoista löytyy CV:stäsi
- **vaatimukset**: vaatimuslauseet vihreänä, jos vähintään puolet niiden avainsanoista löytyy CV:stä, muuten punaisena
- **avainsanat**: vaatimusten sanat, jotka löytyvät CV:stä (vihreä) tai puuttuvat (punainen)
- **muu ilmoitusteksti (ei lasketa)**: esittely, tehtäväkuvaus ja edut harmaana

Vaatimuslauseiksi tunnistetaan luettelokohdat, lauseet otsikoiden kuten "Sinulla on:", "Edellytämme" tai "Toivomme" jälkeen sekä lauseet, joissa on sana kuten kokemus, taito, kyky, halu, osaaminen, eduksi, edellytys, koulutus tai ajokortti. "Tarjoamme"-osion kohdat eivät ole vaatimuksia. Hakuohjeet (sähköposti, roskaposti, hakemuksen jättäminen, hakuaika) ja yhteystiedot poistetaan kokonaan. Jos ilmoituksesta ei löydy yhtään vaatimuslausetta, prosentti lasketaan koko ilmoituksesta ja siitä näytetään huomautus.

Suomen taivutus on huomioitu: sanoja verrataan niiden alun perusteella, joten esimerkiksi "myynti" löytää sanan "myyntityössä" ja "kokemus" sanan "kokemuksesta". Yhteisen alun pitää olla vähintään 5 merkkiä ja suurin osa sanasta; lyhyemmät sanat löytyvät vain tavallisen taivutuspäätteen kanssa (työ → työtä, mutta käy ≠ käyttö). Myös yleisimmät astevaihtelut (myynti/myynnin, kauppa/kaupan) huomioidaan.

Lisäksi:

- Yhdyssanan loppuosa löytyy: "kokemus" löytää sanan "työkokemus".
- Pieni kaupan alan synonyymilista: esim. esillelaitto = esillepano, hyllytys = hyllyttäminen, inventaario = inventointi.
- Pois jätetään täytesanat (*ja, on, sekä, että, joten, aina…*), hakuohjeiden sanat (hakemus, sähköpostilla, hakuaika, roskaposti…), kuukaudet ja päivämäärät, sähköposti- ja nettiosoitteet sekä yrityksen nimi, joka päätellään ilmoituksen osoitteista (rekry@yritys.fi) ja muodosta "Nimi Oy".

### Yksityisyys

- Kaikki tapahtuu selaimessasi. Tekstejä ei lähetetä minnekään.
- Ei palvelinta, ei analytiikkaa, ei evästeitä, ei paikallista tallennusta.
- Sivun Content-Security-Policy estää selainta ottamasta yhteyttä muualle (`connect-src 'none'`).
- Oikeinkirjoituksen tarkistus on pois päältä tekstilaatikoissa, jotta selaimen pilvipohjainen tarkistus ei lähetä tekstiä eteenpäin.

### Rajoitukset

Versio 1 vertaa sanoja, ei merkityksiä:

- Se tunnistaa vain pienen kaupan alan synonyymilistan, ei muita samaa tarkoittavia ilmauksia ("johtaminen" vs. "vedin tiimiä").
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

Requirements are split into two groups:

- **For the CV**: skills, experience, education, languages, licences and systems. **Only these are scored.**
- **For the cover letter**: personality, attitude and motivation, e.g. cheerful, positive, proactive, interpersonal skills, teamwork, willingness to learn, fast-paced work, shifts, physical fitness. If you add your letter, each item shows whether it is found in the CV, the letter, both or neither. Without a letter they are listed under **"Mention these in your application"**.

A sentence mixing both kinds is split where the topic changes (semicolon, ", but", "and"): "Python skills and a positive attitude" → "Python skills" to the CV, "A positive attitude" to the letter. A generic word such as "skills" does not move a trait into the CV group ("communication skills" belongs in the letter, "negotiation skills" in the CV).

The result shows:

- **a percentage**: how many keywords of the **requirement sentences** appear in your CV
- **requirements**: requirement sentences, green if at least half of their keywords are in your CV, red otherwise
- **keywords**: words from the requirements found in your CV (green) or missing from it (red)
- **other ad text (not counted)**: introduction, duties and benefits, shown in grey

Requirement sentences are bullet points, sentences after headings such as "Sinulla on:", "Edellytämme", "Toivomme" or "You have:", and sentences containing words such as kokemus, taito, kyky, halu, osaaminen, eduksi, edellytys, experience or skills. Items under "Tarjoamme" / "We offer" are not requirements. Application instructions (email, spam folder, submitting the application, deadline) and contact details are removed entirely. If no requirement sentence is found, the whole ad is scored and a note says so.

Finnish inflection is taken into account: words are compared by their beginning, so "myynti" finds "myyntityössä" and "manage" finds "managing". The shared beginning must be at least 5 letters and most of the word; shorter words only match with a regular inflection ending (työ → työtä, but käy ≠ käyttö). Common Finnish consonant gradation (myynti/myynnin) is handled too.

Also:

- The last part of a compound is found: "kokemus" finds "työkokemus".
- A small retail synonym list: e.g. esillelaitto = esillepano, hyllytys = hyllyttäminen, inventaario = inventointi.
- Ignored: filler words (*and, the, ja, on, sekä, että, joten…*), Finnish application-instruction words (hakemus, sähköpostilla, hakuaika, roskaposti…), months and dates, email and web addresses, and the company name, which is inferred from the ad's addresses (jobs@company.fi) and from "Name Oy".

### Privacy

- Everything happens in your browser. Your texts are never sent anywhere.
- No server, no analytics, no cookies, no local storage.
- The page's Content-Security-Policy blocks the browser from connecting anywhere (`connect-src 'none'`).
- Spellcheck is disabled in the text boxes so that cloud-based browser spellcheckers do not send the text on.

### Limitations

Version 1 compares words, not meaning:

- It only recognises a small retail synonym list, not other expressions with the same meaning ("leadership" vs. "led a team").
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
