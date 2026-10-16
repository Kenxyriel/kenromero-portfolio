/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Which portfolio this build serves: "qa" (QA + development; "it" is an alias), "va", or "all" (default). */
  readonly VITE_PORTFOLIO?: 'all' | 'qa' | 'it' | 'va'
  /** Web3Forms access key used by the contact form to deliver messages by email. */
  readonly VITE_WEB3FORMS_KEY?: string
}
