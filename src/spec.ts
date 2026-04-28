// Embedded Ramoira brand schema specification content.
// Source of truth: github.com/ramoira/brand-schema-spec

export const LAYER_SPECS: Record<string, string> = {
  identity: `# Identity Component (Layer 1)

Identity is the foundational constraint layer: how the brand *is*, what it *looks like*, and the assets it *owns*.

## Top-level shape
- identity._component: 'identity'
- identity._version: string
- identity.prism: brand character structure (physique/personality/culture/relationship/reflection/selfImage)
- identity.distinctiveAssets: brand-owned assets (visual/sonic/linguistic)
- identity.summary: quick-access generation summary

## Prism substructures

prism.physique
  - permitted: string[] — visual/material forms the brand can take
  - forbidden: string[] — visual/material forms it cannot take
  - referenceURL?: URL
  - posture: string — how the brand physically presents itself

prism.personality (scored dimensions 0–10)
  - sincerity, excitement, competence, sophistication, ruggedness: Score (0–10)
  - characterBrief: string — one-paragraph AI character brief

prism.culture
  - coreValues: string[]
  - originNarrative: string — the brand's founding story as AI context
  - forbidden: string[] — cultural territory the brand cannot claim
  - sacredBoundary: string — the one thing the brand will never compromise

prism.relationship
  - mode: RelationshipMode (one of the eight archetype statements)
  - formality: Score (0–10, 0=very informal, 10=extremely formal)
  - pronoun: 'we' | 'I' | 'brand_name_only'
  - warmth: Score (0–10)
  - powerDynamic: 'brand_leads' | 'equal' | 'customer_leads'

prism.reflection
  - depictedArchetype: string — the customer the brand depicts in comms
  - aspirationalDelta: Score (0–10, how much more aspirational than actual customer)
  - forbiddenArchetypes: string[]
  - ageSignal: string

prism.selfImage
  - feelingDescriptors: string[] — how customers feel using the brand
  - identityStatement: string — how the brand sees itself
  - forbidden: string[]

## Distinctive assets

distinctiveAssets.visual
  - primaryColor: { value: HexColor, severity: 'absolute'|'strong'|'contextual', rationale: string }
  - secondaryColors: HexColor[]
  - forbiddenColors: HexColor[]
  - logoUsage: { minimumClearSpace, forbiddenBackgrounds, forbiddenModifications }
  - iconography: string[]
  - characterAssets: string[]
  - photographyStyle: { permitted, forbidden, lightingMood }

distinctiveAssets.sonic
  - sonicLogoURL?: URL
  - permittedGenres: string[]
  - forbiddenGenres: string[]
  - tempoRange: [BPM, BPM]
  - instrumentalMood: string

distinctiveAssets.linguistic
  - ownedPhrases: Constrained<string>[] — phrases the brand owns, with rationale
  - ownedWords: string[]
  - forbiddenWords: Constrained<string>[]
  - typographicVoice: { sentenceStructure, punctuationStyle, numeralStyle }

## Summary (fast-path for generation systems)
  - oneLineBrief: string
  - threeAdjectives: string[]
  - neverDo: string[]

## relationship.mode valid values (use exact string)
  - "We're like you. We just happen to know a bit more about this one thing." — Peer
  - "Things can be better. Here is a small thing that helps." — Optimist
  - "We believe in what you can do before you do." — Coach
  - "We know more. Here is the proof." — Expert
  - "Built to outlast everything. Excellence as philosophy, not strategy." — Monument
  - "Business as a force for change. Profit is the fuel, not the point." — Activist
  - "Limits are the starting point. Mediocrity is the only enemy." — Provocateur
  - "The category is broken. We are what replaces it." — Challenger`,

  narrative: `# Narrative Component (Layer 2)

Narrative encodes meaning: what the brand literally does and what it stands for, plus the brand story and the rails that protect it.

## Top-level shape
- narrative._component: 'narrative'
- narrative._version: string
- narrative.semiotic: literal + associative meaning layers
- narrative.myth: brand story layer
- narrative.mythEvolution: how myth absorbs modern tensions
- narrative.pillars: NarrativePillar[]
- narrative.editorial: long-form storytelling rules
- narrative.contentTest: quick pass/fail questions

## Semiotic layer

semiotic.denotative
  - categoryDescriptor: string — exact category the brand operates in
  - functionalClaims: string[] — claims the brand can make, each verifiable
  - specifications: string[]
  - forbiddenClaims: string[]

semiotic.connotative
  - meaningClusters: string[] — associative meanings the brand owns
  - forbiddenMeanings: string[]
  - emotionalRegister: string — the precise feeling the brand creates
  - minimumConnotativeTest: string — yes/no test for connotative minimum

semiotic.layerHierarchy: 'connotative_first' | 'balanced' | 'denotative_first'

## Myth (brand story layer — not marketing copy)

myth.culturalTension: string — the real cultural conflict this brand takes a side on
myth.mythStatement: string — one-sentence brand myth
myth.protagonistRole: string — what role the brand plays in the myth
myth.antagonist: string — what the brand stands against
myth.mythTest: string — yes/no question: does this content fit the myth?
myth.constraints: MythConstraint[]
  - constraint: string
  - severity: 'absolute' | 'strong' | 'contextual'
  - rationale: string
  - example: string

## Myth evolution
mythEvolution.principle: string — how the myth absorbs new pressures without trend-chasing
mythEvolution.modernTensions: ModernTension[]
  - tension: string
  - mythResolution: string
  - permittedFraming: string[]
  - forbiddenFraming: string[]
  - rails: Rail[]
mythEvolution.immutableCore: string — the part of the myth that never changes

## Pillars (reusable narrative modules)
pillars[]:
  - name: string
  - description: string
  - coreClaim: string
  - approvedArcs: string[]
  - forbiddenInversions: string[]
  - surfaces: string[]
  - rails: Rail[]

## Editorial guidelines
editorial.openingPrinciple: string
editorial.structuralApproach: string
editorial.forbiddenStructures: string[]
editorial.referencePool: string[]
editorial.forbiddenReferences: string[]
editorial.timeScaleLanguage: string

## Content test (three yes/no questions an AI asks before approving any output)
contentTest.mythTest: string — does this fit the myth?
contentTest.connotativeTest: string — does it carry the right connotations?
contentTest.toneTest: string — does it sound like us?`,

  voice: `# Voice Component (Layer 3)

Voice is the surface-sensitive layer: how the brand writes, and how that writing shifts by surface without drifting into category norms.

## Top-level shape
- voice._component: 'voice'
- voice._version: string
- voice.base: base VoiceParameters
- voice.forbiddenTones: string[] (absolute, all surfaces)
- voice.approvedTones: string[]
- voice.examples: VoiceExample[] (at least 2 approved + 2 rejected with real copy)
- voice.contextVariants: VoiceVariant[] (per-surface deltas from base)
- voice.rails: PositiveRailSystem

## Base voice parameters
base.sentenceLength: 'short' | 'varied' | 'long' | 'fragments_permitted'
base.vocabularyLevel: 1–10
base.humourPermitted: boolean
base.humourStyle: 'dry' | 'self_deprecating' | 'absurdist' | 'warm' | 'irreverent' | 'none'
base.permittedDevices: string[]
base.forbiddenDevices: string[]
base.structuralRules: string[]

## Voice examples (high-signal training inputs)
examples[]:
  - context: OutputSurface | string
  - text: string (real copy, not placeholder)
  - verdict: 'approved' | 'rejected'
  - reason: string (specific reason, not generic)

## Context variants (per-surface deltas — only specify what changes from base)
contextVariants[]:
  - surface: OutputSurface
  - formalityDelta: number (negative = less formal)
  - warmthDelta: number
  - sentenceLength?: SentenceLength
  - openingInstruction: string
  - closingInstruction: string
  - rails: Rail[]
  - additionalForbidden: string[]
  - fallbackInstruction: string

## Positive rails (prevent system freeze when tactics are forbidden)
rails.global: Rail[]
rails.alternatives:
  - whenPricingForbidden: Rail[]
  - whenUrgencyForbidden: Rail[]
  - whenComparativeForbidden: Rail[]
  - whenTrendLanguageForbidden: Rail[]
  - whenAccessibilityForbidden: Rail[]
  - whenPromotionForbidden: Rail[]

A Rail object:
  - context: string — when this rail applies
  - instruction: string — what to do instead
  - example?: string — compliant example
  - antiExample?: string — non-compliant example`,

  commercial: `# Commercial Component (Layer 4)

Commercial makes conversion constraints explicit: what pricing/claims/offers/proof patterns are allowed, and how to handle high-risk surfaces.

## Top-level shape
- commercial._component: 'commercial'
- commercial.pricing: PricingRules
- commercial.claims: ClaimsRules
- commercial.offers: OfferRules
- commercial.socialProof: SocialProofRules
- commercial.surfaceRules: SurfaceCommercialRule[]
- commercial.globalForbiddenTerms: Constrained<string>[]

## Pricing rules
pricing.style: 'opaque' | 'transparent' | 'anchored' | 'value_led' | 'simple'
pricing.priceDisplayPermitted: boolean
pricing.urgencyLanguagePermitted: boolean
pricing.scarcityLanguagePermitted: boolean
pricing.discountPermitted: boolean
pricing.permittedLanguage: string[]
pricing.forbiddenLanguage: Constrained<string>[]

## Claims rules
claims.approved: ApprovedClaim[] — { claim, evidenceRequired, geographicScope, surfaces }
claims.forbidden: Constrained<string>[]
claims.comparative: { competitorMentionPermitted, comparativeClaimsPermitted, forbiddenFramings }
claims.superlatives: { permitted, approved, forbidden }

## Offer rules
offers.permittedTypes: OfferType[]
offers.forbiddenTypes: Constrained<OfferType>[]
offers.communicationRules: { urgencyPermitted, scarcityPermitted, valueFraming }

## Social proof rules
socialProof.starRatingsPermitted: boolean
socialProof.reviewCountsPermitted: boolean
socialProof.customerTestimonialsPermitted: boolean
socialProof.permittedAuthoritySignals: string[]
socialProof.forbiddenSocialProof: string[]`,

  governance: `# Governance Component (Layer 5)

Governance is the meta-layer: severity weighting, conflict resolution, surface-specific rules, and compliance routing.

## Top-level shape
- governance._component: 'governance'
- governance.severity: SeverityRegistry
- governance.conflictResolution: ConflictResolution
- governance.surfaceRules: SurfaceRule[]
- governance.overrideProtocol: OverrideProtocol
- governance.compliance: ComplianceConfig
- governance.preflight: three binary yes/no questions

## Severity registry

severity.absolute
  - constraints: string[] — at least one; derive from the never-do list
  - violationResponse: 'block_output' | 'flag_and_block'

severity.strong
  - constraints: string[]
  - overrideProcess: string
  - violationResponse: 'flag_for_review' | 'block_output'

severity.contextual
  - constraints: string[]
  - judgmentBounds: string
  - violationResponse: 'log_for_audit'

## Conflict resolution
conflictResolution.componentPriority: string[] — index 0 wins
conflictResolution.knownConflicts: ConflictResolutionRule[]
conflictResolution.defaultResolution: FallbackBehaviour

## Preflight (run before any content is generated)
preflight.question1: string — brand-specific binary check
preflight.question2: string — brand-specific binary check
preflight.question3: string — brand-specific binary check`,
};

