# Azure Foundry integration contract

ShortlistProof can add Microsoft Foundry as an optional server-side analysis provider. The live product must remain diagnostic and must never generate, rewrite, complete or paraphrase Chevening submission answers.

## Current state

The production database contains a server-only row in `private.ai_provider_config` for `azure_foundry`. It is disabled by default until real Azure credentials and resource identifiers are connected.

No Azure claim should appear in customer-facing copy while `enabled = false`.

## Required configuration

Set these private configuration fields for provider `azure_foundry`:

- `project_endpoint`: Foundry project endpoint, for example `https://<account>.services.ai.azure.com/api/projects/<project>`
- `model_deployment`: deployed model name
- `api_version`: `v1` for the current project/agent Responses surface
- `agent_name`: optional if using a persisted or hosted agent
- `search_endpoint`: optional Azure AI Search endpoint
- `search_index`: optional permissioned-pattern index name
- `search_api_version`: currently prepared for `2026-08-01-preview`

Store secrets only in the private server secret store:

- `azure_foundry_api_key`
- `azure_search_api_key`

Never expose either key to browser JavaScript, Vercel public variables, source control or user-visible logs.

## Foundry request patterns

For an ephemeral server-side analysis call, use the project Responses endpoint:

`POST {project_endpoint}/openai/v1/responses`

For a persisted prompt agent, use the dedicated agent endpoint:

`POST {project_endpoint}/agents/{agent_name}/endpoint/protocols/openai/responses?api-version=v1`

Authentication is server-to-server with either Microsoft Entra bearer authentication or an Azure API key. For the current Supabase Edge Function architecture, the simplest initial integration is a server-only API key stored outside source control. A later Azure-native deployment can move to managed identity.

## Guardrail contract

Every provider request must explicitly require structured diagnostic output only. Allowed output fields:

- evidence already visible
- missing evidence
- consistency issue
- stronger experience candidate
- sceptical assessor question
- course-to-career mismatch
- repetition/date inconsistency
- source label
- confidence in the diagnostic observation

The provider must not return:

- replacement essay text
- rewritten sentences for submission
- paraphrased user answers
- generated Chevening responses
- a predicted chance of winning
- an official-looking selection score

If a provider violates the expected schema, discard the response and fall back to the deterministic structural engine.

## Azure AI Search

Azure AI Search is optional and must only be enabled after permissioned/licensed Scholar-derived records are ingested.

The current architecture expects derived records rather than raw successful essays. Recommended searchable fields:

- `id`
- `criterion`
- `scenario`
- `pattern_summary`
- `evidence_structure`
- `assessor_signal`
- `source_tier`
- `source_label`
- `permission_status`
- `verification_status`
- `content_vector`

Queries should filter to verified/permissioned records and should return only the minimum derived fields needed for the analysis.

The prepared search API version is `2026-08-01-preview`; verify the version again immediately before enabling the integration.

## Failure behaviour

Azure must be an enhancement layer, not a single point of failure. If Foundry or AI Search is unavailable:

1. Keep the application usable.
2. Fall back to the deterministic structural methodology.
3. Do not expose provider errors or secrets.
4. Mark the result source accurately.
5. Never claim Scholar-pattern comparison when no permissioned result was retrieved.
