const NEWS = [
  {
    date: "2026.04",
    highlight: true,
    en: {
      text: `Our paper "Demystifying MaskGIT sampler and beyond: adaptive order selection in masked diffusion" has been published in <a target="_blank" rel="noopener noreferrer" href="https://openreview.net/forum?id=mKlW68i2Ig">Transactions on Machine Learning Research</a> with <span class="label-featured">Featured Certification</span>!!`
    },
    ja: {
      text: `論文 "Demystifying MaskGIT sampler and beyond: adaptive order selection in masked diffusion" が <a target="_blank" rel="noopener noreferrer" href="https://openreview.net/forum?id=mKlW68i2Ig">Transactions on Machine Learning Research</a> に <span class="label-featured">Featured Certification</span> つきで出版されました。`
    }
  },
  {
    date: "2026.04",
    highlight: false,
    en: {
      text: `Joined the Department of Mathematical Informatics at The University of Tokyo as an assistant professor.`
    },
    ja: {
      text: `東京大学大学院情報理工学系研究科数理情報学専攻数理第6研究室に助教として着任しました。`
    }
  },
  {
    date: "2026.01",
    highlight: false,
    en: {
      text: `Two papers have been accepted for presentation at ICLR 2026:`,
      items: [
        `SONA: learning conditional, unconditional, and mismatching-aware discriminator (<a target="_blank" rel="noopener noreferrer" href="https://arxiv.org/abs/2510.04576">arXiv</a>)`,
        `Concept-TRAK: Understanding how diffusion models learn concepts through concept-level attribution (<a target="_blank" rel="noopener noreferrer" href="https://arxiv.org/abs/2507.06547">arXiv</a>)`
      ]
    },
    ja: {
      text: `ICLR2026に2件の論文がアクセプトされました。`,
      items: [
        `SONA: learning conditional, unconditional, and mismatching-aware discriminator (<a target="_blank" rel="noopener noreferrer" href="https://arxiv.org/abs/2510.04576">arXiv</a>)`,
        `Concept-TRAK: Understanding how diffusion models learn concepts through concept-level attribution (<a target="_blank" rel="noopener noreferrer" href="https://arxiv.org/abs/2507.06547">arXiv</a>)`
      ]
    }
  },
  {
    date: "2025.10",
    highlight: false,
    en: {
      text: `The following preprints have been released:`,
      items: [
        `Theoretical refinement of CLIP by utilizing linear structure of optimal similarity (<a target="_blank" rel="noopener noreferrer" href="https://arxiv.org/abs/2510.15508">arXiv</a>)`,
        `MCA: modality composition awareness for robust composed multimodal retrieval (<a target="_blank" rel="noopener noreferrer" href="https://arxiv.org/abs/2510.15543">arXiv</a>)`
      ]
    },
    ja: {
      text: `以下のプレプリントを公開しました。`,
      items: [
        `Theoretical refinement of CLIP by utilizing linear structure of optimal similarity (<a target="_blank" rel="noopener noreferrer" href="https://arxiv.org/abs/2510.15508">arXiv</a>)`,
        `MCA: modality composition awareness for robust composed multimodal retrieval (<a target="_blank" rel="noopener noreferrer" href="https://arxiv.org/abs/2510.15543">arXiv</a>)`
      ]
    }
  },
  {
    date: "2025.05",
    highlight: false,
    en: {
      text: `Our paper "Distillation of Discrete Diffusion through Dimensional Correlations" has been accepted for presentation at ICML 2025. (<a target="_blank" rel="noopener noreferrer" href="https://arxiv.org/abs/2410.08709">arXiv</a>)`
    },
    ja: {
      text: `論文 "Distillation of Discrete Diffusion through Dimensional Correlations" がICML 2025にアクセプトされました。 (<a target="_blank" rel="noopener noreferrer" href="https://arxiv.org/abs/2410.08709">arXiv</a>)`
    }
  },
  {
    date: "2025.03",
    highlight: false,
    en: {
      text: `Three papers will be presented at ICLR 2025:`,
      items: [
        `Jump Your Steps: Optimizing Sampling Schedule of Discrete Diffusion Models (<a target="_blank" rel="noopener noreferrer" href="https://openreview.net/forum?id=pD6TiCpyDR">openreview</a>)`,
        `Policy Gradient with Kernel Quadrature (<a target="_blank" rel="noopener noreferrer" href="https://openreview.net/forum?id=WFI9xhJrxF">TMLR</a>, ICLR journal track selected)`,
        `Partial Alignment of Representations via Interventional Consistency (<a target="_blank" rel="noopener noreferrer" href="https://openreview.net/forum?id=eimAJqoIWt">Re-Align workshop</a>)`
      ]
    },
    ja: {
      text: `ICLR 2025で3件の論文（main conference + TMLR to ICLR track + workshop）を発表します。`,
      items: [
        `Jump Your Steps: Optimizing Sampling Schedule of Discrete Diffusion Models (<a target="_blank" rel="noopener noreferrer" href="https://openreview.net/forum?id=pD6TiCpyDR">main conference</a>)`,
        `Policy Gradient with Kernel Quadrature (<a target="_blank" rel="noopener noreferrer" href="https://openreview.net/forum?id=WFI9xhJrxF">TMLR</a>, ICLR journal track selected)`,
        `Partial Alignment of Representations via Interventional Consistency (<a target="_blank" rel="noopener noreferrer" href="https://openreview.net/forum?id=eimAJqoIWt">Re-Align workshop</a>)`
      ]
    }
  },
  {
    date: "2024.04",
    highlight: false,
    en: {
      text: `I have received a DPhil Thesis Prize from the Mathematical Institute at the University of Oxford. (<a target="_blank" rel="noopener noreferrer" href="https://www.maths.ox.ac.uk/study-here/postgraduate-study/graduate-prizes">link</a>)`
    },
    ja: {
      text: `オックスフォード大学数学研究科の昨年の博士論文賞（DPhil Thesis Prize）に選ばれました。(<a target="_blank" rel="noopener noreferrer" href="https://www.maths.ox.ac.uk/study-here/postgraduate-study/graduate-prizes">link</a>)`
    }
  },
  {
    date: "2024.03",
    highlight: false,
    en: {
      text: `Joined Sony Group Corporation.`
    },
    ja: {
      text: `ソニーグループ株式会社に入りました。研究などをします。`
    }
  },
  {
    date: "2024.02",
    highlight: false,
    en: {
      text: `Our paper "Policy Gradient with Kernel Quadrature" (joint work with Tetsuro Morimura), which summarizes my research internship at CyberAgent AI Lab, has been published in <a target="_blank" rel="noopener noreferrer" href="https://openreview.net/forum?id=WFI9xhJrxF">Transactions on Machine Learning Research</a>.`
    },
    ja: {
      text: `サイバーエージェント AI Labでのインターンの内容をまとめた論文 "Policy Gradient with Kernel Quadrature" (joint work with Tetsuro Morimura) が <a target="_blank" rel="noopener noreferrer" href="https://openreview.net/forum?id=WFI9xhJrxF">Transactions on Machine Learning Research</a> に出版されました。`
    }
  },
  {
    date: "2024.01",
    highlight: false,
    en: {
      text: `I passed my viva vose, final oral examination, on 30 Nov 2023 and I have officially been granted leave to supplicate for DPhil on 16 Jan 2024, which means my formal completion of a DPhil in Mathematics. The <a target="_blank" rel="noopener noreferrer" href="https://ora.ox.ac.uk/objects/uuid:15008016-2418-4c9a-a2f7-c9515a0657b1">thesis</a> is available online.`
    },
    ja: {
      text: `昨年11/30に博士論文の最終審査が行われ、2024/01/16付で正式に審査を通過しました。<a target="_blank" rel="noopener noreferrer" href="https://ora.ox.ac.uk/objects/uuid:15008016-2418-4c9a-a2f7-c9515a0657b1">博士論文</a>が公開されています。`
    }
  },
  {
    date: "2024.01",
    highlight: false,
    en: {
      text: `Our paper "Adaptive Batch Sizes in Active Learning: A Probabilistic Numerics Approach" has been accepted for presentation at AISTATS 2024. (<a target="_blank" rel="noopener noreferrer" href="https://arxiv.org/abs/2306.05843">arXiv</a>)`
    },
    ja: {
      text: `論文 "Adaptive Batch Sizes in Active Learning: A Probabilistic Numerics Approach" がAISTATS 2024にアクセプトされました。 (<a target="_blank" rel="noopener noreferrer" href="https://arxiv.org/abs/2306.05843">arXiv</a>)`
    }
  },
  {
    date: "2023.07",
    highlight: false,
    en: {
      text: `Two papers have been published as part of the proceedings of ICML 2023:`,
      items: [
        `Sampling-based Nyström Approximation and Kernel Quadrature (<a target="_blank" rel="noopener noreferrer" href="https://proceedings.mlr.press/v202/hayakawa23a.html">proceedings</a>)`,
        `Quantum Ridgelet Transform: Winning Lottery Ticket of Neural Networks with Quantum Computation (<a target="_blank" rel="noopener noreferrer" href="https://proceedings.mlr.press/v202/yamasaki23a.html">proceedings</a>)`
      ]
    },
    ja: {
      text: `ICML 2023のプロシーディングスに2件の論文が出版されました。`,
      items: [
        `Sampling-based Nyström Approximation and Kernel Quadrature (<a target="_blank" rel="noopener noreferrer" href="https://proceedings.mlr.press/v202/hayakawa23a.html">proceedings</a>)`,
        `Quantum Ridgelet Transform: Winning Lottery Ticket of Neural Networks with Quantum Computation (<a target="_blank" rel="noopener noreferrer" href="https://proceedings.mlr.press/v202/yamasaki23a.html">proceedings</a>)`
      ]
    }
  },
  {
    date: "2023.05",
    highlight: false,
    en: {
      text: `Two papers have been published:`,
      items: [
        `Hypercontractivity meets random convex hulls: analysis of randomized multivariate cubatures (<a target="_blank" rel="noopener noreferrer" href="https://royalsocietypublishing.org/doi/10.1098/rspa.2022.0725">Proceedings of the Royal Society A</a>)`,
        `Convergence analysis of approximation formulas for analytic functions via duality for potential energy minimization (<a target="_blank" rel="noopener noreferrer" href="https://link.springer.com/article/10.1007/s13160-023-00588-5">Japan Journal of Industrial and Applied Mathematics</a>)`
      ]
    },
    ja: {
      text: `2件の論文が出版されました。`,
      items: [
        `Hypercontractivity meets random convex hulls: analysis of randomized multivariate cubatures (<a target="_blank" rel="noopener noreferrer" href="https://royalsocietypublishing.org/doi/10.1098/rspa.2022.0725">Proceedings of the Royal Society A</a>)`,
        `Convergence analysis of approximation formulas for analytic functions via duality for potential energy minimization (<a target="_blank" rel="noopener noreferrer" href="https://link.springer.com/article/10.1007/s13160-023-00588-5">Japan Journal of Industrial and Applied Mathematics</a>)`
      ]
    }
  },
  {
    date: "2023.01",
    highlight: false,
    en: {
      text: `Our paper "Estimating the probability that a given vector is in the convex hull of a random sample" has been published in <a target="_blank" rel="noopener noreferrer" href="https://link.springer.com/article/10.1007/s00440-022-01186-1">Probability Theory and Related Fields</a>.`
    },
    ja: {
      text: `論文 "Estimating the probability that a given vector is in the convex hull of a random sample" が <a target="_blank" rel="noopener noreferrer" href="https://link.springer.com/article/10.1007/s00440-022-01186-1">Probability Theory and Related Fields</a> に出版されました。`
    }
  },
  {
    date: "2022.11",
    highlight: false,
    en: {
      text: `A <a target="_blank" rel="noopener noreferrer" href="https://tech.preferred.jp/ja/blog/identity-preserving-character-generation/">blog-post</a> (in Japanese) on my summer internship at Preferred Networks has been released.`
    },
    ja: {
      text: `Preferred Networksでの夏季インターンの内容をまとめた<a target="_blank" rel="noopener noreferrer" href="https://tech.preferred.jp/ja/blog/identity-preserving-character-generation/">テックブログ</a>が公開されました。`
    }
  },
  {
    date: "2022.09",
    highlight: false,
    en: {
      text: `Two papers have been accepted for presentation at NeurIPS 2022:`,
      items: [
        `Positively weighted kernel quadrature via subsampling (<a target="_blank" rel="noopener noreferrer" href="https://arxiv.org/abs/2107.09597">arXiv</a>)`,
        `Fast Bayesian inference with batch Bayesian quadrature via kernel recombination (<a target="_blank" rel="noopener noreferrer" href="https://arxiv.org/abs/2206.04734">arXiv</a>)`
      ]
    },
    ja: {
      text: `NeurIPS 2022に2件の論文がアクセプトされました。`,
      items: [
        `Positively weighted kernel quadrature via subsampling (<a target="_blank" rel="noopener noreferrer" href="https://arxiv.org/abs/2107.09597">arXiv</a>)`,
        `Fast Bayesian inference with batch Bayesian quadrature via kernel recombination (<a target="_blank" rel="noopener noreferrer" href="https://arxiv.org/abs/2206.04734">arXiv</a>)`
      ]
    }
  }
];