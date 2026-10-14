/*
 * Osuman luonne- ja asennesanasto (personality and attitude vocabulary).
 *
 * Näillä sanoilla Osuma tunnistaa hakemukseen kuuluvat kohdat ("Olet reipas",
 * "Sulla on kilpailuviettiä") ja etsii niitä CV:stä ja hakemuskirjeestä.
 * Sanat on jaettu synonyymiryhmiin: mikä tahansa ryhmän sana täyttää minkä
 * tahansa toisen saman ryhmän sanan (kilpailuhenkinen = tavoitteellinen).
 *
 * Näin lisäät sanoja:
 * 1. Etsi sopiva ryhmä tai lisää uusi { nimi, fi, en } loppuun.
 * 2. Kirjoita sanan alku pienillä kirjaimilla, ilman päätettä: 'rohke' löytää
 *    sanat rohkea, rohkeasti ja rohkeutta. Katso astevaihtelu: 'reipas' ja 'reippa'.
 * 3. Tähti alussa ('*palveluhenk') tarkoittaa, että osa voi olla myös yhdyssanan
 *    sisällä (asiakaspalveluhenkinen). Ilman tähteä sanan pitää alkaa näin.
 * 4. Välilyönti tekee fraasin: sanat samassa järjestyksessä, enintään kaksi
 *    muuta sanaa välissä. Pystyviiva antaa vaihtoehdot: 'ei|en|et lannistu'
 *    löytää lauseet "et lannistu" ja "en lannistu helposti".
 * 5. Varo vääriä osumia. Liian lyhyt alku osuu muihin sanoihin ('kilpailu' osuisi
 *    sanaan kilpailukykyinen palkka, 'tiimi' sanaan tiimin johtaminen). Käytä
 *    silloin pidempää alkua tai fraasia, tai lisää sana listaan eiLuonne.
 * 6. Yksittäinen sana ei kelpaa, jos juuri ennen sitä on kieltosana
 *    ("en ole kovin rohkea"). Fraaseissa kielto kirjoitetaan itse ('ei|en|et lannistu').
 * 7. Sama sana vain yhteen ryhmään (fraasin osana se voi olla toisessakin).
 *    Fraasin enintään kolmen kirjaimen osat (ei, en, et, voi) täsmäävät vain kokonaisina.
 * 8. Väärän osuman voi estää myös fraasilla listassa eiLuonne ('sosiaalis media').
 *    Testaa muutos sivun omalla esimerkillä.
 *
 * Only words and phrases, no personal data. Used by app.js.
 */