export const VALID_ENUMS = {
  "voice.base.sentenceLength": ["short", "varied", "long", "fragments_permitted"],
  "voice.base.humourStyle": ["dry", "self_deprecating", "absurdist", "warm", "irreverent", "none"],
  "voice.examples[].verdict": ["approved", "rejected"],
  "OutputSurface (used in voice.contextVariants[].surface, commercial.surfaceRules[].surface, governance.surfaceRules[].surface)": [
    "search_result_page",
    "paid_landing_page",
    "product_detail_page",
    "comparison_page",
    "editorial",
    "brand_narrative",
    "social_organic",
    "social_paid",
    "email_acquisition",
    "email_retention",
    "display_ad",
    "video_script",
    "audio_script",
    "press_release",
    "customer_service",
    "packaging_copy",
    "out_of_home",
  ],
  "narrative.semiotic.layerHierarchy": ["connotative_first", "balanced", "denotative_first"],
  "identity.prism.relationship.pronoun": ["we", "I", "brand_name_only"],
  "identity.prism.relationship.powerDynamic": ["brand_leads", "equal", "customer_leads"],
  "governance.severity.absolute.violationResponse": ["block_output", "flag_and_block"],
  "governance.severity.strong.violationResponse": ["flag_for_review", "block_output"],
  "governance.severity.contextual.violationResponse": ["log_for_audit"],
  "narrative.myth.constraints[].severity AND identity.distinctiveAssets.visual.primaryColor.severity": [
    "absolute",
    "strong",
    "contextual",
  ],
  "scores (sincerity, excitement, competence, sophistication, ruggedness, formality, warmth, vocabularyLevel, aspirationalDelta)":
    "number 0–10",
};

