import { DialogueCard } from '../types';

export const RAW_ANKI_DATA = `"Timmi: Ich werd verrückt! Da scheint es ja noch jemandem nicht gut zu gehen. Was ist denn heute los?";"Ach. Das verstehst du sowieso nicht..."
"Timmi: Das stimmt. Wenn du weiter in Rätseln sprichst, versteh ich nur Bahnhof.";"Sehr lustig! Meine Mutter hat mich zum „Spielen“ rausgeschickt. Sie findet es doof, wenn ich den ganzen Tag nur in meinem Zimmer sitze."
"Timmi: Hm... Kann ich irgendwie verstehen. Also ich wüsste gar nicht, was ich den ganzen Tag in meinem Zimmer machen soll. Mir wär total langweilig!";"Aber mir eben nicht! Ich sitze viel am Schreibtisch."
"Timmi: Ach du liebe Güte! Bist du so eine Streberin?";"Nein! Ich mach doch nichts für die Schule! Ich schreibe."
"Timmi: Du schreibst? Was denn?";"(zögernd) Gedichte. Ich schreibe Gedichte."
"Timmi: Echt? Das ist ja cool! Ich hab noch niemals einen Dichter getroffen. WOW!";"Tja. Das findet meine Mutter eben nicht. Die findet das nicht „cool“. Die möchte, dass ich „ganz normal“ mit anderen draußen bin, mich mit Freunden treffe, was unternehme... Aber mir sind meine Wörter echt superwichtig!"
"Timmi: ...Wenn's drauf ankommt, wirbeln alle Wörter in meinem Kopf einfach total durcheinander. Und dann kommt nur noch Chaos raus.";"(lacht) Dann passen wir ja gut zusammen! Du hast ein Wörterchaos im Kopf und ich ordne immer alle Wörter in Gedichte. Pass auf, vielleicht können wir uns ja gegenseitig helfen? Jetzt muss ich noch was einkaufen. Aber nachher hab ich Zeit. Kommst du zu mir?"
"Timmi: ...Komm doch auch da hin. Ich würd mich freuen!";"Gerne. Das ist das gelbe Haus neben der alten Fabrik, oder?"
"Timmi: Genau. Ich bin ab vier da.";"Perfekt. Ich komme."
"Timmi: (schnauft) Boa, Mann! Bibi! Du weißt doch, dass ich nicht so schnell bin.";"Rück mal ein Stück! Ich les vor. Hier steht: „Das Jugendheim ist ab sofort geschlossen. Der Verkauf der Einrichtungsgegenstände ist für den kommenden Sonntagnachmittag anberaumt – der Ortsvorstand“"
"Timmi: Ja, ja: Bibi. Und Matze. Und das hier ist Ella. Ganz frisch hierhergezogen. Und sie hat ein besonderes Hobby.";"das im Moment aber ganz egal ist."
"Herr Neumann: ...Die Verwaltung braucht Geld. Sie kann nicht immer nur welches ausgeben! Für Häuser wie dieses hier: alt, unrentabel. Es wirft keinen Gewinn ab. Es kostet nur.";"Aber sind denn Kinder hier nicht wichtig? Wir haben doch auch Rechte!"
"Shari: (kommt dazu) Hey, was ist denn hier los? Wieso geht ihr nicht rein?";"Na, kuck doch. Das Jugendheim ist geschlossen."
"Matze: Das sieht Herr Neumann aber ganz anders. Ich glaub, für den ist die Sache erledigt.";"Für den zählt nur das Geld. Kinder bringen eben keine Kohle. Ein Haus für Kinder ist was hat er noch mal gesagt?"
"Alle: Tschüss, bis nachher...";"Hm. Zwei Stunden sind nicht viel. Aber genug, um tolle Ideen zu spinnen. Was meint Ihr?"
"Matze: Ja, Ella, was kannst du? Dazu sind wir vorhin gar nicht mehr gekommen – zu deinem besonderen Hobby.";"Ich schreibe. Gedichte."
"Bibiana: Wow!";"Ich finde auch cool, was ihr könnt! Und ich finde, Timmi hat recht. Das passt. Zusammen müssten wir damit etwas auf die Beine stellen können. Eine Band!"
"Matze: Jaaaa! Proteeest!!! GEGEN AUTOS! GEGEN TANKEN! GEGEN WASCHEN!";"Nee, nee! Ich denke da an was anderes. Wir sollten nicht gegen etwas Musik machen, sondern für etwas. Für unser Haus. Für uns Kinder. Für unsere Rechte!"
"Timmi: Ich? Ääähhh... Ich halte euch die Noten. Oder so. Wirklich! Ich kann mir nichts merken. Da dreht sich alles in meinem Kopf.";"Wetten, dass nicht? Wie wär's hiermit: Für dich, für mich, für alle überall: Kinder haben Rechte auf dem ganzen Erdenball!"
"Bibiana: Wir noch nicht. Aber du schon! Sag mal, Ella, kannst du noch mehr Text dazu schreiben? Strophen oder wie das heißt?";"Klar. Aber jetzt fehlt uns noch etwas ganz Wichtiges:"
"Matze: Was denn?";"Na, Leute! Leute, die uns hören! Leute, die das auch wichtig finden! Leute, die uns helfen!"
"Bibiana: Und von hier aus können wir das ja mit dem Weltretten versuchen... Oder wir fragen die Sternsinger. Die kennen sich da aus.";"So weit sind wir noch nicht. Los jetzt! Trommelt so viele wie möglich zusammen! Matze, bring auch deine Handballfreunde mit! Ich bleib hier und schreibe weiter an dem Text."
"Matze: ...Ist alles fertig, Ella?";"Logisch! Hier sind die Texte. Matze, kannst du dir dazu eine einfache Musik ausdenken?"
"Bibiana: Und wenn wir zusammenhalten wie die Bremer Stadtmusikanten,";"dann schaffen wir das, dann kann uns keiner was!"`;