var OsumaSanasto = {
  ryhmat: [
    {
      nimi: 'Kilpailuhenkinen, tavoitteellinen, tuloshakuinen',
      fi: ['kilpailuviet', 'kilpailuhenk', 'kilpailunhal', 'tuloshaku', 'tulosorient', 'tulossuuntau',
        'tavoitteelli', 'tavoitehaku', 'tavoitesuuntau', 'määrätietoi', 'kunnianhim', 'voitontah',
        'voitonnälk', 'voittajahenk', 'voitta',
        'saavut tavoit', 'tavoit saavut', 'ylit|ylittä tavoit', 'tavoit ylit', 'aset|asett tavoit',
        'tavoitteiden eteen', 'teen|teet|tekee|teke|tehd tulosta', 'vaikutta ansio|palkka|tienest'],
      en: ['competitive', 'results-driven', 'result-driven', 'results-orient', 'result-orient', 'goal-orient',
        'goal-driven', 'target-driven', 'target-orient', 'ambitio', 'determined',
        'driven by result|target', 'exceed|beat|reach|achiev target|goal', 'set goal|target']
    },
    {
      nimi: 'Myyntihenkinen',
      fi: ['myyntihenk', 'myyntiorient', 'myyntimieli', 'myyntinälk', 'kaupante',
        'myynti|myyminen on minulle|mulle', 'naut myyn|myymi|kaupante'],
      en: ['sales-minded', 'sales-orient', 'sales-driven', 'love|enjoy sell|sales']
    },
    {
      nimi: 'Sinnikäs, periksiantamaton',
      fi: ['sinnik', 'periksiantamat', 'sitke', 'sisukas', 'sisukk', 'pitkäjännit',
        'ei|en|et|eivät lannistu', 'ei|en|et|eivät anna periksi', 'ei|en|et luovuta',
        'ei|en|et masennu', 'kestä pettymy|vastoinkäy|kieltei|ei-vastau',
        'jatka|jatke eteenpäin', 'ei|en|et ota henkilökoht'],
      en: ['persisten', 'persever', 'tenaci', 'resilien', 'never|not|don give up', 'bounce back', 'keep going']
    },
    {
      nimi: 'Rohkea, uskaltaa, ennakkoluuloton',
      fi: ['rohke', 'uskal', 'ennakkoluulot', 'pelotto', 'heittäyty', 'mukavuusalue',
        'haastaa|haastan|haastat|haastamaan itseä', 'ei|en|et pelkää', 'ei|en|enkä|et jännitä', 'tart|tartun haaste', 'mene luokse'],
      en: ['courage', 'brave', 'bold', 'fearless', 'open-minded', 'daring', 'comfort zone', 'not afraid',
        'challeng yourself|myself']
    },
    {
      nimi: 'Sosiaalinen, ulospäinsuuntautunut, vuorovaikutustaidot',
      fi: ['sosiaalis', 'sosiaalinen', 'ulospäinsuuntau', 'puhelia', 'seurallis', 'lähestyttäv',
        'ihmisläheis', '*vuorovaikutu', 'jutte', 'jutel',
        'helppo|helposti lähesty', 'kohda|kohta uusi|ihmis', 'tutustu ihmis',
        'avoi mieli|luonte|asent', 'ihmisten|ihmisiä kanssa|parissa'],
      en: ['sociable', 'socially', 'social skill', 'outgoing', 'extrovert', 'approachable', '*interpersonal', '*communicat',
        'talkative', 'people person', 'people skill', 'meet|meeting new people']
    },
    {
      nimi: 'Tiimipelaaja, yhteistyökykyinen',
      fi: ['tiimipelaaj', '*tiimihenk', '*yhteistyö', 'yhteishenk', 'joukkuepelaaj', 'tiimityö',
        'toimee ihmis|kaik|muid|eril|kenen', 'osana|osaksi tiimi|poruk|työyhteis|joukko',
        'yhdessä töi|tehd|teke|työsk', 'tehd|teke|työsk yhdessä', 'poruk hyvä',
        'auta|autt|autan työkaver|kollego|toisia|muita', 'työkaver|kollego auta|autt'],
      en: ['team-player', 'teamwork', 'team-orient', 'collaborat', 'cooperat', 'co-operat', 'team player',
        'team spirit', 'get|gets along', 'work well others|people|colleag', 'part team']
    },
    {
      nimi: 'Oma-aloitteinen, aktiivinen, reipas',
      fi: ['*aloittei', '*aloitteel', 'reipas', 'reippa', 'ripeä', 'energi',
        'aktiivi ote|otte|asen|tyyppi|persoon|luonte|toimija|tekijä', 'olet|oot|olen aktiivi',
        'toimelia', 'aikaansaa', 'pyytämät', 'käskemät', 'tart toimee', 'missä apu', 'tarvits erikseen pyytä|käske'],
      en: ['*proactive', '*self-start', 'self-motivated', 'initiative', 'energetic', 'go-getter',
        'active person|attitude|approach', 'dynamic person|personality']
    },
    {
      nimi: 'Ahkera, tehokas',
      fi: ['ahker', 'työteliä', 'tehokas', 'tehokk', 'valmi teke|tehd töi|työ', 'teen|teet|tekee|teke|tehd töi eteen',
        'kova työ|töi', 'paisk töi|hommi'],
      en: ['hardworking', 'hard-working', 'diligent', 'industrious', 'efficient', 'work ethic', 'hard work']
    },
    {
      nimi: 'Luotettava, täsmällinen, sitoutunut',
      fi: ['*luotettav', '*täsmälli', '*sitoutu', '*vastuullis', 'tunnollis', 'vastuuntunto',
        'paikalla|töissä|töihin ajoissa', 'loppuun', 'voi|voit|voivat luotta', 'pidä lupau|sanan', 'homma|hommat|asiat hoitu|hoidet'],
      en: ['*reliable', 'dependab', 'trustworth', 'punctual', 'committed', 'commitment', 'conscientious']
    },
    {
      nimi: 'Huolellinen, tarkka, järjestelmällinen',
      fi: ['*huolelli', '*järjestelmällis', 'tarkka', 'tarkkuu', 'tarkan', 'tarkoin',
        'pikkutark', 'yksityiskoh', 'huomio pieni|yksityisk'],
      en: ['careful', 'thorough', 'meticulous', 'accurate', 'accuracy', 'precise', 'precision', 'detail-orient',
        'well-organi', 'attention detail', 'eye detail']
    },
    {
      nimi: 'Joustava, sopeutuva',
      fi: ['*joustav', 'joustan', 'joustaa', 'sopeutu', 'mukautu', 'muuntautu', 'venyv'],
      en: ['*flexib', 'adaptab', 'versatil']
    },
    {
      nimi: 'Paineensieto, rauhallinen, viihtyy vauhdikkaassa työssä',
      fi: ['*stressinsieto', '*paineensieto', '*kiireensieto', 'rauhalli', 'kärsivälli', 'pitkäpinnai',
        '*vauhdik', 'nopeatempoi', 'nopeatahti', 'rauhassa', 'ei|en|et hermostu',
        'pään kylmänä|kylmän', 'paine alla|alaise', 'hyvät|vahvat hermot', 'pitkä pinna',
        'kiirei ympäristö|työymp|tilant|päiv|iltapäiv|aamu|ilta|työ'],
      en: ['calm', 'composed', 'stress-resist', 'stress-toleran', 'patience', 'fast-paced',
        'under pressure', 'fast paced', 'busy environment', 'cool head']
    },
    {
      nimi: 'Positiivinen, iloinen, hyväntuulinen',
      fi: ['*positiivi', 'iloi', 'hyväntuuli', 'pirte', 'aurinkoi', 'optimisti', '*huumori', 'hymy', 'rento',
        'rennosti', 'leppoi', 'hyvä fiilis|meinin|mieli|mielell|tuule'],
      en: ['*positive', '*cheerful', 'upbeat', 'optimis', 'smil', 'sense humo', 'good mood']
    },
    {
      nimi: 'Asenne ja työote',
      fi: ['*asenne', '*asentee', 'työote', 'työotte', 'työmoraal', '*työskentelytyyl'],
      en: ['*attitude']
    },
    {
      nimi: 'Palveluhenkinen, asiakaslähtöinen, ystävällinen',
      fi: ['*palveluhenk', 'palvelualtti', 'palvelualtis', 'asiakasläh', 'asiakaskeskei', '*ystävälli',
        '*kohteliai', '*avulia', 'auttavai', 'auttamishal', 'halu palvel|autta'],
      en: ['service-minded', 'service-orient', 'customer-focus', 'customer-orient', 'customer-centric',
        'customer-first', 'friendly', 'polite', 'courteous', 'helpful', 'customer focus|orient',
        'happy help', 'love|enjoy help']
    },
    {
      nimi: 'Kehittymishaluinen, oppimishaluinen',
      fi: ['*kehitty', '*oppimishal', 'utelia', 'tiedonjano', 'halu oppi|kehit', 'oppi|opin|opit|opiskel uut|uud',
        'kehittä|kehitä itse|osaami|taito|taido'],
      en: ['curious', 'curiosity', 'growth mindset', 'desire|willing|eager|keen|want|ready learn|grow|develop', 'learn new|something']
    },
    {
      nimi: 'Nopea oppija',
      fi: ['*oppimiskyk', '*omaksumiskyk', 'omaksu', 'opin|opit|oppii|oppi|opettel nopea|nopsa', 'nopea oppi'],
      en: ['quick|fast learner', 'learn quick|fast|rapid', 'pick up quick']
    },
    {
      nimi: 'Motivoitunut, innostunut, innokas',
      fi: ['*motivaatio', '*motivoi', '*innostu', 'innok', '*kiinnostu', 'intohim', 'innolla'],
      en: ['*motivat', '*enthusias', '*passion', 'eager', 'keen']
    },
    {
      nimi: 'Itsenäinen, omatoiminen',
      fi: ['itsenäi', 'omatoimi', 'itseohjautu', 'teen|työskentel yksin'],
      en: ['independen', 'self-direct', 'autonomous', 'self-sufficient']
    },
    {
      nimi: 'Empaattinen, kuunteleva',
      fi: ['empaat', 'empatia', 'kuunteleva', 'kuuntelutai', 'kuuntelija', 'eläyty',
        'osaan|osaat|osaa kuunnel|kuuntel', 'kuuntele|kuuntelen|kuuntelet asiakas|asiakka|tarpe', 'ymmärrä|ymmärtä tarvi|tarpe'],
      en: ['empath', 'listen']
    },
    {
      nimi: 'Pelisilmä, tilannetaju',
      fi: ['*pelisilm', 'tilannetaj', 'maalaisjärk'],
      en: ['common sense', 'situational awar']
    },
    {
      nimi: 'Ratkaisukeskeinen',
      fi: ['ratkaisukeskei', 'ratkaisuhaku', 'ratkaisuorient'],
      en: ['solution-orient', 'solution-focus']
    },
    {
      nimi: 'Fyysinen kunto',
      fi: ['fyysi', 'kunto', 'hyvä kunno', 'hyväkuntoi', '*liikkuvuu'],
      en: ['physically', 'physical fitness|condition|stamina|work']
    },
    {
      nimi: 'Rehellinen',
      fi: ['*rehelli', 'vilpitö'],
      en: ['honest', 'integrity']
    },
    {
      nimi: 'Ylpeys omasta työstä',
      fi: ['*ylpe'],
      en: ['pride work|job', 'proud work|job']
    },
    {
      nimi: 'Luova, idearikas',
      fi: ['luova', 'luovuu', 'innovatiivi', 'ideari', 'kekseliä'],
      en: ['creativ', 'innovativ', 'imaginat']
    }
  ],

  // Sanojen alkuja, jotka eivät kuvaa luonnetta, vaikka ne alkavat kuin luonnesana
  // (energia-ala, kuntoutus, kuntosali, rentoutus), ja fraaseja (sosiaalinen media).
  eiLuonne: ['energia', 'kuntout', 'kuntosal', 'rentou', 'sosiaalis media|mediaa|medias|mediaan', 'social media']
};

if (typeof module !== 'undefined' && module.exports) module.exports = OsumaSanasto;
