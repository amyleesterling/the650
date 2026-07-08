import type { Action } from "./types";

/*
 * The actions collection — the heroes of View A.
 *
 * Each action names its prime movers (bright, countable, labeled on the figure)
 * and gives a stabilizer estimate as a RANGE (the dim shimmer), with a
 * transparency note explaining why an exact count is impossible. Factoids like
 * "200 muscles to take a step" and "30 muscles per swallow" are labeled as
 * popular estimates — never presented as measurements.
 */

export const actions: Action[] = [
  {
    id: "standing",
    label: "Standing still",
    short: "Standing",
    everydayFraming:
      '"Standing still" is a controlled, continuous fall you are constantly catching.',
    primeMovers: [
      "soleus",
      "gastrocnemius",
      "tibialis_anterior",
      "quadriceps",
      "hamstrings",
      "gluteus_medius",
      "erector_spinae",
      "multifidus",
      "transverse_abdominis",
    ],
    stabilizerEstimate: [40, 100],
    countNote:
      "Postural sway recruits a shifting, unquantifiable set of stabilizers moment to moment — there is no fixed count.",
    hiddenLoad:
      'The soleus — the "second heart" — runs almost constantly to keep you upright and helps push venous blood back toward the heart. You are never truly motionless.',
    hiddenLoadSource: "lymph-pumps",
  },
  {
    id: "sitting",
    label: "Sitting",
    short: "Sitting",
    everydayFraming:
      "The story of sitting is what goes quiet — and stays quiet too long.",
    primeMovers: ["erector_spinae", "iliopsoas"],
    stabilizerEstimate: [5, 20],
    countNote:
      "Sitting is defined by muscular under-use. Hip flexors shorten; glutes and deep core go silent — the classic setup for lower-crossed imbalance.",
    hiddenLoad:
      'Prolonged sitting lets hip flexors adaptively shorten and glutes "switch off," which can tug the pelvis into a forward tilt and load the low back. The fix isn\'t a chair — it\'s movement.',
    hiddenLoadSource: "sit-to-stand-imbalance",
  },
  {
    id: "walking",
    label: "Walking",
    short: "Walking",
    everydayFraming:
      "A single step is a full-body event — legs propel, arms swing, core stabilizes, feet make hundreds of micro-adjustments.",
    primeMovers: [
      "quadriceps",
      "hamstrings",
      "gastrocnemius",
      "soleus",
      "tibialis_anterior",
      "gluteus_maximus",
      "gluteus_medius",
      "gluteus_minimus",
      "hip_adductors",
      "iliopsoas",
      "erector_spinae",
      "abdominals",
      "deltoids",
      "foot",
    ],
    stabilizerEstimate: [100, 200],
    countNote:
      '"200 muscles to take a step" is widely repeated but traces to popular science, not a rigorous dissection count. The named prime movers above are the defensible core.',
    hiddenLoad:
      "Walking is a whole-body act — even your abdominals and arm muscles contribute to the momentum and stability of each step.",
    hiddenLoadSource: "walk-200",
  },
  {
    id: "phone",
    label: "Holding your phone",
    short: "Phone",
    everydayFraming:
      "The most common posture of modern life quietly multiplies the weight your neck carries.",
    primeMovers: [
      "sternocleidomastoid",
      "scalenes",
      "upper_trapezius",
      "levator_scapulae",
      "suboccipitals",
      "cervical_erector_spinae",
      "forearm_flexors",
      "thenar",
      "interossei",
      "shoulder_stabilizers",
    ],
    stabilizerEstimate: [15, 40],
    countNote:
      "Grip, thumb and shoulder-girdle stabilizers vary with how you hold the device.",
    hiddenLoad:
      "Your head weighs about 10–12 lb in neutral. Tilt it forward and the load climbs fast — a slight glance down makes your neck carry the equivalent of ~27 lb; at about 45° it can reach ~50 lb.",
    hiddenLoadSource: "tech-neck-load",
  },
  {
    id: "typing",
    label: "Typing",
    short: "Typing",
    everydayFraming:
      "Tiny hand muscles sprint while big posture muscles hold a long, static plank you never notice.",
    primeMovers: [
      "forearm_flexors",
      "forearm_extensors",
      "lumbricals",
      "interossei",
      "thenar",
      "hypothenar",
      "upper_trapezius",
      "levator_scapulae",
      "deltoids",
      "erector_spinae",
    ],
    stabilizerEstimate: [20, 40],
    countNote:
      "Fine-motor hand muscles are numerous and hard to enumerate per keystroke.",
    hiddenLoad:
      "The fatigue of desk work is mostly static load — the shoulder and neck muscles holding you in place, not the fingers doing the fast work.",
    hiddenLoadSource: "tech-neck-pattern",
  },
  {
    id: "dishwasher",
    label: "Loading the dishwasher",
    short: "Chores",
    everydayFraming:
      "A chore is secretly a full mobility circuit — hinge, squat, reach, rotate, grip.",
    primeMovers: [
      "gluteus_maximus",
      "hamstrings",
      "quadriceps",
      "erector_spinae",
      "multifidus",
      "deltoids",
      "rotator_cuff",
      "latissimus_dorsi",
      "forearm_flexors",
      "obliques",
      "transverse_abdominis",
    ],
    stabilizerEstimate: [50, 100],
    countNote:
      "Reaching and rotating recruit a large, task-dependent stabilizer set.",
    hiddenLoad:
      "Everyday chores quietly train the exact hip-hinge and rotation patterns that gym programs charge money to teach.",
  },
  {
    id: "water",
    label: "Drinking a glass of water",
    short: "Drinking",
    everydayFraming:
      "Lifting a cup and swallowing is one of the most muscle-dense small acts you'll do all day.",
    primeMovers: [
      "biceps_brachii",
      "brachialis",
      "brachioradialis",
      "deltoids",
      "rotator_cuff",
      "wrist_flexors",
      "thenar",
      "suprahyoid",
      "infrahyoid",
      "tongue",
      "pharyngeal_constrictors",
      "masseter",
    ],
    stabilizerEstimate: [25, 35],
    countNote:
      'The "~30 muscles per swallow" figure is widely used in speech-pathology sources; treat it as approximate.',
    hiddenLoad:
      "A single sip ends in a swallow — a rapid, precisely sequenced act involving roughly 30 muscles and several cranial nerves, all coordinated in under a second.",
    hiddenLoadSource: "swallow-30",
  },
  {
    id: "cafe",
    label: "Walking to a café",
    short: "The errand",
    composite: true,
    sequence: ["standing", "walking", "phone", "water"],
    everydayFraming:
      "A five-minute errand quietly recruits most of the body's major muscle groups — in sequence.",
    // The composite's prime movers are the union of its parts, assembled below.
    primeMovers: [],
    stabilizerEstimate: [150, 300],
    countNote:
      "This is a narrative composite that stitches the earlier actions together. The point is breadth, not a number.",
    hiddenLoad:
      'You didn\'t "do a workout." But between standing, walking, reaching, gripping and swallowing, you just quietly engaged the majority of your ~650 muscles — most of them without a single conscious thought.',
  },
];

export const actionById: Record<string, Action> = Object.fromEntries(
  actions.map((a) => [a.id, a]),
);

/**
 * Resolve an action's prime movers, expanding composites into the de-duplicated
 * union of their sequence. Keeps the café finale data-driven.
 */
export function resolvePrimeMovers(action: Action): string[] {
  if (!action.composite || !action.sequence) return action.primeMovers;
  const set = new Set<string>();
  for (const stepId of action.sequence) {
    const step = actionById[stepId];
    if (step) step.primeMovers.forEach((m) => set.add(m));
  }
  return [...set];
}