export const DIALOGUE_CARDS: DialogueCard[] = [
  {
    id: 1,
    cueSpeaker: "Timmi",
    cueText: "Ich werd verrückt! Da scheint es ja noch jemandem nicht gut zu gehen. Was ist denn heute los?",
    cueRaw: "Timmi: Ich werd verrückt! Da scheint es ja noch jemandem nicht gut zu gehen. Was ist denn heute los?",
    ellaText: "Ach. Das verstehst du sowieso nicht...",
    ellaRaw: "Ach. Das verstehst du sowieso nicht...",
    sceneName: "Szene 1: Erste Begegnung mit Timmi",
    sceneNumber: 1
  },
  {
    id: 2,
    cueSpeaker: "Timmi",
    cueText: "Das stimmt. Wenn du weiter in Rätseln sprichst, versteh ich nur Bahnhof.",
    cueRaw: "Timmi: Das stimmt. Wenn du weiter in Rätseln sprichst, versteh ich nur Bahnhof.",
    ellaText: "Sehr lustig! Meine Mutter hat mich zum „Spielen“ rausgeschickt. Sie findet es doof, wenn ich den ganzen Tag nur in meinem Zimmer sitze.",
    ellaRaw: "Sehr lustig! Meine Mutter hat mich zum „Spielen“ rausgeschickt. Sie findet es doof, wenn ich den ganzen Tag nur in meinem Zimmer sitze.",
    sceneName: "Szene 1: Erste Begegnung mit Timmi",
    sceneNumber: 1
  },
  {
    id: 3,
    cueSpeaker: "Timmi",
    cueText: "Hm... Kann ich irgendwie verstehen. Also ich wüsste gar nicht, was ich den ganzen Tag in meinem Zimmer machen soll. Mir wär total langweilig!",
    cueRaw: "Timmi: Hm... Kann ich irgendwie verstehen. Also ich wüsste gar nicht, was ich den ganzen Tag in meinem Zimmer machen soll. Mir wär total langweilig!",
    ellaText: "Aber mir eben nicht! Ich sitze viel am Schreibtisch.",
    ellaRaw: "Aber mir eben nicht! Ich sitze viel am Schreibtisch.",
    sceneName: "Szene 1: Erste Begegnung mit Timmi",
    sceneNumber: 1
  },
  {
    id: 4,
    cueSpeaker: "Timmi",
    cueText: "Ach du liebe Güte! Bist du so eine Streberin?",
    cueRaw: "Timmi: Ach du liebe Güte! Bist du so eine Streberin?",
    ellaText: "Nein! Ich mach doch nichts für die Schule! Ich schreibe.",
    ellaRaw: "Nein! Ich mach doch nichts für die Schule! Ich schreibe.",
    sceneName: "Szene 1: Erste Begegnung mit Timmi",
    sceneNumber: 1
  },
  {
    id: 5,
    cueSpeaker: "Timmi",
    cueText: "Du schreibst? Was denn?",
    cueRaw: "Timmi: Du schreibst? Was denn?",
    ellaStageDirection: "(zögernd)",
    ellaText: "Gedichte. Ich schreibe Gedichte.",
    ellaRaw: "(zögernd) Gedichte. Ich schreibe Gedichte.",
    sceneName: "Szene 1: Erste Begegnung mit Timmi",
    sceneNumber: 1
  },
  {
    id: 6,
    cueSpeaker: "Timmi",
    cueText: "Echt? Das ist ja cool! Ich hab noch niemals einen Dichter getroffen. WOW!",
    cueRaw: "Timmi: Echt? Das ist ja cool! Ich hab noch niemals einen Dichter getroffen. WOW!",
    ellaText: "Tja. Das findet meine Mutter eben nicht. Die findet das nicht „cool“. Die möchte, dass ich „ganz normal“ mit anderen draußen bin, mich mit Freunden treffe, was unternehme... Aber mir sind meine Wörter echt superwichtig!",
    ellaRaw: "Tja. Das findet meine Mutter eben nicht. Die findet das nicht „cool“. Die möchte, dass ich „ganz normal“ mit anderen draußen bin, mich mit Freunden treffe, was unternehme... Aber mir sind meine Wörter echt superwichtig!",
    sceneName: "Szene 1: Erste Begegnung mit Timmi",
    sceneNumber: 1
  },
  {
    id: 7,
    cueSpeaker: "Timmi",
    cueText: "...Wenn's drauf ankommt, wirbeln alle Wörter in meinem Kopf einfach total durcheinander. Und dann kommt nur noch Chaos raus.",
    cueRaw: "Timmi: ...Wenn's drauf ankommt, wirbeln alle Wörter in meinem Kopf einfach total durcheinander. Und dann kommt nur noch Chaos raus.",
    ellaStageDirection: "(lacht)",
    ellaText: "Dann passen wir ja gut zusammen! Du hast ein Wörterchaos im Kopf und ich ordne immer alle Wörter in Gedichte. Pass auf, vielleicht können wir uns ja gegenseitig helfen? Jetzt muss ich noch was einkaufen. Aber nachher hab ich Zeit. Kommst du zu mir?",
    ellaRaw: "(lacht) Dann passen wir ja gut zusammen! Du hast ein Wörterchaos im Kopf und ich ordne immer alle Wörter in Gedichte. Pass auf, vielleicht können wir uns ja gegenseitig helfen? Jetzt muss ich noch was einkaufen. Aber nachher hab ich Zeit. Kommst du zu mir?",
    sceneName: "Szene 1: Erste Begegnung mit Timmi",
    sceneNumber: 1
  },
  {
    id: 8,
    cueSpeaker: "Timmi",
    cueText: "...Komm doch auch da hin. Ich würd mich freuen!",
    cueRaw: "Timmi: ...Komm doch auch da hin. Ich würd mich freuen!",
    ellaText: "Gerne. Das ist das gelbe Haus neben der alten Fabrik, oder?",
    ellaRaw: "Gerne. Das ist das gelbe Haus neben der alten Fabrik, oder?",
    sceneName: "Szene 1: Erste Begegnung mit Timmi",
    sceneNumber: 1
  },
  {
    id: 9,
    cueSpeaker: "Timmi",
    cueText: "Genau. Ich bin ab vier da.",
    cueRaw: "Timmi: Genau. Ich bin ab vier da.",
    ellaText: "Perfekt. Ich komme.",
    ellaRaw: "Perfekt. Ich komme.",
    sceneName: "Szene 1: Erste Begegnung mit Timmi",
    sceneNumber: 1
  },
  {
    id: 10,
    cueSpeaker: "Timmi",
    cueStageDirection: "(schnauft)",
    cueText: "Boa, Mann! Bibi! Du weißt doch, dass ich nicht so schnell bin.",
    cueRaw: "Timmi: (schnauft) Boa, Mann! Bibi! Du weißt doch, dass ich nicht so schnell bin.",
    ellaText: "Rück mal ein Stück! Ich les vor. Hier steht: „Das Jugendheim ist ab sofort geschlossen. Der Verkauf der Einrichtungsgegenstände ist für den kommenden Sonntagnachmittag anberaumt – der Ortsvorstand“",
    ellaRaw: "Rück mal ein Stück! Ich les vor. Hier steht: „Das Jugendheim ist ab sofort geschlossen. Der Verkauf der Einrichtungsgegenstände ist für den kommenden Sonntagnachmittag anberaumt – der Ortsvorstand“",
    sceneName: "Szene 2: Vor dem geschlossenen Jugendheim",
    sceneNumber: 2
  },
  {
    id: 11,
    cueSpeaker: "Timmi",
    cueText: "Ja, ja: Bibi. Und Matze. Und das hier ist Ella. Ganz frisch hierhergezogen. Und sie hat ein besonderes Hobby.",
    cueRaw: "Timmi: Ja, ja: Bibi. Und Matze. Und das hier ist Ella. Ganz frisch hierhergezogen. Und sie hat ein besonderes Hobby.",
    ellaText: "das im Moment aber ganz egal ist.",
    ellaRaw: "das im Moment aber ganz egal ist.",
    sceneName: "Szene 2: Vor dem geschlossenen Jugendheim",
    sceneNumber: 2
  },
  {
    id: 12,
    cueSpeaker: "Herr Neumann",
    cueText: "...Die Verwaltung braucht Geld. Sie kann nicht immer nur welches ausgeben! Für Häuser wie dieses hier: alt, unrentabel. Es wirft keinen Gewinn ab. Es kostet nur.",
    cueRaw: "Herr Neumann: ...Die Verwaltung braucht Geld. Sie kann nicht immer nur welches ausgeben! Für Häuser wie dieses hier: alt, unrentabel. Es wirft keinen Gewinn ab. Es kostet nur.",
    ellaText: "Aber sind denn Kinder hier nicht wichtig? Wir haben doch auch Rechte!",
    ellaRaw: "Aber sind denn Kinder hier nicht wichtig? Wir haben doch auch Rechte!",
    sceneName: "Szene 2: Vor dem geschlossenen Jugendheim",
    sceneNumber: 2
  },
  {
    id: 13,
    cueSpeaker: "Shari",
    cueStageDirection: "(kommt dazu)",
    cueText: "Hey, was ist denn hier los? Wieso geht ihr nicht rein?",
    cueRaw: "Shari: (kommt dazu) Hey, was ist denn hier los? Wieso geht ihr nicht rein?",
    ellaText: "Na, kuck doch. Das Jugendheim ist geschlossen.",
    ellaRaw: "Na, kuck doch. Das Jugendheim ist geschlossen.",
    sceneName: "Szene 2: Vor dem geschlossenen Jugendheim",
    sceneNumber: 2
  },
  {
    id: 14,
    cueSpeaker: "Matze",
    cueText: "Das sieht Herr Neumann aber ganz anders. Ich glaub, für den ist die Sache erledigt.",
    cueRaw: "Matze: Das sieht Herr Neumann aber ganz anders. Ich glaub, für den ist die Sache erledigt.",
    ellaText: "Für den zählt nur das Geld. Kinder bringen eben keine Kohle. Ein Haus für Kinder ist was hat er noch mal gesagt?",
    ellaRaw: "Für den zählt nur das Geld. Kinder bringen eben keine Kohle. Ein Haus für Kinder ist was hat er noch mal gesagt?",
    sceneName: "Szene 2: Vor dem geschlossenen Jugendheim",
    sceneNumber: 2
  },
  {
    id: 15,
    cueSpeaker: "Alle",
    cueText: "Tschüss, bis nachher...",
    cueRaw: "Alle: Tschüss, bis nachher...",
    ellaText: "Hm. Zwei Stunden sind nicht viel. Aber genug, um tolle Ideen zu spinnen. Was meint Ihr?",
    ellaRaw: "Hm. Zwei Stunden sind nicht viel. Aber genug, um tolle Ideen zu spinnen. Was meint Ihr?",
    sceneName: "Szene 3: Ideen spinnen & Eine Band gründen",
    sceneNumber: 3
  },
  {
    id: 16,
    cueSpeaker: "Matze",
    cueText: "Ja, Ella, was kannst du? Dazu sind wir vorhin gar nicht mehr gekommen – zu deinem besonderen Hobby.",
    cueRaw: "Matze: Ja, Ella, was kannst du? Dazu sind wir vorhin gar nicht mehr gekommen – zu deinem besonderen Hobby.",
    ellaText: "Ich schreibe. Gedichte.",
    ellaRaw: "Ich schreibe. Gedichte.",
    sceneName: "Szene 3: Ideen spinnen & Eine Band gründen",
    sceneNumber: 3
  },
  {
    id: 17,
    cueSpeaker: "Bibiana",
    cueText: "Wow!",
    cueRaw: "Bibiana: Wow!",
    ellaText: "Ich finde auch cool, was ihr könnt! Und ich finde, Timmi hat recht. Das passt. Zusammen müssten wir damit etwas auf die Beine stellen können. Eine Band!",
    ellaRaw: "Ich finde auch cool, was ihr könnt! Und ich finde, Timmi hat recht. Das passt. Zusammen müssten wir damit etwas auf die Beine stellen können. Eine Band!",
    sceneName: "Szene 3: Ideen spinnen & Eine Band gründen",
    sceneNumber: 3
  },
  {
    id: 18,
    cueSpeaker: "Matze",
    cueText: "Jaaaa! Proteeest!!! GEGEN AUTOS! GEGEN TANKEN! GEGEN WASCHEN!",
    cueRaw: "Matze: Jaaaa! Proteeest!!! GEGEN AUTOS! GEGEN TANKEN! GEGEN WASCHEN!",
    ellaText: "Nee, nee! Ich denke da an was anderes. Wir sollten nicht gegen etwas Musik machen, sondern für etwas. Für unser Haus. Für uns Kinder. Für unsere Rechte!",
    ellaRaw: "Nee, nee! Ich denke da an was anderes. Wir sollten nicht gegen etwas Musik machen, sondern für etwas. Für unser Haus. Für uns Kinder. Für unsere Rechte!",
    sceneName: "Szene 3: Ideen spinnen & Eine Band gründen",
    sceneNumber: 3
  },
  {
    id: 19,
    cueSpeaker: "Timmi",
    cueText: "Ich? Ääähhh... Ich halte euch die Noten. Oder so. Wirklich! Ich kann mir nichts merken. Da dreht sich alles in meinem Kopf.",
    cueRaw: "Timmi: Ich? Ääähhh... Ich halte euch die Noten. Oder so. Wirklich! Ich kann mir nichts merken. Da dreht sich alles in meinem Kopf.",
    ellaText: "Wetten, dass nicht? Wie wär's hiermit: Für dich, für mich, für alle überall: Kinder haben Rechte auf dem ganzen Erdenball!",
    ellaRaw: "Wetten, dass nicht? Wie wär's hiermit: Für dich, für mich, für alle überall: Kinder haben Rechte auf dem ganzen Erdenball!",
    sceneName: "Szene 3: Ideen spinnen & Eine Band gründen",
    sceneNumber: 3
  },
  {
    id: 20,
    cueSpeaker: "Bibiana",
    cueText: "Wir noch nicht. Aber du schon! Sag mal, Ella, kannst du noch mehr Text dazu schreiben? Strophen oder wie das heißt?",
    cueRaw: "Bibiana: Wir noch nicht. Aber du schon! Sag mal, Ella, kannst du noch mehr Text dazu schreiben? Strophen oder wie das heißt?",
    ellaText: "Klar. Aber jetzt fehlt uns noch etwas ganz Wichtiges:",
    ellaRaw: "Klar. Aber jetzt fehlt uns noch etwas ganz Wichtiges:",
    sceneName: "Szene 4: Der Song & Die Mobilmachung",
    sceneNumber: 4
  },
  {
    id: 21,
    cueSpeaker: "Matze",
    cueText: "Was denn?",
    cueRaw: "Matze: Was denn?",
    ellaText: "Na, Leute! Leute, die uns hören! Leute, die das auch wichtig finden! Leute, die uns helfen!",
    ellaRaw: "Na, Leute! Leute, die uns hören! Leute, die das auch wichtig finden! Leute, die uns helfen!",
    sceneName: "Szene 4: Der Song & Die Mobilmachung",
    sceneNumber: 4
  },
  {
    id: 22,
    cueSpeaker: "Bibiana",
    cueText: "Und von hier aus können wir das ja mit dem Weltretten versuchen... Oder wir fragen die Sternsinger. Die kennen sich da aus.",
    cueRaw: "Bibiana: Und von hier aus können wir das ja mit dem Weltretten versuchen... Oder wir fragen die Sternsinger. Die kennen sich da aus.",
    ellaText: "So weit sind wir noch nicht. Los jetzt! Trommelt so viele wie möglich zusammen! Matze, bring auch deine Handballfreunde mit! Ich bleib hier und schreibe weiter an dem Text.",
    ellaRaw: "So weit sind wir noch nicht. Los jetzt! Trommelt so viele wie möglich zusammen! Matze, bring auch deine Handballfreunde mit! Ich bleib hier und schreibe weiter an dem Text.",
    sceneName: "Szene 4: Der Song & Die Mobilmachung",
    sceneNumber: 4
  },
  {
    id: 23,
    cueSpeaker: "Matze",
    cueText: "...Ist alles fertig, Ella?",
    cueRaw: "Matze: ...Ist alles fertig, Ella?",
    ellaText: "Logisch! Hier sind die Texte. Matze, kannst du dir dazu eine einfache Musik ausdenken?",
    ellaRaw: "Logisch! Hier sind die Texte. Matze, kannst du dir dazu eine einfache Musik ausdenken?",
    sceneName: "Szene 4: Der Song & Die Mobilmachung",
    sceneNumber: 4
  },
  {
    id: 24,
    cueSpeaker: "Bibiana",
    cueText: "Und wenn wir zusammenhalten wie die Bremer Stadtmusikanten,",
    cueRaw: "Bibiana: Und wenn wir zusammenhalten wie die Bremer Stadtmusikanten,",
    ellaText: "dann schaffen wir das, dann kann uns keiner was!",
    ellaRaw: "dann schaffen wir das, dann kann uns keiner was!",
    sceneName: "Szene 4: Der Song & Die Mobilmachung",
    sceneNumber: 4
  }
];

export const SCENE_NAMES = [
  "Alle Szenen",
  "Szene 1: Erste Begegnung mit Timmi (1-9)",
  "Szene 2: Vor dem geschlossenen Jugendheim (10-14)",
  "Szene 3: Ideen spinnen & Eine Band gründen (15-19)",
  "Szene 4: Der Song & Die Mobilmachung (20-24)"
];
