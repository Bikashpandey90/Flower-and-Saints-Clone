import { MotionValue, useScroll, motion, useTransform } from "framer-motion";
import { useRef } from "react";
import { IconType } from "react-icons";
import {
  FiArrowRight,
  FiAward,
  FiCalendar,
  FiCopy,
  FiDatabase,
} from "react-icons/fi";

export const StickyCards = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <>
      <div ref={ref} className="relative">
        {CARDS.map((c, idx) => (
          <Card
            key={c.id}
            card={c}
            scrollYProgress={scrollYProgress}
            position={idx + 1}
          />
        ))}
      </div>
      <div className="h-screen bg-black" />
    </>
  );
};

interface CardProps {
  position: number;
  card: CardType;
  scrollYProgress: MotionValue;
}

const Card = ({ position, card, scrollYProgress }: CardProps) => {
  const scaleFromPct = (position - 1) / CARDS.length;
  const y = useTransform(scrollYProgress, [scaleFromPct, 1], [0, -CARD_HEIGHT]);

  const isOddCard = position % 2;

  return (<>
    <motion.div
      style={{
        height: CARD_HEIGHT,
        y: position === CARDS.length ? undefined : y,
        background: isOddCard ? "black" : "white",
        color: isOddCard ? "white" : "black",
      }}
      className="sticky top-0 flex w-full h-full origin-top flex-col items-center justify-center "
    >
      {/* <card.Icon className="mb-4 text-4xl" /> */}
      {
        card?.image ? <img src={card?.image} alt={card.title} className=" w-full h-full object-cover" /> : null
      }

    </motion.div>
    <motion.div
      style={{
        height: CARD_HEIGHT,
        y: position === CARDS.length ? undefined : y,
        background: isOddCard ? "white" : "black",
        color: isOddCard ? "black" : "white",
      }}
      className="sticky top-0 flex w-full h-full origin-top flex-col items-center justify-center "
    >
      {/* <card.Icon className="mb-4 text-4xl" /> */}
      {/* {
        card?.image ? <img src={card?.image} alt={card.title} className="mb-4 h-32 w-32 object-cover" /> : null
      } */}
      <h3 className=" text-center text-4xl font-semibold md:text-6xl">
        {card.title}
      </h3>
      <p className="mb-8 max-w-lg text-center text-sm md:text-base">
        {card.description}
      </p>
      <a
        href={card.routeTo}
        className={`flex items-center gap-2 rounded px-6 py-4 text-base font-medium uppercase text-white transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 md:text-lg ${card.ctaClasses
          } ${isOddCard
            ? "shadow-[4px_4px_0px_white] hover:shadow-[8px_8px_0px_white]"
            : "shadow-[4px_4px_0px_black] hover:shadow-[8px_8px_0px_black]"
          }`}
      >
        <span>{card?.button || "Learn  more"}</span>
        {/* <FiArrowRight /> */}
      </a>
    </motion.div>

  </>
  );
};

const CARD_HEIGHT = 500;

type CardType = {
  id: number;
  Icon: IconType;
  title: string;
  description: string;
  ctaClasses: string;
  routeTo: string;
  image?: string;
  button?: string
};

const CARDS: CardType[] = [
  {
    id: 1,
    Icon: FiCalendar,
    title: "PIXEL 10 SERIES",
    description: "Skins,cases and glass: available now.",
    ctaClasses: "bg-black",
    routeTo: "#",
    image: "/public/images/pixel-10.jpg",
    button: "Take a look"


  },
  {
    id: 2,
    Icon: FiDatabase,
    title: "WHITE DAMASCUS",
    description: "An RGB  twist on an all-time classic",
    ctaClasses: "bg-white",
    routeTo: "#",
    image: "/public/images/white-damascus.jpg",
    button: 'take the rainbow'


  },
  {
    id: 3,
    Icon: FiCopy,
    title: "SWITCH 2 KIllSWITCH",
    description:
      "Now featuring all-new Joy-Lock Grips.",
    ctaClasses: "bg-red-300",
    routeTo: "#",
    image: "/public/images/switch-2.jpg",
    button: "secure yours"


  },
  {
    id: 4,
    Icon: FiAward,
    title: "Tank Case",
    description:
      "Launching September, exclusively for the iphone 17 series.",
    ctaClasses: "bg-amber-300",
    routeTo: "#",
    image: "/public/images/tank-case.jpg",
    button: 'get notified'


  },
  {
    id: 1,
    Icon: FiCalendar,
    title: "Prism 2.0",
    description:
      "The Idiot-proof Screen Protector.",
    ctaClasses: "bg-violet-300",
    routeTo: "#",
    image: "/public/images/prism.jpg",
    button: "shop now"


  },
  {
    id: 2,
    Icon: FiDatabase,
    title: "Ghost 2.0",

    description:
      "The next gen clear case",
    ctaClasses: "bg-black",
    routeTo: "#",
    image: "/public/images/iphone16-case.jpg",
    button: 'Buy now'

  },
  {
    id: 3,
    Icon: FiCopy,
    title: "Project Killswitch",

    description:
      "The ultimate handheld gaming case.",
    ctaClasses: "bg-white",
    routeTo: "#",
    image: "/public/images/killswitch.jpg",
    button: "get yours"

  },
  {
    id: 4,
    Icon: FiAward,
    title: "Galaxy S25 Series",
    description:
      "MagSafe included. Checkmate, Tim.",
    ctaClasses: "bg-amber-300",
    routeTo: "#",
    image: "/public/images/galaxy-25.jpg",
    button: "Get yours"


  },
  {
    id: 5,
    Icon: FiAward,
    title: "Circuit board",
    ctaClasses: "bg-amber-300",
    routeTo: "#",
    description: "Yes - it glows in the dark",
    image: "/public/images/circuit-board.jpg",
    button: "Glow now"


  },
];