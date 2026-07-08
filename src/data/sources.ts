/*
 * The public, cited sources list. The About/Sources page *is* part of the
 * brand promise: name what's nameable, cite what's claimed, and never inflate
 * a hedged claim into a stronger one.
 *
 * `key` values are referenced by actions (hiddenLoadSource) and by the
 * "Why Gentle & Slow" beats.
 */

export interface Source {
  key: string;
  claim: string; // the specific thing this source supports (honest framing)
  cite: string; // human-readable citation
  strength: "strong" | "moderate" | "popular-estimate";
}

export const SOURCES: Source[] = [
  {
    key: "count-650",
    claim:
      "There are roughly 640–650 named skeletal muscles; the exact count varies because anatomists disagree on whether complex muscles count as one or several. Some counts run as high as ~840.",
    cite: 'Library of Congress; Kenhub; Cleveland Clinic; Wikipedia, "List of skeletal muscles."',
    strength: "moderate",
  },
  {
    key: "muscle-mass",
    claim: "Skeletal muscle is about 40% of body weight.",
    cite: "Cleveland Clinic; Biology Insights.",
    strength: "strong",
  },
  {
    key: "lymph-pumps",
    claim:
      "The lymphatic system has no central pump. It moves fluid via an intrinsic pump (the vessels' own smooth-muscle contractions) and an extrinsic pump (compression from surrounding skeletal-muscle contraction, breathing and arterial pulsation).",
    cite: 'J Physiol 2016, "Lymphatic pumping"; Contractile Physiology of Lymphatics (PMC).',
    strength: "strong",
  },
  {
    key: "lymph-third",
    claim:
      "At rest, about one-third of lymph transport in the human lower limbs comes from skeletal-muscle compression; about two-thirds from the vessels' own active pumping.",
    cite: "Engeset et al. 1977, via J Physiol 2016.",
    strength: "strong",
  },
  {
    key: "lymph-volume",
    claim:
      "Humans return roughly 8–12 litres of fluid and protein per day through the lymphatic system.",
    cite: "J Physiol 2016.",
    strength: "strong",
  },
  {
    key: "circulation-chronic",
    claim:
      "Regular stretching improves vascular function over time: in a 12-week study, passive leg stretches 5×/week produced more dilated arteries, increased blood flow in both legs and arms, reduced arterial stiffness and lower blood pressure.",
    cite: "Journal of Physiology, July 2020; summarized by Harvard Health.",
    strength: "strong",
  },
  {
    key: "circulation-microvascular",
    claim:
      "Muscle stretch drives microvascular and endothelial adaptations, and in the elderly may help restore impaired vascular function.",
    cite: "Frontiers in Physiology review, PMC9289226.",
    strength: "moderate",
  },
  {
    key: "circulation-acute",
    claim:
      "During a held static stretch, blood flow through the muscle can briefly drop as vessels are compressed, followed by a post-stretch rebound (reactive hyperemia).",
    cite: "AJP-Heart 2015; Effects of Static Stretching on Blood Circulation (PMC).",
    strength: "moderate",
  },
  {
    key: "calm-parasympathetic",
    claim:
      "Passive static stretching shifts the autonomic nervous system toward parasympathetic (rest-and-digest) dominance, and that state persists for at least several minutes afterward.",
    cite: 'Sci Sports Med 2014, "Acute Changes in Autonomic Nerve Activity during Passive Static Stretching."',
    strength: "strong",
  },
  {
    key: "calm-hrv",
    claim:
      "Fifteen minutes of daily static stretching for 28 days improves heart rate variability — a marker of parasympathetic tone and recovery capacity.",
    cite: "Science for Sport, summarizing the HRV literature.",
    strength: "moderate",
  },
  {
    key: "calm-intensity",
    claim:
      "Intensity matters: vigorous stretching can cause a transient sympathetic increase / parasympathetic withdrawal, while low-intensity, brief, gentle stretching is what reliably promotes the calm response. Gentleness is the mechanism, not a weaker version.",
    cite: "J Appl Physiol 2018; SciELO low-intensity HRV study.",
    strength: "moderate",
  },
  {
    key: "tech-neck-load",
    claim:
      "A neutral head weighs about 10–12 lb. Tilt it forward and the effective load climbs fast: a slight glance down ≈ 27 lb; at about 45° it can reach ~50 lb.",
    cite: "Cleveland Clinic; figures derived from Hansraj 2014.",
    strength: "moderate",
  },
  {
    key: "tech-neck-pattern",
    claim:
      "The predictable tech-neck pattern: deep cervical flexors weaken while upper trapezius, levator scapulae and suboccipitals overload and tighten.",
    cite: "AMTA Massage Therapy Journal; Iron-Neck; PhysioMSK.",
    strength: "moderate",
  },
  {
    key: "crossed-syndromes",
    claim:
      "Janda's crossed syndromes describe predictable patterns of paired tightness and weakness (upper-crossed and lower-crossed). It is a widely used clinical model, not a fully validated law — individual anatomy varies.",
    cite: "Physio-pedia; Illinois Chiropractic Society; jandaapproach.com; Tangelo Health critique.",
    strength: "moderate",
  },
  {
    key: "reciprocal-inhibition",
    claim:
      "Reciprocal inhibition (Sherrington): when one muscle is chronically hypertonic, its antagonist is signaled to relax and weaken — the mechanism behind 'one tight muscle silences others.'",
    cite: "Illinois Chiropractic Society.",
    strength: "moderate",
  },
  {
    key: "sit-to-stand-imbalance",
    claim:
      "Prolonged sitting lets hip flexors adaptively shorten and glutes switch off, tugging the pelvis toward a forward tilt and loading the low back — the classic lower-crossed setup.",
    cite: "Janda lower-crossed literature; Physio-pedia.",
    strength: "moderate",
  },
  {
    key: "walk-200",
    claim:
      'The figure "about 200 muscles to take a step" is widely repeated but traces to popular science, not a rigorous dissection count. The named prime movers are the defensible core.',
    cite: "Popular-science attribution; flagged here as an estimate, not a measurement.",
    strength: "popular-estimate",
  },
  {
    key: "swallow-30",
    claim:
      'A single swallow is often described as coordinating "about 30 muscles" and several cranial nerves in under a second. The number is widely used in speech-pathology sources; treat it as approximate.',
    cite: "Speech-pathology sources; flagged here as commonly cited.",
    strength: "popular-estimate",
  },
];

export const sourceByKey: Record<string, Source> = Object.fromEntries(
  SOURCES.map((s) => [s.key, s]),
);

export const STRENGTH_LABEL: Record<Source["strength"], string> = {
  strong: "Strong / mechanistic",
  moderate: "Moderate",
  "popular-estimate": "Popular estimate",
};