export const SPEC_OVERVIEW = `# Ramoira Brand Schema Specification

The open standard for brand identity in the agent web.

## What it is

A Ramoira brand schema is a structured, versioned, agent-readable definition of brand identity.
It exists so that AI agents, LLMs, and automated systems can represent a brand accurately —
without hallucination, without drift, without re-prompting.

## Two schema formats

brand.schema.json          Full schema. Local only. All five layers. Complete detail.
                           Generated by: ramoira init

brand.schema.summary.json  Summary schema. Public. Identity, narrative, voice layers.
                           Enough for LLM citation accuracy.
                           Published at: ramoira.com/brands/[slug]/

## Five layers

1. identity    — who the brand is: character, visual assets, linguistic assets
2. narrative   — what the brand means: myth, semiotic layers, content structure
3. voice       — how the brand speaks: tone, rhythm, surface-specific rules
4. commercial  — how the brand behaves commercially: pricing, claims, offers, proof
5. governance  — what AI must never do, what needs human review, preflight checks

## Key field concepts

Rails — conditional instructions: { context, instruction, example, antiExample }
       An AI reads these and follows them situationally.

governance.severity — three tiers:
  absolute   → AI blocks the output entirely
  strong     → AI flags for human review
  contextual → AI uses judgment and logs

narrative.myth — not marketing copy. The cultural tension this brand resolves,
                 its protagonist role, and what it stands against.

narrative.contentTest — three self-check questions an AI asks before approving output.

governance.preflight — three yes/no questions an AI runs before generating any content.

## Schema repository

github.com/ramoira/brand-schema-spec

## CLI

npm install -g ramoira
ramoira init     → generates full schema
ramoira publish  → publishes summary schema to ramoira.com/brands/[slug]/

## Published schemas

ramoira.com/brands/`;

