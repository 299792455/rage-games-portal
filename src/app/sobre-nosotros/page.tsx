import type { Metadata } from "next";
import Link from "next/link";

import { Footer, Header } from "@/components/layout";
import { Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "Sobre nosotros | JuegosDificiles.com",
  description:
    "Descubre qué es JuegosDificiles.com, un proyecto independiente dedicado a reunir juegos difíciles online, rage games, juegos de habilidad y retos gratuitos para navegador.",
};

const gameTypes = [
  "juegos difíciles online",
  "juegos de habilidad",
  "rage games",
  "juegos imposibles",
  "juegos tipo devil",
  "juegos troll",
  "juegos de plataformas difíciles",
  "juegos de precisión",
  "juegos de reflejos",
  "juegos de obstáculos",
  "juegos de morir y reintentar",
  "juegos cortos pero intensos",
  "juegos simples de entender pero difíciles de dominar",
];

const identityIdeas = [
  {
    title: "Dificultad",
    text: "porque buscamos juegos que realmente supongan un reto.",
  },
  {
    title: "Reto",
    text: "porque cada partida debe tener un objetivo claro: avanzar, mejorar, superar un obstáculo o llegar más lejos.",
  },
  {
    title: "Repetición",
    text: "porque muchos de estos juegos se basan en intentar una y otra vez hasta dominar el movimiento, el salto, el recorrido o la mecánica.",
  },
];

