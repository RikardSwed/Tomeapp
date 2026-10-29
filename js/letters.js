// Tomtenissens 24 brev. Ett brev per lucka.
// typ: "Lek", "Pyssel", "Bus", "Äventyr" eller "Mys"
// text: en lista med stycken. Det är de här styckena som läses upp.

const LETTERS = [
  {
    day: 1, emoji: "🛷", typ: "Äventyr",
    titel: "Pulkadags!",
    text: [
      "Hej hopp, mitt hjärtegull!",
      "Nu är december här, och jag har vaknat i min lilla stuga under granen. Det första jag alltid gör i december är att åka pulka. Wiiii!",
      "Därför är dagens överraskning: Gå ut och åk pulka! Om det inte finns någon snö, så testa ändå! Kanske går det att åka på gräset, på löven eller i en backe med lera. Det blir roligt i alla fall, det lovar jag.",
      "Kram från Tomtenissen"
    ]
  },
  {
    day: 2, emoji: "❄️", typ: "Pyssel",
    titel: "Snöflingor i fönstret",
    text: [
      "Hej igen, min vän!",
      "Visste du att det inte finns två snöflingor som är exakt likadana? Precis som människor. Alla är olika och alla är fina.",
      "Dagens överraskning är ett pyssel: Vik ett vitt papper några gånger och klipp små hack i kanterna. Veckla upp det, och vips så har du en snöflinga! Gör flera stycken och sätt upp dem i fönstret, så att jag ser dem när jag smyger förbi.",
      "Be en vuxen om hjälp med saxen om det behövs.",
      "Kram från Tomtenissen"
    ]
  },
  {
    day: 3, emoji: "🪥", typ: "Bus",
    titel: "Bubbliga tänder",
    text: [
      "Hihihi, hej busfrö!",
      "Idag är det dags för lite tomtebus. Men pssst, det är hemligt!",
      "Smyg in i badrummet och lägg en liten, liten klick tvål på pappas tandborste. Eller på mammas, om det är hon som borstar tänderna först ikväll. Sen väntar du och ser vad som händer. Blir det bubblor i munnen?",
      "Säg inte att det var du. Säg att det nog var en nisse!",
      "Busiga hälsningar från Tomtenissen"
    ]
  },
  {
    day: 4, emoji: "🍪", typ: "Pyssel",
    titel: "Pepparkaksfamiljen",
    text: [
      "Hej mitt pepparkakshjärta!",
      "Jag älskar pepparkakor. Jag äter dem till frukost, lunch och middag. Fast det får du nog inte göra.",
      "Dagens överraskning: Baka pepparkakor tillsammans med en vuxen. Försök göra en pepparkaka som ser ut som varje person i din familj. Vem blir finast? Vem blir knasigast?",
      "Spara gärna en pepparkaka till mig. Jag kommer kanske och smakar i natt.",
      "Kram från Tomtenissen"
    ]
  },
  {
    day: 5, emoji: "💃", typ: "Lek",
    titel: "Frysdans",
    text: [
      "Hej hej, dansfötter!",
      "Vi nissar dansar varje kväll runt granen tills vi blir alldeles snurriga.",
      "Dagens överraskning är en lek: Frysdans! Be en vuxen sätta på julmusik. Alla dansar så tokigt de kan. När musiken stannar måste alla frysa som isstatyer. Den som rör sig får göra en tomtegrimas!",
      "Dansa ordentligt nu, så att golvet skakar.",
      "Kram från Tomtenissen"
    ]
  },
  {
    day: 6, emoji: "🥿", typ: "Bus",
    titel: "Var är tofflorna?",
    text: [
      "Hej, lilla busnisse!",
      "Nu är det dags för tomtebus igen. Jag har ett riktigt bra förslag.",
      "Göm mammas eller pappas tofflor, eller ett par skor. Lägg en lapp där de brukar stå. På lappen ritar du en liten tomteluva och skriver: Tomtenissen var här!",
      "Sen får de leta. Du får ge ledtrådar om de inte hittar dem: varmt, varmare, kallt!",
      "Busiga hälsningar från Tomtenissen"
    ]
  },
  {
    day: 7, emoji: "🎨", typ: "Pyssel",
    titel: "En teckning till någon",
    text: [
      "Hej, min konstnär!",
      "Vet du vad som gör tomtar alldeles varma i magen? När någon tänker på dem.",
      "Dagens överraskning: Rita en teckning till någon du tycker om. Det kan vara mormor, en kompis, en fröken eller grannen. Rita något som gör dem glada, och ge den sen till dem.",
      "Du kommer se, den som får teckningen blir jätteglad. Och du blir glad också.",
      "Kram från Tomtenissen"
    ]
  },
  {
    day: 8, emoji: "🔴", typ: "Lek",
    titel: "Den röda skattjakten",
    text: [
      "Hallå där, skattletare!",
      "Röd är min favoritfärg. Min luva är röd, mina strumpor är röda och min näsa blir röd när det är kallt ute.",
      "Dagens överraskning är en lek: Hitta tio röda saker hemma, så snabbt du kan! Lägg dem på en hög på golvet. Be en vuxen ta tid. Kan du hitta tio röda saker på mindre än fem minuter?",
      "Glöm inte att lägga tillbaka allt efteråt.",
      "Kram från Tomtenissen"
    ]
  },
  {
    day: 9, emoji: "🍌", typ: "Bus",
    titel: "Fruktskålens ansikten",
    text: [
      "Hej hej, lilla skojare!",
      "Tomtebus nummer tre! Det här blir roligt.",
      "Be om en penna och rita glada ansikten på frukterna i fruktskålen. Bananer, apelsiner och mandariner är bäst. Rita stora ögon och en jättestor mun. Ge dem gärna namn också!",
      "När någon ska ta en frukt blir de jätteförvånade när frukten tittar tillbaka på dem.",
      "Busiga hälsningar från Tomtenissen"
    ]
  },
  {
    day: 10, emoji: "🏕️", typ: "Mys",
    titel: "Kojkväll",
    text: [
      "Hej, mitt mysiga hjärta!",
      "Nissar bor ofta i små kojor under golvet eller bakom granen. Det är så mysigt där.",
      "Dagens överraskning: Bygg en koja! Använd filtar, kuddar, stolar och lakan. Kryp in med en ficklampa och läs en saga tillsammans med en vuxen inne i kojan.",
      "Om du vill får du gärna sova en liten stund i kojan också.",
      "Kram från Tomtenissen"
    ]
  },
  {
    day: 11, emoji: "⛄", typ: "Pyssel",
    titel: "Snögubbe inomhus",
    text: [
      "Hej min snögubbsvän!",
      "Jag har en kompis som är en snögubbe. Han heter Kalle Kall och han smälter om han kommer in i värmen.",
      "Dagens överraskning: Gör en snögubbe som inte smälter! Du kan rita den, klippa den av papper eller limma bomullsbollar på ett papper. Glöm inte morotsnäsan och halsduken.",
      "Och om det finns snö ute, så får du förstås bygga en riktig också!",
      "Kram från Tomtenissen"
    ]
  },
  {
    day: 12, emoji: "🧸", typ: "Bus",
    titel: "Gosedjuret vid bordet",
    text: [
      "Hej, lilla busmästare!",
      "Dags för tomtebus! Mina gosedjur tycker också om att busa.",
      "Innan maten idag: Smyg fram och sätt ett gosedjur på en vuxens plats vid matbordet. Lägg en tallrik och en sked framför gosedjuret. När den vuxna kommer säger du: Oj, den platsen är upptagen!",
      "Vem tror du blir mest förvånad?",
      "Busiga hälsningar från Tomtenissen"
    ]
  },
  {
    day: 13, emoji: "🕯️", typ: "Lek",
    titel: "Luciatåg hemma",
    text: [
      "God morgon, lilla lucia!",
      "Idag är det Luciadagen. Då brukar vi nissar gå i ett långt tåg och sjunga, med ljus i händerna.",
      "Dagens överraskning: Gör ett eget luciatåg hemma! Ta på dig något vitt, till exempel en tröja eller ett lakan, och använd en ficklampa som ljus. Släck lamporna och gå sjungande genom huset. Sjung Sankta Lucia eller vilken julsång du vill.",
      "Kanske kan ni äta lussekatter efteråt?",
      "Kram från Tomtenissen"
    ]
  },
  {
    day: 14, emoji: "🔦", typ: "Äventyr",
    titel: "Ficklampspromenad",
    text: [
      "Hej, min modiga upptäckare!",
      "När det är mörkt ute är världen alldeles hemlig och spännande. Det är då vi nissar är ute och går.",
      "Dagens överraskning: Gå en promenad i mörkret med en vuxen och en ficklampa. Titta efter stjärnor, julbelysning i fönstren och spår på marken. Kanske hittar du nissespår!",
      "Räkna hur många julstjärnor du ser i fönstren.",
      "Kram från Tomtenissen"
    ]
  },
  {
    day: 15, emoji: "🤫", typ: "Mys",
    titel: "Hemlig hjälpare",
    text: [
      "Hej, mitt guldhjärta!",
      "Vi nissar hjälper till i smyg. Ingen ser oss, men alla blir glada.",
      "Dagens överraskning: Var en hemlig hjälpare idag! Gör något snällt utan att någon märker att det var du. Du kan bädda någons säng, duka bordet, eller lägga en liten hälsning under någons kudde.",
      "Säg inget. Det är det fina med att vara en hemlig hjälpare.",
      "Kram från Tomtenissen"
    ]
  },
  {
    day: 16, emoji: "🧊", typ: "Bus",
    titel: "Vem bor i kylskåpet?",
    text: [
      "Hihi, hej igen!",
      "Tomtebus! Har du hört att det kan vara kallt i kylskåpet? Brrr!",
      "Ta ett litet gosedjur eller en leksak och ställ den i kylskåpet, så att den tittar ut när någon öppnar dörren. Den som ska ta mjölken får en riktig överraskning!",
      "Glöm inte att rädda gosedjuret ut i värmen sen.",
      "Busiga hälsningar från Tomtenissen"
    ]
  },
  {
    day: 17, emoji: "💌", typ: "Pyssel",
    titel: "Julkort",
    text: [
      "Hej, min brevskrivare!",
      "Jag skriver massor av brev i december, som du märker. Det är det bästa jag vet.",
      "Dagens överraskning: Gör ett julkort till någon som bor långt bort, till exempel mormor, morfar, farmor eller farfar. Rita en tomte, en gran eller en stjärna på framsidan. Inuti kan du skriva God Jul, eller be en vuxen hjälpa dig skriva.",
      "Skicka det med posten. Tänk så glad den personen blir!",
      "Kram från Tomtenissen"
    ]
  },
  {
    day: 18, emoji: "🐦", typ: "Äventyr",
    titel: "Julmat till fåglarna",
    text: [
      "Hej, min djurvän!",
      "Fåglarna blir så hungriga på vintern. Jag brukar dela min gröt med dem.",
      "Dagens överraskning: Ge fåglarna en julklapp! Häng upp fågelfrön, en talgboll eller några äppelbitar ute. Sen kan du titta genom fönstret och se vilka fåglar som kommer och äter.",
      "Kan du se en röd domherre? Den har en mage lika röd som min luva.",
      "Kram från Tomtenissen"
    ]
  },
  {
    day: 19, emoji: "🎶", typ: "Bus",
    titel: "Morgonserenad",
    text: [
      "God morgon, sångfågel!",
      "Tomtebus! Och det här är det högljuddaste buset hittills.",
      "Imorgon bitti, eller nu på en gång: Smyg in till en vuxen eller ett syskon som sover eller vilar, och väck dem genom att sjunga Nu är det jul igen, så högt och glatt du kan!",
      "Dansa gärna lite också. Ingen kan vara sur när man blir väckt av en julsång.",
      "Busiga hälsningar från Tomtenissen"
    ]
  },
  {
    day: 20, emoji: "🎅", typ: "Lek",
    titel: "Tomten säger",
    text: [
      "Hej, lilla lekkompis!",
      "Den här leken leker vi i tomteverkstaden när vi tar paus.",
      "Dagens överraskning är leken Tomten säger! En person är tomten och säger saker som: Tomten säger, hoppa på ett ben! Då ska alla hoppa. Men om tomten bara säger: Klappa händerna, utan att säga Tomten säger först, då ska man inte göra det!",
      "Turas om att vara tomte. Vem blir lurad flest gånger?",
      "Kram från Tomtenissen"
    ]
  },
  {
    day: 21, emoji: "⭐", typ: "Mys",
    titel: "Årets bästa minne",
    text: [
      "Hej, mitt stjärnfall!",
      "Idag är årets mörkaste dag. Men från och med imorgon blir dagarna ljusare igen. Är inte det fint?",
      "Dagens överraskning: Tänd ett ljus tillsammans med en vuxen. Sätt er nära varandra och berätta för varandra om det allra bästa som hänt det här året. Alla i familjen får berätta.",
      "Det är så man fyller mörkret med ljus.",
      "Kram från Tomtenissen"
    ]
  },
  {
    day: 22, emoji: "🎄", typ: "Pyssel",
    titel: "Pynt till granen",
    text: [
      "Hej, min julpyntare!",
      "Snart är det julafton! Granen vill gärna ha lite extra fint på sig.",
      "Dagens överraskning: Gör ett eget julgranspynt. Du kan klippa en pappersstjärna, göra en girlang av pappersremsor eller rita en julkula på papp och klippa ut den. Sätt ett snöre i den och häng den i granen, eller i fönstret om ni inte har en gran än.",
      "Då har du gjort något som pryder hela julen.",
      "Kram från Tomtenissen"
    ]
  },
  {
    day: 23, emoji: "👟", typ: "Bus",
    titel: "Skorna har bytt plats",
    text: [
      "Hej, sista busfröet!",
      "Det här är årets sista tomtebus. Jag har sparat ett riktigt knasigt till sist.",
      "Gå ut i hallen och blanda allas skor! Sätt pappas sko ihop med mammas sko, och din sko ihop med en stövel. Ställ dem i ett långt, tokigt tåg.",
      "När någon ska gå ut får de leta efter rätt skor. Hjälp dem gärna om de blir alldeles förvirrade!",
      "Busiga hälsningar från Tomtenissen"
    ]
  },
  {
    day: 24, emoji: "🎁", typ: "Mys",
    titel: "God jul!",
    text: [
      "God jul, mitt allra käraste hjärta!",
      "Nu är det julafton! Tack för att du har läst alla mina brev. Du har pysslat, lekt, busat och varit så snäll. Jag är så stolt över dig.",
      "Dagens överraskning är den viktigaste av alla: Ge alla i din familj en extra stor julkram idag. Och ikväll kan du ställa fram en liten skål gröt åt mig. Då vet jag att du tänker på mig.",
      "Nu ska jag sova länge i min stuga under granen. Vi ses nästa jul!",
      "Den varmaste kramen från Tomtenissen"
    ]
  }
];