export const ROLEX_EXAMPLE = {
  _note: "This is a summary schema example — a high-quality reference for field population.",
  meta: {
    brandId: "rolex",
    brandName: "Rolex SA",
    schemaVersion: "2.0.0",
    schemaType: "summary",
  },
  identity: {
    summary: {
      oneLineBrief: "Rolex: time mastered. Excellence made physical. Built to outlast everything.",
      threeAdjectives: ["certain", "enduring", "precise"],
      neverDo: [
        "Show or reference price in any format",
        "Use urgency, scarcity, or promotional language",
        "Reference trends, seasons, or fashion",
        "Describe Rolex as accessible or democratic",
        "Use the word 'luxury' — Rolex never categorises itself",
      ],
    },
    distinctiveAssets: {
      visual: {
        primaryColor: {
          value: "#006039",
          severity: "absolute",
          rationale: "The Rolex green is a registered trademark.",
        },
        photographyStyle: {
          permitted: [
            "extreme close-up of mechanical components",
            "wrist in purposeful motion — climbing, navigating, diving",
          ],
          forbidden: ["flat lay product photography", "lifestyle group shots"],
          lightingMood: "Single dramatic source. Shadows that reveal form. Never fill-lit.",
        },
      },
      linguistic: {
        ownedWords: ["perpetual", "superlative", "oyster", "submariner"],
        typographicVoice: {
          sentenceStructure: "Short declarative statements. Subject. Verb. Object. No questions.",
          punctuationStyle: "Full stops. En dashes. Never exclamation marks. Never ellipsis.",
          numeralStyle: "Words for ordinal references. Numerals for specifications.",
        },
      },
    },
  },
  narrative: {
    semiotic: {
      layerHierarchy: "connotative_first",
      denotative: {
        categoryDescriptor: "Swiss mechanical timepiece — COSC-certified Superlative Chronometer",
        functionalClaims: ["Swiss-made mechanical movement", "COSC-certified chronometer precision"],
        forbiddenClaims: [
          "best watch in the world — Rolex does not make comparative superlatives",
        ],
      },
      connotative: {
        meaningClusters: [
          "permanence — this object outlasts everything around it",
          "earned achievement — the watch as the physical record of a life well-lived",
        ],
        forbiddenMeanings: [
          "status display — Rolex is not a signal, it is a record",
          "fashion accessory — Rolex is not seasonal",
        ],
        emotionalRegister: "Quiet gravity. Never loud. Never urgent.",
        minimumConnotativeTest: "Could this content have been written in 1980 and still feel right in 2050?",
      },
    },
    myth: {
      mythStatement: "Some things are made to outlast everything. Rolex is proof that permanence is still possible.",
      mythTest: "Does this content feel like it could endure for a generation?",
    },
    contentTest: {
      mythTest: "Could this content have been written in 1980 and still feel right in 2050?",
      connotativeTest: "Does this make the reader feel the weight of permanence, or the lightness of fashion?",
      toneTest: "Is this content certain? Does it state rather than suggest?",
    },
  },
  voice: {
    base: {
      sentenceLength: "short",
      vocabularyLevel: 8,
      humourPermitted: false,
      humourStyle: "none",
      permittedDevices: ["declarative statement", "understatement", "juxtaposition of time scales"],
      forbiddenDevices: ["rhetorical questions", "exclamation marks", "colloquialism"],
      structuralRules: [
        "Rolex never refers to itself as 'we' — always 'Rolex'",
        "Short sentences. White space. Certainty.",
      ],
    },
    approvedTones: ["declarative", "certain", "quiet authority", "understated"],
    forbiddenTones: ["casual", "warm", "urgent", "promotional", "playful"],
    examples: [
      {
        context: "product_detail_page",
        text: "The Submariner has been to the bottom of the world and back. It was not designed for that. It was designed for everything.",
        verdict: "approved",
        reason: "Declarative. Mythic without hyperbole. Understatement. No price, no urgency.",
      },
      {
        context: "out_of_home",
        text: "It doesn't know what year it is. That's why it works.",
        verdict: "approved",
        reason: "Short. Certain. Reinforces permanence myth. Timeless.",
      },
      {
        context: "search_result_page",
        text: "Discover the iconic Rolex Submariner - starting from £7,250. Free shipping.",
        verdict: "rejected",
        reason: "Price shown (absolute violation). Promotional language. 'Iconic' is a fashion term.",
      },
      {
        context: "social_organic",
        text: "Your wrist game just got an upgrade! 🔥 Retro vibes only.",
        verdict: "rejected",
        reason: "Catastrophic voice failure. Casual vernacular. Fashion accessory framing.",
      },
    ],
  },
};
