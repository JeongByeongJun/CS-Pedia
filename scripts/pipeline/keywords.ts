/**
 * CS 키워드 사전 + 제목에서 키워드 추출
 *
 * longest-first 정렬로 "Large Language Model"이 "Language Model"보다 먼저 매칭.
 * word boundary (\b)로 부분 매칭 방지.
 */

export const KEYWORD_CATEGORIES: Record<string, string[]> = {
  "LLM & Language Models": [
    "Large Language Model",
    "Language Model",
    "LLM",
    "GPT",
    "ChatGPT",
    "Instruction Tuning",
    "RLHF",
    "In-Context Learning",
    "Chain-of-Thought",
    "Prompt",
    "Fine-Tuning",
    "Pretraining",
    "Pre-Training",
  ],
  "Generative Models": [
    "Diffusion Model",
    "Diffusion",
    "Text-to-Image",
    "Image Generation",
    "Video Generation",
    "Flow Matching",
    "Score Matching",
    "Generative",
    "GAN",
    "VAE",
    "Autoregressive",
  ],
  "Transformer & Attention": [
    "Vision Transformer",
    "Transformer",
    "Self-Attention",
    "Attention",
    "ViT",
    "BERT",
  ],
  "Graph Neural Networks": [
    "Graph Neural Network",
    "Knowledge Graph",
    "Graph Transformer",
    "GNN",
    "GCN",
    "Message Passing",
    "Graph",
  ],
  "Reinforcement Learning": [
    "Reinforcement Learning",
    "Reward Model",
    "Multi-Agent",
    "Policy Optimization",
    "RL",
  ],
  "Computer Vision": [
    "Object Detection",
    "Semantic Segmentation",
    "Instance Segmentation",
    "Segmentation",
    "Point Cloud",
    "Depth Estimation",
    "Image Restoration",
    "Super-Resolution",
    "3D Gaussian",
    "NeRF",
    "3D",
  ],
  NLP: [
    "Machine Translation",
    "Summarization",
    "Question Answering",
    "Sentiment Analysis",
    "Named Entity Recognition",
    "Relation Extraction",
    "Text Classification",
    "Information Extraction",
  ],
  "Robustness & Safety": [
    "Adversarial",
    "Robustness",
    "Fairness",
    "Bias",
    "Safety",
    "Alignment",
    "Backdoor",
    "Watermark",
    "Jailbreak",
  ],
  Efficiency: [
    "Mixture of Experts",
    "Knowledge Distillation",
    "Quantization",
    "Pruning",
    "Compression",
    "Low-Rank",
    "LoRA",
    "Sparse",
    "MoE",
    "Efficient",
  ],
  "Representation Learning": [
    "Contrastive Learning",
    "Self-Supervised",
    "Representation Learning",
    "Foundation Model",
    "Pre-Training",
    "Multimodal",
    "Embedding",
    "CLIP",
  ],
  "Federated & Privacy": [
    "Federated Learning",
    "Differential Privacy",
    "Privacy",
  ],
  Optimization: [
    "Optimization",
    "Convergence",
    "Gradient Descent",
  ],
  "Retrieval & Agents": [
    "Retrieval-Augmented",
    "RAG",
    "Agent",
    "Autonomous",
  ],
  "Data & Benchmarks": [
    "Benchmark",
    "Dataset",
    "Data Augmentation",
  ],
  "Transfer & Adaptation": [
    "Zero-Shot",
    "Few-Shot",
    "Transfer Learning",
    "Domain Adaptation",
    "Continual Learning",
    "Meta-Learning",
  ],
};

// Flatten and sort longest-first for greedy matching
export const KEYWORDS: string[] = Object.values(KEYWORD_CATEGORIES)
  .flat()
  // Deduplicate
  .filter((v, i, a) => a.indexOf(v) === i)
  .sort((a, b) => b.length - a.length);

// Pre-compiled regex patterns (case-insensitive, word-boundary)
const KEYWORD_PATTERNS: { keyword: string; regex: RegExp }[] = KEYWORDS.map(
  (kw) => ({
    keyword: kw,
    regex: new RegExp(
      `\\b${kw.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}\\b`,
      "i",
    ),
  }),
);

/**
 * 논문 제목에서 매칭되는 키워드를 추출
 */
export function extractKeywords(title: string): string[] {
  const found: string[] = [];
  for (const { keyword, regex } of KEYWORD_PATTERNS) {
    if (regex.test(title)) {
      found.push(keyword);
    }
  }
  return found;
}