const sections = [
  {
    title: "Nuestra idea: jugar rápido, fallar rápido, volver a intentarlo rápido",
    paragraphs: [
      "Creemos que un buen juego difícil no necesita ser complicado de entender. Muchas veces, los mejores desafíos son los más simples: saltar en el momento exacto, esquivar un obstáculo, calcular una trayectoria, memorizar una trampa, repetir un movimiento hasta dominarlo.",
      "Por eso buscamos juegos que puedan jugarse directamente desde el navegador, sin descargas, sin instalaciones y sin procesos innecesarios. La idea es entrar, elegir un juego y empezar a jugar.",
      "Nada más.",
      "En JuegosDificiles.com queremos que la experiencia sea directa. El jugador no viene a perder tiempo navegando por menús infinitos. Viene a enfrentarse a un reto. Viene a probar un nivel. Viene a comprobar si puede superar esa pantalla que parece diseñada para hacerlo fallar.",
      "Y si falla, mejor.",
      "Porque ese es precisamente el espíritu de este tipo de juegos: equivocarse, entender, ajustar y volver a intentarlo.",
    ],
  },
  {
    title: "No buscamos tener todos los juegos del mundo",
    paragraphs: [
      "Una de las ideas principales de JuegosDificiles.com es la selección.",
      "No queremos convertir la plataforma en un catálogo sin dirección. No se trata de añadir juegos por añadir. Preferimos construir poco a poco una colección más coherente, centrada en juegos que encajen con la identidad del sitio.",
      "Sabemos que existen portales enormes con miles de juegos de coches, cocina, fútbol, puzzles, maquillaje, simulación, cartas o aventuras. Eso está bien, pero no es nuestro enfoque principal.",
      "Nuestro enfoque está en los juegos que te obligan a mejorar.",
      "Los juegos que parecen fáciles al principio, pero esconden una dificultad real. Los juegos que te hacen decir “una vez más” aunque ya hayas fallado veinte veces. Los juegos que pueden ser simples visualmente, pero que exigen precisión. Los juegos que se recuerdan no solo por sus gráficos, sino por el reto que proponen.",
      "JuegosDificiles.com quiere ser una plataforma de referencia para ese tipo de experiencia.",
    ],
  },
  {
    title: "Por qué los juegos difíciles enganchan tanto",
    paragraphs: [
      "Los juegos difíciles tienen algo especial. No siempre son cómodos. No siempre son relajantes. A veces incluso parecen hechos para molestarte. Pero precisamente por eso generan una sensación distinta cuando consigues avanzar.",
      "Superar un nivel difícil produce una satisfacción que no aparece cuando todo es demasiado fácil.",
      "Cada error te enseña algo. Cada intento te acerca un poco más. Cada obstáculo superado se siente como una pequeña victoria. Y cuando un juego está bien diseñado, la frustración no destruye la experiencia: la convierte en parte del desafío.",
      "Ese equilibrio entre dificultad, repetición y recompensa es lo que hace que muchos jugadores busquen este tipo de juegos.",
      "No se trata solo de ganar. Se trata de insistir.",
    ],
  },
  {
    title: "Una plataforma para jugadores pacientes, testarudos y curiosos",
    paragraphs: [
      "JuegosDificiles.com está pensado para jugadores que disfrutan de los retos. Para quienes no cierran un juego después del primer fallo. Para quienes quieren probar sus reflejos, su paciencia o su capacidad de aprendizaje.",
      "También está pensado para quienes simplemente quieren descubrir juegos diferentes, más intensos o más exigentes que los juegos casuales habituales.",
      "Aquí no hace falta ser un jugador profesional. No hace falta dominar ningún género. No hace falta competir contra nadie. Basta con tener ganas de intentarlo.",
      "Algunos juegos podrán superarse en pocos minutos. Otros exigirán muchos intentos. Algunos parecerán injustos. Otros serán más técnicos. Algunos serán perfectos para jugar desde el móvil. Otros funcionarán mejor con teclado en escritorio.",
      "La idea es que cada jugador pueda encontrar un reto adaptado a su estilo.",
    ],
  },
  {
    title: "Juegos gratis, directamente en el navegador",
    paragraphs: [
      "La plataforma está enfocada en juegos gratuitos que puedan jugarse online, directamente desde el navegador.",
      "Cuando un juego está disponible mediante integración externa, se muestra respetando su origen y sin reclamar derechos que no nos pertenecen. Los juegos integrados pertenecen a sus respectivos creadores, estudios, editores o plataformas de distribución.",
      "JuegosDificiles.com actúa como un espacio de descubrimiento y organización. Nuestro trabajo consiste en seleccionar, clasificar y presentar juegos que encajen con la temática del sitio, facilitando que los usuarios puedan encontrarlos y jugarlos con mayor comodidad.",
      "No alojamos necesariamente todos los juegos en nuestros propios servidores. Muchos juegos pueden estar integrados mediante tecnologías externas como iframe u otros sistemas proporcionados por sus plataformas originales.",
    ],
  },
  {
    title: "Nuestra visión a futuro",
    paragraphs: [
      "JuegosDificiles.com evoluciona de forma progresiva para mejorar la selección de juegos, la navegación y la experiencia de los usuarios.",
      "Hoy, la plataforma nace con un objetivo claro: reunir juegos difíciles online, juegos de habilidad, rage games, juegos tipo devil, juegos troll y desafíos de precisión en un mismo lugar, de forma gratuita y accesible desde el navegador.",
      "Pero la idea no termina ahí.",
      "A largo plazo, queremos que JuegosDificiles.com evolucione hacia una plataforma más completa, donde los jugadores no solo puedan descubrir y jugar, sino también seguir su propia progresión.",
      "Nuestra visión es añadir progresivamente funciones como la creación de cuentas de usuario, perfiles de jugador, seguimiento de puntuaciones, historial de partidas, favoritos y sistemas de clasificación.",
      "La idea es que cada jugador pueda ver sus mejores resultados, mejorar con el tiempo y comparar su rendimiento con otros jugadores.",
      "También queremos explorar la posibilidad de crear rankings globales, clasificaciones por juego, tablas de mejores puntuaciones y desafíos competitivos entre jugadores de diferentes países.",
      "Porque los juegos difíciles no solo se disfrutan en solitario. También tienen una dimensión competitiva: superar tu propio récord, entrar en un ranking, comparar tu puntuación o demostrar que puedes llegar más lejos que otros jugadores.",
      "Nuestro objetivo a futuro es construir una experiencia donde cada intento cuente.",
      "No se trata únicamente de jugar una partida rápida. Se trata de progresar, medir tus resultados, desbloquear nuevos retos y formar parte de una comunidad de jugadores que disfrutan de la dificultad, la repetición y la superación.",
      "Estas funciones podrán incorporarse progresivamente sin perder la esencia principal del proyecto: una plataforma clara, rápida, gratuita y centrada en juegos difíciles online.",
      "Queremos que JuegosDificiles.com pueda crecer con el tiempo hasta convertirse en un espacio donde los jugadores encuentren retos, midan su evolución y compitan con otros usuarios de todo el mundo.",
    ],
  },
  {
    title: "Para quién es JuegosDificiles.com",
    paragraphs: [
      "JuegosDificiles.com es para ti si te gustan los juegos que no se superan solos.",
      "Es para ti si disfrutas de los juegos de habilidad, los niveles complicados, los desafíos de precisión y las experiencias donde cada intento cuenta.",
      "Es para ti si alguna vez has perdido muchas veces en el mismo punto y aun así has pensado: “vale, ahora sí”.",
      "Es para ti si buscas juegos gratis, rápidos de jugar, sin descarga y con una dificultad real.",
      "Y también es para ti si simplemente quieres probar algo distinto, salir de los juegos demasiado fáciles y enfrentarte a una selección pensada para poner a prueba tu paciencia.",
    ],
  },
  {
    title: "Nuestro compromiso",
    paragraphs: [
      "Queremos mantener una plataforma sencilla, clara y enfocada.",
      "Nuestro compromiso es seguir construyendo JuegosDificiles.com con una línea editorial reconocible: juegos difíciles, juegos de habilidad, rage games, devil-like, troll games y desafíos online que merezcan estar en una plataforma especializada.",
      "No prometemos que todos los juegos sean perfectos. No prometemos que todos gusten a todos. Pero sí queremos que cada juego tenga una razón para estar aquí.",
      "Si un juego exige concentración, precisión, reflejos o paciencia, tiene sentido dentro de JuegosDificiles.com.",
      "Si un juego provoca esa sensación de “solo una partida más”, también.",
      "Y si un juego consigue que falles diez veces pero sigas intentándolo, probablemente pertenece a este lugar.",
    ],
  },
  {
    title: "Un proyecto independiente en evolución",
    paragraphs: [
      "JuegosDificiles.com es un proyecto independiente creado por dos personas y desarrollado paso a paso.",
      "Estamos construyendo la plataforma con una visión clara, pero también con la intención de mejorarla con el tiempo. La selección de juegos, las categorías, las páginas, los filtros y la experiencia de navegación podrán evolucionar conforme el sitio crezca.",
      "Nuestro punto de partida es simple: ofrecer una plataforma en español dedicada a los juegos difíciles online.",
      "Nuestro objetivo es más ambicioso: convertir JuegosDificiles.com en un lugar reconocible para todos aquellos jugadores que buscan desafíos reales en el navegador.",
      "Gracias por estar aquí.",
      "Ahora elige un juego, falla, aprende y vuelve a intentarlo.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="rage-grid-bg">
        <section className="container-page grid gap-8 py-12 lg:grid-cols-[1fr_340px] lg:py-16">
          <div className="max-w-4xl space-y-6">
            <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
              Sobre nosotros
            </p>
            <div className="space-y-5">
              <h1 className="text-5xl font-black leading-[0.95] text-white md:text-6xl">
                JuegosDificiles.com: una plataforma para quienes no se rinden a
                la primera
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">
                JuegosDificiles.com nace de una idea muy simple: reunir en un
                solo lugar esos juegos que te hacen fallar, repetir, mejorar y
                volver a intentarlo una vez más.
              </p>
            </div>
          </div>

          <Card className="p-6" variant="glass">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">
              Proyecto independiente
            </p>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Una plataforma en español dedicada a juegos difíciles online, rage
              games, retos de habilidad y experiencias gratuitas para navegador.
            </p>
          </Card>
        </section>

        <section className="container-page pb-16">
          <div className="mx-auto max-w-4xl space-y-6">
            <Card className="p-6 md:p-8" variant="panel">
              <div className="space-y-5 text-base leading-8 text-slate-300">
                <p>
                  Somos dos personas detrás de este proyecto, con una misma
                  visión: crear una plataforma clara, rápida y gratuita dedicada
                  a los juegos difíciles online. No queríamos construir otro
                  portal genérico lleno de miles de juegos sin identidad.
                  Queríamos crear un espacio centrado en una experiencia
                  concreta: juegos que exigen precisión, paciencia, reflejos,
                  memoria, control y muchas ganas de superar el siguiente
                  obstáculo.
                </p>
                <p>
                  JuegosDificiles.com nace como un portal independiente centrado
                  en los juegos difíciles online, pero con una visión más
                  amplia: convertirse con el tiempo en una plataforma donde los
                  jugadores puedan crear su cuenta, seguir sus puntuaciones,
                  guardar sus juegos favoritos y competir en rankings globales
                  con otros jugadores de todo el mundo.
                </p>
                <p>
                  En internet existen muchos juegos gratuitos, pero los juegos
                  realmente difíciles suelen estar repartidos por diferentes
                  páginas, categorías poco claras o plataformas donde cuesta
                  encontrar exactamente lo que buscas. Juegos de habilidad
                  extrema, rage games, juegos troll, desafíos tipo devil, juegos
                  imposibles, plataformas de precisión, niveles llenos de
                  trampas y experiencias de “muere y vuelve a intentarlo”.
                </p>
                <p>JuegosDificiles.com existe para ordenar todo ese universo.</p>
                <p>
                  Nuestro objetivo no es prometer que cada juego será imposible,
                  ni decir que todos tendrán la misma dificultad. Nuestro
                  objetivo es reunir juegos que compartan una misma esencia:
                  poner a prueba al jugador.
                </p>
              </div>
            </Card>

            {sections.slice(0, 1).map((section) => (
              <Card className="p-6 md:p-8" key={section.title} variant="panel">
                <ArticleSection section={section} />
              </Card>
            ))}

            <Card className="p-6 md:p-8" variant="glass">
              <div className="space-y-5">
                <h2 className="text-3xl font-black text-white">
                  Qué tipo de juegos buscamos
                </h2>
                <div className="space-y-5 text-base leading-8 text-slate-300">
                  <p>
                    La plataforma está pensada para reunir distintos tipos de
                    juegos difíciles, no una sola categoría cerrada. Nos
                    interesan todos aquellos juegos que provocan esa mezcla de
                    frustración, concentración y satisfacción cuando por fin
                    consigues avanzar.
                  </p>
                  <p>Entre los estilos que queremos destacar están:</p>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {gameTypes.map((gameType) => (
                    <li
                      className="rounded-[var(--radius-md)] border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-300"
                      key={gameType}
                    >
                      {gameType}
                    </li>
                  ))}
                </ul>
                <div className="space-y-5 text-base leading-8 text-slate-300">
                  <p>
                    No todos los juegos tienen que ser injustos. No todos tienen
                    que provocar rage quit. Algunos simplemente requieren
                    concentración. Otros son crueles desde el primer segundo.
                    Algunos se basan en trampas ocultas. Otros dependen de
                    reflejos, timing o paciencia.
                  </p>
                  <p>Lo que nos interesa es que cada juego tenga un reto real.</p>
                </div>
              </div>
            </Card>

            {sections.slice(1, 6).map((section) => (
              <Card className="p-6 md:p-8" key={section.title} variant="panel">
                <ArticleSection section={section} />
              </Card>
            ))}

            <Card className="p-6 md:p-8" variant="glass">
              <div className="space-y-6">
                <h2 className="text-3xl font-black text-white">
                  Una identidad clara: dificultad, reto y repetición
                </h2>
                <p className="text-base leading-8 text-slate-300">
                  La identidad de JuegosDificiles.com se resume en tres ideas:
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  {identityIdeas.map((idea) => (
                    <div
                      className="rounded-[var(--radius-md)] border border-white/10 bg-white/5 p-5"
                      key={idea.title}
                    >
                      <h3 className="text-xl font-black text-white">
                        {idea.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-slate-400">
                        {idea.text}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="space-y-5 text-base leading-8 text-slate-300">
                  <p>
                    No queremos vender una experiencia falsa. Si un juego es
                    difícil, lo diremos. Si es frustrante, también. Si requiere
                    paciencia, mejor saberlo antes de empezar.
                  </p>
                  <p>
                    La dificultad no es un defecto dentro de esta plataforma. Es
                    parte de la propuesta.
                  </p>
                </div>
              </div>
            </Card>

            {sections.slice(6).map((section) => (
              <Card className="p-6 md:p-8" key={section.title} variant="panel">
                <ArticleSection section={section} />
              </Card>
            ))}

            <Card className="p-6 text-center md:p-8" variant="glass">
              <div className="mx-auto max-w-2xl space-y-5">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                  ¿Listo para intentarlo?
                </p>
                <h2 className="text-3xl font-black text-white">
                  Elige un juego, falla, aprende y vuelve a intentarlo
                </h2>
                <Link
                  className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-md)] border border-cyan-300/40 bg-cyan-300 px-5 text-sm font-black text-slate-950 shadow-[var(--glow-cyan)] transition hover:bg-cyan-200 focus-ring"
                  href="/juegos"
                >
                  Explorar juegos difíciles
                </Link>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function ArticleSection({
  section,
}: {
  section: {
    title: string;
    paragraphs: string[];
  };
}) {
  return (
    <section className="space-y-5">
      <h2 className="text-3xl font-black text-white">{section.title}</h2>
      <div className="space-y-5 text-base leading-8 text-slate-300">
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
