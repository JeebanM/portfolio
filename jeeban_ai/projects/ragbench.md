# RagBench

RAG evaluation and experimentation platform

**Purpose:**
A workspace for evaluating, comparing, debugging and improving Retrieval-Augmented Generation pipelines.

**Implemented concepts:**
- Recursive chunking
- Configurable chunk size
- Chunk overlap
- Local embeddings (BAAI/bge-small-en-v1.5)
- 384-dimensional embeddings
- Qdrant (Dense retrieval)
- BM25 (Hybrid search)
- Reciprocal Rank Fusion (RRF)
- Reranking
- Gemini generation
- RAG evaluation

Jeeban has also worked through real engineering issues involving:
Qdrant collections, Vector dimensions, Collection naming, Configuration synchronization, Singleton vector-store state, Ingestion/search lifecycle, Backend configuration, Retrieval failures, Empty vector collections.

This makes RagBench an AI infrastructure / RAG engineering project, not simply a chatbot wrapper.