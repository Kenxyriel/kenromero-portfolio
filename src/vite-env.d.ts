/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Which portfolio this build serves: "qa", "it", "va", or "all" (default). */
  readonly VITE_PORTFOLIO?: 'all' | 'qa' | 'it' | 'va'
}
