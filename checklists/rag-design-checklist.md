# RAG Design Checklist

Apply to any retrieval-augmented generation design, from prototype to platform.

## Corpus & ingestion
- [ ] Source systems inventoried, with owners and update cadence
- [ ] Document formats handled (PDF, HTML, office docs, tables, images?) with extraction quality spot-checked
- [ ] Chunking strategy chosen deliberately (size, overlap, structure-aware boundaries) and justified
- [ ] Metadata schema defined (source, date, ACL, section) and populated at ingestion
- [ ] Freshness requirement stated; re-indexing pipeline matches it
- [ ] Deletion/expiry propagates to the index (right-to-be-forgotten works)

## Retrieval
- [ ] Embedding model chosen with language/domain coverage verified
- [ ] Hybrid search (lexical + vector) considered; decision recorded
- [ ] Top-k and similarity thresholds tuned on a golden set, not guessed
- [ ] Reranking evaluated (quality gain vs. latency cost)
- [ ] Query transformation considered (rewriting, decomposition, HyDE)
- [ ] Metadata filtering used for tenancy/ACL *before* similarity search, not after

## Access control
- [ ] Document-level permissions enforced at retrieval time (user sees only what they may see)
- [ ] Permission model tested with adversarial cases (user asks about a doc they can't access)

## Generation
- [ ] Grounding instructions in the prompt; behavior on "no relevant context" defined (refuse, don't improvise)
- [ ] Citations returned and verifiable (chunk → source → location)
- [ ] Context assembly order and truncation strategy defined for over-budget retrievals

## Evaluation
- [ ] Retrieval quality measured separately from generation quality (recall@k / MRR vs. faithfulness / answer relevance)
- [ ] Golden dataset exists, versioned, with hard negatives
- [ ] Faithfulness/hallucination eval runs in CI on prompt or index changes

## Operations
- [ ] Index size, embedding cost, and re-embedding cost estimated at 1× and 10× corpus
- [ ] Retrieval latency budget allocated within end-to-end SLO
- [ ] Stale-index and empty-retrieval rates monitored
- [ ] Ingestion failures alert someone who can fix them
