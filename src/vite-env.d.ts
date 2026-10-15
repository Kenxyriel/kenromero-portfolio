/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Which portfolio this build serves: "qa" (QA + development; "it" is an alias), "va", or "all" (default). */
  readonly VITE_PORTFOLIO?: 'all' | 'qa' | 'it' | 'va'
}
