# Osuma

**[Suomeksi](#suomeksi) · [In English](#in-english)**

---

## Suomeksi

Osuma on ilmainen, selaimessa toimiva työkalu, joka vertaa työpaikkailmoitusta ja CV:täsi.

**Kokeile:** https://kimmo-luo.github.io/osuma/

### Miten se toimii

1. Liitä työpaikkailmoituksen teksti ensimmäiseen laatikkoon.
2. Liitä CV:si teksti toiseen laatikkoon.
3. Paina **Vertaa**.

Tulos näyttää:

- **prosenttiluvun**: kuinka suuri osa ilmoituksen avainsanoista löytyy CV:stäsi
- **vaatimukset**: ilmoituksen luettelokohdat (tai virkkeet), vihreänä jos vähintään puolet kohdan avainsanoista löytyy CV:stä, muuten punaisena
- **avainsanat**: CV:stä löytyvät (vihreä) ja puuttuvat (punainen) sanat

Suomen taivutus on huomioitu: sanoja verrataan niiden alun perusteella, joten esimerkiksi "myynti" löytää sanan "myyntityössä" ja "kokemus" sanan "kokemuksesta". Myös yleisimmät astevaihtelut (myynti/myynnin, kauppa/kaupan) huomioidaan. Täytesanat kuten *ja, on, sekä, että* jätetään pois.

### Yksityisyys

- Kaikki tapahtuu selaimessasi. Tekstejä ei lähetetä minnekään.
- Ei palvelinta, ei analytiikkaa, ei evästeitä, ei paikallista tallennusta.
- Sivun Content-Security-Policy estää selainta ottamasta yhteyttä muualle (`connect-src 'none'`).
- Oikeinkirjoituksen tarkistus on pois päältä tekstilaatikoissa, jotta selaimen pilvipohjainen tarkistus ei lähetä tekstiä eteenpäin.

### Rajoitukset

Versio 1 vertaa sanoja, ei merkityksiä:

- Se ei tunnista synonyymejä ("johtaminen" vs. "vedin tiimiä").
- Se ei tunnista yhdyssanan loppuosaa: ilmoituksen "kieli" ei löydy CV:n sanasta "äidinkieli".
- Alkuun perustuva vertailu voi joskus antaa väärän osuman, kun eri sanat alkavat samoin (esim. englannin "international" ja "internal"). Lyhyet sanat ja selvästi eri sanat (Java/JavaScript, Sales/Salesforce, asiakas/asiakaspalvelu) erotetaan toisistaan.

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

1. Paste the job ad into the first box.
2. Paste your CV into the second box.
3. Press **Compare**.

The result shows:

- **a percentage**: how many of the ad's keywords appear in your CV
- **requirements**: the ad's bullet points (or sentences), green if at least half of their keywords are in your CV, red otherwise
- **keywords**: words found in your CV (green) and missing from it (red)

Finnish inflection is taken into account: words are compared by their beginning, so "myynti" finds "myyntityössä" and "manage" finds "managing". Common Finnish consonant gradation (myynti/myynnin) is handled too. Filler words such as *and, the, ja, on, sekä, että* are ignored.

### Privacy

- Everything happens in your browser. Your texts are never sent anywhere.
- No server, no analytics, no cookies, no local storage.
- The page's Content-Security-Policy blocks the browser from connecting anywhere (`connect-src 'none'`).
- Spellcheck is disabled in the text boxes so that cloud-based browser spellcheckers do not send the text on.

### Limitations

Version 1 compares words, not meaning:

- It does not recognise synonyms ("leadership" vs. "led a team").
- It does not look at the end of compound words: "kieli" in the ad is not found in "äidinkieli" in the CV.
- Prefix matching can occasionally give a false match when different words start the same way (e.g. "international" and "internal"). Short words and clearly different words (Java/JavaScript, Sales/Salesforce, asiakas/asiakaspalvelu) are kept apart.

AI-based comparison is planned for version 2.

### Development

Plain HTML, CSS and JavaScript with no dependencies or build step. Serve the folder locally (e.g. `python -m http.server`) and open `http://localhost:8000`.

### Licence

[MIT](LICENSE)
